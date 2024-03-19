<template>
  <div class="avatar-box">
    <el-avatar :size="80" :src="user.avatar" alt="用户头像">
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" alt="加载失败" />
    </el-avatar>
  </div>
  <div class="info-box">
    <el-divider>当前用户</el-divider>
    <el-descriptions class="margin-top" :column="1" size="small" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <i-ep-user />
            </el-icon>
            用户名
          </div>
        </template>
        {{ user.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <i-ep-user />
            </el-icon>
            登录账号
          </div>
        </template>
        {{ user.account }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <i-ep-user />
            </el-icon>
            邮箱
          </div>
        </template>
        {{ user.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <i-ep-user />
            </el-icon>
            性别
          </div>
        </template>
        {{ user.gender }}
      </el-descriptions-item>
      <template #extra>
        <el-button type="primary" size="small" class="cell-item" @click="showDialog()">
          编辑&nbsp;<el-icon> <i-ep-edit /> </el-icon>
        </el-button>
      </template>
      <template #title>
        <el-button type="primary" size="small" @click="showDrawerFunc()"> 查看收藏新闻 </el-button>
      </template>
    </el-descriptions>
  </div>
  <el-drawer size="50%" class="user-info-drawer" v-model="showDrawer" direction="rtl" destroy-on-close append-to-body>
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
          /></nsas-box>
        </el-affix>
        <div v-if="collectedNewsList.length > 0">
          <nsas-box class="main-content" v-for="news in collectedNewsList" :key="news.title">
            <template #header>
              <h2 class="pointer news-title" @click="goToDetail(news.newsId)">{{ news.title }}</h2>
            </template>
            <section class="news-box pointer" @click="goToDetail(news.newsId)">
              <section class="news-avatar" v-if="news.avatar">
                <el-image :src="news.avatar" :alt="news.title" style="width: 160px" lazy />
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
  <el-dialog
    v-model="dialogVisible"
    :visible="dialogVisible"
    width="30%"
    destroy-on-close
    center
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <template #header>
      <h2 style="color: #7d7d7d">
        <strong>编辑用户信息</strong>
      </h2>
    </template>
    <user-modify
      :id="String(user.userId)"
      :gender="user.gender"
      :account="user.account"
      :email="user.email"
      :username="user.username"
      :avatar="user.avatar"
    />
  </el-dialog>
</template>
<script setup lang="ts">
import { getCollect } from '@/api/news-collect'
import type { newsData } from '@/api/news/type'
import { useUser } from '@/stores/user/user'

const user = useUser()

const showDrawer = ref<boolean>(false)
const dialogVisible = ref<boolean>(false)
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
const showDrawerFunc = async () => {
  showDrawer.value = true
  await loadCollectedNewsList()
}
const showDialog = () => {
  console.log('aa')
  dialogVisible.value = true
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
