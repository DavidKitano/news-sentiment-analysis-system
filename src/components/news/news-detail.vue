<template>
  <nsas-box>
    <el-page-header :icon="ArrowLeft">
      <template #title><div @click="back">返回</div></template>
      <template #content>
        <span class="text-large font-600 mr-3"> 新闻详情 </span>
      </template>
      <div class="mt-4 text-sm font-bold">
        <news-detail-content :lang="activeName" :id="id">
          <template #titleTab>
            <el-tabs v-model="activeName" tabPosition="left">
              <el-tab-pane label="Tiếng Việt" name="vi" />
              <el-tab-pane label="中文" name="cn" />
              <el-tab-pane label="English" name="en" />
            </el-tabs>
          </template>
        </news-detail-content>
      </div>
    </el-page-header>
  </nsas-box>
</template>
<script lang="ts" setup>
import { ArrowLeft } from '@element-plus/icons-vue'

defineProps<{
  id: string
}>()

const activeName = ref<'vi' | 'cn' | 'en'>('vi')

const back = () => {
  window.location.href = '/news'
}
</script>
