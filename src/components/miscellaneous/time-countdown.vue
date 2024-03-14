<script setup lang="ts">
import dayjs from 'dayjs'

const now = ref(dayjs(`${new Date()}`).format('YYYY-MM-DD HH:mm:ss'))
let timer: number | null = null

const updateNow = () => {
  timer = requestAnimationFrame(() => {
    now.value = dayjs(`${new Date()}`).format('YYYY-MM-DD HH:mm:ss')
    updateNow()
  })
}
onMounted(() => {
  updateNow()
})
onUnmounted(() => {
  if (timer) cancelAnimationFrame(timer)
})
</script>

<template>
  {{ now }}
</template>
