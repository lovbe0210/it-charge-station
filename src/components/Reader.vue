<template>
  <div class="reader-route-view" ref="tooltipContainer">
    <div class="layout-module_contentWrapper" id="contentWrapper">
      <div id="header" class="layout-module_headerWrapper" :style="{ width: headerWidth}">
        <div class="header-crumb">
          <span class="header_title" title="Seata—分布式事务解决方案">Seata—分布式事务解决方案</span>
          <a-tooltip overlayClassName="read-header-tooltip" :getPopupContainer="()=>this.$refs.tooltipContainer">
            <template slot="title">
              {{ isPublic ? '互联网所有人可以访问' : '仅关注可见' }}
            </template>
            <div class="header-status-icon">
              <span class="iconfont public"/>
            </div>
          </a-tooltip>
        </div>
        <div class="header-action">
          <Button type="success" @click="routeNavigate(docInfo)">编辑</Button>
          <a-tooltip overlayClassName="read-header-tooltip" :getPopupContainer="()=>this.$refs.tooltipContainer">
            <template slot="title">
              {{ ifLike ? '取消收藏' : '收藏' }}
            </template>
            <div class="action-icon" @click="ifLike = !ifLike">
              <span :class="['iconfont', ifLike ? 'collected' : 'collect']"></span>
            </div>
          </a-tooltip>
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
                {{ docInfo.title }}
              </h1>
            </div>
          </div>
          <!-- 内容显示部分 -->
          <div ref="view"
               :class="['doc-reader','am-engine-view', docStyle.pageSize ? 'reader-ultra-wide' : 'reader-standard-wide']">
          </div>
          <div class="doc-footer">
            <article-footer :ifLike="ifLike" @like="ifLike = !ifLike"/>
          </div>
          <!-- 评论 -->
          <div :class="[docStyle.pageSize === 1 ? 'reader-standard-wide' : 'reader-ultra-wide']">
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
          <i-switch v-model="docStyle.asyncTheme" class="switch-btn" size="small">
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
</template>

<script>
  import {View, $} from '@aomao/engine'
  import {plugins, cards, pluginConfig} from "@/components/common/editor/config"
  import {getTocData} from "@/components/common/editor/utils";
  import ReplyComment from "@/components/common/replycomment/src/ReplyComment"
  import ArticleFooter from "@/components/common/ArticleFooter"
  import ArticleSetting from "@/components/common/ArticleSetting"
  import ArticleVersion from "@/components/common/ArticleVersion"

const event = document.createEvent('KeyboardEvent');
event.initKeyboardEvent('keydown', true, true, window, false, false, false, false, 122, 0);
export default {
  name: "ArticleRead",
  data() {
    return {
      fullScreen: false, // 全屏演示模式
      tocData: [],
      currentTocId: '',
      // 更多设置内容 1文档设置，2历史版本
      drawerType: 0,
      newVersion: false,
      showDocSetting: false,
      showDeleteModal: false,
      isPublic: true,
      ifLike: false,
      view: null
    }
  },
  props: ['sidebarWidth'],
  computed: {
    headerWidth() {
      return 'calc(100vw - ' + ((this.fullScreen ? 0 : this.sidebarWidth) + 'px');
    },
    docStyle() {
      return this.$store.state.docStyle;
    },
    docInfo() {
      return this.$store.state.tmpDoc;
    }
  },
  components: {
    ReplyComment,
    ArticleFooter,
    ArticleSetting,
    ArticleVersion
  },
  methods: {
    /**
     * 渲染标题大纲
     * @param engine
     */
    renderTocData(view) {
      let tocData = getTocData(view);
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
    addNewVersion () {
      this.newVersion = true;
      this.drawerType = 2;
    },
    routeNavigate(articleItem) {
      this.$router.push({path: '/editor/' + articleItem.uid})
    }
  },
  mounted() {
    const container = this.$refs.view;
    if (container) {
      //实例化引擎
      const view = new View(container, {
        // 启用插件
        plugins,
        // 启用卡片
        cards,
        // 所有的插件配置
        config: pluginConfig,
        readonly: true,
        // 滚动条节点
        scrollNode: this.$refs.scrollbarContext.Node
      });

      if (this.docInfo.content?.length !== 0) {
        view.render(this.docInfo.content)
        const pattern = /h[1-6]/;
        let match = this.docInfo.content.match(pattern);
        if (match) {
          this.renderTocData(view);
        }
      }

      this.view = view;
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
