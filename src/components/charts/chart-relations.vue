<template>
  <div class="chart-relation" style="width: 100%; height: 100%">
    <el-button v-if="cachePool.length > 0" class="icon pointer" type="primary" circle @click="handleBack">
      <el-icon>
        <i-ep-arrow-left />
      </el-icon>
    </el-button>
    <el-scrollbar>
      <div id="relationChart" ref="chartRef" style="width: 100%; height: 70vh"></div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import type { GraphResultVO } from '@/api/relationship/type'
import { objDeepEqual } from '@/utils/common'
import * as echarts from 'echarts'
const props = defineProps<{
  datums: GraphResultVO
}>()

const chartRef = ref<HTMLDivElement>()
const cachePool = ref<any[]>([])

const formattedData = ref(props.datums)
formattedData.value.nodes!.forEach((node) => {
  if (!node.name) return
  node.name = node.name.length > 15 ? node.name.slice(0, 15) + '...' : node.name
})
let relationChart: echarts.ECharts

const emit = defineEmits(['onGetData', 'onBack'])

const pushCache = (data: any) => {
  if (cachePool.value.length > 0 && objDeepEqual(data, cachePool.value[cachePool.value.length - 1])) return
  cachePool.value.push(data)
}
const handleClick = (e: any) => {
  pushCache(formattedData.value)
  emit('onGetData', { id: e.data.id, category: e.data.category })
}
const handleBack = () => {
  emit('onBack', true)
  formattedData.value = cachePool.value.pop()
  relationChart.setOption({
    series: [
      {
        data: formattedData.value.nodes,
        links: formattedData.value.links,
        categories: formattedData.value.categories
      }
    ]
  } as any)
}

const initChart = () => {
  const option = {
    tooltip: {},
    legend: [
      {
        // selectedMode: 'single',
        data: formattedData.value.categories!.map((a: { name?: string }) => a.name)
      }
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 30,
        force: {
          repulsion: 200, // 斥力因子 决定节点之间的距离
          gravity: 0.1, // 引力因子 越大离中心越近
          edgeLength: 100 //边的两个节点的距离
        },
        data: formattedData.value.nodes,
        links: formattedData.value.links,
        categories: formattedData.value.categories,
        legend: [
          {
            // selectedMode: 'single',
            data: formattedData.value!.categories!.map((a) => a.name)
          }
        ],
        roam: true,
        label: {
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3,
          width: 3
        },
        itemStyle: {
          borderWidth: 50
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          }
        }
      }
    ]
  }
  relationChart = echarts.init(chartRef.value)
  relationChart.setOption(option as any)
  relationChart.resize()
  relationChart.on('click', handleClick)
  window.addEventListener('resize', () => {
    relationChart.resize()
  })
}

onMounted(() => {
  initChart()
})

watch(
  () => props.datums,
  (newVal: {
    categories?: { name?: string | undefined }[] | undefined
    links?: { source?: string | undefined; target?: string | undefined }[] | undefined
    nodes?:
      | {
          category?: number | undefined
          id?: string | undefined
          label?: { show?: boolean | undefined } | undefined
          name?: string | undefined
          value?: string | undefined
        }[]
      | undefined
  }) => {
    formattedData.value = newVal
    formattedData.value.nodes!.forEach((node) => {
      if (!node.name) return
      node.name = node.name.length > 15 ? node.name.slice(0, 15) + '...' : node.name
    })
    relationChart.setOption({
      series: [
        {
          data: formattedData.value.nodes,
          links: formattedData.value.links,
          categories: formattedData.value.categories
        }
      ]
    } as any)
  }
)

onUnmounted(() => {
  relationChart.dispose()
})
</script>
<style lang="scss" scoped>
.chart-relation {
  position: relative;
  width: 100%;
  height: 100%;
}

#relationChart {
  width: 100%;
  height: 500px;
}

.icon {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 999999;
}
</style>
