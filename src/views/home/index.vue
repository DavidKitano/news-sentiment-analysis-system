<template>
  <section v-infinite-scroll="loadNewsList" :infinite-scroll-disabled="loadDisabled">
    <welcome-info class="welcome-info" v-if="isWelcomeShow" v-model="isWelcomeShow" />
    <div class="common-layout" ref="containerRef">
      <el-container class="container">
        <el-aside class="left-aside" width="200px">
          <nsas-box class="left-nav-bar" v-loading="hotNewsLoading">
            <el-divider content-position="left"><h3>热点新闻</h3></el-divider>
            <el-timeline class="hot-news" v-if="hotNewsList.length > 0">
              <el-timeline-item
                v-for="(hotNews, idx) in hotNewsList"
                :key="hotNews.title"
                :timestamp="`Top ${idx + 1}`"
                :hollow="true"
                type="primary"
              >
                <el-popover placement="right" :width="200" trigger="hover" :tabindex="12345">
                  <template #reference>
                    <el-text class="news-title pointer">{{ hotNews.title }}</el-text></template
                  >
                  <template #default>
                    <el-image :src="hotNews.avatar" />
                  </template>
                </el-popover>
              </el-timeline-item>
            </el-timeline>
            <el-empty v-else description="没有内容噢～" />
          </nsas-box>
        </el-aside>

        <el-container class="common-content">
          <el-header v-if="!specificNewsId">
            <nsas-box class="header-nav-bar"> header </nsas-box>
          </el-header>
          <el-main>
            <section v-if="!specificNewsId" class="news-list-container" ref="mainRef">
              <section v-if="newsList.length > 0" class="news-list">
                <nsas-box class="main-content" v-for="news in newsList" :key="news.title">
                  <template #header>
                    <h2 class="pointer news-title" @click="goToDetail(news.newsId)">{{ news.title }}</h2>
                    <section class="news-tag">
                      <h5>作者：</h5>
                      <el-tag type="info">{{ news.author || '匿名' }}</el-tag>
                      <el-divider direction="vertical" />
                      <h5>日期：</h5>
                      <el-tag type="info">{{ news.date }}</el-tag>
                      <el-divider direction="vertical" />
                      <div class="tag-group">
                        <h3>
                          <el-icon><i-ep-star /></el-icon>
                        </h3>
                        <el-text>{{ news.collect }}</el-text>
                      </div>
                      <el-divider direction="vertical" />
                      <div class="tag-group">
                        <h3>
                          <el-icon><i-ep-chat-line-square /></el-icon>
                        </h3>
                        <el-text>{{ news.commentCnt }}</el-text>
                      </div>
                      <el-divider direction="vertical" />
                      <div class="tag-group">
                        <h3>
                          <el-icon><nsas-thumb-up /></el-icon>
                        </h3>
                        <el-text>{{ news.like }}</el-text>
                      </div>
                    </section>
                  </template>
                  <section class="news-box pointer" @click="goToDetail(news.newsId)">
                    <section class="news-avatar" v-if="news.avatar">
                      <el-image :src="news.avatar" :alt="news.title" style="width: 160px" lazy />
                    </section>
                    <h3>摘要</h3>
                    <el-text>{{ news.summary }}</el-text>
                    <br />
                    <h3>正文</h3>
                    <el-text class="news-body" line-clamp="4">{{ news.body }}</el-text>
                  </section>
                </nsas-box>
              </section>
              <nsas-box v-if="loading">
                <section class="loading-box">
                  <el-text>加载中...</el-text>
                  <el-icon class="is-loading">
                    <i-ep-loading />
                  </el-icon>
                </section>
              </nsas-box>
              <nsas-box v-if="noMore">
                <section class="loading-box">
                  <el-text>没有更多了～</el-text>
                </section>
              </nsas-box>
              <nsas-box v-if="newsList.length <= 0" class="main-content">
                <el-empty description="没有内容噢～" />
              </nsas-box>
            </section>
            <section v-else class="news-detail">
              <news-detail :id="specificNewsId" />
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
  </section>
</template>
<script setup lang="ts">
import { getHotNewsList, getNewsList } from '@/api/news'
import type { AppNewsShowNewsData, newsData } from '@/api/news/type'
import { useAuth } from '@/stores/auth/auth'
import { NsasThumbUp } from '@/assets/svg'
import { useRoute, useRouter } from 'vue-router'

const auth = useAuth()
const route = useRoute()
const router = useRouter()

const isWelcomeShow = ref<boolean>(true)

const newsList = ref<newsData[]>([])
const hotNewsList = ref<AppNewsShowNewsData[]>([])

const asideHeight = ref<string>('100%')
const loading = ref<boolean>(false)
const hotNewsLoading = ref<boolean>(false)
const noMore = ref<boolean>(false)
const mainRef = ref<HTMLElement | null>(null)
const pageInfo = ref({
  currentPage: 0,
  pageSize: 10
})

const loadDisabled = computed(() => loading.value || noMore.value || newsList.value.length <= 0)
const specificNewsId = computed(() => route.params.newsId as string)

const goToDetail = (id: string) => {
  isWelcomeShow.value = false
  router.push('/news/' + id)
}

const loadHotNewsList = async () => {
  hotNewsLoading.value = true
  try {
    const [hasError, data] = await getHotNewsList({})
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    hotNewsList.value = data.data
  } catch (error) {
    console.error(error)
  } finally {
    hotNewsLoading.value = false
  }
}

const loadNewsList = async (isNew = true) => {
  if (isNew) {
    pageInfo.value.currentPage++
  }
  loading.value = true
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
    nextTick(() => {
      const mainHeight = mainRef.value?.scrollHeight
      if (mainHeight) {
        asideHeight.value = `${mainHeight}px`
      }
    })
  }
}

onMounted(async () => {
  if (specificNewsId.value) {
    isWelcomeShow.value = false
  }
  await loadNewsList(false)
  await loadHotNewsList()
  console.log(route)
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
.el-divider {
  h3 {
    font-weight: 600;
  }
}
.news-title {
  &:hover {
    color: #409eff;
    text-decoration: underline;
  }
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
    .header-nav-bar {
      position: sticky;
    }
    .loading-box {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 100%;
    }
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
          left: 170px;
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
      float: left;
      padding: 0 10px 0 0;
      z-index: 10;
      height: 108px;
      overflow: hidden;
      border-radius: 0.5rem;
      :deep(.el-image) {
        border-radius: 0.5rem;
        padding: 0;
      }
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
    .hot-news {
      padding: 0;
    }
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
