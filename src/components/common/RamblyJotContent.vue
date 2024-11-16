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
                 v-if="ramblyJot.userId === loginUserId"
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
                <span class="public--range-text">互联网可见</span>
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
    <div ref="view" class="rambly-content">
    </div>
    <!-- 点赞信息 -->
    <div class="reward-module_like un-select">
      <div class="like-btn" @click="ramblyJot.ilike = ramblyJot.ilike === 1 ? 0 : 1">
        <span :class="['like-btn-icon', ramblyJot.ilike === 1 ? 'liked' : 'will-like']"></span>
      </div>
      <p class="like-count">11 人点赞</p>
      <ul class="like-user-list">
        <li v-for="user in showUserList" :key="user.userId">
            <span class="like-user-popover" style="cursor: pointer;">
              <b-avatar :src="user.avatar" variant="light" href="javascript:void(0)" size="2.2rem">
                <span v-if="!user.avatar">{{ user.username }}</span>
              </b-avatar>
            </span>
        </li>
        <!-- 超出13时只展示13个，然后显示更多 -->
        <li v-if="likeUserList?.length > 13" class="show-more-like-list" @click="moreLikeUser = true">
          <a-tooltip placement="top" :getPopupContainer="()=>this.$refs.tooltipContainer">
            <template slot="title">
              查看所有点赞用户
            </template>
            <b-avatar variant="light" href="javascript:void(0)" size="2.2rem">
              <svg width="1.5em" height="1.5em" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                   class="larkui-icon larkui-icon-new-ellipsis">
                <path
                  d="M227.008 128c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20ZM148 128c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20Zm-78.992 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20Z"
                  fill="currentColor" fill-rule="nonzero"></path>
              </svg>
            </b-avatar>
          </a-tooltip>
          <Modal v-model="moreLikeUser"
                 :closable="false"
                 :footer-hide="true"
                 class-name="more-like-list">
            <p class="like-count">共 11 人点赞</p>
            <ul class="like-user-list beauty-scroll">
              <li v-for="user in likeUserList" :key="user.userId">
                <span class="like-user-popover" style="cursor: pointer;">
                  <b-avatar :src="user.avatar" variant="light" href="javascript:void(0)" size="1.5rem">
                    <span v-if="!user.avatar">{{ user.username }}</span>
                  </b-avatar>
                  <span class="user-name">{{ user.username }}</span>
                </span>
              </li>
            </ul>
          </Modal>
        </li>
      </ul>
    </div>
    <!-- 评论 -->
    <div class="">
      <reply-comment/>
    </div>
  </div>
</template>

<script>
import {View} from '@aomao/engine'
import {ramblyPlugins, ramblyCards, pluginConfig} from "@/components/common/editor/config"
import ReplyComment from "@/components/common/replycomment/src/ReplyComment"
import RamblyJotApi from "@/api/RamblyJotApi";

export default {
  name: 'RamblyJotContent',
  data() {
    return {
      view: null,
      ramblyJot: {},
      likeUserList: [
        {
          userId: 1,
          username: '融码一生',
          avatar: require('@/assets/avatar/01.jpg')
        },
        {
          userId: 2,
          username: '融asd）',
          avatar: require('@/assets/avatar/04.jpg')
        },
        {
          userId: 3,
          username: '融3sdfs',
          avatar: require('@/assets/avatar/03.jpg')
        }, {
          userId: 4,
          username: 'acvxcvff',
          avatar: require('@/assets/avatar/04.gif')
        }, {
          userId: 5,
          username: '飒飒打撒方法',
          avatar: require('@/assets/avatar/05.jpg')
        }, {
          userId: 6,
          username: '3撒旦发射点和',
          avatar: require('@/assets/avatar/06.jpg')
        }, {
          userId: 7,
          username: '阿萨的观光热点覆盖',
          avatar: require('@/assets/avatar/07.jpg')
        }, {
          userId: 8,
          username: '手动阀手动阀',
          avatar: require('@/assets/avatar/08.jpg')
        }, {
          userId: 9,
          username: '士大夫胜多负少大师傅',
          avatar: require('@/assets/avatar/09.jpg')
        }, {
          userId: 10,
          username: '撒旦发射点和地方）',
          avatar: require('@/assets/avatar/10.jpg')
        }, {
          userId: 11,
          username: 'asderrer）',
          avatar: require('@/assets/avatar/11.jpg')
        }, {
          userId: 12,
          username: 'asdhghfg',
          avatar: require('@/assets/avatar/12.jpg')
        }, {
          userId: 13,
          username: '阿斯顿撒旦 域）',
          avatar: require('@/assets/avatar/13.jpg')
        }, {
          userId: 14,
          username: '融胜多负少）',
          avatar: require('@/assets/avatar/14.jpg')
        }, {
          userId: 15,
          username: '融发的干扰对方域）',
          avatar: require('@/assets/avatar/15.jpg')
        }
      ],
      moreLikeUser: false
    }
  },
  computed: {
    loginUserId() {
      return this.$store.state.userInfo.uid;
    },
    showUserList() {
      if (this.likeUserList?.length > 13) {
        return this.likeUserList.slice(0, 13);
      }
      return this.likeUserList;
    }
  },
  methods: {
    deleteRamblyJot() {
      RamblyJotApi.deleteRamblyJot(this, this.ramblyJot.uid).then(data => {
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
      RamblyJotApi.updateRamblyJot(this, ramblyJotInfo).then(data => {
        if (data?.result) {
          this.$Message.success("修改成功");
          this.ramblyJot.isPublic = status;
        }
      })
    }
  },
  props: ['rjId'],
  components: {
    ReplyComment
  },
  mounted() {
    const container = this.$refs.view;
    if (container) {
      //实例化引擎
      const view = new View(container, {
        // 启用插件 TODO 注意插件的key必须是 plugins
        plugins: ramblyPlugins,
        // 启用卡片
        cards: ramblyCards,
        // 所有的插件配置
        config: pluginConfig,
        readonly: true
      });
      // 获取内容
      RamblyJotApi.getRamblyJotInfo(this, this.rjId).then(data => {
        if (data?.result) {
          this.ramblyJot = data.data;
          if (this.ramblyJot != null && this.ramblyJot.content?.length !== 0) {
            view.render(this.ramblyJot.content, true)
          }
        }
      })
      this.view = view;
    }
  }
}
</script>

<style scoped lang="less">
  @import "../css/common-var";
  @import "../css/rambly-jot-content";
</style>
