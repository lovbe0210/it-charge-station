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
          <div :class="{changeColor:style.changeBorderColor}" id="search_wrapp">
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
              <input placeholder="请输入搜索关键字..." class="search-input enable-background" maxlength="250"
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
        <b-navbar-nav v-if="loginStatus" class="ml-auto user-info" :fill="true" align="center">
          <!--用户快捷导航-->
          <b-nav-item class="mr-2" @mouseenter="isHover('personalDp')" @mouseleave="isHover('personalDp')">
            <b-dropdown size="lg" variant="link" no-caret ref="personalDp">
              <template #button-content>
                <b-avatar size="47px" src="https://tva1.sinaimg.cn/large/718153f4gy1gxuwa0i6g0j20m80rsdln.jpg">
                  <span v-if="0" class="iconfont icon-avatar-man" style="font-size:1.8rem;"></span>
                </b-avatar>
              </template>
              <b-dropdown-header id="dropdown-header">
                <div class="nickName">
                  <span class="nick-name">限制长度10个字服了</span>
                  <span :class="`iconfont icon-level`+5"/>
                </div>
                <div class="counter">
                  <div>
                    笔记
                    <b-link to="/editerator" style="color:rgba(16,16,16,0.95);font-weight:600;">23</b-link>
                    篇
                  </div>
                  <div>
                    收藏
                    <b-link to="/editerator" style="color:rgba(16,16,16,0.95);font-weight:600;">32</b-link>
                    个
                  </div>
                  <div>
                    收到的赞
                    <b-link to="/editerator" style="color:rgba(16,16,16,0.95);font-weight:600;">113</b-link>
                    个
                  </div>
                </div>
              </b-dropdown-header>
              <b-dropdown-item to="/haha">
                <span class="iconfont icon-personal-woman" style="font-size:17px;margin-left:5px;"></span>
                <span style="font-size: 15px;">个人主页</span>
              </b-dropdown-item>
              <b-dropdown-item to="/haha">
                <span class="iconfont icon-creation-center" style="font-size:17px;margin-left:5px;"></span>
                <span style="font-size: 15px;">创作空间</span>
              </b-dropdown-item>
              <b-dropdown-item @click="logout">
                <span class="iconfont icon-exit" style="font-size:18px;margin-left:5px;"></span>
                <span style="font-size: 15px;">退出登录</span>
              </b-dropdown-item>
            </b-dropdown>
          </b-nav-item>

          <b-nav-item class="msg mr-2"  @mouseenter="isHover('msgDp')" @mouseleave="isHover('msgDp')">
            <b-dropdown size="md" variant="link" no-caret ref="msgDp">
              <template #button-content>
                <div class="c-badge" v-if="1"></div>
                <span>消息</span>
              </template>
              <b-dropdown-item to="/msgMenu/comment" link-class="person-center">
                <span style="font-size: 15px;">回复我的</span>
                <Badge :count="10" overflow-count="99" class="msg-badge"></Badge>
              </b-dropdown-item>
              <b-dropdown-item to="/msgMenu/like">
                <span style="font-size: 15px;">收到的赞</span>
                <Badge :count="100" overflow-count="99" class="msg-badge"></Badge>
              </b-dropdown-item>
              <b-dropdown-item to="/msgMenu/system">
                <span style="font-size: 15px;">系统通知</span>
                <Badge :count="35" overflow-count="99" class="msg-badge"></Badge>
              </b-dropdown-item>
              <b-dropdown-item to="/msgMenu/personal">
                <span style="font-size: 15px;">我的消息</span>
                <Badge :count="8" overflow-count="99" class="msg-badge"></Badge>
              </b-dropdown-item>
            </b-dropdown>
          </b-nav-item>
        </b-navbar-nav>

        <!--未登录功能栏-->
        <b-navbar-nav v-else class="ml-auto" :fill="true" align="center">
          <div class="login-register">
            <b-button
              class="login"
              variant="outline-*"
              size="sm"
              to="/login"
            >登录/注册
            </b-button>
          </div>
        </b-navbar-nav>

        <!-- 公共部分 -->
        <b-navbar-nav class="ml-auto" :fill="true" align="center">
          <div class="charge">
            <b-button
              class="write"
              variant="outline-*"
              size="sm"
              to="/login"
            ><span class="iconfont icon-charge"></span>写笔记
            </b-button>
          </div>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
  </b-row>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        style: {
          border: '1px solid #d9d9d9',
          borderHover: '1px solid #00AE9D',
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
        flag: false,
        maxWidth: null
      }
    },

    computed: {
      styleObject() {
        return {
          '--border': this.style.border,
          '--border-hover': this.style.borderHover
        }
      },
      loginStatus() {
        let userInfo = this.$store.state.userInfo
        return userInfo !== null && userInfo.token && userInfo.token.length === 32
      }
    },
    methods: {
      // ui交互，改变输入框的大小和颜色
      changeBorder(flag) {
        this.style.changeBorderColor = flag
      },
      disableNav(flag) {
        this.$store.commit('changeShowContext', flag)
      },
      isHover(flag) {
        let event = {
          type: 'click',
          keyCode: '-1',
          preventDefault: function () {},
          stopPropagation: function () {}
        }
        if (flag === 'personalDp') {
          this.$refs.personalDp.toggle(event)
        } else if (flag === 'msgDp') {
          this.$refs.msgDp.toggle(event)
        }
      },
      // 选择消息类型并跳转到对应类型详情页面
      chooseMessage(item) {
        this.$router.push({ name: item.menuKey })
      },

      // 请求登出，删除服务器token信息
      logout() {
        // 先隐藏dropdown，然后退出登录
        this.isHover()
        this.$store.commit('clearUserInfo', '我是传递的值')
        this.$Message.success({
          content: '已成功退出当前用户，记得回来看看哦'
        })
        console.log(this.$store.state.userInfo)
        /*this.$apis.logout().then(() => {
          // dispatch 异步操作this,调用action里的发放 | commit 同步操作this,调用mutations里的方法
          this.$store.commit('clearUserInfo')
          this.$Message.success({
            content: '已成功退出当前用户，记得回来看看哦'
          })
        })*/
      }
    },
    mounted() {
      if (this.$store.state.isPhone) {
        this.maxWidth = document.documentElement.clientWidth
      }

      // 判断是点击触发的切换事件还是自定义触发的
      this.$refs.personalDp.$on('toggle', bvEvent => {
        if (bvEvent.keyCode !== '-1') {
          bvEvent.preventDefault()
          this.$router.push('/accCenter')
        }
      })
      this.$refs.msgDp.$on('toggle', bvEvent => {
        if (bvEvent.keyCode !== '-1') {
          bvEvent.preventDefault()
          this.$router.push('/msgMenu')
        }
      })
    },
    beforeDestroy() {
      // 关闭监听的事件
      this.$refs.personalDp.$off('toggle')
      this.$refs.msgDp.$off('toggle')
    }
  }
</script>

<style lang="less" scoped>
  @import './css/common-var.less';
  @import "./css/header.less";
</style>
