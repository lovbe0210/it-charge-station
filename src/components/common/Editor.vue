<template>
  <b-container fluid>
    <div class="amEditorVue2">
      <am-loading :loading="loading">
        <am-toolbar v-if="engine" :engine="engine" :items="items"/>
        <div class="editor-container">
          <div class="editor-content">
            <div class="title-editor">
                <textarea class="title" v-model="doc.title" placeholder="我是一个没有标题的文章"
                          :autofocus="doc.title === null || doc.title.length === 0" maxlength="130"
                          tabindex="1" rows="1" ref="titleTextarea" @blur="updateTitle">
                </textarea>
            </div>
            <div class="doc-editor" ref="container">

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
  import Engine from '@aomao/engine'
  import AmToolbar, { ToolbarPlugin, ToolbarComponent } from 'am-editor-toolbar-vue2'
  import Codeblock, { CodeBlockComponent } from 'am-editor-codeblock-vue2'
  import Bold from '@aomao/plugin-bold'
  import Heading from '@aomao/plugin-heading'

  export default {
    name: 'Editor',
    data() {
      return {
        doc: {
          title: this.title
        },
        lines: 1,
        engine: null,
        items: [['collapse'], ['heading', 'bold']]
      }
    },
    props: ["title"],
    methods: {
      changeHeight() {
        let _this = this
        this.$nextTick(() => {
          let textArea = _this.$refs.titleTextarea
          // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
          let scrollHeight = textArea.scrollHeight
          // 屏幕上显示的高度
          let height = textArea.offsetHeight
          if (height <= scrollHeight) {
            textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
            textArea.style.height = textArea.scrollHeight + 'px' // 拿到最新的高度改变textarea的高度
          }
        })
      },
      updateTitle() {
        // TODO 先更新数据库然后在进行页面渲染
        this.$emit('updateTitle', this.doc.title)
      }
    },
    components: {
      // AmLoading,
      AmToolbar
      // MapModal
    },
    watch: {
      'doc.title'(newValue, oldValue) {
        if (newValue === oldValue) {
          return
        }
        // 改变标题框的高度
        this.changeHeight();
      }
    },
    mounted() {
      const engine = new Engine(
        this.$refs.container,
        {
          cards: [
            ToolbarComponent, // 左边工具栏卡片
            CodeBlockComponent // 右边工具栏卡片
          ],
          plugins: [
            ToolbarPlugin, // 工具栏插件槽启用
            Codeblock, // 代码块
            Heading, // 正文
            Bold // 加粗
          ]
        }
      );
      console.log(engine);
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
          max-height: 350px;
          min-height: 32px;
          // 此处表示font-size*1.389得到行高
          line-height: 1.389;
          max-width: 100%;
          width: 100%;
          resize: none;
          border: none;
          outline: none;
          -webkit-box-shadow: none;
          box-shadow: none;
          padding: 0;
          margin: 0;
          vertical-align: bottom;
          transition: all .3s, height 0s;
          font-variant: tabular-nums;
          list-style: none;
          font-feature-settings: "tnum";
          position: relative;
          display: inline-block;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          overflow-x: hidden;
          overflow-y: hidden;
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

      .doc-editor {
        margin-top: 20px;
      }
    }

    // 右边的大纲
  }

</style>
