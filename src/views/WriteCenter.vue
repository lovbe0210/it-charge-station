<template>
  <div class="editor-wrapp">
    <b-row class="editor-header">
      <span>无标题文章</span>
    </b-row>
    <b-row>
      <editor></editor>
    </b-row>
  </div>
</template>

<script>
  import Editor from '@/components/common/Editor'

  export default {
    name: 'Follow',
    data () {
      return {}
    },
    methods: {},
    components: {
      Editor
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/common-var.less';
  @import '../components/css/editor.less';
</style>
