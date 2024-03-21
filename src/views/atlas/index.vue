<template>
  <div class="common-layout">
    <el-container class="container">
      <el-main>
        <nsas-box class="atlas-header">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="节点数">
              <el-input-number v-model="limit" :min="1" />
            </el-form-item>
            <el-form-item label="搜索">
              <el-input v-model="keyword" style="width: 240px" placeholder="输入关键词" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getAtlasCharts">查询</el-button>
            </el-form-item>
          </el-form>
        </nsas-box>
        <nsas-box v-loading="chartLoading">
          <div v-if="atlasChartData?.nodes?.length! > 0">
            <chart-relations :datums="atlasChartData!" :news-list="newsList" @on-get-data="updateChartData" />
          </div>
          <el-empty v-else description="暂无数据" />
        </nsas-box>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { getRelationship, getRelationshipNewsId, getRelationshipPersonId } from '@/api/relationship'
import type { GraphNewsVO, GraphResultVO } from '@/api/relationship/type'

const limit = ref<number>(100)
const keyword = ref<string>('')
const atlasChartData = ref<GraphResultVO>()
const newsList = ref<GraphNewsVO[]>([])
const chartLoading = ref<boolean>(false)

const updateChartData = ({ id, category }: { id: number; category: number }) => {
  if (category === 1) {
    getChartCentralizedByNews(id)
  } else {
    getChartCentralizedById(id)
  }
}

const getAtlasCharts = async () => {
  chartLoading.value = true
  try {
    const [hasError, data] = await getRelationship({
      limit: limit.value,
      keyword: keyword.value,
      currentPage: 0 // 占位
    })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    atlasChartData.value = data.data
  } catch (error) {
    console.log(error)
    ElMessage.error('获取图谱数据失败')
  } finally {
    chartLoading.value = false
  }
}

const getChartCentralizedByNews = async (newsNodeId: number) => {
  chartLoading.value = true
  try {
    const [hasError, data] = await getRelationshipNewsId({
      id: newsNodeId,
      limit: limit.value
    })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    atlasChartData.value = data.data
  } catch (error) {
    console.log(error)
    ElMessage.error('获取以新闻中心的图谱数据失败')
  } finally {
    chartLoading.value = false
  }
}

const getChartCentralizedById = async (personNodeId: number) => {
  chartLoading.value = true
  try {
    const [hasError, data] = await getRelationshipPersonId({ id: personNodeId, limit: limit.value })
    if (hasError) {
      return data?.msg && ElMessage.error(data.msg)
    }
    atlasChartData.value = data.data.graphData
    if (data.data.newsList) {
      newsList.value = data.data.newsList
    }
  } catch (error) {
    console.log(error)
    ElMessage.error('获取以新闻中心的图谱数据失败')
  } finally {
    chartLoading.value = false
  }
}

onMounted(async () => {
  await getAtlasCharts()
})
</script>
<style lang="scss" scoped>
.atlas-header {
  margin-bottom: 10px;
}
</style>
