<template>
  <component
    :is="getComponentTagName()"
    class="privacy-container"
    v-model="showDrawer"
    direction="btt"
    size="60%"
    :z-index="99999999"
    :title="title"
    :append-to-body="true"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <template v-if="useDrawer" #header>
      <h1>{{ title }}</h1>
    </template>
    <el-scrollbar @scroll="handleScroll">
      <h1 v-if="!useDrawer">{{ title }}</h1>
      <div class="privacy-content-container" ref="contentContainerRef">
        <section class="privacy-content" v-for="(item, index) of content" :key="item.title || index">
          <template v-if="item.title">
            <h3>{{ item.title }}</h3>
          </template>
          <p>{{ item.content }}</p>
        </section>
        <slot></slot>
      </div>
    </el-scrollbar>
    <template v-if="useConfirm" #footer>
      <el-button type="primary" :disabled="!isAvailable" @click="agreePrivacy">
        <span>我知晓且同意</span> <span v-show="privacyCountDown > 0">({{ privacyCountDown }})</span>
      </el-button>
    </template>
  </component>
</template>

<script lang="ts" setup>
type PrivacyContentType = {
  title?: string
  content: string
}

const props = withDefaults(
  defineProps<{
    title: string
    content: Array<PrivacyContentType>
    useDrawer?: boolean
    useConfirm?: boolean
  }>(),
  {
    useDrawer: true,
    useConfirm: true
  }
)
let contentContainerRef = ref()
const isAgreed = ref(false)
const isBottom = ref(false)
const privacyCountDown = ref(5)
const isAvailable = computed(() => {
  // return isBottom.value && privacyCountDown.value <= 0
  return privacyCountDown.value <= 0
})
const showDrawer = computed({
  set(val: boolean) {
    return val
  },
  get() {
    return props.useDrawer && !isAgreed.value
  }
})
const getComponentTagName = () => {
  return props.useDrawer ? ElDrawer : 'div'
}

const agreePrivacy = () => {
  localStorage.setItem('nsas_cookiesAgreed', 'true')
  isAgreed.value = true
}

const handleScroll = ({ scrollTop }: { scrollTop: number }) => {
  isBottom.value = scrollTop >= contentContainerRef.value.scrollHeight - 400
}
const handleTimer = () => {
  let lastUpdateTime = 0 // 上次更新时间
  const _updateData = (timestamp: number) => {
    if (!lastUpdateTime) lastUpdateTime = timestamp
    const _delta = timestamp - lastUpdateTime

    if (_delta >= 1000) {
      privacyCountDown.value-- // 显示更新后的数据
      lastUpdateTime = timestamp
    }

    if (privacyCountDown.value > 0) {
      requestAnimationFrame(_updateData)
    }
  }

  requestAnimationFrame(_updateData)
}
onMounted(() => {
  handleTimer()
  const agreeCondition = localStorage.getItem('nsas_cookiesAgreed')
  isAgreed.value = agreeCondition === 'true'
})
</script>

<style lang="scss" scoped>
:global(.privacy-container .el-drawer__header) {
  margin-bottom: 0;
}

@for $hTagItem from 1 through 6 {
  h#{$hTagItem} {
    margin: 0;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
}
.privacy-container {
  padding: 1rem;
}
.privacy-content {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  text-indent: 2rem;
  color: #252525;
}
</style>
<style lang="scss"></style>
