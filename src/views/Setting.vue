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
          <div @click="routeNavigate('account')" class="action-btn">
            <span class="iconfont icon-account-set"></span>
            <span class="content">账号设置</span>
          </div>
          <div @click="routeNavigate('domain')" class="action-btn">
            <span class="iconfont icon-preferences"></span>
            <span class="content">主页设置</span>
          </div>
          <div @click="routeNavigate('musicPlay')" class="action-btn">
            <span class="iconfont icon-music-setting"></span>
            <span class="content">音乐播放</span>
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
    data() {
      return {
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
      routeNavigate(itemName) {
        this.activeMenu = itemName;
        this.$router.push({path: '/settings/' + itemName})
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/setting/setting.less';
</style>
