<template>
  <div class="layout-module_feature-note">
    <div>
      <p>精选笔记</p>
    </div>
    <div class="hot-list">
      <a href="/post/7353484906532995135" class="article-item-link" target="_blank" v-for="(item,index) in noteList" :key="item.noteId">
        <div class="article-item-wrap">
          <div class="article-item-left">
            <span :class="['iconfont', 'rank-' + (index+1), 'article-number']" v-if="index <= 2"></span>
            <span class="article-number" v-else>{{index}}</span>
            <div class="article-detail">
              <div title="下一代 CSS 框架：Mojo CSS" class="article-title">
                {{item.noteTitle}}
              </div>
              <div class="article-author">
                <a href="/user/3468339576581548" class="article-author-name" target="_blank">
                  <b-avatar
                    :src="item.userInfo.avatar"
                    size="1.5rem"
                    class="avatar"
                    to="/lovbe0210">
                    <span v-if="!item.userInfo.avatar">{{item.userInfo.username}}</span>
                  </b-avatar>
                  <span class="article-author-name-text">{{item.userInfo.username}}</span>
                </a>
                <div class="author-text">
                  8.3k 浏览
                </div>
                <div class="author-text">
                  303 赞
                </div>
                <div class="author-text">
                  67 收藏
                </div>
                <div class="author-text">
                  82 评论
                </div>
              </div>
            </div>
          </div>
          <div class="article-right article-small-right">
            <Button>
              <span>收藏</span>
            </Button>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FeaturedNotes",
    data() {
      return {
        noteList: [
          {
            noteId: 123,
            noteTitle: '我早就看现在的工作流不爽了！- 前端使用 Jenkins',
            userInfo: {
              username: 'bald3r',
              avatar: 'https://p6-passport.byteacctimg.com/img/user-avatar/8f2b52c27958ebc5e420af7142f618f7~300x300.image',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203,
            commentCount: 23
          },
          {
            noteId: 1231,
            noteTitle: '你不知道的Vue最新功能：Vue Macros',
            userInfo: {
              username: '水煮鱼写前端',
              avatar: 'https://p9-passport.byteacctimg.com/img/user-avatar/257fc5357a5336eaf304609e37a89d6d~100x100.awebp',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203,
            commentCount: 23
          },
          {
            noteId: 1232,
            noteTitle: '面试官：如何一次性渲染十万条数据',
            userInfo: {
              username: 'Dolphin_海豚',
              avatar: 'https://p3-passport.byteacctimg.com/img/user-avatar/eaf9fde0679a72cb3d6b0b4d3c6bab73~100x100.awebp',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203,
            commentCount: 23
          },
          {
            noteId: 1233,
            noteTitle: 'Flutter 即将放弃 Html renderer ，你是否支持这个提议？',
            userInfo: {
              username: '恋猫de小郭',
              avatar: 'https://p3-passport.byteacctimg.com/img/user-avatar/527994262adc861f9291cad601e7ef8b~100x100.awebp',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203,
            commentCount: 23
          },
          {
            noteId: 1234,
            noteTitle: '秒杀 ：这些问题帮你弄清楚分布式锁应该如何设计',
            userInfo: {
              username: '志字辈小蚂蚁',
              avatar: 'https://p9-passport.byteacctimg.com/img/user-avatar/98fce255804de3671e095d2ecdca0b13~100x100.awebp',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203,
            commentCount: 23
          },
          {
            noteId: 1235,
            noteTitle: '陌生Java项目历险记 2 ——搜索与回溯',
            userInfo: {
              username: ' 摸鱼总工',
              avatar: 'https://p3-passport.byteacctimg.com/img/mosaic-legacy/3791/5035712059~100x100.awebp',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203,
            commentCount: 23
          },
          {
            noteId: 1236,
            noteTitle: 'Spring Cloud Gateway实战',
            userInfo: {
              username: '徐年',
              avatar: 'https://p9-passport.byteacctimg.com/img/user-avatar/e530c2a3d9f08627c446cba489a710d9~100x100.awebp',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203,
            commentCount: 23
          },
          {
            noteId: 1237,
            noteTitle: '写出好的Join语句，前提你得懂这些！',
            userInfo: {
              username: '程序员清风',
              avatar: 'https://p3-passport.byteacctimg.com/img/user-avatar/cc924d630fa27d7fe10ed8c6053763ea~100x100.awebp',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203,
            commentCount: 23
          },
          {
            noteId: 1238,
            noteTitle: '经历定时任务事故，我学到了什么？一个案例的全面回顾',
            userInfo: {
              username: '小白858',
              avatar: 'https://p9-passport.byteacctimg.com/img/user-avatar/1231993a9352e0b6c0dd8102c8be5cd1~100x100.awebp',
              userId: 112,
              domain: '/lovbe0210'
            },
            viewCount: 1000,
            collectCount: 201,
            likeCount: 203,
            commentCount: 23
          }
        ]
      }
    }
  }
</script>

<style scoped type="less">
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
      padding: 1.33rem 1rem;
      border-radius: 4px;
      cursor: pointer;

      .article-item-left {
        display: flex;
        flex-direction: row;
        min-width: 300px;

        .article-number {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 2rem;
          color: #585A5A;
          margin-right: 1.2rem;
          min-width: 2rem;
          text-align: center;
          flex-shrink: 0;
        }

        .article-detail {
          display: flex;
          flex-direction: column;
          max-width: 400px;
          min-width: 300px;

          .article-title {
            color: #262626;
            line-height: 28px;
            letter-spacing: 0.008em;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }

          .article-author {
            font-size: 1.08rem;
            line-height: 1.83rem;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;

            .article-author-name {
              cursor: pointer;
              color: #8A8F8D;

              .avatar {
                margin-right: 10px;
              }

              .article-author-name-text {
                vertical-align: middle;
              }
            }
          }
        }
      }

      .article-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        width: 21rem;
        flex-shrink: 0;
      }
    }
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: #909090;
  }
</style>
