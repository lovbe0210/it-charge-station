<template>
  <div class="user-card">
    <a-popover placement="topLeft"
               trigger="hover"
               @visibleChange="getFollowStatus"
               :getPopupContainer="() => popoverContainer"
               overlayClassName="user-info-card-box">
      <template slot="content">
        <div class="user-card-body un-select">
          <div class="user-card-avatar">
            <b-avatar :src="fileUrl(userInfo?.avatarUrl)"
                      variant="light"
                      :to="'/' + userInfo?.domain"
                      size="2.8rem">
              <span v-if="!userInfo?.avatarUrl">{{ userInfo?.username }}</span>
            </b-avatar>
          </div>
          <div class="user-card-userInfos">
            <b-link class="username" :to="'/' + userInfo?.domain" target="_blank">
              <span class="name" :title="userInfo?.username">{{ userInfo?.username }}</span>
              <span :class="['iconfont',  'icon-level' + userInfo?.level]"></span>
            </b-link>
            <div class="user-signature" :title="userInfo?.introduction">
              <span class="signature-text">
                {{ userInfo?.introduction }}
              </span>
            </div>
            <div class="info-list" style="margin-top: 10px;">
              <div class="info-item" v-if="userInfo?.location" :title="userInfo?.location">
                <span class="iconfont location"/>
                <span class="info-detail">{{ userInfo?.location }}</span>
              </div>
              <div class="info-item" v-if="userInfo?.industry" :title="userInfo?.industry">
                <span class="iconfont industry"/>
                <span class="info-detail">{{ userInfo?.industry }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="user-card-footer un-select">
            <div class="follow-fans">
              <div class="footer-item">
                粉丝<span class="number">{{ fansCount }}</span>
              </div>
              <div class="footer-item">
                关注<span class="number">{{ followCount }}</span>
              </div>
            </div>
            <div class="actions" v-if="loginUser.uid !== userInfo?.uid">
              <Button @click="followAction">
                <span>{{ followStatus }}</span>
              </Button>
              <Button @click="sendMessage">
                <span>私信</span>
              </Button>
            </div>
          </div>
      </template>
      <!-- 用户卡片信息载体 -->
      <slot>userCard</slot>
    </a-popover>
  </div>
</template>

<script>
import socialApi from "@/api/SocialApi";
import msgNoticeApi from "@/api/MsgNoticeApi";

export default {
  name: "UserCard",
  data() {
    return {
      isFollow: 0,
      followCount: 0,
      fansCount: 0
    }
  },
  props: ['popoverContainer', 'userInfo'],
  computed: {
    loginUser() {
      return this.$store.state.userInfo;
    },
    loginStatus() {
      let userInfo = this.$store.state.userInfo
      return userInfo !== null && userInfo.token?.length === 32
    },
    followStatus() {
      return this.isFollow === 1 ? '已关注' : '关注';
    }
  },
  methods: {
    fileUrl(path) {
      return this.fileService + path;
    },
    getFollowStatus(visible) {
      if (!visible) {
        return;
      }
      // 获取粉丝关注数
      socialApi.getRelationshipCount(this.userInfo.uid).then(data => {
        if (data?.result) {
          this.followCount = data.data.follow;
          this.fansCount = data.data.fans;
        }
      })
      // 如果是登录用户，获取关注状态
      if (this.loginStatus && this.userInfo.uid !== this.loginUser.uid) {
        socialApi.getFollowAction(this.userInfo.uid).then(data => {
          if (data?.result) {
            if (data.data?.userIdMaster === this.loginUser.uid) {
              this.isFollow = data.data.masterWatchSlave;
            } else if (data.data?.userIdSlave === this.loginUser.uid) {
              this.isFollow = data.data.slaveWatchMaster;
            }
          }
        })
      }
    },
    followAction() {
      if (!this.loginStatus) {
        let loginBtn = document.getElementById("pwdLoginBtn");
        if (loginBtn) {
          loginBtn.click();
        }
        return;
      }
      // 根据当前状态判断要执行的操作
      let attentionRequest = {
        targetUser: this.userInfo?.uid,
        action: this.isFollow === 1 ? 0 : 1
      }
      socialApi.followAction(attentionRequest).then(data => {
        if (data?.result) {
          this.$Message.success(attentionRequest.action ? '关注成功' : '已取消关注');
          this.isFollow = attentionRequest.action;
          if (attentionRequest.action === 1) {
            this.fansCount++;
          } else {
            this.fansCount = (this.fansCount - 1) < 0 ? 0 : (this.fansCount - 1);
          }
        }
      })
    },
    sendMessage() {
      if (!this.loginStatus) {
        let loginBtn = document.getElementById("pwdLoginBtn");
        if (loginBtn) {
          loginBtn.click();
        }
        return;
      }
      msgNoticeApi.startMessageSession({targetUserId: this.userInfo?.uid}).then(data => {
        if (data?.result) {
          // 打开消息界面并激活与当前用户的会话
          this.$store.commit("updateChatSession", data.data)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .user-card {
    display: flex;
  }
</style>
