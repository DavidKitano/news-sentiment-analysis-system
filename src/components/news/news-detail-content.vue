<template>
  <div v-loading="loading">
    <el-empty v-if="!newsInfo" description="没有内容噢～" />
    <div v-else>
      <h1>
        {{ title }}
      </h1>
      <el-divider />
      <section class="news-tag">
        <h5>作者：</h5>
        <el-tag type="info">{{ newsContent?.author || '匿名' }}</el-tag>
        <el-divider direction="vertical" />
        <h5>类型：</h5>
        <el-tag type="info">{{ newsContent?.type || '未分类' }}</el-tag>
        <el-divider direction="vertical" />
        <h5>日期：</h5>
        <el-tag type="info">{{ newsContent?.date || '未指明' }}</el-tag>
        <el-divider direction="vertical" />
        <div class="tag-group">
          <h3>
            <el-icon>
              <i-ep-star v-if="!newsInfo?.isCollect" />
              <i-ep-star-filled style="color: rgb(255, 100, 100)" v-else />
            </el-icon>
          </h3>
          <el-text>{{ newsInfo?.collect }}</el-text>
        </div>
        <el-divider direction="vertical" />
        <div class="tag-group">
          <h3>
            <el-icon>
              <nsas-thumb-up v-if="!newsInfo?.isLike" />
              <nsas-thumb-up-filled style="color: rgb(255, 100, 100)" v-else />
            </el-icon>
          </h3>
          <el-text>{{ newsInfo?.like }}</el-text>
        </div>
        <el-divider direction="vertical" />
        <div class="tag-group">
          <h3>
            <el-icon><i-ep-chat-line-square /></el-icon>
          </h3>
          <el-text>{{ newsInfo?.commentCnt }}</el-text>
        </div>
      </section>
      <section class="news-tag">
        <h5>来源：</h5>
        <el-tag type="info">{{ newsContent?.url || '未指明' }}</el-tag>
      </section>
      <el-divider />
      <section class="img-container">
        <el-image :src="newsContent?.avatar" class="news-cover" />
      </section>
      <el-divider class="news-title" content-position="left"><h3>摘要</h3></el-divider>
      <el-text tag="p" class="summary">
        {{ newsSummary }}
      </el-text>
      <el-divider class="news-title" content-position="left"><h3>正文</h3></el-divider>
      <div class="carousel-images" v-if="newsInfo?.newsImg?.length">
        <el-carousel height="200px" motion-blur>
          <el-carousel-item v-for="imgItem in newsInfo?.newsImg" :key="imgItem.url">
            <el-image :src="imgItem.url" fit="contain" style="width: 100%; height: 100%"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-text tag="p" class="body">
        {{ newsBody }}
      </el-text>
      <template v-for="item in newsInfo?.newsExt" :key="item">
        <div v-if="!isDataEmpty(item.data)">
          <el-divider class="news-title" content-position="left">
            <h3>{{ item.tag }}</h3>
          </el-divider>
          <template v-if="item.type === DataType.TEXT">
            <el-text>{{ item.data }}</el-text>
          </template>
          <template v-else-if="item.type === DataType.LIST">
            <el-tag class="data-tag-item" v-for="tagItem of item.data" :key="tagItem + ''"> {{ tagItem }} </el-tag>
          </template>
          <template v-else-if="item.type === DataType.IMAGE">
            <el-image :src="'' + item.data" />
          </template>
          <template v-else-if="item.type === DataType.AUDIO"></template>
          <template v-else-if="item.type === DataType.VIDEO"></template>
          <template v-else-if="item.type === DataType.LINE_CHART"></template>
          <template v-else-if="item.type === DataType.HISTOGRAM"></template>
          <template v-else-if="item.type === DataType.PIE"></template>
          <template v-else-if="item.type === DataType.TAG">
            <el-tag class="data-tag-item"> {{ item.data }} </el-tag>
          </template>
          <template v-else>
            {{ item.data }}
          </template>
        </div>
      </template>
      <pre>
      {{ newsInfo }}
    </pre
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getNewsDetail } from '@/api/news'
import type { NewsMultiLanguageDo, ShowNewsDetails } from '@/api/news/type'
import { NsasThumbUp, NsasThumbUpFilled } from '@/assets/svg'

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

const loading = ref<boolean>(false)

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
      return newsContent.value?.bodyZh
    case 'en':
      return newsContent.value?.bodyEn
    case 'vi':
      return newsContent.value?.bodyVi
    default:
      return newsContent.value?.bodyVi
  }
})

const newsSummary = computed(() => {
  switch (props.lang) {
    case 'cn':
      return newsContent.value?.summaryZh
    case 'en':
      return newsContent.value?.summaryEn
    case 'vi':
      return newsContent.value?.summaryVi
    default:
      return newsContent.value?.summaryVi
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

const isDataEmpty = (data?: { [key: string]: any } | Array<any> | string) => {
  if (!data || data === 'http://120.25.103.178:5136') {
    return true
  }
  if (Array.isArray(data)) {
    return data.length === 0
  }
  return Object.keys(data).length === 0
}

onMounted(async () => {
  await loadNewsDetail()
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>
<style lang="scss" scoped>
h3 {
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  font-weight: 500;
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
</style>
