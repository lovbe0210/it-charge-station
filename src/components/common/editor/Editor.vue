<template>
  <b-container fluid class="editor">
    <div class="scrollbar-visible">
      <div class="layout-mode-fixed">
        <toolbar v-if="engine" :engine="engine" :items="items" id="toolbar" :mounted="toolbarUI()"/>
        <div class="editor-body">
          <div class="editor-wrap beauty-scroll" ref="scrollbarContext" @wheel="debounceScroll">
            <div class="editor-wrap-content">
              <div class="editor-outer-wrap-box">
                <div class="editor-wrap-box">
                  <div :class="['title-box', docStyle.pageSize === 1 ? 'title-standard-wide' : 'title-ultra-wide']">
                    <div class="title-editor">
                      <textarea class="title" v-model="doc.title" placeholder="请输入标题"
                                maxlength="130" tabindex="1" rows="1" ref="titleTextarea"
                                @blur="updateTitle" @keydown.enter="completeTitle">
                      </textarea>
                    </div>
                  </div>
                  <div class="content-box">
                    <div class="engine-box">
                      <div class="engine">
                        <div :class="['doc-editor','am-engine','am-engine-placeholder', docStyle.pageSize === 1 ? 'editor-standard-wide' : 'editor-ultra-wide']"
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
              <div class="editor-toc-inner">
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
  import Engine from '@aomao/engine'
  import {$} from '@aomao/engine'
  import Toolbar from 'am-editor-toolbar-vue2'
  import {plugins, cards, pluginConfig, HightLightIcon} from "./config"
  import {getTocData, getParentNode, belongToc} from "./utils/index"

  export default {
    name: 'Editor',
    data() {
      return {
        doc: {
          title: this.docInfo.title
        },
        tocData: [],
        currentTocId: '',
        // 滚动事件的防抖函数
        debounceScroll: function () {},
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
                    'image-uploader',
                    'codeblock',
                    'table',
                    'file-uploader',
                    'video-uploader',
                    'math',
                    'status',
                    {
                      name: 'lightblock',
                      icon: HightLightIcon,
                      title: '高亮块'
                    }
                    /*{
                      name: "audio-uploader",
                      icon: '<span style="width:23px;height:23px;display: inline-block;border:1px solid #E8E8E8;"><svg style="top: 2px;position: relative;" t="1636128560405" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28042" width="16" height="16"><path d="M877.854 269.225l-56.805-56.806-121.726-123.079c-24.345-21.64-41.928-27.050-68.978-27.050h-451.737c-31.108 0-55.453 24.345-55.453 55.453v789.865c0 29.755 24.345 54.1 55.453 54.1h666.787c31.108 0 55.453-24.345 55.453-54.1v-584.284c0-24.345-8.115-35.165-22.993-54.1v0zM830.516 289.513h-156.891v-156.891l156.891 156.891zM856.213 907.609c0 5.409-4.057 10.821-10.821 10.821h-666.787c-6.762 0-12.172-5.409-12.172-10.821v-789.865c0-6.762 5.409-12.172 12.172-12.172 0 0 451.737 0 451.737 0v205.582c0 12.173 9.468 21.64 21.64 21.64h204.229v574.816zM723.668 413.943c-117.668-1.353-246.157 22.993-363.825 59.511-9.468 4.058-10.821 5.409-10.821 14.877v210.991c-12.172-5.409-27.050-6.762-41.927-5.409-45.985 1.353-82.503 29.755-82.503 60.862 0 31.108 36.517 55.453 82.503 52.748 45.985-2.706 82.503-29.755 82.503-60.863v-193.409c109.553-25.698 209.638-43.28 312.429-51.395v150.128c-12.173-5.409-25.698-6.762-40.576-6.762-45.985 2.706-82.503 29.755-82.503 62.215 0 31.108 36.517 55.453 82.503 52.748 44.632-2.706 82.503-29.755 82.503-60.863v-267.797c0-13.525-6.762-16.23-20.287-17.583z" p-id="28043"></path></svg><span>',
                      title: "音频",
                      search: "音频,audio"
                    }*/
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
    props: ['docInfo', 'docStyle'],
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
      },
      completeTitle(event) {
        // 阻止换行然后切换光标
        event.preventDefault();
        this.$refs.container.focus()
      },
      toolbarUI() {
        // 选色器
        let colorPicker
        setTimeout(() => {
          new Promise(function (resolve, reject) {
            let interval = setInterval(() => {
              colorPicker = document.getElementById('toolbar').children[0].childNodes[4]
              if (colorPicker !== null && colorPicker !== undefined) {
                clearInterval(interval)
                resolve()
              }
            }, 10)
          }).then(() => {
            colorPicker.childNodes.forEach(s => {
              s.childNodes.forEach(ss => {
                ss.childNodes.forEach(sss => {
                  if (sss.hasChildNodes()) {
                    sss.childNodes.forEach(ssss => {
                      if (ssss.hasChildNodes()) {
                        ssss.children[0].setAttribute('width', '20px');
                        ssss.children[0].setAttribute('height', '20px');
                      }
                    })
                  }
                })
              })
            })
          })
        }, 100)
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
          console.log("save...")
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
       * @param engine
       */
      renderTocData(engine) {
        let tocData = getTocData(engine);
        this.tocData = (tocData && tocData instanceof Array) ? tocData : [];
      }
    },
    components: {
      Toolbar
    },
    watch: {
      'doc.title'(newValue, oldValue) {
        if (newValue === oldValue) {
          return
        }
        // 改变标题框的高度
        this.changeHeight()
      },
      'docStyle.docFontSize'(newValue) {
        // TODO 改变非标题字体大小
      }
    },
    mounted() {
      const container = this.$refs.container;
      if (container) {
        //实例化引擎
        const engine = new Engine(container, {
          // 启用插件
          plugins,
          // 启用卡片
          cards,
          // 所有的插件配置
          config: pluginConfig,
          autoPrepend: false,
          // 文档提示语
          placeholder: '输入正文: '
        });
        // 设置显示成功消息UI，默认使用 console.log
        engine.messageSuccess = (msg) => {
          console.log(msg);
        };
        // 设置显示错误消息UI，默认使用 console.error
        engine.messageError = (error) => {
          console.log(error);
        };
        //卡片最大化时设置编辑页面样式
        engine.on("card:maximize", () => {
          $(".editor-toolbar").css("z-index", "9999").css("top", "0");
          $(".card-maximize-header").css("height", "60px");
          // $(".editor-toolbar").css("z-index", "9999");
        });
        engine.on("card:minimize", () => {
          $(".editor-toolbar").css("z-index", "").css("top", "");
        });
        // 非协同编辑，设置编辑器值，异步渲染后回调
        // engine.setValue(value, () => {
        //   this.loading = false;
        // });

        // 监听编辑器值改变事件
        engine.on("change", () => {
          let range = engine.change.range.get();
          let collapsed = range?.collapsed;
          let startNode = collapsed ? range.startNode : range.endNode;
          let parentNode = getParentNode(startNode);
          // 1. 更新标题(单行节点)
          let nodeName = parentNode?.name;
          if (belongToc(nodeName)) {
            this.renderTocData(engine);
          } else {
            // 2. 处理status影响其他文字
            let children = parentNode?.children("span[data-card-key=\"status\"]");
            if (children !== undefined && children.length !== 0) {
              // 给当前节点去掉样式
              startNode.removeAttributes('style')
              startNode.allChildren().forEach(child => child?.removeAttributes('style'))
            }
          }
        });

        if (this.docInfo.content?.length !== 0) {
          engine.setJsonValue(JSON.parse(this.docInfo.content))
          const pattern = /h[1-6]/;
          let match = this.docInfo.content.match(pattern);
          if (match) {
            this.renderTocData(engine);
          }
        }

        this.engine = engine;
      }

      // 渲染结束后获取输入框焦点，如果没有标题就先定位到标题，如果已有标题就定位到正文
      this.changeHeight();
      if (this.title == null || this.title.length === 0) {
        this.$refs.titleTextarea.focus()
      } else {
        this.$refs.container.focus()
      }

      // 监听Ctrl+s组合按键
      window.addEventListener('keydown', this.saveDoc)

      // 设置延迟时间，单位为毫秒
      this.debounceScroll = this.debounce(this.handleScrollForToc, 200);
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.saveDoc)
    }
  }
</script>

<style scoped lang="less">
  @import "./css/editor.less";
</style>
