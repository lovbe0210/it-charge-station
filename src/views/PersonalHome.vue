<template>
  <div class="personal-center enable-background" ref="tooltipContainer">
    <header class="layout-module_head">
      <div class="layout-header-left">
        <a href="/">
          <div class="charge-station-logo">
            <span class="iconfont icon-logo"></span>
          </div>
        </a>
      </div>
      <div class="layout-header-center"/>
      <div class="layout-header-right"/>
    </header>
    <div class="layout-main_wrapper">
      <div id="main-right-content" class="layout-module_MainContent">
        <div class="layout-module_MainContentChildren">
          <div class="main-container user-homepage">
            <div class="userInfo-module_userWrapper">
              <div class="userInfo-module_avatarWrapper">
                <div class="ant-image">
                  <img :alt="userInfo.username" class="userInfo-module_avatar"
                       :src="fileUrl(userInfo.avatarUrl)">
                </div>
              </div>
              <div class="userInfo-module_info">
                <div class="userInfo-module_name">
                  <div>
                    <span class="userInfo-module_nickname" :title="userInfo.username">
                      {{ userInfo.username }}
                    </span>
                  </div>
                  <div class="userInfo-module_level">
                    <span :class="'iconfont icon-level' + userInfo.level"></span>
                  </div>
                  <div class="userInfo-module_action" v-if="loginUser?.uid !== userInfo.uid">
                    <Button :type="isFollow === 0 ? 'success' : ''" class="userInfo-module_followBtn"
                            @click="followAction">
                      <span>{{ isFollow ? '已关注' : '关注' }}</span>
                    </Button>
                  </div>
                </div>
                <div class="userInfo-module_tag">
                  <a-tag :color="tag.color" v-for="(tag,index) in userInfo.tags" :key="index">
                    {{ tag.content }}
                  </a-tag>
                </div>
                <div class="userInfo-module_description">
                  {{ userInfo.introduction }}
                </div>
                <div class="userInfo-module_detail">
                  <span class="index-module_meta">
                    <span class="iconfont location"></span>
                    <span>{{ userInfo.location }}</span>
                  </span>
                  <span class="index-module_meta">
                    <span class="iconfont industry"></span>
                    <span>{{ userInfo.industry }}</span>
                  </span>
                </div>
                <div class="userInfo-module_followInfo">
                  <a href="/explore/follows?type=User&userId=27044221" class="userInfo-module_followItem"
                     target="_blank">
                    <p class="userInfo-module_count">{{ followCount }}</p>
                    <p class="userInfo-module_label">
                      <span>关注</span>
                    </p>
                  </a>
                  <a href="/explore/follows?type=Fans&userId=27044221" class="userInfo-module_followItem"
                     target="_blank">
                    <p class="userInfo-module_count">{{ fansCount }}</p>
                    <p class="userInfo-module_label">
                      <span>粉丝</span>
                    </p>
                  </a>
                </div>
              </div>
            </div>
            <div class="readme-module_userBoardParent">
              <div class="readme-module_userBoard">
                <div ref="container"></div>
              </div>
            </div>
            <div class="columns-module_publicColumn" v-if="columnList?.length > 0">
              <div class="columns-module_header">
                <span class="header-text">
                  专栏
                </span>
              </div>
              <div class="columns-module_column-list">
                <a-card hoverable v-for="item in columnList" :key="item.uid" size="small"
                        class="topic-card dropdown-background">
                  <img slot="cover" :alt="item.title" :src="fileUrl(item.coverUrl)"/>
                  <a-card-meta>
                    <template slot="description">
                      <!--                      <user-card :userInfo="item.userInfo"
                                                       :popoverContainer="popoverContainer">
                                              <b-avatar :src="fileUrl(item.userInfo?.avatarUrl)" variant="light"
                                                        :to="'/' + item.userInfo?.domain"
                                                        class="topic-avatar">
                                                <span v-if="!item.userInfo?.avatarUrl" class="iconfont author2"
                                                      style="font-size:2.5rem;"></span>
                                              </b-avatar>
                                            </user-card>-->
                      <a :href="'/' + item.userInfo?.domain + '/' + item.uri" target="_blank">
                        <div class="card-content-item">
                          <p class="topic-title" :title="item.title">
                            {{ item.title }}
                          </p>
                          <p class="topic-description" :title="item.synopsis">
                            {{ item.synopsis }}
                          </p>
                          <p class="topic-viewCount">
                            <span>{{ item.viewCount }}</span>次看过
                          </p>
                        </div>
                      </a>
                    </template>
                  </a-card-meta>
                </a-card>
              </div>
            </div>
            <div class="dataStats-module_hotMap">
              <hot-map></hot-map>
            </div>
            <div v-if="1 === 2">
              <p class="homepage-header" style="margin-bottom: 20px; margin-top: 50px;">更新</p>
              <div class="leastUpdate-module_cardList">
                <div class="leastUpdate-module_cardItem" v-for="item in leastUpdateList" :key="item.articleId">
                  <div class="timeline-module_container">
                    <span class="line-module_point"></span>
                    <span class="line-module_times">{{ item.time }}</span>
                  </div>
                  <div class="cardContent-module_wrapper">
                    <div class="cardContent-module_body">
                      <div class="doc-updated-info">
                        <div class="doc-updated-content">
                          <a :href="'/readCenter/doc/' + item.articleId" target="_blank">
                            <p class="doc-updated-title">{{ item.title }}</p>
                          </a>
                          <div data-testid="desc" class="doc-updated-desc">
                            <p>{{ item.summary }}</p>
                          </div>
                        </div>
                        <div class="doc-updated-extra">
                          <div class="doc-updated-countInfo">
                            <div class="simplify-like">
                              <svg width="1em" height="1em" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg"
                                   class="larkui-icon larkui-icon-like-small-before icon-svg index-module_size_wVASz"
                                   data-name="LikeSmallBefore" style="width: 24px; min-width: 24px; height: 24px;">
                                <path
                                  d="M11.006 10.201c2.32-.06 3.368 1.869 3.307 5.384l-.007.243.864-.021.635-.01.869-.005.77.009.458.013.415.02.373.026.17.015.31.036c.192.026.356.056.494.09l.094.026c1.284.377 2.164 1.466 2.328 2.646.098.71.012 1.342-.258 1.898l-.092.172.008.026c.053.236.07.471.05.786l-.017.199c-.06.61-.19 1.026-.485 1.484l.02.13c.01.1.017.218.019.368v.16c0 .649-.206 1.389-.542 1.975l-.018.026.01.046c.038.24.046.496.025.83l-.017.211c-.124 1.362-1.318 2.732-3.092 2.791-.486.016-.964.018-1.459.006l-.6-.019-.628-.032-.543-.036-1.986-.155-1.109-.105-1.316-.14-1.936-.225-1.094-.134h-2.43c-.844 0-1.562-.612-1.64-1.427l-.006-.146v-7.76c0-.885.752-1.572 1.646-1.572h2.49c.488-.798.833-1.47 1.035-2.01.262-.7.478-1.411.622-2.176l.164-.854.093-.433c.381-1.65.84-2.325 2.006-2.356Zm.042 1.6c-.096.002-.213.178-.346.604l-.074.258-.078.31-.08.364c-.028.131-.055.272-.084.423l-.07.38a14.578 14.578 0 0 1-.697 2.442c-.248.663-.653 1.446-1.214 2.357l-.024.038c.012.064.017.13.017.198v8.315l1.194.142 1.145.127 1.314.134.565.051 1.022.083 1.344.098.582.032.566.021.606.01c.304.002.605-.002.907-.012.894-.03 1.497-.721 1.553-1.337.041-.46.026-.618-.048-.858l-.121-.396.253-.328c.258-.333.452-.917.452-1.361v-.098l-.007-.246-.064-.18-.135-.438.342-.446c.216-.299.277-.482.317-.89l.011-.129c.017-.232.001-.324-.054-.49l-.163-.528.253-.327c.25-.324.343-.7.27-1.23-.08-.577-.535-1.138-1.196-1.332a1.385 1.385 0 0 0-.069-.019l-.17-.033a4.037 4.037 0 0 0-.101-.015l-.234-.028-.275-.023-.317-.019-.756-.025-.673-.007-.762.003-.85.013-1.269.035-1.234.043.067-.89c.256-3.412-.354-4.83-1.615-4.796ZM4.55 19.62v7.724c.004-.013.014-.01.045-.01l1.954-.001-.013-7.704H4.572c-.007 0-.011 0-.014-.002l-.007-.008Z"
                                  fill="#FAAD14" fill-rule="nonzero"></path>
                              </svg>
                              <span class="like-module_text">{{ item.simplifyLikeCount }}</span>
                            </div>
                            <svg width="1em" height="1em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink"
                                 class="larkui-icon larkui-icon-next-page icon-svg index-module_size_wVASz"
                                 data-name="NextPage" style="width: 16px; min-width: 16px; height: 16px;">
                              <defs>
                                <path id="3313443569a" d="M0 0h255.7v255.7H0z"></path>
                              </defs>
                              <g fill="none" fill-rule="evenodd">
                                <mask id="3313443569b" fill="#fff">
                                  <use xlink:href="#3313443569a"></use>
                                </mask>
                                <path
                                  d="M128 16c61.856 0 112 50.144 112 112s-50.144 112-112 112S16 189.856 16 128 66.144 16 128 16Zm0 19.467c-51.104 0-92.533 41.429-92.533 92.533S76.896 220.533 128 220.533s92.533-41.429 92.533-92.533S179.104 35.467 128 35.467ZM111.213 83.93c3.905-3.905 10.237-3.905 14.142 0l22.712 22.711.348.354c11.366 11.741 11.25 30.474-.348 42.073l-22.712 22.711-.215.21c-3.92 3.694-10.093 3.624-13.927-.21-3.905-3.905-3.905-10.237 0-14.142l22.712-22.711.209-.216c3.695-3.92 3.625-10.092-.21-13.927l-22.71-22.71-.21-.216c-3.695-3.92-3.625-10.093.21-13.927Z"
                                  fill="currentColor" fill-rule="nonzero" mask="url(#3313443569b)"></path>
                              </g>
                            </svg>
                            <span class="doc-updated-original">查看原文</span>
                          </div>
                        </div>
                      </div>
                      <a href="/readCenter/doc/111090423" target="_blank" v-if="item.cover">
                        <div class="doc-updated-cover"
                             :style="'background-image: url(' + item.cover + ');'">
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="leastUpdate-module_cardItem">
                  <div class="timeline-module_container">
                    <span class="line-module_point"></span>
                    <span class="line-module_times">宇宙有起点，更新也是</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <back-top :showSurprise="false"></back-top>

    <!-- 登录盒子 -->
    <div style="display: none;">
      <auth-modal key="loginPwd">
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
import userApi from "@/api/UserApi";
import socialApi from "@/api/SocialApi";
import AuthModal from "@/components/common/AuthModal.vue";
import contentPicksApi from "@/api/ContentPicksApi";
import HotMap from "@/components/common/HotMap";
import Engine from '@aomao/engine'
import {domainPlugins, cards, pluginConfig} from "@/components/common/editor/config"
import {cloneDeep} from "../utils/emoji";
import BackTop from "@/components/common/BackTop.vue";

