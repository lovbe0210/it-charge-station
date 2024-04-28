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
                  <span class="iconfont icon-logo"></span>
                </a>
                <span class="iconfont icon-more"></span>
                <div class="action">
                  <a href="/lovbe0210" class="crumb-text">布衣草人</a>
                  <a-tooltip overlayClassName="read-header-tooltip"
                             :getPopupContainer="()=>this.$refs.tooltipContainer">
                    <template slot="title">
                      关注
                    </template>
                    <span class="iconfont to-follow"></span>
                  </a-tooltip>
                  <a-tooltip overlayClassName="read-header-tooltip"
                             :getPopupContainer="()=>this.$refs.tooltipContainer">
                    <template slot="title">
                      发消息
                    </template>
                    <span class="iconfont start-chat"></span>
                  </a-tooltip>
                </div>
              </div>
            </div>
          </div>
          <div class="directory-nav"
               :style="{ width: sidebarWidth + 'px',
               'will-change': isDragging ? 'width' : null,
               transition: isDragging ? 'width 200ms cubic-bezier(0.1, 0, 0, 1) 0s' : null }">
            <div class="search-nav">
              <div class="search-bar">
                <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                     class="larkui-icon larkui-icon-help-search ReaderLayout-module_navIcon_eoaa4">
                  <path
                    d="M114 20c51.362 0 93 41.638 93 93 0 21.782-7.489 41.816-20.032 57.666l45.82 46.277c4.275 4.317 4.24 11.282-.077 15.556-4.317 4.275-11.281 4.24-15.556-.077l-45.774-46.23C155.576 198.602 135.652 206 114 206c-51.362 0-93-41.638-93-93s41.638-93 93-93Zm0 20c-40.317 0-73 32.683-73 73s32.683 73 73 73 73-32.683 73-73-32.683-73-73-73Z"
                    fill="currentColor" fill-rule="nonzero">
                  </path>
                </svg>
                <span>搜索</span>
                <span class="search-hot-key">Ctrl + J</span>
              </div>
            </div>
            <div class="home-nav" v-if="columnId !== undefined"
                 @click="routeNavigate('columnIndex')">
              <span class="iconfont icon-nav-home"></span>
              <span>专栏首页</span>
            </div>
            <div class="nav-tabs">
              <div class="tabs-bar">
                <span class="tab-title popover-trigger"
                      @click="navShowType = isColumnView ? (navShowType === 'tree' ? 'list' : 'tree') : navShowType">
                  <span :class="['iconfont', navShowType === 'tree' ? 'icon-nav-tree' : 'list']"></span>
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
                    children: [

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
        view: null
      }
    },
    props: ['columnId', 'articleId'],
    computed: {
      // 自适应内容界面的宽度
      adaptiveContentWidth() {
        return 'calc(100vw - ' + (this.sidebarWidth) + 'px)'
      },
      isColumnView() {
        return this.columnId !== undefined;
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
      }

    },
    mounted() {
      // (document.body)?.setAttribute('style', "overflow: hidden;");
      // window.addEventListener('resize', this.checkFullscreen);
      // const scrollContainer = this.$refs.scrollbarContext;
      // scrollContainer?.addEventListener('wheel', this.handleScrollForToc);
      this.navShowType = this.isColumnView ? 'tree' : 'list';
    }
  }
</script>

<style scoped lang="less">
  @import '../components/css/read-center.less';
</style>
