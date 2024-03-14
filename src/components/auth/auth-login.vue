<template>
  <el-container id="authContainer">
    <el-main>
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button text type="primary" @click="gotoRegister">没有账号？去注册</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  username: '',
  password: ''
})

const login = () => {
  console.log(form.value)
}

const gotoRegister = () => {
  router.push('/auth/register')
}
</script>

<style lang="scss" scoped></style>
