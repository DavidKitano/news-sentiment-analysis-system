<template>
  <div class="chart-histogram">
    <el-scrollbar>
      <div
        id="histogramChart"
        ref="chartRef"
        :style="{
          width: dataCount * 30 + 'px',
          height: 500 + 'px'
        }"
      ></div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { objectToArrayWithValue, separateArray } from '@/utils/common'
import * as echarts from 'echarts'
const props = defineProps<{
  datums: {
    [key: string]: any
  }
}>()

const chartRef = ref<HTMLDivElement>()
const dataCount = computed(() => {
  return Object.keys(props.datums).length
})

const initChart = () => {
  const [AxisData, seriesData] = separateArray(objectToArrayWithValue(props.datums))
  const option = {
    grid: {
      top: '30px',
      left: '0',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: { data: AxisData, type: 'category', axisLabel: { rotate: 45 } },
    yAxis: {},
    series: [
      {
        type: 'bar',
        showBackground: true,
        realtimeSort: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        label: {
          show: true,
          position: 'top'
        },
        data: seriesData,
        barWidth: '80%'
      }
    ]
  }
  const histogramChart = echarts.init(chartRef.value)
  histogramChart.setOption(option)
  histogramChart.resize()
  window.addEventListener('resize', () => {
    histogramChart.resize()
  })
}

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  echarts.dispose(chartRef.value as HTMLDivElement)
})
</script>
<style lang="scss" scoped>
.chart-histogram {
  width: 100%;
  height: 100%;
}

#histogramChart {
  width: 100%;
  height: 500px;
}
</style>
import { separateArray, objectToArrayWithValue } from '@/utils/common';
