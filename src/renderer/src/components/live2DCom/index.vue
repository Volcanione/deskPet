<template>
  <div :ref="live2dRef" class="live2dContent" v-if="show"></div>
</template>

<script setup>
import { reactive, ref, onUnmounted, getCurrentInstance, onBeforeMount, nextTick,watch } from 'vue'
import { live2DManger } from './src/main'

const props = defineProps(
  {
    options: {
      type: Object,
      default() {
        return {
          ResourcesPath: "http://127.0.0.1:3000/live2dResources/",
          ModelDir: ['fred', 'azukiA', 'xiaji', 'Haru', 'Hiyori', 'Mark', 'Natori', 'Rice'],
          // BgImgUrl:'http://127.0.0.1:81/src/live2dResources/back_class_normal.png',
          ViewScale: 1,
          Size: 200,
          // MandatoryMotions: true//强制触发动画
          MouseFollow: true//鼠标视线跟踪
        }
      }
    }
  }
)

const internalInstance = getCurrentInstance()

const globalProperties = internalInstance.proxy


const emit = defineEmits(['init'])


const live2dData = reactive({})


const show = ref(true)





const { Run, Init, Resize, Ondestroy } = live2DManger(props.options)
// Run()

const live2dRef = async (el) => {
  if (!el) {
    return
  }
  init(el)
}

const init = async (el) => {
  globalProperties.live2dState = true
  const LIVE2D = await Init(el)
  Run()
  intersectionObserver.observe(el);
  Object.assign(live2dData, LIVE2D)
  emit('init', live2dData)
  watch(() => props.options, async (data) => {
    await nextTick()
    Resize(true)

  }, { deep: true, })
}


//监听器
const intersectionObserver = new ResizeObserver(function () {
  Resize()
});


onUnmounted(() => {
  Ondestroy()
  globalProperties.live2dState = false
})


onBeforeMount(() => {
  if (globalProperties.live2dState) {
    show.value = false
    console.warn('existed live2d example');
  }
})











</script>

<style></style>
