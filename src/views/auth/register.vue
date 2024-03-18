<template>
  <star-link>
    <nsas-dialog v-model="visible">
      <template #header>
        <h2>注册</h2>
      </template>
      <auth-register />
      <template #footer>
        <el-divider style="margin: 1em" />
        <el-button text type="primary" @click="gotoHomePage">返回主页</el-button>
      </template>
    </nsas-dialog>
  </star-link>
</template>
<script setup lang="ts">
import { useAuth } from '@/stores/auth/auth'

const auth = useAuth()

const visible = ref(true)

const gotoHomePage = () => {
  window.location.href = '/news'
}

onBeforeMount(() => {
  if (auth.isLogin) {
    window.location.href = '/news'
  }
})
</script>
<style lang="scss" scoped></style>
