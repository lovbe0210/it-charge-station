<template>
  <div class="editor-wrapp">
    <b-container fluid class="editor">

      <editor></editor>
    </b-container>
  </div>
</template>

<script>
  import Editor from '@/components/common/Editor'
  export default {
    name: 'Follow',
    data() {
      return {
      }
    },
    methods: {

    },
    components: {
      Editor
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/common-var.less';
  @import '../components/css/editor.less';
</style>
