<template>
  <div class="layout-module_RamblyJot-container adjust" ref="tooltipContainer">
    <div class="rambly-header" @click="$router.go(-1)">
      <span class="iconfont return"></span>
      <span>返回</span>
    </div>
    <div class="rambly-info">
      <div class="content-title">
        <span>{{ ramblyJot.title }}</span>
      </div>
      <a-tooltip overlayClassName="read-header-tooltip"
                 trigger="click"
                 placement="left"
                 v-if="loginStatus && ramblyJot.userInfo?.uid === userInfo?.uid"
                 :getPopupContainer="()=>this.$refs.tooltipContainer">
        <template slot="title">
          <div class="operate-wrap">
            <Poptip confirm title="确认删除随笔?"
                    placement="bottom"
                    @on-ok="deleteRamblyJot">
              <span class="delete-text">删除</span>
            </Poptip>
            <span class="separation">|</span>
            <Dropdown placement="bottom"
                      trigger="click"
                      @on-click="updatePublicStatus"
                      transfer-class-name="dropdown-background dropdown-item-all-hover">
              <a href="javascript:void(0)">
                <span class="public--range-text">{{ ramblyJot.isPublic === 1 ? '互联网可见' : '仅自己可见' }}</span>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem :name="1">
                  <div style="min-width: 20px">
                    <span class="iconfont true" v-if="ramblyJot.isPublic === 1"></span>
                  </div>
                  互联网可见
                </DropdownItem>
                <DropdownItem :name="0">
                  <div style="min-width: 20px">
                    <span class="iconfont true" v-if="ramblyJot.isPublic === 0"></span>
                  </div>
                  仅自己可见
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </template>
        <div class="operate-box">
          <span class="iconfont more2"/>
        </div>
      </a-tooltip>
    </div>
    <div ref="reader" class="rambly-content">
    </div>
    <!-- 点赞信息 -->
    <div class="reward-module_like un-select">
      <div class="like-btn" @click="likeMark">
        <span :class="['like-btn-icon', ramblyJot.ifLike ? 'liked' : 'will-like']"></span>
      </div>
      <p class="like-count" v-if="ramblyJot.likeCount > 0">{{ ramblyJot.likeCount }} 人点赞</p>
      <ul class="like-user-list">
        <li v-for="user in ramblyJot.likeUserList" :key="user.uid">
          <user-card :userInfo="user" :popoverContainer="tooltipContainer" class="user-info-card-box">
            <slot>
              <b-avatar :src="fileUrl(user.avatarUrl)" variant="light" href="javascript:void(0)" size="2.2rem">
                <span v-if="!user.avatarUrl">{{ user.username }}</span>
              </b-avatar>
            </slot>
          </user-card>
        </li>
        <!-- 超出13时只展示13个，然后显示更多 -->
        <li v-if="ramblyJot.likeCount > 13" class="show-more-like-list" @click="moreLikeUser = true">
          <a-tooltip placement="top" :getPopupContainer="()=>this.$refs.tooltipContainer">
            <template slot="title">
              查看所有点赞用户
            </template>
            <b-avatar variant="light" href="javascript:void(0)" size="2.2rem">
              <span class="iconfont operate-standard" style="font-weight: bold; font-size: 20px"/>
            </b-avatar>
          </a-tooltip>
          <Modal v-model="moreLikeUser"
                 :closable="false"
                 :footer-hide="true"
                 class-name="more-like-list">
            <div class="like-btn">
              <span class="like-btn-icon will-like"></span>
            </div>
            <p class="like-count" v-if="ramblyJot.likeCount > 0">共 {{ ramblyJot.likeCount }} 人点赞</p>
            <ul class="like-user-list">
              <li v-for="user in ramblyJot.likeUserList" :key="user.uid">
                <user-card :userInfo="user" :popoverContainer="tooltipContainer" class="user-info-card-box">
                  <slot>
                    <b-avatar :src="fileUrl(user.avatarUrl)" variant="light" href="javascript:void(0)" size="2.2rem">
                      <span v-if="!user.avatarUrl">{{ user.username }}</span>
                    </b-avatar>
                  </slot>
                </user-card>
              </li>
            </ul>
          </Modal>
        </li>
      </ul>
    </div>
    <!-- 评论 -->
    <div class="">
      <reply-comment :targetId="ramblyJot.uid"/>
    </div>
  </div>
