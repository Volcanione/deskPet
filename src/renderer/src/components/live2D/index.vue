<template>
  <div class="live2DContent">
    <Tools class="tools" :class="['animate__animated', `${toolsShow ? 'animate__bounceIn' : 'animate__bounceOut'}`]" />
    <live2DCom class="Live2D" :options="options" @init="init" v-if="show" @click="toolsShow = !toolsShow" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'live2d'
}
</script>

<script setup lang="ts">
import live2DCom from '../live2DCom/index.vue'
import Tools from '../tools/index.vue'
import { nextTick, reactive, ref, watch } from 'vue';
const options = reactive({
  ResourcesPath: `${import.meta.env.VITE_BASE_URL}/live2dResources/`,
  ModelDir: ['fred', 'azukiA', 'xiaji'],
  ViewScale: 1,
  CanvasSize: { width: 150, height: 200 },
  // MandatoryMotions: true,//强制触发动画
  MouseFollow: false//鼠标视线跟踪
})

const init = async (live2d) => {


  await nextTick()
  // setTimeout((  ) => {
  //     live2d.live2DManager.nextScene(2)
  // },3000)

  // console.log(live2d.live2Dexample._view);
  // live2d.live2Dexample._view.onTouchesMoved(145, -132)

  // getMouseConfig(live2d)//鼠标监听
  // initKeybord(live2d)//键盘监听

}

const show = ref(true)


const getMouseConfig = (live2d: any) => {

  setInterval(async () => {
    try {
      const { bounds, currentPosition } = await window.api.getMousePosition()

      live2d.live2Dexample._view.onTouchesMoved(-(bounds.x - currentPosition.x), -(bounds.y - currentPosition.y))
    } catch (error) {
      console.log(error);
    }
  }, 100)

  //

}

const initKeybord = (live2d?: any) => {
  window.api.initGlobalKeyboardListener((e) => {
    console.log(e);
  })
}

//





//tools
const toolsShow = ref(false)


</script>
<style lang="less" scoped>
.live2DContent {
  position: relative;

  .tools {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
  }
}

.Live2D {}
</style>
