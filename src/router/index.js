import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Recommend from '@/components/Recommend'

// 解决router.push报重复路由错误，实际并没有重复
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    // 首页
    path: '/',
    name: 'Index',
    component: Index,
    redirect: {
      name: 'Recommend',
      params: {index: 'true'}
    },
    children: [
      {
        // 关注
        path: 'follow',
        name: 'Follow',
        // 此方式为路由懒加载 component: () => import('../views/About.vue')
        component: () => import('@/components/Follow')
      },
      {
        // 推荐
        path: 'recommend',
        name: 'Recommend',
        component: Recommend
      },
      {
        // 主题
        path: 'topic',
        name: 'Topic',
        component: () => import('@/components/Topic')
      }
    ]
  },
  {
    // 登陆
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login')
  },
  {
    // 写作中心
    path: '/writeCenter',
    name: 'WriteCenter',
    component: () => import('@/views/WriteCenter')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to, from) => {
  console.dir(from)
  console.dir(to)
  if (from.name === 'WriteCenter') {
    window.location.reload();
  }
})

export default router