</template>

<script>
import Engine from '@aomao/engine'
import {ramblyPlugins, ramblyCards, pluginConfig} from "@/components/common/editor/config"
import ReplyComment from "@/components/common/replycomment/src/ReplyComment"
import UserCard from "@/components/common/UserCard.vue";
import RamblyJotApi from "@/api/RamblyJotApi";
import socialApi from "@/api/SocialApi";
import {cloneDeep} from "@/utils/emoji";

export default {
  name: 'RamblyJotContent',
  data() {
    return {
      engine: null,
      ramblyJot: {},
      moreLikeUser: false,
      tooltipContainer: null
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    loginStatus() {
      let userInfo = this.$store.state.userInfo
      return userInfo !== null && userInfo.token?.length === 32
    }
  },
  methods: {
    fileUrl(path) {
      return this.fileService + path;
    },
    likeMark() {
      if (!this.loginStatus) {
        let loginBtn = document.getElementById("pwdLoginBtn");
        if (loginBtn) {
          loginBtn.click();
        }
        return;
      }
      let likeAction = {
        targetId: this.ramblyJot.uid,
        targetType: 3,
        action: this.ramblyJot.ifLike ? 0 : 1
      }
      socialApi.contentLikeMark(likeAction).then(data => {
        if (data?.result) {
          this.ramblyJot.likeCount = this.ramblyJot.likeCount + (this.ramblyJot.ifLike ? -1 : 1);
          if (this.ramblyJot.ifLike) {
            // 取消点赞
            this.ramblyJot.likeUserList = this.ramblyJot.likeUserList?.filter(user => user.uid !== this.userInfo.uid);
          } else {
            this.ramblyJot.likeUserList.unshift(cloneDeep(this.userInfo));
          }
          this.ramblyJot.ifLike = !this.ramblyJot.ifLike;
        }
      })
    },
    deleteRamblyJot() {
      RamblyJotApi.deleteRamblyJot(this.ramblyJot.uid).then(data => {
        if (data?.result) {
          this.$Message.success('删除成功');
          this.$router.go(-1);
        }
      })
    },
    updatePublicStatus(status) {
      let ramblyJotInfo = {
        uid: this.ramblyJot.uid,
        isPublic: status
      }
      RamblyJotApi.updateRamblyJot(ramblyJotInfo).then(data => {
        if (data?.result) {
          this.$Message.success("修改成功");
          this.ramblyJot.isPublic = status;
        }
      })
    }
  },
  props: ['rjId'],
  components: {
    UserCard,
    ReplyComment
  },
  mounted() {
    this.tooltipContainer = this.$refs.tooltipContainer;
    const container = this.$refs.reader;
    if (container) {
      //实例化引擎
      const engine = new Engine(container, {
        // 启用插件 TODO 注意插件的key必须是 plugins
        plugins: ramblyPlugins,
        // 启用卡片
        cards: ramblyCards,
        // 所有的插件配置
        config: pluginConfig,
        // 阅读模式
        readonly: true
      });
      // 获取内容
      RamblyJotApi.getRamblyJotInfo(this.rjId).then(data => {
        if (data?.result) {
          this.ramblyJot = data.data;
          if (this.ramblyJot != null && this.ramblyJot.content?.length > 0) {
            engine.setJsonValue(JSON.parse(this.ramblyJot.content));
          }
        }
      })
      this.engine = engine;
    }
  }
}
</script>

<style scoped lang="less">
  @import "../css/common-var";
  @import "../css/rambly-jot-content";
</style>
