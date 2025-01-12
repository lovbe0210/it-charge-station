<template>
  <div class="layout-module_feature-note" ref="popoverContainer">
    <div class="hot-header">
      <p>
        优秀作者
        <a-tooltip overlayClassName="feature-note-tooltip"
                   :getPopupContainer="()=>this.$refs.popoverContainer">
          <template slot="title">
            <span style="font-size: 12px;">基于文章数量、随笔小记、互动量计算热度</span>
          </template>
          <span class="iconfont doubt"></span>
        </a-tooltip>
      </p>
    </div>
    <Divider class="divider"/>
    <div class="hot-list"
         v-infinite-scroll="debounceRequestRank"
         :infinite-scroll-disabled="!hasMore"
         :infinite-scroll-distance="100">
      <a :href="'/' + item.domain" class="article-item-link" target="_blank" v-for="(item,index) in authorList" :key="item.uid">
        <div class="author-item-wrap">
          <div class="author-item-left">
            <span :class="['iconfont', 'rank-' + (index+1), 'sort-number']" v-if="index <= 2"></span>
            <span class="sort-number" v-else>{{index}}</span>
            <user-card :userInfo="item" :popoverContainer="popoverContainer">
              <slot>
                <b-avatar
                  :src="fileUrl(item.avatarUrl)"
                  size="2.5rem"
                  class="author-avatar"
                  :to="'/' + item.domain">
                  <span v-if="!item.avatarUrl">{{item.username}}</span>
                </b-avatar>
              </slot>
            </user-card>
            <a href="/user/3468339576581548" class="author-info" target="_blank">
              <user-card :userInfo="item" :popoverContainer="popoverContainer">
                <slot>
                  <b-link to="/lovbe0210" class="author-name">
                    <span class="author-name-text">{{item.username}}</span>
                    <span :class="['iconfont', 'icon-level' + item.level]"></span>
                  </b-link>
                </slot>
              </user-card>
              <div class="author-count">
                <div class="author-text">
                  {{ formatNumber(item.articleCount) }} 文章&nbsp;·&nbsp;
                </div>
                <div class="author-text">
                  {{ formatNumber(item.likeCount) }} 获赞&nbsp;·&nbsp;
                </div>
                <div class="author-text">
                  {{ formatNumber(item.fansCount) }} 粉丝
                </div>
              </div>
            </a>
          </div>
          <div class="author-right">
            <Button class="action-btn ghost-btn">
              <span>关注</span>
            </Button>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  import { formatNumber, debounce } from '@/utils/emoji/index.js'
  import UserCard from "@/components/common/UserCard.vue";
  import contentPicksApi from "@/api/ContentPicksApi";

  export default {
    name: "QualityAuthor",
    data() {
      return {
        popoverContainer: null,
        hasMore: true,
        offset: 0,
        authorList: [],
        debounceRequestRank: function () {}
      }
    },
    components: {
      UserCard
    },
    methods: {
      formatNumber,
      fileUrl(path) {
        return this.fileService + path;
      },
      loadMore() {
        if (!this.hasMore) {
          return;
        }
        contentPicksApi.getRankAuthor({offset: this.offset}).then(data => {
          if (data?.result) {
            this.authorList.push(...data.data.list);
            this.hasMore = data.data.hasMore
            if (data.data.hasMore) {
              this.offset = this.offset + 20;
            }
          }
        })
      }
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
    },
    created() {
      this.authorList = [];
      this.debounceRequestRank = debounce(this.loadMore, 800, true);
    }
  }
</script>

<style scoped lang="less">
  @import "../css/common-var";
  .layout-module_feature-note {
    width: 95%;
  }

  .hot-header {
    p {
      font-size: 16px;
      font-weight: 600;
      //color: #262626;
      display: flex;
      align-items: center;

      .iconfont {
        margin-left: 5px;
        color: @grey-white-font-color;
        font-size: 17px;
      }
    }
  }

  .divider {
    margin: 24px 0 10px 0;
  }

  .article-item-link {
    display: inline-block;
    padding: 0;
    margin: 0;
    width: 100%;

    .author-item-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      padding: 1.2rem 1rem 1rem 0.5rem;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: var(--on-theme-bg-color);
      }

      .author-item-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        min-width: 300px;

        .sort-number {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 2rem;
          color: @grey-white-font-color;
          margin-right: 1.2rem;
          min-width: 2rem;
          text-align: center;
          flex-shrink: 0;
        }

        .author-avatar {
          margin-right: 20px;
        }

        .author-info {
          display: flex;
          flex-direction: column;
          max-width: 600px;
          min-width: 500px;
          line-height: 28px;
          letter-spacing: 0.008em;

          .author-name {
            font-size: 15px;
            font-weight: bold;
            line-height: 26px;
            color: var(--font-color);
            margin-bottom: 8px;

            .iconfont {
              margin-left: 5px;
              font-size: 20px;
            }

            &:hover {
              color: @grey-white-font-color;
            }
          }

          .author-count {
            color: @grey-white-font-color;
            display: flex;
            align-items: center;

            .author-text {
              color: var(--title-color);
            }
          }
        }


      }

      .author-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        flex-shrink: 0;

        .action-btn {
          width: 70px;
        }
      }
    }
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: #909090;
  }
</style>
