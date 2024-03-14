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
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuth()

const visible = ref(true)

const gotoHomePage = () => {
  router.push('/')
}

onBeforeMount(() => {
  if (auth.isLogin) {
    router.push('/')
  }
})
</script>
<style lang="scss" scoped></style>
