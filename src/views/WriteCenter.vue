<template>
  <div :class="['editor-center', docStyle.asyncTheme ? 'enable-background' : 'normal-background']"
       ref="TooltipContainer">
    <b-row class="editor-header">
      <div class="left-dropdown-wrapp">
        <Dropdown trigger="click"
                  :transfer-class-name="docStyle.asyncTheme ? 'dropdown-background dropdown-item-all-hover' : ''"
                  placement="bottom-start">
          <div class="menu-icon">
            <span class="iconfont menu-dots"/>
          </div>
          <DropdownMenu slot="list">
            <DropdownItem>
              <div @click="routerPush('/')" class="quick-menu">
                <span class="iconfont home"/>
                首页
              </div>
            </DropdownItem>
            <DropdownItem>
              <div class="quick-menu" @click="routerPush('/user')">
                <span class="iconfont person-info"/>
                个人中心
              </div>
            </DropdownItem>
            <DropdownItem>
              <div class="quick-menu" @click="routerPush('/dashboard')">
                <span class="iconfont creation-center"/>
                创作空间
              </div>
            </DropdownItem>
            <DropdownItem>
              <div class="quick-menu" @click="saveAndNewDoc">
                <span class="iconfont i-add"/>
                新建文章
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <b-list-group class="title-info" flush>
        <b-list-group-item class="title">
          {{ articleInfo.title === null || articleInfo.title.length === 0 ? '无标题文档' : articleInfo.title }}
        </b-list-group-item>
        <b-list-group-item class="author-info">
          <a href="/">{{ userInfo.username }}</a>
          <span v-if="articleInfo.columnId">
            <span style="color: #d9d9d9;margin: 0 8px 0 8px;">/</span>
            <a href="">{{ articleInfo.columnName }}</a>
          </span>
          <span style="color: #d9d9d9;margin: 0 8px 0 8px;">|</span>
          <span class="update-time un-select">
            最后更新于 {{ formatTime(articleInfo.updateTime) }}
            <span class="iconfont cloud" v-if="articleUpdateStatus === 0"/>
            <span class="iconfont update-ing" v-if="articleUpdateStatus === 1"/>
            <span class="iconfont cloud-fail" v-if="articleUpdateStatus === -1"/>
          </span>
        </b-list-group-item>
      </b-list-group>
      <div class="editor-setting">
        <a-tooltip overlayClassName="read-header-tooltip" :getPopupContainer="()=>this.$refs.TooltipContainer">
          <template slot="title">
            <span>已开启自动发布，内容将自动更新至阅读页面，亦可手动点击更新</span>
          </template>
          <Button class="update-btn" type="success" @click="updateDocConten">
            发布
          </Button>
        </a-tooltip>

        <div class="setting-icon action-icon" @click="showDocSetting = true">
          <span class="iconfont layout"/>
        </div>
        <Drawer :closable="false"
                :mask-closable="drawerType === 0"
                :transfer="false"
                :width="17"
                class="un-select article-drawer"
                v-model="showDocSetting">
          <div slot="header" @click="returnDocSetting">
            <span class="iconfont return"/>
            <span>{{ drawerType === 1 ? '文档设置' : drawerType === 2 ? '历史版本' : '返回' }}</span>
          </div>
          <div class="operate-and-info" v-show="drawerType === 0">
            <div class="drawer-setting-item font-size">
              <div class="label-wrapper">
                <div class="icon-wrapper">
                  <span class="iconfont font"></span>
                </div>
              </div>
              <div class="font-select">
                <div class="slider-module_slideTitle">
                  <span>正文大小</span>
                  <div class="selected-font-size">{{ docStyle.docFontSize }}px</div>
                </div>
                <div class="select-point">
                  <div class="slider-module_slideContainer un-select" @mouseenter="fontSizeShowSelect = true"
                       @mouseleave="fontSizeShowSelect = false">
                    <div class="ant-slider ant-slider-with-marks classic">
                      <div class="ant-slider-rail"></div>
                      <div class="ant-slider-step">
                        <div v-for="(item,index) in fontSizeRange"
                             :key="index"
                             @click="changeFontSize(item)"
                             :sdsd="index"
                             class="slider-dot-wrapp"
                             :style="'left: '+ index * 100/(fontSizeRange.length-1) + '%;'">
                          <span class="slider-dot"/>
                        </div>
                      </div>
                      <div :class="['ant-slider-handle', fontSizeShowSelect ? 'show-select-font' : '']"
                           :style="'left: ' +
                            (currentFontIndex === 0 ? '3.5' : currentFontIndex === (fontSizeRange.length -1) ? '97' : (currentFontIndex * 100/(fontSizeRange.length-1))) +
                           '%;'">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="drawer-setting-item page-size">
              <div class="label-wrapper">
                <div class="icon-wrapper">
                  <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"
                       class="larkui-icon Select-module_iconSvg"
                       data-name="DocAdapt" style="width: 28px; min-width: 28px; height: 28px;">
                    <g fill="#00B96B" fill-rule="evenodd">
                      <rect width="25" height="28" rx="3" opacity="0.3"></rect>
                      <rect x="4" y="5" width="18" height="3" rx="1.5"></rect>
                      <rect x="4" y="10" width="18" height="3" rx="1.5"></rect>
                      <rect x="4" y="15" width="16" height="3" rx="1.5"></rect>
                      <rect x="4" y="20" width="14" height="3" rx="1.5" opacity="0.3"></rect>
                      <rect x="4" y="20" width="6" height="3" rx="1.5"></rect>
                    </g>
                  </svg>
                </div>
                <div>
                  <div class="label">超宽模式</div>
                  <div class="label_desc">文档宽度适应屏幕大小</div>
                </div>
              </div>
              <i-switch v-model="docStyle.pageSize"
                        :true-value="1"
                        class="switch-btn"
                        size="small">
                <span slot="1"/>
                <span slot="0"/>
              </i-switch>
            </div>
            <div class="drawer-setting-item theme-sync">
              <div class="label-wrapper">
                <div class="icon-wrapper">
                  <span class="iconfont custome-theme"></span>
                </div>
                <div>
                  <div class="label">主题同步</div>
                  <div class="label_desc">阅读页面同步显示自定义主题</div>
                </div>
              </div>
              <i-switch v-model="docStyle.asyncTheme"
                        :true-value="1"
                        class="switch-btn"
                        size="small">
                <span slot="1"/>
                <span slot="0"/>
              </i-switch>
            </div>
            <div class="drawer-setting-item more-setting">
              <div class="doc-setting-btn" @click="drawerType = 1">
                <span class="iconfont setting"></span>
                <div class="tab-content-text">文档设置</div>
              </div>
              <Divider/>
              <div class="doc-setting-btn" @click="drawerType = 2">
                <span class="iconfont history"></span>
                <div class="tab-content-text">查看历史版本</div>
              </div>
              <div class="doc-setting-btn save-version" @click="addNewVersion">
                <div class="tab-content-text">保存为版本</div>
              </div>
              <Divider/>
              <div class="doc-setting-btn delete-btn" @click="showDeleteModal = true">
                <span class="iconfont delete"></span>
                <div class="tab-content-text">删除</div>
              </div>

            </div>
            <div class="drawer-setting-item time-info">
              <div class="label">文档信息</div>
              <div class="article-time">
                <span>字数统计：{{ articleInfo.wordsNum }}</span>
                <span>创建于：{{ formatTime(articleInfo.createTime) }}</span>
                <span>更新于：{{ formatTime(articleInfo.updateTime) }}</span>
              </div>
            </div>
          </div>
          <div v-if="drawerType === 1">
            <article-setting :currentArticle="articleInfo" :changePermission="true" @updateArticle="updateArticleForSetting"/>
          </div>
          <div v-if="drawerType === 2">
            <article-version :articleId="articleInfo.uid" :addNewVersion="newVersion"/>
          </div>
        </Drawer>
        <Modal v-model="showDeleteModal"
               :class-name="docStyle.asyncTheme ? 'delete-modal delete-modal-ct' : 'delete-modal'"
               :width="416"
               :transfer="false"
               :footer-hide="true">
          <div class="delete-tips">
            <span class="iconfont i-warn"></span>
            确认删除 {{ articleInfo.title }} ？
          </div>
          <div class="confirm-btn">
            <Button :class="docStyle.asyncTheme ? 'ghost-btn' : ''">取消</Button>
            <Button type="success">确定</Button>
          </div>
        </Modal>
      </div>
    </b-row>
    <b-row class="editor-root">
      <editor v-if="articleInfo.uid"
              @updateArticle="updateArticleForEditor"
              :articleInfo="articleInfo"
              ref="editorContainer">
      </editor>
    </b-row>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import {formatTime} from '@/utils/emoji'
