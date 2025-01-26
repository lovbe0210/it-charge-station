<template>
  <div class="layout-module_RamblyJot adjust" ref="popoverContainer">
    <div :class="['rambly-module_editor', extendCurtains ? 'extend-curtains' : '']">
      <div class="scrollbar-visible">
        <div class="layout-mode-fixed">
          <div :class="['editor-body',  editorFocus ? 'editor-focus' : '']">
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
            <Button ghost @click="submitRamblyJot"
                    :disabled="editorValueIsEmpty">
              <span>小记一下</span>
            </Button>
          </div>
        </div>
      </div>
      <div class="modal-lock" v-if="!loginStatus">
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
      <div class="rambly-jot-wrap"
           v-infinite-scroll="debounceRequestRank"
           :infinite-scroll-disabled="!hasMore"
           :infinite-scroll-distance="100">
        <div class="rambly-item" v-for="item in ramblyList" :key="item.uid">
          <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer" class="item-left">
            <slot>
              <b-avatar :src="fileUrl(item.userInfo?.avatarUrl)" class="avatar">
                <span v-if="!item.userInfo?.avatarUrl">{{ item.userInfo?.username }}</span>
              </b-avatar>
            </slot>
          </user-card>
          <div class="item-right">
            <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer">
              <slot>
                <span class="username">{{ item.userInfo?.username }}</span>
              </slot>
            </user-card>
            <div class="post-content">
              <b-link :to="'/creative/ramblyJot/' + item.uid">
                <p>{{ item.previewContent }}</p>
              </b-link>
            </div>
            <div class="post-image">
              <div class="photo-content p1" v-if="item.previewImg?.length === 1">
                <div class="cover-url">
                  <div class="cover-url-item">
                    <div class="bottom-mask">
                      <img :src="fileUrl(item.previewImg[0])"
                           :alt="item.title"
                           class="bottom-img">
                    </div>
                    <div class="blur"></div>
                    <div class="cover-item" :id="item.uid">
                      <div @click="previewImage(item.uid, item.previewImg, 0)">
                        <b-img-lazy :src="fileUrl(item.previewImg[0])"
                                    class="cover-url-item" rounded
                                    :alt="item.title">
                        </b-img-lazy>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="photo-content p2" v-if="item.previewImg?.length === 2">
                <div class="cover-url">
                  <div class="cover-url-item">
                    <div class="bottom-mask">
                      <img v-for="pic in item.previewImg"
                           :key="pic"
                           :src="fileUrl(pic)"
                           :alt="item.title"
                           class="bottom-img">
                    </div>
                    <div class="blur"></div>
                    <div class="cover-item" :id="item.uid">
                      <div v-for="(pic, index) in item.previewImg"
                           :key="index"
                           @click="previewImage(item.uid, item.previewImg, index)"
                           class="cover-item-box">
                        <b-img-lazy :src="fileUrl(pic)"
                                    class="cover-url-item" rounded
                                    :alt="item.title">
                        </b-img-lazy>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="photo-content p3" v-if="item.previewImg?.length === 3">
                <div class="more-images" :id="item.uid">
                  <div v-for="(pic, index) in item.previewImg"
                       :key="index"
                       class="cover-item-box"
                       @click="previewImage(item.uid, item.previewImg, index)">
                    <b-img-lazy :src="fileUrl(pic)"
                                class="cover-url-item" rounded
                                :alt="item.title">
                    </b-img-lazy>
                  </div>
                </div>
              </div>
            </div>
            <div class="action-box">
              <div class="post-time">
              <span>发布于
                <span class="time">{{ formatTime(item.createTime) }}</span>
              </span>
              </div>
              <div class="action">
              <span class="reply-btn">
                <span class="iconfont reply"></span>
                {{ item.commentCount }}
              </span>
                <span class="like-btn">
                <span :class="['iconfont', 'like', item.ifLike ? 'ilike' : '']"></span>
                {{ item.likeCount }}
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Engine from '@aomao/engine'
import Toolbar from "@/components/common/editor/packages/toolbar/src"
import {ramblyPlugins, ramblyCards, pluginConfig} from "@/components/common/editor/config"
import Pswp from "@/components/common/imagepreview/index"
import UserCard from "@/components/common/UserCard.vue";
import {formatTime, debounce} from "@/utils/emoji"
import AuthModal from "@/components/common/AuthModal.vue";
import ramblyJotApi from "@/api/RamblyJotApi";

