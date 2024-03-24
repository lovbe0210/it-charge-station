<template>
  <div class="user-card">
    <a-popover placement="topLeft"
               trigger="hover"
               :getPopupContainer="()=>popoverContainer"
               overlayClassName="user-info-card-box">
      <template slot="content">
        <div class="user-info-card">
          <div class="user-avatar">
            <b-avatar :src="userInfo.avatar" variant="light" :to="userInfo.homeLink" size="2.5rem">
              <span v-if="!userInfo.avatar">{{ userInfo.username }}</span>
            </b-avatar>
          </div>
          <div class="user-content">
            <div class="user-info">
              <b-link class="username" target="_blank">
                <span class="name" style="max-width: 10em;">{{ userInfo.username }}</span>
                <span :class="['iconfont',  'icon-level' + userInfo.level]"></span>
              </b-link>
            </div>
            <div class="social-info">
              <b-link class="attention">
                <span>{{userInfo.follows}}</span>
                <span>关注</span>
              </b-link>
              <b-link class="follower">
                <span>{{userInfo.fans}}</span>
                <span>粉丝</span>
              </b-link>
              <b-link class="likes">
                <span>{{userInfo.likes}}</span>
                <span>获赞</span>
              </b-link>
            </div>
            <div class="card-btn">
              <Button type="primary">
                <span class="">关注</span></Button>
              <Button>
                <span class="">发消息</span></Button>
            </div>
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
      this.cardContainer = this.$refs.cardContainer;
    }
  }
</script>

<style scoped lang="less">
</style>
