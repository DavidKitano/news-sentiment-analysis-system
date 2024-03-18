<template>
  <welcome-info class="welcome-info" v-if="isWelcomeShow" v-model="isWelcomeShow" />
  <div class="common-layout" ref="containerRef" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadDisabled">
    <el-container class="container">
      <el-aside class="left-aside" width="200px">
        <nsas-box class="left-nav-bar"> aaa </nsas-box>
      </el-aside>

      <el-container class="common-content">
        <el-header>
          <nsas-box class="header-nav-bar"> header </nsas-box>
        </el-header>
        <el-main>
          <section v-if="newsList.length > 0" class="news-list" ref="mainRef">
            <nsas-box
              class="main-content pointer"
              v-for="news in newsList"
              :key="news.title"
              @click="alertId(news.newsId)"
            >
              <template #header>
                <h2>{{ news.title }}</h2>
                <section class="news-tag">
                  <el-tag type="info">{{ news.author }}</el-tag>
                  <el-divider direction="vertical" />
                  <el-tag type="info">{{ news.date }}</el-tag>
                </section>
              </template>
              <section class="news-box">
                <section class="news-avatar" v-if="news.avatar">
                  <el-image :src="news.avatar" style="width: 200px" lazy />
                </section>
                <h3>摘要</h3>
                <el-text>{{ news.summary }}</el-text>
                <br />
                <h3>正文</h3>
                <el-text class="news-body" line-clamp="4">{{ news.body }}</el-text>
              </section>
              <template #footer>
                <p>like: {{ news.like }}</p>
                <p>collect: {{ news.collect }}</p>
                <p>comment: {{ news.commentCnt }}</p>
              </template>
            </nsas-box>
          </section>
          <p v-if="loading">Loading...</p>
          <p v-if="noMore">No more</p>
          <el-empty v-if="newsList.length <= 0" description="没有内容噢～" />
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
const loading = ref<boolean>(false)
const noMore = ref<boolean>(false)
const mainRef = ref<HTMLElement | null>(null)
const pageInfo = ref({
  currentPage: 0,
  pageSize: 10
})

const loadDisabled = computed(() => loading.value || noMore.value)

const alertId = (id: string) => {
  window.alert(id)
}

const loadMore = async () => {
  loading.value = true
  pageInfo.value.currentPage++
  try {
    const [hasError, data] = await getNewsList(pageInfo.value)
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    newsList.value.push(...data.data.content)
  } catch (error) {
    pageInfo.value.currentPage--
    console.error(error)
  } finally {
    loading.value = false
  }
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
    .news-box {
      h3 {
        margin-top: $common-box-gap;
        margin-bottom: 2px;
        font-weight: 500;
        position: relative;
        &::after {
          content: '新闻：';
          color: transparent;
          position: absolute;
          left: 0;
          top: -2.4px;
          border-bottom: solid 4px rgba(197, 197, 197, 0.5);
        }
      }
    }
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
