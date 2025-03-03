<template>
  <div class="layout">
    <div class="side">
      <div class="item" v-for="item in sideList" :key="item.key" :class="{ 'active': item.key === route.name }"
        @click="activeRoute = item.key">{{ item.title }}</div>
    </div>
    <div class="routerContent">
      <router-view v-slot="{ Component }" v-if="!loading">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, provide } from 'vue'
import { SettingHook } from '@renderer/hooks/SettingHook'
import { PageRouteConfig } from '@renderer/utils/index'


const { route, router } = PageRouteConfig()

const { SettingConfigData,
  getSettingConfig, updateSettingConfig } = SettingHook()


const sideList = computed(() => {
  return Object.keys(SettingConfigData).map((key) => {
    return {
      title: SettingConfigData[key].title,
      key
    }
  })
})


//当前的路由
const activeRoute = computed({
  get() {
    return route.name as string
  },
  set(name) {
    router.push({ name })
  }
})

//保存配置
const UpdateConfigData = async () => {
  try {
   await updateSettingConfig()
  } catch (error) {
    console.log(error);
  }
}

//当前选中路由的参数
provide('SettingConfigData', SettingConfigData)
provide('UpdateConfigData', UpdateConfigData)

const loading = ref(true)
const init = async () => {
  try {
    loading.value = true
    await getSettingConfig()
  } catch (error) {

  }
  loading.value = false
}

init()

</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;

  .side {
    width: 150px;
    overflow: hidden;
    border-right: 1px solid #ccc;
    overflow-y: auto;

    .item {
      padding: 10px;
      cursor: pointer;

      &:hover {
        color: @primary-color;
      }

      &.active {
        color: @primary-color;
      }
    }
  }

  .routerContent {
    flex: 1
  }
}
</style>
