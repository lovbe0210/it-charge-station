import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Recommend from '@/components/homecategory/Recommend'
import Body from '@/components/Body'
import HostContainer from '@/components/homecategory/HostContainer'

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
                component: () => import('@/components/homecategory/Follow')
              },
              {
                // 推荐
                path: 'recommend',
                name: 'Recommend',
                component: Recommend
              },
              {
                // 主题
                path: 'scolumn',
                name: 'SeriesColumn',
                component: () => import('@/components/homecategory/SeriesColumn.vue')
              }
            ]
          },
          {
            // 计算机与网络
            path: '/computenetwork',
            name: 'ComputeNetwork',
            // 此方式为路由懒加载
            component: () => import('@/components/homecategory/CategoryContainer.vue')
          },
          {
            // 编程语言分类
            path: '/language',
            name: 'Language',
            // 此方式为路由懒加载
            component: () => import('@/components/homecategory/CategoryContainer.vue')
          },
          {
            // 数据库分类
            path: '/database',
            name: 'Database',
            // 此方式为路由懒加载
            component: () => import('@/components/homecategory/CategoryContainer.vue')
          },
          {
            // 中间件分类
            path: '/middleware',
            name: 'Middleware',
            // 此方式为路由懒加载
            component: () => import('@/components/homecategory/CategoryContainer.vue')
          },
          {
            // 算法分类
            path: '/arithmetic',
            name: 'Arithmetic',
            // 此方式为路由懒加载
            component: () => import('@/components/homecategory/CategoryContainer.vue')
          },
          {
            // 随笔页面
            path: '/ramblyJot',
            name: 'RamblyJot',
            // 此方式为路由懒加载
            component: () => import('@/components/homecategory/RamblyJot.vue')
          },
          {
            // 随笔内容
            path: '/ramblyJot/:id',
            props: true,
            name: 'RamblyJotContent',
            // 此方式为路由懒加载
            component: () => import('@/components/RamblyJotContent.vue')
          },
          {
            // 搜索页面
            path: '/search',
            name: 'GlobalSearch',
            // 此方式为路由懒加载
            component: () => import('@/components/homecategory/GlobalSearch.vue')
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
        component: () => import('@/components/Ranking'),
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
            name: 'RecommendColumn',
            component: () => import('@/components/ranking/RecommendColumn')
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
            // 专栏设置
            path: 'column/setting/:columnId',
            props: true,
            name: 'SeriesColumnSetting',
            component: () => import('@/components/dashboard/SeriesColumnSetting')
          },
          {
            // 随笔
            path: 'ramblyJot',
            name: 'RamblyJot',
            component: () => import('@/components/dashboard/RamblyJot')
          },
          {
            // 随笔内容展示
            path: 'ramblyJot/:rjId',
            props: true,
            name: 'RamblyJotContent',
            component: () => import('@/components/RamblyJotContent')
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
        component: () => import('@/components/Setting'),
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
            // 账号管理
            path: 'account',
            name: 'Account',
            component: () => import('@/components/settings/Account')
          }
        ]
      }
    ]
  },
  {
    // 写作中心
    path: '/editor/:docId',
    name: 'WriteCenter',
    props: true,
    component: () => import('@/views/WriteCenter')
  },
  {
    // 阅读中心/普通文章
    path: '/article/:articleId',
    name: 'ReadCenter',
    props: true,
    component: () => import('@/views/ReadCenter'),
    children: [
      {
        // 内容阅读
        path: '',
        name: 'ArticleReader',
        component: () => import('@/components/ArticleReader')
      }
    ]
  },
  {
    // 阅读中心/专栏文章
    path: '/column/:columnId',
    name: 'ReadCenter',
    props: true,
    component: () => import('@/views/ReadCenter'),
    children: [
      {
        // 专栏首页
        path: '',
        name: 'SColumnReadHome',
        component: () => import('@/components/SColumnReadHome')
      },
      {
        // 内容阅读
        path: ':articleId',
        name: 'ArticleReader',
        props: true,
        component: () => import('@/components/ArticleReader')
      }
    ]
  },
  {
    // 个人首页
    path: '/:domain',
    props: true,
    name: 'PersonalCenter',
    component: () => import('@/views/PersonalCenter')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 滚动条行为
  scrollBehavior(to, from, position) {
    let fixed = from.fullPath?.includes('/ramblyJot/') && to.fullPath === '/ramblyJot';
    fixed = fixed || (from.fullPath?.includes('/column/setting/') && to.fullPath === '/dashboard/seriesColumn');
    if (fixed) {
      return position;
    } else {
      if (to.fullPath?.includes('/dashboard')) {
        return {y: 0}
      }
    }
  }
})

// router.afterEach((to, from) => {
//   if (from.name === 'WriteCenter') {
//     window.location.reload();
//   }
// })

export default router
