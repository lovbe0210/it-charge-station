<template>
  <div class="layout-module_setting">
    <div class="layout-module_settingOverview">
      <div class="layout-module_overview enable-background">
        <div class="userInfo-avatar">
          <b-avatar :src="userInfo.avatar" variant="light" class="topic-avatar" to="/settings" size="6rem"/>
        </div>
        <div class="userInfo-nickName" @click="routeNavigate('')">
          <span>{{userInfo.nickname}}</span>
        </div>
        <div class="user-location-industry" @click="routeNavigate('')">
          <span class="index-module_meta">
            <span class="iconfont icon-location"></span>
            <span>四川省成都市成华区水电费水电费胜多负少胜多负少的胜多负少的胜多负少的胜多负少的水电费水电费胜多负少的水电费水电费</span>
          </span>
          <span class="index-module_meta">
            <span class="iconfont icon-industry"></span>
            <span>新时代『农民工』as大师阿斯达</span>
          </span>
        </div>
        <div class="userInfo-domain">
          <span class="iconfont icon-user-domain"></span>
          <a :href="'/' + userInfo.domain">{{'http://www.itcast.com/' + userInfo.domain}}</a>
        </div>
        <div class="userInfo-line">
          <hr>
        </div>
        <div class="userInfo-action">
          <div @click="routeNavigate('account')">
            <span class="iconfont icon-account-set"></span>
            账号设置
          </div>
          <div @click="routeNavigate('domain')">
            <span class="iconfont icon-preferences"></span>
            主页设置
          </div>
          <div @click="routeNavigate('musicPlay')">
            <span class="iconfont icon-music-setting"></span>
            音乐播放
          </div>
        </div>
      </div>
    </div>
    <div class="layout-module_settingDetail">
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
        vc.activeMenu = vc.$route.name;
        next();
      });
    },
    data() {
      return {
        activeMenu: 'profile',
        tooltipContainer: null,
        userInfo: {
          nickname: '布衣草人',
          avatar: require('@/assets/img/1.jpg'),
          domain: 'lovbe0210sw1f56',
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