export default {
  name: 'RamblyJot',
  data() {
    return {
      engine: null,
      // 图片预览
      pswp: null,
      editorFocus: false,
      // 工具栏内容：下拉面板
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
      extendCurtains: false,
      popoverContainer: null,
      ramblyList: [],
      showLogin: false,
      hasMore: true,
      offset: 0,
      limit: 20,
      debounceRequestRank: function () {}
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    loginStatus() {
      let userInfo = this.$store.state.userInfo
      return userInfo !== null && userInfo.token?.length === 32
    }
  },
  methods: {
    initEngine() {
      pluginConfig.link = {hotkey: {key: ""}};
      pluginConfig.tasklist = {hotkey: {key: ""}};
      pluginConfig.heading = {hotkey: {key: ""}};
      pluginConfig.image = {
        hotkey: {key: ""},
        maxHeight: 150,
        onBeforeRender: (status, url) => {
          if (url.startsWith("data:image/")) return url
          return url
        }
      }

      const container = this.$refs.container;
      if (container) {
        //实例化引擎
        const engine = new Engine(container, {
          // 启用插件
          plugins: ramblyPlugins,
          // 启用卡片
          cards: ramblyCards,
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
    },
    submitRamblyJot() {
      if (this.editorValueIsEmpty) {
        return;
      }

      // 获取预览内容
      let text = this.engine?.model?.toText();
      let previewContent = '';
      if (text) {
        text = text.replace(/\r\n/g, "");
        text = text.replace(/\n/g, "");
        text = text.replace(" ", "");
        // 判断是否需要提取摘要
        if (text.length > 297) {
          previewContent = text.substr(0, 297);
          previewContent += "...";
        } else {
          previewContent = text;
        }
      }

      if (!previewContent && previewContent === '') {
        this.editorValueIsEmpty = true;
        return;
      }

      // 获取图片文件
      let nodeArray = this.engine.container
        .find('[data-card-key="image"]')
        .toArray()
        .filter(image => {
          return image.find("img").length > 0
        });
      let previewImg = nodeArray.slice(0, 3).map(node => {
        let card = this.engine.card.find(node);
        let value = card?.getValue();
        let imgUrl = value?.src.replace(this.fileService, '');
        return imgUrl;
      })

      // 获取正文对象
      let jsonValue = this.engine.getJsonValue();

      // 发送请求
      let ramblyInfo = {
        content: jsonValue,
        previewContent,
        previewImg
      }
      ramblyJotApi.saveRamblyJot(ramblyInfo).then(data => {
        if (data?.result) {
          this.$Message.success("发表成功")
          this.editorValueIsEmpty = true;
          this.extendCurtains = false;
          this.ramblyList.unshift(data.data);
          this.engine.destroy();
          this.initEngine();
        }
      })
    },
    fileUrl(path) {
      return this.fileService + path;
    },
    previewImage(trendId, imgArray, currentIndex) {
      if (this.pswp === null) {
        this.pswp = new Pswp(null);
      }
      let imgWrapp = document.getElementById(trendId);
      let imgBoxList = imgWrapp?.children;
      if (imgBoxList) {
        let imgItems = [];
        for (let imgBox of imgBoxList) {
          let img = imgBox.firstChild;
          imgItems.push({
            src: img.src,
            msrc: img.src,
            w: img.naturalWidth,
            h: img.naturalHeight
          })
        }
        this.pswp.open(imgItems, currentIndex)
      }
    },
    loadMore() {
      if (!this.hasMore) {
        return;
      }
      let essayListRequest = {
        offset: this.offset,
        limit: this.limit
      }
      ramblyJotApi.getPublicRamblyJotList(essayListRequest).then(data => {
        if (data?.result) {
          this.hasMore = data.data.hasMore;
          this.ramblyList = data.data.list;
        }
      })
    },
    formatTime
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
    this.initEngine();
    this.popoverContainer = this.$refs.popoverContainer;
  },
  created() {
    this.debounceRequestRank = debounce(this.loadMore, 800, true);
  }
}
</script>

<style scoped lang="less">
@import "../css/home/ramblyJot.less";
</style>
