<template>
  <div :class="[docStyle.asyncTheme ? 'enable-background' : 'normal-background', 'read-center']"
       ref="tooltipContainer">
    <div class="layout-module_wrapper">
      <div class="layout-module_directoryWrapper" :style="{ width: sidebarWidth + 'px' }">
        <div class="layout-module_dragbar" @mousedown="startDrag"></div>
        <div class="layout-module_directory un-select">
          <div class="directory-header">
            <div class="book-info">
              <div class="crumb">
                <a href="/" class="website-logo" target="_blank">
                  <span class="iconfont logo"></span>
                </a>
                <span class="iconfont to-right"></span>
                <user-card :userInfo="authorInfo" :popoverContainer="this.$refs.tooltipContainer" class="user-info-card-box">
                  <slot>
                    <div class="action">
                      <a :href="'/' + domain" class="crumb-text">{{ authorInfo.username }}</a>
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
            <div class="home-nav" v-if="columnId !== undefined"
                 @click="routeNavigate('columnIndex')">
              <span class="iconfont home"></span>
              <span>专栏首页</span>
            </div>
            <div class="nav-tabs">
              <div class="tabs-bar">
                <span class="tab-title popover-trigger"
                      v-if="columnId !== undefined"
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
                      {{openAllTree ? '全部折叠' : '全部展开'}}
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
                        <ListItem v-for="item in getListDirData()" :key="item.id">
                          <ListItemMeta description="hahsd沙拉领导啦啦啦速度快垃圾啊猎杀对决垃圾离开见识到了吉拉到家了案件受得了爱讲道理就asdads asd asd按">
                            <template slot="title">
                              <div class="title-content" @click="routeNavigate(item.id)">
                                {{item.title}}
                              </div>
                            </template>
                          </ListItemMeta>
                        </ListItem>
                      </List>
                    </div>
                  </div>
                  <div class="tabs-tabpane tree" v-show="isColumnView && navShowType === 'tree'">
                    <div class="tabpane-tree">
                      <div v-for="item in dirData" :key="item.id"
                           :class="['tree-content',item.type===1?'single-node-tree':item.type===2?'composite-nodes-tree':'']">
                        <div v-if="item.type === 1" class="single-tree-node" @click="routeNavigate(item.id)">
                          {{item.title}}
                        </div>
                        <div v-if="item.type === 2" class="composite-tree-node">
                          <Tree :data="new Array(item)" @on-select-change="selectTreeNode"></Tree>
                        </div>
                      </div>
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
                     :articleId="articleId"
                     :columnId="columnId"
                     :docStyle="docStyle"></router-view>
      </div>
      <Modal v-model="modalSearch"
             width="750"
             :footer-hide="true">
        <span slot="close"/>
        <div class="modal-search-body">
          <div class="modal-search-input">
            <span class="input-prefix">
              <span class="iconfont i-search"/>
              <span class="search-scope">
                <span v-show="searchScope > 0">
                  Ep流苏
                  <em>/</em>
                </span>
                <span v-show="searchScope > 1">
                  guli-mall
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
          <div class="select-search-scope">
            <span class="search-tip">搜索范围</span>
            <ul class="search-scope-list">
              <li :class="['search-scope-item', searchScope === 2 ? 'selected' : '']" v-if="isColumnView">
                <span class="scope-content" @click="searchScope = 2">
                  <span class="iconfont series-column"/>
                  <span class="scope-text">不做手机控帮助文档</span>
                </span>
                <span class="select-scope" @click="executeSearch(2)">
                  <span class="iconfont enter"/>&nbsp;专栏内搜索
                </span>
              </li>
              <li :class="['search-scope-item', searchScope === 1 ? 'selected' : '']">
                <span class="scope-content" @click="searchScope = 1">
                  <b-avatar :src="authorInfo.avatar" size="18px">
                    <span v-if="!authorInfo.avatar">{{authorInfo.username}}</span>
                  </b-avatar>
                  <span class="scope-text">十个雨点</span>
                </span>
                <span class="select-scope" @click="executeSearch(1)">
                  <span class="iconfont enter"/>&nbsp;公开内容搜索
                </span>
              </li>
              <li :class="['search-scope-item', searchScope === 0 ? 'selected' : '']">
                <span class="scope-content" @click="searchScope = 0">
                  <span class="iconfont logo"/>
                  <span class="scope-text">it充电站</span>
                </span>
                <span class="select-scope" @click="executeSearch(0)">
                  <span class="iconfont enter"/>&nbsp;全站搜索
                </span>
              </li>
            </ul>
          </div>
          <Divider/>
          <div class="search-result-list">
            <div class="search-tip">相关内容</div>
            <li class="search-result-item" v-for="item in searchResult" :key="item.id">
              <div class="item-icon">
                <span class="iconfont article" v-if="item.type === 2"/>
                <span class="iconfont series-column" v-if="item.type === 1"/>
              </div>
              <b-link class="item-desc"
                      :to="item.type === 1 ? ('/column/' + item.columnId)
                          : (item.columnId ? ('/column/' + item.columnId + '/' + item.id) : '/article/' + item.id)">
                <span class="title-label" v-html="item.title"></span>
                <span class="content-label" v-html="item.content"></span>
              </b-link>
              <div class="item-info">
                <span class="time-label un-select">
                  {{ formatDate(new Date(item.updateTime), 'yyyy-MM-dd HH:mm:ss') }}
                </span>
                <span class="provenance-label un-select" :title="item.type === 1 ? '' : item.columnName">
                  {{item.columnId && item.type === 2 ? authorInfo.username + ' / ' + item.columnName : authorInfo.username}}
                </span>
              </div>
            </li>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "@/utils/utils.js"
  import ContentPicksApi from "@/api/ContentPicksApi";
  import UserApi from "../api/UserApi";
  import UserCard from "@/components/common/UserCard.vue";

  export default {
    name: 'ReadCenter',
    components: { UserCard },
    data() {
      return {
        // 搜索框显示
        modalSearch: false,
        keywords: null,
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
        dirData: [
          {
            id: 1,
            type: 1,
            title: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 2,
            type: 1,
            title: '单文章节点as打实阿萨达1'
          },
          {
            id: 3,
            type: 2,
            title: '下游多层目录',
            expand: false,
            children: [
              {
                id: '23223142342',
                type: 2,
                title: '达啊实打实多爱文章文章文章文章文章文章文章文章文章文章',
                expand: false,
                children: [
                  {
                    id: 'asdasd',
                    type: 1,
                    title: '单独文章'
                  },
                  {
                    id: '23223242342',
                    type: 2,
                    title: '测试空目录该怎么展示',
                    expand: true,
                    children: []
                  },
                  {
                    id: '23223442342',
                    type: 2,
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                      {
                        id: '23227342342',
                        type: 1,
                        title: 'leaf 1-2-1'
                      },
                      {
                        id: '23223942342',
                        type: 1,
                        title: 'leaf 1-2-1'
                      }
                    ]
                  }
                ]
              },
              {
                id: '2322342341',
                type: 2,
                title: '多层目录',
                expand: false,
                children: [
                  {
                    id: 'sfsdfsdfsdf',
                    type: 1,
                    title: '单独文章'
                  },
                  {
                    id: '23223422342',
                    type: 2,
                    title: '目录文章收到撒阿萨',
                    expand: false,
                    children: [
                      {
                        id: '23223425342',
                        type: 1,
                        title: 'leaf 1-1-1'
                      },
                      {
                        id: '23223242342',
                        type: 1,
                        title: 'leaf 1-1-2'
                      }
                    ]
                  },
                  {
                    id: '23223425342',
                    type: 2,
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                      {
                        id: '23223492342',
                        type: 1,
                        title: 'leaf 1-2-1'
                      },
                      {
                        id: '23223402342',
                        type: 1,
                        title: 'leaf 1-2-1'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 13,
            type: 2,
            title: '这也是多层目录',
            expand: true,
            children: [
              {
                id: 'asd2s3131',
                type: 2,
                title: 'parent 11文章文章文章文章文章文章文章文章文章文章',
                expand: true,
                children: [
                  {
                    id: 'asd23a131',
                    type: 1,
                    title: '单独文章'
                  },
                  {
                    id: 'asd231d31',
                    type: 2,
                    title: '目录文章',
                    expand: true,
                    children: [
                      {
                        id: 'asqd23131',
                        type: 1,
                        title: 'leaf 1-1-1录文录文录文录文录文录文录文录文录文录文录文录文录文录文录文'
                      },
                      {
                        id: 'asd231r31',
                        type: 1,
                        title: 'leaf 1-1-2'
                      }
                    ]
                  },
                  {
                    id: 'asd23y131',
                    type: 2,
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                      {
                        id: 'asd2g3131',
                        type: 1,
                        title: 'leaf 1-2-1'
                      },
                      {
                        id: 'asd273131',
                        type: 1,
                        title: 'leaf 1-2-1'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        // 菜单列表展示方式  list or tree
        navShowType: null,
        openAllTree: false,
        view: null,
        authorInfo: {
          uid: 9527,
          username: '布衣草人',
          domain: 'lovbe0210',
          level: 6,
          avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hndj43fdrsj30s010vgtz.jpg'
        },
        searchResult: [
          {
            id: 1,
            // 1 专栏 2 文章
            type: 2,
            title: 'Elasticsearch-Elasticsearch-使用入门ElasticElasticsearch-使用入门Elasticsearch-使用入门search-使用入门使用入门',
            content: '前面介绍说，Elasticsearch 都是通过 REST API <span style="color: red;">接口</span>来操作数据的，那么下面接通过几个<span style="color: red;">接口</span>的请求来演示它的使用。（当前虚拟机IP为192.168.163.131）',
            columnId: 123,
            columnName: '全文检索技术探讨',
            updateTime: 1717429008233
          },
          {
            id: 2,
            type: 1,
            title: '如何讨富婆欢心-使用入门',
            content: '前面介绍说，Elasticsearch 都是通过 REST API <span style="color: red;">接口</span>来操作数据的，那么下面接通过几个<span style="color: red;">接口</span>的请求来演示它的使用。（当前虚拟机IP为192.168.163.131）',
            columnId: 124,
            columnName: '如何讨富婆欢心',
            updateTime: 1717429237310
          },
          {
            id: 3,
            type: 2,
            title: '随笔该如何使用？',
            content: '前面介绍说，Elasticsearch 都是通过 REST API 接口来操作数据的，那么下面接通过几个接口的请求来演示它的使用。（当前虚拟机IP为192.168.163.131）',
            columnId: null,
            columnName: null,
            updateTime: 1717429296426
          }
        ]
      }
    },
    props: ['domain', 'columnId', 'articleId'],
    computed: {
      // 自适应内容界面的宽度
      adaptiveContentWidth() {
        return 'calc(100vw - ' + (this.sidebarWidth) + 'px)'
      },
      isColumnView() {
        return this.columnId !== undefined && this.columnId !== null;
      },
      docStyle() {
        return this.$store.state.docStyle;
      }
    },
    watch: {
      "modalSearch"(newVal) {

      }
    },
    methods: {
      formatDate,
      // 组装目录树
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
      /**
       * 为子组件定义的事件方法
       */
      updateTitle(titleValue) {
        this.docInfo.title = titleValue;
      },

      onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info);
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
          this.$router.push({path: '/column/' + this.columnId});
        } else {
          // 文章页面需要判断是专栏页面还是普通页面
          if (this.columnId !== undefined) {
            // 专栏页面
            this.$router.push({path: '/column/' + this.columnId + '/' + routeParam});
          } else {
            // 普通页面
            this.$router.push({path: '/article/' + routeParam});
          }
        }
      },
      selectTreeNode(selectNode, currentNode) {
        currentNode.selected = false;
        currentNode.expand = !currentNode.expand
        // 只在叶子节点处进行路由跳转
        if (currentNode.children === undefined) {
          console.log(currentNode.id)
          this.routeNavigate(currentNode.id)
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
          this.$Message.success('搜索。。。');
          if (this.searchScope === 0) {
            this.modalSearch = false;
            let path = '/search?k=' + this.keywords;
            this.$router.push({path: path})
          }
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
      }
    },
    mounted() {
      // 获取个人信息
      UserApi.getUserInfoByDomain(this.domain).then(data => {
        if (data?.result) {
          this.authorInfo = data.data;
        }
      })
      this.navShowType = this.isColumnView ? 'tree' : 'list';
      window.addEventListener('keydown', this.handleKeydown);
      if (this.isColumnView) {
        this.searchScope = 2;
      }
      // 判断获取文章列表还是专栏目录
      if (this.isColumnView) {

        return;
      }

      ContentPicksApi.getArticleList(this.domain).then(data => {
        if (data?.result) {

        }
      })

    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.handleKeydown);
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/read-center.less';
</style>
