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
          <b-nav-item v-for="item of quickLink" class="mr-2" :key="item.uid">
            <Dropdown trigger="hover" :transfer="true">
              <a href="javascript:void(0)">
                <span>{{item.menuName}}</span>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem v-for="item in item.children" :key="item.uid">
                  {{item.menuName}}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </b-nav-item>
        </b-navbar-nav>

        <!-- 用户已登录功能栏 -->
        <b-navbar-nav v-if="loginStatus" class="ml-auto user-info" :fill="true" align="center">
          <!--用户快捷导航-->
          <b-nav-item class="avatar mr-2">
            <Dropdown placement="bottom" @on-click="routeNavigate">
              <a href="javascript:void(0)">
                <div class="avatar-wrapper">
                  <b-avatar size="40px" src="https://tva3.sinaimg.cn/large/718153f4gy1gy47gg8nutj20m80m8te2.jpg">
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
                <DropdownItem name="counter">
                  <div class="counter quick-start-item">
                    <div class="single-count-item" @click="routeNavigate('fans')">
                      <div class="count-num">55</div>
                      <div class="count-text">粉丝</div>
                    </div>
                    <div class="single-count-item" @click="routeNavigate('concern')">
                      <div class="count-num">32</div>
                      <div class="count-text">关注</div>
                    </div>
                    <div class="single-count-item" @click="routeNavigate('liked')">
                      <div class="count-num">110</div>
                      <div class="count-text">获赞</div>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem name="topicDoc">
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
                <DropdownItem name="creativeSpace">
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
            <Dropdown placement="bottom">
              <a href="javascript:void(0)">
                <div class="message-menu-wrapper">
                  <div class="message-menu-body">
                    <div class="c-badge" v-if="1"></div>
                    <span>消息</span>
                  </div>
                </div>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <div class="comment-reply quick-start-item">
                    <span>评论回复</span>
                    <Badge :count="30" overflow-count="99" class="msg-item-badge"></Badge>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div class="new-fans quick-start-item">
                    <span>新增粉丝</span>
                    <Badge :count="10" overflow-count="99" class="msg-item-badge"></Badge>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div class="like-favorite quick-start-item">
                    <span>赞和收藏</span>
                    <Badge :count="100" overflow-count="99" class="msg-item-badge"></Badge>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div class="msg-system quick-start-item">
                    <span>系统消息</span>
                    <Badge :count="35" overflow-count="99" class="msg-item-badge"></Badge>
                  </div>
                </DropdownItem>
                <DropdownItem>
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
  </b-row>
</template>

<script>
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
            children: [
              {
                uid: 'asds01',
                menuName: '计算机基础'
              },
              {
                uid: 'asds02',
                menuName: '操作系统'
              },
              {
                uid: 'asds03',
                menuName: '网络安全'
              }
            ]
          },
          {
            uid: 'asdas34213',
            menuName: '编程语言',
            children: [
              {
                uid: '2342sdfsdfs',
                menuName: 'Java'
              },
              {
                uid: '2342dssddfsdf',
                menuName: 'C语言'
              },
              {
                uid: '2342dsdfsdf',
                menuName: 'C++'
              }
            ]
          },
          {
            uid: 'sdfs453',
            menuName: '数据库',
            children: [
              {
                uid: 'e65dfgdf',
                menuName: 'Mysql'
              },
              {
                uid: 'dfgd4634',
                menuName: 'Oracle'
              }
            ]
          },
          {
            uid: 'sgfg566',
            menuName: '算法'
          },
          {
            uid: 'dfg345g',
            menuName: '中间件'
          },
          {
            uid: '4564gdgd',
            menuName: 'bug的一生'
          },
          {
            uid: 'sdgf6567',
            menuName: '五味陈杂'
          }
        ],
        flag: false,
        maxWidth: null
      }
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
          path: '/writeCenter'
        })
        window.open(routeUrl.href, '_blank')
      },

      /**
       * @param itemName 路由跳转标志
       */
      routeNavigate(itemName) {
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
          case 'fans':
            this.$router.push({name: 'Grade'})
            break;
          case 'concern':
            this.$router.push({name: 'Grade'})
            break;
          case 'liked':
            this.$router.push({name: 'Grade'})
            break;
          case 'userHome':
            this.$router.push({name: 'Domain'})
            break;
          case 'creativeSpace':
            this.$router.push({name: 'Stats'})
            break;
        }
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
