import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Recommend from '@/components/Recommend'
import Body from '@/components/Body'
import HostContainer from '@/components/HostContainer'

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
      name: 'Body'
    },
    children: [
      {
        // body
        path: '/',
        name: 'Body',
        redirect: {
          name: 'HostContainer'
        },
        component: Body,
        children: [
          {
            // 首页承载容器
            path: '/',
            name: 'HostContainer',
            // 此方式为路由懒加载
            component: HostContainer,
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
            // 问答页面
            path: '/qa',
            name: 'QAContainer',
            // 此方式为路由懒加载
            component: () => import('@/components/QAContainer')
          },
          {
            // 心情页面
            path: '/mood',
            name: 'MoodContainer',
            // 此方式为路由懒加载
            component: () => import('@/components/MoodContainer')
          },
          {
            // 分类承载容器
            path: '/cate/:category',
            props: true,
            name: 'CategoryContainer',
            // 此方式为路由懒加载
            component: () => import('@/components/CategoryContainer')
          }
        ]
      },
      {
        // 排行榜
        path: '/hot',
        name: 'Ranking',
        redirect: {
          name: 'FeaturedNotes'
        },
        component: () => import('@/views/Ranking'),
        children: [
          {
            // 精选笔记榜
            path: 'articles',
            name: 'FeaturedNotes',
            // 此方式为路由懒加载
            component: () => import('@/components/ranking/FeaturedNotes')
          },
          {
            // 推荐专栏榜
            path: 'column',
            name: 'SeriesColumn',
            component: () => import('@/components/ranking/SeriesColumn')
          },
          {
            // 优质作者榜
            path: 'authors',
            name: 'QualityAuthors',
            component: () => import('@/components/ranking/QualityAuthors')
          }
        ]
      },
      {
        // dashboard
        path: '/dashboard',
        name: 'DashBoard',
        component: () => import('@/views/Dashboard'),
        children: [
          {
            // 最近浏览
            path: '',
            name: 'RecentView',
            // 此方式为路由懒加载
            component: () => import('@/components/dashboard/RecentView')
          },
          {
            // 笔记
            path: 'noteHome',
            name: 'NoteHome',
            component: () => import('@/components/dashboard/NoteHome')
          },
          {
            // 专栏
            path: 'seriesColumn',
            name: 'SeriesColumn',
            component: () => import('@/components/dashboard/SeriesColumn')
          },
          {
            // 问答
            path: 'interLocution',
            name: 'InterLocution',
            component: () => import('@/components/dashboard/InterLocution')
          },
          {
            // 心情
            path: 'mood',
            name: 'Mood',
            component: () => import('@/components/dashboard/Mood')
          },
          {
            // 收藏
            path: 'collection',
            name: 'Collection',
            component: () => import('@/components/dashboard/Collection')
          },
          {
            // 关注/粉丝
            path: 'relational/:relational',
            name: 'Relational',
            props: true,
            component: () => import('@/components/dashboard/Relational')
          },
          {
            // 关注/粉丝
            path: 'relational/:relational',
            name: 'Relational',
            props: true,
            component: () => import('@/components/dashboard/Relational')
          },
          {
            // 数据中心
            path: 'stats',
            name: 'Stats',
            component: () => import('@/components/dashboard/Stats')
          },
          {
            // 等级激励
            path: 'grade',
            name: 'Grade',
            component: () => import('@/components/dashboard/Grade')
          }
        ]
      },
      {
        // 设置
        path: '/settings',
        name: 'Setting',
        redirect: {name: 'Profile'},
        component: () => import('@/views/Setting'),
        children: [
          {
            // 基本信息
            path: 'profile',
            name: 'Profile',
            component: () => import('@/components/settings/Profile')
          },
          {
            // 个人主页
            path: 'domain',
            name: 'Domain',
            component: () => import('@/components/settings/Domain')
          },
          {
            // 账户管理
            path: 'account',
            name: 'Account',
            component: () => import('@/components/settings/Account')
          },
          {
            // 音乐播放
            path: 'musicPlay',
            name: 'MusicPlay',
            component: () => import('@/components/settings/MusicPlay')
          }
        ]
      },
      {
        // 消息通知
        path: '/notifications',
        name: 'Notifications',
        redirect: {name: 'CommentReply'},
        component: () => import('@/views/Notifications'),
        children: [
          {
            // 评论与回复
            path: 'commentReply',
            name: 'CommentReply',
            component: () => import('@/components/notifications/CommentReply')
          },
          {
            // 新增粉丝
            path: 'newFans',
            name: 'NewFans',
            component: () => import('@/components/notifications/NewFans')
          },
          {
            // 收到的赞
            path: 'likesReceived',
            name: 'LikesReceived',
            component: () => import('@/components/notifications/LikesReceived')
          },
          {
            // 我的消息
            path: 'chatMessage',
            name: 'ChatMessage',
            component: () => import('@/components/notifications/ChatMessage')
          },
          {
            // 系统消息
            path: 'systemMessage',
            name: 'SystemMessage',
            component: () => import('@/components/notifications/SystemMessage')
          },
          {
            // 消息设置
            path: 'messageSetting',
            name: 'MessageSetting',
            component: () => import('@/components/notifications/MessageSetting')
          }
        ]
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
    path: '/editor',
    name: 'WriteCenter',
    component: () => import('@/views/WriteCenter')
  },
  {
    // 阅读中心
    path: '/article/:articleId',
    name: 'ReadCenter',
    props: true,
    component: () => import('@/views/ReadCenter')
  },
  {
    // 个人首页
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
