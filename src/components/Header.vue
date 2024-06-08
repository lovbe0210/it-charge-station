<template>
  <b-row fluid class="header-row enable-background">
    <b-navbar class="navbar-expand-lg navbar-light" toggleable="xl" type="light">
      <!-- logo -->
      <b-navbar-brand to="/" class="website-index">
        <span class="iconfont logo"></span>
        <a id="title">IT充电站</a>
      </b-navbar-brand>

      <!-- 移动端收集框 -->
      <b-navbar-toggle target="nav-collapse" toggleable="true" :style="{marginLeft:(maxWidth>0?maxWidth + 'px;':'')}">
        <template #default="{ expanded }">
          <span v-if="expanded">向上</span>
          <span v-else>向下</span>
        </template>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav @show="disableNav(true)" @hidden="disableNav(false)">
        <!-- 搜索框 -->
        <b-navbar-nav :fill="true" align="center">
          <div :class="{changeColor:changeBorderColor}" id="search_wrapp">
            <span class="index-module_input">
              <span class="iconfont i-search"></span>
              <input placeholder="请输入搜索关键字..." class="search-input enable-background" maxlength="250"
                     @blur="changeBorder(false)"
                     @focus="changeBorder(true)">
            </span>
          </div>
        </b-navbar-nav>

        <!-- 菜单栏 -->
        <b-navbar-nav class="menu" :fill="true" align="center">
          <b-nav-item v-for="item in quickLink" class="mr-2" :key="item.uid">
            <!--<div v-if="item.canExpanded === 1">
              <Dropdown trigger="hover" :transfer="true" @on-click="routeNavigate">
                <a href="javascript:void(0)">
                  <div class="menu-wrapper">
                    <div class="menu-body">
                      <span>{{item.menuName}}</span>
                    </div>
                  </div>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="item in item.children" :key="item.uid" :name="item.uid">
                    {{item.menuName}}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>-->
            <div @click="routeNavigate(item.code)">
              <span>{{item.menuName}}</span>
            </div>
          </b-nav-item>
        </b-navbar-nav>

        <!-- 用户已登录功能栏 -->
        <b-navbar-nav v-if="loginStatus" class="ml-auto user-info" :fill="true" align="center">
          <!--用户快捷导航-->
          <b-nav-item class="avatar mr-2">
            <Dropdown placement="bottom"
                      @on-click="routeNavigate"
                      transfer-class-name="enable-background dropdown-background"
                      trigger="click">
              <a href="javascript:void(0)">
                <div class="avatar-wrapper">
                  <b-avatar size="40px"
                            src="https://i3.wp.com/tvax2.sinaimg.cn/large/006BNqYCly1hosevzvlfvj31401e0tdc.jpg"
                            href="javascript:void(0)">
                    <span v-if="0" class="iconfont icon-avatar-man" style="font-size:1.8rem;"></span>
                  </b-avatar>
                </div>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="nickName">
                  <div class="nickName quick-start-item">
                    <span class="nick-name">限制长度10个字服了</span>
                  </div>
                </DropdownItem>
                <DropdownItem name="levelBar">
                  <div class="levelBar quick-start-item">
                    <div class="level-bar-progress">
                      <span :class="`iconfont icon-level`+5"/>
                      <div class="progress-wrapp">
                        <div class="totalProgress">
                          <div class="currentProgress" style="width: 40%"/>
                        </div>
                      </div>
                      <span :class="`iconfont icon-level`+6"/>
                    </div>
                    <div class="level-bar-text">
                      当前成长15977，距离升级Lv.6 还需要12823
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div class="counter quick-start-item">
                    <div class="single-count-item" @click="routeNavigate('noteHome')">
                      <div class="count-num">55</div>
                      <div class="count-text">笔记</div>
                    </div>
                    <div class="single-count-item" @click="routeNavigate('concern')">
                      <div class="count-num">32</div>
                      <div class="count-text">关注</div>
                    </div>
                    <div class="single-count-item" @click="routeNavigate('fans')">
                      <div class="count-num">110</div>
                      <div class="count-text">粉丝</div>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem name="seriesColumn">
                  <div class="routing-menu quick-start-item">
                    <span class="iconfont series-column"></span>
                    <span class="routing-content">专栏文章</span>
                    <span class="iconfont icon-more"></span>
                  </div>
                </DropdownItem>
                <DropdownItem name="userHome">
                  <div class="routing-menu quick-start-item">
                    <span class="iconfont icon-user-domain"></span>
                    <span class="routing-content">个人主页</span>
                    <span class="iconfont icon-more"></span>
                  </div>
                </DropdownItem>
                <DropdownItem name="creativeSpace" class="create-center">
                  <div class="routing-menu quick-start-item">
                    <span class="iconfont icon-data-stats"></span>
                    <span class="routing-content">创作中心</span>
                    <span class="iconfont icon-more"></span>
                  </div>
                </DropdownItem>
                <DropdownItem name="logout">
                  <div class="routing-menu quick-start-item">
                    <span class="iconfont icon-login-out"></span>
                    <span class="routing-content">退出登录</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </b-nav-item>

          <b-nav-item class="msg mr-2">
            <Dropdown placement="bottom"
                      trigger="click"
                      transfer-class-name="enable-background dropdown-background"
                      @on-click="readMessage">
              <a href="javascript:void(0)">
                <div class="message-menu-wrapper">
                  <div class="message-menu-body">
                    <div class="c-badge" v-if="1"/>
                    <span class="iconfont icon-hy-message"></span>
                  </div>
                </div>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="commentReply">
                  <div class="comment-reply quick-start-item">
                    <span>回复我的</span>
                    <Badge :count="30" overflow-count="99" class="msg-item-badge"></Badge>
                  </div>
                </DropdownItem>
                <DropdownItem name="likesReceived">
                  <div class="new-fans quick-start-item">
                    <span>收到的赞</span>
                    <Badge :count="10" overflow-count="99" class="msg-item-badge"></Badge>
                  </div>
                </DropdownItem>
                <DropdownItem name="newFans">
                  <div class="like-favorite quick-start-item">
                    <span>新增粉丝</span>
                    <Badge :count="100" overflow-count="99" class="msg-item-badge"></Badge>
                  </div>
                </DropdownItem>
                <DropdownItem name="systemMessage">
                  <div class="msg-system quick-start-item">
                    <span>系统消息</span>
                    <Badge :count="35" overflow-count="99" class="msg-item-badge"></Badge>
                  </div>
                </DropdownItem>
                <DropdownItem name="chatMessage">
                  <div class="msg-session quick-start-item">
                    <span>我的消息</span>
                    <Badge :count="8" overflow-count="99" class="msg-item-badge"></Badge>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </b-nav-item>
        </b-navbar-nav>

        <!--未登录功能栏-->
        <b-navbar-nav v-else class="ml-auto" :fill="true" align="center">
          <div class="login-register">
            <auth-modal>
              <slot>
                <Button>
                  登录/注册
                </Button>
              </slot>
            </auth-modal>
          </div>
        </b-navbar-nav>

        <!-- 公共部分 -->
        <b-navbar-nav class="ml-auto" :fill="true" align="center">
          <div class="charge">
            <b-button class="write" variant="outline-*" size="sm" @click="toWriteCenter">
              <span class="iconfont icon-charge"/>写笔记
            </b-button>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- 消息界面初始化就开始挂载 -->
    <Modal v-model="showMessage"
           :lock-scroll="true"
           :footer-hide="true"
           :width="900"
           class-name="message-box">
      <message-notification :msgNotifyTypeActive="msgNotifyTypeActive"/>
    </Modal>
  </b-row>
