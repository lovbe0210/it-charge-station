<template>
  <div class="reader-route-view" ref="tooltipContainer">
    <div v-show="!spinShow">
      <div v-show="articleInfo?.uid">
        <div :class="['layout-module_contentWrapper', fullScreen ? 'full-screen' : '']">
          <div id="header" class="layout-module_headerWrapper" :style="{ width: headerWidth}">
            <div class="header-crumb">
              <span class="header_title" :title="articleInfo.title">{{ articleInfo.title }}</span>
              <a-tooltip v-if="articleInfo.title"
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
              <Button type="success" @click="routeNavigate"
                      v-if="loginStatus && articleInfo.userId === userInfo.uid">编辑
              </Button>
              <a-tooltip overlayClassName="read-header-tooltip"
                         v-if="loginStatus"
                         :getPopupContainer="()=>this.$refs.tooltipContainer">
                <template slot="title">
                  {{ collectInfo.collectId != null ? '取消收藏' : '收藏' }}
                </template>
                <div class="action-icon" @click="collectMark">
                  <Poptip :popper-class="docStyle.docThemeSync ? 'enable-background' : 'normal-background'"
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
              <div class="action-icon" v-else @click="login">
                <span class="iconfont collect"/>
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
          <div class="layout-module_bookContentWrapper">
            <div id="contentWrapper"
                 ref="scrollbarContext"
                 class="bookReader-module_docContainer beauty-scroll">
              <div :class="['doc_header', docStyle.docStylePageSize ? 'reader-ultra-wide' : 'reader-standard-wide']">
                <div class="doc_header_wrapper">
                  <h1 id="article-title" class="doc-article-title">
                    {{ articleInfo.title }}
                  </h1>
                </div>
              </div>
              <!-- 内容显示部分 -->
              <div ref="container"
                   :class="['doc-reader','am-engine', docStyle.docStylePageSize ? 'reader-ultra-wide' : 'reader-standard-wide']">
              </div>
              <!-- 文章页脚 -->
              <div :class="docStyle.docStylePageSize ? 'reader-ultra-wide' : 'reader-standard-wide'" v-show="!fullScreen">
                <article-footer :ifLike="articleInfo.ifLike"
                                :likeUserList="articleInfo.likeUserList"
                                :likeCount="articleInfo.likeCount"
                                :updateTime="articleInfo.updateTime"
                                :viewCount="articleInfo.viewCount"
                                :authorInfo="authorInfo"
                                @like="likeMark"/>
              </div>
              <!-- 评论 -->
              <div :class="docStyle.docStylePageSize ? 'reader-ultra-wide' : 'reader-standard-wide'" v-show="!fullScreen">
                <reply-comment :targetId="articleInfo.uid" :targetType="1"/>
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
              <i-switch v-model="docStyle.docStylePageSize"
                        :true-value="1"
                        :false-value="0"
                        @on-change="changeDocStyle"
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
              <i-switch v-model="docStyle.docThemeSync"
                        :true-value="1"
                        :false-value="0"
                        @on-change="changeDocStyle"
                        class="switch-btn"
                        size="small">
                <span slot="1"/>
                <span slot="0"/>
              </i-switch>
            </div>
            <div class="drawer-setting-item more-setting" v-if="loginStatus && articleInfo.userId === userInfo.uid">
              <div class="doc-setting-btn" @click="drawerType = 1">
                <span class="iconfont setting"></span>
                <div class="tab-content-text">文档设置</div>
              </div>
              <Divider/>
<!--              <div class="doc-setting-btn" @click="drawerType = 2">-->
              <div class="doc-setting-btn">
                <span class="iconfont history"></span>
                <div class="tab-content-text">查看历史版本</div>
              </div>
<!--              <div class="doc-setting-btn save-version" @click="addNewVersion">-->
              <div class="doc-setting-btn save-version">
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
            <article-setting :articleUri="articleUri" :changePermission="true"/>
          </div>
          <div class="article-version" v-if="drawerType === 2">
            <article-version :articleId="articleInfo?.uid" :addNewVersion="newVersion"/>
          </div>
        </Drawer>
      </div>
      <div v-if="!articleInfo?.uid">
        <not-found></not-found>
      </div>
      <div :class="['back-top', docStyle.docThemeSync === 1 ? 'enable-background-backTop' : '']" v-show="backTopShow" @click="backTop">
        <span class="iconfont to-top"/>
      </div>
    </div>
    <Spin size="large" fix="fix" v-if="spinShow"></Spin>
  </div>
</template>

