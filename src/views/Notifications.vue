<template>
  <div class="layout-module_notifications">
    <div class="layout-module_notificationsMenu">
      <div class="layout-module_menu enable-background">
        <div class="menu-wrap">
          <div class="menu-item fixed-anchor-point">
            <div class="item">
              <span class="iconfont icon-paper-plane"></span>
              消息中心
            </div>
          </div>
          <div :class="['menu-item', activeMenuForEq === 'NoteHome' ? 'active-menu' : '']"
               @click="routeNavigate('noteHome')">
            <div class="item">
              <span>回复我的</span>
              <span class="count">5</span>
            </div>
          </div>
          <div :class="['menu-item', activeMenuForEq === 'SeriesColumn' ? 'active-menu' : '']"
               @click="routeNavigate('seriesColumn')">
            <div class="item">
              <span>收到的赞</span>
              <span class="count">1</span>
            </div>
          </div>
          <div :class="['menu-item', activeMenuForEq === 'InterLocution' ? 'active-menu' : '']"
               @click="routeNavigate('interLocution')">
            <div class="item">
              <span>新增粉丝</span>
              <span class="count">10</span>
            </div>
          </div>
          <div :class="['menu-item', activeMenuForEq === 'Mood' ? 'active-menu' : '']"
               @click="routeNavigate('mood')">
            <div class="item">
              <span>系统消息</span>
              <span class="count">23</span>
            </div>
          </div>
          <div :class="['menu-item', activeMenuForEq === 'Collection' ? 'active-menu' : '']"
               @click="routeNavigate('collection')">
            <div class="item">
              <span>我的消息</span>
              <span class="count">99+</span>
            </div>
          </div>
          <div class="menu-item item-line">
            <div class="line"></div>
          </div>
          <div :class="['menu-item', activeMenu === 'concern' ? 'active-menu' : '']"
               @click="routeNavigate('concern')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont icon-preferences"></span>
              消息设置
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-module_notificationsContent enable-background">
      <div>{{menuName}}</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Notifications',
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
        menuName: '回复我的'
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
      routeNavigate(itemName) {
        this.activeMenu = itemName;
        this.$router.push({path: '/notifications/' + itemName})
      }
    },
    watch: {
      $route(to) {
        let activeMenu = to.name;
        if (activeMenu === 'Relational') {
          this.activeMenu = to.params.relational;
        } else {
          this.activeMenu = activeMenu;
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/notifications/notifications.less';
</style>
