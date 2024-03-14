<template>
  <section id="menu">
    <el-menu :default-active="defaultActive" class="el-menu" mode="horizontal" router>
      <img style="height: 84%" class="logo" src="/logo.png" :draggable="false" />
      <el-menu-item index="news">
        <el-icon><i-ep-home-filled /></el-icon>
        新闻
      </el-menu-item>
      <el-menu-item index="timeline">
        <el-icon><i-ep-help-filled /></el-icon>
        时间线
      </el-menu-item>
      <el-menu-item index="trend">
        <el-icon><i-ep-trend-charts /></el-icon>
        舆情趋势
      </el-menu-item>
      <el-menu-item index="atlas">
        <el-icon><i-ep-user-filled /></el-icon>
        人物图谱
      </el-menu-item>
      <div class="flex-grow" />
      <el-button-group class="function-btn">
        <el-button type="primary" @click="goAuth('login')">登录</el-button>
        <el-button type="primary" text @click="goAuth('register')"> 注册 </el-button>
      </el-button-group>
    </el-menu>
  </section>
  <div class="menu-padding"></div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const defaultActive = computed(() => {
  const key = route.path.split('/')[1]
  if (!key || key === 'home' || key === 'index') {
    return 'news'
  }
  return key
})

const goAuth = (type: string) => {
  router.push(`/auth/${type}`)
}
</script>
<style lang="scss" scoped>
#menu {
  position: fixed;
  top: 0;
  z-index: 1234;
  overflow: hidden;
  min-width: 100%;
  margin-bottom: 10px;

  .logo {
    align-self: center;
    margin: 0 1rem 0 4.8rem;
  }

  .function-btn {
    align-self: center;
    margin: 0 4.2rem;
  }

  .flex-grow {
    flex-grow: 1;
  }
}

.menu-padding {
  padding-top: var(--el-menu-horizontal-height);
}
</style>
