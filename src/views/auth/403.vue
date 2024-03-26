<template>
  <auth-error>
    <h1>403 Forbidden - 禁止访问</h1>
    <p>您被禁止访问该页面，请检查登录状态及是否拥有权限，5秒后跳转至登录页面...</p>
  </auth-error>
</template>
<script lang="ts" setup>
import { useAuth } from '@/stores/auth/auth'

const auth = useAuth()

onMounted(() => {
  auth.clearAuth()
  setTimeout(() => {
    window.location.href = '/auth/login'
  }, 5000)
})
</script>
