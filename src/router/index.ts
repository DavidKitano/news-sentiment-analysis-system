import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'
import { checkVersionUpdate } from '@/utils/versionCheck'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
        },
        {
          path: 'forget',
          name: 'forgetPw',
          component: () => import('../views/auth/forget-password.vue')
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
