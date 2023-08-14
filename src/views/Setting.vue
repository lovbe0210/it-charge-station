<template>
  <div class="layout-module_setting">
    <div class="nav-module_container">
      <a class="nav-module_back" href="/">
        <span class="iconfont icon-return-copy"></span>
        <span class="iconfont icon-logo"></span>
        <span class="nav-module_backTitle">返回</span>
      </a>
      <div class="nav-module_userInfo">
        <div class="nav-module_userInfoAvatar">
          <div class="avatar">
            <img loading="lazy" data-testid="img-avatar" :src="require('@/assets/avatar/01.jpg')" class="img"
                 alt="布衣草人">
          </div>
          <div class="userInfo">
            <div class="userInfo-name">布衣草人</div>
            <div class="userInfo-domain">u21006206</div>
          </div>
        </div>
      </div>
      <div class="nav-module_menuContainer">
        <p class="index-module_inherit nav-module_subMenuTitle" style="margin: 32px 0px 8px 16px;">
          帐户
        </p>
        <div :class="['index-module_body-menu', 'nav-module_menuTab', activeMenu === 'profile' ? 'active': '']"
                     @click="routeNavigate('profile')">
          <span class="iconfont icon-user-center"></span>
          基本信息
        </div>
        <div :class="['index-module_body-menu', 'nav-module_menuTab', activeMenu === 'domain' ? 'active': '']"
                     @click="routeNavigate('domain')">
          <span class="iconfont icon-user-domain"></span>
          个人主页
        </div>
        <div :class="['index-module_body-menu', 'nav-module_menuTab', activeMenu === 'account' ? 'active': '']"
                     @click="routeNavigate('account')">
          <span class="iconfont icon-account-set"></span>
          账户管理
        </div>
        <p class="index-module_inherit nav-module_subMenuTitle"
           style="margin: 32px 0px 8px 16px;">
          创作中心
        </p>
        <div :class="['index-module_body-menu', 'nav-module_menuTab', activeMenu === 'stats' ? 'active': '']"
                     @click="routeNavigate('stats')">
          <span class="iconfont icon-data-stats"></span>
          数据统计
        </div>
        <div :class="['index-module_body-menu', 'nav-module_menuTab', activeMenu === 'grade' ? 'active': '']"
                     @click="routeNavigate('grade')">
          <span class="iconfont icon-grade-incentive"></span>
          等级激励
        </div>
        <p class="index-module_inherit nav-module_subMenuTitle"
           style="margin: 32px 0px 8px 16px;">
          其他设置
        </p>
        <div :class="['index-module_body-menu', 'nav-module_menuTab', activeMenu === 'stats' ? 'active': '']"
             @click="routeNavigate('msgSetting')">
          <span class="iconfont icon-preferences"></span>
          消息设置
        </div>
      </div>
    </div>
    <div class="main-wrapper">
      <div class="layout-module_rightMainContent">
        <div class="layout-module_rightContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Setting',
    beforeRouteEnter(from, to, next) {
      next(vc => {
        // 通过 `vc` 访问组件实例
        let routeName = vc.$route.name;
        vc.activeMenu = routeName?.toLowerCase()
        next();
      });
    },
    data() {
      return {
        activeMenu: 'profile',
        tooltipContainer: null,
        userInfo: {
          nickname: '布衣草人',
          level: 6,
          follow: true
        }
      }
    },
    methods: {
      getTooltipContainer() {
        return this.tooltipContainer;
      },
      routeNavigate(itemName) {
        this.activeMenu = itemName;
        this.$router.push({path: '/settings/' + itemName})
      }
    },
    mounted() {
      if (this.tooltipContainer == null) {
        this.tooltipContainer = this.$refs.tooltipContainer;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/setting.less';
</style>
