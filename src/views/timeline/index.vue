<template>
  <div class="common-layout">
    <el-container class="container">
      <el-affix :offset="70">
        <el-aside>
          <nsas-box class="date-picker-box">
            <el-date-picker
              v-model="currentMonth"
              type="month"
              placeholder="Pick a month"
              value-format="YYYY-MM"
              style="width: 100%"
              @change="getTimeline()"
            />
          </nsas-box>
          <nsas-box>
            <el-scrollbar max-height="500px" always>
              <el-anchor type="underline" :offset="120" :bound="20">
                <el-anchor-link v-for="time of timeSets" :key="time" :href="`#date-${time}`">
                  {{ time }}
                </el-anchor-link>
              </el-anchor>
              <el-empty v-if="timeSets.length <= 0" description="暂无可用数据" />
            </el-scrollbar>
          </nsas-box>
        </el-aside>
      </el-affix>
      <el-main>
        <nsas-box v-loading="loading">
          <el-timeline>
            <template v-for="item in timelineData" :key="item.date">
              <el-timeline-item
                :id="`date-${item.date}`"
                :timestamp="item.date"
                type="primary"
                size="large"
                hollow
                placement="top"
              >
                <el-card class="news" v-for="news of item.newsList" :key="news.title">
                  <div class="news-content">
                    <div class="news-image-box" v-if="news.avatar">
                      <el-image :src="news.avatar" fit="cover" style="width: 150px">
                        <template #error>
                          <div class="image-slot err-block">
                            <el-icon><i-ep-picture /></el-icon>
                          </div>
                        </template>
                        <template #placeholder>
                          <div class="image-slot err-block">
                            <el-icon class="is-loading"><i-ep-loading /></el-icon>
                          </div>
                        </template>
                      </el-image>
                    </div>
                    <div class="news-text-box">
                      <h2>{{ news.title }}</h2>
                      <el-divider />
                      <div class="sub-info">
                        <el-text>新闻id：</el-text>
                        <el-link type="primary" :href="`/news/${news.newsId}`" target="_blank">
                          {{ news.newsId }}
                        </el-link>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </template>
          </el-timeline>
        </nsas-box>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { getTimeline as getTimelineApi } from '@/api/timeline'
import type { TimeLineVO } from '@/api/timeline/type'
import dayjs from 'dayjs'

const currentMonth = ref<string>(`${dayjs().format('YYYY-MM')}`)
const timelineData = ref<TimeLineVO[]>([])
const loading = ref<boolean>(false)
const timeSets = computed(() => {
  return timelineData.value
    .map((item) => {
      if (item.newsList && item.newsList.length > 0) {
        return item.date
      }
    })
    .filter((item) => item)
})

const getTimeline = async () => {
  loading.value = true
  try {
    const [hasError, data] = await getTimelineApi({ month: currentMonth.value })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    timelineData.value = data.data || []
  } catch (e) {
    console.error(e)
    ElMessage.error('获取时间线失败')
  } finally {
    loading.value = false
  }
}
onMounted(async () => {
  await getTimeline()
})
</script>
<style lang="scss" scoped>
.container {
  .el-aside {
    margin-left: 20px;
  }
  .date-picker-box {
    margin-bottom: 10px;
  }
  .news {
    margin-bottom: 20px;
    .news-content {
      display: flex;
      align-items: center;
      .news-image-box {
        margin-right: 10px;
      }
    }
    :deep(.el-divider--horizontal) {
      margin: 10px 0;
    }
    h2 {
      font-size: 18px;
    }
  }
  .sub-info {
    display: flex;
    align-items: center;
    el-link {
      margin-left: 10px;
    }
  }
}
</style>
