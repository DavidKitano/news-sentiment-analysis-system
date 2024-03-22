import { createRouter, createWebHistory } from 'vue-router'
import { checkVersionUpdate } from '@/utils/versionCheck'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/news/:newsId?',
      name: 'home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/index.vue')
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('../views/timeline/index.vue')
    },
    {
      path: '/atlas',
      name: 'atlas',
      component: () => import('../views/atlas/index.vue')
    },
    {
      path: '/trend',
      name: 'trend',
      component: () => import('../views/trend/index.vue')
    },
    {
      path: '/auth',
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
          path: 'forbidden',
          name: 'forbidden',
          component: () => import('../views/auth/403.vue')
        }
      ]
    },
    {
      path: '/manage/:routeName',
      name: 'manage',
      component: () => import('../micro/micro-apps.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/auth/404.vue')
    }
  ]
})

const whiteList = ['forbidden', 'not-found', 'login', 'register', 'home', 'about', 'manage']

router.beforeEach(async (to, from, next) => {
  const res = await checkVersionUpdate()
  if (res) {
    ElMessageBox.alert('检测到新版本', '通知', {
      confirmButtonText: '了解'
    }).then(() => {
      window.location.reload()
      return true
    })
  }
  if (whiteList.includes(to.name as string)) {
    return next()
  }
  if (localStorage.getItem('nsasAuth')) {
    return next()
  }
  return next('/auth/forbidden')
})

export default router
