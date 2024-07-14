<template>
  <div class="layout-module_domain">
    <div class="userInfo-module_userWrapper">
      <div class="userInfo-module_avatarWrapper">
        <div class="ant-image">
          <b-avatar alt="小黑bu惑"
                    class="userInfo-module_avatar"
                    href="javascript:void(0)"
               src="https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://tvax2.sinaimg.cn/large/006BNqYCly1hosf11gmg0j30x81duk9x.jpg">
          </b-avatar>
        </div>
      </div>
      <div class="userInfo-module_info">
        <div class="userInfo-module_name">
          <div>
            <span class="userInfo-module_nickname" title="布衣草人">
              布衣草人
            </span>
          </div>
          <div class="userInfo-module_level">
            <span :class="'iconfont icon-level' + 6"></span>
          </div>
        </div>
        <div class="userInfo-module_tag">
          <a-tag :color="tag.color" v-for="(tag,index) in userInfo.tags" :key="index">
            {{tag.content}}
          </a-tag>
        </div>
        <div class="userInfo-module_description">我生来就是高山而非溪流，我欲于群峰之巅俯视平庸的沟壑</div>
        <div class="userInfo-module_detail">
          <span class="index-module_meta">
            <span class="iconfont location"></span>
            <span>天下为公</span>
          </span>
          <span class="index-module_meta">
            <span class="iconfont industry"></span>
            <span>新时代『农民工』</span>
          </span>
        </div>
        <div class="userInfo-module_followInfo">
          <a href="/explore/follows?type=User&userId=27044221" class="userInfo-module_followItem"
             target="_blank">
            <p class="userInfo-module_count">18</p>
            <p class="userInfo-module_label">
              <span>关注</span>
            </p>
          </a>
          <a href="/explore/follows?type=Fans&userId=27044221" class="userInfo-module_followItem"
             target="_blank">
            <p class="userInfo-module_count">211</p>
            <p class="userInfo-module_label">
              <span>粉丝</span>
            </p>
          </a>
          <div></div>
          <div class="userInfo-module_followingFollowers">
            <div class="FollowingFollowers-module_followItemLine"></div>
            <p class="FollowingFollowers-module_info_lD4gv">
              <a class="FollowingFollowers-module_users_jY6FN" href="/kanding" target="_blank">
                <img loading="lazy" data-testid="img-avatar" src="" class="img" alt=""
                     style="width: 18px; min-width: 18px; height: 18px; border-radius: 9px;">
                <span>njnj</span>
              </a>
              <span class="FollowingFollowers-module_text">
                等<b class="larkui-popover-trigger">1</b>人也关注了他
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="readme-module_userBoardParent">
      <div v-show="readmeEmpty" class="readme-module_empty" @click="readmeEmpty = false">
        <p class="readme-module_emptyTitle">
          <span class="iconfont add"></span>
          添加自定义介绍
        </p>
        <p class="readme-module_emptyDesc">
          可以参考
          <a href="https://www.yuque.com/yuque/mgcsc6/obl3qs" target="_blank">案例</a>
        </p>
        <p class="Readme-module_emptyDesc">没有自定义介绍时，访客视角没有这个模块</p>
      </div>
      <div v-show="!readmeEmpty" class="readme-module_editor">
        <div class="editorBase-module_editor">
          <div class="layout-mode-adapt">
            <div class="toolbar-ui">
              <toolbar v-if="engine" :engine="engine" :items="items" id="toolbar" :mounted="toolbarUI()"/>
            </div>
            <div class="editor-body">
              <div class="editor-wrapper">
                <div class="editor-wrap-content">
                  <div class="editor-outer-wrap-box">
                    <div class="editor-wrap-box">
                      <div class="readme-editor" ref="container"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="readme-module_action">
          <Button type="success" class="readme-module_submitBtn" :disabled="editorValueIsEmpty">
            <span>确定</span>
          </Button>
          <Button type="text" class="readme-module_cancel" @click="readmeEmpty = true">
            <span>取消</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Engine from '@aomao/engine'
  import {$} from '@aomao/engine'
  import Toolbar from 'am-editor-toolbar-vue2'
  import {plugins, cards, pluginConfig, HightLightIcon} from "@/components/common/editor/config"
  import {getParentNode} from "../common/editor/utils";

  export default {
    name: 'Domain',
    data() {
      return {
        userInfo: {
          nickname: '布衣草人',
          level: 6,
          follow: true,
          tags: [
            {content: '自我驱动', color: 'blue'},
            {content: '坚持不懈', color: 'red'},
            {content: '目标大厂', color: 'orange'},
            {content: '年薪百万', color: 'green'}
          ]
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
                    'file-uploader',
                    'video-uploader',
                    'math',
                    'status',
                    {
                      name: 'lightblock',
                      icon: HightLightIcon,
                      title: '高亮块'
                    }
                  ]
                }
              ]
            }
          ],
          ['heading', 'bold', 'orderedlist', 'unorderedlist', 'link']
        ],
        editorValueIsEmpty: true,
        readmeEmpty: true
      }
    },
    components: {
      Toolbar
    },
    methods: {
      toolbarUI() {
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
          placeholder: '输入 / 唤起更多'
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
          let range = engine.change.range.get();
          let collapsed = range?.collapsed;
          let startNode = collapsed ? range.startNode : range.endNode;
          let parentNode = getParentNode(startNode);
          // 处理status影响其他文字
          let children = parentNode?.children("span[data-card-key=\"status\"]");
          if (children !== undefined && children.length !== 0) {
            // 给当前节点去掉样式
            startNode.removeAttributes('style')
            startNode.allChildren().forEach(child => child?.removeAttributes('style'))
          }

          this.editorValueIsEmpty = engine.isEmpty();
        });

        if (this.editorValue && this.editorValue.length > 0) {
          engine.setJsonValue(JSON.parse(this.editorValue))
        }

        this.engine = engine;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../css/setting/domain.less';
</style>
