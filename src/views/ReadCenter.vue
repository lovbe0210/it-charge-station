<template>
  <div class="read-center" ref="tooltipContainer">
    <div class="layout-module_wrapper">
      <div class="layout-module_directoryWrapper" :style="{ width: sidebarWidth + 'px' }">
        <div class="layout-module_dragbar" @mousedown="startDrag"></div>
        <div class="layout-module_directory">
          <div class="directory-header">
            <div class="book-info">
              <div class="crumb">
                <a href="/" class="website-logo">
                  <span class="iconfont logo"></span>
                </a>
                <span class="iconfont to-right"></span>
                <div class="action">
                  <a href="/lovbe0210" class="crumb-text">布衣草人</a>
                </div>
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
                      @click="navShowType = isColumnView ? (navShowType === 'tree' ? 'list' : 'tree') : navShowType">
                  <span :class="['iconfont', navShowType === 'tree' ? 'nav-tree' : 'list']"></span>
                  <span>目录</span>
                </span>
                <div class="actions-cont" v-show="isColumnView && navShowType === 'tree'">
                  <a-tooltip overlayClassName="read-nav-tooltip" :getPopupContainer="()=>this.$refs.tooltipContainer">
                    <template slot="title">
                      {{openAllTree ? '全部折叠' : '全部展开'}}
                    </template>
                    <span class="action-item" @click="expandTreeNode()">
                    <span :class="['iconfont', openAllTree ? 'icon-nav-open' : 'icon-nav-close']"></span>
                  </span>
                  </a-tooltip>
                </div>
              </div>
              <div class="tabs-content-holder">
                <div class="tabs-content">
                  <div class="tabs-tabpane" v-show="navShowType === 'list'">
                    <div class="tabpane-list" :style="{ width: sidebarWidth + 'px' }">
                      <List>
                        <ListItem v-for="item in getListDirData()" :key="item.id">
                          <ListItemMeta description="hahsd沙拉领导啦啦啦速度快垃圾啊猎杀对决垃圾离开见识到了吉拉到家了案件受得了爱讲道理就asdads asd asd按">
                            <template slot="title">
                              <div class="title-content" @click="routeNavigate(item.id)">
                                {{item.data}}
                              </div>
                              <span class="iconfont icon-nav-menu"></span>
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
                          {{item.data}}
                        </div>
                        <div v-if="item.type === 2" class="composite-tree-node">
                          <Tree :data="item.data" @on-select-change="selectTreeNode"></Tree>
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
        <router-view :sidebarWidth="sidebarWidth"></router-view>
      </div>
      <Modal v-model="modalSearch"
             width="700"
             :lock-scroll="false"
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
                     placeholder="输入搜索内容"
                     v-model="keyWords"
                     @input="handleInput"/>
              <span class="iconfont clear" v-show="keyWords?.length > 0"/>
            </span>
            <span class="input-suffix un-select">
              <span class="iconfont arrow-top"/>
              <span class="iconfont arrow-bottom"/>
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
                <span class="scope-content">
                  <span class="iconfont series-column"/>
                  <span class="scope-text">不做手机控帮助文档</span>
                </span>
                <span class="select-scope">
                  <span class="iconfont enter"/>&nbsp;专栏内搜索
                </span>
              </li>
              <li :class="['search-scope-item', searchScope === 1 ? 'selected' : '']">
                <span class="scope-content">
                  <b-avatar :src="authorInfo.avatar" size="18px">
                    <span v-if="!authorInfo.avatar">{{authorInfo.username}}</span>
                  </b-avatar>
                  <span class="scope-text">十个雨点</span>
                </span>
                <span class="select-scope">
                  <span class="iconfont enter"/>&nbsp;公开内容搜索
                </span>
              </li>
              <li :class="['search-scope-item', searchScope === 0 ? 'selected' : '']">
                <span class="scope-content">
                  <span class="iconfont logo"/>
                  <span class="scope-text">it充电站</span>
                </span>
                <span class="select-scope">
                  <span class="iconfont enter"/>&nbsp;全站搜索
                </span>
              </li>
            </ul>
          </div>
          <Divider/>
          <ul class="search-result-list">
            <span class="search-tip">相关内容</span>
            <li class="search-result-item">
              <div class="JumpMenu-module_jumpItemWrapper_vfjfO">
                <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                     class="larkui-icon larkui-icon-doc-type-default icon-svg JumpMenu-module_jumpItemIcon_bOWlR index-module_size_wVASz"
                     data-name="DocTypeDefault" style="width: 18px; min-width: 18px; height: 18px;">
                  <g fill="none" fill-rule="evenodd">
                    <path
                      d="M4.75 1.267h10.5a2 2 0 0 1 2 2v13.5a2 2 0 0 1-2 2H4.75a2 2 0 0 1-2-2v-13.5a2 2 0 0 1 2-2Z"
                      stroke="#3471AF" fill="#FFF"></path>
                    <path
                      d="M6.3 4.5h7.4a.8.8 0 0 1 .8.8v1.9a.8.8 0 0 1-.8.8H6.3a.8.8 0 0 1-.8-.8V5.3a.8.8 0 0 1 .8-.8Z"
                      fill="#3B8EE3"></path>
                    <path
                      d="M14 10.75a.5.5 0 0 1 .09.992l-.09.008H6a.5.5 0 0 1-.09-.992L6 10.75h8Zm-3 3a.5.5 0 0 1 .09.992l-.09.008H6a.5.5 0 0 1-.09-.992L6 13.75h5Z"
                      fill="#9DC6F1" fill-rule="nonzero"></path>
                  </g>
                </svg>
                <span class="JumpMenu-module_jumpItemLabel_OPbMQ">整合SpringSession</span><span
                class="JumpMenu-module_jumpItemTime_inSO2"><span>2021-05-22 15:53</span></span></div>
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'ReadCenter',
    /*  beforeRouteEnter(to, from, next) {
        next(vc => {
          // 通过 `vc` 访问组件实例
          if (vc.$route.params.index) {
            vc.$store.commit('changeActiveRoute', 'recommend')
          }
          next();
        })
      },*/
    data() {
      return {
        // 搜索框显示
        modalSearch: false,
        keyWords: null,
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
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 2,
            type: 1,
            data: '单文章节点2'
          },
          {
            id: 3,
            type: 1,
            data: '单文章节点3'
          },
          {
            id: 4,
            type: 1,
            data: '单文章节点4'
          },
          {
            id: 6,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 7,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 8,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 9,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 10,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 11,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 12,
            type: 1,
            data: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
          },
          {
            id: 5,
            type: 2,
            data: [
              {
                id: '2322342342',
                title: '达啊实打实多爱文章文章文章文章文章文章文章文章文章文章',
                expand: false,
                children: [
                  {
                    id: 'asdasd',
                    title: '单独文章'
                  },
                  {
                    id: '2322342342',
                    title: '测试空目录该怎么展示',
                    expand: true,
                    children: []
                  },
                  {
                    id: '2322342342',
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                      {
                        id: '2322342342',
                        title: 'leaf 1-2-1'
                      },
                      {
                        id: '2322342342',
                        title: 'leaf 1-2-1'
                      }
                    ]
                  }
                ]
              },
              {
                id: '2322342342',
                title: '多层目录',
                expand: false,
                children: [
                  {
                    id: 'sfsdfsdfsdf',
                    title: '单独文章'
                  },
                  {
                    id: '2322342342',
                    title: '目录文章',
                    expand: false,
                    children: [
                      {
                        id: '2322342342',
                        title: 'leaf 1-1-1'
                      },
                      {
                        id: '2322342342',
                        title: 'leaf 1-1-2'
                      }
                    ]
                  },
                  {
                    id: '2322342342',
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                      {
                        id: '2322342342',
                        title: 'leaf 1-2-1'
                      },
                      {
                        id: '2322342342',
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
            data: [
              {
                id: 'asd23131',
                title: 'parent 11文章文章文章文章文章文章文章文章文章文章',
                expand: true,
                children: [
                  {
                    id: 'asd23131',
                    title: '单独文章'
                  },
                  {
                    id: 'asd23131',
                    title: '目录文章',
                    expand: true,
                    children: [
                      {
                        id: 'asd23131',
                        title: 'leaf 1-1-1录文录文录文录文录文录文录文录文录文录文录文录文录文录文录文'
                      },
                      {
                        id: 'asd23131',
                        title: 'leaf 1-1-2'
                      }
                    ]
                  },
                  {
                    id: 'asd23131',
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                      {
                        id: 'asd23131',
                        title: 'leaf 1-2-1'
                      },
                      {
                        id: 'asd23131',
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
        }
      }
    },
    props: ['columnId', 'articleId'],
    computed: {
      // 自适应内容界面的宽度
      adaptiveContentWidth() {
        return 'calc(100vw - ' + (this.sidebarWidth) + 'px)'
      },
      isColumnView() {
        return this.columnId !== undefined && this.columnId !== null;
      }
    },
    methods: {
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

          }
        })
        return array;
      },
      /**
       * 为子组件定义的事件方法
       */
      updateTitle(titleValue) {
        this.docInfo.title = titleValue;
      },
      changeFontSise(value) {
        this.docStyle.docFontSize = value;
      },
      changePageSize(value) {
        this.docStyle.pageSize = value;
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
              let children = dir.data;
              this.recursiveExpansion(children, this.openAllTree);
            }
          });
        }
      },
      recursiveExpansion(children, ifOpen) {
        if (children && children.length > 0) {
          children.forEach(treeNode => {
            if (treeNode.expand !== undefined) {
              treeNode.expand = ifOpen;
            }
            this.recursiveExpansion(children.children, ifOpen)
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
        if (this.keyWords?.trim().length > 0) {
          // 清除之前的节流计时器
          if (this.throttle) {
            clearTimeout(this.throttle);
          }
          this.searchError = false;
          // 设置新的节流计时器
          this.throttle = setTimeout(() => {
            // 在这里执行特定的操作
            this.$Message.success(this.keyWords);
          }, 500); // 节流间隔为300ms
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
              if (this.keyWords?.trim().length > 0) {
                this.$Message.success('搜索。。。');
              } else {
                this.searchError = true;
              }
              break;
          }
        }
      }
    },
    mounted() {
      this.navShowType = this.isColumnView ? 'tree' : 'list';
      window.addEventListener('keydown', this.handleKeydown);
      if (this.isColumnView) {
        this.searchScope = 2;
      }
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.handleKeydown);
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/read-center.less';
</style>
