<template>
  <b-container fluid>
    <div class="amEditorVue2">
      <am-loading :loading="loading">
        <am-toolbar v-if="engine" :engine="engine" :items="items" />
        <div :class="['editor-wrapper', { 'editor-mobile': mobile }]">
          <div class="editor-container">
            <div class="editor-content">
              <div class="title-editor">
                <textarea class="title" :value="doc.title" placeholder="我是一个没有标题的文章"
                          :autofocus="doc.title === null || doc.title.length === 0" maxlength="130"
                          tabindex="1" rows="1">
                </textarea>
              </div>
              <div ref="container">

              </div>
            </div>
          </div>
        </div>
      </am-loading>
      <map-modal
        v-if="engine"
        :engine="engine"
        :visible="mapModalVisible"
        :onVisibleChange="handleMapModalVisibleChange"
      />
    </div>
  </b-container>
</template>

<script>
  import Engine from "@aomao/engine";
  import AmToolbar, { ToolbarPlugin, ToolbarComponent } from "am-editor-toolbar-vue2";
  import Codeblock, { CodeBlockComponent } from 'am-editor-codeblock-vue2'
  import Bold from '@aomao/plugin-bold'
  import Heading from '@aomao/plugin-heading'

  export default {
    name: 'Editor',
    data() {
      return {
        doc: {
          title: 'asd'
        },
        engine: null,
        items: [['collapse'], ['heading', 'bold']]
      }
    },
    methods: {},
    components: {
      // AmLoading,
      AmToolbar
      // MapModal
    },
    mounted() {
      const engine = new Engine(
        this.$refs.container,
        {
          cards: [
            ToolbarComponent,
            CodeBlockComponent
          ],
          plugins: [
            Heading,
            ToolbarPlugin,
            Codeblock,
            Bold
          ]
        }
      );
      console.log(engine)
      this.engine = engine;
    }
  }
</script>

<style scoped lang="less">
  .editor-toolbar {
    border-top: none;
  }

  .editor-container {
    position: relative;

    // 左边的文档内容
    .editor-content {
      max-width: 830px;
      padding: 0 40px;
      margin: 0 auto;
      .title-editor {
        margin-top: 33px;
        position: relative;
        padding-bottom: 4px;
        .title {
          color: #262626;
          font-weight: 700;
          font-size: 36px;
          height: 300px;
          max-height: 350px;
          min-height: 32px;
          line-height: 1.389;
          max-width: 100%;
          width: 100%;
          /*height: auto;*/
          resize: none;
          border: none;
          outline: none;
          -webkit-box-shadow: none;
          box-shadow: none;
          padding: 0;
          vertical-align: bottom;
          transition: all .3s,height 0s;
          margin: 0;
          font-variant: tabular-nums;
          list-style: none;
          font-feature-settings: "tnum";
          position: relative;
          display: inline-block;
          min-width: 0;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
        }
        // 设置placeholder字体颜色
        textarea::-webkit-input-placeholder { /* WebKit browsers */
          color: #BFBFBF;
        }
        textarea::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #BFBFBF;
        }
        textarea::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #BFBFBF;
        }
        textarea::-ms-input-placeholder { /* Internet Explorer 10+ */
          color: #BFBFBF;
        }
      }
    }

    // 右边的大纲
  }

</style>
