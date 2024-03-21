<template>
  <div>
    <micro-app name="dict" :url="`http://${hostname}:10101/`" iframe></micro-app>
  </div>
  <nsas-box class="back-btn">
    <el-button type="primary" round @click="backToMain">返回主页</el-button>
  </nsas-box>
</template>
<script lang="ts" setup>
const backToMain = () => {
  window.location.href = '/'
}

const hostname = computed(() => {
  return window.location.hostname
})
</script>
<style>
.back-btn {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
