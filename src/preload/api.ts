import { electronAPI } from '@electron-toolkit/preload'

//打开设置窗口
export const openSetting = () => {
  return new Promise((resolve: any) => {
    try {
      electronAPI.ipcRenderer.send('create-child-window')
      electronAPI.ipcRenderer.on('create-child-window-success', () => {
        resolve() //打开子窗口成功回调
      })
    } catch (error) {
      //
    }
  })
}



//退出程序
export const exit = () => electronAPI.ipcRenderer.send('exit')

//获取文件目录

export const selectDirectory = () => electronAPI.ipcRenderer.invoke('select-dir')


//打开目录

export const openDirectory = () => electronAPI.ipcRenderer.invoke('open-dir')
