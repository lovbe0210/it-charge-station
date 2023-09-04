<template>
  <div class="layout-module_NoteHome">
    <div class="note-home-header">
      <h2 class="title">创作笔记</h2>
      <div class="operation">
        <Input class="search" search placeholder="搜索标题关键词"/>
        <div class="action">
          <span class="iconfont verify-complete"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoteHome',
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
  @import '../css/dashboard/noteHome.less';
</style>
