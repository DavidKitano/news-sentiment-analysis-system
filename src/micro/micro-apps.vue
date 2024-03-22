<template>
  <div v-if="specificRoute === 'user'">
    <micro-app name="user" :url="`http://${hostname}:20202/`" iframe></micro-app>
  </div>
  <div v-else-if="specificRoute === 'dict'">
    <micro-app name="dict" :url="`http://${hostname}:30303/`" iframe></micro-app>
  </div>
  <div v-else-if="specificRoute === 'news'">
    <micro-app name="news" :url="`http://${hostname}:40404/`" iframe></micro-app>
  </div>
  <div v-else>
    <auth-error>
      <h1>404 Not Found - 页面未找到</h1>
      <p>您访问的页面不存在</p>
    </auth-error>
  </div>

  <nsas-box class="back-btn grabbing">
    <el-button type="primary" round @click="backToMain">返回主页</el-button>
  </nsas-box>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const backToMain = () => {
  window.location.href = '/'
}

const hostname = computed(() => {
  return window.location.hostname
})
const specificRoute = computed(() => route.params.routeName as string)

onMounted(() => {
  const backBtn = document.querySelector('.back-btn') as HTMLDivElement
  if (backBtn) {
    const onMouseMove = (e: { pageX: number; pageY: number }) => {
      if (!isDragging) return

      let newX = originalX + (e.pageX - startX)
      let newY = originalY + (e.pageY - startY)

      // 获取视口尺寸
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // 获取按钮尺寸
      const btnWidth = backBtn.offsetWidth
      const btnHeight = backBtn.offsetHeight

      // 检查并修正 newX 和 newY，确保按钮不会移出视口
      if (newX < 0) newX = 0
      if (newY < 0) newY = 0
      if (newX + btnWidth > viewportWidth) newX = viewportWidth - btnWidth
      if (newY + btnHeight > viewportHeight) newY = viewportHeight - btnHeight

      backBtn.style.left = `${newX}px`
      backBtn.style.top = `${newY}px`
    }

    const onMouseUp = () => {
      isDragging = false
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    let isDragging = false
    let startX: number, startY: number, originalX: number, originalY: number

    backBtn.addEventListener('mousedown', function (e) {
      e.stopPropagation()
      e.preventDefault()
      isDragging = true
      startX = e.pageX
      startY = e.pageY
      originalX = this.getBoundingClientRect().left
      originalY = this.getBoundingClientRect().top
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    })
  }
})
</script>
<style>
.back-btn {
  position: absolute;
  width: min-content;
  bottom: 50px;
  right: 50px;
  z-index: 999999;
}
.grabbing {
  cursor: grabbing;
}
</style>
