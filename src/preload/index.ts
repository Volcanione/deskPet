import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { getMousePosition,initGlobalKeyboardListener } from './nut'

// Custom APIs for renderer
const api = {
  exit: () => electronAPI.ipcRenderer.send('exit'), //退出程序
  openSetting: () => electronAPI.ipcRenderer.send('create-child-window'), //开启子窗口
  getMousePosition,
  initGlobalKeyboardListener
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

//启用鼠标监听
