type Pos = {
  x: number;
  y: number;
}
declare interface Window {
  api: {
    exit: () => void
    openSetting: (callback?:()=>void) => void
    getMousePosition: () => {bounds: Pos, currentPosition: Pos}
    initGlobalKeyboardListener:( ) => void
  }

}
