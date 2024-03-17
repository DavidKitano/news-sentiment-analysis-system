<template>
  <el-container id="authContainer" v-loading="loading">
    <el-main>
      <el-upload
        action="../nsas-api/app-system-file/file"
        class="avatar-uploader"
        :data="{
          type: 1
        }"
        :show-file-list="false"
        :with-credentials="true"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.ext.avatar" :src="form.ext.avatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><i-ep-plus /></el-icon>
      </el-upload>
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto" status-icon>
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" type="email" />
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input v-model="form.username" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" placeholder="请再次输入密码" type="password" show-password />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.ext.gender" placeholder="请选择性别">
            <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label=" " class="register-btn-group">
          <el-button type="primary" @click="register(ruleFormRef)">注册</el-button>
          <el-button text type="primary" @click="gotoLogin">已有账号？去登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { register as registerApi } from '@/api/auth'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'

type RuleForm = {
  account: string
  email: string
  password: string
  confirmPassword: string
  username: string
  ext: {
    avatar: string
    gender: string
  }
}

const router = useRouter()

const loading = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const form = ref({
  account: '',
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  ext: {
    avatar: '',
    gender: '保密'
  }
})
const genderOptions = [
  {
    value: '男性',
    label: '男性'
  },
  {
    value: '女性',
    label: '女性'
  },
  {
    value: '非二元性别',
    label: '非二元性别'
  },
  {
    value: '保密',
    label: '保密'
  }
]

const validatePassAgain = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.value.password) {
    callback(new Error('两次输入的密码不匹配'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<RuleForm>>({
  account: [
    { required: true, message: '请输入账号', trigger: ['blur', 'change'] },
    { min: 6, max: 15, message: '账号长度应在6~15位之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: ['blur', 'change'] },
    {
      type: 'email',
      message: '请输入格式正确的邮箱',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
    { min: 6, max: 15, message: '密码长度应在6~15位之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: ['blur', 'change'] },
    { min: 6, max: 15, message: '密码长度应在6~15位之间', trigger: 'blur' },
    { validator: validatePassAgain, trigger: ['blur', 'change'] }
  ],
  username: [{ required: true, message: '请输入昵称', trigger: ['blur', 'change'] }]
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  ElMessage.success('上传成功')
  form.value.ext.avatar = response.data
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像文件只能为JPG文件!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小需小于2MB!')
    return false
  }
  return true
}

const register = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  try {
    loading.value = true
    const [hasError, data] = await registerApi(form.value)
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg || '注册失败')
    }
    ElMessage.success('注册成功')
    router.replace('/auth/login')
  } finally {
    loading.value = false
  }
}

const gotoLogin = () => {
  router.push('/auth/login')
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  text-align: center;
  margin-bottom: 1rem;
}
.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  display: block;
}
// .register-btn-group :deep(.el-form-item__content) {
//   justify-content: center;
// }
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  text-align: center;
}
</style>
