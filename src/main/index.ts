import { app, shell, BrowserWindow, ipcMain, contextBridge, ipcRenderer, dialog } from 'electron'
import { join } from 'path'
import { promises as fs } from 'fs'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import Server from './server'
import icon from '../../resources/icon.png?asset'
import { createChildWindow } from './child'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 150,
    height: 200,
    show: false,
    resizable: false,
    autoHideMenuBar: true,
    titleBarStyle: process.platform === 'darwin' ? 'default' : 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transparent: true,
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      defaultFontSize: 14,
      webSecurity: false,
      contextIsolation: false,
      nodeIntegrationInWorker: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.setAlwaysOnTop(true)

  // clientxx.init(event);

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  //关闭
  ipcMain.on('exit', () => {
    app.exit()
  })

  //开起子窗口
  ipcMain.on('create-child-window', async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    await createChildWindow(win as BrowserWindow)
    event.sender.send('create-child-window-success', 'success')
  })

  //创建本地服务
  Server()

  //
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // contextBridge.exposeInMainWorld('electronAPI', {
  //   readFile: () => ipcRenderer.invoke('read-file')
  // })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.log(111111)
  // if (process.platform !== 'darwin') {
  //   app.exit()
  // }
  app.exit()
})

ipcMain.handle('get-window-bounds', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (win) {
    return win.getBounds() // 获取窗口的位置信息
  }
  return null
})

// 获取选中文件
ipcMain.handle('select-dir', async () => {
  const res = await fs.readFile(join(__dirname, '../../resources/config/setting.json'), 'utf8')

  const data = JSON.parse(res)

  //处理资源目录默认值

  const resourcePathData = data.common.children?.find((item) => item.key === 'resourceDir')

  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
    defaultPath: resourcePathData.value || join(__dirname, '../../resources/live2dResources')
  })
  return result.filePaths[0]
})

//打开指定目录
ipcMain.handle('open-dir', async ( ) => {
  const targetDir =  join(__dirname, '../../resources/live2dResources')
  shell.openPath(targetDir).then((error) => {
    if (error) {
      console.error('打开失败:', error)
    }
  })
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
