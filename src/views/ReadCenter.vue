<template>
  <div :class="[docStyle.docThemeSync ? 'enable-background' : 'normal-background', 'read-center']"
       ref="tooltipContainer">
    <div class="layout-module_wrapper">
      <div class="layout-module_directoryWrapper" :style="{ width: sidebarWidth + 'px' }">
        <div class="layout-module_fixed">
          <div class="layout-module_dragbar" @mousedown="startDrag"></div>
          <div class="layout-module_directory un-select">
            <div class="directory-header">
              <div class="book-info">
                <div class="crumb">
                  <a href="/" class="website-logo" target="_blank">
                    <span class="iconfont logo"></span>
                  </a>
                  <span class="iconfont to-right"></span>
                  <user-card :userInfo="authorInfo"
                             :popoverContainer="this.$refs.tooltipContainer"
                             class="user-info-card-box">
                    <slot>
                      <div class="action">
                        <a class="crumb-text">
                          {{ authorInfo.username }}
                        </a>
                      </div>
                    </slot>
                  </user-card>
                </div>
              </div>
            </div>
            <div class="directory-nav"
                 :style="{ width: sidebarWidth + 'px',
               'will-change': isDragging ? 'width' : null,
               transition: isDragging ? 'width 200ms cubic-bezier(0.1, 0, 0, 1) 0s' : null }">
              <div class="search-nav">
                <div class="search-bar" @click="modalSearch = true">
                  <span class="iconfont i-search"></span>
                  <span>搜索</span>
                </div>
              </div>
              <div :class="['home-nav', columnUri && !articleUri ? 'active-home' : '']"
                   v-if="columnUri !== undefined"
                   @click="routeNavigate('columnIndex')">
                <span class="iconfont home"></span>
                <span>专栏首页</span>
              </div>
              <div class="nav-tabs">
                <div class="tabs-bar">
                <span class="tab-title popover-trigger"
                      v-if="columnUri !== undefined"
                      @click="navShowType = isColumnView ? (navShowType === 'tree' ? 'list' : 'tree') : navShowType">
                  <span :class="['iconfont', navShowType === 'tree' ? 'nav-tree' : 'list']"></span>
                  <span>目录</span>
                </span>
                  <span class="tab-list" v-else>
                  <span class="iconfont list"></span>
                  <span>文章列表</span>
                </span>
                  <div class="actions-cont" v-show="isColumnView && navShowType === 'tree'">
                    <a-tooltip overlayClassName="read-nav-tooltip" :getPopupContainer="()=>this.$refs.tooltipContainer">
                      <template slot="title">
                        {{ openAllTree ? '全部折叠' : '全部展开' }}
                      </template>
                      <span class="action-item" @click="expandTreeNode()">
                    <span :class="['iconfont', openAllTree ? 'nav-open' : 'nav-close']"></span>
                  </span>
                    </a-tooltip>
                  </div>
                </div>
                <div class="tabs-content-holder">
                  <div class="tabs-content">
                    <div class="tabs-tabpane" v-if="navShowType === 'list'">
                      <div class="tabpane-list" :style="{ width: sidebarWidth + 'px' }">
                        <List>
                          <ListItem v-for="item in getListDirData" :key="item.uid"
                                    :class="item.uri === articleUri ? 'current-article' : ''">
                            <ListItemMeta>
                              <template slot="description">
                                <div class="article-item" @click="routeNavigate(item.uri)">
                                  <div class="title" :title="item.title">
                                    {{ item.title }}
                                  </div>
                                  <div class="description" :title="item.summary">
                                    {{ item.summary }}
                                  </div>
                                </div>
                              </template>
                            </ListItemMeta>
                          </ListItem>
                        </List>
                      </div>
                    </div>
                    <div class="tabs-tabpane tree" v-show="isColumnView && navShowType === 'tree'">
                      <Tree :data="dirData"
                            @on-select-change="selectTreeNode"
                            @on-check-change="tt1"
                            @on-toggle-expand="tt2"
                            class="tabpane-tree">
                      </Tree>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :style="{ width: adaptiveContentWidth}">
        <router-view :sidebarWidth="sidebarWidth"
                     :articleUri="articleUri"
                     :columnUri="columnUri"
                     :authorInfo="authorInfo"
                     :parentDocStyle="docStyle"
                     @updateDocStyle="updateDocStyle">
        </router-view>
      </div>
      <Modal v-model="modalSearch"
             :class-name="docStyle.docThemeSync ? 'search-modal search-modal-enable-background' : 'search-modal search-modal-normal'"
             width="750"
             :footer-hide="true">
        <span slot="close"/>
        <div class="modal-search-body">
          <div class="modal-search-input">
            <span class="input-prefix">
              <span class="iconfont i-search" v-if="searchStatus === 0"/>
              <span class="iconfont update-ing" v-if="searchStatus === 1"/>
              <span class="search-scope">
                <span v-show="searchScope > 0">
                  {{ authorInfo.username }}
                  <em>/</em>
                </span>
                <span v-show="searchScope > 1">
                  {{ columnInfo.title }}
                  <em>/</em>
                </span>
              </span>
            </span>
            <span class="input-box">
              <input :class="searchError ? 'search-error' : ''"
                     ref="searchInput"
                     placeholder="输入搜索内容"
                     v-model="keywords"
                     @input="handleInput"/>
              <span class="iconfont clear" v-show="keywords?.length > 0"/>
            </span>
            <span class="input-suffix un-select">
              <span class="iconfont arrow-top" @click="searchScope = (searchScope + 1) > 2 ? 0 : (searchScope + 1)"/>
              <span class="iconfont arrow-bottom" @click="searchScope = (searchScope - 1) < 0 ? 2 : (searchScope - 1)"/>
              <span class="search-scope-keys">
                切换搜索范围
              </span>
            </span>
          </div>
          <Divider/>
          <div class="select-search-scope un-select">
            <span class="search-tip">搜索范围</span>
            <ul class="search-scope-list">
              <li :class="['search-scope-item', searchScope === 2 ? 'selected' : '']" v-if="isColumnView">
                <span class="scope-content" @click="searchScope = 2">
                  <span class="iconfont series-column"/>
                  <span class="scope-text">{{ columnInfo.title }}</span>
                </span>
                <span class="select-scope" @click="executeSearch(2)">
                  <span class="iconfont enter"/>&nbsp;专栏内搜索
                </span>
              </li>
              <li :class="['search-scope-item', searchScope === 1 ? 'selected' : '']">
                <span class="scope-content" @click="searchScope = 1">
                  <b-avatar :src="fileUrl(authorInfo.avatarUrl)" size="18px">
                    <span v-if="!authorInfo.avatarUrl">{{ authorInfo.username }}</span>
                  </b-avatar>
                  <span class="scope-text">{{ authorInfo.username }}</span>
                </span>
                <span class="select-scope" @click="executeSearch(1)">
                  <span class="iconfont enter"/>&nbsp;公开内容搜索
                </span>
              </li>
              <li :class="['search-scope-item', searchScope === 0 ? 'selected' : '']">
                <span class="scope-content" @click="searchScope = 0">
                  <span class="iconfont logo"/>
                  <span class="scope-text">IT充电站</span>
                </span>
                <span class="select-scope" @click="executeSearch(0)">
                  <span class="iconfont enter"/>&nbsp;全站搜索
                </span>
              </li>
            </ul>
          </div>
          <Divider/>
          <div class="search-result-list" v-if="!emptySearchResult">
            <div class="search-tip un-select">相关内容</div>
            <li class="search-result-item" v-for="item in searchResult" :key="item.uid">
              <div class="item-icon">
                <span class="iconfont article"/>
              </div>
              <b-link class="item-desc" @click="routeNavigateForSearchResult(item)">
                <span class="title-label" v-html="item.highLightTitle || item.title" :title="item.title"></span>
                <span class="content-label" v-html="item.highLightSummary || item.summary" :title="item.summary"></span>
              </b-link>
              <div class="item-info">
                <span class="time-label un-select">
                  {{ formatTime(new Date(item.updateTime), 'yyyy-MM-dd HH:mm:ss') }}
                </span>
                <span class="provenance-label un-select"
                      :title="item.columnUri ? item.columnName : authorInfo.username">
                  <span class="iconfont series-column" v-if="item.columnUri"/>
                  {{ item.columnUri ? item.columnName : authorInfo.username }}
                </span>
              </div>
            </li>
          </div>
          <div v-else>
            暂无相关内容，尝试更换关键词重新搜索
          </div>
        </div>
      </Modal>

      <!-- 消息界面初始化就开始挂载 -->
      <Modal v-model="showMessage"
             v-if="loginStatus"
             :lock-scroll="true"
             :footer-hide="true"
             :width="900"
             :class-name="docStyle.docThemeSync ? 'message-box' : 'message-box normal-background'">
        <message-notification :propsActiveMenu="activeMenu"
                              scene="readCenter"
                              @changeModalStatus="showMessage = false"/>
      </Modal>
    </div>

    <!-- 登录盒子 -->
    <div style="display: none;">
      <auth-modal :normalBackground="docStyle.docThemeSync ? 0 : 1">
        <slot>
          <Button id="pwdLoginBtn">
            <span>登陆</span>
          </Button>
        </slot>
      </auth-modal>
    </div>
  </div>