</template>

<script>
  import MessageNotification from "./MessageNotification";
  import AuthModal from "@/components/common/AuthModal.vue";
  export default {
    name: 'Header',
    data() {
      return {
        changeBorderColor: false,
        messageMenu: [],
        searchKey: '',
        quickLink: [
          {
            uid: 'sdfsf55',
            code: 'computenetwork',
            menuName: '计算机与网络'
          },
          {
            uid: 'asdas34213',
            menuName: '编程语言',
            code: 'language'
          },
          {
            uid: 'sdfs453',
            code: 'database',
            menuName: '数据库'
          },
          {
            uid: 'dfg345g',
            code: 'middleware',
            menuName: '中间件'
          },
          {
            uid: 'sgfg566',
            code: 'arithmetic',
            menuName: '算法'
          },
          {
            uid: '4564gdgd',
            code: 'ramblyJot',
            menuName: '随笔'
          }
        ],
        flag: false,
        maxWidth: null,
        showMessage: false,
        msgNotifyTypeActive: null
      }
    },
    components: {
      MessageNotification,
      AuthModal
    },
    computed: {
      loginStatus() {
        let userInfo = this.$store.state.userInfo
        return userInfo !== null && userInfo.token?.length === 32
      }
    },
    methods: {
      // ui交互，改变输入框的大小和颜色
      changeBorder(flag) {
        this.changeBorderColor = flag
      },
      disableNav(flag) {
        this.$store.commit('changeShowContext', flag)
      },
      // 选择消息类型并跳转到对应类型详情页面
      chooseMessage(item) {
        this.$router.push({name: item.menuKey})
      },

      // 请求登出，删除服务器token信息
      logout() {
        setTimeout(() => {
          this.$store.commit('clearUserInfo')
          this.$Message.success({
            content: '已成功退出当前用户，记得回来看看哦'
          });
          console.log(this.loginStatus);
        }, 1000)
      },
      toWriteCenter() {
        let routeUrl = this.$router.resolve({
          path: '/editor/54334ssdsds521'
        })
        window.open(routeUrl.href, '_blank')
      },

      /**
       * @param itemName 路由跳转标志
       */
      routeNavigate(itemName) {
        if (itemName === undefined) {
          return;
        }
        switch (itemName) {
          case 'logout':
            this.logout();
            break;
          case 'nickName':
            this.$router.push({name: 'Profile'})
            break;
          case 'levelBar':
            this.$router.push({name: 'Grade'})
            break;
          case 'noteHome':
            this.$router.push({name: 'NoteHome'})
            break;
          case 'fans':
            this.$router.push({path: '/dashboard/relational/fans'})
            break;
          case 'concern':
            this.$router.push({path: '/dashboard/relational/concern'})
            break;
          case 'seriesColumn':
            this.$router.push({name: 'SeriesColumn'})
            break;
          case 'userHome':
            this.$router.push({name: 'Domain'})
            break;
          case 'creativeSpace':
            this.$router.push({name: 'Stats'})
            break;
          case 'ramblyJot':
            this.$router.push({path: '/ramblyJot'})
            break;
          case 'arithmetic':
            this.$router.push({path: '/arithmetic'})
            break;
          case 'middleware':
            this.$router.push({path: '/middleware'})
            break;
          case 'database':
            this.$router.push({path: '/database'})
            break;
          case 'language':
            this.$router.push({path: '/language'})
            break;
          case 'computenetwork':
            this.$router.push({path: '/computenetwork'})
            break;
          default:
            this.$router.push({path: '/cate/' + itemName})
            break
        }
      },
      readMessage(itemName) {
        this.showMessage = true;
        this.msgNotifyTypeActive = itemName;
      }
    },
    mounted() {
      if (this.$store.state.isPhone) {
        this.maxWidth = document.documentElement.clientWidth
      }
    }
  }
</script>

<style lang="less" scoped>
  @import './css/common-var.less';
  @import "./css/header.less";
</style>
