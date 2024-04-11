<template>
  <section v-infinite-scroll="loadNewsList" :infinite-scroll-disabled="loadDisabled" :infinite-scroll-distance="10">
    <welcome-info class="welcome-info" v-if="isWelcomeShow" v-model="isWelcomeShow" />
    <div class="common-layout" ref="containerRef">
      <el-container class="container">
        <el-aside class="left-aside" width="200px">
          <nsas-box v-if="!specificNewsId" class="left-nav-bar" v-loading="hotNewsLoading">
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
                    <el-text class="news-title pointer" @click="goToDetail(hotNews.newsId || '')">
                      {{ hotNews.title }}
                    </el-text>
                  </template>
                  <template #default>
                    <el-image :src="hotNews.avatar">
                      <template #error>
                        <div class="image-slot err-block">
                          <el-icon><i-ep-picture /></el-icon>
                        </div>
                      </template>
                      <template #placeholder>
                        <div class="image-slot err-block">
                          <el-icon class="is-loading"><i-ep-loading /></el-icon>
                        </div>
                      </template>
                    </el-image>
                  </template>
                </el-popover>
              </el-timeline-item>
            </el-timeline>
            <el-empty v-else description="没有内容噢～" />
          </nsas-box>
          <nsas-box v-else class="left-nav-bar">
            <news-anchor />
          </nsas-box>
        </el-aside>

        <el-container class="common-content">
          <el-header v-if="!specificNewsId">
            <el-affix :offset="60">
              <nsas-box class="header-nav-bar">
                <el-input
                  v-model="searchKeyword"
                  size="large"
                  placeholder="请输入关键词搜索..."
                  class="input-with-select"
                  clearable
                >
                  <template #append>
                    <el-button @click="search" type="primary">
                      <el-icon> <i-ep-search /></el-icon>
                    </el-button>
                  </template>
                </el-input>
              </nsas-box>
            </el-affix>
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
                      <el-image :src="news.avatar" :alt="news.title" style="width: 160px" lazy>
                        <template #error>
                          <div class="image-slot err-block">
                            <el-icon><i-ep-picture /></el-icon>
                          </div>
                        </template>
                        <template #placeholder>
                          <div class="image-slot err-block">
                            <el-icon class="is-loading"><i-ep-loading /></el-icon>
                          </div>
                        </template>
                      </el-image>
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
            <section v-else>
              <user-info />
            </section>
          </nsas-box>
          <section class="right-footnote">
            <el-link type="primary" style="font-size: smaller" href="/about">
              关于该项目的开发技术栈
              <el-icon>
                <i-ep-question-filled />
              </el-icon>
            </el-link>
          </section>
          <section class="right-footnote">
            <el-link type="primary" style="font-size: smaller" href="/manage/dict"> 词典后台管理 </el-link>
            <el-divider direction="vertical" />
            <el-link type="primary" style="font-size: smaller" href="/manage/user"> 用户后台管理 </el-link>
            <el-divider direction="vertical" />
            <el-link type="primary" style="font-size: smaller" href="/manage/news"> 新闻后台管理 </el-link>
          </section>
          <section class="right-footnote">
            <el-divider />
            <el-text size="small" type="primary">当前版本：v1.2.0</el-text>
          </section>
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
const searchKeyword = ref<string>('')
const mainRef = ref<HTMLElement | null>(null)
const pageInfo = ref({
  currentPage: 0,
  pageSize: 10
})

const loadDisabled = computed(() => loading.value || noMore.value || newsList.value.length <= 0)
const specificNewsId = computed(() => route.params.newsId as string)

const goToDetail = async (id: string) => {
  isWelcomeShow.value = false
  router.push('/news/' + id)
}

const search = async () => {
  pageInfo.value.currentPage = 0
  loading.value = true
  try {
    const [hasError, data] = await getNewsList({ ...pageInfo.value, keyword: searchKeyword.value })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    newsList.value = data.data.content
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
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
  }
}

onMounted(async () => {
  if (specificNewsId.value || auth.isLogin) {
    isWelcomeShow.value = false
  }
  await loadNewsList(false)
  await loadHotNewsList()
})

onUpdated(async () => {
  if (specificNewsId.value || auth.isLogin) {
    isWelcomeShow.value = false
  }
})
</script>
<style lang="scss" scoped>
$common-bg-color: #f1f2f5;
$common-box-gap: 10px;

:deep(.el-input-group__append),
:deep(.el-input-group__append button.el-button) {
  background-color: #409eff;
  color: white;
  border-color: #409eff;
}

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
  .common-content {
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
  .el-main {
    padding-top: 0;
  }
  .news-list {
    display: flex;
    flex-direction: column;
    gap: $common-box-gap;
    padding-top: $common-box-gap;
    .news-avatar {
      float: right;
      padding: 0 0 0 10px;
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
    padding-right: 5rem;
    height: 100%;
    position: sticky;
    top: calc(var(--el-menu-horizontal-height) + 10px);
    .right-content {
      padding-top: $common-box-gap;
    }
  }
}

.right-footnote {
  .el-text {
    display: flex;
    align-items: flex-start;
    gap: 2px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
