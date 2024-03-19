<template>
  <div v-loading="loading" ref="detailContentRef">
    <el-empty v-if="!newsInfo" description="没有内容噢～" />
    <div v-else>
      <div id="title">
        <slot name="titleTab" />
        <el-text>
          <h1>
            {{ title }}
          </h1>
        </el-text>
      </div>
      <el-divider />
      <section class="news-tag">
        <h5>作者：</h5>
        <el-tooltip class="box-item" effect="dark" :content="newsContent?.author || '匿名'" placement="top">
          <el-tag type="info">{{ newsContent?.author || '匿名' }}</el-tag>
        </el-tooltip>
        <el-divider direction="vertical" />
        <h5>类型：</h5>
        <el-tooltip class="box-item" effect="dark" :content="newsContent?.type || '未分类'" placement="top">
          <el-tag type="info">{{ newsContent?.type || '未分类' }}</el-tag>
        </el-tooltip>
        <el-divider direction="vertical" />
        <h5>日期：</h5>
        <el-tooltip class="box-item" effect="dark" :content="newsContent?.date || '未指明'" placement="top">
          <el-tag type="info">{{ newsContent?.date || '未指明' }}</el-tag>
        </el-tooltip>
        <el-divider direction="vertical" />
        <div class="tag-group">
          <h3>
            <el-icon class="pointer">
              <i-ep-star v-if="!newsInfo?.isCollect" @click="handleCollect(false)" />
              <i-ep-star-filled style="color: rgb(255, 100, 100)" v-else @click="handleCollect(true)" />
            </el-icon>
          </h3>
          <el-text>{{ newsInfo?.collect }}</el-text>
        </div>
        <el-divider direction="vertical" />
        <div class="tag-group">
          <h3>
            <el-icon class="pointer">
              <nsas-thumb-up v-if="!newsInfo?.isLike" @click="handleLike(false)" />
              <nsas-thumb-up-filled style="color: rgb(255, 100, 100)" v-else @click="handleLike(true)" />
            </el-icon>
          </h3>
          <el-text>{{ newsInfo?.like }}</el-text>
        </div>
        <el-divider direction="vertical" />
        <div class="tag-group">
          <h3>
            <el-icon class="pointer">
              <a href="#comment">
                <i-ep-chat-line-square />
              </a>
            </el-icon>
          </h3>
          <el-text>{{ newsInfo?.commentCnt }}</el-text>
        </div>
      </section>
      <section class="news-tag">
        <h5 style="width: max-content">来源：</h5>
        <el-tooltip class="box-item" effect="dark" :content="newsContent?.url || '未指明'" placement="top">
          <el-tag type="info">
            {{ newsContent?.url || '未指明' }}
          </el-tag>
        </el-tooltip>
      </section>
      <el-divider />
      <section class="img-container">
        <el-image :src="newsContent?.avatar" class="news-cover" />
      </section>
      <el-divider id="summary" class="news-title" content-position="left"><h3>摘要</h3></el-divider>
      <el-text tag="p" class="summary" v-for="paragraph of newsSummary" :key="paragraph">
        {{ paragraph }}
      </el-text>
      <el-divider id="body" class="news-title" content-position="left"><h3>正文</h3></el-divider>
      <div class="carousel-images" v-if="newsInfo?.newsImg?.length">
        <el-carousel height="200px">
          <el-carousel-item v-for="imgItem in newsInfo?.newsImg" :key="imgItem.url">
            <el-image :src="imgItem.url" fit="contain" style="width: 100%; height: 100%"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-text tag="p" class="body" v-for="paragraph of newsBody" :key="paragraph">
        {{ paragraph }}
      </el-text>
      <template v-for="(item, idx) in newsInfo?.newsExt" :key="item">
        <div :id="idx + ''" v-if="!isDataEmpty(item.data)">
          <el-divider class="news-title" content-position="left">
            <h3>{{ item.tag }}</h3>
          </el-divider>
          <el-collapse v-model="activeCollapseNameList">
            <el-collapse-item :title="`点击展开${item.tag}`" :name="item.tag">
              <template v-if="item.type === DataType.TEXT">
                <el-text>{{ item.data }}</el-text>
              </template>
              <template v-else-if="item.type === DataType.LIST">
                <el-tag class="data-tag-item" v-for="tagItem of item.data" :key="tagItem + ''"> {{ tagItem }} </el-tag>
              </template>
              <template v-else-if="item.type === DataType.IMAGE">
                <el-image :src="'' + item.data" />
              </template>
              <template v-else-if="item.type === DataType.AUDIO">
                <audio controls>
                  <source :src="'' + item.data" />
                  您的浏览器不支持 audio 元素。
                </audio>
              </template>
              <template v-else-if="item.type === DataType.VIDEO">
                <video controls>
                  <source :src="'' + item.data" />
                  您的浏览器不支持 video 元素。
                </video>
              </template>
              <template v-else-if="item.type === DataType.LINE_CHART">
                <!-- TODO: 暂无需求，预留位 -->
              </template>
              <template v-else-if="item.type === DataType.HISTOGRAM">
                <chart-histogram :datums="item.data as generalObject" />
              </template>
              <template v-else-if="item.type === DataType.PIE">
                <!-- TODO: 暂无需求，预留位 -->
              </template>
              <template v-else-if="item.type === DataType.TAG">
                <el-tag size="large" class="data-tag-item"> {{ item.data }} </el-tag>
              </template>
              <template v-else>
                {{ item.data }}
              </template>
            </el-collapse-item>
          </el-collapse>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { cancelLikeNews, getNewsDetail, likeNews } from '@/api/news'
