import { nextTick, watch, ref } from 'vue'
import { LAppDelegate } from './lappdelegate';
import LAppDefine from './lappdefine';
import { LAppLive2DManager } from './lapplive2dmanager';






export function live2DManger(options) {




  watch(() => options, (data) => {
    Object.assign(LAppDefine, data)
    LAppDefine.ModelDirSize = LAppDefine.ModelDir.length
  }, { deep: true, immediate: true })



  //加载
  const Run = (): void => {
    LAppDelegate.getInstance().run();
  };

  //卸载
  /**
   * 終了時の処理
   */
  const Ondestroy =   ()   => {
    LAppDelegate.releaseInstance()
  };



  /**
   * Process when changing screen size.
   */
  //尺寸变化
  const Resize = () => {
    if (LAppDefine.CanvasSize === 'auto') {
      LAppDelegate.getInstance().onResize();
    }
  };




  const Init = async (el) => {
    LAppDefine.container = el
    const live2Dexample = LAppDelegate.getInstance()
    live2Dexample.initialize()
    const live2DManager = LAppLive2DManager.getInstance();
    return { live2Dexample, live2DManager }
  }




  return {
    Run,
    Ondestroy,
    Resize,
    Init,
  }

}