</template>

<script>
import {formatTime} from "@/utils"
import ContentPicksApi from "@/api/ContentPicksApi";
import UserApi from "@/api/UserApi";
import UserCard from "@/components/common/UserCard.vue";
import AuthModal from "@/components/common/AuthModal.vue";
import publicSearchApi from "@/api/PublicSearchApi";
import MessageNotification from "@/components/MessageNotification.vue";

export default {
  name: 'ReadCenter',
  components: {MessageNotification, AuthModal, UserCard},
  data() {
    return {
      tt: Date.now(),
      // 搜索框显示
      modalSearch: false,
      // 聊天框显示
      showMessage: false,
      // 聊天框内菜单
      activeMenu: null,
      keywords: null,
      // 搜索状态是否正在进行中 0否1是
      searchStatus: 0,
      searchError: false,
      // 搜索范围 0全站搜索 1作者公开内容搜索 2专栏内搜索
      searchScope: 1,
      // 节流定时器
      throttle: null,
      isDragging: false,
      startX: 0,
      startWidth: 0,
      sidebarWidth: 350, // 初始宽度
      fullScreen: false, // 全屏演示模式
      dirData: [],
      // 菜单列表展示方式  list or tree
      navShowType: null,
      openAllTree: false,
      currentNode: null,
      view: null,
      authorInfo: {},
      columnInfo: {},
      searchResult: [],
      emptySearchResult: false,
      // 样式相关
      docStyle: {}
    }
  },
  props: ['domain', 'columnUri', 'articleUri'],
  computed: {
    // 自适应内容界面的宽度
    adaptiveContentWidth() {
      return 'calc(100vw - ' + (this.sidebarWidth) + 'px)'
    },
    isColumnView() {
      return this.columnUri !== undefined && this.columnUri !== null;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    loginStatus() {
      let userInfo = this.$store.state.userInfo
      return userInfo !== null && userInfo.token?.length === 32
    },
    getListDirData() {
      if (this.dirData.length === 0) {
        return [];
      }
      let array = [];
      this.dirData.forEach(dir => {
        if (dir.type === 1) {
          array.push(dir)
        } else if (dir.type === 2) {
          this.recursiveGetDirList(array, dir);
        }
      })
      return array;
    },
    chatMessage() {
      return this.$store.state.chatMessage;
    }
  },
  watch: {
    "modalSearch"(newVal) {
      if (newVal) {
        // 获取焦点
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
        })
      } else {
        this.searchResult = [];
        this.emptySearchResult = false;
        this.keywords = null;
        if (this.isColumnView) {
          this.searchScope = 2;
        } else {
          this.searchScope = 1;
        }
      }
    },
    "$route"() {
      this.requestArticleOrDir();
    },
    'chatMessage.activeSessionId'(val) {
      if (val) {
        this.showMessage = true;
        this.activeMenu = 'chatMessage'
      }
    },
    'showMessage'(val) {
      if (!val) {
        this.activeMenu = null;
        this.$store.commit("updateChatSession", null);
      }
    }
  },
  methods: {
    formatTime,
    recursiveGetDirList(ListArray, dirData) {
      if (dirData.children && dirData.children.length > 0) {
        dirData.children.forEach(dir => {
          if (dir.type === 1) {
            ListArray.push(dir);
          } else if (dir.type === 2) {
            this.recursiveGetDirList(ListArray, dir);
          }
        })
      }
    },
    onSelect(selectedKeys, info) {
      // console.log('selected', selectedKeys, info);
    },
    /**
     * 左侧目录拖动相关方法
     * @param event
     */
    startDrag(event) {
      event.preventDefault();
      this.isDragging = true;
      this.startX = event.clientX;
      this.startWidth = this.sidebarWidth;
      document.addEventListener('mousemove', this.handleDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },
    handleDrag(event) {
      if (this.isDragging) {
        const deltaX = event.clientX - this.startX;
        let adaptiveWidth = this.startWidth + deltaX;
        this.sidebarWidth = adaptiveWidth < 260 ? 260 : adaptiveWidth > 480 ? 480 : adaptiveWidth;
      }
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.handleDrag);
      document.removeEventListener('mouseup', this.stopDrag);
    },
    /**
     * tree节点展开/收起
     */
    expandTreeNode() {
      this.openAllTree = !this.openAllTree;
      if (this.dirData.length > 0) {
        this.dirData.forEach(dir => {
          if (dir.type === 2) {
            dir.expand = this.openAllTree;
            let children = dir.children;
            this.recursiveExpansion(children, this.openAllTree);
          }
        });
      }
    },
    recursiveExpansion(children, isOpen) {
      if (children && children.length > 0) {
        children.forEach(treeNode => {
          if (treeNode.type === 2) {
            treeNode.expand = isOpen;
            this.recursiveExpansion(treeNode.children, isOpen)
          }
        })
      }
    },
    /**
     * 路由导航
     * @param itemName
     */
    routeNavigate(routeParam) {
      if (routeParam === 'columnIndex') {
        // 专栏首页
        if (this.currentNode) {
          this.currentNode.selected = false;
        }
        this.$router.push({path: '/' + this.domain + '/' + this.columnUri});
      } else {
        // 文章页面需要判断是专栏页面还是普通页面
        if (this.columnUri !== undefined) {
          // 专栏页面
          this.$router.push({path: '/' + this.domain + '/' + this.columnUri + '/' + routeParam});
        } else {
          // 普通页面
          this.$router.push({path: '/' + this.domain + '/' + routeParam});
        }
      }
    },
    routeNavigateForSearchResult(item) {
      this.modalSearch = false;
      let path = '/' + this.domain + '/' + (item.columnUri ? item.columnUri + '/' : '') + item.uri;
      this.$router.push(path);
    },
    selectTreeNode(selectNode, currentNode) {
      debugger
      // 目录节点
      if (currentNode.type === 2) {
        currentNode.expand = !currentNode.expand
        if (this.currentNode != null) {
          this.currentNode.selected = true;
        }
        currentNode.selected = false;
      } else if (currentNode.type === 1) {
        // 叶子节点进行路由跳转
        currentNode.selected = true;
        this.currentNode = currentNode;
        this.routeNavigate(currentNode.uri)
      }
    },
    handleInput(event) {
      if (this.keywords?.trim().length > 0) {
        // 清除之前的节流计时器
        if (this.throttle) {
          clearTimeout(this.throttle);
        }
        this.searchError = false;
        // 设置新的节流计时器
        this.throttle = setTimeout(() => {
          // 在这里执行特定的操作
          if (this.searchScope === 0) {
            return;
          }
          this.executeSearch();
        }, 500); // 节流间隔为300ms
      }
    },
    executeSearch(searchScope) {
      if (searchScope !== undefined) {
        this.searchScope = searchScope;
      }
      if (this.keywords?.trim().length > 0) {
        if (this.searchScope === 0) {
          this.modalSearch = false;
          let path = '/search?k=' + this.keywords;
          this.$router.push({path: path})
          return;
        }
        // 在指定范围内搜索
        this.searchStatus = 1;
        let scopeSearchRequest = {
          keywords: this.keywords,
          columnId: this.searchScope === 2 ? this.columnInfo.uid : null,
          userId: this.searchScope === 1 ? this.authorInfo.uid : null
        };
        publicSearchApi.getScopeSearchResult(scopeSearchRequest).then(data => {
          if (data?.result) {
            this.searchResult = data.data;
            this.emptySearchResult = data.data.length === 0;
          }
          this.searchStatus = 0;
        }).catch(() => {
          this.searchStatus = 0;
        })
      } else {
        this.searchError = true;
        this.$refs.searchInput.focus();
      }
    },
    handleKeydown(event) {
      if (this.modalSearch) {
        switch (event.key) {
          case 'ArrowUp':
            this.searchScope = (this.searchScope + 1) > 2 ? 0 : (this.searchScope + 1);
            break;
          case 'ArrowDown':
            this.searchScope = (this.searchScope - 1) < 0 ? 2 : (this.searchScope - 1);
            break;
          case 'Enter':
            this.executeSearch();
            break;
        }
      }
    },
    fileUrl(path) {
      return this.fileService + path;
    },
    requestArticleOrDir() {
      if (this.isColumnView) {
        ContentPicksApi.getColumnDir(this.columnUri).then(data => {
          if (data?.result) {
            this.columnInfo = data.data;
            let dirData = data.data?.dirContent;
            /*if (dirData) {
              for (let dirDatum of this.dirData) {
                let selected = this.recursiveSelected(dirDatum);
                if (selected) {
                  if (dirDatum?.type === 2) {
                    dirDatum.exp = true;
                  }
                  break;
                }
              }
            }*/
            this.dirData = dirData;
          }
        })
      } else {
        ContentPicksApi.getArticleList(this.authorInfo.uid).then(data => {
          if (data?.result) {
            this.dirData = data.data.map(article => {
              return {
                uid: article.uid,
                uri: article.uri,
                type: 1,
                title: article.title,
                summary: article.summary
              }
            });
          }
        })
      }
    },
    /**
     * 递归选中当前节点
     * @param dirNode
     * @returns {boolean}
     */
    recursiveSelected(dirNode) {
      if (!dirNode) {
        return false;
      }
      if (dirNode?.type === 1) {
       if (dirNode?.uri === this.articleUri) {
         dirNode.selected = true;
         return true;
       }
      } else if (dirNode?.type === 2 && dirNode?.children?.length > 0) {
        for (let child of dirNode.children) {
          let childSelected = this.recursiveSelected(child);
          if (childSelected) {
            dirNode.expand = true;
            return true;
          }
        }
        return false;
      }
      return false;
    },
    updateDocStyle(styleConfig) {
      this.docStyle = {...this.docStyle, ...styleConfig};
    }
  },
  mounted() {
    // 获取个人信息
    UserApi.getUserInfoByDomain(this.domain).then(data => {
      if (data?.result) {
        this.authorInfo = data.data;
        // 判断获取文章列表还是专栏目录
        this.requestArticleOrDir();
      }
    })
    this.navShowType = this.isColumnView ? 'tree' : 'list';
    window.addEventListener('keydown', this.handleKeydown);
    if (this.isColumnView) {
      this.searchScope = 2;
    }
  },
  created() {
    this.docStyle = {...this.docStyle, ...this.$store.state.docStyle};
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
}
</script>

<style scoped lang="less">
@import '../components/css/read-center.less';
</style>
