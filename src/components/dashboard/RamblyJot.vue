<template>
  <div class="layout-module_RamblyJot">
    <div class="rambly-jot-header">
      <h2 class="title">随笔小记</h2>
      <hr class="separator-line">
    </div>
    <div :class="['rambly-module_editor', extendCurtains ? 'extend-curtains' : '']">
      <div class="scrollbar-visible">
        <div class="layout-mode-fixed">
          <div class="editor-body">
            <div class="editor-wrap" ref="scrollbarContext">
              <div class="editor-wrap-content">
                <div class="editor-outer-wrap-box">
                  <div class="editor-wrap-box">
                    <div class="title-box" v-show="rambly.showTitle">
                      <textarea class="title" placeholder="请输入标题" maxlength="130" tabindex="1" rows="1"
                                v-model="rambly.title" ref="titleTextarea" @keydown.enter="completeTitle">
                      </textarea>
                    </div>
                    <div class="content-box">
                      <div class="engine-box">
                        <div class="engine">
                          <div ref="container"></div>
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
      <div class="curtain-operation">
        <button class="curtain-wrap" @click="extendCurtains = !extendCurtains">
          <span :class="['iconfont', !extendCurtains ? 'unfold' : 'shrink']"></span>
        </button>
      </div>
      <div class="rambly-module_action">
        <div class="toolbar-ui">
          <div class="toolbar-wrap">
            <toolbar v-if="engine" :engine="engine" :items="items" id="toolbar" :mounted="toolbarUI()"/>
            <span class="title-btn" @click="addTitle">
              <span class="iconfont add-title"></span>标题
            </span>
          </div>

          <div class="rambly-module_button">
            <button type="button" class="ant-btn" @click="submitRambly"
                    :disabled="canSubmit">
              <span>小记一下</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="rambly-module_list">
      <div class="rambly-jot-wrap">
        <div class="rambly-item">
          <a class="">
            <div class="post-time"><span>Post 2天前 <span> · Views 207</span><span>· Comments 11</span></span></div>
            <div class="post-content"><p>
              经过数天的排查，一直在探究博客新框架为何正常模式浏览会变慢。无痕模式一点问题都没有，最终经过小关[@951008.com](https://951008.com)的判断禁用了扩展之后，原来是去广告插件Adblock
              Plus的问题。在此我郑重向谷爹浏览器说句抱歉，错怪谷歌爹了。</p></div>
            <div class="post-content photo-content p-1">
              <div>
                <div class="cover-url">
                  <div class="cover-url-item">
                    <div class="bottom-mask"><img
                      src="https://blog-prod-1251110877.cos.ap-guangzhou.myqcloud.com/resource/upload/static/1/image/4284d96950ce17d8c6a9901c847cb3dc.jpeg?imageView2/2/w/540"
                      alt="灵感时刻-2024-01-17 21:29:16" class="bottom-img"></div>
                    <div class="blur"></div>
                    <div class="cover-item"><img
                      src="https://blog-prod-1251110877.cos.ap-guangzhou.myqcloud.com/resource/upload/static/1/image/4284d96950ce17d8c6a9901c847cb3dc.jpeg?imageView2/2/w/540"
                      alt="灵感时刻-2024-01-17 21:29:16" class="cover-url-item"></div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Engine from '@aomao/engine'
  import {$} from '@aomao/engine'
  import Toolbar from 'am-editor-toolbar-vue2'
  import {ramblyPlugins, cards, pluginConfig} from "@/components/common/editor/config"

  export default {
    name: 'RamblyJot',
    data() {
      return {
        engine: null,
        // 工具栏内容：下拉面板、
        items: [
          [
            {
              type: "button",
              name: "image-uploader",
              icon: `<span class="toolbar-icon iconfont pic-upload"/><span class="toolbar-title">图片</span>`
            },
            {
              name: "tasklist",
              icon: `<span class="toolbar-icon iconfont task-list"/><span class="toolbar-title">任务</span>`,
              title: ''
            },
            {
              name: "link",
              icon: `<span class="toolbar-icon iconfont link"/><span class="toolbar-title">链接</span>`,
              title: ''
            },
            {
              type: "button",
              name: "file-uploader",
              icon: `<span class="toolbar-icon iconfont attachment"/><span class="toolbar-title">附件</span>`
            }
          ]
        ],
        editorValueIsEmpty: true,
        readmeEmpty: true,
        extendCurtains: false,
        rambly: {
          showTitle: false,
          title: '',
          jsonValue: null
        }
      }
    },
    computed: {
      canSubmit() {
        if (this.editorValueIsEmpty) {
          return this.rambly.showTitle ? this.rambly.title.length === 0 : true;
        } else {
          return false;
        }
      }
    },
    methods: {
      toolbarUI() {
      },
      addTitle() {
        this.rambly.showTitle = !this.rambly.showTitle;
        if (this.rambly.showTitle) {
          this.$nextTick(() => {
            this.$refs.titleTextarea.focus();
          });
        } else {
          this.$refs.container.focus()
        }
      },
      completeTitle(event) {
        event.preventDefault();
        this.$refs.container.focus()
      },
      submitRambly() {
        let jsonValue = this.engine.getJsonValue();
        let title;
        if (!this.rambly.showTitle) {
          title = null;
        } else {
          title = this.rambly.title.length > 0 ? this.rambly.title : null;
        }
        console.log({jsonValue, title})
      }
    },
    components: {
      Toolbar
    },
    mounted() {
      pluginConfig.link = {hotkey: {key: ""}};
      pluginConfig.tasklist = {hotkey: {key: ""}};
      pluginConfig.heading = {hotkey: {key: ""}};
      const container = this.$refs.container;
      if (container) {
        //实例化引擎
        const engine = new Engine(container, {
          // 启用插件
          plugins: ramblyPlugins,
          // 启用卡片
          cards,
          // 所有的插件配置
          config: pluginConfig,
          autoPrepend: false,
          markdown: false,
          // 文档提示语
          placeholder: '记你想记...'
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

        // 监听编辑器值改变事件
        engine.on("change", () => {
          this.editorValueIsEmpty = engine.isEmpty();
        });

        this.engine = engine;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../css/dashboard/ramblyJot.less";
</style>