import ArticleSetting from "@/components/common/ArticleSetting"
import ArticleVersion from "@/components/common/ArticleVersion"
import WriteCenterApi from "@/api/WriteCenterApi";

export default {
  name: 'WriteCenter',
  beforeRouteEnter(to, from, next) {
    next(vc => {
      // 通过 `vc` 访问组件实例
      WriteCenterApi.getArticleForEdit(vc, vc.articleId).then(data => {
        if (data?.result) {
          vc.articleInfo = data.data
          next();
        }
      })
    })
  },
  data() {
    return {
      articleInfo: {
        uid: null,
        title: null,
        wordsNum: 0,
        summary: null
      },
      // 1更新中，0更新完成，-1更新失败
      articleUpdateStatus: 0,
      newVersion: false,
      fontSizeRange: [12, 13, 14, 15, 16, 17, 18, 19],
      showDocSetting: false,
      showDeleteModal: false,
      // 更多设置内容 1文档设置，2历史版本
      drawerType: 0,
      fontSizeShowSelect: false
    }
  },
  props: ['articleId'],
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    currentFontIndex() {
      return this.fontSizeRange.findIndex(
        (item) => item === this.docStyle.docFontSize
      );
    },
    docStyle() {
      return this.$store.state.docStyle;
    }
  },
  methods: {
    /**
     * 手动更新文档内容
     */
    updateDocConten() {
      let engine = this.$refs.editorContainer?.engine;
      if (engine) {
        let value = engine.model.toValue();
        console.dir(value)
      }
    },
    /**
     * 为子组件定义的事件方法
     */
    updateArticleForEditor(articleInfo) {
      this.articleInfo.title = articleInfo.title;
      this.articleInfo.wordsNum = articleInfo.wordsNum;
      this.articleUpdateStatus = articleInfo.status;
      if (articleInfo.status === 0) {
        this.articleInfo.updateTime = articleInfo.updateTime;
      }
      if (articleInfo.autoSummary === 1) {
        this.articleInfo.summary = articleInfo.summary;
      }
    },
    /**
     * 子组件上报更新信息
     */
    updateArticleForSetting(articleInfo) {
      this.articleInfo = {...this.articleInfo, ...articleInfo}
      this.returnDocSetting();
    },
    changeFontSize(value) {
      this.docStyle.docFontSize = value;
    },
    routerPush(path) {
      this.$router.push({path: path})
    },
    addNewVersion () {
      this.newVersion = true;
      this.drawerType = 2;
    },
    returnDocSetting() {
      if (this.drawerType) {
        this.drawerType = 0;
        this.newVersion = false;
      } else {
        this.showDocSetting = false;
      }
    },
    saveAndNewDoc() {
    },
    formatTime
  },
  components: {
    Editor,
    ArticleSetting,
    ArticleVersion
  }
}
</script>

<style scoped lang="less">
  @import '../components/css/write-center.less';
</style>
