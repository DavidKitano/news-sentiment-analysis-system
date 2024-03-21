<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside>
        <nsas-box>
          <div class="date-range-picker-box">
            <el-date-picker
              v-model="trendDateRange"
              type="daterange"
              unlink-panels
              range-separator="～"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
              :shortcuts="shortcuts"
              format="YYYY-MM-DD"
            />
            <div style="flex-grow: 1"></div>
            <el-button type="primary" @click="getPieChart()">查询</el-button>
          </div>
        </nsas-box>
        <nsas-box class="content-box">
          <div v-if="pieChartData.length > 0">
            <chart-pie :datums="transformedPieData" />
          </div>
          <el-empty v-else description="暂无数据" />
        </nsas-box>
      </el-aside>
      <el-main>
        <nsas-box>
          <div class="date-range-picker-box">
            <el-select
              v-model="trendDimension"
              placeholder="选择维度"
              style="width: 100px"
              @change="trendClusterType = ''"
            >
              <el-option label="天维度" :value="TrendDimension.DAY" />
              <el-option label="周维度" :value="TrendDimension.WEEK" />
            </el-select>
            <el-select
              :disabled="!trendImageTypeDisabled"
              v-model="trendClusterType"
              placeholder="选择聚类图选项"
              style="width: 300px"
            >
              <el-option v-for="item of clusterOptions" :key="item.label" :label="item.label" :value="item.value" />
            </el-select>
            <div style="flex-grow: 1"></div>
            <el-button :disabled="!trendImageTypeDisabled" type="primary" @click="getClusterImage()">查询</el-button>
          </div>
        </nsas-box>
        <nsas-box class="content-box" v-loading="clusterLoading">
          <el-image style="width: 100%" :src="clusterImageSrc" v-if="clusterImageSrc">
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
          <el-empty v-else description="暂无数据" />
        </nsas-box>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { TrendDimension, type SentimentAnalysisVO, Sentiment } from '@/api/trend/type'
import { getTrendClusterOptions, getTrendCluster, getTrendSentiment } from '@/api/trend'

type OptionType = {
  label: string
  value: string
}

const trendDateRange = ref('')
const trendDimension = ref<TrendDimension>(TrendDimension.DAY)
const trendClusterType = ref('')
const pieChartData = ref<SentimentAnalysisVO[]>([])
const clusterOptions = ref<OptionType[]>([])
const clusterImageSrc = ref('')
const clusterLoading = ref(false)

const trendImageTypeDisabled = computed(() => {
  return trendDimension.value === TrendDimension.WEEK || trendDimension.value === TrendDimension.DAY
})
const transformedPieData = computed(() => {
  return pieChartData.value.map((item) => ({
    value: item.count || 0,
    name: getSentimentLabel(item.tag as Sentiment)
  }))
})

const getSentimentLabel = (sentiment: Sentiment) => {
  if (!sentiment) return ''
  switch (sentiment) {
    case Sentiment.NEGATIVE:
      return '负面'
    case Sentiment.NEUTRAL:
      return '中立'
    case Sentiment.POSITIVE:
      return '正面'
    default:
      return ''
  }
}

const shortcuts = [
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '上个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '上三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  },
  {
    text: '上半年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
      return [start, end]
    }
  },
  {
    text: '上一年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      return [start, end]
    }
  }
]

const getPieChart = async () => {
  try {
    if (!trendDateRange.value) return ElMessage.error('请选择时间')
    if (Array.isArray(trendDateRange.value) && trendDateRange.value.length !== 2) return ElMessage.error('请选择时间')
    const [start, end] = trendDateRange.value
    const [hasError, data] = await getTrendSentiment({
      startTime: start,
      endTime: end
    })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    pieChartData.value = data.data
  } catch (error) {
    console.log('error', error)
    ElMessage.error('获取趋势图数据失败')
  }
}

const getOptions = async () => {
  try {
    const [hasError, data] = await getTrendClusterOptions({ dimension: trendDimension.value })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    const tempData = data.data.map((item) => ({ label: item, value: item }))
    clusterOptions.value.push(...tempData)
  } catch (error) {
    console.log('error', error)
    ElMessage.error('获取聚类图选项数据失败')
  }
}

const getClusterImage = async () => {
  if (!trendClusterType.value) {
    return ElMessage.error('请选择聚类图选项')
  }
  clusterLoading.value = true
  try {
    const [hasError, data] = await getTrendCluster({
      options: trendClusterType.value
    })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    clusterImageSrc.value = data.data
  } catch (error) {
    console.log('error', error)
    ElMessage.error('获取聚类图数据失败')
  } finally {
    clusterLoading.value = false
  }
}

watch(trendDimension, async () => {
  clusterOptions.value = []
  await getOptions()
})

onMounted(async () => {
  await getOptions()
})
</script>
<style lang="scss" scoped>
.container {
  .el-aside {
    margin-left: 20px;
    width: 50%;
  }
  .content-box {
    overflow: hidden;
    margin-top: 10px;
  }

  .date-range-picker-box {
    display: flex;
    gap: 5px;
    overflow: hidden;
    box-sizing: border-box;
  }
}
</style>