<script>
import Engine, {$} from '@aomao/engine'
import {plugins, cards, pluginConfig} from "./common/editor/config"
import {getTocData} from "./common/editor/utils"
import {debounce, cloneDeep} from '@/utils'
import ReplyComment from "@/components/common/replycomment/src/ReplyComment"
import ArticleFooter from "@/components/common/ArticleFooter"
import ArticleSetting from "@/components/common/ArticleSetting"
import ArticleVersion from "@/components/common/ArticleVersion"
import ContentPicksApi from "@/api/ContentPicksApi";
import NotFound from "@/components/common/404"
import socialApi from "@/api/SocialApi";

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
      // 浏览进度汇报的防抖函数
      debounceReportView: function () {
      },
      engine: null,
      // 样式相关
      docStyle: {},
      scrollTop: 0,
      backTopHeight: 300,
      backTopShow: false
    }
  },
  props: ['sidebarWidth', 'columnUri', 'articleUri', 'authorInfo', 'parentDocStyle'],
  computed: {
    headerWidth() {
      return 'calc(100vw - ' + ((this.fullScreen ? 0 : this.sidebarWidth) + 'px');
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    loginStatus() {
      let userInfo = this.$store.state.userInfo
      return userInfo !== null && userInfo.token?.length === 32
    }
  },
  components: {
    ReplyComment,
    ArticleFooter,
    ArticleSetting,
    ArticleVersion,
    NotFound
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
      // 判断是否移动超过10%
      let scrollbar = this.$refs.scrollbarContext;
      this.scrollTop = scrollbar.scrollTop;
      this.backTopShow = scrollbar.scrollTop > this.backTopHeight;
      let canScrollHeight = scrollbar.scrollHeight - scrollbar.clientHeight;
      if (canScrollHeight && ((canScrollHeight / scrollbar.scrollHeight) >= 0.1)) {
        if (scrollbar.scrollTop / canScrollHeight >= 0.1) {
          // 这里需要使用节流方法
          this.debounceReportView(scrollbar.scrollTop, canScrollHeight, scrollbar.scrollHeight);
        }
      }
      // 大纲光标移动
      if (this.tocData.length > 0) {
        let scrollbarRect = scrollbar?.getBoundingClientRect();
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
    reportViewProcess(scrollTop, canScrollHeight, scrollHeight) {
      ContentPicksApi.reportView(this, scrollTop, canScrollHeight, scrollHeight).then()
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
        socialApi.collectMark(collectTarget).then(data => {
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
    unmark() {
      let collectTarget = {uid: this.collectInfo.collectId}
      socialApi.collectUnMark(collectTarget).then(data => {
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
      socialApi.contentLikeMark(likeAction).then(data => {
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
        this.tocData = [];
        let content = data.data.content;
        if (content?.length > 0) {
          this.$nextTick(() => {
            this.engine.setJsonValue(JSON.parse(content));
            const pattern = /h[1-6]/;
            let match = content.match(pattern);
            if (match) {
              this.renderTocData(this.engine);
            }
          });
        }
        this.spinShow = false;
        this.$nextTick(() => {
          const scrollable = this.$refs.scrollbarContext;
          scrollable.scrollTop = 0;
        });
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
      if (this.loginStatus) {
        ContentPicksApi.getCollectTagList().then(data => {
          if (data?.result) {
            this.collectTags = data.data;
          }
        })
      }
    },
    login() {
      let loginBtn = document.getElementById("pwdLoginBtn");
      if (loginBtn) {
        loginBtn.click();
      } else {
        console.log("没有找到登录盒子")
      }
    },
    changeDocStyle() {
      this.$emit("updateDocStyle", this.docStyle);
    },
    backTop() {
      let timer = null;
      const varThis = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (varThis.scrollTop > 0) {
          varThis.scrollTop -= (varThis.scrollTop / 1000) * 120;
          varThis.$refs.scrollbarContext.scrollTop = varThis.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          varThis.backTopShow = false;
        }
      });
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
  created() {
    this.debounceReportView = debounce(this.reportViewProcess, 1000 * 10);
    this.docStyle = {...this.docStyle, ...this.parentDocStyle};
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
        scrollNode: $("#contentWrapper"),
        // 阅读模式
        readonly: true
      });
      this.engine = engine;
      this.initReaderContent();
    }
    window.addEventListener('resize', this.checkFullscreen);
    const scrollContainer = this.$refs.scrollbarContext;
    scrollContainer?.addEventListener('scroll', this.handleScrollForToc, {
      passive: true
    });
    this.handleScrollForToc();
    // 文章很短时的进度汇报
    this.$nextTick(() => {
      setTimeout(() => {
        let scrollbar = this.$refs.scrollbarContext;
        let canScrollHeight = scrollbar?.scrollHeight - scrollbar?.clientHeight;
        if (canScrollHeight && ((canScrollHeight / scrollbar?.scrollHeight) < 0.1)) {
          ContentPicksApi.reportView(this, scrollbar.scrollTop, canScrollHeight, scrollbar.scrollHeight).then()
        }
      }, 1000 * 10)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkFullscreen);
    const scrollContainer = this.$refs.scrollbarContext;
    scrollContainer?.removeEventListener('scroll', this.handleScrollForToc);
  }
}
</script>

<style scoped lang="less">
  @import 'css/article-reader.less';
</style>
