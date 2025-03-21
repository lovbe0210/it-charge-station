<template>
  <div class="reader-route-view" ref="tooltipContainer">
    <div class="ColumnOverview-module">
      <div class="ColumnOverview-module_columnHead">
        <div :class="['ColumnOverview-module_bookTitle', renameTitle ? 'rename-title' : '']">
          <span class="ColumnOverview-module_bookIcon">
            <span class="iconfont book"/>
          </span>
          <Input type="text"
                 v-if="renameTitle"
                 ref="renameInput"
                 v-model="tmpTitle"
                 :placeholder="columnInfo.title"
                 maxlength="30"
                 @on-enter="columnTitleRename"
                 @on-blur="columnTitleRename"
          />
          <span v-else
                class="ColumnOverview-module_bookName"
                :title="columnInfo.title">{{ columnInfo.title }}
          </span>
        </div>
        <div class="ColumnOverview-module_action">
          <div class="ColumnOverview-module_bookAction">
            <a-tooltip overlayClassName="read-header-tooltip"
                       v-if="loginStatus"
                       placement="top"
                       :getPopupContainer="()=>this.$refs.tooltipContainer">
              <template slot="title">
                {{ columnInfo.collectId != null ? '取消收藏' : '收藏' }}
              </template>
              <div class="action-collect" @click="collectMark">
                <Poptip :popper-class="parentDocStyle.docThemeSync ? 'enable-background' : 'normal-background'"
                        placement="bottom-end"
                        transfer="transfer"
                        padding="0px"
                        ref="selectGroup"
                        v-model="collectPoptipShow">
                  <span>
                    <span :class="['iconfont', columnInfo.collectId != null ? 'collected' : 'collect']"/>
                    <span>{{ columnInfo.collectId != null ? '已收藏' : '收藏' }}</span>
                  </span>
                  <div slot="content" class="select-group">
                    <div class="select-group-title">
                      <p class="select-group-p1">选择分组</p>
                      <p class="select-group-p2">你可以选择分组或直接
                        <a @click="unmark">取消收藏</a>
                      </p>
                    </div>
                    <div class="select-group-tags beauty-scroll">
                      <div v-if="inputNewTag" class="select-group-tags-check">
                        <label class="select-group-tags-checkboxWrapper">
                          <a-checkbox :checked="false"></a-checkbox>
                          <span class="checkbox-label">
                        <Input v-model="inputTagTmp"
                               id="newTagInput"
                               size="small"
                               :autofocus="true"
                               @on-blur="completeAddTag"
                               @on-enter="completeAddTag1"
                               placeholder="请输入分组名称"
                               maxlength="30"/>
                      </span>
                        </label>
                      </div>
                      <div class="select-group-tags-check" v-for="tag in collectTags"
                           :key="tag.uid">
                        <label class="select-group-tags-checkboxWrapper">
                          <a-checkbox :checked="columnInfo.tags && columnInfo.tags.includes(tag.uid)"
                                      @change="updateCollectTags(tag.uid)">
                          </a-checkbox>
                          <span class="checkbox-label" :title="tag.title">{{ tag.title }}</span>
                        </label>
                      </div>
                    </div>
                    <div class="select-group-footer" @click="inputNewTag = true">
                      <span class="iconfont add"></span>
                      新建分组
                    </div>
                  </div>
                </Poptip>
              </div>
            </a-tooltip>
            <div class="action-collect" v-else @click="login">
              <span class="iconfont collect"/>
            </div>
            <Dropdown placement="bottom-end"
                      @on-click="routeNavigate"
                      transfer-class-name="dropdown-background dropdown-item-all-hover"
                      trigger="click">
              <a href="javascript:void(0)">
                <div class="action-more" v-if="loginStatus && authorInfo.uid === userInfo.uid">
                  <div class="menu-btn">
                    <span class="iconfont operate"></span>
                  </div>
                </div>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="rename">
                    <span>
                      <span class="iconfont rename"/> 重命名
                    </span>
                </DropdownItem>
                <DropdownItem name="editor">
                    <span>
                      <span class="iconfont bianji"/> 编辑首页
                    </span>
                </DropdownItem>
                <DropdownItem name="setting">
                    <span>
                      <span class="iconfont setting"/> 专栏设置
                    </span>
                </DropdownItem>
                <DropdownItem class="line">
                    <span class="line-block">
                    </span>
                </DropdownItem>
                <DropdownItem name="delete">
                    <span>
                      <span class="iconfont delete"/> 删除
                    </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div class="ColumnOverview-module_statistics">
        <span class="ColumnOverview-module_docCount">
          <b class="ColumnOverview-module_count">{{ columnInfo.articleCount }}</b> 文档
        </span>
        <span class="ColumnOverview-module_wordCount">
          <b class="ColumnOverview-module_count">{{ columnInfo.totalWords }}</b> 字
        </span>
      </div>
      <div class="ColumnOverview-module_content">
        <div class="ColumnOverview-module_userBoard">
          <div ref="container"></div>
        </div>
      </div>
    </div>
    <Modal
      v-model="deleteColumn"
      title="删除专栏"
      :class-name="parentDocStyle?.docThemeSync ? 'delete-confirm' : 'delete-confirm normal-background'"
      :footer-hide="true">
      <div class="delete-warn">
        <div class="warn-content un-select">
          <span class="iconfont i-warn"></span>
          <span>
              正在删除专栏
              <span class="column-name">
                {{ columnInfo.title }}
              </span>
              ，该操作不可逆，一旦操作成功，专栏下的所有内容将会删除。请输入下面内容再次确认操作。
            </span>
        </div>
        <div class="warn-confirm">
          <span>请在下方输入框中输入 “{{ columnInfo.uri }}” 以确认操作</span>
          <Input type="text"
                 :class="['confirm-input', cannotDelete ? 'cannot-delete' : '']"
                 @on-change="cannotDelete = false"
                 :clearable="cannotDelete"
                 v-model="tmpValue"/>
          <span v-if="cannotDelete" class="tips">请按提示重新输入</span>
        </div>
        <div>
          <Button type="error" class="warn-btn" @click="columnDelete">
            <span class="column-name">确定删除 {{ columnInfo.title }}</span>
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import socialApi from "@/api/SocialApi";
import ContentPicksApi from "@/api/ContentPicksApi";
import Engine from '@aomao/engine'
import {domainPlugins, cards, pluginConfig} from "@/components/common/editor/config"
import {cloneDeep} from "@/utils";
import contentPicksApi from "../../api/ContentPicksApi";
import writeCenterApi from "../../api/WriteCenterApi";
import WriteCenterApi from "../../api/WriteCenterApi";

