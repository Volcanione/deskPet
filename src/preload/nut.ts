import { electronAPI } from '@electron-toolkit/preload'
const { mouse, Point, Button, keyboard, Key, screen } = require('@nut-tree-fork/nut-js')
import { GlobalKeyboardListener } from 'node-global-key-listener'

//获取鼠标位置
export const getMousePosition = async () => {
  try {
    const currentPosition = await mouse.getPosition()
    const bounds = await electronAPI.ipcRenderer.invoke('get-window-bounds')

    return { bounds, currentPosition }
  } catch (error) {
    console.error('获取鼠标位置时出错:', error)
  }
}

//键盘事件监听
export const initGlobalKeyboardListener = (callback?:(e:any)=>void) => {
  const keyboardListener = new GlobalKeyboardListener()
  keyboardListener.addListener(function (e, down) {
   callback && callback(e)
  })
}