import { deleteCollect, postCollect } from '@/api/news-collect'
import type { NewsMultiLanguageDo, ShowNewsDetails } from '@/api/news/type'
import { NsasThumbUp, NsasThumbUpFilled } from '@/assets/svg'
import { useCatalogue } from '@/stores/news/catalogue'
import { useComments } from '@/stores/news/comments'
import { isDataEmpty } from '@/utils/common'
type generalObject = {
  [key: string]: any
}

enum DataType {
  TEXT,
  LIST,
  IMAGE,
  AUDIO,
  VIDEO,
  LINE_CHART,
  HISTOGRAM,
  PIE,
  TAG
}

const props = defineProps<{
  lang: 'cn' | 'en' | 'vi' | 'inline'
  id: string | number
}>()

const comment = useComments()
const catalogue = useCatalogue()
const loading = ref<boolean>(false)
const activeCollapseNameList = ref<string[]>([])
const detailContentRef = ref<HTMLElement>()

const title = computed(() => {
  switch (props.lang) {
    case 'cn':
      return newsContent.value?.titleZh
    case 'en':
      return newsContent.value?.titleEn
    case 'vi':
      return newsContent.value?.titleVi
    default:
      return newsContent.value?.titleZh
  }
})
const newsBody = computed(() => {
  switch (props.lang) {
    case 'cn':
      return newsContent.value?.bodyZh?.split('\n')
    case 'en':
      return newsContent.value?.bodyEn?.split('\n')
    case 'vi':
      return newsContent.value?.bodyVi?.split('\n')
    default:
      return newsContent.value?.bodyVi?.split('\n')
  }
})
const newsSummary = computed(() => {
  switch (props.lang) {
    case 'cn':
      return newsContent.value?.summaryZh?.split('\n')
    case 'en':
      return newsContent.value?.summaryEn?.split('\n')
    case 'vi':
      return newsContent.value?.summaryVi?.split('\n')
    default:
      return newsContent.value?.summaryVi?.split('\n')
  }
})

const newsInfo = ref<ShowNewsDetails>()
const newsContent = ref<NewsMultiLanguageDo>()

const loadNewsDetail = async () => {
  loading.value = true
  try {
    const [hasError, data] = await getNewsDetail({ id: props.id as string })
    if (hasError) {
      console.log(data.msg)
      return data?.msg && ElMessage.error(data.msg)
    }
    newsInfo.value = data.data
    newsContent.value = data.data.news
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
const handleCollect = async (isCancel: boolean) => {
  try {
    loading.value = true
    let hasError = false
    let data = null
    if (isCancel) {
      ;[hasError, data] = await deleteCollect({ newsId: props.id as string })
    } else {
      ;[hasError, data] = await postCollect({ newsId: props.id as string })
    }
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    if (newsInfo.value) {
      newsInfo.value.isCollect = !newsInfo.value.isCollect
      isCancel ? newsInfo.value.collect-- : newsInfo.value.collect++
    }
    ElMessage.success(isCancel ? '取消收藏成功' : '收藏成功')
  } catch (e) {
    ElMessage.error('操作失败')
    console.error(e)
  } finally {
    loading.value = false
  }
}
const handleLike = async (isCancel: boolean) => {
  try {
    loading.value = true
    let hasError = false
    let data = null
    if (isCancel) {
      ;[hasError, data] = await cancelLikeNews({ id: props.id as string })
    } else {
      ;[hasError, data] = await likeNews({ id: props.id as string })
    }
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    if (newsInfo.value) {
      newsInfo.value.isLike = !newsInfo.value.isLike
      isCancel ? newsInfo.value.like-- : newsInfo.value.like++
    }
    ElMessage.success(isCancel ? '取消点赞成功' : '点赞成功')
  } catch (e) {
    ElMessage.error('操作失败')
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadNewsDetail()
  comment.setCommentList(newsInfo.value?.commentList || [])
  const availKey = []
  for (const key in newsInfo.value?.newsExt) {
    if (
      Object.prototype.hasOwnProperty.call(newsInfo.value?.newsExt, key) &&
      newsInfo.value?.newsExt[key].data &&
      !isDataEmpty(newsInfo.value?.newsExt[key].data)
    ) {
      if (!newsInfo.value?.newsExt[key]?.tag) continue
      availKey.push({ label: newsInfo.value.newsExt[key].tag!, anchor: key })
    }
  }
  console.log(availKey)
  catalogue.setCatalogue([
    { label: '标题', anchor: 'title' },
    { label: '摘要', anchor: 'summary' },
    { label: '正文', anchor: 'body' },
    ...availKey,
    { label: '评论区', anchor: 'comment' }
  ])
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>
<style lang="scss" scoped>
a {
  display: block;
  color: inherit;
  text-decoration: none;
}
h3 {
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  font-weight: 500;
}

#title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  min-height: 150px;
  :deep(.el-tabs) {
    overflow: unset;
  }
  h1 {
    width: 100%;
    flex: 1;
    white-space: wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  & + .el-divider {
    margin-top: 0;
  }
}

.news-title {
  margin-top: 3rem;
}

.summary,
.body {
  text-indent: 2rem;
}

.img-container {
  display: flex;
  justify-content: center;
  .el-image {
    width: 50%;
  }
}

.data-tag-item {
  margin: 0.2rem 0.5rem;
}
.carousel-images {
  margin: 1rem 0;
}
:deep(.el-carousel__item h3) {
  color: transparent;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-tag {
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
:deep(.el-tag__content) {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
