import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Recommend from '@/components/Recommend'
import Login from '@/components/Login'

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
        path: 'hot',
        name: 'Hot',
        component: () => import('@/components/Hot')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
