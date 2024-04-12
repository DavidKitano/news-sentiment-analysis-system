import './assets/main.scss'
import 'normalize.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import _ from 'lodash-es'
import App from './App.vue'
import router from './router'

import microApp from '@micro-zoe/micro-app'

microApp.start()

// 解决ResizeObserver loop limit exceeded
const oldResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends oldResizeObserver {
  constructor(callback: any) {
    callback = _.debounce(callback, 16)
    super(callback)
  }
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
// app.use(ElementPlus, {
//   locale: zhCn
// })

app.config.globalProperties.$microApp = microApp
app.config.globalProperties.$version = 'v1.2.4β'

app.mount('#app')
