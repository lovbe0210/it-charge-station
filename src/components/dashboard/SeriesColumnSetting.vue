<template>
  <div class="layout-module_RamblyJot-container adjust">
    <div class="rambly-header" @click="$router.go(-1)">
      <span class="iconfont return"></span>
      <span>返回</span>
    </div>
    <div class="rambly-info">
      更多设置
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SeriesColumnSetting',
    data() {
      return {

      }
    },
    methods: {
    },
    components: {
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">

</style>
