<template>
  <div class="layout-module_recentView" ref="popoverContainer">
    <div class="recent-view-header">
      <h2 class="title">浏览记录</h2>
      <hr class="separator-line">
      <div class="operation">
        <Input class="search"
               v-model="browseHistoryPage.keywords"
               search
               placeholder="搜索标题关键词"
               @on-search="search"/>
        <div class="action">
          <span class="iconfont delete"></span>
          <span>清空记录</span>
        </div>
      </div>
    </div>
    <div class="recent-view-list">
      <div class="list-wrapp" v-for="(item,index) in browseHistoryList" :key="index">
        <div class="time-line">
          <span class="iconfont history"></span>
          {{formatDate(new Date(item.historyDate), 'yyyy-MM-dd')}}
        </div>
        <div class="view-list-item" v-for="viewItem in item.list" :key="viewItem.uid">
          <a class="item-header" :href="getRoutePath(viewItem)" :target="viewItem.targetType === 3 ? '' : '_blank'">
            <span :class="['item-type', viewItem.targetType == 1 ? 'doc' : viewItem.targetType == 2 ? 'colum' : 'rambly-jot']">
              {{viewItem.targetType == 1 ? '文章' : viewItem.targetType == 2 ? '专栏' : '随笔'}}
            </span>
            <h2 class="item-title">{{viewItem.title}}</h2>
          </a>
          <div class="item-content" :title="viewItem.previewContent">
            <span>{{viewItem.previewContent}}</span>
          </div>
          <div class="item-info-action un-select">
            <div class="author-and-count">
              <user-card :userInfo="viewItem.userInfo" :popoverContainer="popoverContainer">
                <slot>
                  <b-link class="item-author" :to="'/' + viewItem.userInfo?.domain">
                    {{viewItem.userInfo?.username}}
                  </b-link>
                </slot>
              </user-card>
              <span class="tag"></span>
              <span class="item-count" v-if="viewItem.targetType == 1">
                {{viewItem.viewCount}}阅读 · {{viewItem.likeCount}}赞 · {{viewItem.commentCount}}评论
              </span>
              <span class="item-count" v-if="viewItem.targetType === 2">
                {{viewItem.viewCount}}阅读 · {{viewItem.likeCount}}赞 · {{viewItem.collectCount}}收藏
              </span>
              <span class="item-count" v-if="viewItem.targetType === 3">
                {{viewItem.likeCount}}赞 · {{viewItem.commentCount}}评论
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentPicksApi from "@/api/ContentPicksApi";
  import UserCard from "@/components/common/UserCard.vue";
  import { formatDate } from "@/utils/utils";

  export default {
    name: 'RecentView',
    data() {
      return {
        browseHistoryPage: {
          limit: 20,
          offset: 0,
          keywords: null
        },
        hasNext: true,
        browseHistoryList: [],
        popoverContainer: null
      }
    },
    components: {
      UserCard
    },
    methods: {
      formatDate,
      search() {
        this.browseHistoryPage.limit = 20;
        this.browseHistoryPage.offset = 0;
        ContentPicksApi.getBrowseHistoryList(this.browseHistoryPage).then(data => {
          if (data?.result) {
            this.browseHistoryList = data.data;
            if (data.data?.length && data.data?.length < this.browseHistoryPage.limit) {
              this.hasNext = false;
            }
          }
        })
      },
      getRoutePath(viewItem) {
        // TODO 随笔路径还不确定
        let targetType = viewItem.targetType;
        if (targetType === 1 || targetType === 2) {
          return "/" + viewItem.userInfo?.domain + "/" + (viewItem.columnUri ? (viewItem.columnUri + '/') : viewItem.uri);
        } else if (targetType === 3) {
          return "/creative/recentview/" + viewItem.targetId;
        }
        return "/";
      }
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
      ContentPicksApi.getBrowseHistoryList(this.browseHistoryPage).then(data => {
        if (data?.result) {
          this.browseHistoryList = data.data;
          if (data.data?.length && data.data?.length < this.browseHistoryPage.limit) {
            this.hasNext = false;
          }
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import '../css/creativespace/recentView.less';
</style>
