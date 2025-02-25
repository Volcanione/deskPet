<template>
  <div>setting</div>
</template>

<script lang="ts" setup>

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
