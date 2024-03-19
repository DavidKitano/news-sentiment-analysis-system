<template>
  <el-main v-loading="loading">
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
      <img v-if="form.ext.avatar" :src="form.ext.avatar" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><i-ep-plus /></el-icon>
    </el-upload>
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto" status-icon>
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account" placeholder="请输入账号" :disabled="true" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" type="email" />
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="form.ext.gender" placeholder="请选择性别">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label=" " class="register-btn-group">
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button @click="resetForm()">恢复修改</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>
<script setup lang="ts">
import { modUserInfo } from '@/api/user'
import { isURL } from '@/utils/common'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'

const props = withDefaults(
  defineProps<{
    id: string
    gender?: string
    account?: string
    email?: string
    username?: string
    avatar?: string
  }>(),
  {
    gender: '保密',
    account: '',
    email: '',
    username: '',
    avatar: ''
  }
)

const ruleFormRef = ref<FormInstance>()

const loading = ref<boolean>(false)

const form = ref({
  account: props.account,
  email: props.email,
  username: props.username,
  ext: {
    avatar: props.avatar,
    gender: props.gender
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

const rules = reactive<FormRules>({
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

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  ElMessage.success('上传成功')
  form.value.ext.avatar = response.data
}

const handleAvatarError: UploadProps['onError'] = (err) => {
  ElMessage.error('上传失败')
  console.error(err)
  form.value.ext.avatar = ''
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile.type)
  if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像文件只能为PNG、JPG图片!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小需小于2MB!')
    return false
  }
  return true
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  try {
    if (Object.prototype.hasOwnProperty.call(form.value, 'password')) {
      delete (form.value as any).password
    }
  } catch (error) {
    console.error(error + 'Delete failed')
  }
  try {
    loading.value = true
    const [hasError, data] = await modUserInfo(form.value)
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    ElMessage.success('修改成功')
  } catch (error) {
    console.error(error)
    ElMessage.error('修改失败')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
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
    form.value.ext.avatar = ''
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
