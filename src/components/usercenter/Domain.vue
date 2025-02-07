<template>
  <div class="layout-module_domain un-select" ref="popoverContainer">
    <div class="userInfo-module_userWrapper">
      <div class="userInfo-module_avatarWrapper">
        <div class="ant-image">
          <b-avatar :alt="userInfo.username"
                    class="userInfo-module_avatar"
                    href="javascript:void(0)"
                    :src="fileUrl(userInfo.avatarUrl)">
          </b-avatar>
        </div>
      </div>
      <div class="userInfo-module_info">
        <div class="userInfo-module_name">
          <div>
            <span class="userInfo-module_nickname" :title="userInfo.username">
              {{ userInfo.username }}
            </span>
          </div>
          <div class="userInfo-module_level">
            <span :class="'iconfont icon-level' + userInfo.level"></span>
          </div>
        </div>
        <div class="userInfo-module_tag">
          <a-tag :color="tag.color" v-for="(tag,index) in userInfo.tags" :key="index">
            {{ tag.content }}
          </a-tag>
        </div>
        <div class="userInfo-module_description" :title="userInfo.introduction">{{ userInfo.introduction }}</div>
        <div class="userInfo-module_detail">
          <span class="index-module_meta" :title="userInfo.location">
            <span class="iconfont location"></span>
            <span>{{ userInfo.location }}</span>
          </span>
          <span class="index-module_meta" :title="userInfo.industry">
            <span class="iconfont industry"></span>
            <span>{{ userInfo.industry }}</span>
          </span>
        </div>
        <div class="userInfo-module_followInfo">
          <div class="userInfo-module_followItem">
            <p class="userInfo-module_count">{{ followCount }}</p>
            <p class="userInfo-module_label">
              <span>关注</span>
            </p>
          </div>
          <div class="userInfo-module_followItem">
            <p class="userInfo-module_count">{{ fansCount }}</p>
            <p class="userInfo-module_label">
              <span>粉丝</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="readme-module_userBoardParent">
      <div v-show="readmeEmpty" class="readme-module_empty" @click="editContent">
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
        <div class="readme-edit_action" v-show="!isEditing">
          <Button @click="domainContentDelWarn = true">
            <span class="iconfont delete"/>
          </Button>
          <Button @click="makeEngineEditor">
            <span class="iconfont bianji"/>
          </Button>
        </div>
        <div :class="['editorBase-module_editor', isEditing ? 'editing' : '']">
          <div class="layout-mode-adapt">
            <div class="toolbar-ui">
              <toolbar v-if="engine" :engine="engine" :items="items" id="toolbar" :key="isEditing"/>
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
        <div class="readme-submit_action" v-show="isEditing">
          <Button type="success"
                  class="readme-module_submitBtn"
                  :disabled="editorValueIsEmpty"
                  @click="submitDomainContent">
            <span>确定</span>
          </Button>
          <Button type="text" class="readme-module_cancel" @click="cancelEditContent">
            <span>取消</span>
          </Button>
        </div>
      </div>
    </div>
    <div class="columns-module_publicColumn">
      <div class="columns-module_header">
        <span class="header-text">
          公开专栏
        </span>
      </div>
      <div class="columns-module_column-list">
        <div v-if="columnList?.length === 0" class="column-empty">
          <span>
          还没有公开专栏，快去创建或设置吧
        </span>
        </div>
        <a-card hoverable v-for="item in columnList" :key="item.uid" size="small" class="topic-card dropdown-background">
          <img slot="cover" :alt="item.title" :src="fileUrl(item.coverUrl)"/>
          <a-card-meta>
            <template slot="description">
              <user-card :userInfo="item.userInfo"
                         :popoverContainer="popoverContainer">
                <b-avatar :src="fileUrl(item.userInfo?.avatarUrl)" variant="light" :to="'/' + item.userInfo?.domain"
                          class="topic-avatar">
                  <span v-if="!item.userInfo?.avatarUrl" class="iconfont author2" style="font-size:2.5rem;"></span>
                </b-avatar>
              </user-card>
              <a :href="'/' + item.userInfo?.domain + '/' + item.uri" target="_blank">
                <div class="card-content-item">
                  <p class="topic-title" :title="item.title">
                    {{ item.title }}
                  </p>
                  <p class="topic-description" :title="item.synopsis">
                    {{ item.synopsis }}
                  </p>
                  <p class="topic-viewCount">
                    <span>{{ item.viewCount }}</span>次看过
                  </p>
                </div>
              </a>
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </div>
    <div class="dataStats-module_hotMap">
      <hot-map></hot-map>
    </div>
    <Modal v-model="domainContentDelWarn"
           class="delete-modal"
           :width="416"
           @on-ok="deleteDomainContent"
           :transfer="false">
      <div class="modal-delete-item">
        <div class="delete-icon">
          <span class="iconfont i-warn"></span>
        </div>
        <div class="delete-tips">
          <p>确认删除 自定义主页 吗？</p>
          <p>自定义介绍清空后不可复原</p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Engine from '@aomao/engine'
import Toolbar from "@/components/common/editor/packages/toolbar/src"
import {domainPlugins, cards, pluginConfig} from "@/components/common/editor/config"
import {getParentNode} from "../common/editor/utils";
import socialApi from "@/api/SocialApi";
import userApi from "@/api/UserApi";
import {cloneDeep} from "@/utils/emoji";
import contentPicksApi from "@/api/ContentPicksApi";
import UserCard from "@/components/common/UserCard.vue";
import HotMap from "@/components/common/HotMap";

