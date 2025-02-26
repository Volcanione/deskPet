<template>
  <Layout />
</template>

<script lang="ts" setup>
import Layout from '@renderer/child/layout/index.vue'
import { SettingConfig } from '@renderer/api/index'

const init = async () => {
  try {
    const res = await SettingConfig()
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
init()
</script>
