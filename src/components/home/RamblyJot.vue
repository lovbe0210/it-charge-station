<template>
  <div class="layout-module_RamblyJot adjust" ref="popoverContainer">
    <div :class="['rambly-module_editor', extendCurtains ? 'extend-curtains' : '']">
      <div class="scrollbar-visible">
        <div class="layout-mode-fixed">
          <div :class="['editor-body',  editorFocus ? 'editor-focus' : '']"  @click="focusEditor()">
            <div class="editor-wrap beauty-scroll" ref="scrollbarContext">
              <div class="editor-wrap-content">
                <div ref="container"></div>
              </div>
            </div>
          </div>
          <div class="curtain-operation">
            <button class="curtain-wrap" @click="extendCurtains = !extendCurtains">
              <span :class="['iconfont', !extendCurtains ? 'unfold' : 'shrink']"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="rambly-module_action">
        <div class="toolbar-ui">
          <div class="toolbar-wrap">
            <toolbar v-if="engine" :engine="engine" :items="items" id="toolbar"/>
          </div>

          <div class="rambly-module_button">
            <Button type="primary" ghost @click="submitRambly"
                    :disabled="canSubmit">
              <span>小记一下</span>
            </Button>
          </div>
        </div>
      </div>
      <div class="modal-lock" v-if="!userInfo || !userInfo.token || userInfo.token.length !== 32">
        <span class="lock-tip">
          <auth-modal>
            <slot>
              <a href="javascript: void(0)">登陆&nbsp;</a>
            </slot>
          </auth-modal>
          <span>即刻记下随心所想</span>
        </span>
      </div>
    </div>
    <div class="rambly-module_list">
      <div class="rambly-item" v-for="item in ramblyList" :key="item.id">
        <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer" class="item-left">
          <slot>
            <b-avatar :src="item.userInfo.avatar" class="avatar">
              <span v-if="!item.userInfo.avatar">{{item.userInfo.username}}</span>
            </b-avatar>
          </slot>
        </user-card>
        <div class="item-right">
          <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer">
            <slot>
              <span class="username">{{item.userInfo.username}}</span>
            </slot>
          </user-card>
          <div class="post-content">
            <b-link to="/ramblyJot/sadasd">
              <p>{{item.content}}</p>
            </b-link>
          </div>
          <div class="post-image">
            <div class="photo-content p1" v-if="item.picList?.length === 1">
              <div>
                <div class="cover-url">
                  <div class="cover-url-item">
                    <div class="bottom-mask">
                      <img :src="item.picList[0]" :alt="'灵感时刻-' + item.createTime" class="bottom-img">
                    </div>
                    <div class="blur"></div>
                    <div class="cover-item">
                      <img :src="item.picList[0]" :alt="'灵感时刻-' + item.createTime" class="cover-url-item">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="photo-content p2" v-if="item.picList?.length === 2">
              <div>
                <div class="cover-url">
                  <div class="cover-url-item">
                    <div class="bottom-mask">
                      <img v-for="pic in item.picList" :key="pic" :src="pic" :alt="'灵感时刻-' + item.createTime"
                           class="bottom-img">
                    </div>
                    <div class="blur"></div>
                    <div class="cover-item">
                      <div v-for="pic in item.picList" :key="pic" class="cover-item-box">
                        <img :src="pic" :alt="'灵感时刻-' + item.createTime" class="cover-url-item">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="photo-content p3" v-if="item.picList?.length === 3">
              <div class="more-images">
                <div v-for="pic in item.picList" :key="pic" class="photo">
                  <img :src="pic" :alt="'灵感时刻-' + item.createTime">
                </div>
              </div>
            </div>
          </div>
          <div class="action-box">
            <div class="post-time">
              <span>发布于 </span>
              <Time class="time" :time="item.createTime" v-if="needFormatDate(item.createTime)"/>
              <Time class="time" :time="item.createTime" v-else type="datetime"/>
            </div>
            <div class="action">
              <span class="reply-btn">
                <span class="iconfont reply"></span>
                {{item.comments}}
              </span>
              <span class="like-btn">
                <span class="iconfont like"></span>
                {{item.likes}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Engine from '@aomao/engine'
  import {$} from '@aomao/engine'
  // import Toolbar from 'am-editor-toolbar-vue2'
  import Toolbar from "@/components/common/editor/packages/toolbar/src"
  import {ramblyPlugins, cards, pluginConfig} from "@/components/common/editor/config"
  import UserCard from "@/components/common/UserCard.vue";
  import {needFormatDate} from '@/utils/emoji';
  import AuthModal from "@/components/common/AuthModal.vue";

  export default {
    name: 'RamblyJot',
    data() {
      return {
        engine: null,
        editorFocus: false,
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
              icon: `<span class="toolbar-icon iconfont attachment-wb"/><span class="toolbar-title">附件</span>`
            }
          ]
        ],
        editorValueIsEmpty: true,
        readmeEmpty: true,
        extendCurtains: false,
        rambly: {
          htmlValue: null
        },
        popoverContainer: null,
        titleRows: 1,
        ramblyList: [

        ],
        showLogin: false
      }
    },
    computed: {
      canSubmit() {
        if (this.editorValueIsEmpty) {
          return this.rambly.showTitle ? this.rambly.title.length === 0 : true;
        } else {
          return false;
        }
      },
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    methods: {
      submitRambly() {
        let htmlValue = this.engine.model?.toValue();
        let title;
        if (!this.rambly.showTitle) {
          title = null;
        } else {
          title = this.rambly.title.length > 0 ? this.rambly.title : null;
        }
        this.rambly = {...this.rambly, title, htmlValue};
      },
      focusEditor() {
        if (this.editorValueIsEmpty) {
          const container = this.$refs.container;
          container.focus();
        } else {
          this.engine.focus();
        }
      },
      needFormatDate
    },
    components: {
      Toolbar,
      UserCard,
      AuthModal
    },
    watch: {
      "rambly.title"(newVal) {
        console.log(newVal);
        this.titleRows = this.rambly.title.split('\n').length;
      }
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
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
        engine.on("focus", () => {
          this.editorFocus = true;
        });
        engine.on("blur", () => {
          this.editorFocus = false;
        });

        this.engine = engine;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../css/home/ramblyJot.less";
</style>
