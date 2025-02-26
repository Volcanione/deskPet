<template>
  <div class="tools">
    <span class="item" v-for="tool in toolsList" :key="tool.title"  @click="tool.click && tool.click()">
      <i class="iconfont" v-html="tool.icon"></i>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'


//打开设置
const openSetting = async () => {
  try {
    await window.api.openSetting()
console.log(122);
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
    icon: '&#xe616;',
    title: '拖拽',
    click: null
  }
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
