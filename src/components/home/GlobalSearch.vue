<template>
  <div class="layout-module_GlobalSearch adjust un-select" ref="popoverContainer">
    <div v-show="moreItemType === 0 || moreItemType === 1">
      <p class="search-result-title" v-if="searchUserTotal > 0">
        <span v-if="moreItemType === 0">相关用户</span>
        <span class="title-wrap" v-if="moreItemType !== 0">
          <span @click="moreItemType = 0" class="return-all">
            <span class="iconfont return"/>
            <span>返回</span>
          </span>
          <span v-if="moreItemType === 1" class="search-total-page">
            为你找到约 {{
              searchUserTotal
            }} 个结果 {{ searchUserTotal > pageSize ? ('，当前是第 ' + currentPage + ' 页') : '' }}
          </span>
        </span>
        <span class="search-result-extend"
              v-if="moreItemType !== 1"
              @click="moreItemType = 1">
          查看全部
        </span>
      </p>
      <div :class="['search-result-suggestions', moreItemType === 1 ? 'only-user-column' : '']">
        <div class="suggestions-item-user" v-for="item in previewSearchUserList" :key="item.uid">
          <user-card class="item-avatar"
                     :userInfo="item"
                     :popoverContainer="popoverContainer">
            <slot>
              <b-avatar
                :src="fileUrl(item.avatarUrl)"
                size="2.8rem"
                variant="light"
                class="avatar"
                :to="'/' + item.domain">
                <span v-if="!item.avatarUrl">{{ item.username }}</span>
              </b-avatar>
            </slot>
          </user-card>
          <div class="item-userInfo">
            <user-card :userInfo="item" :popoverContainer="popoverContainer">
              <slot>
                <a class="item-userName" :href="'/' + item.domain" target="_blank">
                  <span v-html="item.showUsername"></span>
                </a>
              </slot>
            </user-card>
            <div class="item-social">
                <span class="index-module_meta" :title="item.location">
                  <span class="iconfont location"></span>
                  <span>{{ item.location ? item.location : '未填写' }}</span>
                </span>
              <span class="index-module_meta" :title="item.industry">
                  <span class="iconfont industry"></span>
                  <span>{{ item.industry ? item.industry : '未填写' }}</span>
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="moreItemType == 0 || moreItemType === 2">
      <p class="search-result-title" v-if="searchColumnTotal > 0">
        <span v-if="moreItemType === 0">相关专栏</span>
        <span class="title-wrap" v-if="moreItemType !== 0">
          <span @click="moreItemType = 0" class="return-all">
            <span class="iconfont return"/>
            <span>返回</span>
          </span>
          <span v-if="moreItemType === 2" class="search-total-page">
            为你找到约 {{ searchColumnTotal }} 个结果{{ searchColumnTotal > pageSize ? ('，当前是第 ' + currentPage + ' 页') : '' }}
          </span>
        </span>
        <span class="search-result-extend"
              v-if="moreItemType !== 2"
              @click="moreItemType = 2">
          查看全部
        </span>
      </p>
      <div :class="['search-result-suggestions', moreItemType !== 0 ? 'only-user-column' : '']">
        <div class="suggestions-item-column" v-for="item in previewSearchColumnList" :key="item.uid">
          <span class="iconfont series-column"></span>
          <div class="item-columnInfo">
            <h3 class="item-title">
              <a :href="'/column/' + item.uid" target="_blank" :title="item.title">
                <span v-html="item.highLightTitle || item.title"></span>
              </a>
            </h3>
            <p class="item-abstract" :title="item.synopsis">
              <span v-html="item.highLightSynopsis || item.synopsis"></span>
            </p>
            <user-card class="item-avatar"
                       :userInfo="item.userInfo"
                       :popoverContainer="popoverContainer">
              <slot>
                <a class="item-belong" :href="'/' + item.domain" target="_blank">
                  <span>{{ item.userInfo.username }}</span>
                </a>
              </slot>
            </user-card>
          </div>
        </div>
      </div>
    </div>
    <div v-show="moreItemType === 0">
      <p class="search-result-title" v-if="searchArticleTotal > 0">
        <span>相关内容</span>
        <span class="search-total-page-article">
            为你找到约 {{ searchArticleTotal }} 个结果{{ searchArticleTotal > pageSize ? ('，当前是第 ' + currentPage + ' 页') : '' }}
          </span>
      </p>
      <div class="search-result-suggestions-article">
        <div class="article-item-container">
          <div class="suggestions-article-item" v-for="item in searchArticles" :key="item.uid">
            <span class="iconfont article"/>
            <div class="article-item-info">
              <h3 class="article-item-title">
                <a :href="toHref(item)"
                   v-html="item.title"
                   target="_blank">
                </a>
              </h3>
              <p class="article-item-abstract" v-html="item.summary"></p>
              <p class="article-item-belongInfo">
                <span class="belong-info">
                  <user-card class="item-avatar"
                             :userInfo="item.userInfo"
                             :popoverContainer="popoverContainer">
                    <slot>
                      <b-link :to="('/' + item.userInfo.domain)" class="belong-info-author">
                        <span>{{ item.userInfo.username }}</span>
                      </b-link>
                    </slot>
                  </user-card>
                  <b-link v-if="item.columnUri" :to="'/' + item.userInfo.domain + '/' + item.columnUri">
                    <span>{{ ' / ' + item.columnName }}</span>
                  </b-link>
                </span>
                <span class="acticle-tags">
                  <a-tag :color="tag.color" v-for="(tag,index) in item.tags" :key="index">
                    {{ tag.content }}
                  </a-tag>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="suggestions-pagination" v-if="showPagination">
      <div class="pagination-prefix">
        <span>总共{{ pageTotal }}条</span>
      </div>
      <b-pagination
        v-model="currentPage"
        :total-rows="pageTotal"
        :per-page="pageSize"
        first-number
        last-number
        @change="pageChange">
        <template #prev-text>
          <span class="iconfont return"></span>
        </template>
        <template #next-text>
          <span class="iconfont to-right"></span>
        </template>
        <template #ellipsis-text>
          <span class="iconfont operate-standard"></span>
        </template>
      </b-pagination>
    </div>
    <div v-if="searchArticleTotal === 0 && searchUserTotal === 0 && searchColumnTotal === 0" class="empty-result">
      <span>暂无相关结果，尝试更换关键词重新搜索</span>
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/common/UserCard.vue";
import contentPicksApi from "@/api/ContentPicksApi";

