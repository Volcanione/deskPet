<template>
  <div class="tools">
    <span class="item" v-for="tool in toolsList" :key="tool.title" @click="tool.click && tool.click()">
      <i class="iconfont" v-html="tool.icon"></i>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'


//打开设置
const openSettingLoading = ref(false)
const openSetting = async () => {
  try {
    if (openSettingLoading.value) return
    openSettingLoading.value = true
    await window.api.openSetting()
  } catch (error) {
    //
  }
  openSettingLoading.value = false
}


//退出
const exit = async () => {
  try {
    await window.api.exit()
  } catch (error) {
    //
  }
}




const toolsList = reactive([
  {
    icon: '&#xe75e;',
    title: '设置',
    click: openSetting
  },
 {
    icon: '&#xe63a;',
    title: '退出',
    click: exit
  },
  {
    icon: '&#xe616;',
    title: '拖拽',
    click: null
  },
])



</script>


<style lang="less" scoped>
.tools {
  width: 40px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;

  .item {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    &:last-child {
      -webkit-app-region: drag !important;
      cursor: move;
    }
  }
}
</style>