export default {
  name: "SColumnReadHome",
  data() {
    return {
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
      engine: null,
      collectPoptipShow: false,
      deleteColumn: false,
      cannotDelete: false,
      renameTitle: false,
      tmpTitle: null,
      tmpValue: null,
      columnInfo: {
        collectId: null,
        tags: []
      },
      collectTags: [],
      inputNewTag: false,
      inputTagTmp: null
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    loginStatus() {
      let userInfo = this.$store.state.userInfo
      return userInfo !== null && userInfo.token?.length === 32
    },
    finalConfig() {
      let config = cloneDeep(pluginConfig);
      config.table.enableScroll = false;
      return config;
    }
  },
  props: ['columnUri', 'authorInfo', 'parentDocStyle'],
  methods: {
    collectMark() {
      if (!this.loginStatus) {
        return;
      }
      if (this.columnInfo.collectId) {
        // 已收藏
        this.collectPoptipShow = true;
      } else {
        let collectTarget = {
          uid: this.articleInfo.collectId,
          targetId: this.articleInfo.uid,
          targetType: 1
        }
        socialApi.collectMark(collectTarget).then(data => {
          if (data?.result) {
            this.columnInfo.collectId = data.data;
            this.columnInfo.tags = [];
            this.$Message.success("收藏成功");
            this.collectPoptipShow = true;
          }
        })
      }
    },
    unmark() {
      let collectTarget = {uid: this.columnInfo.collectId}
      socialApi.collectUnMark(collectTarget).then(data => {
        if (data?.result) {
          this.columnInfo.collectId = null;
          this.columnInfo.tags = [];
          this.collectPoptipShow = false;
          this.$Message.success("已取消收藏");
        }
      })
    },
    updateCollectTags(tagId) {
      let tags = this.columnInfo.tags;
      if (!tags) {
        tags = [tagId];
      } else if (tags.includes(tagId)) {
        // 如果包含当前tagId,则删除
        tags = tags.filter(tag => tagId !== tag);
      } else {
        // 如果不包含则添加
        tags.push(tagId);
      }
      this.columnInfo.tags = tags;
      let collectInfo = {
        targetId: this.articleInfo.uid,
        targetType: 1,
        uid: this.columnInfo.collectId,
        tags: this.columnInfo.tags
      }
      // 更新收藏分类
      socialApi.collectMark(collectInfo);
    },
    completeAddTag1() {
      let element = document.getElementById("newTagInput");
      if (element) {
        element.click();
      }
    },
    completeAddTag() {
      if (!this.inputTagTmp) {
        return;
      }
      // 新建标签
      let tagInfo = {
        title: this.inputTagTmp
      }
      ContentPicksApi.createCollectTag(tagInfo).then(data => {
        if (data?.result) {
          this.inputNewTag = false;
          this.inputTagTmp = null;
          // 刷新收藏分类
          ContentPicksApi.getCollectTagList().then(data => {
            if (data?.result) {
              this.collectTags = data.data;
            }
          })
          // 更新收藏分组信息
          this.updateCollectTags(data.data);
        }
      });
    },
    login() {
      let loginBtn = document.getElementById("pwdLoginBtn");
      if (loginBtn) {
        loginBtn.click();
      } else {
        console.log("没有找到登录盒子")
      }
    },
    routeNavigate(actionName) {
      switch (actionName) {
        case "rename":
          this.renameTitle = true;
          this.tmpTitle = this.columnInfo.title;
          this.$nextTick(() => {
            console.log(this.$refs.renameInput[0])
            console.log(this.$refs.renameInput[1])
            this.$refs.renameInput.focus({
              cursor: 'end'
            });
          })
          break;
        case "setting":
          this.$router.push({
            path: '/creative/column/setting/' + this.columnInfo.uid
          })
          break;
        case "delete":
          this.deleteColumn = true;
          break;
      }
    },
    columnTitleRename() {
      // 比较标题是否有变化
      if (!this.tmpTitle || this.tmpTitle === this.columnInfo.title) {
        this.renameTitle = false;
        this.tmpTitle = null;
        return;
      }
      let columnInfo = new FormData();
      columnInfo.append("uid", this.columnInfo.uid)
      columnInfo.append("title", this.tmpTitle)
      WriteCenterApi.updateColumnInfo(columnInfo).then(data => {
        if (data?.result) {
          this.columnInfo.title = this.tmpTitle;
          this.tmpTitle = null;
          this.renameTitle = false;
          this.$Message.success('修改成功');
        }
      })
    },
    columnDelete() {
      if (this.tmpValue !== this.columnInfo?.uri) {
        this.cannotDelete = true;
      } else {
        let columnInfo = { uid: this.columnInfo.uid }
        WriteCenterApi.deleteColumn(columnInfo).then(data => {
          if (data?.result) {
            this.deleteColumn = false;
            this.$Message.success('删除成功');
            setTimeout(() => {
              this.$router.push({path: '/'})
            }, 500)
          }
        })
      }
    }
  },
  watch: {
    collectPoptipShow(newVal) {
      if (newVal) {
        return;
      }
      this.inputTagTmp = null;
      this.inputNewTag = false;
    },
    "deleteColumn"(val) {
      if (!val) {
        this.cannotDelete = false;
        this.tmpValue = '';
      }
    }
  },
  created() {
    // 获取专栏信息
    contentPicksApi.getColumnInfo(this.columnUri).then(data => {
      if (data?.result) {
        this.columnInfo = data.data;
        if (!this.columnInfo.homeContentId) {
          return;
        }
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
            placeholder: '',
            // 阅读模式
            readonly: true
          });
          // 设置显示成功消息UI，默认使用 console.log
          engine.messageSuccess = (msg) => {
            console.log(msg);
          };
          // 设置显示错误消息UI，默认使用 console.error
          engine.messageError = (error) => {
            console.log(error);
          };

          // 获取专栏首页自定义内容
          writeCenterApi.getArticleContent(this.columnInfo.homeContentId).then(data => {
            if (data?.result) {
              let content = data.data.content;
              if (content?.length > 0) {
                engine.setJsonValue(JSON.parse(content));
              }
            }
          })
          this.engine = engine;
        }
      }
    })
    // 收藏标签加载
    if (this.loginStatus) {
      ContentPicksApi.getCollectTagList().then(data => {
        if (data?.result) {
          this.collectTags = data.data;
        }
      })
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped lang="less">
@import "../css/column-home";
</style>
