import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Recommend from '@/components/Recommend'
import Login from '@/components/Login'

// 解决router.push报重复路由错误，实际并没有重复
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: {
      name: 'Recommend',
      params: { index: 'true' }
    },
    // redirect: '/recommend',
    children: [
      {
        path: 'follow',
        name: 'Follow',
        // 此方式为路由懒加载 component: () => import('../views/About.vue')
        component: () => import('@/components/Follow')
      },
      {
        path: 'recommend',
        name: 'Recommend',
        component: Recommend
      },
      {
        path: 'topic',
        name: 'Topic',
        component: () => import('@/components/Topic')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/writeCenter',
    name: 'WriteCenter',
    component: () => import('@/components/WriteCenter')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
