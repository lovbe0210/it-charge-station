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
              <input :placeholder="placeholder"
                     class="search-input"
                     maxlength="250"
                     v-model="keywords"
                     @blur="changeBorderColor = false"
                     @focus="changeBorderColor = true" @keydown.enter="search">
            </span>
          </div>
        </b-navbar-nav>

        <!-- 菜单栏 -->
        <b-navbar-nav class="menu" :fill="true" align="center">
          <b-nav-item v-for="item in firstMenu"
                      :class="['mr-2', activeMenu === item.menuCode ? 'active' : '']"
                      :key="item.uid">
            <div @click="routeNavigate(item.menuCode)">
              <span>{{ item.menuName }}</span>
            </div>
          </b-nav-item>
        </b-navbar-nav>

        <!-- 用户已登录功能栏 -->
        <b-navbar-nav v-if="loginStatus" class="ml-auto user-info" :fill="true" align="center">
          <!--用户快捷导航-->
          <b-nav-item class="avatar mr-2">
            <Dropdown placement="bottom"
                      @on-click="routeNavigate"
                      @on-visible-change="updateUnreadStatistic"
                      transfer-class-name="dropdown-background"
                      trigger="click">
              <a href="javascript:void(0)">
                <div class="avatar-wrapper">
                  <b-avatar size="40px"
                            :src="this.fileService + userInfo.avatarUrl"
                            href="javascript:void(0)">
                    <span v-if="!userInfo.avatarUrl">{{ userInfo.username }}</span>
                  </b-avatar>
                </div>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="nickName">
                  <div class="nickName quick-start-item">
                    <span class="nick-name">{{ userInfo.username }}</span>
                  </div>
                </DropdownItem>
                <DropdownItem name="levelBar">
                  <div class="levelBar quick-start-item">
                    <div class="level-bar-progress">
                      <span :class="`iconfont icon-level`+ userInfo.level"/>
                      <div class="progress-wrapp">
                        <div class="totalProgress">
                          <div class="currentProgress" style="width: 40%"/>
                        </div>
                      </div>
                      <span :class="`iconfont icon-level`+ (userInfo.level + 1)"/>
                    </div>
                    <div class="level-bar-text">
                      当前成长{{ userInfo.growthValue }}，距离升级Lv.{{ userInfo.level + 1 }} 还需要12823
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div class="counter quick-start-item">
                    <div class="single-count-item" @click="routeNavigate('article')">
                      <div class="count-num">{{ userStatistic.articleCount }}</div>
                      <div class="count-text">文章</div>
                    </div>
                    <div class="single-count-item" @click="routeNavigate('follow')">
                      <div class="count-num">{{ userStatistic.followCount }}</div>
                      <div class="count-text">关注</div>
                    </div>
                    <div class="single-count-item" @click="routeNavigate('fans')">
                      <div class="count-num">{{ userStatistic.fansCount }}</div>
                      <div class="count-text">粉丝</div>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem name="creativeSpace">
                  <div class="routing-menu quick-start-item">
                    <span class="iconfont creation-center"></span>
                    <span class="routing-content">创作空间</span>
                    <span class="iconfont i-more"></span>
                  </div>
                </DropdownItem>
                <DropdownItem name="personInfo">
                  <div class="routing-menu quick-start-item">
                    <span class="iconfont person-info"></span>
                    <span class="routing-content">个人中心</span>
                    <span class="iconfont i-more"></span>
                  </div>
                </DropdownItem>
                <DropdownItem name="growthTrajector" class="growth-trajector">
                  <div class="routing-menu quick-start-item">
                    <span class="iconfont data-stats"></span>
                    <span class="routing-content">成长轨迹</span>
                    <span class="iconfont i-more"></span>
                  </div>
                </DropdownItem>
                <DropdownItem name="logout">
                  <div class="routing-menu quick-start-item">
                    <span class="iconfont login-out"></span>
                    <span class="routing-content">退出登录</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </b-nav-item>

          <b-nav-item class="msg mr-2">
            <Dropdown placement="bottom"
                      trigger="click"
                      @on-visible-change="updateUnreadStatistic"
                      :transfer-class-name="messageSetting.msgCount ? 'dropdown-background dropdown-item-all-hover show-count' : 'dropdown-background dropdown-item-all-hover'"
                      @on-click="readMessage">
              <a href="javascript:void(0)">
                <div class="message-menu-wrapper">
                  <div class="message-menu-body">
                    <div class="c-badge" v-if="unreadStatistic.unreadTotal && messageSetting.newMsgDot"/>
                    <span class="iconfont i-message"></span>
                  </div>
                </div>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="commentReply">
                  <div class="comment-reply quick-start-item">
                    <span>回复我的</span>
                    <Badge v-show="messageSetting.msgCount"
                           :count="unreadStatistic.commentCount"
                           overflow-count="99"
                           class="msg-item-badge"/>
                  </div>
                </DropdownItem>
                <DropdownItem name="likesReceived">
                  <div class="new-fans quick-start-item">
                    <span>收到的赞</span>
                    <Badge v-show="messageSetting.msgCount"
                           :count="unreadStatistic.likeCount"
                           overflow-count="99"
                           class="msg-item-badge"/>
                  </div>
                </DropdownItem>
                <DropdownItem name="newFans">
                  <div class="like-favorite quick-start-item">
                    <span>新增关注</span>
                    <Badge v-show="messageSetting.msgCount"
                           :count="unreadStatistic.newFollowCount"
                           overflow-count="99"
                           class="msg-item-badge"/>
                  </div>
                </DropdownItem>
                <DropdownItem name="systemMessage">
                  <div class="msg-system quick-start-item">
                    <span>系统消息</span>
                    <Badge v-show="messageSetting.msgCount"
                           :count="unreadStatistic.systemMsgCount"
                           overflow-count="99"
                           class="msg-item-badge"/>
                  </div>
                </DropdownItem>
                <DropdownItem name="chatMessage">
                  <div class="msg-session quick-start-item">
                    <span>我的消息</span>
                    <Badge v-show="messageSetting.msgCount"
                           :count="unreadStatistic.chatMsgCount"
                           overflow-count="99"
                           class="msg-item-badge"/>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </b-nav-item>
        </b-navbar-nav>

        <!--未登录功能栏-->
        <b-navbar-nav v-else class="ml-auto" :fill="true" align="center">
          <div class="login-register">
            <Button type="text" class="login" @click="login(false)">
              <span>登陆</span>
            </Button>
            <Button type="success" class="register" @click="login(true)">
              <span>快速注册</span>
            </Button>
          </div>
        </b-navbar-nav>

        <!-- 公共部分 -->
        <b-navbar-nav class="ml-auto" :fill="true" align="center">
          <div class="charge">
            <Button type="success" v-if="loginStatus" @click="toWriteCenter">
              <span>写文章</span>
            </Button>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- 登录盒子 -->
    <div style="display: none;">
      <auth-modal key="loginPwd">
        <slot>
          <Button id="pwdLoginBtn">
            <span>登陆</span>
          </Button>
        </slot>
      </auth-modal>
      <auth-modal :quickRegister="true" key="loginCode">
        <slot>
          <Button id="quickLoginBtn">
            <span>登陆</span>
          </Button>
        </slot>
      </auth-modal>
    </div>

    <!-- 消息界面初始化就开始挂载 -->
    <Modal v-model="showMessage"
           v-if="loginStatus"
           :lock-scroll="true"
           :footer-hide="true"
           :width="900"
           class-name="message-box">
      <message-notification :propsActiveMenu="propsActiveMenu"
                            @changeModalStatus="showMessage = false"/>
    </Modal>
  </b-row>
