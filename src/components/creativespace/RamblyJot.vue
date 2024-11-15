<template>
  <div class="layout-module_RamblyJot">
    <div class="rambly-jot-header">
      <h2 class="title">随笔小记</h2>
      <hr class="separator-line">
    </div>
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
            <Button type="primary" ghost @click="submitRamblyJot"
                    :disabled="editorValueIsEmpty">
              <span>小记一下</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="rambly-module_list">
      <div class="rambly-jot-wrap">
        <div class="rambly-item" v-for="item in ramblyList" :key="item.id">
          <a class="">
            <b-link to="/creative/ramblyJot/sadasd">
              <div class="post-time">
              <span>
                发布于 {{ item.postDate }}
                <span> · 赞 {{ item.likes }}</span>
                <span>· 评论 {{ item.comments }}</span>
              </span>
              </div>
            </b-link>

            <div class="post-content">
              <b-link to="/creative/ramblyJot/sadasd">
                <p>{{ item.content }}</p>
              </b-link>
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
                  <div v-for="pic in item.picList" :key="pic" class="photo" :alt="'灵感时刻-' + item.createTime"
                       :style="'background-image: url(' + pic + ');'"></div>
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
import Toolbar from "@/components/common/editor/packages/toolbar/src"
import {ramblyPlugins, ramblyCards, pluginConfig} from "@/components/common/editor/config"
import RamblyJotApi from "@/api/RamblyJotApi";

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
      ramblyList: [
        {
          id: 1256668656461,
          postDate: '1天前',
          likes: 201,
          comments: 3,
          content: '今天，带来一篇 Linux 命令总结的非常全的文章，也是我们平时工作中使用率非常高的操作命令，命令有点多，建议小伙伴们可以先收藏后阅读。今天，带来一篇 Linux 命令总结的非常全的文章，也是我们平时工作中使用率非常高的操作命令，命令有点多，建议小伙伴们可以先收藏后阅读。今天，带来一篇 Linux 命令总结的非常全的文章，也是我们平时工作中使用率非常高的操作命令，命令有点多，建议小伙伴们可以先收藏后阅读。',
          createTime: '2024-01-31 19:02:18',
          picList: [
            require('@/assets/img/6.jpg')
          ]
        },
        {
          id: 1256668656465,
          postDate: '1天前',
          likes: 201,
          comments: 3,
          content: '今天，带来一篇 Linux 命令总结的非常全的文章，也是我们平时工作中使用率非常高的操作命令，命令有点多，建议小伙伴们可以先收藏后阅读。',
          createTime: '2024-01-31 19:02:18',
          picList: null
        },
        {
          id: 1256668656462,
          postDate: '2小时前',
          likes: 201,
          comments: 3,
          content: '一、引言 在Liunx系统CentOS7.9的中部署项目遇到了Glibc版本过低的问题，使用yum安装最高只能安装Glibc2.17并不能满足要求，本文介绍了如何用源码编译的方法升级Glibc的版本。',
          createTime: '2024-01-31 19:02:18',
          picList: [
            require('@/assets/img/04.jpg'),
            require('@/assets/img/05.jpg')
          ]
        },
        {
          id: 1256668656463,
          postDate: '2024-01-11 11:32:18',
          likes: 201,
          comments: 3,
          content: '遇到的问题：设置 backdrop-filter，Safari 浏览器首次加载没效果，通过ajax请求数据翻页之后，会出现部分高斯模糊效果无效，但是windows正常。',
          createTime: '2024-01-31 19:02:18',
          picList: [
            require('@/assets/img/01.jpg'),
            require('@/assets/img/2.jpg'),
            require('@/assets/img/3.jpg')
          ]
        }
      ]
    }
  },
  methods: {
    initEngine() {
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

      // 获取正文对象
      let htmlValue = this.engine.model?.toValue();

      // 获取预览内容
      let text = this.engine?.model?.toText();
      let previewContent = '';
      if (text) {
        text = text.replace(/\r\n/g, "");
        text = text.replace(/\n/g, "");
        text = text.replace(" ", "");
        // 判断是否需要提取摘要
        previewContent = text.substr(0, 147);
        if (text.length > 147) {
          previewContent += "...";
        }
      }

      // 获取图片文件
      let nodeArray = this.engine.container
        .find('[data-card-key="image"]')
        .toArray()
        .filter(image => {
          return image.find("img").length > 0
        });
      debugger
      let previewImg = nodeArray.slice(0, 3).map(node => {
        let card = this.engine.card.find(node);
        let value = card?.getValue();
        let imgUrl = value?.src.replace(this.fileService, '');
        return imgUrl;
      })
      let ramblyInfo = {
        content: htmlValue,
        previewContent,
        previewImg
      }
      RamblyJotApi.saveRamblyJot(this, ramblyInfo).then(data => {
        if (data?.result) {
          this.$Message.success("发表成功")
          this.ramblyList.unshift(data.data);
          this.engine.destroy();
          this.initEngine();
        }
      })
    }
  },
  components: {
    Toolbar
  },
  mounted() {
    this.initEngine()
  }
}
</script>

<style scoped lang="less">
@import "../css/creativespace/ramblyJot.less";
</style>
