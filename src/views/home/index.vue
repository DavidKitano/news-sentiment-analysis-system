<template>
  <welcome-info class="welcome-info" v-if="isWelcomeShow" v-model="isWelcomeShow" />
  <div class="common-layout" ref="containerRef">
    <el-container class="container">
      <el-aside class="left-aside" width="200px">
        <nsas-box class="left-nav-bar"> aaa </nsas-box>
      </el-aside>

      <el-container class="common-content">
        <el-header>
          <nsas-box class="header-nav-bar"> header </nsas-box>
        </el-header>
        <el-main>
          <section class="news-list" ref="mainRef">
            <nsas-box class="main-content pointer" v-for="news in newsList" :key="news.title">
              <template #header>
                <h1>{{ news.title }}</h1>
              </template>
              <p>{{ news.content }}</p>
              <template #footer> 状态 </template>
            </nsas-box>
          </section>
        </el-main>
      </el-container>

      <el-aside class="right-aside" width="300px" :style="{ height: asideHeight }">
        <nsas-box class="right-nav-bar">
          <auth-non-logged-box />
        </nsas-box>
        <nsas-box class="right-content">
          <auth-non-logged-box />
        </nsas-box>
      </el-aside>
    </el-container>
  </div>
</template>
<script setup lang="ts">
type newsType = {
  title: string
  content: string
}

const isWelcomeShow = ref<boolean>(true)
const newsList = ref<newsType[]>([])
const asideHeight = ref<string>('100%')
const mainRef = ref<HTMLElement | null>(null)

for (let i = 0; i < 20; i++) {
  newsList.value.push({
    title: `title - ${i}`,
    content: `content - ${i}`
  })
}

onMounted(() => {
  const mainHeight = mainRef.value?.offsetHeight
  if (mainHeight) {
    asideHeight.value = `${mainHeight}px`
  }
})
</script>
<style lang="scss" scoped>
$common-bg-color: #f1f2f5;
$common-box-gap: 10px;

.welcome-info {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 9999999;
}

.common-layout {
  min-height: 100vh;
  min-width: 100%;
  width: max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .container {
    height: 100%;
    background-color: $common-bg-color;
    padding-top: $common-box-gap;
  }
  .common-content {
    min-width: 600px;
  }
  .el-container {
    min-height: 100%;
  }
  .el-header {
    --el-header-height: max-content;
    color: #fff;
  }
  .news-list {
    display: flex;
    flex-direction: column;
    gap: $common-box-gap;
    padding-top: $common-box-gap;
  }
  .el-aside {
    min-width: 350px;
  }
  .left-aside {
    padding-left: 5rem;
    height: 100%;
    position: sticky;
    top: calc(var(--el-menu-horizontal-height) + 10px);
  }
  .right-aside {
    overflow: visible;
    padding-right: 5rem;
    height: 100%;
    .right-content {
      padding-top: $common-box-gap;
      position: sticky;
      top: var(--el-menu-horizontal-height);
    }
  }
}
</style>
