<template>
  <div class="layout-module_recentView">
    <div class="recent-view-header">
      <h2 class="title">浏览记录</h2>
      <div class="operation">
        <Input class="search" search placeholder="搜索标题关键词"/>
        <span class="action">
        <span class="iconfont icon-editor-del"></span>
        <span>清空记录</span>
      </span>
      </div>
    </div>
    <div class="recent-view-list">
      <div class="list-wrapp" v-for="index in 3" :key="index">
        <div class="time-line">
          <span class="iconfont icon-history"></span>
          2023.08.31
        </div>
        <div class="view-list-item" v-for="index in 5" :key="index">
          <div class="item-header">
            <span class="item-type">文章</span>
            <span class="item-title">无标题</span>
          </div>
          <div class="item-content">
            <p>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述...</p>
            <p>
            <span class="item-author">
              布衣草人
            </span>
              <span> | </span>
              <span class="item-count">
              854阅读 · 4赞 · 0评论
            </span>
            </p>
          </div>
          <div class="item-action">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecentView',
    data() {
      return {
      }
    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import '../css/dashboard/recentView.less';
</style>
