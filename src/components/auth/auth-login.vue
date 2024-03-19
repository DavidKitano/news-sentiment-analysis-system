<template>
  <el-container id="authContainer" v-loading="loading">
    <el-main>
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto" status-icon>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password />
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="login(ruleFormRef)">登录</el-button>
          <el-button text type="primary" @click="gotoRegister">没有账号？去注册</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { login as loginApi } from '@/api/auth'
import { useAuth } from '@/stores/auth/auth'
import { getUserInfo } from '@/api/user'
import { useUser } from '@/stores/user/user'

type RuleForm = {
  username: string
  password: string
  grant_type: 'password'
}

const router = useRouter()
const auth = useAuth()
const user = useUser()

const loading = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const form = ref<RuleForm>({
  grant_type: 'password',
  username: '',
  password: ''
})

const validateNonNull = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入内容'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<RuleForm>>({
  password: [{ validator: validateNonNull, trigger: ['blur', 'change'] }],
  username: [{ validator: validateNonNull, trigger: ['blur', 'change'] }]
})

const restoreUserInfo = async () => {
  try {
    const [hasError, data] = await getUserInfo({})
    if (hasError) {
      data?.msg && ElMessage.error(data.msg)
      return
    }
    return data.data
  } catch (error) {
    ElMessage.error('获取用户信息失败')
    console.error(error)
  }
}

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  try {
    loading.value = true
    const [hasError, data] = await loginApi(form.value)
    if (hasError) {
      auth.clearAuth()
      return data?.msg && ElMessage.error(data.msg || '登录失败')
    }
    const token = data?.access_token
    if (token) {
      ElMessage.success('登录成功')
      auth.setAuth(token, data || {})
      const userInfo = await restoreUserInfo()
      if (userInfo) user.setUserInfo(userInfo)
      router.replace('/')
    } else {
      throw new Error('登录失败，请稍后重试')
    }
  } catch (error) {
    auth.clearAuth()
    console.error(error)
  } finally {
    loading.value = false
  }
}

const gotoRegister = () => {
  router.push('/auth/register')
}
</script>

<style lang="scss" scoped></style>
