<template>
  <div class="layout-module_ranking">
    <div class="layout-module_rankingMenu">
      <div class="layout-module_menu enable-background" :style="'top:' + fixedHeight + 'px;'">
        <div class="menu-wrap">
          <div class="fixed-anchor-point">
            <div class="item">
              <span class="iconfont hot-rank" style="font-size: 18px"></span>
              排行热榜
            </div>
          </div>
          <div class="menu-item" @click="routeNavigate('articles')">
            <div :class="['item', activeMenu === 'articles' ? 'active-menu' : '']">
              <span class="iconfont article"></span>
              <span>精选文章榜</span>
            </div>
          </div>
          <div class="menu-item" @click="routeNavigate('column')">
            <div :class="['item', activeMenu === 'column' ? 'active-menu' : '']">
              <span class="iconfont series-column"></span>
              <span>推荐专栏榜</span>
            </div>
          </div>
          <div class="menu-item" @click="routeNavigate('authors')">
            <div :class="['item', activeMenu === 'authors' ? 'active-menu' : '']">
              <span class="iconfont author2"></span>
              <span>优秀作者榜</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-module_rankingContent enable-background">
      <router-view></router-view>
    </div>
    <back-top :immediate="true"></back-top>
  </div>
</template>

<script>
  import BackTop from "@/components/common/BackTop";
  export default {
    name: 'Ranking',
    data() {
      return {
        app: null,
        activeMenu: 'articles',
        fixedHeight: 77
      }
    },
    components: {
      BackTop
    },
    methods: {
      routeNavigate(itemName) {
        this.activeMenu = itemName;
        this.$router.push({path: '/hot/' + itemName})
      },
      // 滚动条滚动处理事件：
      handleScroll() {
        const scrollTop = this.app.scrollTop
        let computeTop = 77 - scrollTop;
        this.fixedHeight = computeTop < 2 ? 2 : computeTop > 77 ? 77 : computeTop;
      }
    },
    mounted() {
      // 给window添加一个滚动监听事件
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
  @import './css/ranking/ranking.less';
</style>
