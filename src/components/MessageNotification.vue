<template>
  <div class="layout-message-notification" ref="popoverContainer">
    <div class="msg-notify-menu un-select">
      <div class="fixed-anchor-point">
        <div class="item">
          <span class="iconfont i-message"></span>
          消息中心
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('commentReply')">
        <div :class="['item', activeMenu === 'commentReply' ? 'active-menu' : '']">
          <span>回复我的</span>
          <span class="count" v-if="messageSetting.msgCount">{{ unreadCount.commentCount }}</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('likesReceived')">
        <div :class="['item', activeMenu === 'likesReceived' ? 'active-menu' : '']">
          <span>收到的赞</span>
          <span class="count" v-if="messageSetting.msgCount">{{ unreadCount.likeCount }}</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('newFans')">
        <div :class="['item', activeMenu === 'newFans' ? 'active-menu' : '']">
          <span>新增关注</span>
          <span class="count" v-if="messageSetting.msgCount">{{ unreadCount.newFollowCount }}</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('systemMessage')">
        <div :class="['item', activeMenu === 'systemMessage' ? 'active-menu' : '']">
          <span>系统消息</span>
          <span class="count" v-if="messageSetting.msgCount">{{ unreadCount.systemMsgCount }}</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('chatMessage')">
        <div :class="['item', activeMenu === 'chatMessage' ? 'active-menu' : '']">
          <span>我的消息</span>
          <span class="count" v-if="messageSetting.msgCount">{{
              unreadCount.chatMsgCount > 99 ? '99+' : unreadCount.chatMsgCount
            }}</span>
        </div>
      </div>
      <div class="menu-item item-line">
        <div class="line"></div>
      </div>
      <div class="menu-item msg-setting" @click="routeNavigate('messageSetting')">
        <div :class="['item', activeMenu === 'messageSetting' ? 'active-menu' : '']">
          <span class="iconfont setting-c"></span>
          消息设置
        </div>
      </div>
    </div>
    <div class="msg-notify-body">
      <div class="module-tabs-wrapper">
        <div class="module-tabs-tabpane-active">
          <div class="tabs-tabpane-head un-select">
            <span class="active-tab">
              <span v-if="activeMenu === 'commentReply'">
                回复我的
              </span>
              <span v-if="activeMenu === 'likesReceived'">
                收到的赞
              </span>
              <span v-if="activeMenu === 'newFans'">
                新增关注
              </span>
              <span v-if="activeMenu === 'systemMessage'">
                系统消息
              </span>
              <span v-if="activeMenu === 'chatMessage'">
                我的消息
                <span v-show="retry" class="chat-msg-retry">
                  <span class="iconfont update-ing"/>重连中...
                </span>
              </span>
              <span v-if="activeMenu === 'messageSetting'">
                消息设置
              </span>
            </span>
