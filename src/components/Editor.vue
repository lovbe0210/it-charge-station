<template>
  <b-container fluid class="editor">
    <div class="scrollbar-visible">
      <div class="layout-mode-fixed">
        <toolbar v-if="engine" :engine="engine" :items="items" id="toolbar"/>
        <div class="editor-body">
          <div class="editor-wrap beauty-scroll" ref="scrollbarContext" @wheel="handleScrollForToc">
            <div class="editor-wrap-content">
              <div class="editor-outer-wrap-box">
                <div class="editor-wrap-box">
                  <div :class="['title-box', docStyle.pageSize ? 'title-ultra-wide' : 'title-standard-wide']">
                    <div class="title-editor">
                      <textarea class="title" v-model="doc.title" placeholder="请输入标题"
                                maxlength="130" tabindex="1" rows="1" ref="titleTextarea"
                                @blur="updateDocInfo" @keydown.enter="completeTitle">
                      </textarea>
                    </div>
                  </div>
                  <div class="content-box">
                    <div class="engine-box">
                      <div class="engine">
                        <div :class="['doc-editor','am-engine','am-engine-placeholder', docStyle.pageSize ? 'editor-ultra-wide' : 'editor-standard-wide']"
                             ref="container"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="editor-sidebar">
            <div class="editor-view">
              <div class="editor-toc-pin un-select">
                <span class="iconfont main-point"></span>
                <span class="editor-toc-pin-text">大纲</span>
                <div class="editor-toc-pin-wrap">
                  <div class="ne-icon ne-iconfont" data-name="pin" style="font-size: 16px;">
                    <span class="lake-icon lake-icon-pin" style="font-size: 16px;"></span>
                  </div>
                </div>
              </div>
              <div class="editor-toc-inner beauty-scroll">
                <div class="toc-content">
                  <div class="toc-item" v-for="item in tocData"
                       :class="['toc-depth-'+ item.depth, item.id === currentTocId ? 'toc-selected' : '']"
                       :key="item.id"
                       @click="jump(item.id)">
                    <div class="toc-item-inner">
                      <div class="toc-item-text" :title="item.text">
                        <span>{{item.text}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
  import Engine, {$} from '@aomao/engine'
  import Toolbar from "./common/editor/packages/toolbar/src"
  import {plugins, cards, pluginConfig} from "./common/editor/config"
  import {getTocData, getParentNode} from "./common/editor/utils"

  export default {
    name: 'Editor',
    data() {
      return {
        doc: {
          title: this.docInfo.title,
          wordsNum: 0
        },
        tocData: [],
        currentTocId: '',
        // 大纲刷新的防抖函数
        debounceRefreshToc: function () {},
        engine: null,
        // 工具栏内容：下拉面板、
        items: [
          [
            {
              icon: '<span class="iconfont icon-editor-toolbar-add" style="font-size: 18px;"></span>',
              type: 'collapse',
              groups: [
                {
                  items: [
                    {
                      name: 'image-uploader',
                      icon: '<span class="iconfont upload-image"></span>',
                      title: '图片上传'
                    },
                    {
                      name: 'codeblock',
                      icon: '<span class="iconfont code-block"></span>',
                      title: '代码块'
                    },
                    {
                      name: 'table',
                      icon: '<span class="iconfont i-table"></span>',
                      title: '表格'
                    },
                    {
                      name: 'status',
                      icon: '<span class="iconfont i-status"></span>',
                      title: '状态'
                    },
                    {
                      name: 'lightblock',
                      icon: '<span class="iconfont high-light"></span>',
                      title: '高亮块'
                    },
                    {
                      name: 'file-uploader',
                      icon: '<span class="iconfont attachment"></span>',
                      title: '附件'
                    },
                    {
                      name: 'video-uploader',
                      icon: '<span class="iconfont media"></span>',
                      title: '音视频'
                    },
                    {
                      name: 'math',
                      icon: '<span class="iconfont formula"></span>',
                      title: '公式'
                    }
                  ]
                }
              ]
            }
          ],
          ['undo', 'redo', 'paintformat', 'removeformat'],
          ['heading', 'fontsize', 'bold', 'italic', 'strikethrough', 'underline', 'moremark'],
          ['fontcolor', 'backcolor'],
          ['alignment'],
          ['unorderedlist', 'orderedlist', 'tasklist', 'indent', 'line-height'],
          ['link', 'quote', 'hr']
        ]
      }
    },
    components: {
      Toolbar
    },
    computed: {
      docStyle() {
        return this.$store.state.docStyle;
      },
      tmpDoc() {
        return this.$store.state.tmpDoc;
      }
    },
    props: ['docInfo'],
    methods: {
      changeTitleHeight() {
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
      updateDocInfo() {
        // TODO 先更新数据库然后在进行页面渲染
        this.$emit('updateDocInfo', this.doc)
      },
      completeTitle(event) {
        // 阻止换行然后切换光标
        event.preventDefault();
        this.$refs.container.focus()
      },
      /**
       * 防抖函数
       */
      debounce(func, delay) {
        let timer;
        return function(...args) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, delay);
        };
      },
      /**
       * 保存
       */
      saveDoc(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
          // 阻止默认事件
          event.preventDefault()
          // 执行save方法
          // TODO 传递到服务器的值需要使用json
          // let editorValue = this.engine.getJsonValue();
          let editorValue = this.engine.model.toValue();
          console.log(editorValue)
          this.tmpDoc.title = this.doc.title;
          this.tmpDoc.content = editorValue;
        }
      },
      /**
       * 点击跳转
       * @param titleId
       */
      jump(titleId) {
        this.currentTocId = titleId;
        let scrollbarContext = this.$refs.scrollbarContext;
        let title = $('#' + titleId).get().offsetTop;
        scrollbarContext.scrollTo({
          behavior: "smooth",
          top: title + 90
        });
      },

      /**
       * 处理滚动条滚动事件
       */
      handleScrollForToc() {
        if (this.tocData.length > 0) {
          let scrollbarRect = this.$refs.scrollbarContext?.getBoundingClientRect();
          if (scrollbarRect) {
            let containerTop = scrollbarRect.top;
            let containerBottom = scrollbarRect.bottom;
            for (let i = 0; i < this.tocData.length; i++) {
              let rect = $('#' + this.tocData[i].id).get().getBoundingClientRect();
              if (rect.top >= containerTop && rect.top <= containerBottom) {
                this.currentTocId = this.tocData[i].id;
                return;
              }
            }
          }
        }
      },
      /**
       * 渲染标题大纲
       */
      renderEditorData() {
        if (this.engine.isEmpty()) {
          this.tocData = [];
          return;
        }
        let text = this.engine?.model?.toText();
        if (text) {
          text = text.replace(/\r\n/g, "");
          text = text.replace(/\n/g, "");
          text = text.replace(" ", "");
          this.doc.wordsNum = text.length;
          this.updateDocInfo();
          console.log('字数更新了：', this.doc.wordsNum)
        }

        let tocData = getTocData(this.engine);
        this.tocData = (tocData && tocData instanceof Array) ? tocData : [];
      }
    },
    watch: {
      'doc.title'(newValue, oldValue) {
        if (newValue === oldValue) {
          return
        }
        // 改变标题框的高度
        this.changeTitleHeight()
      },
      'docStyle.pageSize'() {
        this.$nextTick(() => {
          this.engine?.trigger("editor:resize");
          this.changeTitleHeight()
        })
        // TODO 改变非标题字体大小
      }
    },
    mounted() {
      const container = this.$refs.container;
      if (container) {
        //实例化引擎
        this.engine = new Engine(container, {
          // 启用插件
          plugins,
          // 启用卡片
          cards,
          // 所有的插件配置
          config: pluginConfig,
          autoPrepend: false,
          // 文档提示语
          placeholder: '输入 / 唤起更多'
        });
        // 设置显示成功消息UI，默认使用 console.log
        this.engine.messageSuccess = (msg) => {
          console.log(msg);
        };
        // 设置显示错误消息UI，默认使用 console.error
        this.engine.messageError = (error) => {
          console.log(error);
        };
        //卡片最大化时设置编辑页面样式
        this.engine.on("card:maximize", () => {
          $(".editor-toolbar").css("z-index", "9999").css("top", "0");
          $(".card-maximize-header").css("height", "60px");
          // $(".editor-toolbar").css("z-index", "9999");
        });
        this.engine.on("card:minimize", () => {
          $(".editor-toolbar").css("z-index", "").css("top", "");
        });
        // 非协同编辑，设置编辑器值，异步渲染后回调
        // engine.setValue(value, () => {
        //   this.loading = false;
        // });

        this.engine.on("paste:each", (echoNode) => {
          let element = echoNode[0];
          if (!element || !element.id) {
            return;
          }
          let nodeName = "";
          if (echoNode.name) {
            nodeName = echoNode.name.replace("#", "");
          }
          element.id = nodeName + "-" + element.id;
        })

        // 监听编辑器值改变事件
        this.engine.on("change", () => {
          let range = this.engine.change.range.get();
          let collapsed = range?.collapsed;
          let startNode = collapsed ? range.startNode : range.endNode;
          let parentNode = getParentNode(startNode);
          // 1. 处理status影响其他文字
          let children = parentNode?.children("span[data-card-key=\"status\"]");
          if (children !== undefined && children.length !== 0) {
            // 给当前节点去掉样式
            startNode.removeAttributes('style')
            startNode.allChildren().forEach(child => child?.removeAttributes('style'))
          }
          // 使用节流方案
            this.debounceRefreshToc();
        });

        if (this.docInfo.content?.length !== 0) {
          this.engine.setJsonValue(JSON.parse(this.docInfo.content))
          const pattern = /h[1-6]/;
          let match = this.docInfo.content.match(pattern);
          if (match) {
            this.renderEditorData();
          }
        }
      }

      // 渲染结束后获取输入框焦点，如果没有标题就先定位到标题，如果已有标题就定位到正文
      this.changeTitleHeight();
      if (this.title == null || this.title.length === 0) {
        this.$refs.titleTextarea.focus()
      } else {
        this.$refs.container.focus()
      }

      // 监听Ctrl+s组合按键
      window.addEventListener('keydown', this.saveDoc)

      // 设置延迟时间，单位为毫秒
      this.debounceRefreshToc = this.debounce(this.renderEditorData, 500);
      //
      // const scrollContainer = this.$refs.scrollbarContext;
      // scrollContainer?.addEventListener('scroll', this.handleScrollForToc);
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.saveDoc)
      // const scrollContainer = this.$refs.scrollbarContext;
      // scrollContainer?.removeEventListener('scroll', this.handleScrollForToc);
    }
  }
</script>

<style scoped lang="less">
  @import "common/editor/css/editor.less";
</style>
