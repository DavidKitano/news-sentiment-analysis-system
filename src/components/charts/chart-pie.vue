<template>
  <div class="chart-pie">
    <el-scrollbar>
      <div id="pieChart" ref="chartRef"></div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts'
const props = defineProps<{
  datums: {
    value: number | string
    name: string
  }[]
}>()

const chartRef = ref<HTMLDivElement>()
let pieChart: echarts.ECharts

const initChart = () => {
  const option = {
    grid: {
      top: '30px',
      left: '0',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    legend: {},
    series: [
      {
        type: 'pie',
        label: {
          show: true,
          formatter: '{b}: {c} ({d}%)'
        },
        data: props.datums
      }
    ]
  }
  pieChart = echarts.init(chartRef.value)
  pieChart.setOption(option)
  pieChart.resize()
  window.addEventListener('resize', () => {
    pieChart.resize()
  })
}

onUpdated(() => {
  pieChart.setOption({
    series: [
      {
        data: props.datums
      }
    ]
  })
})

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  pieChart.dispose()
})
</script>
<style lang="scss" scoped>
.chart-pie {
  width: 100%;
  height: 100%;
}

#pieChart {
  width: 100%;
  height: 500px;
}
</style>
