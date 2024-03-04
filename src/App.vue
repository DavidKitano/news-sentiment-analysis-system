<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container class="common-content">
        <el-header>Header</el-header>
        <el-main>
          <infinite-scroll />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
      <el-aside width="200px">Aside</el-aside>
    </el-container>
  </div>
  <privacy-agree :title="privacyContent.title" :content="privacyContent.content" />
</template>
<script setup lang="ts">
// import { RouterLink } from 'vue-router'
// import HelloWorld from '@/components/common/hello-world.vue'
import { fetchVersionFile } from './utils/versionCheck'

const privacyContent = {
  title: '隐私 & Cookies使用协议',
  content: [
    {
      content:
        '欢迎您使用我们的服务！我们深知个人信息对您的重要性，并将尽最大努力保护您的隐私安全。在您使用服务前，请仔细阅读以下隐私政策，以确保您在了解所有条款的情况下作出决定。您一旦继续使用我们的服务，将被视为接受本政策的全部条款。滑动至底部后可点击按钮。'
    },
    {
      title: '一、我们收集哪些信息',
      content:
        '我们会在您使用我们的服务时自动接收并记录的您的设备上的信息，包括但不限于您提供的部分个人信息，如电子邮件地址、姓名等，您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息等数据。'
    },
    {
      title: '二、我们如何使用您的信息',
      content:
        '我们收集您的个人信息是为了向您提供服务以及提升服务质量。我们收集的信息将用于提供和改进服务、理解用户需求、提高产品质量和个性化体验。'
    },
    {
      title: '三、我们如何保护您的信息',
      content: '我们会采取合理的安全措施来保护您的个人信息，以防止数据的丢失、不当使用、未经授权的访问或披露。'
    },
    {
      title: '四、关于 Cookies',
      content:
        '我们使用 Cookies 来进行技术的开发和服务的使用，拒绝使用 Cookies 将无法使用本服务，继续使用该服务则表明您清晰地知悉这一点，且明确同意我们的使用。'
    },
    {
      title: '五、关于第三方',
      content:
        '我们不会向任何第三方提供、出售、出租、分享或交易您的个人信息。除了以下情况：合作伙伴在我们的指导下为您提供服务时；法律要求或出于安全目的，我们可能会在法律要求、法律程序、诉讼和(或)公共及政府机关的要求下披露您的个人信息。'
    },
    {
      title: '六、关于隐私政策的更改',
      content: '我们可能会不时更新我们的隐私政策。我们将通过网站公告等方式向您展示最新的隐私政策。'
    },
    {
      title: '七、如何联系我们',
      content: '如果您对本隐私政策有任何疑问、意见或建议，请通过邮箱联系我们。'
    },
    {
      content:
        '通过继续使用我们的服务，您确认已经阅读、理解并同意接受本隐私政策中描述的所有条款和条件。如果您不同意本政策的任何部分，请立即停止使用我们的服务。本隐私政策的解释权归本公司所有。'
    }
  ]
}

const msg = ref({
  version: new Date(''),
  versionText: '这是一个自定义的Vue 3搭配TypeScript、Vite等的模版',
  welcomeText: '你终于刷到我辣，现在你的身边多了一位健康的心理咨熊师'
})

onMounted(async () => {
  msg.value.version = await fetchVersionFile()
})
</script>

<style lang="scss" scoped>
.common-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .common-content {
    min-width: 600px;
  }
  .el-container {
    height: 100%;
  }
  .el-header {
    background-color: #f56c6c;
    color: #fff;
    line-height: 60px;
  }
  .el-aside {
    background-color: #d3dce6;
    min-width: 300px;
  }
  .el-main {
    background-color: #e9eef3;
    height: calc(100vh - 120px);
  }
  .el-footer {
    background-color: #f56c6c;
    color: #fff;
    line-height: 60px;
    text-align: center;
  }
}
</style>
