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
      <a href="/article/7353484906532995135" class="article-item-link" target="_blank" v-for="(item,index) in noteList" :key="item.uid">
        <div class="article-item-wrap">
          <div class="article-item-left">
            <span :class="['iconfont', 'rank-' + (index+1), 'article-number']" v-if="index <= 2"></span>
            <span class="article-number" v-else>{{index}}</span>
            <div class="article-detail">
              <div :title="item.articleTitle" class="article-title">
                {{item.articleTitle}}
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
            <Button ghost class="ghost-btn action-btn">
              <span>收藏</span>
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
    name: "FeaturedNotes",
    data() {
      return {
        popoverContainer: null,
        noteList: [
          {
            uid: 123,
            articleTitle: '我早就看现在的工作流不爽了！- 前端使用 Jenkins',
            userInfo: {
              username: 'bald3r',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hojglubq5nj311y1kwx4c.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 12000,
            collectCount: 201,
            likeCount: 203
          },
          {
            uid: 1231,
            articleTitle: '你不知道的Vue最新功能：Vue Macros',
            userInfo: {
              username: '水煮鱼写前端',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1hojgm70ztnj316p1kxqln.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 300,
            collectCount: 201,
            likeCount: 203
          },
          {
            uid: 1232,
            articleTitle: '面试官：如何一次性渲染十万条数据',
            userInfo: {
              username: 'Dolphin_海豚',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1hog855y6lpj30sg0zkdk1.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 400,
            collectCount: 201,
            likeCount: 203
          },
          {
            uid: 1233,
            articleTitle: 'Flutter 即将放弃 Html renderer ，你是否支持这个提议？',
            userInfo: {
              username: '恋猫de小郭',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hog854ty1oj30u011hwij.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 5020,
            collectCount: 201,
            likeCount: 203
          },
          {
            uid: 1234,
            articleTitle: '秒杀 ：这些问题帮你弄清楚分布式锁应该如何设计',
            userInfo: {
              username: '志字辈小蚂蚁',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1hog858wjnhj30u011haf3.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203
          },
          {
            uid: 1235,
            articleTitle: '陌生Java项目历险记 2 ——搜索与回溯',
            userInfo: {
              username: ' 摸鱼总工',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hog859i4f5j30l40qego7.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203
          },
          {
            uid: 1236,
            articleTitle: 'Spring Cloud Gateway实战',
            userInfo: {
              username: '徐年',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hog6fy2jvxj316o1kwk96.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203
          },
          {
            uid: 1237,
            articleTitle: '写出好的Join语句，前提你得懂这些！',
            userInfo: {
              username: '程序员清风',
              avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1hog6g0y71xj311y1kw7eb.jpg',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203
          },
          {
            uid: 1238,
            articleTitle: '经历定时任务事故，我学到了什么？一个案例的全面回顾',
            userInfo: {
              username: '小白858',
              avatar: 'https://p9-passport.byteacctimg.com/img/user-avatar/1231993a9352e0b6c0dd8102c8be5cd1~100x100.awebp',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203
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
