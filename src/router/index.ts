import { createRouter, createWebHistory } from 'vue-router'
import { checkVersionUpdate } from '@/utils/versionCheck'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: ['/home', '/index', '/news'],
      name: 'home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/index.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      redirect: '/auth/login',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/register.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/auth/404.vue')
    }
  ]
})

router.beforeEach(async () => {
  const res = await checkVersionUpdate()
  if (res) {
    ElMessageBox.alert('检测到新版本', '通知', {
      confirmButtonText: '了解'
    }).then(() => {
      window.location.reload()
      return true
    })
  }
})

export default router