<!--            <span class="all-read-action" v-if="activeMenu !== 'messageSetting'">
              <span class="iconfont clean"></span>
              <span>
                全部已读
              </span>
            </span>-->
          </div>
          <div class="tabs-notify-holder beauty-scroll"
               v-infinite-scroll="debounceNoticeRequest"
               :infinite-scroll-disabled="!hasMore"
               :infinite-scroll-distance="100"
               v-if="activeMenu !== 'chatMessage' && activeMenu !== 'messageSetting'">
            <ul class="tab-list-items" v-if="activeMenu === 'commentReply'">
              <li class="tab-list-item"
                  v-for="item in msgNoticeList"
                  :key="item.uid">
                <div class="notification-item">
                  <user-card :userInfo="item.actionUserInfo" :popoverContainer="popoverContainer">
                    <slot>
                      <b-avatar class="avatar"
                                :src="fileUrl(item.actionUserInfo?.avatarUrl)"
                                variant="light"
                                :to="'/' + item.actionUserInfo?.domain"
                                size="2rem">
                        <span v-if="!item.actionUserInfo?.avatarUrl">{{ item.actionUserInfo?.username }}</span>
                      </b-avatar>
                    </slot>
                  </user-card>
                  <div class="item-content">
                    <div class="action-info">
                      <div class="action">
                        <b-link :to="'/' + item.actionUserInfo?.domain"
                                target="_blank"
                                class="context-actor">
                          <span>
                            {{ item.actionUserInfo?.username }}
                          </span>
                        </b-link>
                        {{
                          (item.noticeType === 1 ? '在' : item.noticeType === 2 ? '对' : '') +
                          (item.targetType === 1 ? '文档' : item.targetType === 3 ? '随笔' : '')
                        }}
                        <b-link @click="routePath(item)"
                                class="context-subject"
                                :title="item.targetType === 1 ? item.articleInfo?.title : item.targetType === 3 ? item.ramblyJot?.title : '已删除内容'">
                          <span>{{
                              item.targetType === 1 ? item.articleInfo?.title : item.targetType === 3 ? item.ramblyJot?.title : '已删除内容'
                            }}</span>
                        </b-link>
                      </div>
                      <span class="msg-time">{{ formatTime2H(item.createTime) }}</span>
                    </div>
                    <p class="action-content" :title="item.noticeType === 1 ? item.commentContent : item.replyContent">
                      <span class="tip-content">
                        <span v-if="item.noticeType === 2" class="notice-tip">
                          发表了评论:&nbsp;
                        </span>
                        <span v-if="item.noticeType === 1" class="notice-tip">
                          回复了我的评论:&nbsp;
                        </span>
                        <span v-html="item.noticeType === 1 ? item.commentContent : item.replyContent"/>
                      </span>
                      <Badge dot v-if="item.readStatus === 0 && messageSetting.newMsgDot" :offset="[2, -2]"/>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="tab-list-items" v-if="activeMenu === 'likesReceived'">
              <li class="tab-list-item"
                  v-for="item in msgNoticeList"
                  :key="item.uid">
                <div class="notification-item">
                  <user-card :userInfo="item.actionUserInfo" :popoverContainer="popoverContainer">
                    <slot>
                      <b-avatar class="avatar"
                                :src="fileUrl(item.actionUserInfo?.avatarUrl)"
                                variant="light"
                                :to="'/' + item.actionUserInfo?.domain"
                                size="2rem">
                        <span v-if="!item.actionUserInfo?.avatarUrl">{{ item.actionUserInfo?.username }}</span>
                      </b-avatar>
                    </slot>
                  </user-card>
                  <div class="item-content">
                    <div class="action-info">
                      <div class="action-content">
                        <div class="content-warp">
                          <b-link :to="'/' + item.actionUserInfo?.domain"
                                  target="_blank"
                                  class="context-actor">
                            {{ item.actionUserInfo?.username }}
                          </b-link>
                          赞了我的{{
                            item.targetType == 1 ? '文章' : item.targetType == 3 ? '随笔' : item.targetType == 4 ? '评论' : '内容'
                          }}
                          <b-link @click="routePath(item)"
                                  class="context-subject">
                          <span v-html="item.targetType === 1 ? item.articleInfo?.title :
                            item.targetType === 3 ? item.ramblyJot?.title :
                              item.targetType === 4 ? (item.replyId ? item.replyContent : item.commentContent) : '已删除内容'">
                          </span>
                          </b-link>
                        </div>
                        <Badge dot v-if="item.readStatus === 0 && messageSetting.newMsgDot" :offset="[6, -4]"/>
                      </div>
                    </div>
                    <p>
                      <span class="msg-time">{{ formatTime2H(item.createTime) }}</span>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="tab-list-items" v-if="activeMenu === 'newFans'">
              <li class="tab-list-item"
                  v-for="item in msgNoticeList"
                  :key="item.uid">
                <div class="notification-item">
                  <user-card :userInfo="item.actionUserInfo" :popoverContainer="popoverContainer">
                    <slot>
                      <b-avatar class="avatar"
                                :src="fileUrl(item.actionUserInfo?.avatarUrl)"
                                variant="light"
                                :to="'/' + item.actionUserInfo?.domain"
                                size="2rem">
                        <span v-if="!item.actionUserInfo?.avatarUrl">{{ item.actionUserInfo?.username }}</span>
                      </b-avatar>
                    </slot>
                  </user-card>
                  <div class="item-content">
                    <p>
                      <a :href="'/' + item.actionUserInfo?.domain" target="_blank"
                         class="context-actor">{{ item.actionUserInfo?.username }}</a>
                      关注了我
                      <Badge dot v-if="item.readStatus === 0 && messageSetting.newMsgDot" :offset="[-9, -1]"/>
                    </p>
                    <p>
                      <span>{{ formatTime2H(item.createTime) }}</span>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="tab-list-items" v-if="activeMenu === 'systemMessage'">
              <li class="tab-list-item"
                  v-for="item in msgNoticeList"
                  :key="item.uid">
                <div class="notification-item">
                  <div class="item-content">
                    <p>
                      <span class="context-subject">
                        {{ item.content }}
                      </span>
                      <a :href="item.url" target="_blank">
                        <span class="sys-msg-label">&nbsp;{{ item.label }}&nbsp;</span>
                      </a>
                      <Badge dot v-if="item.readStatus === 0 && messageSetting.newMsgDot" :offset="[-9, -5]"/>
                    </p>
                    <p>
                      <span>{{ formatTime2H(item.createTime) }}</span>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tabs-message-holder" v-if="activeMenu === 'chatMessage'">
            <div class="lovbe-im">
              <div class="session-list beauty-scroll">
                <div class="list-container">
                  <div
                    :class="['list-item', session.sessionUserInfo.uid === activeSession.sessionUserId ? 'active' : '']"
                    v-for="session in sessionList"
                    @click="changeActiveSession(session)"
                    :key="session.uid">
                    <div>
                      <b-avatar class="avatar"
                                :src="fileUrl(session.sessionUserInfo.avatarUrl)"
                                variant="light"
                                :to="'/' + session.sessionUserInfo.domain"
                                target="_blank"
                                size="2rem">
                        <span v-if="!session.sessionUserInfo.username">{{ session.sessionUserInfo.username }}</span>
                      </b-avatar>
                      <Badge v-if="tmpMessageSetting.newMsgDot && session.uid !== activeSession.sessionId && session.unreadCount"
                             :text="session.unreadCount < 9 ? (session.unreadCount+'') : '···'"
                             class="un-read-count"/>
                    </div>
                    <div class="name-box">
                      <div class="name" :title="session.sessionUserInfo.username">
                        <div class="name-value">{{ session.sessionUserInfo.username }}</div>
                      </div>
                      <div :title="parseMsgContent(session.lastMsg, false, session.sessionUserInfo.username)" class="last-word">
                        {{ parseMsgContent(session.lastMsg, false, session.sessionUserInfo.username) }}
                      </div>
                    </div>
                    <div class="close" @click="showDelModal(session.uid)">
                      <span class="iconfont remove"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="session-box">
                <div class="dialog" v-if="activeSession.sessionId">
                  <div class="title">
                    <div class="is-black" v-if="isShield">
                      (&gt;﹏&lt;)该用户已经被你屏蔽啦
                    </div>
                    <span>{{ activeSession.sessionUserName }}</span>
                    <div class="action-menu">
                      <Dropdown placement="bottom-end"
                                trigger="click"
                                transfer-class-name="dropdown-background dropdown-item-all-hover"
                                @on-click="updateSession">
                        <a href="javascript:void(0)">
                          <div class="menu-btn">
                            <span class="iconfont operate"></span>
                          </div>
                        </a>
                        <DropdownMenu slot="list">
                          <DropdownItem name="isPinned">
                            {{ sessionList?.find(s => s.uid === activeSession.sessionId)?.isPinned ? '取消置顶' : '置顶聊天' }}
                          </DropdownItem>
                          <DropdownItem name="isNotDisturb">
                            {{ sessionList?.find(s => s.uid === activeSession.sessionId)?.isNotDisturb ? '关闭免打扰' : '开启免打扰' }}
                          </DropdownItem>
                          <DropdownItem name="isShield">
                            {{ sessionList?.find(s => s.uid === activeSession.sessionId)?.isShield ? '取消屏蔽' : '屏蔽该用户' }}
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                  <div class="message-list beauty-scroll" ref="messageScroll" @scroll="debounceChatRequest">
                    <div class="message-list-content" id="messageListContent">
                      <div class="msg-more">
                        <span class="loading" v-if="loadingMessage">
                          <span class="reload">消息加载中</span>
                        </span>
                      </div>
                      <div v-for="msg in activeSession.messages"
                           :class="[msg.contentType === 100 || msg.contentType === 111?'msg-system':'msg-item', msg.sendId === userInfo.uid?'is-me':'not-me']"
                           :key="msg.clientMsgId"
                           :id="'msg_' + msg.clientMsgId">
                        <span class="time" v-if="msg.contentType === 100">{{ formatTime2H(msg.sendTime) }}</span>
                        <span class="rollback-tips" v-if="msg.contentType === 111">{{ (msg.sendId === userInfo.uid ? '你' : ('"' + activeSession.sessionUserName + '"')) + msg.content }}</span>
                        <b-avatar v-if="msg.contentType !== 100 && msg.contentType !== 111"
                                  class="avatar"
                                  :src="fileUrl(msg.sendId === userInfo.uid ? userInfo.avatarUrl : activeSession.sessionUserAvatar)"
                                  :to="'/' + msg.sendId === userInfo.uid ? userInfo.domain : activeSession.sessionUserDomain"
                                  target="_blank"
                                  variant="light"
                                  size="2rem">
                          <span
                            v-if="!(msg.sendId === userInfo.uid ? userInfo.avatarUrl : activeSession.sessionUserAvatar)">
                            {{ msg.sendId === userInfo.uid ? userInfo.username : activeSession.sessionUserName }}
                          </span>
                        </b-avatar>
                        <div class="message" v-if="msg.contentType !== 100 && msg.contentType !== 111">
                          <div v-if="msg.uid && !msg.sendSuccess" class="message-send-status">
                            <span class="iconfont publish-fail" :title="msg.errorReason"/>
                          </div>
                          <div v-if="msg.uid && msg.sendSuccess" class="message-action">
                            <span class="message-time">{{
                                formatTime(new Date(msg.sendTime), 'yyyy-MM-dd HH:mm:ss')
                              }}</span>
                            <a-tooltip placement="top"
                                       :getPopupContainer="()=>popoverContainer">
                              <template slot="title">
                                删除
                              </template>
                              <span class="iconfont delete"
                                    @click="messageAction('delete', msg)"/>
                            </a-tooltip>
                            <a-tooltip placement="top"
                                       v-if="msg.sendId === userInfo.uid"
                                       :getPopupContainer="()=>popoverContainer">
                              <template slot="title">
                                撤回
                              </template>
                              <span class="iconfont rollback"
                                    @click="messageAction('rollback', msg)"/>
                            </a-tooltip>
                          </div>
                          <div v-if="msg.contentType === 101" class="message-content"
                               v-html="parseMsgContent(msg, true)"></div>
                          <div v-if="msg.contentType === 102" class="message-content is-img">
                            <img class="im-msg-item-img"
                                 title="[图片] 点击查看大图"
                                 alt="[图片] 点击查看大图"
                                 :id="msg.clientMsgId"
                                 :src="parseMsgImage(msg.content)"
                                 @click="previewImage(msg.clientMsgId)"
                                 style="max-width:150px;">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="send-box">
                    <InputBox
                      ref="commentRef"
                      placeholder=""
                      content-btn=" 发 送 "
                      :mentionConfig="mentionConfig"
                      scene="message"
                      @uploadImage="sendImage"
                      @submit="sendMessage"/>
                  </div>
                </div>
                <div v-else class="lovbe-im-placeholder">
                  <div class="tip">快找小伙伴聊天吧 ( ゜- ゜)つロ</div>
                </div>
              </div>
            </div>
          </div>
          <div class="tabs-setting-holder" v-if="activeMenu === 'messageSetting'">
            <div class="message-setting">
              <h2 class="setting-subtitle">提醒设置</h2>
              <div class="setting-border">
                <div class="settings-item">
                  <h4>有新消息时显示消息提醒</h4>
                  <p>关闭后，当有新动态时，不展示相应位置的红点提示</p>
                  <span class="settings-selector">
                    <i-switch v-model="tmpMessageSetting.newMsgDot"
                              size="small"
                              :false-value="0"
                              :true-value="1"
                              @on-change="msgSettingChange({newMsgDot: tmpMessageSetting.newMsgDot})">
                    </i-switch>
                  </span>
                </div>
                <div class="settings-item">
                  <h4>有新消息时展示消息数量</h4>
                  <p>关闭后，当有新消息时，不展示相应位置的未读统计</p>
                  <span class="settings-selector">
                    <i-switch v-model="tmpMessageSetting.msgCount"
                              size="small"
                              :false-value="0"
                              :true-value="1"
                              @on-change="msgSettingChange({msgCount: tmpMessageSetting.msgCount})">
                    </i-switch>
                  </span>
                </div>
              </div>
              <h2 class="setting-subtitle">消息设置</h2>
              <div class="settings-item">
                <h4>回复我的消息提醒</h4>
                <p>接受谁的评论、回复或@消息提醒</p>
                <span class="settings-radio">
                  <RadioGroup v-model="tmpMessageSetting.commentMsgAccept"
                              @on-change="msgSettingChange({commentMsgAccept: tmpMessageSetting.commentMsgAccept})">
                      <Radio :label="1">所有人</Radio>
                      <Radio :label="0">关注的人</Radio>
                      <Radio :label="-1">不接受任何消息提醒</Radio>
                  </RadioGroup>
                </span>
              </div>
              <div class="settings-item">
                <h4>收到的赞消息提醒</h4>
                <p>当他人给我的文档、随笔或评论点赞时</p>
                <span class="settings-radio">
                  <RadioGroup v-model="tmpMessageSetting.likeMsgAccept"
                              @on-change="msgSettingChange({likeMsgAccept: tmpMessageSetting.likeMsgAccept})">
                      <Radio :label="1">所有人</Radio>
                      <Radio :label="0">关注的人</Radio>
                      <Radio :label="-1">不接受任何消息提醒</Radio>
                  </RadioGroup>
                </span>
              </div>
              <div class="settings-item">
                <h4>关注提醒</h4>
                <p>当他人关注我时</p>
                <span class="settings-selector">
                  <i-switch v-model="tmpMessageSetting.newFollowerMsg"
                            size="small"
                            :false-value="0"
                            :true-value="1"
                            @on-change="msgSettingChange({newFollowerMsg: tmpMessageSetting.newFollowerMsg})">
                    </i-switch>
                </span>
              </div>
              <div class="settings-item">
                <h4>系统消息</h4>
                <p>风险提示，功能变更，运营活动</p>
                <span class="settings-selector">
                  <i-switch v-model="tmpMessageSetting.systemNotice"
                            :false-value="0"
                            :true-value="1"
                            size="small"
                            @on-change="msgSettingChange({systemNotice: tmpMessageSetting.systemNotice})">
                    </i-switch>
                </span>
              </div>
              <div class="settings-item">
                <h4>我的消息</h4>
                <p>允许别人对我发送私信消息</p>
                <span class="settings-selector">
                  <i-switch v-model="tmpMessageSetting.enableChatMessage"
                            :false-value="0"
                            :true-value="1"
                            size="small"
                            @on-change="msgSettingChange({enableChatMessage: tmpMessageSetting.enableChatMessage})">
                    </i-switch>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="showDel"
           :lock-scroll="true"
           :width="370"
           :styles="{top: '20%'}"
           @on-ok="deleteSession"
           class-name="delete-session">
      <div style="padding-left: 10px;">
        <span>删除后，将清空该聊天的消息记录</span>
      </div>
    </Modal>
  </div>
