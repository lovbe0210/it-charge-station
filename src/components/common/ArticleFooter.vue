<template>
  <div class="doc-footer un-select" ref="tooltipContainer">
    <!-- 点赞信息 -->
    <div class="reward-module_like">
      <div class="like-btn"
           v-if="loginStatus"
           @click="$emit('like')">
        <span :class="['like-btn-icon', ifLike ? 'liked' : 'will-like']"></span>
      </div>
      <div class="like-btn"
           v-else
           @click="login">
        <span class="like-btn-icon will-like"/>
      </div>
      <p class="like-count" v-if="likeCount > 0">{{likeCount}} 人点赞</p>
      <ul class="like-user-list">
        <li v-for="user in showUserList" :key="user.userId">
          <user-card :userInfo="user"
                     :popoverContainer="tooltipContainer"
                     class="user-info-card-box">
            <slot>
              <b-avatar :src="fileUrl(user.avatarUrl)" variant="light" href="javascript:void(0)" size="2.2rem">
                <span v-if="!user.avatarUrl">{{ user.username }}</span>
              </b-avatar>
            </slot>
          </user-card>
        </li>
        <!-- 超出13时只展示13个，然后显示更多 -->
        <li v-if="likeUserList?.length > 13" class="show-more-like-list" @click="moreLikeUser = true">
          <a-tooltip placement="top" :getPopupContainer="()=>this.$refs.tooltipContainer">
            <template slot="title">
              查看所有点赞用户
            </template>
            <b-avatar variant="light" href="javascript:void(0)" size="2.2rem">
              <svg width="1.5em" height="1.5em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                   class="larkui-icon larkui-icon-new-ellipsis">
                <path
                  d="M227.008 128c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20ZM148 128c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20Zm-78.992 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20Z"
                  fill="currentColor" fill-rule="nonzero"></path>
              </svg>
            </b-avatar>
          </a-tooltip>
          <Modal v-model="moreLikeUser"
                 :closable="false"
                 :footer-hide="true"
                 class-name="more-like-list">
            <div class="like-btn">
              <span class="like-btn-icon will-like"></span>
            </div>
            <p class="like-count" v-if="likeCount > 0">{{likeCount}} 人点赞</p>
            <ul class="like-user-list">
              <li v-for="user in likeUserList" :key="user.userId">
                <user-card :userInfo="user"
                           :popoverContainer="tooltipContainer"
                           class="user-info-card-box">
                  <slot>
                    <b-avatar :src="user.avatar" variant="light" href="javascript:void(0)" size="2.2rem">
                      <span v-if="!user.avatar">{{ user.username }}</span>
                    </b-avatar>
                  </slot>
                </user-card>
              </li>
            </ul>
          </Modal>
        </li>
      </ul>
    </div>
    <!-- 文章信息 -->
    <div class="article-module_info">
      <div class="info_meta">
        <div class="reader-meta-wrapper">
          <div class="meta-left">
            <div class="meta-item">
              <span class="iconfont author"></span>
              <span class="author-name item-content" style="cursor: pointer;">
                <a :href="'/' + authorInfo.domain" target="_blank" t>{{authorInfo.username}}</a>
              </span>
            </div>
            <a-tooltip placement="top" :getPopupContainer="()=>this.$refs.tooltipContainer">
              <template slot="title">
                更新于 {{ formatTime(new Date(updateTime), 'yyyy-MM-dd HH:mm:ss') }}
              </template>
              <div class="meta-item">
                <span class="iconfont clock"></span>
                <span class="item-text item-content">
                  {{ formatTime2H(updateTime) }}
                </span>
              </div>
            </a-tooltip>
            <a-tooltip placement="top" :getPopupContainer="()=>this.$refs.tooltipContainer">
              <template slot="title">
                文档浏览次数：{{ viewCount }}
              </template>
              <div class="meta-item">
                <span class="iconfont read"></span>
                <span class="item-content">{{ formatNumber(viewCount) }}</span>
              </div>
            </a-tooltip>
            <div class="meta-item" v-show="userInfo.recentLoginAddress">
              <span class="item-content">IP 属地：{{ userInfo.recentLoginAddress}}</span>
            </div>
            <div class="meta-item" style="margin-left: 12px;">
              <span class="item-content">
                <a href="/ximentata">举报</a>
              </span>
            </div>
          </div>
        </div>
        <div class="social-share" style="display: none;">
                <span>
                  分享到：
                  <a-tooltip placement="top" :getPopupContainer="()=>this.$refs.tooltipContainer">
                    <template slot="title">
                      分享到微博
                    </template>
                    <span class="social-share-item">
                    <a target="_blank"
                       href="https://service.weibo.com/share/share.php?url=https%3A%2F%2Fwww.yuque.com%2Fximentata%2Fchlomu%2Flrdbp3xlg7rcmmbd&amp;pic=https%3A%2F%2Fcdn.nlark.com%2Fyuque%2F0%2F2024%2Fpng%2F34793967%2F1708855153148-2f1179f2-7ef5-4429-8a21-8936c8123f77.png&amp;title=DATA%20%7C%20Vol.002%20%7C%20%E5%A6%82%E4%BD%95%E5%BF%AB%E9%80%9F%E6%91%B8%E6%B8%85%E4%B8%80%E4%B8%AA%E8%A1%8C%E4%B8%9A%EF%BC%9F%20%7C%20%E5%BC%95%E8%A8%80%E5%A6%82%E4%BD%95%E5%BF%AB%E9%80%9F%E6%91%B8%E6%B8%85%E4%B8%80%E4%B8%AA%E8%A1%8C%E4%B8%9A%EF%BC%9F%E9%A6%96%E5%85%88%EF%BC%8C%E8%A6%81%E6%90%9E%E6%B8%85%E6%A5%9A%E8%A1%8C%E4%B8%9A%E5%88%86%E6%9E%90%E7%9A%84%E7%9B%AE%E7%9A%84%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%8C%E4%B9%9F%E5%B0%B1%E6%98%AF%E4%B8%BA%E4%BA%86%E5%BC%95%E5%AF%BC%E5%87%BA%E4%B8%80%E4%BB%BD%E4%BB%80%E4%B9%88%E6%A0%B7%E7%9A%84%E7%AD%94%E6%A1%88%E3%80%82%E4%B8%80%E8%88%AC%E6%9D%A5%E8%AF%B4%EF%BC%8C%E8%A1%8C%E4%B8%9A%E5%88%86%E6%9E%90%E5%9F%BA%E6%9C%AC%E5%AD%98%E5%9C%A8%E4%B8%A4%E7%A7%8D%E7%9B%AE%E7%9A%84%EF%BC%9A%E4%B8%80%E6%98%AF%E4%BD%9C%E4%B8%BA%E5%B1%80%E5%A4%96%E4%BA%BA%EF%BC%8C%E5%88%86%E6%9E%90%E4%BA%A7%E4%B8%9A%E6%95%B4%E4%BD%93%E6%83%85%E5%86%B5%EF%BC%8C%E5%AF%BB%E6%89%BE%E5%90%88%E9%80%82%E7%9A%84%E8%B5%9B%E9%81%93%E8%BF%9B%E8%A1%8C%E6%8A%95%E8%B5%84%E6%88%96%E8%BA%AC%E8%BA%AB%E5%85%A5%E5%B1%80%EF%BC%9B%E4%BA%8C%E6%98%AF%E4%BD%9C%E4%B8%BA%E5%B1%80%E5%86%85%E4%BA%BA%EF%BC%8C%E5%88%86%E6%9E%90%E6%89%80%E5%A4%84%E8%B5%9B%E9%81%93%E7%9A%84%E6%9C%BA%E4%BC%9A%E4%B8%8E%E9%A3%8E%E9%99%A9%E7%82%B9%EF%BC%8C%E8%B0%83%E6%95%B4%E4%BC%81%E4%B8%9A%E4%B8%8B%E4%B8%80%E6%AD%A5%E7%BB%8F%E8%90%A5%E7%AD%96%E7%95%A5%E3%80%82%E4%B8%A4%E8%80%85%E8%A7%86%E8%A7%92%E4%B8%8D%E5%90%8C%EF%BC%8C%E5%88%86%E6%9E%90%E5%86%85%E5%AE%B9%E8%87%AA%E7%84%B6...">
                      <span class="iconfont xlweibo"></span>
                    </a>
                  </span>
                  </a-tooltip>

                  <a-popover placement="top" :getPopupContainer="()=>this.$refs.tooltipContainer" overlayClassName="wechat-sweep">
                    <template slot="content">
                      <div>
                          <div class="qrcode-block">
                            <span class="img">
                              <img
                                src="data:image/png;base64,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">
                            </span>
                            <div class="text" style="display: flex; justify-content: center; padding-bottom: 5px;">
                              <span>微信扫一扫分享</span>
                            </div>
                          </div>
                        </div>
                    </template>
                    <span class="social-share-item">
                      <span class="iconfont weixin"></span>
                  </span>
                  </a-popover>
                </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserCard from "@/components/common/UserCard.vue";
  import { formatTime, formatTime2H, formatNumber } from "@/utils"

  export default {
    name: "ArticleFooter",
    components: { UserCard },
    data() {
      return {
        moreLikeUser: false,
        tooltipContainer: null
      }
    },
    computed: {
      showUserList() {
        if (this.likeUserList?.length > 13) {
          return this.likeUserList.slice(0, 13);
        }
        return this.likeUserList;
      },
      userInfo() {
        return this.$store.state.userInfo;
      },
      loginStatus() {
        let userInfo = this.$store.state.userInfo
        return userInfo !== null && userInfo.token?.length === 32
      }
    },
    props: ['ifLike', "likeUserList", "likeCount", "updateTime", "viewCount", "authorInfo"],
    methods: {
      fileUrl(path) {
        return this.fileService + path;
      },
      login() {
        let loginBtn = document.getElementById("pwdLoginBtn");
        if (loginBtn) {
          loginBtn.click();
        }
      },
      formatTime2H,
      formatTime,
      formatNumber
    },
    mounted() {
      this.tooltipContainer = this.$refs.tooltipContainer;
    }
  }