</template>

<script>
import MessageNotification from "./MessageNotification";
import AuthModal from "@/components/common/AuthModal.vue";
import AuthApi from "@/api/AuthApi";
import WriteCenterApi from "@/api/WriteCenterApi";
import msgNoticeApi from "@/api/MsgNoticeApi";
import userApi from "@/api/UserApi";

export default {
  name: 'Header',
  data() {
    return {
      keywords: '',
      placeholder: '请输入搜索关键字...',
      changeBorderColor: false,
      messageMenu: [],
      searchKey: '',
      firstMenu: [],
      flag: false,
      maxWidth: null,
      showMessage: false,
      // 路由对应分类菜单
      activeMenu: null,
      // 下拉菜单对应消息盒子菜单
      propsActiveMenu: null,
      unreadStatistic: {
        commentCount: 0,
        likeCount: 0,
        newFollowCount: 0,
        systemMsgCount: 0,
        chatMsgCount: 0,
        unreadTotal: 0
      },
      userStatistic: {
        articleCount: 0,
        columnCount: 0,
        fansCount: 0,
        followCount: 0
      }
    }
  },
  components: {
    MessageNotification,
    AuthModal
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    loginStatus() {
      let userInfo = this.$store.state.userInfo
      return userInfo !== null && userInfo.token?.length === 32
    },
    messageSetting() {
      return this.$store.state.messageSetting;
    },
    chatMessage() {
      return this.$store.state.chatMessage;
    }
  },
  watch: {
    '$route'(to, from) {
      // 处理路由变化
      let activeMenu = to.path?.replace('/', '');
      this.activeMenu = activeMenu;
    },
    'chatMessage.activeSessionId'(val) {
      if (val) {
        this.propsActiveMenu = 'chatMessage'
        this.showMessage = true;
      }
    },
    'showMessage'(val) {
      if (!val) {
        this.propsActiveMenu = null;
        this.$store.commit("updateChatSession", null);
      }
    }
  },
  methods: {
    disableNav(flag) {
      this.$store.commit('changeShowContext', flag)
    },
    login (quickLogin) {
      let loginBtnId = quickLogin ? 'quickLoginBtn' : 'pwdLoginBtn';
      let loginBtn = document.getElementById(loginBtnId);
      if (loginBtn) {
        loginBtn.click();
      }
    },
    // 请求登出，删除服务器token信息
    logout() {
      let userInfo = this.$store.state.userInfo
      if (userInfo.token) {
        AuthApi.logout(this).then(() => {
          this.$store.commit('clearUserInfo');
          this.$Message.success('已成功退出当前用户，记得回来看看哦')
          // 如果路由在首页或者recommend，则刷新页面，其他都回到首页
          let path = this.$router.currentRoute.path;
          if (path === "/" || path === "/recommend") {
            this.$router.go(0);
          } else {
            this.$router.replace("/");
          }
        })
      } else {
        this.$store.commit('clearUserInfo');
        this.$Message.success('已成功退出当前用户，记得回来看看哦')
        setTimeout(() => {
          let path = this.$router.currentRoute.path;
          if (path === "/" || path === "/recommend") {
            this.$router.go(0);
          } else {
            this.$router.replace("/");
          }
        }, 250)
      }
    },
    toWriteCenter() {
      // 创建空白文档
      WriteCenterApi.createBlankDoc().then(data => {
        if (data?.result) {
          let uri = data.data.uri;
          let routeUrl = this.$router.resolve({
            path: '/editor/' + uri
          })
          window.open(routeUrl.href, '_blank')
        }
      })
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
        case 'article':
          this.$router.push({name: 'Article'})
          break;
        case 'fans':
          this.$router.push({path: '/user/relational/fans'})
          break;
        case 'follow':
          this.$router.push({path: '/user/relational/follow'})
          break;
        case 'creativeSpace':
          this.$router.push({path: '/creative'})
          break;
        case 'personInfo':
          this.$router.push({path: '/user'})
          break;
        case 'growthTrajector':
          this.$router.push({name: 'Stats'})
          break;
        case 'ramblyJot':
          this.$router.push({path: '/ramblyJot'})
          break;
        case 'algthm':
          this.$router.push({path: '/algthm'})
          break;
        case 'midware':
          this.$router.push({path: '/midware'})
          break;
        case 'database':
          this.$router.push({path: '/database'})
          break;
        case 'lang':
          this.$router.push({path: '/lang'})
          break;
        case 'technet':
          this.$router.push({path: '/technet'})
          break;
        default:
          this.$router.push({path: '/cate/' + itemName})
          break
      }
    },
    // 选择消息类型并跳转到对应类型详情页面
    readMessage(itemName) {
      this.propsActiveMenu = itemName;
      this.showMessage = true;
    },
    updateUnreadStatistic(visible) {
      if (!visible) {
        return;
      }
      // 获取未读通知
      msgNoticeApi.getUnreadStatistic().then(data => {
        if (data?.result) {
          this.unreadStatistic = data.data;
        }
      })
    },
    updateUserStatistic(visible) {
      if (!visible) {
        return;
      }
      userApi.getUserStatistic().then(data => {
        if (data?.result) {
          this.userStatistic = data?.data;
        }
      })
    },
    search() {
      if (!this.keywords) {
        return;
      }
      let path = '/search?k=' + (this.keywords ? this.keywords : this.placeholder);
      this.$router.push({path: path})
    }
  },
  mounted() {
    if (this.$store.state.isPhone) {
      this.maxWidth = document.documentElement.clientWidth
    }
    let path = this.$route.path;
    this.activeMenu = path?.replace('/', '');
  },
  created() {
    // 获取菜单分类
    this.firstMenu = this.$store.state.firstMenu;
    WriteCenterApi.getMenuList().then(data => {
      if (data?.result) {
        let _data = data.data;
        this.firstMenu = _data.filter(menu => menu.type === 1)
        this.firstMenu.push({
          uid: 'ramblyJot',
          menuCode: 'ramblyJot',
          menuName: '随笔'
        })
      }
    })
    if (!this.loginStatus) {
      return;
    }
    // 获取消息显示设置
    msgNoticeApi.getNoticeSetting().then(data => {
      if (data?.result) {
        this.$store.commit("messageSetting", data.data);
      }
    })
    // 获取未读通知
    msgNoticeApi.getUnreadStatistic().then(data => {
      if (data?.result) {
        this.unreadStatistic = data.data;
      }
    })
    // 获取统计信息
    userApi.getUserStatistic().then(data => {
      if (data?.result) {
        this.userStatistic = data?.data;
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import './css/common-var.less';
@import "./css/header.less";
</style>
