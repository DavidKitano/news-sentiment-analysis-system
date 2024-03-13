<template>
  <div class="nsas-box">
    <el-card :shadow="shadow">
      <template v-if="$slot.header" #header>
        <slot name="header"></slot>
      </template>
      <slot></slot>
      <template v-if="$slot.footer" #footer>
        <slot name="footer"></slot>
      </template>
    </el-card>
  </div>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    shadow?: 'hover' | 'always' | 'never'
  }>(),
  {
    shadow: 'hover'
  }
)

const $slot = useSlots()
</script>
<style lang="scss" scoped></style>
