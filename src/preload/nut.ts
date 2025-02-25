import { electronAPI } from '@electron-toolkit/preload'
const { mouse, Point, Button, keyboard, Key, screen } = require('@nut-tree-fork/nut-js')

export const getMousePosition = async () => {
  try {
    const currentPosition = await mouse.getPosition()
    const bounds = await electronAPI.ipcRenderer.invoke('get-window-bounds')
    // console.log(bounds)
    // 检查位置是否已改变
    // console.log(currentPosition)

    return { bounds, currentPosition }
  } catch (error) {
    console.error('获取鼠标位置时出错:', error)
  }
}

export async function initMouseListener() {
  try {
    // await mouse.move(new Point(0, 0))

    const intervalDuration = 1000 // 可以根据需要调整
    setInterval(async () => {
      getMousePosition()
    }, intervalDuration)
  } catch (error) {
    console.log(error, 11111111111)
  }
}
