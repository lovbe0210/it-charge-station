<template>
  <b-row fluid class="header-row enable-background">
    <b-navbar class="navbar-expand-lg navbar-light" toggleable="xl" type="light">
      <!-- logo -->
      <b-navbar-brand to="/">
        <span class="iconfont icon-logo"></span>
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
              <span class="iconfont icon-search"></span>
              <input placeholder="请输入搜索关键字..." class="search-input enable-background" maxlength="250"
                     @blur="changeBorder(false)"
                     @focus="changeBorder(true)">
            </span>
          </div>
        </b-navbar-nav>

        <!-- 菜单栏 -->
        <b-navbar-nav class="menu" :fill="true" align="center">
          <b-nav-item v-for="item in quickLink" class="mr-2" :key="item.uid">
            <div v-if="item.canExpanded === 1">
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
            </div>
            <div v-else>
              <div @click="routeNavigate(item.code)">
                <span>{{item.menuName}}</span>
              </div>
            </div>
          </b-nav-item>
        </b-navbar-nav>

        <!-- 用户已登录功能栏 -->
        <b-navbar-nav v-if="loginStatus" class="ml-auto user-info" :fill="true" align="center">
          <!--用户快捷导航-->
          <b-nav-item class="avatar mr-2">
            <Dropdown placement="bottom" @on-click="routeNavigate">
              <a href="javascript:void(0)">
                <div class="avatar-wrapper">
                  <b-avatar size="40px"
                            src="https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hnvzo7s0f8j30k00tztdi.jpg"
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
                    <span class="iconfont icon-topic-doc"></span>
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
            <Dropdown placement="bottom" @on-click="readMessage">
              <a href="javascript:void(0)">
                <div class="message-menu-wrapper">
                  <div class="message-menu-body" @click="readMessage('commentReply')">
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
            <b-button class="login" variant="outline-*" size="sm" to="/login">
              登录/注册
            </b-button>
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
           :width="880"
           class-name="message-box">
      <message-notification></message-notification>
    </Modal>
  </b-row>
</template>

<script>
  import MessageNotification from "./MessageNotification";
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
            menuName: '计算机与网络',
            canExpanded: 1,
            children: [
              {
                uid: 'asds01',
                code: 'compute',
                menuName: '计算机基础'
              },
              {
                uid: 'asds02',
                code: 'system',
                menuName: '操作系统'
              },
              {
                uid: 'asds03',
                code: 'cybersecurity',
                menuName: '网络安全'
              }
            ]
          },
          {
            uid: 'asdas34213',
            menuName: '编程语言',
            canExpanded: 1,
            children: [
              {
                uid: '2342sdfsdfs',
                code: 'java',
                menuName: 'Java'
              },
              {
                uid: '2342dssddfsdf',
                code: 'c',
                menuName: 'C语言'
              },
              {
                uid: '2342dsdfsdf',
                code: 'c++',
                menuName: 'C++'
              }
            ]
          },
          {
            uid: 'sdfs453',
            menuName: '数据库',
            canExpanded: 1,
            children: [
              {
                uid: 'e65dfgdf',
                code: 'mysql',
                menuName: 'Mysql'
              },
              {
                uid: 'dfgd4634',
                code: 'oracle',
                menuName: 'Oracle'
              }
            ]
          },
          {
            uid: 'dfg345g',
            menuName: '中间件',
            canExpanded: 1,
            children: [
              {
                uid: 'e65dfgdf',
                code: 'redis',
                menuName: 'Redis'
              },
              {
                uid: 'dfgd4634',
                code: 'kafka',
                menuName: 'Kafka'
              }
            ]
          },
          {
            uid: 'sgfg566',
            code: 'algorithm',
            canExpanded: 0,
            menuName: '算法'
          },
          {
            uid: '4564gdgd',
            code: 'ramblyJot',
            canExpanded: 0,
            menuName: '随笔'
          }
        ],
        flag: false,
        maxWidth: null,
        showMessage: false
      }
    },
    components: {
      MessageNotification
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
          default:
            this.$router.push({path: '/cate/' + itemName})
            break
        }
      },
      readMessage(itemName) {
        /*
         case 'commentReply':
            this.$router.push({name: 'CommentReply'})
            break;
          case 'likesReceived':
            this.$router.push({name: 'LikesReceived'})
            break;
          case 'newFans':
            this.$router.push({name: 'NewFans'})
            break;
          case 'systemMessage':
            this.$router.push({name: 'SystemMessage'})
            break;
          case 'chatMessage':
            this.$router.push({name: 'ChatMessage'})
            break;
          case 'ramblyJot':
            this.$router.push({name: 'RamblyJot'})
            break;
        **/
        this.showMessage = true;
        console.log('阅读消息：', itemName)
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
