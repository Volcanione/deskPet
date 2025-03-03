<template>
  <div class="common">
    <div class="item" v-for="item in SettingConfigData[$route.name as string].children">
      <span> {{ item.title }}</span>
      <span>{{ item.value }}</span>
      <span @click="openDir">打开目录</span>
    </div>
    <div @click="UpdateConfigData">保存</div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { PageRouteConfig } from '@renderer/utils/index'

const { route } = PageRouteConfig()

const SettingConfigData = inject('SettingConfigData') as any
const UpdateConfigData = inject('UpdateConfigData') as any


const handleClick = async () => {
  try {
    const res = await window.api.selectDirectory()
    console.log(res);
    Object.assign(SettingConfigData[route.name as string].children[0], { value: res })

    console.log(SettingConfigData);
  } catch (error) {
    console.log(error);
  }
}


//打开目录

const openDir =async ()=>{
  try {
    await window.api.openDirectory()
  } catch (error) {

  }
}



</script>


<style lang="less" scoped>
.common {
  .item {
    display: flex;
    align-items: center;
    padding: 10px;
  }
}
</style>
