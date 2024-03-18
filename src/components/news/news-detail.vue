<template>
  <nsas-box>
    <el-page-header :icon="ArrowLeft">
      <template #title><div @click="back">返回</div></template>
      <template #content>
        <span class="text-large font-600 mr-3"> 新闻详情 </span>
      </template>
      <div class="mt-4 text-sm font-bold">
        <el-tabs v-model="activeName" type="border-card" class="demo-tabs">
          <el-tab-pane label="Tiếng Việt" name="vi">
            <news-detail-content lang="vi" :id="id" />
          </el-tab-pane>
          <el-tab-pane label="中文" name="cn">
            <news-detail-content lang="cn" :id="id" />
          </el-tab-pane>
          <el-tab-pane label="English" name="en">
            <news-detail-content lang="en" :id="id" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-page-header>
  </nsas-box>
</template>
<script lang="ts" setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

defineProps<{
  id: string
}>()

const router = useRouter()

const activeName = ref<'vi' | 'cn' | 'en'>('vi')

const back = () => {
  router.back()
}
</script>
