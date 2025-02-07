<template>
  <div class="layout-module_dashboard">
    <div class="layout-module_dashboardMenu">
      <div class="layout-module_menu enable-background un-select" :style="'top:' + fixedHeight + 'px;'">
        <div class="menu-wrap">
          <div :class="['menu-item', activeMenu === 'Article' ? 'active-menu' : '']"
               @click="routeNavigate('article')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont article"></span>
              文章
            </div>
          </div>
          <div :class="['menu-item', activeMenu === 'SeriesColumn' ? 'active-menu' : '']"
               @click="routeNavigate('seriesColumn')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont series-column"></span>
              专栏
            </div>
          </div>
          <div :class="['menu-item', activeMenu === 'RamblyJot' ? 'active-menu' : '']"
               @click="routeNavigate('ramblyJot')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont mood-calendar"></span>
              随笔
            </div>
          </div>
          <div class="menu-item item-line">
            <div class="line"></div>
          </div>
          <div :class="['menu-item', activeMenu === 'Collection' ? 'active-menu' : '']"
               @click="routeNavigate('collection')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont collect" style="font-weight: 600;"></span>
              收藏
            </div>
          </div>
          <div :class="['menu-item', activeMenu === 'RecentView' ? 'active-menu' : '']"
               @click="routeNavigate('recentview')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont recent-view"></span>
              最近浏览
            </div>
          </div>
          <div class="menu-item item-line">
            <div class="line"></div>
          </div>
          <div :class="['menu-item', activeMenu === 'Stats' ? 'active-menu' : '']"
               @click="routeNavigate('stats')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont data-stats"></span>
              成长轨迹
            </div>
          </div>
          <div :class="['menu-item', activeMenu === 'Grade' ? 'active-menu' : '']"
               @click="routeNavigate('grade')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont grade-incentive" style="font-size: 17px;"></span>
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
    beforeRouteEnter(to, from, next) {
      next(vc => {
        let activeMenu = vc.$route.name;
        if (activeMenu === 'RamblyJotContent') {
          if (vc.$route.path?.indexOf('ramblyJot') !== -1) {
            vc.activeMenu = 'RamblyJot';
          } else {
            vc.activeMenu = 'RecentView';
          }
          vc.activeMenu = 'RecentView';
        } else {
          vc.activeMenu = activeMenu;
        }
        next();
      });
    },
    data() {
      return {
        app: null,
        activeMenu: 'NoteHome',
        fixedHeight: 77
      }
    },
    watch: {
      $route(to) {
        let activeMenu = to.name;
        if (activeMenu === 'RamblyJotContent') {
          if (to.path?.indexOf('ramblyJot') !== -1) {
            this.activeMenu = 'RamblyJot';
          } else {
            this.activeMenu = 'RecentView';
          }
        } else {
          this.activeMenu = activeMenu;
        }
      }
    },
    methods: {
      /**
       * @param itemName 路由跳转标志
       */
      routeNavigate(itemName) {
        this.activeMenu = itemName;
        this.$router.push({path: '/creative' + (itemName == null ? '' : '/' + itemName)})
      },
      // 滚动条滚动处理事件：
      handleScroll() {
        const scrollTop = this.app.scrollTop;
        let computeTop = 77 - scrollTop;
        this.fixedHeight = computeTop < 2 ? 2 : computeTop > 77 ? 77 : computeTop;
      }
    },
    mounted() {
      // 给app添加一个滚动监听事件
      this.app = document.getElementById("app");
      this.app.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      // 释放监听
      this.app.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/creativespace/creativeSpace.less';
</style>
