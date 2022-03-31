<template>
  <b-container fluid>
    <div class="amEditorVue2">
      <toolbar v-if="engine" :engine="engine" :items="items" id="toolbar" :mounted="sdaf()"/>
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
  import Toolbar, { ToolbarPlugin, ToolbarComponent } from 'am-editor-toolbar-vue2'
  import Codeblock, { CodeBlockComponent } from 'am-editor-codeblock-vue2'
  import Bold from '@aomao/plugin-bold'
  import Heading from '@aomao/plugin-heading'

  export default {
    name: 'Editor',
    data () {
      return {
        doc: {
          title: this.title
        },
        lines: 1,
        engine: null,
        // 工具栏内容：下拉面板、
        // items: [['collapse'], ['heading', 'bold']]
        items: [
          [
            {
              type: 'collapse',
              groups: [
                {
                  items: [
                    'image-uploader',
                    'codeblock',
                    'table',
                    'file-uploader',
                    'video-uploader',
                    'math',
                    'status',
                    {
                      name: 'map',
                      icon: '<span style="width:23px;height:23px;display: inline-block;border:1px solid #E8E8E8;"><svg style="top: 2px;position: relative;" t="1636128261742" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25559" width="16" height="16"><path d="M524.665263 1001.633684l-285.642105-285.642105c-75.452632-75.452632-118.568421-177.852632-118.568421-285.642105s43.115789-210.189474 118.568421-285.642106c75.452632-75.452632 177.852632-118.568421 285.642105-118.568421s210.189474 43.115789 285.642105 118.568421c156.294737 156.294737 156.294737 414.989474 0 571.284211l-285.642105 285.642105z m0-921.6c-94.315789 0-180.547368 37.726316-247.915789 102.4s-102.4 153.6-102.4 247.91579c0 94.315789 37.726316 180.547368 102.4 247.915789l247.915789 247.91579 247.91579-247.91579c137.431579-137.431579 137.431579-358.4 0-495.831579-67.368421-64.673684-153.6-102.4-247.91579-102.4z" p-id="25560"></path><path d="M524.665263 592.033684c-88.926316 0-161.684211-72.757895-161.68421-161.68421s72.757895-161.684211 161.68421-161.684211 161.684211 72.757895 161.684211 161.684211-72.757895 161.684211-161.684211 161.68421z m0-269.473684c-59.284211 0-107.789474 48.505263-107.789474 107.789474s48.505263 107.789474 107.789474 107.789473 107.789474-48.505263 107.789474-107.789473-48.505263-107.789474-107.789474-107.789474z" p-id="25561"></path></svg><span>',
                      search: '地图,map',
                      title: '地图',
                      autoExecute: false,
                      onClick: () => {
                        this.mapModalVisible = true
                      }
                    },
                    {
                      name: 'audio-uploader',
                      icon: '<span style="width:23px;height:23px;display: inline-block;border:1px solid #E8E8E8;"><svg style="top: 2px;position: relative;" t="1636128560405" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28042" width="16" height="16"><path d="M877.854 269.225l-56.805-56.806-121.726-123.079c-24.345-21.64-41.928-27.050-68.978-27.050h-451.737c-31.108 0-55.453 24.345-55.453 55.453v789.865c0 29.755 24.345 54.1 55.453 54.1h666.787c31.108 0 55.453-24.345 55.453-54.1v-584.284c0-24.345-8.115-35.165-22.993-54.1v0zM830.516 289.513h-156.891v-156.891l156.891 156.891zM856.213 907.609c0 5.409-4.057 10.821-10.821 10.821h-666.787c-6.762 0-12.172-5.409-12.172-10.821v-789.865c0-6.762 5.409-12.172 12.172-12.172 0 0 451.737 0 451.737 0v205.582c0 12.173 9.468 21.64 21.64 21.64h204.229v574.816zM723.668 413.943c-117.668-1.353-246.157 22.993-363.825 59.511-9.468 4.058-10.821 5.409-10.821 14.877v210.991c-12.172-5.409-27.050-6.762-41.927-5.409-45.985 1.353-82.503 29.755-82.503 60.862 0 31.108 36.517 55.453 82.503 52.748 45.985-2.706 82.503-29.755 82.503-60.863v-193.409c109.553-25.698 209.638-43.28 312.429-51.395v150.128c-12.173-5.409-25.698-6.762-40.576-6.762-45.985 2.706-82.503 29.755-82.503 62.215 0 31.108 36.517 55.453 82.503 52.748 44.632-2.706 82.503-29.755 82.503-60.863v-267.797c0-13.525-6.762-16.23-20.287-17.583z" p-id="28043"></path></svg><span>',
                      title: '音频',
                      search: '音频,audio'
                    }
                  ]
                }
              ]
            }
          ],
          ['undo', 'redo', 'paintformat', 'removeformat'],
          ['heading', 'fontfamily', 'fontsize'],
          ['bold', 'italic', 'strikethrough', 'underline', 'moremark'],
          ['fontcolor', 'backcolor'],
          ['alignment'],
          ['unorderedlist', 'orderedlist', 'tasklist', 'indent', 'line-height'],
          ['link', 'quote', 'hr']
        ]
      }
    },
    props: ['title'],
    methods: {
      changeHeight () {
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
      updateTitle () {
        // TODO 先更新数据库然后在进行页面渲染
        this.$emit('updateTitle', this.doc.title)
      },
      sdaf () {
        console.log(document.getElementById('toolbar').value)
        // document.getElementById('toolbar').style.color = 'red'
      }
    },
    components: {
      // AmLoading,
      Toolbar
      // MapModal
    },
    watch: {
      'doc.title' (newValue, oldValue) {
        if (newValue === oldValue) {
          return
        }
        // 改变标题框的高度
        this.changeHeight()
      }
    },
    mounted () {
      const engine = new Engine(
        // 渲染节点即根节点
        this.$refs.container,
        // 配置项
        {
          // 卡片集合
          cards: [
            ToolbarComponent, // 卡片组件引擎
            CodeBlockComponent // 代码块组件
          ],
          // 插件集合
          plugins: [
            ToolbarPlugin, // 工具栏插件槽启用
            Codeblock, // 代码块
            Heading, // 正文
            Bold // 加粗
          ],
          // 占位符
          placeholder: '直接输入正文，也可以选择一个模板：'
        }
      )
      console.log(engine)
      this.engine = engine

      // ui调整，改变工具栏中某个组件的大小
      // console.log(document.getElementById('toolbar'))
      // let fontColorTags = document.getElementsByClassName('colorpicker-button-text')
      // console.log(fontColorTags[0])

      // 渲染结束后获取输入框焦点，如果没有标题就先定位到标题，如果已有标题就定位到正文
      if (this.title === null && this.title.length === 0) {
        this.$refs.titleTextarea.focus()
      } else {
        this.$refs.container.focus()
      }
    }
  }
</script>

<style scoped lang="less">
  .editor-toolbar {
    border-top: none;
    /*height: 50px;*/

    .editor-toolbar-content {
      height: 50px;

      .editor-toolbar-group {
        padding: 10px 5px;
        color: #00AE9D;
        background: #00AE9D;
      }
    }
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
        letter-spacing: .008em;
      }
    }

    // 右边的大纲
  }

</style>
