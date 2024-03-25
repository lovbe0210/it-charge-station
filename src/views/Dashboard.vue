<template>
  <div class="layout-module_dashboard">
    <div class="layout-module_dashboardMenu">
      <div class="layout-module_menu enable-background" :style="'top:' + fixedHeight + 'px;'">
        <div class="menu-wrap">
          <div :class="['menu-item', activeMenuForEq === 'RecentView' ? 'active-menu' : '']"
               @click="routeNavigate(null)">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont icon-recent-view"></span>
              最近浏览
            </div>
          </div>
          <div class="menu-item item-line">
            <div class="line"></div>
          </div>
          <div :class="['menu-item', activeMenuForEq === 'NoteHome' ? 'active-menu' : '']"
               @click="routeNavigate('noteHome')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont icon-doc-repository"></span>
              笔记
            </div>
          </div>
          <div :class="['menu-item', activeMenuForEq === 'SeriesColumn' ? 'active-menu' : '']"
               @click="routeNavigate('seriesColumn')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont icon-topic-doc"></span>
              专栏
            </div>
          </div>
          <div :class="['menu-item', activeMenuForEq === 'RamblyJot' ? 'active-menu' : '']"
               @click="routeNavigate('ramblyJot')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont icon-mood-calendar"></span>
              随笔
            </div>
          </div>
          <div class="menu-item item-line">
            <div class="line"></div>
          </div>
          <div :class="['menu-item', activeMenuForEq === 'Collection' ? 'active-menu' : '']"
               @click="routeNavigate('collection')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont icon-like"></span>
              收藏
            </div>
          </div>
          <div :class="['menu-item', activeMenu === 'follow' ? 'active-menu' : '']"
               @click="routeNavigate('follow')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont follow"></span>
              关注
            </div>
          </div>
          <div :class="['menu-item', activeMenu === 'fans' ? 'active-menu' : '']"
               @click="routeNavigate('fans')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont fans" style="font-size: 17px;"></span>
              粉丝
            </div>
          </div>
          <div class="menu-item item-line">
            <div class="line"></div>
          </div>
          <div :class="['menu-item', activeMenuForEq === 'Stats' ? 'active-menu' : '']"
               @click="routeNavigate('stats')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont icon-data-stats"></span>
              数据中心
            </div>
          </div>
          <div :class="['menu-item', activeMenuForEq === 'Grade' ? 'active-menu' : '']"
               @click="routeNavigate('grade')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont icon-grade-incentive" style="font-size: 17px;"></span>
              等级激励
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-module_dashboardContent enable-background">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    beforeRouteEnter(from, to, next) {
      next(vc => {
        let activeMenu = vc.$route.name;
        if (activeMenu === 'Relational') {
          vc.activeMenu = vc.$route.params.relational;
        } else {
          vc.activeMenu = activeMenu;
        }
        next();
      });
    },
    data() {
      return {
        activeMenu: 'RecentView',
        needFixed: false,
        fixedHeight: 77
      }
    },
    watch: {
      $route(to) {
        console.log('组件复用')
        let activeMenu = to.name;
        if (activeMenu === 'Relational') {
          this.activeMenu = to.params.relational;
        } else {
          this.activeMenu = activeMenu;
        }
      }
    },
    computed: {
      activeMenuForEq() {
        if (this.activeMenu == null) {
          return null;
        }
        return this.activeMenu.charAt(0).toUpperCase() + this.activeMenu.slice(1);
      }
    },
    methods: {
      /**
       * @param itemName 路由跳转标志
       */
      routeNavigate(itemName) {
        this.activeMenu = itemName;
        if (itemName === 'follow') {
          this.$router.push({path: '/dashboard/relational/follow'})
        } else if (itemName === 'fans') {
          this.$router.push({path: '/dashboard/relational/fans'})
        } else {
          this.$router.push({path: '/dashboard' + (itemName == null ? '' : '/' + itemName)})
        }
      },
      // 滚动条滚动处理事件：
      handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let computeTop = 77 - scrollTop;
        this.fixedHeight = computeTop < 2 ? 2 : computeTop > 77 ? 77 : computeTop;
      }
    },
    mounted() {
      this.needFixed = false;
      // 给window添加一个滚动监听事件
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      // 释放监听
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/dashboard/dashboard.less';
</style>
