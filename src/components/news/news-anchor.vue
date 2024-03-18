<template>
  <el-anchor type="underline" :offset="70">
    <el-anchor-link v-for="item of catalogue.list" :key="item.label" :href="`#${item.anchor}`">
      {{ item.label }}
    </el-anchor-link>
  </el-anchor>
</template>
<script lang="ts" setup>
import { useCatalogue } from '@/stores/news/catalogue'

const catalogue = useCatalogue()
</script>
