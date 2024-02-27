<template>
  <el-container id="authContainer">
    <el-header>登录</el-header>
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
          <el-button type="primary" @click="login">注册</el-button>
          <el-button type="primary" @click="login">忘记密码</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
const form = ref({
  username: '',
  password: ''
})

const login = () => {
  console.log(form.value)
}
</script>

<style lang="scss" scoped></style>