export default {
  name: 'Domain',
  data() {
    return {
      followCount: 0,
      fansCount: 0,
      engine: null,
      editorValue: null,
      // 工具栏内容：下拉面板、
      items: [
        [
          'fontsize',
          'fontcolor',
          'backcolor',
          'bold'
        ],
        [
          'unorderedlist',
          'orderedlist',
          'indent',
          'alignment'
        ],
        [
          {
            type: "button",
            name: "image-uploader",
            icon: `<span class="toolbar-icon iconfont pic-upload" style="font-size: 18px;"/>`,
            title: "图片"
          },
          'link',
          {
            type: "button",
            name: "table",
            icon: `<span class="toolbar-icon iconfont wb-table" style="font-size: 18px;"/>`,
            title: "表格"
          },
          {
            type: "button",
            name: "status",
            icon: `<span class="toolbar-icon iconfont wb-status" style="font-size: 18px;"/>`,
            title: "状态"
          },
          {
            type: "button",
            name: "lightblock",
            icon: `<span class="toolbar-icon iconfont wb-high-light" style="font-size: 18px;"/>`,
            title: "高亮块"
          }
        ]
      ],
      columnList: [],
      editorValueIsEmpty: true,
      readmeEmpty: true,
      isEditing: false,
      domainContentDelWarn: false,
      popoverContainer: null
    }
  },
  components: {
    Toolbar,
    UserCard,
    HotMap
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    finalConfig() {
      let config = cloneDeep(pluginConfig);
      config.table.enableScroll = false;
      return config;
    }
  },
  methods: {
    fileUrl(path) {
      return this.fileService + path;
    },
    editContent() {
      this.readmeEmpty = false;
      this.isEditing = true;
    },
    cancelEditContent() {
      this.isEditing = false;
      this.readmeEmpty = !this.userInfo.contentId;
      this.engine.destroy();
      this.initEngine(true);
    },
    makeEngineEditor() {
      this.isEditing = true;
      this.engine.destroy();
      this.initEngine(false);
    },
    submitDomainContent() {
      if (this.editorValueIsEmpty) {
        return;
      }
      let contentUpdate = {
        content: this.engine.getJsonValue(),
        contentId: this.userInfo.contentId
      }
      userApi.updateDomainContent(contentUpdate).then(data => {
        if (data?.result) {
          this.$Message.success("更新成功");
          this.isEditing = false;
          userApi.getUserInfo(this.userInfo.uid).then(data => {
            if (data?.result) {
              let loginUser = data.data;
              let userInfo = {...this.userInfo, ...loginUser};
              // 保存userInfo到store中
              this.$store.commit('login', userInfo);
              this.engine.destroy();
              this.initEngine(true);
            }
          })
        }
      })
    },
    deleteDomainContent() {
      if (!this.userInfo.contentId) {
        return;
      }
      userApi.deleteDomainContent(this.userInfo.contentId).then(data => {
        if (data?.result) {
          let deleteContent = {contentId: null};
          let userInfo = {...this.userInfo, ...deleteContent};
          // 保存userInfo到store中
          this.$store.commit('login', userInfo);
          this.readmeEmpty = true;
          this.engine.destroy();
          this.initEngine(false);
        }
      })
    },
    initEngine(readonly) {
      const container = this.$refs.container;
      if (container) {
        //实例化引擎
        const engine = new Engine(container, {
          // 启用插件
          plugins: domainPlugins,
          // 启用卡片
          cards,
          // 所有的插件配置
          config: this.finalConfig,
          autoPrepend: false,
          readonly: readonly,
          // 文档提示语
          placeholder: '开始设置个性主页'
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
        // 获取个人主页内容
        if (this.userInfo.contentId) {
          // 获取content
          userApi.getDomainContent(this.userInfo.contentId).then(data => {
            if (data?.result) {
              this.editorValue = data.data;
              if (this.editorValue && this.editorValue.length > 0) {
                engine.setJsonValue(JSON.parse(this.editorValue));
                if (!readonly) {
                  engine.focus();
                }
              }
            }
          })
        }
        this.engine = engine;
      }
    }
  },
  mounted() {
    this.popoverContainer = this.$refs.popoverContainer;
    const container = this.$refs.container;
    if (container) {
      //实例化引擎
      const engine = new Engine(container, {
        // 启用插件
        plugins: domainPlugins,
        // 启用卡片
        cards,
        // 所有的插件配置
        config: this.finalConfig,
        autoPrepend: false,
        // 文档提示语
        placeholder: '开始设置个性主页',
        // 阅读模式
        readonly: !this.readmeEmpty
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
      // 获取个人主页内容
      if (!this.readmeEmpty) {
        // 获取content
        userApi.getDomainContent(this.userInfo.contentId).then(data => {
          if (data?.result) {
            this.editorValue = data.data;
            if (this.editorValue && this.editorValue.length > 0) {
              engine.setJsonValue(JSON.parse(this.editorValue));
            }
          }
        })
      }
      this.engine = engine;
    }
  },
  created() {
    // 获取关注粉丝数量
    socialApi.getRelationshipCount(this.userInfo.uid).then(data => {
      if (data?.result) {
        this.followCount = data.data.follow;
        this.fansCount = data.data.fans;
      }
    })
    // 获取公开专栏
    contentPicksApi.getDomainPublicColumn(this.userInfo.uid).then(data => {
      if (data?.result) {
        this.columnList = data.data;
      }
    })
    this.readmeEmpty = !this.userInfo.contentId
  }
}
</script>

<style scoped lang="less">
@import '../css/usercenter/domain.less';
</style>
