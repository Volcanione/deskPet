import { ipcRenderer } from 'electron'
const { mouse, Point, Button, keyboard, Key } = require('@nut-tree-fork/nut-js');

export async function initMouseListener() {
  try {
    await mouse.move(new Point(0, 0));
// await mouse.providerRegistry.registerMouseProvider(()=>{

// console.log(1122222212);
// })

//   console.log(mouse,3333333333);

  } catch (error) {
    console.log(error,11111111111)
  }
}
