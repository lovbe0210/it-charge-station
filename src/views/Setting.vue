<template>
  <div class="layout-module_setting">
    <div class="layout-module_settingOverview">
      <div class="layout-module_overview enable-background un-select" :style="'top:' + fixedHeight + 'px;'">
        <div class="userInfo-avatar">
          <b-avatar :src="userInfo.avatar"
                    variant="light"
                    class="topic-avatar"
                    to="/settings"
                    size="6rem"/>
        </div>
        <div class="userInfo-nickName">
          <span>{{userInfo.nickname}}</span>
        </div>
        <div class="user-location-industry">
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
          <a :href="'/' + userInfo.domain" title="个人主页">
            {{'http://www.itcast.com/' + userInfo.domain}}
          </a>
        </div>
        <div class="userInfo-line">
          <hr>
        </div>
        <div class="userInfo-action">
          <div @click="routeNavigate('')" class="action-btn">
            <span class="iconfont user-info"></span>
            <span class="content">个人信息</span>
          </div>
          <div @click="routeNavigate('account')" class="action-btn">
            <span class="iconfont icon-account-set"></span>
            <span class="content">账号设置</span>
          </div>
          <div @click="routeNavigate('domain')" class="action-btn">
            <span class="iconfont icon-preferences"></span>
            <span class="content">主页设置</span>
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
    data() {
      return {
        needFixed: false,
        fixedHeight: 77,
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
  @import '../components/css/setting/setting.less';
</style>
