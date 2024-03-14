<template>
  <el-empty class="empty">
    <el-button type="primary" text @click="goHome">返回主页</el-button>
    <el-divider direction="vertical" />
    <el-button type="primary" text @click="goBack">返回上一级</el-button>
    <template #description>
      <slot></slot>
    </template>
  </el-empty>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::after {
    content: '';
    display: block;
    clear: both;
  }
}
</style>
