import { app, shell, BrowserWindow, ipcMain, contextBridge, ipcRenderer } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'

export function createChildWindow(mainWindow: BrowserWindow) {
  return new Promise((resolve: any) => {
    let childWindow: BrowserWindow | null = new BrowserWindow({
      parent: mainWindow, // 指定父窗口
      modal: true, // 模态窗口
      show: false, // 初始化时不显示
      autoHideMenuBar: true,
      width: 600,
      height: 400,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        nodeIntegration: true
      }
    })

    // 加载子窗口的 HTML 文件
    // 根据环境加载不同内容
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      childWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/child.html`)
      childWindow.webContents.openDevTools()
    } else {
      childWindow.loadFile(join(__dirname, '../renderer/child.html'))
      childWindow.webContents.openDevTools()
    }

    // 子窗口准备好后显示
    childWindow.once('ready-to-show', () => {
      childWindow && childWindow.show()
      resolve()
    })

    // childWindow.webContents.openDevTools()
    // 当子窗口关闭时触发
    childWindow.on('closed', () => {
      childWindow = null
    })
  })
}