export default {
  name: 'PersonCenter',
  data() {
    return {
      userInfo: {},
      // 工具栏内容：下拉面板、
      items: [
        [
          'fontsize',
          'fontcolor',
          'backcolor',
          'bold'
        ],
        [
          'unorderedlist',
          'orderedlist',
          'indent',
          'alignment'
        ],
        [
          {
            type: "button",
            name: "image-uploader",
            icon: `<span class="toolbar-icon iconfont pic-upload" style="font-size: 18px;"/>`,
            title: "图片"
          },
          'link',
          {
            type: "button",
            name: "table",
            icon: `<span class="toolbar-icon iconfont wb-table" style="font-size: 18px;"/>`,
            title: "表格"
          },
          {
            type: "button",
            name: "status",
            icon: `<span class="toolbar-icon iconfont wb-status" style="font-size: 18px;"/>`,
            title: "状态"
          },
          {
            type: "button",
            name: "lightblock",
            icon: `<span class="toolbar-icon iconfont wb-high-light" style="font-size: 18px;"/>`,
            title: "高亮块"
          }
        ]
      ],
      engine: null,
      followCount: 0,
      fansCount: 0,
      isFollow: 0,
      columnList: [],
      leastUpdateList: [
        {
          articleId: 'asada23sdsssaafsf',
          time: '07-04 15:23',
          title: 'Nginx ——— 深入浅出',
          summary: '引言早期的业务都是基于单体节点部署，由于前期访问流量不大，因此单体结构也可满足需求，但随着业务增长，流量也越来越大，那么最终单台服务器受到的访问压力也会逐步增高。时间一长，单台服务器性能无法跟上业务增长，就会造成线上频繁宕机的现象发生，最终导致系统瘫痪无法继续处理用户的请求。从上面的描述中，主...',
          cover: 'https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/t01948ff2341a5d1ac3.jpg',
          simplifyLikeCount: 233
        },
        {
          articleId: 'asada23sddasda23sdfsf',
          time: '07-04 15:23',
          title: 'Nginx ——— 深入浅出',
          summary: '引言早期的业务都是基于单体节点部署，由于前期访问流量不大，因此单体结构也可满足需求，但随着业务增长，流量也越来越大，那么最终单台服务器受到的访问压力也会逐步增高。时间一长，单台服务器性能无法跟上业务增长，就会造成线上频繁宕机的现象发生，最终导致系统瘫痪无法继续处理用户的请求。从上面的描述中，主...',
          cover: '',
          simplifyLikeCount: 233
        },
        {
          articleId: 'asada23sdfsf',
          time: '07-04 15:23',
          title: 'Nginx ——— 深入浅出',
          summary: '引言早期的业务都是基于单体节点部署，由于前期访问流量不大，因此单体结构也可满足需求，但随着业务增长，流量也越来越大，那么最终单台服务器受到的访问压力也会逐步增高。时间一长，单台服务器性能无法跟上业务增长，就会造成线上频繁宕机的现象发生，最终导致系统瘫痪无法继续处理用户的请求。从上面的描述中，主...',
          // cover: require('@/assets/cover/cover2.png'),
          simplifyLikeCount: 233
        }
      ]
    }
  },
  props: ['domain'],
  computed: {
    loginUser() {
      return this.$store.state.userInfo;
    },
    loginStatus() {
      let userInfo = this.$store.state.userInfo
      return userInfo !== null && userInfo.token?.length === 32
    },
    finalConfig() {
      let config = cloneDeep(pluginConfig);
      config.table.enableScroll = false;
      return config;
    }
  },
  components: {
    AuthModal,
    HotMap,
    BackTop
  },
  methods: {
    fileUrl(path) {
      return this.fileService + path;
    },
    followAction() {
      if (!this.loginStatus) {
        let loginBtn = document.getElementById("pwdLoginBtn");
        if (loginBtn) {
          loginBtn.click();
        }
        return;
      }
      // 根据当前状态判断要执行的操作
      let attentionRequest = {
        targetUser: this.userInfo?.uid,
        action: this.isFollow === 1 ? 0 : 1
      }
      socialApi.followAction(attentionRequest).then(data => {
        if (data?.result) {
          this.$Message.success(this.isFollow ? '已取消关注' : '关注成功');
          this.isFollow = attentionRequest.action;
          if (attentionRequest.action === 1) {
            this.fansCount++;
          } else {
            this.fansCount = (this.fansCount - 1) < 0 ? 0 : (this.fansCount - 1);
          }
        }
      })
    }
  },
  created() {
    userApi.getUserInfoByDomain(this.domain).then(data => {
      if (data?.result) {
        this.userInfo = data.data;
        // 获取粉丝关注数
        socialApi.getRelationshipCount(this.userInfo.uid).then(data => {
          if (data?.result) {
            this.followCount = data.data.follow;
            this.fansCount = data.data.fans;
          }
        })
        // 如果是登录用户，获取关注状态
        if (this.loginStatus && this.userInfo.uid !== this.loginUser.uid) {
          socialApi.getFollowAction(this.userInfo.uid).then(data => {
            if (data?.result) {
              if (data.data?.userIdMaster === this.loginUser.uid) {
                this.isFollow = data.data.masterWatchSlave;
              } else if (data.data?.userIdSlave === this.loginUser.uid) {
                this.isFollow = data.data.slaveWatchMaster;
              }
            }
          })
        }
        // 获取公开专栏
        contentPicksApi.getDomainPublicColumn(this.userInfo.uid).then(data => {
          if (data?.result) {
            this.columnList = data.data;
          }
        })
        // 获取个人主页内容
        if (!this.userInfo.contentId) {
          return;
        }
        const container = this.$refs.container;
        if (container) {
          //实例化引擎
          const engine = new Engine(container, {
            // 启用插件
            plugins: domainPlugins,
            // 启用卡片
            cards,
            // 所有的插件配置
            config: this.finalConfig,
            autoPrepend: false,
            // 文档提示语
            placeholder: '',
            // 阅读模式
            readonly: true
          });
          // 设置显示成功消息UI，默认使用 console.log
          engine.messageSuccess = (msg) => {
            console.log(msg);
          };
          // 设置显示错误消息UI，默认使用 console.error
          engine.messageError = (error) => {
            console.log(error);
          };

          // 获取个人主页内容
          userApi.getDomainContent(this.userInfo.contentId).then(data => {
            if (data?.result) {
              if (data.data && data.data.length > 0) {
                engine.setJsonValue(JSON.parse(data.data));
              }
            }
          })
          this.engine = engine;
        }
      }
    });
  }
}
</script>

<style scoped lang="less">
@import '../components/css/personal-center.less';
</style>
