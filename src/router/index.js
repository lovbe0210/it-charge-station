import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Recommend from '@/components/home/Recommend'
import Body from '@/components/Body'
import HostContainer from '@/components/home/HostContainer'

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
                component: () => import('@/components/home/Follow')
              },
              {
                // 推荐
                path: 'recommend',
                name: 'Recommend',
                component: Recommend
              },
              {
                // 专栏
                path: 'scolumn',
                name: 'SeriesColumn',
                component: () => import('@/components/home/SeriesColumn')
              }
            ]
          },
          {
            // 计算机与网络
            path: '/technet',
            name: 'ComputeNetwork',
            // 此方式为路由懒加载
            component: () => import('@/components/home/CategoryContainer')
          },
          {
            // 编程语言分类
            path: '/lang',
            name: 'Language',
            // 此方式为路由懒加载
            component: () => import('@/components/home/CategoryContainer')
          },
          {
            // 数据库分类
            path: '/database',
            name: 'Database',
            // 此方式为路由懒加载
            component: () => import('@/components/home/CategoryContainer')
          },
          {
            // 中间件分类
            path: '/midware',
            name: 'Middleware',
            // 此方式为路由懒加载
            component: () => import('@/components/home/CategoryContainer')
          },
          {
            // 算法分类
            path: '/algthm',
            name: 'Arithmetic',
            // 此方式为路由懒加载
            component: () => import('@/components/home/CategoryContainer')
          },
          {
            // 随笔页面
            path: '/ramblyJot',
            name: 'RamblyJot',
            // 此方式为路由懒加载
            component: () => import('@/components/home/RamblyJot')
          },
          {
            // 随笔内容
            path: '/ramblyJot/:id',
            props: true,
            name: 'RamblyJotContent',
            // 此方式为路由懒加载
            component: () => import('@/components/common/RamblyJotContent')
          },
          {
            // 搜索页面
            path: '/search',
            name: 'GlobalSearch',
            // 此方式为路由懒加载
            component: () => import('@/components/home/GlobalSearch')
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
            // 精选文章榜
            path: 'articles',
            name: 'FeaturedArticle',
            // 此方式为路由懒加载
            component: () => import('@/components/ranking/FeaturedArticle')
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
            name: 'QualityAuthor',
            component: () => import('@/components/ranking/QualityAuthor')
          }
        ]
      },
      {
        // 创作空间
        path: '/creative',
        name: 'CreativeSpace',
        redirect: {name: 'Article'},
        component: () => import('@/views/CreativeSpace'),
        children: [
          {
            // 文章
            path: 'article',
            name: 'Article',
            component: () => import('@/components/creativespace/Article')
          },
          {
            // 专栏
            path: 'seriesColumn',
            name: 'SeriesColumn',
            component: () => import('@/components/creativespace/SeriesColumn')
          },
          {
            // 专栏设置
            path: 'column/setting/:columnId',
            props: true,
            name: 'SeriesColumnSetting',
            component: () => import('@/components/creativespace/SeriesColumnSetting')
          },
          {
            // 随笔
            path: 'ramblyJot',
            name: 'RamblyJot',
            component: () => import('@/components/creativespace/RamblyJot')
          },
          {
            // 随笔内容展示
            path: 'ramblyJot/:rjId',
            props: true,
            name: 'RamblyJotContent',
            component: () => import('@/components/common/RamblyJotContent')
          },
          {
            // 收藏
            path: 'collection',
            name: 'Collection',
            component: () => import('@/components/creativespace/Collection')
          },
          {
            // 成长轨迹
            path: 'stats',
            name: 'Stats',
            component: () => import('@/components/creativespace/Stats')
          },
          {
            // 等级激励
            path: 'grade',
            name: 'Grade',
            component: () => import('@/components/creativespace/Grade')
          },
          {
            // 最近浏览
            path: 'recentview',
            name: 'RecentView',
            component: () => import('@/components/creativespace/RecentView')
          },
          {
            // 随笔内容展示
            path: 'recentview/:rjId',
            props: true,
            name: 'RamblyJotContent',
            component: () => import('@/components/common/RamblyJotContent')
          }
        ]
      },
      {
        // 个人中心
        path: '/user',
        name: 'UserCenter',
        redirect: {name: 'Profile'},
        component: () => import('@/views/UserCenter'),
        children: [
          {
            // 基本信息
            path: 'profile',
            name: 'Profile',
            component: () => import('@/components/usercenter/Profile')
          },
          {
            // 个人主页
            path: 'domain',
            name: 'Domain',
            component: () => import('@/components/usercenter/Domain')
          },
          {
            // 账号管理
            path: 'account',
            name: 'Account',
            component: () => import('@/components/usercenter/Account')
          },
          {
            // 关注/粉丝
            path: 'relational/:relational',
            name: 'Relational',
            props: true,
            component: () => import('@/components/usercenter/Relational')
          },
          {
            // 偏好设置
            path: 'preferences',
            name: 'Preferences',
            component: () => import('@/components/usercenter/Preference')
          },
          {
            // 音乐播放
            path: 'musicplay',
            name: 'MusicPlay',
            component: () => import('@/components/usercenter/MusicPlay')
          }
        ]
      }
    ]
  },
  {
    // 写作中心
    path: '/editor/:uri',
    name: 'WriteCenter',
    props: true,
    component: () => import('@/views/WriteCenter')
  },
  {
    // 个人首页
    path: '/:domain',
    props: true,
    name: 'PersonalHome',
    component: () => import('@/views/PersonalHome')
  },
  {
    // 阅读中心/普通文章
    path: '/:domain/:articleUri',
    name: 'ReadCenter',
    props: true,
    component: () => import('@/views/ReadCenter'),
    children: [
      {
        // 在路由跳转时判断是走文章阅读还是跳转去专栏首页
        path: '',
        name: 'Reader',
        component: () => import('@/components/Reader')
      }
    ]
  },
  {
    // 阅读中心/专栏文章
    path: '/:domain/:columnUri',
    name: 'ReadCenter',
    props: true,
    component: () => import('@/views/ReadCenter'),
    children: [
      {
        // 专栏首页
        path: '',
        name: 'SColumnReadHome',
        component: () => import('@/components/common/SColumnReadHome')
      },
      {
        // 内容阅读
        path: ':articleUri',
        name: 'Reader',
        props: true,
        component: () => import('@/components/Reader')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to, from) => {
  // 路由跳转后有些页面滚动条需要保持或回到顶部
  let fixed1 = from.name === 'RamblyJotContent' && to.name === 'RamblyJot';
  let fixed2 = to.name === 'RamblyJotContent' && from.name === 'RamblyJot';
  let fixed3 = from.fullPath?.includes('/column/setting/') && to.fullPath === '/dashboard/seriesColumn';
  console.log("f1: ", fixed1, "f2: ", fixed2, "f3: ", fixed3)
  let fixed = fixed1 || fixed3;
  if (fixed) {
    return;
  }
  const scrollableDivs = document.querySelectorAll('.beauty-scroll');
  // 遍历这些元素并滚动到顶部
  scrollableDivs.forEach(div => {
    div.scrollTop = 0;
  });
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Reader') {
    next();
    return;
  }
  let params = to.params;
  if (params.columnUri) {
    next();
    return;
  }

  Vue.prototype.$request(
    {
      url: "/cps/router/" + params?.articleUri,
      method: 'GET'
    }
  ).then(data => {
    if (data?.result) {
      if (data.data?.type === 2) {
        // 专栏
        let newParam = {
          domain: params?.domain,
          columnId: params?.articleId
        }
        next({
          name: "SColumnReadHome",
          params: newParam
        });
      } else {
        // 继续走普通文章阅读页面
        next();
      }
    }
  });
})

export default router
