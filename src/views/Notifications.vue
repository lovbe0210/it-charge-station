<template>
  <div class="layout-module_notifications">
    <div class="layout-module_notificationsMenu">
      <div class="layout-module_menu enable-background">
        <div class="menu-wrap">
          <div class="fixed-anchor-point">
            <div class="item">
              <span class="iconfont icon-paper-plane"></span>
              消息中心
            </div>
          </div>
          <div class="menu-item" @click="routeNavigate('commentReply')">
            <div :class="['item', activeMenuForEq === 'CommentReply' ? 'active-menu' : '']">
              <span>回复我的</span>
              <span class="count">5</span>
            </div>
          </div>
          <div class="menu-item" @click="routeNavigate('likesReceived')">
            <div :class="['item', activeMenuForEq === 'LikesReceived' ? 'active-menu' : '']">
              <span>收到的赞</span>
              <span class="count">1</span>
            </div>
          </div>
          <div class="menu-item" @click="routeNavigate('newFans')">
            <div :class="['item', activeMenuForEq === 'NewFans' ? 'active-menu' : '']">
              <span>新增粉丝</span>
              <span class="count">10</span>
            </div>
          </div>
          <div class="menu-item" @click="routeNavigate('systemMessage')">
            <div :class="['item', activeMenuForEq === 'SystemMessage' ? 'active-menu' : '']">
              <span>系统消息</span>
              <span class="count">23</span>
            </div>
          </div>
          <div class="menu-item" @click="routeNavigate('chatMessage')">
            <div :class="['item', activeMenuForEq === 'ChatMessage' ? 'active-menu' : '']">
              <span>我的消息</span>
              <span class="count">99+</span>
            </div>
          </div>
          <div class="menu-item item-line">
            <div class="line"></div>
          </div>
          <div class="menu-item msg-setting" @click="routeNavigate('messageSetting')">
            <div :class="['item', activeMenuForEq === 'MessageSetting' ? 'active-menu' : '']">
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
    beforeRouteEnter(to, from, next) {
      next(vc => {
        vc.activeMenu = vc.$route.name;
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
        this.activeMenu = to.name;
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/notifications/notifications.less';
</style>
