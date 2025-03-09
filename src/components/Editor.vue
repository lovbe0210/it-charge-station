<template>
  <b-container fluid class="editor">
    <div class="scrollbar-visible">
      <div class="layout-mode-fixed">
        <toolbar v-if="engine" :engine="engine" :items="items" id="toolbar"/>
        <div class="editor-body">
          <div class="editor-wrap beauty-scroll" ref="scrollbarContext">
            <div class="editor-wrap-content">
              <div class="editor-outer-wrap-box">
                <div class="editor-wrap-box">
                  <div :class="['title-box', docStylePageSize ? 'title-ultra-wide' : 'title-standard-wide']">
                    <div class="title-editor">
                      <textarea class="title" v-model="article.title" placeholder="请输入标题"
                                maxlength="50" tabindex="1" rows="1" ref="titleTextarea"
                                @blur="updateArticleTitle" @keydown.enter="completeTitle">
                      </textarea>
                    </div>
                  </div>
                  <div class="content-box">
                    <div class="engine-box">
                      <div class="engine">
                        <div
                          :class="['doc-editor','am-engine','am-engine-placeholder', docStylePageSize ? 'editor-ultra-wide' : 'editor-standard-wide']"
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
                        <span>{{ item.text }}</span>
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
import WriteCenterApi from "@/api/WriteCenterApi";
import {debounce, cloneDeep} from '@/utils'

export default {
  name: 'Editor',
  data() {
    return {
      article: {
        title: null,
        contentId: null,
        content: null,
        wordsNum: 0,
        summary: null,
        coverUrl: null,
        // 更新状态 1更新中，0更新完成，-1更新失败
        status: 0
      },
      tocData: [],
      currentTocId: '',
      // 大纲刷新的防抖函数
      debounceRefreshToc: function () {
      },
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
                  'status',
                  'lightblock',
                  'file-uploader',
                  'video-uploader',
                  'math'
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
    finalConfig() {
      let config = cloneDeep(pluginConfig);
      config.fontsize.defaultSize = this.docStyleDefaultFont + 'px'
      return config;
    }
  },
  props: ['articleInfo', 'docStylePageSize', 'docStyleDefaultFont'],
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
    updateArticleTitle() {
      if (this.articleInfo.title === this.article.title) {
        return;
      }
      let articleInfo = {
        title: this.article.title,
        uid: this.articleInfo.uid
      }
      WriteCenterApi.updateArticleInfo(articleInfo).then((data) => {
        if (data?.result) {
          this.$emit('updateArticle', this.article)
        }
      })
    },
    completeTitle(event) {
      // 阻止换行然后切换光标
      event.preventDefault();
      this.$refs.container.focus()
    },
    /**
     * 保存
     */
    saveArticle(event) {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        // 阻止默认事件
        event.preventDefault()
        this.renderEditorData();
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
     * 编辑器内容变化
     */
    renderEditorData() {
      // 文档内容解析
      if (this.engine.isEmpty()) {
        this.tocData = [];
        this.article.wordsNum = 0;
        this.article.content = null;
      } else {
        this.article.content = this.engine.getJsonValue();
        let text = this.engine.model.toText();
        if (text) {
          text = text.replace(/\r\n/g, "");
          text = text.replace(/\n/g, "");
          text = text.replace(" ", "");
          this.article.wordsNum = text.length;
          // 判断是否需要提取摘要
          if (this.articleInfo.autoSummary === 1) {
            let summary = text.substr(0, 147);
            if (text.length > 147) {
              summary += "...";
            }
            this.article.summary = summary;
          }
        } else {
          this.article.wordsNum = 0;
          this.article.content = null
        }
        // 判断是否需要提取封面
        if (!this.articleInfo.coverUrl) {
          let nodeArray = this.engine.container
            .find('[data-card-key="image"]')
            .toArray()
            .filter(image => {
              return image.find("img").length > 0
            });
          if (nodeArray.length > 0) {
            let card = this.engine.card.find(nodeArray[0]);
            let value = card?.getValue();
            let avatarUrl = value?.src.replace(this.fileService, '');
            this.article.coverUrl = avatarUrl;
          }
        }

        // 渲染大纲
        let tocData = getTocData(this.engine);
        this.tocData = (tocData && tocData instanceof Array) ? tocData : [];
      }

      if (this.articleInfo.wordsNum === 0 && this.article.wordsNum === 0) {
        return;
      }
      // 文档内容更新
      let contentDto = {
        uid: this.article.contentId,
        content: this.article.content,
        wordsNum: this.article.wordsNum,
        coverUrl: this.article.coverUrl,
        articleId: this.articleInfo.uid
      }
      if (this.articleInfo.autoSummary === 1) {
        contentDto.summary = this.article.summary;
      }
      this.article.status = 1;
      this.$emit('updateArticle', this.article);
      WriteCenterApi.updateArticleContent(contentDto).then(data => {
        if (data?.result) {
          this.article.contentId = data.data.contentId;
          this.article.updateTime = data.data.updateTime;
          this.article.status = 0;
        } else {
          this.article.status = -1;
        }
        this.$emit('updateArticle', this.article);
      })
    }
  },
  watch: {
    'article.title'(newValue, oldValue) {
      if (newValue === oldValue) {
        return
      }
      // 改变标题框的高度
      this.changeTitleHeight()
    },
    'docStylePageSize'() {
      this.$nextTick(() => {
        this.engine?.trigger("editor:resize");
        this.changeTitleHeight()
      })
    },
    'docStyleDefaultFont'(newVal) {
      // TODO 改变非标题字体大小
      let articleInfo = {uid: this.articleInfo.uid, bodyFontSize: newVal};
      WriteCenterApi.updateArticleInfo(articleInfo);
    }
  },
  created() {
    // 设置延迟时间，单位为毫秒
    this.debounceRefreshToc = debounce(this.renderEditorData, 1000);
    this.article = {
      title: this.articleInfo.title,
      contentId: this.articleInfo.latestContentId,
      wordsNum: this.articleInfo.wordsNum
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
        config: this.finalConfig,
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
        // 刷新标题/更新内容
        this.debounceRefreshToc();
      });

      // 获取内容
      WriteCenterApi.getArticleContent(this.articleInfo.uid).then(data => {
        if (data?.result) {
          let _data = data.data;
          if (_data != null) {
            this.article.contentId = _data.uid;
            this.article.content = _data.content;
            if (_data.content && _data.content.length > 0) {
              this.engine.setJsonValue(JSON.parse(_data.content))
              const pattern = /h[1-6]/;
              let match = _data.content.match(pattern);
              if (match) {
                // 渲染大纲
                let tocData = getTocData(this.engine);
                this.tocData = (tocData && tocData instanceof Array) ? tocData : [];
              }
            }
          }
        }
      })
    }

    // 渲染结束后获取输入框焦点，如果没有标题就先定位到标题，如果已有标题就定位到正文
    this.changeTitleHeight();
    if (this.title == null || this.title.length === 0) {
      this.$refs.titleTextarea.focus()
    } else {
      this.$refs.container.focus()
    }

    // 监听Ctrl+s组合按键
    window.addEventListener('keydown', this.saveArticle)

    const scrollContainer = this.$refs.scrollbarContext;
    scrollContainer?.addEventListener('scroll', this.handleScrollForToc);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.saveArticle)
    const scrollContainer = this.$refs.scrollbarContext;
    scrollContainer?.removeEventListener('scroll', this.handleScrollForToc);
  }
}
</script>

<style scoped lang="less">
@import "common/editor/css/editor.less";
</style>
