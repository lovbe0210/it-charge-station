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
      <div class="article-item-link"  v-for="(item,index) in authorList" :key="item.uid">
        <div class="author-item-wrap">
          <a class="author-item-left" :href="'/' + item.domain" target="_blank">
            <span :class="['iconfont', 'rank-' + (index+1), 'sort-number']" v-if="index <= 2"></span>
            <span class="sort-number" v-else>{{index+1}}</span>
            <b-avatar
              :src="fileUrl(item.avatarUrl)"
              size="2.5rem"
              target="_blank"
              class="author-avatar"
              :to="'/' + item.userInfo.domain">
              <span v-if="!item.avatarUrl">{{item.username}}</span>
            </b-avatar>
            <div class="author-info">
              <user-card :userInfo="item" :popoverContainer="popoverContainer">
                <slot>
                  <b-link :to="'/' + item.domain" class="author-name">
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
            </div>
          </a>
          <div class="author-right" v-if="1 === 0">
            <Button class="action-btn ghost-btn"
                    v-if="!loginStatus || loginUser?.uid !== item.uid"
                    @click="followAction(item)">
              <span>{{ item.isFollow ? '已关注' : '关注' }}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatNumber } from '@/utils'
  import UserCard from "@/components/common/UserCard.vue";
  import contentPicksApi from "@/api/ContentPicksApi";
  import socialApi from "@/api/SocialApi";

  export default {
    name: "QualityAuthor",
    data() {
      return {
        popoverContainer: null,
        authorList: []
      }
    },
    computed: {
      loginUser() {
        return this.$store.state.userInfo;
      },
      loginStatus() {
        let userInfo = this.$store.state.userInfo
        return userInfo !== null && userInfo.token?.length === 32
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
      followAction(author) {
        // 未登录
        if (!this.loginStatus) {
          let loginBtn = document.getElementById("pwdLoginBtn");
          if (loginBtn) {
            loginBtn.click();
          }
        }
        // 登录状态
        let attentionRequest = {
          targetUser: author.uid,
          action: author.isFollow === 1 ? 0 : 1
        }
        socialApi.followAction(attentionRequest).then(data => {
          if (data?.result) {
            author.isFollow = attentionRequest.action;
            this.$Message.success(attentionRequest.action ? '关注成功' : '已取消关注');
          }
        })
      }
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
    },
    created() {
      this.authorList = [];
      contentPicksApi.getRankAuthor({offset: 0, limit: 30}).then(data => {
        if (data?.result) {
          this.authorList = data.data.list;
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
