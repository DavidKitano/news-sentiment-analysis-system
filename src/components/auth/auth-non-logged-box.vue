<template>
  <div class="auth-non-logged-box-container">
    <el-image class="nav-bar-image" src="/favicon.ico" fit="cover" />
    <el-button-group class="function-btn">
      <el-button type="primary" @click="goAuth('login')">登录</el-button>
      <el-button type="primary" text @click="goAuth('register')"> 注册 </el-button>
    </el-button-group>
  </div>
</template>
<script setup lang="ts">
const goAuth = (type: string) => {
  window.location.href = `/auth/${type}`
}
</script>
<style lang="scss" scoped>
.auth-non-logged-box-container {
  width: 100%;
  height: 100%;

  position: relative;
  .nav-bar-image::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgb(255, 255, 255));
  }

  .function-btn {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-25%, -50%);
  }
}
</style>
