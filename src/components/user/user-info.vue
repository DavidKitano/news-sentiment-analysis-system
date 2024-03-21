<template>
  <div class="avatar-box">
    <el-avatar :size="80" :src="user.avatar" alt="用户头像" :draggable="false">
      <img
        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        alt="加载失败"
        :draggable="false"
      />
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
        <el-button-group type="primary" size="small">
          <el-button class="cell-item" @click="showDialog('password')"> 修改密码 </el-button>
          <el-button class="cell-item" @click="showDialog('info')">
            编辑&nbsp;<el-icon> <i-ep-edit /> </el-icon>
          </el-button>
        </el-button-group>
      </template>
      <template #title>
        <el-dropdown type="primary">
          <el-button type="primary" size="small">
            菜单<el-icon class="el-icon--right"><i-ep-arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="showCollectedFunc()">查看已收藏的新闻</el-dropdown-item>
              <el-dropdown-item @click="showCommentHistoryFunc()">查询历史评论</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-descriptions>
  </div>
  <news-collected :show="collectedShow" @update:show="(e) => closeNewsCollectedFunc(e)" />
  <news-comment-history :show="commentedShow" @update:show="(e) => closeNewsCommentHistoryFunc(e)" />
  <el-dialog
    v-model="dialogVisible"
    :visible="dialogVisible"
    width="30%"
    destroy-on-close
    center
    append-to-body
    lock-scroll
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <template #header>
      <h2 style="color: #7d7d7d">
        <strong>{{ dialogTitle }}</strong>
      </h2>
    </template>
    <user-modify
      :id="String(user.userId)"
      :type="dialogType"
      :gender="user.gender"
      :account="user.account"
      :email="user.email"
      :username="user.username"
      :avatar="user.avatar"
      @update:visible="(val: boolean) => (dialogVisible = val)"
    />
  </el-dialog>
</template>
<script setup lang="ts">
import { useUser } from '@/stores/user/user'

const user = useUser()

const dialogVisible = ref<boolean>(false)
const collectedShow = ref<boolean>(false)
const commentedShow = ref<boolean>(false)
const dialogType = ref<'info' | 'password'>('info')

const dialogTitle = computed(() => {
  return dialogType.value === 'info' ? '编辑用户信息' : '修改密码'
})

const showDialog = (type: 'info' | 'password') => {
  dialogType.value = type
  dialogVisible.value = true
}
const showCommentHistoryFunc = () => {
  commentedShow.value = true
}
const showCollectedFunc = () => {
  collectedShow.value = true
}
const closeNewsCollectedFunc = (e: boolean) => {
  collectedShow.value = e
}
const closeNewsCommentHistoryFunc = (e: boolean) => {
  commentedShow.value = e
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
