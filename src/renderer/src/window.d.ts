type Pos = {
  x: number;
  y: number;
}
declare interface Window {
  api: {
    exit: () => void
    openSetting: () => void
    getMousePosition: () => {bounds: Pos, currentPosition: Pos}
    initGlobalKeyboardListener:(callback?:(e:any)=>void) => void
  }

}
