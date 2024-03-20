<template>
  <el-main v-loading="loading">
    <template v-if="type === 'info'">
      <el-upload
        action="../nsas-api/app-system-file/file"
        class="avatar-uploader"
        accept="image/png, image/jpeg"
        :data="{
          type: 1
        }"
        :show-file-list="false"
        :with-credentials="true"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="infoForm.ext.avatar" :src="infoForm.ext.avatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><i-ep-plus /></el-icon>
      </el-upload>
      <el-form ref="infoRuleFormRef" :model="infoForm" :rules="infoRules" label-width="auto" status-icon>
        <el-form-item label="账号" prop="account">
          <el-input v-model="infoForm.account" placeholder="请输入账号" :disabled="true" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="infoForm.email" placeholder="请输入邮箱" type="email" />
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input v-model="infoForm.username" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="infoForm.ext.gender" placeholder="请选择性别">
            <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label=" " class="register-btn-group">
          <el-button type="primary" @click="submitForm(infoRuleFormRef)">提交</el-button>
          <el-button @click="resetForm()">恢复修改</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template v-else>
      <el-form ref="passRuleFormRef" :model="passForm" :rules="passRules" label-width="auto" status-icon>
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passForm.oldPassword" placeholder="请输入旧密码" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="passForm.password" placeholder="请输入新密码" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passForm.confirmPassword" placeholder="请再次输入新密码" type="password" />
        </el-form-item>
        <el-form-item label=" " class="register-btn-group">
          <el-button type="primary" @click="changePassword(passRuleFormRef)">修改</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-main>
</template>
<script setup lang="ts">
import { modUserInfo, changePassword as changePasswordApi } from '@/api/user'
import { useAuth } from '@/stores/auth/auth'
import { useUser } from '@/stores/user/user'
import { isURL } from '@/utils/common'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'

const props = withDefaults(
  defineProps<{
    id: string
    type?: 'info' | 'password'
    gender?: string
    account?: string
    email?: string
    username?: string
    avatar?: string
  }>(),
  {
    type: 'info',
    gender: '保密',
    account: '',
    email: '',
    username: '',
    avatar: ''
  }
)

const infoRuleFormRef = ref<FormInstance>()
const passRuleFormRef = ref<FormInstance>()

const loading = ref<boolean>(false)

const user = useUser()
const auth = useAuth()

const infoForm = ref({
  account: props.account,
  email: props.email,
  username: props.username,
  ext: {
    avatar: props.avatar,
    gender: props.gender
  }
})
const passForm = ref({
  oldPassword: '',
  password: '',
  confirmPassword: ''
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
  } else if (value !== passForm.value.password) {
    callback(new Error('两次输入的密码不匹配'))
  } else {
    callback()
  }
}

const infoRules = reactive<FormRules>({
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
  username: [{ required: true, message: '请输入昵称', trigger: ['blur', 'change'] }]
})
const passRules = reactive<FormRules>({
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: ['blur', 'change'] }],
  password: [
    { required: true, message: '请输入新密码', trigger: ['blur', 'change'] },
    { min: 6, max: 15, message: '密码长度应在6~15位之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: ['blur', 'change'] },
    { min: 6, max: 15, message: '密码长度应在6~15位之间', trigger: 'blur' },
    { validator: validatePassAgain, trigger: ['blur', 'change'] }
  ]
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  ElMessage.success('上传成功')
  infoForm.value.ext.avatar = response.data
}

const handleAvatarError: UploadProps['onError'] = (err) => {
  ElMessage.error('上传失败')
  console.error(err)
  infoForm.value.ext.avatar = ''
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像文件只能为PNG、JPG图片!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小需小于2MB!')
    return false
  }
  return true
}

const emit = defineEmits(['update:visible'])
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  try {
    if (Object.prototype.hasOwnProperty.call(infoForm.value, 'password')) {
      delete (infoForm.value as any).password
    }
  } catch (error) {
    console.error(error + 'Delete failed')
  }
  try {
    loading.value = true
    const [hasError, data] = await modUserInfo(infoForm.value)
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    ElMessage.success('修改成功')
    user.setAvatar(infoForm.value.ext.avatar)
    user.setUsername(infoForm.value.username)
    user.setGender(infoForm.value.ext.gender)
    user.setEmail(infoForm.value.email)
    emit('update:visible', false)
  } catch (error) {
    console.error(error)
    ElMessage.error('修改失败')
  } finally {
    loading.value = false
  }
}

const changePassword = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  try {
    loading.value = true
    const [hasError, data] = await changePasswordApi({
      currentPassword: passForm.value.oldPassword,
      newPassword: passForm.value.password
    })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    ElMessage.success('修改成功')
    setTimeout(() => {
      emit('update:visible', false)
      auth.clearAuth()
      window.location.href = '/auth/login'
    }, 1000)
  } catch (error) {
    console.error(error)
    ElMessage.error('修改失败')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  infoForm.value = {
    account: props.account,
    email: props.email,
    username: props.username,
    ext: {
      avatar: props.avatar,
      gender: props.gender
    }
  }
}

onMounted(() => {
  if (!isURL(props.avatar)) {
    infoForm.value.ext.avatar = ''
  }
})
</script>
<style lang="scss" scoped>
.avatar-uploader {
  text-align: center;
  margin-bottom: 1rem;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
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
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