</script>

<style scoped lang="less">
  .reward-module_like {
    min-height: 156px;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .like-btn {
      position: relative;
      margin: 10px auto;
      width: 40px;
      height: 50px;
      text-align: center;
      cursor: pointer;
      overflow: hidden;

      .like-btn-icon {
        position: absolute;
        left: -18px;
        bottom: -2px;
        z-index: 1;
        display: inline-block;
        margin: -1px 0;
        width: 80px;
        height: 80px;
        background: url("https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/like_action.png") no-repeat 0 0;
        background-size: auto 80px;
      }

      .will-like {
        overflow: hidden;
        animation-duration: 0s;
      }

      .liked {
        animation-name: liked_shake;
        animation-duration: .9s;
        animation-iteration-count: 1;
        animation-timing-function: steps(27);
        animation-fill-mode: forwards;
      }

    }

    .like-btn:hover {

      .will-like {
        animation-name: like_shake;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-out;
        transform-origin: 25px 67px;
      }

    }

    .like-count {
      font-size: 14px;
      color: #8A8F8D;
    }

    .like-user-list {
      margin: 22px 0 0 -8px;
      padding: 0;
      list-style: none;
      justify-content: center;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      li {
        margin-left: 8px;
        margin-bottom: 8px;
        list-style: none !important;

        .like-user-popover {
          display: inline-block;
        }

      }
    }
  }

  .article-module_info {

    .info_meta {
      display: flex;
      justify-content: space-between;
      margin-top: 28px;
      margin-bottom: 38px;

      .reader-meta-wrapper {
        display: flex;
        justify-content: space-between;

        font-size: 14px;
        line-height: 24px;

        .meta-left {
          display: flex;

          .meta-item {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
            max-width: 240px;
            color: #8A8F8D;
            display: flex;
            align-items: center;


            .item-content {
              margin-left: 8px;

              a {
                color: #8A8F8D;
              }
            }

            .item-content {
              line-height: 16px;
            }


          }

          .meta-item:nth-child(2), .meta-item:nth-child(3), .meta-item:nth-child(4) {
            margin-left: 18px;
          }

          .meta-item:nth-child(1), .meta-item:nth-child(2), .meta-item:nth-child(3) {
            cursor: pointer;
          }

          .meta-item:last-child::before {
            content: " ";
            display: block;
            width: 1px;
            height: 12px;
            background-color: #D8DAD9;
            margin-right: 2px;
          }
        }

      }

      .social-share {
        ext-align: right;
        font-size: 14px;
        color: #8A8F8D;

        .social-share-item {
          .iconfont {
            color: #8A8F8D;
          }

          .iconfont:hover {
            color: #262626;
          }
        }

        .social-share-item:nth-child(2) {
          margin-left: 15px;
        }
      }
    }
  }

  /deep/ .wechat-sweep {
    .ant-popover-arrow {
      display: none;
    }
  }

  /deep/.more-like-list {
    .ivu-modal-body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .like-btn-icon {
        z-index: 1;
        display: inline-block;
        margin-top: -20px;
        width: 80px;
        height: 80px;
        background: url(https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*eDsBTKcm1IcAAAAAAAAAAAAAARQnAQ) no-repeat 0 0;
        background-size: auto 80px;
      }
    }

    .like-user-list {
      margin: 18px 10px 25px;
      list-style: none;
      justify-content: center;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      max-height: 20vh;
      overflow-y: scroll;

      &::-webkit-scrollbar-thumb {
        background-color: unset;
        border-radius: 4px;
      }

      &::-webkit-scrollbar {
        width: 7px;
      }

      &:hover::-webkit-scrollbar {
        width: 7px;
      }

      &:hover::-webkit-scrollbar-thumb {
        background-color: #8B8B8B;
        border-radius: 4px;
      }

      li {
        margin-left: 8px;
        margin-bottom: 8px;
        list-style: none !important;

        .like-user-popover {
          display: inline-block;
        }

      }
    }
  }

  @keyframes like_shake {
    25% {
      transform: rotate(6deg);
    }
    75% {
      transform: rotate(-6deg);
    }
    100% {
      transform: rotate(0);
    }
  }

  @keyframes liked_shake {
    100% {
      background-position: -2160px 0;
      overflow: hidden;
    }
  }
</style>
