type Pos = {
  x: number;
  y: number;
}
declare interface Window {
  api: {
    exit: () => void
    getMousePosition: () => {bounds: Pos, currentPosition: Pos}
    initGlobalKeyboardListener:(callback?:(e:any)=>void) => void
  }

}
