<template>
  <star-link>
    <section id="text">
      <h2>现在时间</h2>
      <span><time-countdown /></span>
      <el-divider />
      <div>
        <img src="/logo-bg.png" alt="NSAS Logo" :draggable="false" />
        <div>
          <h1>新闻舆情分析系统</h1>
          <h2>
            <span class="highlight">N</span>ews&nbsp;<span class="highlight">S</span>entiments&nbsp;<span
              class="highlight"
              >A</span
            >nalysis&nbsp;<span class="highlight">S</span>ystem
          </h2>
        </div>
      </div>
      <el-button type="primary" size="large" plain :auto-insert-space="true" @click="closeWelcome"> 进入 </el-button>
    </section>
  </star-link>
</template>
<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const closeWelcome = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
<style lang="scss" scoped>
#text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;

  .el-button {
    width: 10rem;
    font-size: 1rem;
    margin: 20px;
  }

  .highlight {
    color: rgb(255, 200, 0);
  }

  p {
    font-size: 2rem;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
  }

  img {
    width: 120px;
    height: 120px;
    margin: 0 10px;
    clip-path: circle(50%);
  }
}
</style>