export default {
  name: "GlobalSearch",
  data() {
    return {
      keywords: '',
      popoverContainer: null,
      // 搜索结果-用户
      searchUserTotal: 0,
      searchUsers: [],
      // 搜索结果-专栏
      searchColumnTotal: 0,
      searchColumns: [],
      // 搜索结果-文章
      searchArticleTotal: 0,
      searchArticles: [],
      currentPage: 1,
      pageSize: 15,
      // 查看全部类型 0全部 1用户 2专栏
      moreItemType: 0
    }
  },
  components: {
    UserCard
  },
  computed: {
    showPagination() {
      return (this.moreItemType === 0 && this.searchArticleTotal > this.pageSize) ||
        (this.moreItemType === 1 && this.searchUserTotal > this.pageSize) ||
        (this.moreItemType === 2 && this.searchColumnTotal > this.pageSize)
    },
    previewSearchUserList() {
      if (this.moreItemType === 0 && this.searchUsers.length > 3) {
        return this.searchUsers.slice(0, 3);
      }
      return this.searchUsers;
    },
    previewSearchColumnList() {
      if (this.moreItemType === 0 && this.searchColumns.length > 3) {
        return this.searchColumns.slice(0, 3);
      }
      return this.searchColumns;
    },
    pageTotal() {
      return this.moreItemType === 0 ? this.searchArticleTotal : this.moreItemType === 1 ? this.searchUserTotal : this.searchColumnTotal;
    }
  },
  created() {
    this.keywords = this.$route.query.k;
  },
  methods: {
    toHref(articleItem) {
      let href = '/' + articleItem?.userInfo?.domain + '/';
      return href + (articleItem.columnUri ? (articleItem.columnUri + '/') : '') + articleItem.uri;
    },
    fileUrl(path) {
      return this.fileService + path;
    },
    pageChange(page) {
      if (this.moreItemType === 0) {
        // 更多文章
        let searchRequest = {
          keywords: this.keywords,
          limit: this.pageSize,
          offset: (page - 1) * this.pageSize
        };
        contentPicksApi.getGlobalSearchArticleList(searchRequest).then(data => {
          if (data?.result) {
            this.searchArticles = data.data;
            // 滚动条回到初始位置
            let rootElement = document.getElementById("app");
            if (rootElement) {
              rootElement.scrollTop = 0;
            }
          }
        })
        return;
      }

      if (this.moreItemType === 1) {
        // 更多用户
        let searchRequest = {
          keywords: this.keywords,
          limit: this.pageSize,
          offset: (page - 1) * this.pageSize
        };
        contentPicksApi.getGlobalSearchUserList(searchRequest).then(data => {
          if (data?.result) {
            this.searchUsers = data.data;
            // 滚动条回到初始位置
            let rootElement = document.getElementById("app");
            if (rootElement) {
              rootElement.scrollTop = 0;
            }
          }
        })
        return;
      }

      if (this.moreItemType === 2) {
        // 更多用户
        let searchRequest = {
          keywords: this.keywords,
          limit: this.pageSize,
          offset: (page - 1) * this.pageSize
        };
        contentPicksApi.getGlobalSearchColumnList(searchRequest).then(data => {
          if (data?.result) {
            this.searchColumns = data.data;
            // 滚动条回到初始位置
            let rootElement = document.getElementById("app");
            if (rootElement) {
              rootElement.scrollTop = 0;
            }
          }
        })
      }
    },
    requestSearch() {
      let searchRequest = {
        keywords: this.keywords,
        limit: this.pageSize,
        offset: (this.currentPage - 1) * this.pageSize
      };
      contentPicksApi.getGlobalSearchResult(searchRequest).then(data => {
        if (data?.result) {
          this.searchUsers = data.data.searchUserList;
          this.searchUserTotal = data.data.searchUserCount;
          this.searchColumns = data.data.searchColumnList;
          this.searchColumnTotal = data.data.searchColumnCount;
          this.searchArticles = data.data.searchArticleList;
          this.searchArticleTotal = data.data.searchArticleCount;
        }
      })
    }
  },
  watch: {
    // 监听路由变化
    $route(to) {
      this.keywords = to.query.k;
      this.requestSearch();
    },
    "moreItemType"(newVal, oldVal) {
      if (newVal !== 0) {
        return;
      }
      this.currentPage = 1;
      // 请求首页数据数据
      let searchRequest = {
        keywords: this.keywords,
        limit: 3,
        offset: 0
      };
      if (oldVal === 1) {
        contentPicksApi.getGlobalSearchUserList(searchRequest).then(data => {
          if (data?.result) {
            this.searchUsers = data.data;
          }
        })
        return;
      }

      if (oldVal === 2) {
        contentPicksApi.getGlobalSearchColumnList(searchRequest).then(data => {
          if (data?.result) {
            this.searchColumns = data.data;
          }
        })
      }
    }
  },
  mounted() {
    this.popoverContainer = this.$refs.popoverContainer;
    this.requestSearch();
  }
}
</script>

<style scoped lang="less">
@import "../css/common-var.less";
@import "../css/home/global-search.less";
</style>
