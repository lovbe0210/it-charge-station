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
            <div :class="['item', activeMenuForEq === 'FeaturedNotes' ? 'active-menu' : '']">
              <span class="iconfont article"></span>
              <span>精选笔记榜</span>
            </div>
          </div>
          <div class="menu-item" @click="routeNavigate('column')">
            <div :class="['item', activeMenuForEq === 'RecommendColumn' ? 'active-menu' : '']">
              <span class="iconfont series-column"></span>
              <span>推荐专栏榜</span>
            </div>
          </div>
          <div class="menu-item" @click="routeNavigate('authors')">
            <div :class="['item', activeMenuForEq === 'QualityAuthors' ? 'active-menu' : '']">
              <span class="iconfont author2"></span>
              <span>优秀作者榜</span>
            </div>
          </div>
        </div>
        <div class="rank-tip">
          <p>
            <span class="iconfont tips"></span>
            <!--          <span class="iconfont tips1"></span>-->
            <span>排行榜说明：</span>
            <span v-if="activeMenuForEq === 'FeaturedNotes'">基于最近3日内文章统计，基于有效阅读、点赞、评论、收藏数据计算热度</span>
            <span v-if="activeMenuForEq === 'RecommendColumn'">基于专栏内所有文章的有效阅读、点赞、评论、收藏数据计算热度</span>
            <span v-if="activeMenuForEq === 'QualityAuthors'">按发表文章、随笔小计、互动数据计算热度</span>
          </p>
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
    beforeRouteEnter(from, to, next) {
      next(vc => {
        vc.activeMenu = vc.$route.name;
        next();
      });
    },
    data() {
      return {
        activeMenu: '精选笔记榜',
        fixedHeight: 77
      }
    },
    components: {
      BackTop
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
        this.$router.push({path: '/hot/' + itemName})
      },
      // 滚动条滚动处理事件：
      handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let computeTop = 77 - scrollTop;
        this.fixedHeight = computeTop < 2 ? 2 : computeTop > 77 ? 77 : computeTop;
      }
    },
    watch: {
      $route(to) {
        this.activeMenu = to.name;
      }
    },
    mounted() {
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
  @import '../components/css/ranking/ranking.less';
</style>
