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
      <h2>评论历史</h2>
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
        <div v-if="commentedHistoryList.length > 0">
          <nsas-box class="main-content" v-for="comment in commentedHistoryList" :key="comment.id">
            <template #header>
              <h2 class="pointer news-title" @click="goToDetail(String(comment.newsId))">{{ comment.title }}</h2>
            </template>
            <el-button
              size="small"
              type="primary"
              circle
              @click="openEditDialog(comment.content || '', String(comment.id))"
            >
              <el-icon>
                <i-ep-edit />
              </el-icon>
            </el-button>
            <el-divider direction="vertical" />
            <el-popconfirm
              title="确认要删除该评论吗？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              :hide-after="16"
              @confirm="delNewsComment(String(comment.id))"
            >
              <template #reference>
                <el-button size="small" type="danger" circle>
                  <el-icon>
                    <i-ep-delete />
                  </el-icon>
                </el-button>
              </template>
            </el-popconfirm>
            <section class="comment news-box pointer" @click="goToDetail(String(comment.newsId))">
              <el-text>{{ comment.content }}</el-text>
            </section>
          </nsas-box>
        </div>
        <el-empty v-else description="没有收藏噢~" />
      </el-scrollbar>
    </template>
  </el-drawer>
  <el-dialog v-model="isEditing" title="修改评论" append-to-body>
    <el-input
      type="textarea"
      v-model="editingComment"
      placeholder="请输入评论"
      clearable
      :rows="6"
      :show-word-limit="true"
      :maxlength="600"
      :validate-event="false"
      resize="none"
    />
    <template #footer>
      <el-button type="primary" @click="isEditing = false">取消</el-button>
      <el-popconfirm
        title="确认修改该评论吗？"
        confirm-button-text="确认"
        cancel-button-text="取消"
        teleported
        :hide-after="16"
        @confirm="modifyNewsComment()"
      >
        <template #reference>
          <el-button type="primary">确认</el-button>
        </template>
      </el-popconfirm>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { deleteNewsComment, getNewsCommentHistory, updateNewsComment } from '@/api/news-comment'
import type { UserCommentVO } from '@/api/news-comment/type'

const props = defineProps<{
  show: boolean
}>()

const editingComment = ref('')
const editingId = ref('')
const isEditing = ref(false)
const loading = ref<boolean>(false)
const commentedHistoryList = ref<UserCommentVO[]>([])
const pageInfo = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
})
const goToDetail = async (id: string) => {
  window.location.href = '/news/' + id
}
const handleSizeChange = async (val: number) => {
  pageInfo.value.pageSize = val
  pageInfo.value.currentPage = 0
  await loadCommentedHistoryList()
}
const handleCurrentChange = async (val: number) => {
  pageInfo.value.currentPage = val
  await loadCommentedHistoryList()
}
const delNewsComment = async (id: string | null) => {
  if (!id) return ElMessage.error('评论id不能为空')
  try {
    const [hasError, data] = await deleteNewsComment({ id })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    ElMessage.success('删除评论成功')
    await loadCommentedHistoryList()
  } catch (e) {
    console.error(e)
    ElMessage.error('删除评论失败')
  }
}

const modifyNewsComment = async () => {
  if (!editingId.value) return ElMessage.error('评论id不能为空')
  if (!editingComment.value) return ElMessage.error('评论内容不能为空')
  try {
    const [hasError, data] = await updateNewsComment({
      id: editingId.value,
      content: editingComment.value
    })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    ElMessage.success('修改评论成功')
    await loadCommentedHistoryList()
  } catch (e) {
    console.error(e)
    ElMessage.error('修改评论失败')
  } finally {
    isEditing.value = false
  }
}

const openEditDialog = (nowContent: string, nowId: string) => {
  isEditing.value = true
  editingComment.value = nowContent
  editingId.value = nowId
}

const loadCommentedHistoryList = async () => {
  loading.value = true
  try {
    const [hasError, data] = await getNewsCommentHistory(pageInfo.value)
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    commentedHistoryList.value = (data.data.data as UserCommentVO[]) || ([] as UserCommentVO[])
    pageInfo.value.total = data.data.total || 0
  } catch (error) {
    ElMessage.error('获取评论历史列表失败')
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
      await loadCommentedHistoryList()
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
.comment {
  margin-top: 10px;
}
</style>
