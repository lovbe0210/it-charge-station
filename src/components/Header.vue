<template>
  <b-container  fluid>
      <b-navbar class="navbar navbar-expand-lg navbar-light " toggleable="xl" type="light">
        <!-- logo -->
        <b-navbar-brand to="/">
          <img src="../assets/logo.png" id="logo">
          <a id="title">知识库</a>
        </b-navbar-brand>

        <!-- 移动端收集框 -->
        <b-navbar-toggle target="nav-collapse" toggleable="true" class="navbar-toggle">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav @show="disableNav(true)" @hidden="disableNav(false)">
          <!-- 搜索框 -->
          <b-navbar-nav :fill="true" align="center">
            <div v-bind:class="{changeColor:style.changeBorderColor}" id="search_wrapp">
            <span class="index-module_input" :style="styleObject">
              <span class="search_icon">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="search"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
                  ></path>
                </svg>
              </span>
              <input
                placeholder="请输入搜索关键字..."
                class="search-input"
                maxlength="250"
                @blur="changeBorder(false)"
                @focus="changeBorder(true)"
              >
            </span>
            </div>
          </b-navbar-nav>

          <!-- 菜单栏 -->
          <b-navbar-nav class="menu" :fill="true" align="center">
            <b-nav-item
              v-for="item of quickLink"
              class="mr-2"
              @click="$whereGo(item.viewName)"
              :key="item.title">
              <span>{{ item.title }}</span>
            </b-nav-item>
          </b-navbar-nav>

          <!-- 用户已登录功能栏 -->
          <b-navbar-nav v-if="this.$store.getters.loginStatus" class="ml-auto" :fill="true" align="center">
            <b-button variant="dark" @click="$whereGo('articleEdit')">
              <c-svg-icon icon-class="edit-w" margin-none/>
              创作投稿
            </b-button>

            <!--用户快捷导航-->
            <b-nav-item-dropdown variant="b-popover-dark" class="mx-3" right>
              <template v-slot:button-content>
                <span class="font-weight-bold">{{ $userStore('nickname') }}</span>
              </template>
              <b-dropdown-item @click="$personInfoGo($userStore('openId'))">我的首页</b-dropdown-item>
              <b-dropdown-item @click="$whereGo('')">帮助和反馈</b-dropdown-item>
              <b-dropdown-item @click="logout">退出登录</b-dropdown-item>
            </b-nav-item-dropdown>

            <!--用户消息-->
            <Badge :count="this.$store.getters.notReadCount">
              <b-nav-item-dropdown text="动态信息" right>
                <b-dropdown-item
                  v-for="item of messageMenu"
                  @click="chooseMessage(item)"
                  :key="item.menuKey"
                >
                  <span>{{ item.menuValue }}</span>
                  <Badge :count="dealNotReadCount(item)"/>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </Badge>
          </b-navbar-nav>

          <!--未登录功能栏-->
          <b-navbar-nav v-else class="ml-auto" :fill="true" align="center">
            <div class="login-regist">
              <b-button
                class="login"
                variant="outline-*"
                size="sm"
                to="/login"
              >登录
              </b-button>
              <b-button
                variant="success outline-light"
                size="sm"
                class="regist"
                @click="$whereGo('register')"
              >快速注册
              </b-button>
            </div>
          </b-navbar-nav>

        </b-collapse>

      </b-navbar>
  </b-container>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        style: {
          border: '1px solid #d9d9d9',
          boderHover: '1px solid #25b864',
          changeBorderColor: false
        },
        messageMenu: [],
        searchKey: '',
        quickLink: [
          {
            title: '计算机与网络',
            viewName: ''
          },
          {
            title: '编程语言',
            viewName: ''
          },
          {
            title: '数据库',
            viewName: 'index'
          },
          {
            title: '算法',
            viewName: 'index'
          },
          {
            title: '中间件',
            viewName: 'index'
          },
          {
            title: 'bug的一生',
            viewName: 'index'
          },
          {
            title: '五味陈杂'
          }
        ],
        flag: false
      }
    },

    computed: {
      styleObject () {
        return {
          '--border': this.style.border,
          '--border-hover': this.style.boderHover
        }
      }
    },
    methods: {
      // ui交互，改变输入框的大小和颜色
      changeBorder (flag) {
        this.style.changeBorderColor = flag
      },
      disableNav (flag) {
        this.$store.commit('changeShowContext', flag)
      },
      dealNotReadCount (item) {
        switch (item.menuKey) {
          case 'reply':
            return this.$store.getters.notRead.notReadReplyMsgCount
          case 'comment':
            return this.$store.getters.notRead.notReadCommentMsgCount
          case 'personal':
            return this.$store.getters.notRead.notReadPersonalChatCount
          case 'system':
            return this.$store.getters.notRead.notReadReplyMsgCount
          default:
            return 0
        }
      },

      // 选择消息类型并跳转到对应类型详情页面
      chooseMessage (item) {
        this.$router.push({ name: item.menuKey })
      },

      // 请求登出，删除服务器token信息
      logout () {
        this.$apis.logout().then(() => {
          // dispatch 异步操作this,调用action里的发放 | commit 同步操作this,调用mutations里的方法
          this.$store.commit('clearUserInfo')
          this.$Message.success({
            content: '已成功退出当前用户，记得回来看看哦'
          })
          this.reload()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./css/header.less";
</style>
