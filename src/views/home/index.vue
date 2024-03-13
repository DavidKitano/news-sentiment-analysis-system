<template>
  <div class="common-layout">
    <el-container class="container">
      <el-affix position="top" :offset="70">
        <el-aside class="left-aside" width="200px">
          <nsas-box class="left-nav-bar"> aaa </nsas-box>
        </el-aside>
      </el-affix>
      <el-container class="common-content">
        <el-header>
          <nsas-box class="header-nav-bar"> header </nsas-box>
        </el-header>
        <el-main>
          <nsas-box class="main-content pointer" v-for="news in newsList" :key="news.title">
            <template #header>
              <h1>{{ news.title }}</h1>
            </template>
            <p>{{ news.content }}</p>
            <template #footer> 状态 </template>
          </nsas-box>
        </el-main>
      </el-container>
      <el-affix position="top" :offset="70">
        <el-aside class="right-aside" width="200px">
          <nsas-box class="right-nav-bar">s </nsas-box>
          <nsas-box class="right-content">a </nsas-box>
          <nsas-box class="right-content">a </nsas-box>
        </el-aside>
      </el-affix>
    </el-container>
  </div>
</template>
<script setup lang="ts">
type newsType = {
  title: string
  content: string
}

const newsList = ref<newsType[]>([])

for (let i = 0; i < 20; i++) {
  newsList.value.push({
    title: `title - ${i}`,
    content: `content - ${i}`
  })
}
</script>
<style lang="scss" scoped>
$common-bg-color: #f1f2f5;
$common-box-gap: 10px;

.common-layout {
  min-height: 100vh;
  min-width: 100%;
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .container {
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
  .el-main {
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
  }
  .right-aside {
    padding-right: 5rem;
    height: 100%;
    .right-content {
      padding-top: $common-box-gap;
    }
  }
}
</style>
