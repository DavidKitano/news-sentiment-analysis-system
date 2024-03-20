<template>
  <template v-if="comments.length > 0">
    <nsas-box class="comment-item" v-for="item in comments" :key="item.id">
      <el-descriptions size="small" direction="vertical" :column="1">
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-avatar :size="30" :src="item.avatar" class="item-avatar" alt="用户头像" :draggable="false">
                <img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                  alt="加载失败"
                  :draggable="false"
                />
              </el-avatar>
              <el-text tag="b" class="username">{{ item.username }}</el-text>
              <el-tag v-if="item.isSelf" class="me-tag" size="small" type="success" effect="dark">我</el-tag>
              <el-divider direction="vertical" />
              <el-text class="comment-date"> {{ formattedShowTime(item.updateTime, item.createTime) }} </el-text>
              <template v-if="item.isSelf">
                <el-divider direction="vertical" />
                <el-button size="small" type="info" text @click="openEditDialog(item.content || '', String(item.id))">
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
                  @confirm="deleteNewsComment(String(item.id))"
                >
                  <template #reference>
                    <el-button size="small" type="info" text>
                      <el-icon>
                        <i-ep-delete />
                      </el-icon>
                    </el-button>
                  </template>
                </el-popconfirm>
              </template>
            </div>
          </template>
          <el-text>{{ item.content }}</el-text>
        </el-descriptions-item>
      </el-descriptions>
    </nsas-box>
  </template>
  <template v-else>
    <el-empty description="暂无评论" />
  </template>
  <el-dialog v-model="isEditing" title="修改评论">
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
import { deleteNewsComment as deleteNewsCommentApi, updateNewsComment } from '@/api/news-comment'
import type { UserNewsCommentDO } from '@/api/news/type'

defineProps<{
  comments: UserNewsCommentDO[]
}>()

const editingComment = ref('')
const editingId = ref('')
const isEditing = ref(false)

const emit = defineEmits(['onUpdate'])

const formattedShowTime = (updateTime: string | undefined, createTime: string | undefined) => {
  return `${createTime}${updateTime === createTime ? '' : ` (编辑于 ${updateTime})`}`
}

const deleteNewsComment = async (id: string | null) => {
  if (!id) return ElMessage.error('评论id不能为空')
  try {
    const [hasError, data] = await deleteNewsCommentApi({ id })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    ElMessage.success('删除评论成功')
    emit('onUpdate', true)
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
    emit('onUpdate', true)
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
</script>
<style lang="scss" scoped>
.comment-item {
  margin: 10px 0;
}
.comment-date {
  font-size: 12px;
  color: #666;
  vertical-align: middle;
}
.cell-item {
  display: flex;
  align-items: center;
}
.username {
  font-size: 16px;
}
.me-tag {
  margin-left: 10px;
}
.item-avatar {
  margin-right: 10px;
}
</style>
