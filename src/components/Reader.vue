<template>
  <div class="reader-route-view" ref="tooltipContainer">
    <div v-show="!spinShow">
      <div v-show="articleInfo?.uid">
        <div :class="['layout-module_contentWrapper', fullScreen ? 'full-screen' : '']" id="contentWrapper">
          <div id="header" class="layout-module_headerWrapper" :style="{ width: headerWidth}">
            <div class="header-crumb">
              <span class="header_title" :title="articleInfo.title">{{ articleInfo.title }}</span>
              <a-tooltip  v-if="articleInfo.title"
                          overlayClassName="read-header-tooltip"
                          :getPopupContainer="()=>this.$refs.tooltipContainer">
                <template slot="title">
                  {{ articleInfo.isPublic ? '互联网所有人可以访问' : '仅作者可见' }}
                </template>
                <div class="header-status-icon">
                  <span :class="['iconfont', articleInfo.isPublic ? 'public' : 'lock']"/>
                </div>
              </a-tooltip>
            </div>
            <div class="header-action">
              <Button type="success" @click="routeNavigate(docInfo)" v-if="userInfo.token && articleInfo.userId === userInfo.uid">编辑</Button>
              <a-tooltip overlayClassName="read-header-tooltip"
                         v-if="userInfo.token"
                         :getPopupContainer="()=>this.$refs.tooltipContainer">
                <template slot="title">
                  {{ collectInfo.collectId != null ? '取消收藏' : '收藏' }}
                </template>
                <div class="action-icon" @click="collectMark">
                  <Poptip :popper-class="docStyle.asyncTheme ? 'enable-background' : 'normal-background'"
                          placement="bottom-end"
                          transfer="transfer"
                          padding="0px"
                          ref="selectGroup"
                          v-model="collectPoptipShow">
                    <span :class="['iconfont', collectInfo.collectId != null ? 'collected' : 'collect']"/>
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
                            <a-checkbox :checked="collectInfo.tags && collectInfo.tags.includes(tag.uid)"
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
              <div class="action-icon" v-else>
                <auth-modal>
                  <slot>
                    <span class="iconfont collect"/>
                  </slot>
                </auth-modal>
              </div>
              <a-tooltip overlayClassName="read-header-tooltip" :getPopupContainer="()=>this.$refs.tooltipContainer">
                <template slot="title">
                  演示模式
                </template>
                <div class="action-icon" @click="presentShow()">
                  <span class="iconfont lecture"></span>
                </div>
              </a-tooltip>
              <div class="setting-icon action-icon" @click="showDocSetting = true">
                <span class="iconfont layout"/>
              </div>
            </div>
          </div>
          <div class="layout-module_bookContentWrapper beauty-scroll" ref="scrollbarContext" @wheel="handleScrollForToc">
            <div class="bookReader-module_docContainer">
              <div :class="['doc_header', docStyle.pageSize ? 'reader-ultra-wide' : 'reader-standard-wide']">
                <div class="doc_header_wrapper">
                  <h1 id="article-title" class="doc-article-title">
                    {{ articleInfo.title }}
                  </h1>
                </div>
              </div>
              <!-- 内容显示部分 -->
              <div ref="container"
                   :class="['doc-reader','am-engine', docStyle.pageSize ? 'reader-ultra-wide' : 'reader-standard-wide']">
              </div>
              <!-- 文章页脚 -->
              <div :class="docStyle.pageSize ? 'reader-ultra-wide' : 'reader-standard-wide'">
                <article-footer :ifLike="articleInfo.ifLike"
                                :likeUserList="articleInfo.likeUserList"
                                :likeCount="articleInfo.likeCount"
                                :updateTime="articleInfo.updateTime"
                                :viewCount="articleInfo.viewCount"
                                :authorInfo="authorInfo"
                                @like="likeMark"/>
              </div>
              <!-- 评论 -->
              <div :class="docStyle.pageSize ? 'reader-ultra-wide' : 'reader-standard-wide'">
                <reply-comment/>
              </div>
            </div>
          </div>
        </div>
        <div class="layout-module_asideWrapper">
          <!-- 右侧大纲展示 -->
          <div class="reader-view">
            <div class="reader-toc-pin">
          <span class="reader-toc-pin-text">
            <span class="iconfont main-point"></span>
            <span>大纲</span>
          </span>
            </div>
            <div class="reader-toc-inner beauty-scroll">
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
              <div class="doc-setting-btn delete-btn">
                <span class="iconfont delete"></span>
                <div class="tab-content-text">删除</div>
              </div>

            </div>
            <div class="drawer-setting-item time-info">
              <div class="label">文档信息</div>
              <div class="article-time">
                <span>字数统计：0</span>
                <span>创建于：2023-08-08 14:09</span>
                <span>更新于：2023-08-08 14:09</span>
              </div>
            </div>
          </div>
          <div v-if="drawerType === 1">
            <article-setting :articleId="docInfo.uid" :changePermission="true"/>
          </div>
          <div class="article-version" v-if="drawerType === 2">
            <article-version :articleId="docInfo.uid" :addNewVersion="newVersion"/>
          </div>
        </Drawer>
      </div>
      <div v-if="!articleInfo?.uid">
        <not-found></not-found>
      </div>
    </div>
    <Spin size="large" fix="fix" v-if="spinShow"></Spin>
  </div>
