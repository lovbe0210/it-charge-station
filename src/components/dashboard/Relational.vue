<template>
  <div class="layout-module_stats" ref="tooltipContainer">
    <div id="main-right-content" class="layout-module_MainContent">
      <div class="layout-module_MainContentChildren">
        <div class="main-container my-collection">
          {{relational}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Collection',
    data() {
      return {
      }
    },
    props: ['relational'],
    methods: {
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
</style>
