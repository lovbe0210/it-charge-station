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
    <div class="hot-list">
      <a href="/post/7353484906532995135" class="article-item-link" target="_blank" v-for="item in columnList" :key="item.columnId">
        <div class="article-item-wrap">
          <div class="article-item-left">
            <div class="article-detail">
              <div class="article-title">
                <div :title="item.columnName" class="column-name">
                  {{item.columnName}}
                </div>
                <div :title="item.columnDesc" class="column-desc">
                  {{item.columnDesc}}
                </div>
              </div>
              <div class="article-author">
                <a href="/user/3468339576581548" class="article-author-name" target="_blank">
                  <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer">
                    <slot>
                      <b-avatar
                        :src="item.userInfo.avatar"
                        size="1.5rem"
                        class="avatar"
                        to="/lovbe0210">
                        <span v-if="!item.userInfo.avatar">{{item.userInfo.username}}</span>
                      </b-avatar>
                    </slot>
                  </user-card>
                  <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer">
                    <slot>
                      <b-link to="/lovbe0210">
                        <span class="article-author-name-text">{{item.userInfo.username}}&nbsp;·&nbsp;</span>
                      </b-link>
                    </slot>
                  </user-card>
                </a>
                <div class="author-text">
                  {{ formatNumber(item.articleCount) }} 文档&nbsp;·&nbsp;
                </div>
                <div class="author-text">
                  {{ formatNumber(item.subCount) }} 订阅&nbsp;·&nbsp;
                </div>
                <div class="author-text">
                  {{ formatNumber(item.viewCount) }} 浏览
                </div>
              </div>
            </div>
          </div>
          <div class="article-right">
            <Button class="action-btn ghost-btn">
              <span>订阅</span>
            </Button>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  import { formatNumber } from '@/utils/emoji/index.js'
  import UserCard from "@/components/common/UserCard.vue";
  export default {
    name: "RecommendColumn",
    data() {
      return {
        popoverContainer: null,
        columnList: [
          {
            columnId: 123,
            columnName: '橙心的原创文章橙心的原创文章橙心的原创文章橙心的原创文章橙心的原创文章橙心的原创文章橙心的原创文章橙心的原创文章橙心的原创文章',
            columnDesc: 'hello，欢迎来到「橙心设计的文章」专栏，以下是橙心在「语雀」的其他分享，欢迎关注！橙心的原创文章橙心的原创文章橙心的原创文章橙心的原创文章',
            userInfo: {
              username: 'bald3r',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hojglubq5nj311y1kwx4c.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            articleCount: 21,
            subCount: 201,
            viewCount: 12000
          },
          {
            columnId: 1231,
            columnName: '成长花园',
            columnDesc: '糟糕，页面迷路了！',
            userInfo: {
              username: '水煮鱼写前端',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1hojgm70ztnj316p1kxqln.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            articleCount: 3,
            subCount: 201,
            viewCount: 2000
          },
          {
            columnId: 1232,
            columnName: 'Java开发技术手册',
            columnDesc: '与志同道合的人，做志同道合的事。与人分享，与人交流，进步的更快。',
            userInfo: {
              username: 'Dolphin_海豚',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1hog855y6lpj30sg0zkdk1.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            articleCount: 15,
            subCount: 201,
            viewCount: 2023
          },
          {
            columnId: 1233,
            columnName: 'Flutter 即将放弃 Html renderer ，你是否支持这个提议？',
            userInfo: {
              username: '恋猫de小郭',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hog854ty1oj30u011hwij.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            articleCount: 10,
            subCount: 201,
            viewCount: 203
          },
          {
            columnId: 1234,
            columnName: '秒杀 ：这些问题帮你弄清楚分布式锁应该如何设计',
            userInfo: {
              username: '志字辈小蚂蚁',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1hog858wjnhj30u011haf3.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            articleCount: 12000,
            subCount: 201,
            viewCount: 203
          },
          {
            columnId: 1235,
            columnName: '陌生Java项目历险记 2 ——搜索与回溯',
            userInfo: {
              username: ' 摸鱼总工',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hog859i4f5j30l40qego7.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            articleCount: 12000,
            subCount: 201,
            viewCount: 203
          },
          {
            columnId: 1236,
            columnName: 'Spring Cloud Gateway实战',
            userInfo: {
              username: '徐年',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hog6fy2jvxj316o1kwk96.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            articleCount: 12000,
            subCount: 201,
            viewCount: 203
          },
          {
            columnId: 1237,
            columnName: '写出好的Join语句，前提你得懂这些！',
            userInfo: {
              username: '程序员清风',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1hog6g0y71xj311y1kw7eb.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            articleCount: 12,
            subCount: 21,
            viewCount: 203
          },
          {
            columnId: 1238,
            columnName: '经历定时任务事故，我学到了什么？一个案例的全面回顾',
            userInfo: {
              username: '小白858',
              avatar: 'https://p9-passport.byteacctimg.com/img/user-avatar/1231993a9352e0b6c0dd8102c8be5cd1~100x100.awebp',
              userId: 112,
              domain: '/lovbe0210'
            },
            articleCount: 40,
            subCount: 201,
            viewCount: 12000
          }
        ]
      }
    },
    components: {
      UserCard
    },
    methods: {
      formatNumber
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
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
