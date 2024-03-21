<template>
  <el-drawer
    size="50%"
    class="user-info-drawer"
    :model-value="show"
    direction="rtl"
    append-to-body
    destroy-on-close
    lock-scroll
    @close="closeDrawer"
  >
    <template #header>
      <h2>已收藏新闻</h2>
    </template>
    <template #default>
      <el-scrollbar>
        <el-affix :offset="60">
          <nsas-box style="width: 100%">
            <el-pagination
              small
              background
              layout="sizes, prev, pager, next, ->, jumper, total"
              :total="pageInfo.total"
              :page-sizes="[1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </nsas-box>
        </el-affix>
        <div v-if="collectedNewsList.length > 0">
          <nsas-box class="main-content" v-for="news in collectedNewsList" :key="news.title">
            <template #header>
              <h2 class="pointer news-title" @click="goToDetail(news.newsId)">{{ news.title }}</h2>
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
            </section>
          </nsas-box>
        </div>
        <el-empty v-else description="没有收藏噢~" />
      </el-scrollbar>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { getCollect } from '@/api/news-collect'
import type { newsData } from '@/api/news/type'

const props = defineProps<{
  show: boolean
}>()

const loading = ref<boolean>(false)
const collectedNewsList = ref<newsData[]>([])
const pageInfo = ref({
  currentPage: 0,
  pageSize: 10,
  total: 0
})
const goToDetail = async (id: string) => {
  window.location.href = '/news/' + id
}
const handleSizeChange = async (val: number) => {
  pageInfo.value.pageSize = val
  pageInfo.value.currentPage = 0
  await loadCollectedNewsList()
}
const handleCurrentChange = async (val: number) => {
  pageInfo.value.currentPage = val - 1
  await loadCollectedNewsList()
}

const loadCollectedNewsList = async () => {
  loading.value = true
  try {
    const [hasError, data] = await getCollect(pageInfo.value)
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    collectedNewsList.value = (data.data.data as newsData[]) || ([] as newsData[])
    pageInfo.value.total = data.data.total || 0
  } catch (error) {
    ElMessage.error('获取收藏新闻列表失败')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const emit = defineEmits(['update:show'])
const closeDrawer = () => {
  emit('update:show', false)
}

watch(
  () => props.show,
  async (val) => {
    if (val) {
      await loadCollectedNewsList()
    }
  }
)
</script>
<style lang="scss" scoped>
$common-bg-color: #f1f2f5;
$common-box-gap: 10px;

:global(.user-info-drawer .el-drawer__header) {
  margin-bottom: 0;
}
.main-content {
  margin-top: 1rem;
}
.news-title {
  &:hover {
    color: #409eff;
    text-decoration: underline;
  }
}
.info-box,
.avatar-box {
  width: 100%;
  text-align: center;
}
.cell-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.news-avatar {
  float: right;
  padding: 0 0 0 10px;
  z-index: 10;
  height: 110px;
  overflow: hidden;
  border-radius: 0.5rem;
  :deep(.el-image) {
    border-radius: 0.5rem;
    padding: 0;
  }
}
</style>
