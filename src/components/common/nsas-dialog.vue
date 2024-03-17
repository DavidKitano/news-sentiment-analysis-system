<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="title"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :center="center"
    :align-center="alignCenter"
  >
    <template v-if="$slot.header" #header>
      <div class="dialog-header"><slot name="header"></slot></div>
    </template>
    <slot></slot>
    <template v-if="$slot.footer" #footer>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    width?: number
    closeOnClickModal?: boolean
    closeOnPressEscape?: boolean
    showClose?: boolean
    center?: boolean
    alignCenter?: boolean
  }>(),
  {
    title: '提示',
    width: 500,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    showClose: false,
    center: true,
    alignCenter: true
  }
)

const $slot = useSlots()
const emit = defineEmits(['update:modelValue'])

const centerDialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
})
</script>
<style lang="scss" scoped>
:global(.el-dialog .el-main) {
  padding: 0;
}
</style>
