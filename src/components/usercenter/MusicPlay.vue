<template>
  <div class="layout-module_music-play">
    <div class="music-play-content">
      <h1 class="setting-title">无乐不欢</h1>
      <h2 class="setting-subtitle">敬请期待，但也别抱太大期望，写作和阅读才是主角</h2>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'MusicPlay',
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
  .layout-module_music-play {
    .setting-title {
      font-size: 20px;
      line-height: 24px;
      font-weight: 500;
      color: var(--font-color);
      position: sticky;
      padding: 48px 0 28px;
      top: 0;
      left: 0;
      margin: 0px;
      text-align: inherit;
    }

    .setting-subtitle {
      line-height: 24px;
      font-weight: 500;
      color: var(--font-color);
      margin: 0px;
      text-align: inherit;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
</style>
