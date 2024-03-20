<template>
  <nsas-box>
    <el-page-header :icon="ArrowLeft">
      <template #title>
        <div @click="back">返回</div>
      </template>
      <template #content>
        <strong> 新闻详情 </strong>
      </template>
      <div class="mt-4 text-sm font-bold">
        <news-detail-content :lang="activeName" :id="id" @on-loading="commentLoading = false">
          <template #titleTab>
            <el-tabs v-model="activeName" tabPosition="left">
              <el-tab-pane label="Tiếng Việt" name="vi" />
              <el-tab-pane label="中文" name="cn" />
              <el-tab-pane label="English" name="en" />
            </el-tabs>
          </template>
        </news-detail-content>
      </div>
    </el-page-header>
  </nsas-box>
  <nsas-box id="comment">
    <el-page-header :icon="nullAny">
      <template #title>
        <strong> 评论区 </strong>
      </template>
      <template #content>
        <el-avatar v-if="auth.isLogin" size="default" :src="user.avatar" :draggable="false">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            alt="加载失败"
            :draggable="false"
          />
        </el-avatar>
        <el-text v-else tag="b">请登录后评论~</el-text>
      </template>
      <div v-loading="commentLoading">
        <section class="comment-list">
          <news-comment-box :comments="realtimeCommentList" @on-update="flushNewsComment()" />
        </section>
        <el-divider />
        <section class="comment-box">
          <el-form ref="ruleFormRef" :model="ruleForm" label-width="auto" status-icon :rules="rules">
            <el-form-item label="输入评论" prop="editingComment">
              <el-input
                type="textarea"
                v-model="ruleForm.editingComment"
                placeholder="请输入评论"
                clearable
                :rows="6"
                :show-word-limit="true"
                :maxlength="600"
                :validate-event="false"
                resize="none"
                @clear="ruleForm.editingComment = ''"
              />
            </el-form-item>
            <div class="comment-box-btn">
              <el-button style="width: 50%" type="default" plain @click="clearComment()">清空</el-button>
              <el-button style="width: 50%" type="primary" @click="sendComment(ruleFormRef)">评论</el-button>
            </div>
          </el-form>
        </section>
      </div>
    </el-page-header>
  </nsas-box>
</template>
<script lang="ts" setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { useAuth } from '@/stores/auth/auth'
import { useUser } from '@/stores/user/user'
import type { FormInstance, FormRules } from 'element-plus'
import { getNewsComment, postNewsComment } from '@/api/news-comment'
import { useComments } from '@/stores/news/comments'

const props = defineProps<{
  id: string
}>()

const nullAny = null as any // 跳过element plus自身错误的类型检查
const ruleFormRef = ref<FormInstance>()

const auth = useAuth()
const user = useUser()
const comment = useComments()

const activeName = ref<'vi' | 'cn' | 'en'>('vi')
const commentLoading = ref<boolean>(true)

const realtimeCommentList = computed(() => comment.commentList)
const ruleForm = reactive({
  editingComment: ''
})

const checkIsEmpty = (rule: any, value: string, callback: (message?: string) => void) => {
  if (!value) {
    callback('评论不能为空')
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  editingComment: [{ validator: checkIsEmpty, trigger: 'blur' }]
})

const clearComment = () => {
  ruleForm.editingComment = ''
}

const flushNewsComment = async () => {
  commentLoading.value = true
  try {
    const [hasError, data] = await getNewsComment({ newsId: props.id })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    comment.setCommentList(data.data || [])
  } catch (e) {
    console.error(e)
    ElMessage.error('获取评论失败')
  } finally {
    commentLoading.value = false
  }
}

const sendComment = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  if (ruleForm.editingComment) {
    const tempComment = ruleForm.editingComment
      .replace(/\s+\r\n/g, '\r\n')
      .replace(/\s+\r/g, '\r')
      .replace(/\s+\n/g, '\n')
    commentLoading.value = true
    try {
      const [hasError, data] = await postNewsComment({
        newsId: props.id,
        content: tempComment
      })
      if (hasError) {
        return data?.msg && ElMessage.error(data.msg)
      }
      ElMessage.success('评论成功')
      clearComment()
      flushNewsComment()
    } catch (error) {
      console.error(error)
      ElMessage.error('评论失败')
    } finally {
      commentLoading.value = false
    }
  }
}
const back = () => {
  window.location.href = '/news'
}
</script>
<style lang="scss" scoped>
#comment {
  margin-top: 20px;
  strong {
    font-size: 18px;
    cursor: auto;
  }
}

.comment-box-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
