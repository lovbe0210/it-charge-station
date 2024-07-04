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
    <div class="hot-list">
      <a href="/post/7353484906532995135" class="article-item-link" target="_blank" v-for="(item,index) in authorList" :key="item.userId">
        <div class="author-item-wrap">
          <div class="author-item-left">
            <span :class="['iconfont', 'rank-' + (index+1), 'sort-number']" v-if="index <= 2"></span>
            <span class="sort-number" v-else>{{index}}</span>
            <user-card :userInfo="item" :popoverContainer="popoverContainer">
              <slot>
                <b-avatar
                  :src="item.avatar"
                  size="2.5rem"
                  class="author-avatar"
                  to="/lovbe0210">
                  <span v-if="!item.avatar">{{item.username}}</span>
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
                  {{ formatNumber(item.likedCount) }} 获赞&nbsp;·&nbsp;
                </div>
                <div class="author-text">
                  {{ formatNumber(item.fansCount) }} 粉丝
                </div>
              </div>
            </a>
          </div>
          <div class="author-right">
            <Button class="action-btn">
              <span>关注</span>
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
    name: "QualityAuthors",
    data() {
      return {
        popoverContainer: null,
        authorList: [
          {
            username: 'bald3r',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hojglubq5nj311y1kwx4c.jpg',
            userId: 112,
            domain: '/lovbe0210',
            level: 6,
            articleCount: 12000,
            likedCount: 201,
            fansCount: 203
          },
          {
            username: '水煮鱼写前端',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1hojgm70ztnj316p1kxqln.jpg',
            userId: 113,
            domain: '/lovbe0210',
            level: 2,
            articleCount: 201,
            likedCount: 203,
            fansCount: 23
          },
          {
            username: 'Dolphin_海豚',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1hog855y6lpj30sg0zkdk1.jpg',
            userId: 114,
            domain: '/lovbe0210',
            level: 1,
            articleCount: 400,
            likedCount: 201,
            fansCount: 203
          },
          {
            username: '恋猫de小郭',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hog854ty1oj30u011hwij.jpg',
            userId: 1121,
            domain: '/lovbe0210',
            level: 5,
            articleCount: 201,
            likedCount: 203,
            fansCount: 23
          },
          {
            username: '志字辈小蚂蚁',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1hog858wjnhj30u011haf3.jpg',
            userId: 1122,
            domain: '/lovbe0210',
            level: 4,
            articleCount: 201,
            likedCount: 203,
            fansCount: 23
          },
          {
            username: ' 摸鱼总工',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hog859i4f5j30l40qego7.jpg',
            userId: 1123,
            domain: '/lovbe0210',
            level: 0,
            articleCount: 201,
            likedCount: 203,
            fansCount: 23
          },
          {
            username: '徐年',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hog6fy2jvxj316o1kwk96.jpg',
            userId: 1124,
            domain: '/lovbe0210',
            level: 5,
            articleCount: 201,
            likedCount: 203,
            fansCount: 23
          },
          {
            username: '程序员清风',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1hog6g0y71xj311y1kw7eb.jpg',
            userId: 1152,
            domain: '/lovbe0210',
            level: 6,
            articleCount: 201,
            likedCount: 203,
            fansCount: 23
          },
          {
            username: '小白858',
            avatar: 'https://p9-passport.byteacctimg.com/img/user-avatar/1231993a9352e0b6c0dd8102c8be5cd1~100x100.awebp',
            userId: 1126,
            domain: '/lovbe0210',
            level: 0,
            articleCount: 201,
            likedCount: 203,
            fansCount: 23
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
  .layout-module_feature-note {
    width: 95%;
  }

  .hot-header {
    p {
      font-size: 16px;
      font-weight: 600;
      color: #262626;
      display: flex;
      align-items: center;

      .iconfont {
        margin-left: 5px;
        color: #9e9d9d;
        font-size: 18px;
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
        background-color: #FAFAFA;
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
          color: #585A5A;
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
            color: #262626;
            margin-bottom: 8px;

            .iconfont {
              margin-left: 5px;
              font-size: 20px;
            }

            &:hover {
              color: #585A5A;
            }
          }

          .author-count {
            color: #8A8F8D;
            display: flex;
            align-items: center;
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
