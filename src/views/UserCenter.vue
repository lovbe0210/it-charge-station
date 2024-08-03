<template>
  <div class="layout-module_user-center">
    <div class="layout-module_userMenu">
      <div class="layout-module_menu enable-background un-select" :style="'top:' + fixedHeight + 'px;'">
        <div class="menu-wrap">
          <div :class="['menu-item', activeMenu === 'Profile' ? 'active-menu' : '']"
               @click="routeNavigate('profile')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont person-info"></span>
              <span class="content">个人信息</span>
            </div>
          </div>
          <div :class="['menu-item', activeMenu === 'Account' ? 'active-menu' : '']"
               @click="routeNavigate('account')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont account-set"></span>
              <span class="content">账号设置</span>
            </div>
          </div>
          <div :class="['menu-item', activeMenu === 'Domain' ? 'active-menu' : '']"
               @click="routeNavigate('domain')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont user-domain"></span>
              <span class="content">主页设置</span>
            </div>
          </div>
          <div class="menu-item item-line">
            <div class="line"></div>
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
          <div :class="['menu-item', activeMenu === 'Preferences' ? 'active-menu' : '']"
               @click="routeNavigate('preferences')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont setting-c"></span>
              <span class="content">偏好设置</span>
            </div>
          </div>
          <div :class="['menu-item', activeMenu === 'MusicPlay' ? 'active-menu' : '']"
               @click="routeNavigate('musicplay')">
            <div class="light"></div>
            <div class="item">
              <span class="iconfont music-play-more"></span>
              <span class="content">音乐播放</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-module_settingDetail enable-background">
      <div class="layout-module_mainContent">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  beforeRouteEnter(to, from, next) {
    next(vc => {
      let activeMenu = to.name;
      if (activeMenu === 'Relational') {
        vc.activeMenu = to.params.relational;
      } else {
        vc.activeMenu = activeMenu;
      }
    })
  },
  data() {
    return {
      app: null,
      needFixed: false,
      fixedHeight: 77,
      activeMenu: 'follow',
      userInfo: {
        nickname: '布衣草人',
        avatar: 'https://pic.netbian.com/uploads/allimg/240618/195433-1718711673bf15.jpg',
        domain: 'lovbe0210sw1f56',
        follow: true
      }
    }
  },
  methods: {
    routeNavigate(itemName) {
      this.activeMenu = itemName;
      if (itemName === 'follow') {
        this.$router.push({path: '/user/relational/follow'})
      } else if (itemName === 'fans') {
        this.$router.push({path: '/user/relational/fans'})
      } else {
        this.$router.push({path: '/user/' + itemName})
      }

    },
    // 滚动条滚动处理事件：
    handleScroll() {
      const scrollTop = this.app.scrollTop
      let computeTop = 77 - scrollTop;
      this.fixedHeight = computeTop < 2 ? 2 : computeTop > 77 ? 77 : computeTop;
    }
  },
  watch: {
    $route(to) {
      let activeMenu = to.name;
      console.log('组件to.name: ', to.name, "to.params.relational: ", to.params.relational)
      if (activeMenu === 'Relational') {
        this.activeMenu = to.params.relational;
      } else {
        this.activeMenu = activeMenu;
      }
    }
  },
  mounted() {
    this.needFixed = false;
    // 给window添加一个滚动监听事件
    this.app = document.getElementById("app")
    this.app.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    // 释放监听
    this.app.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped lang="less">
@import '../components/css/usercenter/userCenter.less';
</style>
