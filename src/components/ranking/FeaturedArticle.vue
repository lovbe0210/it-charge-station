<template>
  <div class="layout-module_feature-note" ref="popoverContainer">
    <div class="hot-header">
      <p>
        精选文章
        <a-tooltip overlayClassName="feature-note-tooltip"
                   :getPopupContainer="()=>this.$refs.popoverContainer">
          <template slot="title">
            <span style="font-size: 12px;">基于最近3日内的文章统计数据，依据文章有效阅读、点赞、评论、收藏数据计算热度</span>
          </template>
          <span class="iconfont doubt"></span>
        </a-tooltip>
      </p>
    </div>
    <Divider class="divider"/>
    <div class="hot-list">
      <a :href="toHref(item)"
         class="article-item-link"
         target="_blank"
         v-for="(item,index) in articleList"
         :key="item.uid">
        <div class="article-item-wrap">
          <div class="article-item-left">
            <span :class="['iconfont', 'rank-' + (index+1), 'article-number']" v-if="index <= 2"></span>
            <span class="article-number" v-else>{{index+1}}</span>
            <div class="article-detail">
              <div :title="item.title" class="article-title">
                {{item.title}}
              </div>
              <div class="article-author">
                <a :href="'/' + item.userInfo.domain" class="article-author-name" target="_blank">
                  <b-avatar
                    :src="fileUrl(item.userInfo.avatarUrl)"
                    size="1.5rem"
                    class="avatar"
                    href="javascript:void(0)">
                    <span v-if="!item.userInfo.avatarUrl">{{item.userInfo.username}}</span>
                  </b-avatar>
                  <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer">
                    <slot>
                      <b-link :to="'/' + item.userInfo.domain" target="_blank">
                        <span class="article-author-name-text">{{item.userInfo.username}}&nbsp;·&nbsp;</span>
                      </b-link>
                    </slot>
                  </user-card>
                </a>
                <div class="author-text">
                  {{ formatNumber(item.viewCount) }} 浏览&nbsp;·&nbsp;
                </div>
                <div class="author-text">
                  {{ formatNumber(item.likeCount) }} 赞&nbsp;·&nbsp;
                </div>
                <div class="author-text">
                  {{ formatNumber(item.collectCount) }} 收藏
                </div>
              </div>
            </div>
          </div>
          <div class="article-right">
<!--            <Button ghost class="ghost-btn action-btn">
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
    name: "FeaturedArticle",
    data() {
      return {
        popoverContainer: null,
        articleList: []
      }
    },
    components: {
      UserCard
    },
    methods: {
      formatNumber,
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
    },
    created() {
      this.articleList = [];
      contentPicksApi.getRankArticle({offset: 0, limit: 30}).then(data => {
        if (data?.result) {
          this.articleList = data.data.list;
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
    padding: 0;
    margin: 0;
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
            color: var(--font-color);
            line-height: 28px;
            letter-spacing: 0.008em;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            margin-bottom: 5px;
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
              display: flex;
              align-items: center;

              .avatar {
                margin-right: 10px;
                line-height: 26px;
              }

              .article-author-name-text {
                vertical-align: middle;
                color: var(--title-color);
                font-weight: 600;
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

  //a {
  //  text-decoration: none;
  //  cursor: pointer;
  //  color: #909090;
  //}
</style>
