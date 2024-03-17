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
            <nsas-box
              class="main-content pointer"
              v-for="news in newsList"
              :key="news.title"
              @click="alertId(news.newsId)"
            >
              <template #header>
                <h2>{{ news.title }}</h2>
              </template>
              <section class="news-box">
                <section class="news-avatar" v-if="news.avatar">
                  <el-image :src="news.avatar" style="width: 200px" lazy />
                </section>
                <h3>摘要</h3>
                <p>{{ news.summary }}</p>
                <br />
                <h3>正文</h3>
                <p class="news-body">{{ news.body }}</p>
              </section>
              <template #footer>
                <p>author: {{ news.author }}</p>
                <p>date: {{ news.date }}</p>
                <p>like: {{ news.like }}</p>
                <p>collect: {{ news.collect }}</p>
                <p>comment: {{ news.commentCnt }}</p>
              </template>
            </nsas-box>
          </section>
        </el-main>
      </el-container>

      <el-aside class="right-aside" width="300px" :style="{ height: asideHeight }">
        <nsas-box class="right-nav-bar">
          <auth-non-logged-box v-if="!auth.isLogin" />
          <section v-else>aa</section>
        </nsas-box>
        <nsas-box class="right-content">
          <auth-non-logged-box v-if="!auth.isLogin" />
          <section v-else>aa</section>
        </nsas-box>
      </el-aside>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { getNewsList } from '@/api/news'
import type { newsData } from '@/api/news/type'
import { useAuth } from '@/stores/auth/auth'

const auth = useAuth()

const isWelcomeShow = ref<boolean>(true)
const newsList = ref<newsData[]>([])
const asideHeight = ref<string>('100%')
const mainRef = ref<HTMLElement | null>(null)
const pageInfo = ref({
  currentPage: 0,
  pageSize: 10
})

const alertId = (id: string) => {
  window.alert(id)
}

onMounted(async () => {
  const mainHeight = mainRef.value?.offsetHeight
  if (mainHeight) {
    asideHeight.value = `${mainHeight}px`
  }

  const [hasError, data] = await getNewsList(pageInfo.value)
  if (hasError) {
    return data?.msg && ElMessage.error(data.msg)
  }
  console.log(data)
  newsList.value = data.data.content || []
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
  width: 100%;
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
    width: 100%;
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
    .news-avatar {
      float: right;
      padding: 0 1rem;
      z-index: 99999;
    }
    .news-body {
      // white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }
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
