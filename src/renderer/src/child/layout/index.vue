<template>
  <div class="layout">
    <div class="side">
    </div>
    <div class="routerContent">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;

  .side {
    width: 150px;
    overflow: hidden;
    border-right: 1px solid #ccc
  }

  .routerContent {
    flex: 1
  }
}
</style>
