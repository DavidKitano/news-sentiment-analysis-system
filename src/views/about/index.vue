<template>
  <div class="about">
    <section style="margin-top: 10px">
      <el-tabs v-model="currentTab" type="border-card">
        <el-tab-pane label="前端" name="front">
          <h1 align="center">该项目前端部分使用以下技术栈进行开发</h1>
          <section class="list">
            <section class="row">
              <section class="item">
                <h3>基本技术栈</h3>
                <li>开发环境：Node 20</li>
                <li>基本框架：Vue 3</li>
                <li>路由：Vue Router</li>
                <li>打包工具：Vite</li>
                <li>测试：Vitest</li>
                <li>状态管理：Pinia</li>
                <li>类型语言：TypeScript</li>
                <li>图表：eCharts</li>
                <li>微前端：MicroApp</li>
              </section>
              <section class="item">
                <h3>样式处理</h3>
                <li>预处理器：Sass/Scss</li>
                <li>后处理器：PostCss</li>
                <li>样式标准库：Normalize.css</li>
                <li>组件库：Element Plus</li>
                <li>图标化框架：Iconify</li>
                <li>SVG组件化：Vite SVG Loader</li>
              </section>
            </section>
            <section class="row">
              <section class="item">
                <h3>应用类/接口访问/通用算法等</h3>
                <li>API访问：Axios</li>
                <li>加密处理：Crypto.js</li>
                <li>日期类处理：Day.js</li>
                <li>数学运算：Decimal.js</li>
                <li>工具类：Lodash</li>
                <li>图像生成：GPT-4</li>
              </section>
              <section class="item">
                <h3>前端工程化</h3>
                <li>包管理器：pnpm</li>
                <li>样式标准化：Eslint</li>
                <li>代码格式化：Prettier</li>
                <li>提交格式化：Commit Lint</li>
                <li>拼写检查：CSpell</li>
                <li>Git Hooks：Husky</li>
                <li>暂存区运行：lint-staged</li>
                <li>接口管理：ApiFox</li>
                <li>容器、反向代理：Docker & Nginx Config</li>
                <li>代码管理、自动化、部署：Git & GitHub Action CI & Jenkins</li>
              </section>
            </section>
          </section>
        </el-tab-pane>
        <el-tab-pane label="后端" name="back">
          <h1 align="center">该项目后端部分使用以下技术栈进行开发</h1>
          <el-image
            style="width: 33.3333%"
            src="src\assets\images\backend1.png"
            :preview-src-list="backendImages"
            :initial-index="0"
          />
          <el-image
            style="width: 33.3333%"
            src="src\assets\images\backend2.png"
            :preview-src-list="backendImages"
            :initial-index="1"
          />
          <el-image
            style="width: 33.3333%"
            src="src\assets\images\backend3.png"
            :preview-src-list="backendImages"
            :initial-index="2"
          />
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>
<script setup lang="ts">
const currentTab = ref('front')
const backendImages = ref([
  'src/assets/images/backend1.png',
  'src/assets/images/backend2.png',
  'src/assets/images/backend3.png'
])
</script>
<style lang="scss" scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}

.list {
  display: flex;
  flex-direction: row;
  gap: 5rem;
  justify-content: center;
  align-items: center;

  .row {
    .item {
      margin: 2rem;
    }
  }
}
</style>