</template>

<script>
import Engine, {$} from '@aomao/engine'
import {plugins, cards, pluginConfig} from "./common/editor/config"
import {getTocData} from "./common/editor/utils"
import { cloneDeep } from '@/utils/emoji'
import ReplyComment from "@/components/common/replycomment/src/ReplyComment"
import ArticleFooter from "@/components/common/ArticleFooter"
import ArticleSetting from "@/components/common/ArticleSetting"
import ArticleVersion from "@/components/common/ArticleVersion"
import ContentPicksApi from "@/api/ContentPicksApi";
import NotFound from "@/components/common/404"
import AuthModal from "@/components/common/AuthModal.vue";

const event = document.createEvent('KeyboardEvent');
event.initKeyboardEvent('keydown', true, true, window, false, false, false, false, 122, 0);
export default {
  name: "ArticleRead",
  data() {
    return {
      fullScreen: false, // 全屏演示模式
      // 展示等待页面
      spinShow: false,
      tocData: [],
      currentTocId: '',
      // 更多设置内容 1文档设置，2历史版本
      drawerType: 0,
      newVersion: false,
      showDocSetting: false,
      showDeleteModal: false,
      articleInfo: {},
      collectInfo: {
        collectId: null,
        tags: []
      },
      collectTags: [],
      inputTagTmp: null,
      inputNewTag: false,
      collectPoptipShow: false,
      engine: null
    }
  },
  props: ['sidebarWidth', 'columnUri', 'articleUri', 'authorInfo'],
  computed: {
    headerWidth() {
      return 'calc(100vw - ' + ((this.fullScreen ? 0 : this.sidebarWidth) + 'px');
    },
    docStyle() {
      return this.$store.state.docStyle;
    },
    docInfo() {
      return this.$store.state.tmpDoc;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  components: {
    ReplyComment,
    ArticleFooter,
    ArticleSetting,
    ArticleVersion,
    NotFound,
    AuthModal
  },
  methods: {
    /**
     * 渲染标题大纲
     * @param engine
     */
    renderTocData(engine) {
      let tocData = getTocData(engine);
      this.tocData = (tocData && tocData instanceof Array) ? tocData : [];
    },
    // 进入演示模式相关方法
    presentShow() {
      let element = document.getElementById("contentWrapper");
      // 浏览器兼容
      if (this.fullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
    },
    checkFullscreen() {
      const isFullscreen = (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      this.fullScreen = Boolean(isFullscreen);
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
        top: title + 20
      });
    },
    /**
     * 处理滚动条滚动事件
     */
    handleScrollForToc(event) {
      if (this.tocData.length > 0) {
        let scrollbarRect = this.$refs.scrollbarContext?.getBoundingClientRect();
        if (scrollbarRect) {
          let containerTop = scrollbarRect.top + 52;
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
    returnDocSetting() {
      if (this.drawerType) {
        this.drawerType = 0;
        this.newVersion = false;
      } else {
        this.showDocSetting = false;
      }
    },
    addNewVersion() {
      this.newVersion = true;
      this.drawerType = 2;
    },
    routeNavigate() {
      this.$router.push({path: '/editor/' + this.articleInfo.uri})
    },
    collectMark() {
      if (!this.userInfo.token) {
        return;
      }
      if (this.collectInfo.collectId) {
        // 已收藏
        this.collectPoptipShow = true;
      } else {
        let collectTarget = {
          uid: this.articleInfo.collectId,
          targetId: this.articleInfo.uid,
          targetType: 1
        }
        ContentPicksApi.collectMark(collectTarget).then(data => {
          if (data?.result) {
            this.collectInfo.collectId = data.data;
            this.collectInfo.tags = [];
            this.$Message.success("收藏成功");
            this.collectPoptipShow = true;
          }
        })
      }
    },
    updateCollectTags(tagId) {
      let tags = this.collectInfo.tags;
      if (!tags) {
        tags = [tagId];
      } else if (tags.includes(tagId)) {
        // 如果包含当前tagId,则删除
        tags = tags.filter(tag => tagId !== tag);
      } else {
        // 如果不包含则添加
        tags.push(tagId);
      }
      this.collectInfo.tags = tags;
      let collectInfo = {
        targetId: this.articleInfo.uid,
        targetType: 1,
        uid: this.collectInfo.collectId,
        tags: this.collectInfo.tags
      }
      // 更新收藏分类
      ContentPicksApi.collectMark(collectInfo);
     /* if (this.$refs.selectGroup) {
        this.$refs.selectGroup.$forceUpdate();
      }*/
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
    unmark() {
      let collectTarget = {uid: this.collectInfo.collectId}
      ContentPicksApi.collectUnMark(collectTarget).then(data => {
        if (data?.result) {
          this.collectInfo.collectId = null;
          this.collectInfo.tags = [];
          this.collectPoptipShow = false;
          this.$Message.success("已取消收藏");
        }
      })
    },
    likeMark() {
      let likeAction = {
        targetId: this.articleInfo.uid,
        targetType: 1,
        action: this.articleInfo.ifLike ? 0 : 1
      }
      ContentPicksApi.contentLikeMark(likeAction).then(data => {
        if (data?.result) {
          this.articleInfo.likeCount = this.articleInfo.likeCount + (this.articleInfo.ifLike ? -1 : 1);
          if (this.articleInfo.ifLike) {
            // 取消点赞
            this.articleInfo.likeUserList = this.articleInfo.likeUserList?.filter(user => user.uid !== this.userInfo.uid);
          } else {
            this.articleInfo.likeUserList.unshift(cloneDeep(this.userInfo));
          }
          this.articleInfo.ifLike = !this.articleInfo.ifLike;
        }
      })
    },
    initReaderContent() {
      this.spinShow = true;
      // 文章内容加载
      ContentPicksApi.getArticleInfo(this.articleUri).then(data => {
        if (!data?.result) {
          this.spinShow = false;
          return;
        }
        this.articleInfo = data.data;
        this.collectInfo.collectId = data.data.collectId;
        let content = data.data.content;
        if (content?.length > 0) {
          this.engine.setJsonValue(JSON.parse(content));
          const pattern = /h[1-6]/;
          let match = content.match(pattern);
          if (match) {
            this.renderTocData(this.engine);
          }
        }
        this.spinShow = false;
        // 文章收藏情况加载
        if (this.collectInfo.collectId && this.userInfo.token) {
          ContentPicksApi.getCollectInfo(this.collectInfo.collectId).then(data => {
            if (data?.result) {
              this.collectInfo.tags = data.data?.tags;
            }
          })
        }
      })
      // 收藏标签加载
      if (this.userInfo.token) {
        ContentPicksApi.getCollectTagList().then(data => {
          if (data?.result) {
            this.collectTags = data.data;
          }
        })
      }
    }
  },
  watch: {
    articleUri() {
      this.initReaderContent();
    },
    collectPoptipShow(newVal) {
      if (newVal) {
        return;
      }
      this.inputTagTmp = null;
      this.inputNewTag = false;
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
        // 滚动条节点
        scrollNode: this.$refs.scrollbarContext.Node,
        // 阅读模式
        readonly: true
      });
      this.engine = engine;
      this.initReaderContent();
    }
    window.addEventListener('resize', this.checkFullscreen);
    // const scrollContainer = this.$refs.scrollbarContext;
    // scrollContainer?.addEventListener('scroll', this.handleScrollForToc);
    this.handleScrollForToc();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkFullscreen);
    // const scrollContainer = this.$refs.scrollbarContext;
    // scrollContainer?.removeEventListener('scroll', this.handleScrollForToc);
  }
}
</script>

<style scoped lang="less">
@import 'css/article-reader.less';
</style>
