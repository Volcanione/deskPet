<template>
  <div>{{SettingConfigData[$route.name as string]}}</div>
</template>

<script lang="ts" setup>
import {inject} from 'vue'

const SettingConfigData = inject('SettingConfigData') as any
console.log(SettingConfigData);
</script>
