<template>
  <div class="layout-module_feature-note" ref="popoverContainer">
    <div class="hot-header">
      <p>
        推荐专栏
        <a-tooltip overlayClassName="feature-note-tooltip"
                   :getPopupContainer="()=>this.$refs.popoverContainer">
          <template slot="title">
            <span style="font-size: 12px;">基于专栏的订阅数据和专栏文章数以及有效阅读量计算热度</span>
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
      <a :href="'/' + item.userInfo.domain + '/' + item.uri"
         class="article-item-link"
         target="_blank"
         v-for="item in columnList"
         :key="item.uid">
        <div class="article-item-wrap">
          <div class="article-item-left">
            <div class="article-detail">
              <div class="article-title">
                <div :title="item.title" class="column-name">
                  {{item.title}}
                </div>
                <div :title="item.synopsis" class="column-desc">
                  {{item.synopsis}}
                </div>
              </div>
              <div class="article-author">
                <div class="article-author-name">
                  <b-avatar
                    :src="fileUrl(item.userInfo.avatarUrl)"
                    size="1.5rem"
                    class="avatar"
                    target="_blank"
                    :to="'/' + item.userInfo.domain">
                    <span v-if="!item.userInfo.avatarUrl">{{item.userInfo.username}}</span>
                  </b-avatar>
                  <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer">
                    <slot>
                      <b-link :to="'/' + item.userInfo.domain">
                        <span class="article-author-name-text">{{item.userInfo.username}}&nbsp;·&nbsp;</span>
                      </b-link>
                    </slot>
                  </user-card>
                </div>
                <div class="author-text">
                  {{ formatNumber(item.articleCount) }} 文档&nbsp;·&nbsp;
                </div>
                <div class="author-text">
                  {{ formatNumber(item.collectCount) }} 收藏&nbsp;·&nbsp;
                </div>
                <div class="author-text">
                  {{ formatNumber(item.viewCount) }} 浏览
                </div>
              </div>
            </div>
          </div>
          <div class="article-right">
<!--            <Button class="action-btn ghost-btn">
              <span>收藏</span>
            </Button>-->
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  import { formatNumber } from '@/utils'
  import UserCard from "@/components/common/UserCard.vue";
  import contentPicksApi from "@/api/ContentPicksApi";
  export default {
    name: "RecommendColumn",
    data() {
      return {
        popoverContainer: null,
        columnList: []
      }
    },
    components: {
      UserCard
    },
    methods: {
      formatNumber,
      fileUrl(path) {
        return this.fileService + path;
      }
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
    },
    created() {
      this.columnList = [];
      contentPicksApi.getRankColumn({offset: 0, limit: 30}).then(data => {
        if (data?.result) {
          this.columnList = data.data.list;
        }
      })
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
    width: 100%;

    .article-item-wrap {
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

      .article-item-left {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        min-width: 300px;

        .article-number {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 2rem;
          color: @grey-white-font-color;
          margin-right: 1.2rem;
          min-width: 2rem;
          text-align: center;
          flex-shrink: 0;
        }

        .article-detail {
          display: flex;
          flex-direction: column;
          max-width: 600px;
          min-width: 500px;

          .article-title {
            line-height: 28px;
            letter-spacing: 0.008em;
            margin-bottom: 5px;

            .column-name {
              color: var(--font-color);
              font-size: 15px;
              font-weight: bold;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }

            .column-desc {
              color: var(--title-color);
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }
          }

          .article-author {
            margin-top: 5px;
            font-size: 14px;
            line-height: 26px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;

            .article-author-name {
              cursor: pointer;
              font-weight: 600;
              display: flex;
              align-items: center;

              .avatar {
                margin-right: 10px;
                line-height: 26px;
              }

              .article-author-name-text {
                vertical-align: middle;
                color: var(--title-color);
                line-height: 26px;
                height: 26px;
                display: flex;

                &:hover {
                  color: @grey-white-font-color;
                }
              }
            }

            .author-text {
              color: var(--title-color);
            }
          }
        }
      }

      .article-right {
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
