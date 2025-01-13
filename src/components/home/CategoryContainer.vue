<template>
  <div class="layout-module_Category adjust">
    <div class="category-module_header">
      <div v-for="menu in secondMenuList"
           :key="menu.uid"
           @click="activeMenu = menu.menuCode"
           :class="['tag-menu', 'un-select', menu.menuCode === activeMenu ? 'active' : '']">
        <span>{{ menu.menuName }}</span>
      </div>
    </div>
    <div class="category-module_list">
      <b-container fluid ref="popoverContainer">
        <b-list-group>
          <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" :infinite-scroll-distance="100">
            <b-row v-for="item in data" :key="item.uid" fluid="true" class="item">
              <b-col :cols="isPhone || !item.coverUrl ? 12 : 8" class="text">
                <b-link :to="toHref(item)" target="_blank">
                  <div class="title">
                    <span :title="item.title">{{ item.title }}</span>
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
                    <span class="iconfont i-view"/> {{ formatNumber(item.viewCount) }}
                  </span>
                  <span>
                    <span :class="['iconfont', 'like', item.ifLike ? 'liked' : '']"/> {{ formatNumber(item.likeCount) }}
                  </span>
                </span>
                  </div>
                  <span class="acticle-tags">
                    <span :class="'ant-tag ant-tag-' + tag.color"
                          v-for="(tag,index) in item.tags"
                          :title="tag.content"
                          :key="index">{{ tag.content }}
                    </span>
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
    </div>
  </div>
</template>

<script>
import { formatNumber } from '@/utils/emoji/index.js'
import WriteCenterApi from "@/api/WriteCenterApi";
import UserCard from "@/components/common/UserCard.vue";
import ContentPicksApi from "@/api/ContentPicksApi";

export default {
  name: "CategoryContainer",
  components: {UserCard},
  data() {
    return {
      firstMenu: null,
      secondMenuList: [],
      allMenuList: [],
      activeMenu: '0',
      hasMore: true,
      offset: 0,
      data: []
    }
  },
  computed: {
    isPhone() {
      return this.$store.state.isPhone
    },
    // 设置无限滚动条目数
    busy() {
      return this.data.length > 200
    }
  },
  methods: {
    loadMore() {
      if (!this.hasMore || this.busy) {
        return;
      }
      let requestData = {
        offset: this.offset,
        firstCategory: this.firstMenu,
        secondCategory: this.activeMenu === '0' ? null : this.activeMenu
      };
      ContentPicksApi.getCategoryArticleList(requestData).then(data => {
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
    },
    formatNumber
  },
  watch: {
    "$route"(to, from) {
      this.firstMenu = to.path?.replace('/', '');
      this.activeMenu = '0';
      this.secondMenuList = [
        {
          uid: 0,
          menuName: '全部',
          menuCode: '0',
          sort: 0
        }
      ];
      this.secondMenuList.push(...this.allMenuList.filter(menu => menu.parentCode === this.firstMenu));
      this.offset = 0;
      this.hasMore = true;
      this.data = [];
      this.loadMore();
    },
    "activeMenu"() {
      this.offset = 0;
      this.hasMore = true;
      this.data = [];
      this.loadMore();
    }
  },
  mounted() {
    this.popoverContainer = this.$refs.popoverContainer;
  },
  created() {
    let firstMenu = this.$route.path?.replace('/', '');
    this.firstMenu = firstMenu;
    WriteCenterApi.getMenuList().then(data => {
      if (data?.result) {
        this.allMenuList = data.data;
        if (data.data == null || data.data?.length === 0) {
          return;
        }
        this.secondMenuList = [
          {
            uid: 0,
            menuName: '全部',
            menuCode: '0',
            sort: 0
          }
        ];
        this.secondMenuList.push(...data.data.filter(menu => menu.parentCode === firstMenu));
      }
    })
  }
}
</script>

<style scoped lang="less">
  @import "../css/common-var.less";
  @import "../css/home/category.less";
</style>
