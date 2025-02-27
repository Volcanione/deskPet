import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {openSetting,exit}  from './api'
import { getMousePosition, initGlobalKeyboardListener } from './nut'

// Custom APIs for renderer
const api = {
  exit, //退出程序
  openSetting, //开启子窗口
  getMousePosition,//获取鼠标位置
  initGlobalKeyboardListener//全局监听键盘
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
