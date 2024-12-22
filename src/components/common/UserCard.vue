<template>
  <div class="user-card">
    <a-popover placement="topLeft"
               trigger="hover"
               :getPopupContainer="() => popoverContainer"
               overlayClassName="user-info-card-box">
      <template slot="content">
        <div class="user-card-body un-select">
          <div class="user-card-avatar">
            <b-avatar :src="fileUrl(userInfo.avatarUrl)"
                      variant="light"
                      :to="'/' + userInfo.domain"
                      size="2.8rem">
              <span v-if="!userInfo.avatarUrl">{{ userInfo.username }}</span>
            </b-avatar>
          </div>
          <div class="user-card-userInfos">
            <b-link class="username" :to="'/' + userInfo.domain">
              <span class="name" :title="userInfo.username">{{ userInfo.username }}</span>
              <span :class="['iconfont',  'icon-level' + userInfo.level]"></span>
            </b-link>
            <div class="signature">You will never walk alone.</div>
            <div class="info-list" style="margin-top: 10px;">
              <div class="info-item">
                <span class="iconfont location"/>
                <span class="info-detail">永胜上沙的街角</span>
              </div>
              <div class="info-item">
                <span class="iconfont industry"/>
                <span class="info-detail">互联网·教育·足球·哲学</span>
              </div>
            </div>
          </div>
        </div>
        <div class="user-card-footer un-select">
            <div class="follow-fans">
              <div class="footer-item">
                粉丝<span class="number">55</span>
              </div>
              <div class="footer-item">
                关注<span class="number">6</span>
              </div>
            </div>
            <div class="actions">
              <Button>
                <span>关注</span>
              </Button>
              <Button>
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
export default {
  name: "UserCard",
  data() {
    return {}
  },
  props: ['popoverContainer', 'userInfo'],
  mounted() {
    // this.cardContainer = this.$refs.cardContainer;
    // console.log(this.popoverContainer)
  },
  methods: {
    fileUrl(path) {
      return this.fileService + path;
    },
    getPopupContainer() {
      return document.getElementById("popoverContainer")
    }
  }
}
</script>

<style scoped lang="less">
  .user-card {
    display: flex;
  }
</style>
