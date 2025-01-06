<template>
  <b-container fluid ref="popoverContainer">
    <b-list-group>
      <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" :infinite-scroll-distance="100">
        <b-row v-for="item in data" :key="item.uid" fluid="true" class="item">
          <b-col :cols="isPhone || !item.coverUrl ? 12 : 8" class="text">
            <b-link :to="toHref(item)" target="_blank">
              <div class="title">
                <span>{{ item.title }}</span>
              </div>
              <div class="description">
                <span>
                  {{ item.summary }}
                </span>
              </div>
            </b-link>
            <b-row class="item-addition-info un-select">
              <div class="author-info">
                <user-card class="item-avatar"
                           :userInfo="item.userInfo"
                           :popoverContainer="popoverContainer">
                  <slot>
                    <b-link :to="('/' + item.userInfo.domain)" class="from">
                      <span>{{ item.userInfo.username }}</span>
                    </b-link>
                  </slot>
                </user-card>
                <span class="count-info">
                  <span>
                    <span class="iconfont i-view"/> {{ item.viewCount }}
                  </span>
                  <span>
                    <span :class="['iconfont', 'like', item.ifLike ? 'liked' : '']"/> {{ item.likeCount }}
                  </span>
                </span>
              </div>
              <span class="acticle-tags">
                <span :class="'ant-tag ant-tag-' + tag.color"
                      v-for="(tag,index) in item.tags"
                      :title="tag.content"
                      :key="index">{{ tag.content }}</span>
              </span>
            </b-row>
          </b-col>
          <b-col v-if="!isPhone && item.coverUrl" cols="4" fluid class="preview-image">
            <b-link :to="toHref(item)" target="_blank">
              <b-img right fluid rounded :src="fileUrl(item.coverUrl)" alt="Image"/>
            </b-link>
          </b-col>
        </b-row>
      </div>
      <div class="bottom" v-if="busy">
        我是有底线的，休息一会儿再来吧！
      </div>
    </b-list-group>
  </b-container>
</template>

<script>
import UserCard from "@/components/common/UserCard.vue";
import ContentPicksApi from "@/api/ContentPicksApi";

export default {
  name: 'Recommend',
  // 如果通过首页进来则一定显示推荐页面，否则显示用户自己上次选择的页面，这样如果用户不点击主页无论怎么刷新页面都将会显示上次浏览的页面
  beforeRouteEnter(to, from, next) {
    next(vc => {
      // 通过 `vc` 访问组件实例
      if (vc.$route.params.index) {
        vc.$store.commit('changeActiveRoute', 'recommend')
      }
      next();
    })
  },
  data() {
    return {
      loading: false,
      showImg: true,
      popoverContainer: null,
      data: [],
      hasMore: true,
      offset: 0,
      count: 0
    }
  },
  components: {
    UserCard
  },
  computed: {
    // 判断页面是手机页面还是pc页面，如果是手机页面则进行全屏显示
    isPhone() {
      return this.$store.state.isPhone
    },
    // 设置无限滚动条目数
    busy() {
      return this.data.length > 100
    }
  },
  methods: {
    loadMore() {
      if (!this.hasMore || this.busy) {
        return;
      }
      ContentPicksApi.getRecommendArticleList({offset: this.offset}).then(data => {
        if (data?.result) {
          this.hasMore = data.data.hasMore;
          if (data.data.hasMore) {
            this.offset = this.offset + 20;
          }
          this.data.push(...data.data.list);
        }
      })
    },
    toHref(articleItem) {
      let href = '/' + articleItem?.userInfo?.domain + '/';
      return href + (articleItem.columnUri ? (articleItem.columnUri + '/') : '') + articleItem.uri;
    },
    fileUrl(path) {
      return this.fileService + path;
    }
  },
  mounted() {
    this.popoverContainer = this.$refs.popoverContainer;
    /*ContentPicksApi.getRecommendArticleList({offset: 0}).then(data => {
      if (data?.result) {
        this.hasMore = data.data.hasMore;
        if (data.data.hasMore) {
          this.offset = this.offset + 20;
        }
        this.data = data.data.list;
      }
    })*/
  }
}
</script>

<style scoped lang="less">
@import "../css/home/recommend.less";
@import "../css/common-var.less";
</style>
