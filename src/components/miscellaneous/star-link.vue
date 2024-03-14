<template>
  <canvas :class="customizedClass" id="canvas"> 对不起, 你的浏览器不支持画布, 请升级浏览器! </canvas>
  <slot></slot>
</template>
<script lang="ts" setup>
const props = defineProps<{ class?: string | Array<string> }>()

const customizedClass = computed(() => {
  const prefix = 'canvas-container '
  if (Array.isArray(props.class)) {
    return prefix + props.class.join(' ')
  }
  return prefix + props.class
})

let resize: EventListenerOrEventListenerObject
onMounted(() => {
  let num = 200 //星星数
  const star: { [key: string]: number }[] = [] //星星位置
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement

  // 设置画布宽高为浏览器宽高
  if (!canvas) return
  const w = (canvas.width = window.innerWidth)
  const h = (canvas.height = window.innerHeight)

  //获取上下文
  const ctx = canvas.getContext('2d')

  resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  window.addEventListener('resize', resize)

  /**
   * 绘制星星
   * @param x x坐标
   * @param y y坐标
   * @param starSize 星星大小
   * @param starColor 星星颜色
   */
  const drawStar = (x: number, y: number, starSize = 1.5, starColor = 'white') => {
    if (!ctx) return
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = starColor
    ctx.arc(x, y, starSize, Math.PI * 2, Math.PI * 2, true)
    ctx.fill()
    ctx.restore()
  }

  /**
   * 连接相邻的星星
   * @param centerX 中心星星x坐标
   * @param centerY 中心星星y坐标
   * @param lineWidth 连接线宽度
   * @param lineColor 连接线颜色
   */
  const link = (centerX: number, centerY: number, lineWidth = '0.3', lineColor = 'white') => {
    if (!ctx) return
    for (let i = 0; i < num; i++) {
      // 勾股定理算相邻距离
      const distance = Math.pow(Math.pow(centerX - star[i].x, 2) + Math.pow(centerY - star[i].y, 2), 0.5)
      if (distance < 50) {
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(star[i].x, star[i].y)
        ctx.strokeStyle = lineColor
        ctx.lineWidth = Number(lineWidth)
        ctx.stroke()
        ctx.restore()
      }
    }
  }

  /**
   * 星星移动
   */
  const move = () => {
    if (!ctx) return
    ctx.clearRect(0, 0, w, h)
    // 加上长尾效果
    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < num; i++) {
      // 当星星到达屏幕边界时, 转换移动方向
      star[i].x0 = star[i].x < 0 || star[i].x > w ? -star[i].x0 : star[i].x0
      star[i].y0 = star[i].y < 0 || star[i].y > h ? -star[i].y0 : star[i].y0
      // 使星星移动
      star[i].x += star[i].x0
      star[i].y += star[i].y0
      drawStar(star[i].x, star[i].y)
      // 连接相邻的星星
      link(star[i].x, star[i].y)
    }
  }

  // 创建星星
  for (let i = 0; i < num; i++) {
    star[i] = {
      x: Math.random() * w,
      y: Math.random() * h,
      x0: Math.random() * 0.5 - 0.25,
      y0: Math.random() * 0.5 - 0.25
    }
    drawStar(star[i].x, star[i].y)
  }

  // 定时使星星移动
  setInterval(() => {
    move()
  }, 13)

  // 监听鼠标移动事件 添加鼠标位置的星星
  canvas.addEventListener('mousemove', (e) => {
    // 移动后先将上一次push的star删除掉
    star.pop()
    // 增加一个星星
    num = star.push({
      x: e.clientX,
      y: e.clientY,
      x0: 0,
      y0: 0
    })
    // 连接新增的星星与其附近的星星
    link(e.clientX, e.clientY)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>
<style lang="scss" scoped>
#canvas {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #000;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