</template>

<script>
import {formatTime, formatTime2H, cloneDeep, useEmojiParse, debounce} from '@/utils';
import InputBox from "@/components/common/replycomment/src/component/InputBox";
import Pswp from "@/components/common/imagepreview/index"
import msgNoticeApi from "@/api/MsgNoticeApi";
import UserCard from "@/components/common/UserCard.vue";
import Vue from "vue";
import {v4 as uuid} from 'uuid';
import {decodeSign, encodeSign} from "@/utils/common";
import emoji from '@/assets/emoji/emoji.js';

export default {
  name: "MessageNotification",
  data() {
    return {
      // 图片预览
      pswp: null,
      offset: 0,
      limit: 10,
      hasMore: true,
      loadingMessage: true,
      msgNoticeList: [],
      popoverContainer: null,
      sessionList: [],
      activeSession: {
        sessionId: null,
        sessionUserId: null,
        sessionUserName: null,
        sessionUserAvatar: null,
        sessionUserDomain: null,
        messages: []
      },
      activeMenu: null,
      ifShowEmojiSelector: false,
      mentionConfig: {
        // @提及 功能开关
        functionStatus: false,
        // @提及 渲染的颜色
        mentionColor: '#409eff'
      },
      EmojiSelectorPosition: null,
      showDel: false,
      delSessionId: null,
      tmpMessageSetting: {
        newMsgDot: 1,
        // 新消息展示数量统计
        msgCount: 1,
        // 评论回复提醒接收范围 1 所有人 0关注的人 -1不接受任何提醒
        commentMsgAccept: 1,
        // 点赞消息提薪人员范围 1 所有人 0关注的人 -1不接受任何提醒
        likeMsgAccept: 1,
        // 他人关注是否提醒 0否1是
        newFollowerMsg: 1,
        // 是否开启系统通知 0否1是
        systemNotice: 1,
        // 是否开启私聊消息 0否1是
        enableChatMessage: 1
      },
      unreadCount: {
        commentCount: 0,
        likeCount: 0,
        newFollowCount: 0,
        systemMsgCount: 0,
        chatMsgCount: 0,
        unreadTotal: 0
      },
      // 已建立连接
      isConnected: false,
      // 连接重连中
      retry: false,
      debounceChatRequest: function () {},
      debounceNoticeRequest: function () {}
    }
  },
  props: {
    propsActiveMenu: {
      type: String,
      default: 'commentReply'
    },
    unreadStatistic: {
      type: Object
    }
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
    activeSessionId() {
      return this.$store.state.chatMessage.activeSessionId;
    },
    isShield() {
      // 判断当前用户是否被屏蔽
      if (this.activeSession.sessionId == null) {
        return false;
      }
      let findSession = this.sessionList.find(session => session.uid === this.activeSession.sessionId);
      return findSession?.isShield;
    }
  },
  components: {
    InputBox,
    UserCard
  },
  methods: {
    fileUrl(path) {
      return this.fileService + path;
    },
    routePath(noticeItem) {
      let targetType = noticeItem.targetType;
      switch (targetType) {
        case 1:
          // 文章
          let uri = "/" + noticeItem.articleInfo?.domain + "/";
          if (noticeItem.articleInfo?.columnUri) {
            uri += (noticeItem.articleInfo?.columnUri + "/");
          }
          uri += noticeItem.articleInfo?.uri;
          let routeUrl = this.$router.resolve({path: uri});
          window.open(routeUrl.href, '_blank');
          return;
        case 3:
          // 随笔，需要关闭消息提示框，在当前页面打开
          this.$emit('changeModalStatus');
          let path = "/ramblyJot/" + noticeItem.ramblyJot?.uid;
          this.$router.push({path});
          return;
        case 4:
          // 评论，实际还是要走文章或随笔
          if (noticeItem.articleInfo?.uid) {
            let uri = "/" + noticeItem.articleInfo?.domain + "/";
            if (noticeItem.articleInfo?.columnUri) {
              uri += (noticeItem.articleInfo?.columnUri + "/");
            }
            uri += noticeItem.articleInfo?.uri;
            let routeUrl = this.$router.resolve({path: uri});
            window.open(routeUrl.href, '_blank');
          } else if (noticeItem.ramblyJot?.uid) {
            this.$emit('changeModalStatus');
            let path = "/ramblyJot/" + noticeItem.ramblyJot?.uid;
            this.$router.push({path});
          }
      }
    },
    routeNavigate(activeMenu) {
      if (this.activeMenu === activeMenu) {
        // 滚动条滚动到第一个未读的消息列表，如果全部已读则无需滚动
        return;
      }
      this.activeMenu = activeMenu;
    },
    loadMsgNotify(activeMenu) {
      switch (activeMenu) {
        case 'commentReply':
          msgNoticeApi.getCommentNotice({
            offset: this.offset,
            limit: this.limit
          }).then(data => {
            if (data?.result) {
              this.msgNoticeList.push(...data.data.list);
              this.hasMore = this.msgNoticeList.length !== data.data.total && data.data.list.length !== 0;
            }
          });
          break;
        case 'likesReceived':
          msgNoticeApi.getLikeNotice({
            offset: this.offset,
            limit: this.limit
          }).then(data => {
            if (data?.result) {
              this.msgNoticeList.push(...data.data.list);
              this.hasMore = this.msgNoticeList.length !== data.data.total && data.data.list.length !== 0;
            }
          });
          break;
        case 'newFans':
          msgNoticeApi.getFollowNotice({
            offset: this.offset,
            limit: this.limit
          }).then(data => {
            if (data?.result) {
              this.msgNoticeList.push(...data.data.list);
              this.hasMore = this.msgNoticeList.length !== data.data.total && data.data.list.length !== 0;
            }
          });
          break;
        case 'systemMessage':
          msgNoticeApi.getSystemNotice({
            offset: this.offset,
            limit: this.limit
          }).then(data => {
            if (data?.result) {
              this.msgNoticeList.push(...data.data.list);
              this.hasMore = this.msgNoticeList.length !== data.data.total && data.data.list.length !== 0;
            }
          })
          break;
        case 'chatMessage':
          msgNoticeApi.getMsgSessionList().then(data => {
            if (data?.result) {
              let jsonStr = decodeSign(data?.data);
              this.sessionList = JSON.parse(jsonStr);
              if (this.sessionList?.length > 0) {
                // 如果是通过外部名片点击进入则需要指定会话
                let activeSession = null;
                if (this.activeSessionId != null) {
                  activeSession = this.sessionList.find(session => session.uid === this.activeSessionId);
                }
                if (activeSession == null) {
                  activeSession = this.sessionList[0];
                }
                if (this.activeSession.sessionId !== activeSession.uid) {
                  this.changeActiveSession(activeSession);
                } else {
                  // 需要重新下拉滚动条
                  let messageScroll = this.$refs.messageScroll;
                  if (messageScroll) {
                    // 使用 setTimeout 来确保在 DOM 更新之后再进行滚动
                    this.$nextTick(() => {
                      // 将滚动位置设置为容器的滚动高度
                      setTimeout(() => {
                        messageScroll.scrollTop = messageScroll.scrollHeight + 150;
                      }, 10);
                    });
                  }
                }
              }
            }
          })
          break;
        case "messageSetting":
          this.tmpMessageSetting = cloneDeep(this.messageSetting);
      }
    },
    formatTime,
    formatTime2H,
    sendMessage(msgContent, clear) {
      // 清空输入框内容
      clear();
      // 发送消息
      let clientMsgId = uuid()?.replaceAll('-', '');
      let msgBody = {
        clientMsgId,
        sendId: this.userInfo.uid,
        recvId: this.activeSession.sessionUserId,
        recvType: 1,
        senderPlatformId: 1,
        // 100发送时间（前端展示） 101 文字消息 102图片 103站内文章 104链接 111撤回消息
        contentType: 101,
        content: JSON.stringify({content: msgContent.content}),
        sendTime: new Date().getTime()
      }
      this.checkSWStatus();
      this.$sharedWorker.port.postMessage({
        type: 2,
        data: {
          type: 2,
          callback: 'sendMessage',
          data: encodeSign(JSON.stringify(msgBody))
        }
      });
      this.pushNewMessage(msgBody)
      this.sessionList.filter(session => session.uid === this.activeSession.sessionId)
        .forEach(session => {
          console.log('没来', new Date().getTime())
          session.lastMsg = msgBody;
        });
    },
    sendImage(file) {
      // 生成base64格式进行显示
      const reader = new FileReader(); // 创建FileReader对象
      reader.onload = () => {
        // 读取文件完成后将结果设置为预览图URL
        let fileUrl = reader.result;
        // 发送消息
        let clientMsgId = uuid()?.replaceAll('-', '');
        let msgBody = {
          clientMsgId,
          sendId: this.userInfo.uid,
          recvId: this.activeSession.sessionUserId,
          recvType: 1,
          senderPlatformId: 1,
          // 100发送时间（前端展示） 101 文字消息 102图片 103站内文章 104链接 111撤回消息
          contentType: 102,
          content: JSON.stringify({content: "[图片]", imageUrl: fileUrl}),
          sendTime: Date.now()
        }
        this.pushNewMessage(msgBody);
        this.sessionList.filter(session => session.uid === this.activeSession.sessionId)
          .forEach(session => {
            session.lastMsg = msgBody;
          });
        // 通过文件接口上传图片，消息这里只保存地址即可
        let chatFile = new FormData();
        chatFile.append("file", file);
        chatFile.append("pathPrefix", "chat");
        msgNoticeApi.uploadFile(chatFile).then(data => {
          if (data?.result) {
            let msgBodyPic = {...msgBody, ...{content: JSON.stringify({content: "[图片]", imageUrl: data.data})}}
            this.checkSWStatus();
            this.$sharedWorker.port.postMessage({
              type: 2,
              data: {
                type: 2,
                callback: 'sendMessage',
                data: encodeSign(JSON.stringify(msgBodyPic))
              }
            });
          }
        })
      };
      // 读取文件内容，这里使用DataURL格式
      reader.readAsDataURL(file);
    },
    getSessionList(sessionList) {
      console.log('来了', new Date().getTime())
      console.log(sessionList)
      this.sessionList = sessionList;
      let find = this.sessionList.find(session => session.uid === this.activeSession.sessionId);
      if (find && find.unreadCount) {
        let number = this.unreadCount.chatMsgCount - find.unreadCount;
        this.unreadCount.chatMsgCount = number < 0 ? 0 : number;
        find.unreadCount = 0;
      }
    },
    messageConfirm(confirmContent) {
      // 如果已经切换了会话，则不在进行消息确认
      if (this.activeSession.sessionId !== confirmContent?.sessionId) {
        return;
      }
      let messages = this.activeSession.messages;
      if (messages?.length > 0) {
        let index = messages.findIndex(msg => msg.clientMsgId === confirmContent?.clientMsgId);
        if (index !== -1) {
          messages.splice(index, 1, confirmContent);
          return;
        }
      }
      this.pushNewMessage(confirmContent);
    },
    recvMessage(recvMessage) {
      // 如果已经切换了会话，则不用添加新的消息
      if (this.activeSession.sessionId !== recvMessage?.sessionId) {
        return;
      }
      this.pushNewMessage(recvMessage);
    },
    deleteMessage(actionResult) {
      if (actionResult?.result) {
        let index = this.activeSession.messages?.findIndex(msg => msg.uid === actionResult?.messageId);
        if (index !== -1) {
          this.activeSession.messages?.splice(index, 1);
        }
      } else if (actionResult?.reason) {
        this.$Message.error(actionResult?.reason)
      }
    },
    rollbackMessage(actionResult) {
      if (actionResult?.result) {
        let find = this.activeSession.messages?.find(msg => msg.uid === actionResult?.messageId);
        if (find !== null) {
          find.contentType = 111;
          find.content = '撤回了一条消息';
        }
      } else if (actionResult?.reason) {
        this.$Message.error(actionResult?.reason)
      }
    },
    getUnreadCount(unreadCount) {
      this.unreadCount = {...this.unreadCount, ...unreadCount};
    },
    getChatLogs(chatMsgInfo) {
      console.log('聊天记录来了', chatMsgInfo)
      console.log('this.activeSession.sessionId', this.activeSession.sessionId)
      // 判断获取消息记录的会话id和ws返回的消息id是否相同
      if (this.activeSession.sessionId === chatMsgInfo.sessionId) {
        this.loadingMessage = false;
        this.hasMore = chatMsgInfo.list?.length === this.limit;
        console.log('hasMore更新了', this.hasMore)
        this.offset = this.offset + this.limit;
        if (chatMsgInfo.list?.length > 0) {
          // 先保存最后一个消息id用于滚动条校正
          let messageId = null;
          for (let message of (this.activeSession.messages || [])) {
            if (message.contentType !== 100) {
              messageId = message.clientMsgId;
              break;
            }
          }

          // 先创建一个临时队列
          let tmpMessages = [];
          chatMsgInfo.list.reverse().forEach(chatLog => {
            this.addHistoryMsgTime(tmpMessages, chatLog.sendTime);
            tmpMessages.push(chatLog);
          })
          // 将临时队列插入当前会话
          this.activeSession.messages.unshift(...tmpMessages);
          let messageScroll = this.$refs.messageScroll;
          if (messageScroll) {
            // 如果是会话正在滚动当中，滚动到触发滚动的附近
            if (this.offset > this.limit) {
              let selector = messageScroll.querySelector('#msg_' + messageId);
              if (selector) {
                this.$nextTick(() => {
                  // 将滚动位置设置为容器的滚动高度
                  setTimeout(() => {
                    messageScroll.scrollTop = selector.offsetTop - 60;
                  }, 10);
                });
              }
            } else {
              // 滚动到底部
              this.$nextTick(() => {
                // 将滚动位置设置为容器的滚动高度
                setTimeout(() => {
                  messageScroll.scrollTop = messageScroll.scrollHeight + 150;
                }, 10);
              });
            }
          }
        }
      }
    },
    pushNewMessage(message) {
      this.addMsgTime(message.sendTime);
      this.activeSession.messages.push(message);
      let messageScroll = this.$refs.messageScroll;
      if (messageScroll) {
        // 使用 setTimeout 来确保在 DOM 更新之后再进行滚动
        this.$nextTick(() => {
          // 将滚动位置设置为容器的滚动高度
          setTimeout(() => {
            messageScroll.scrollTop = messageScroll.scrollHeight + 150;
          }, 100);
        });
      }
    },
    parseMsgContent(message, useEmoji, sessionUsername) {
      if (!message?.content) {
        return null;
      }
      if (message.contentType === 111) {
        return (message.sendId === this.userInfo.uid ? '你' : ('"' + sessionUsername + '"')) + message.content;
      }

      let msgContent;
      if (typeof message.content === 'object') {
        msgContent = message.content.content;
      } else {
        let parse = JSON.parse(message.content);
        msgContent = parse.content;
      }
      msgContent = msgContent.replaceAll("&nbsp;", "");
      if (!useEmoji) {
        return msgContent;
      }

      // 对特殊字符进行转义
      let parseContent = msgContent?.replace(/[&<>"']/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[tag]));
      // 需要将表情转换为img标签
      return useEmojiParse(emoji.allEmoji, parseContent);
    },
    parseMsgImage(content) {
      if (!content) {
        return null;
      }
      let msgImage;
      if (typeof content === 'object') {
        msgImage = content.imageUrl;
      } else {
        let parse = JSON.parse(content);
        msgImage = parse.imageUrl;
      }
      // 如果是base64则直接显示，如果是url格式则需要加文件前缀
      if (msgImage?.startsWith("data")) {
        return msgImage;
      } else {
        return this.fileService + msgImage;
      }
    },
    addMsgTime(now) {
      let sendTime = {
        contentType: 100,
        sendTime: now
      }
      // 比较发送时间与最后一条数据的时间差,5分钟插入一条时间提醒
      let size = this.activeSession.messages?.length;
      if (!size) {
        this.activeSession.messages = [sendTime];
        return;
      }
      let message = this.activeSession.messages[size - 1];
      if (message.contentType !== 100 && (now - message.sendTime) > 1000 * 60 * 5) {
        this.activeSession.messages.push(sendTime);
      }
    },
    addHistoryMsgTime(tmpMessages, now) {
      let sendTime = {
        contentType: 100,
        sendTime: now
      }
      // 比较发送时间与最后一条数据的时间差,5分钟插入一条时间提醒
      let size = tmpMessages.length;
      if (!size) {
        tmpMessages.push(sendTime);
        return;
      }
      let message = tmpMessages[size - 1];
      if (message.contentType !== 100 && (now - message.sendTime) > 1000 * 60 * 5) {
        tmpMessages.push(sendTime);
      }
    },
    msgSettingChange(changeValue) {
      msgNoticeApi.updateNoticeSetting(changeValue).then(data => {
        if (data?.result) {
          this.$store.commit("messageSetting", changeValue);
          this.$Message.success('设置成功');
        }
      })
    },
    previewImage(clientMsgId) {
      if (this.pswp === null) {
        this.pswp = new Pswp(null);
      }
      let msgWrapp = document.getElementById('messageListContent');
      // 获取该元素下的所有img元素
      const imgElements = msgWrapp.getElementsByClassName('im-msg-item-img');
      // 将结果转换为数组（可选）
      const imgArray = Array.from(imgElements);
      let imgItems = [];
      let currentIndex = 0;
      for (let i = 0; i < imgArray.length; i++) {
        let img = imgArray[i];
        if (clientMsgId === img.id) {
          currentIndex = i;
        }
        imgItems.push({
          src: img.src,
          msrc: img.src,
          w: img.naturalWidth,
          h: img.naturalHeight
        })
      }
      this.pswp.open(imgItems, currentIndex)
    },
    checkSWStatus() {
      if (this.isConnected) {
        this.retry = false;
        return;
      }
      this.retry = true;
      if (!this.$sharedWorker) {
        Vue.prototype.$sharedWorker = new SharedWorker('../shared-worker.js', 'workerWs');
        if (!this.$sharedWorker) {
          this.$Message.info('此版本聊天系统暂不支持当前浏览器，请更换Chrom或Edge后重试');
          return;
        }
      }
      this.wsInit();
    },
    wsInit() {
      let port = this.$sharedWorker.port;
      // 监听sharedWorker消息
      port.onmessage = (res) => {
        const data = JSON.parse(res.data)
        if (data?.type === 1) {
          // ws连接已成功建立，可以发送消息了
          this.isConnected = true;
          this.retry = false;
          return;
        }
        if (data?.type === 2) {
          // ws消息
          let wsData = JSON.parse(data?.data);
          if (wsData?.type === 0) {
            // 心跳消息
          } else {
            // 1 会话相关 // 2消息相关，需要解密
            let wsEncode = decodeSign(wsData?.data);
            let wsContent = JSON.parse(wsEncode);
            let callback = wsData?.callback;
            if (typeof this[callback] === "function") {
              this[callback](wsContent);
            } else {
              console.warn(`未知回调: ${callback}`);
            }
          }
          return;
        }
        if (data?.type === 3) {
          // ws连接已被关闭
          this.isConnected = false;
          this.retry = true;
          return;
        }
        if (data?.type === 10) {
          // ws/sw日志
        }
      }
      port.onerror = (e) => {
        console.log(e)
      }
      // 发送消息，初始化websocket连接
      port.postMessage({
        type: 0,
        action: 'new',
        data: {wsBaseUrl: (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + '/socket'}
      })
    },
    changeActiveSession(session) {
      if (session.uid === this.activeSession.sessionId) {
        return;
      }
      this.activeSession.messages = [];
      this.activeSession.sessionId = session.uid;
      this.activeSession.sessionUserId = session.sessionUserInfo?.uid;
      this.activeSession.sessionUserName = session.sessionUserInfo?.username;
      this.activeSession.sessionUserAvatar = session.sessionUserInfo?.avatarUrl;
      this.activeSession.sessionUserDomain = session.sessionUserInfo?.domain;
    },
    updateSession(sessionSetting) {
      if (!this.activeSession.sessionId) {
        return;
      }
      let find = this.sessionList?.find(session => session.uid === this.activeSession.sessionId);
      if (!find) {
        this.$Message.warning("会话不存在，请刷新后重试")
        return;
      }
      let sessionStatus = {
        sessionId: this.activeSession.sessionId
      }
      sessionStatus[sessionSetting] = find[sessionSetting] === 1 ? 0 : 1;
      msgNoticeApi.updateSessionStatus(sessionStatus).then(data => {
        if (data?.result) {
          find[sessionSetting] = sessionStatus[sessionSetting];
          this.$Message.success("设置成功");
        }
      })
    },
    deleteSession() {
      if (!this.delSessionId) {
        return
      }
      let find = this.sessionList.find(s => s.uid === this.delSessionId);
      if (!find) {
        this.delSessionId = null;
        return;
      }
      msgNoticeApi.deleteSession({sessionId: this.delSessionId}).then(data => {
        if (data?.result) {
          this.sessionList = this.sessionList.filter(s => s.uid !== this.delSessionId);
          if (this.activeSession.sessionId === this.delSessionId) {
            this.activeSession = {
              sessionId: null,
              sessionUserId: null,
              sessionUserName: null,
              sessionUserAvatar: null,
              sessionUserDomain: null,
              messages: []
            };
          }
          this.$Message.success("删除成功");
          this.delSessionId = null;
        }
      })
    },
    showDelModal(sessionId) {
      this.delSessionId = sessionId;
      this.showDel = true;
    },
    messageAction(action, message) {
      this.checkSWStatus();
      if (action === 'delete') {
        this.$sharedWorker.port.postMessage({
          type: 2,
          data: {
            type: 2,
            callback: 'deleteMessage',
            data: message.uid
          }
        });
      } else if (action === 'rollback') {
        this.$sharedWorker.port.postMessage({
          type: 2,
          data: {
            type: 2,
            callback: 'rollbackMessage',
            data: message.uid
          }
        });
      }
    },
    handleReachTop() {
      setTimeout(() => {
        console.log('hasMore判断', this.hasMore)
        if (!this.hasMore) {
          return;
        }
        // 获取当前滚动条
        let scroll = this.$refs.messageScroll;
        if (!scroll) {
          return;
        }
        if (scroll.scrollTop === 0) {
          setTimeout(() => {
            if (scroll.scrollTop < 100) {
              console.log("请求聊天记录", scroll.scrollTop);
              this.loadingMessage = true;
              this.$sharedWorker.port.postMessage({
                type: 2,
                data: {
                  type: 2,
                  callback: 'getChatLogs',
                  param: {
                    sessionId: this.activeSession.sessionId,
                    offset: this.offset,
                    limit: this.limit
                  }
                }
              });
            }
          }, 200)
        } else if (scroll.scrollTop < 100) {
          console.log("请求聊天记录", scroll.scrollTop);
          this.$sharedWorker.port.postMessage({
            type: 2,
            data: {
              type: 2,
              callback: 'getChatLogs',
              param: {
                sessionId: this.activeSession.sessionId,
                offset: this.offset,
                limit: this.limit
              }
            }
          });
        }
      }, 500)
    },
    handleReachBottom() {
      this.offset = this.offset + this.limit;
      this.loadMsgNotify(this.activeMenu);
    }
  },
  watch: {
    'propsActiveMenu'(newVal) {
      if (newVal === this.activeMenu) {
        return;
      }
      this.activeMenu = newVal;
    },
    'activeSessionId'(newVal) {
      if (newVal) {
        this.activeMenu = null;
        this.activeMenu = this.propsActiveMenu;
      }
    },
    'activeSession.sessionId'(newVal) {
      if (!newVal) {
        return;
      }
      this.offset = 0;
      this.hasMore = true;
      this.loadingMessage = false;
      console.log("watch-activeSession.sessionId-getChatLogs: ", newVal)
      this.checkSWStatus();
      this.$sharedWorker.port.postMessage({
        type: 2,
        data: {
          type: 2,
          callback: 'getChatLogs',
          param: {
            sessionId: newVal,
            offset: this.offset,
            limit: this.limit
          }
        }
      });
      // 设置未读数
      let find = this.sessionList.find(session => session.uid === newVal);
      if (find && find.unreadCount) {
        find.unreadCount = 0;
      }
    },
    'loginStatus'(status) {
      if (!status && this.$sharedWorker) {
        this.$sharedWorker.port.postMessage({
          type: 3
        })
      }
    },
    'activeMenu'(newValue) {
      this.msgNoticeList = [];
      this.offset = 0;
      this.hasMore = true;
      this.loadingMessage = false;
      console.log("watch-activeMenu-loadMsgNotify: ", newValue)
      this.loadMsgNotify(newValue);
      // 获取未读通知
      msgNoticeApi.getUnreadStatistic().then(data => {
        if (data?.result) {
          this.unreadCount = data.data;
        }
      })
    }
  },
  mounted() {
    this.popoverContainer = this.$refs.popoverContainer;
  },
  created() {
    this.debounceChatRequest = debounce(this.handleReachTop, 200, true);
    this.debounceNoticeRequest = debounce(this.handleReachBottom, 500, true);
    // 初始化sharedWorker进行webSocket连接
    Vue.prototype.$sharedWorker = new SharedWorker('../shared-worker.js', 'workerWs');
    if (!this.$sharedWorker) {
      this.$Message.info('此版本聊天系统暂不支持当前浏览器，请更换Chrom或Edge后重试');
      return;
    }
    this.wsInit();
    // 获取未读通知
    msgNoticeApi.getUnreadStatistic().then(data => {
      if (data?.result) {
        this.unreadCount = data.data;
      }
    })
  },
  beforeDestroy() {
    if (this.$sharedWorker) {
      this.$sharedWorker.port.postMessage({
        type: 4
      });
      this.$sharedWorker = null;
    }
  }
}
</script>

<style lang="less" scope>
@import "./css/message-notification.less";
</style>
