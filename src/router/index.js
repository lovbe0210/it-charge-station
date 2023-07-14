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
      // 从首页进入时传入一个标志为true，然后改变当前激活的菜单显示，只有当从首页进入时改为recommend，其他任何时候都以用户点击为主
      params: {index: 'true'}
    },
    children: [
      {
        // 关注
        path: 'follow',
        name: 'Follow',
        // 此方式为路由懒加载
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
    component: () => import('@/views/Login')
  },
  {
    // 写作中心
    path: '/writeCenter',
    name: 'WriteCenter',
    component: () => import('@/views/WriteCenter')
  },
  {
    // 阅读中心
    path: '/readCenter',
    name: 'ReadCenter',
    component: () => import('@/views/ReadCenter')
  },
  {
    // 个人中心
    path: '/:personalDomain',
    props: true,
    name: 'PersonalCenter',
    component: () => import('@/views/PersonalCenter')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.afterEach((to, from) => {
//   if (from.name === 'WriteCenter') {
//     window.location.reload();
//   }
// })

export default router
