<template>
  <live2DCom class="Live2D" :options="options" @init="init" v-if="show" />
</template>

<script lang="ts">
export default {
  name: 'live2d'
}
</script>

<script setup lang="ts">
import live2DCom from '../live2DCom/index.vue'
import { nextTick, reactive, ref } from 'vue';
const options = reactive({
  // ResourcesPath: fred,
 ResourcesPath:'http://localhost:3000/live2dResources/',
  ModelDir: ['fred', 'azukiA', 'xiaji'],
  // BgImgUrl:'http://127.0.0.1:80/src/live2dResources/back_class_normal.png',
  ViewScale: 1,
  Size: 200,
  // MandatoryMotions: true,//强制触发动画
  MouseFollow: true//鼠标视线跟踪
})

const init = async (live2d) => {


  await nextTick()
  // setTimeout((  ) => {
  //     live2d.live2DManager.nextScene()
  // },3000)

  console.log(live2d.live2Dexample._view);
live2d.live2Dexample._view.onTouchesMoved(145, -132)
}

const show = ref(true)


</script>
<style lang="less" scoped>
.Live2D {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
