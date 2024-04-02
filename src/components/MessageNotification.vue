<template>
  <div class="layout-message-notification">
    <div class="msg-notify-menu">
      <div class="fixed-anchor-point">
        <div class="item">
          <span class="iconfont icon-paper-plane"></span>
          消息中心
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('commentReply')">
        <div :class="['item', activeMenu === 'commentReply' ? 'active-menu' : '']">
          <span>回复我的</span>
          <span class="count">5</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('likesReceived')">
        <div :class="['item', activeMenu === 'likesReceived' ? 'active-menu' : '']">
          <span>收到的赞</span>
          <span class="count">1</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('newFans')">
        <div :class="['item', activeMenu === 'newFans' ? 'active-menu' : '']">
          <span>新增关注</span>
          <span class="count">10</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('systemMessage')">
        <div :class="['item', activeMenu === 'systemMessage' ? 'active-menu' : '']">
          <span>系统消息</span>
          <span class="count">23</span>
        </div>
      </div>
      <div class="menu-item" @click="routeNavigate('chatMessage')">
        <div :class="['item', activeMenu === 'chatMessage' ? 'active-menu' : '']">
          <span>我的消息</span>
          <span class="count">99+</span>
        </div>
      </div>
      <div class="menu-item item-line">
        <div class="line"></div>
      </div>
      <div class="menu-item msg-setting" @click="routeNavigate('messageSetting')">
        <div :class="['item', activeMenu === 'messageSetting' ? 'active-menu' : '']">
          <span class="iconfont icon-preferences"></span>
          消息设置
        </div>
      </div>
    </div>
    <div class="msg-notify-body">
      <div class="module-tabs-wrapper">
        <div class="module-tabs-tabpane-active">
          <div class="tabs-tabpane-head">
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
              </span>
              <span v-if="activeMenu === 'messageSetting'">
                消息设置
              </span>
            </span>
            <span class="all-read-action">
              <span class="iconfont clean"></span>
              <span>
                全部已读
              </span>
            </span>
          </div>
          <div class="tabs-notify-holder beauty-scroll"
               v-if="activeMenu !== 'chatMessage' && activeMenu !== 'messageSetting'">
            <ul class="tab-list-items" v-if="activeMenu === 'commentReply'">
              <li class="tab-list-item"
                  v-for="item in commentReplyList"
                  :key="item.id">
                <div class="notification-item">
                  <b-avatar class="avatar"
                            :src="item.avatar"
                            variant="light" to="/asdasd" size="2rem">
                    <span v-if="!item.avatar">{{ row.username }}</span>
                  </b-avatar>
                  <div class="item-content">
                    <p>
                      <a href="/u25607691" target="_blank" class="context-actor">{{item.username}}</a>
                      {{ (item.action === 1 ? '对' : item.action === 2 ? '在' : '') +
                      (item.type === 1 ? '文档' : item.type === 2 ? '随笔' : '') }}
                      <a href="/go/notification/134715579" target="_blank">
                        <span class="context-subject">{{item.targetVectorName}}</span>
                      </a>
                      <span v-if="item.action === 1">
                        发表了评论
                      </span>
                      <span v-if="item.action === 2">
                        的评论中提到了你
                      </span>
                      <Badge dot v-if="item.read === 0" :offset="[-9, -3]"/>
                    </p>
                    <time>
                      <span>2023-03-16 14:58</span>
                    </time>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="tab-list-items" v-if="activeMenu === 'likesReceived'">
              <li class="tab-list-item"
                  v-for="item in likesList"
                  :key="item.id">
                <div class="notification-item">
                  <b-avatar class="avatar"
                            :src="item.avatar"
                            variant="light" to="/asdasd" size="2rem">
                    <span v-if="!item.avatar">{{ row.username }}</span>
                  </b-avatar>
                  <div class="item-content">
                    <p>
                      <a href="/u25607691" target="_blank" class="context-actor">{{item.username}}</a>
                      赞了我的{{ item.type == 1 ? '文档' : item.type == 2 ? '随笔' : '评论' }}
                      <a href="/go/notification/134715579" target="_blank">
                        <span class="context-subject">{{item.targetVectorName}}&nbsp;</span>
                      </a>
                      <Badge dot v-if="item.read === 0" :offset="[-9, -3]"/>
                    </p>
                    <time>
                      <span>2023-03-16 14:58</span>
                    </time>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="tab-list-items" v-if="activeMenu === 'newFans'">
              <li class="tab-list-item"
                  v-for="item in newFansList"
                  :key="item.id">
                <div class="notification-item">
                  <b-avatar class="avatar"
                            :src="item.avatar"
                            variant="light" to="/asdasd" size="2rem">
                    <span v-if="!item.avatar">{{ row.username }}</span>
                  </b-avatar>
                  <div class="item-content">
                    <p>
                      <a href="/u25607691" target="_blank" class="context-actor">{{item.username}}</a>
                      关注了我
                      <Badge dot v-if="item.read === 0" :offset="[-9, -3]"/>
                    </p>
                    <time>
                      <span>2023-03-16 14:58</span>
                    </time>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="tab-list-items" v-if="activeMenu === 'systemMessage'">
              <li class="tab-list-item"
                  v-for="item in systemMsgList"
                  :key="item.id">
                <div class="notification-item">
                  <div class="item-content">
                    <p>
                      <span class="context-subject">
                        {{item.content}}
                      </span>
                      <a :href="item.url" target="_blank">
                        <span class="sys-msg-label">&nbsp;{{item.label}}</span>
                      </a>
                      <Badge dot v-if="item.read === 0" :offset="[-9, -5]"/>
                    </p>
                    <time>
                      <span>2023-03-16 14:58</span>
                    </time>
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
                    :class="['list-item', session.session_user_id === activeSession.session_user_id ? 'active' : '']"
                    v-for="session in sessionList"
                    @click="changeActiveSession(session)"
                    :key="session.session_id">
                    <b-avatar class="avatar"
                              :src="session.session_user_avatar"
                              variant="light" to="/asdasd" size="2rem">
                      <span v-if="!session.session_user_avatar">{{ session.session_user_name }}</span>
                    </b-avatar>
                    <div class="name-box">
                      <div class="name" :title="session.session_user_name">
                        <div class="name-value">{{session.session_user_name}}</div>
                      </div>
                      <div :title="session.last_msg?.content?.content" class="last-word">
                        {{ session.last_msg?.content?.content }}
                      </div>
                    </div>
                    <div class="close">
                      <span class="iconfont remove"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="session-box">
                <div class="dialog">
                  <div class="title">
                    <div class="is-black" style="display: none;">
                      (&gt;﹏&lt; )该用户已经被你加入黑名单
                    </div>
                    <span>{{activeSession.session_user_name}}</span>
                    <div class="action-menu">
                      <Dropdown placement="bottom-end" trigger="click">
                        <a href="javascript:void(0)">
                          <div class="menu-btn">
                            <span class="iconfont icon-nav-menu"></span>
                          </div>
                        </a>
                        <DropdownMenu slot="list">
                          <DropdownItem>开启免打扰</DropdownItem>
                          <DropdownItem>加入黑名单</DropdownItem>
                          <DropdownItem>不再关注</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                  <div class="message-list beauty-scroll" ref="messageScroll">
                    <div class="message-list-content">
                      <div class="msg-more">
                        <span class="loading" style="display: none;">
                          <div data-v-2fe28aba="" class="lds-spinner">
                          </div>
                        </span>
                        <span class="error" style="display: none;">
                          消息加载失败，
                          <span class="reload">点击重新加载</span>
                        </span>
                      </div>
                      <div v-for="msg in activeSession.messages"
                           :class="[msg.msg_type === 0?'msg-time':'msg-item', msg.sender_uid === userInfo.uid?'is-me':'not-me']"
                           :key="msg.msg_key">
                        <span class="time" v-if="msg.msg_type === 0">{{ formatTime(msg.timestamp) }}</span>
                        <b-avatar v-if="msg.msg_type !== 0"
                                  class="avatar"
                                  :src="msg.sender_uid === userInfo.uid ? userInfo.avatar : activeSession.session_user_avatar"
                                  variant="light" to="/asdasd" size="2rem">
                          <span
                            v-if="!(msg.sender_uid === userInfo.uid ? userInfo.avatar : activeSession.session_user_avatar)">
                            {{ msg.sender_uid === userInfo.uid ? userInfo.username : activeSession.session_user_name }}
                          </span>
                        </b-avatar>
                        <div class="message" v-if="msg.msg_type !== 0">
                          <div v-if="msg.msg_type === 1" class="message-content" v-html="msg.content.content"></div>
                          <div v-if="msg.msg_type === 2" class="message-content is-img">
                            <img class="im-msg-item-img" title="[图片] 点击查看大图" alt="[图片] 点击查看大图"
                                 :src="msg.content.imageUrl"
                                 style="max-width:112px;">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="send-box">
                    <InputBox
                      ref="commentRef"
                      placeholder=" "
                      content-btn=" 发 送 "
                      :mentionConfig="mentionConfig"
                      scene="message"
                      @uploadImage="sendImage"
                      @submit="sendMessage"/>
                  </div>
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
                    <i-switch v-model="messageSetting.msgDot"
                              size="small"
                              @on-change="msgNotifyChange">
                    </i-switch>
                  </span>
                </div>
                <div class="settings-item">
                  <h4>有新消息时展示消息数量</h4>
                  <p>关闭后，当有新消息时，不展示相应位置的未读统计</p>
                  <span class="settings-selector">
                    <i-switch v-model="messageSetting.msgCount"
                              size="small"
                              @on-change="msgNotifyChange">
                    </i-switch>
                  </span>
                </div>
              </div>
              <h2 class="setting-subtitle">消息设置</h2>
              <div class="settings-item">
                <h4>回复我的消息提醒</h4>
                <p>接受谁的评论、回复或@消息提醒</p>
                <span class="settings-radio">
                  <RadioGroup v-model="messageSetting.replyAccept" @on-change="msgNotifyChange">
                      <Radio :label="1">所有人</Radio>
                      <Radio :label="2">关注的人</Radio>
                      <Radio :label="0">不接受任何消息提醒</Radio>
                  </RadioGroup>
                </span>
              </div>
              <div class="settings-item">
                <h4>收到的赞消息提醒</h4>
                <p>当他人给我的文档、随笔或评论点赞时</p>
                <span class="settings-radio">
                  <RadioGroup v-model="messageSetting.likeAccept" @on-change="msgNotifyChange">
                      <Radio :label="1">所有人</Radio>
                      <Radio :label="2">关注的人</Radio>
                      <Radio :label="0">不接受任何消息提醒</Radio>
                  </RadioGroup>
                </span>
              </div>
              <div class="settings-item">
                <h4>关注提醒</h4>
                <p>当他人关注我时</p>
                <span class="settings-selector">
                  <i-switch v-model="messageSetting.newFollower"
                            size="small"
                            @on-change="msgNotifyChange">
                    </i-switch>
                </span>
              </div>
              <div class="settings-item">
                <h4>系统消息</h4>
                <p>风险提示，功能变更，运营活动</p>
                <span class="settings-selector">
                  <i-switch v-model="messageSetting.systemNotice"
                            size="small"
                            @on-change="msgNotifyChange">
                    </i-switch>
                </span>
              </div>
              <div class="settings-item">
                <h4>我的消息</h4>
                <p>我对别人发起或别人对我发起的私信消息</p>
                <span class="settings-selector">
                  <i-switch v-model="messageSetting.chatMessage"
                            size="small"
                            @on-change="msgNotifyChange">
                    </i-switch>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatTime} from '@/utils/emoji';
  import InputBox from "@/components/common/replycomment/src/component/InputBox";

  export default {
    name: "MessageNotification",
    data() {
      return {
        // 评论回复
        commentReplyList: [],
        // 点赞
        likesList: [],
        newFansList: [],
        systemMsgList: [],
        sessionList: [],
        activeSession: {
          session_id: null,
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
        tmpId: 100,
        messageSetting: {
          msgDot: true,
          msgCount: true,
          replyAccept: 1,
          likeAccept: 1,
          newFollower: true,
          systemNotice: true,
          chatMessage: true
        }
      }
    },
    props: ['msgNotifyTypeActive'],
    methods: {
      routeNavigate(activeMenu) {
        if (this.activeMenu === activeMenu) {
          // 滚动条滚动套第一个未读的消息列表，如果全部已读则无需滚动
          return;
        }
        this.activeMenu = activeMenu;
        this.loadMsgNotify(activeMenu);
      },
      loadMsgNotify(activeMenu) {
        setTimeout(() => {
          console.log('更新数据')
        }, 1000)
        switch (activeMenu) {
          case 'commentReply':
            this.commentReplyList = [
              // type: 1 文档 2 随笔
              // action: 1 评论 2 提及
              {
                id: 121112,
                username: '安沐夕',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1ho0pjdv722j30m80hs771.jpg',
                domain: 'asd34dsff',
                type: 1,
                action: 1,
                read: 0,
                targetVectorId: 121212,
                targetVectorName: "浅谈Redis分布式锁(上)"
              },
              {
                id: 2235663,
                username: 'HappyDragon1994',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho5g0vpdj3j30nq0tn0v3.jpg',
                domain: 'asd34dsasdff',
                type: 1,
                action: 2,
                read: 1,
                targetVectorId: 12129432,
                targetVectorName: "浅谈Redis分布式锁(下)"
              },
              {
                id: 11553436,
                username: 'bravo1988',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1ho5g0tzacqj30nq0tojub.jpg',
                domain: '23dfsssgg55',
                type: 2,
                action: 2,
                read: 0,
                targetVectorId: 12129432,
                targetVectorName: "浅谈Redis分布式锁(下)"
              },
              {
                id: 33442222,
                username: '咔咔',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjnvgwdj30m80rsdj1.jpg',
                domain: 'sasdasdas',
                type: 2,
                action: 1,
                read: 0,
                targetVectorId: 12129432,
                targetVectorName: "浅谈Redis分布式锁(下)"
              },
              {
                id: 1214424,
                username: '白白bai',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjp45pmj30jz0qndkw.jpg',
                domain: 'sasdasdas',
                type: 2,
                action: 2,
                read: 1,
                targetVectorId: 12121129432,
                targetVectorName: "衣公子《迪拜：风浪越大，鱼越贵》"
              },
              {
                id: 75434234445353,
                username: 'IT\'S ME!',
                avatar: 'https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hln4xfe6glj30u011in2q.jpg',
                domain: 'ssds2323',
                type: 1,
                action: 2,
                read: 1,
                targetVectorId: 12121129432,
                targetVectorName: "冯大辉：为什么我不赞同都去读研究生》"
              },
              {
                id: 12345511666,
                username: '在下查尔斯',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho2yc13on8j31401aojxy.jpg',
                domain: 'ssds2323',
                type: 1,
                action: 1,
                read: 1,
                targetVectorId: 1212112922432,
                targetVectorName: "阿尔都塞：意识形态和意识形态国家机器"
              },
              {
                id: 754345353,
                username: '小小哥的 Blog',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho5g0wvoxoj30nq0to3zr.jpg',
                domain: 'ssds2323',
                type: 2,
                action: 2,
                read: 0,
                targetVectorId: 1212112129432,
                targetVectorName: "为什么现在的年轻人都不生孩子了？"
              }
            ]
            break;
          case 'likesReceived':
            this.likesList = [
              // type: 1 文档 2 随笔 3评论
              {
                id: 121112,
                username: '安沐夕',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1ho0pjdv722j30m80hs771.jpg',
                domain: 'asd34dsff',
                type: 1,
                read: 0,
                targetVectorId: 121212,
                targetVectorName: "浅谈Redis分布式锁(上)"
              },
              {
                id: 2235663,
                username: 'HappyDragon1994',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho5g0vpdj3j30nq0tn0v3.jpg',
                domain: 'asd34dsasdff',
                type: 2,
                read: 1,
                targetVectorId: 12129432,
                targetVectorName: "浅谈Redis分布式锁(下)"
              },
              {
                id: 11553436,
                username: 'bravo1988',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1ho5g0tzacqj30nq0tojub.jpg',
                domain: '23dfsssgg55',
                type: 3,
                read: 0,
                targetVectorId: 12129432,
                targetVectorName: "支持一下up[给心心]"
              },
              {
                id: 33442222,
                username: '咔咔',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjnvgwdj30m80rsdj1.jpg',
                domain: 'sasdasdas',
                type: 3,
                read: 1,
                targetVectorId: 12129432,
                targetVectorName: "可能和大家的固有思维有关吧，卡农就是舒缓版，然后就。。"
              },
              {
                id: 1214424,
                username: '白白bai',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjp45pmj30jz0qndkw.jpg',
                domain: 'sasdasdas',
                type: 2,
                read: 1,
                targetVectorId: 12121129432,
                targetVectorName: "只有经历过社会毒打才会明白"
              },
              {
                id: 75434234445353,
                username: 'IT\'S ME!',
                avatar: 'https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hln4xfe6glj30u011in2q.jpg',
                domain: 'ssds2323',
                type: 1,
                read: 1,
                targetVectorId: 12121129432,
                targetVectorName: "Nginx — 深入浅出"
              },
              {
                id: 12345511666,
                username: '在下查尔斯',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho2yc13on8j31401aojxy.jpg',
                domain: 'ssds2323',
                type: 3,
                read: 1,
                targetVectorId: 1212112922432,
                targetVectorName: "回复 @吾爱财经 :听了王妈的话，进了中盖，大不了我亏一个点走人也不去追"
              },
              {
                id: 754345353,
                username: '小小哥的 Blog',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho5g0wvoxoj30nq0to3zr.jpg',
                domain: 'ssds2323',
                type: 2,
                read: 0,
                targetVectorId: 1212112129432,
                targetVectorName: "当卡农Canon和EDM交响后&remix!你绝对想不到的震撼"
              }
            ]
            break;
          case 'newFans':
            this.newFansList = [
              {
                id: 121112,
                username: '安沐夕',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1ho0pjdv722j30m80hs771.jpg',
                domain: 'asd34dsff',
                read: 0
              },
              {
                id: 2235663,
                username: 'HappyDragon1994',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho5g0vpdj3j30nq0tn0v3.jpg',
                domain: 'asd34dsasdff',
                read: 1
              },
              {
                id: 11553436,
                username: 'bravo1988',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1ho5g0tzacqj30nq0tojub.jpg',
                domain: '23dfsssgg55',
                read: 1
              },
              {
                id: 33442222,
                username: '咔咔',
                avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjnvgwdj30m80rsdj1.jpg',
                domain: 'sasdasdas',
                read: 0
              }
            ]
            break;
          case 'systemMessage':
            this.systemMsgList = [
              {
                id: 1,
                content: '进来抽奖，即得100万现金红包瓜分资格! ',
                label: '点此查看',
                url: 'http://www.baidu.com',
                read: 0
              },
              {
                id: 2,
                content: '进来抽奖，即得100万现金红包瓜分资格! ',
                label: '点此查看',
                url: 'http://www.baidu.com',
                read: 1
              },
              {
                id: 3,
                content: '进来抽奖，即得100万现金红包瓜分资格! ',
                label: '点此查看',
                url: 'http://www.baidu.com',
                read: 1
              },
              {
                id: 4,
                content: '叮！你获得了新的限时任务啦！ ',
                label: '查看任务',
                url: 'https://message.bilibili.com/?spm_id_from=333.1228.0.0#/system',
                read: 0
              },
              {
                id: 5,
                content: '2022年的愿望，都来这里实现！ ',
                label: '点我马上参与>>> ',
                url: 'https://www.bilibili.com/blackboard/activity-DWi81m1Xbv.html',
                read: 0
              }
            ]
            break;
          case 'chatMessage':
            this.sessionList = [
              {
                "session_id": 1,
                "session_user_id": 123123123,
                "session_user_name": "股市-目标1000万股桃哥",
                "session_user_avatar": "https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/006BNqYCly1hmv3du2z1zj30k00qowme.jpg",
                "is_follow": 1,
                "session_ts": 1710826535376070,
                "unread_count": 0,
                "live_status": 0,
                "last_msg": {
                  "sender_uid": 271221082,
                  "receiver_type": 1,
                  "receiver_id": 625315686,
                  "msg_type": 1,
                  "content": {"content": "没人好像"},
                  "timestamp": 1710826535,
                  "at_uids": null,
                  "msg_key": 7347944017136584000,
                  "msg_status": 0
                }
              },
              {
                "session_id": 2,
                "session_user_id": 123122123123,
                "session_user_name": "Music郑在看",
                "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hlu1m6vedbj30is0qaabq.jpg",
                "is_follow": 0,
                "session_ts": 1700109866222339,
                "unread_count": 1,
                "live_status": 0,
                "last_msg": {
                  "sender_uid": 233200988,
                  "receiver_type": 1,
                  "receiver_id": 271221082,
                  "msg_type": 1,
                  "content": {"content": "谢谢关注。祝投资顺利！买的都是大牛股！"},
                  "timestamp": 1700109865,
                  "at_uids": null,
                  "msg_key": 7301916270749065000,
                  "msg_status": 0
                }
              },
              {
                "session_id": 3,
                "session_user_id": 12312443123,
                "session_user_name": "鹏城杰森",
                "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hlu1maldlsj30m71fnn29.jpg",
                "is_follow": 0,
                "session_ts": 1698548656929697,
                "unread_count": 1,
                "live_status": 0,
                "last_msg": {
                  "sender_uid": 3493297165175445,
                  "receiver_type": 1,
                  "receiver_id": 271221082,
                  "msg_type": 1,
                  "content": {"content": "周末一过明天又是开战的一天哦"},
                  "timestamp": 1698548656,
                  "at_uids": null,
                  "msg_key": 7295210928955405000,
                  "msg_status": 0
                }
              },
              {
                "session_id": 4,
                "session_user_id": 12367123123,
                "session_user_name": "保彪",
                "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hlu1mjb0hdj30vp1bj45k.jpg",
                "is_follow": 0,
                "session_ts": 1694423942225948,
                "unread_count": 1,
                "live_status": 0,
                "last_msg": {
                  "sender_uid": 1764905834,
                  "receiver_type": 1,
                  "receiver_id": 271221082,
                  "msg_type": 1,
                  "content": {
                    "content": "现在要破3000了[妙啊]"
                  },
                  "timestamp": 1694423941,
                  "at_uids": null,
                  "msg_key": 7277495413156296000,
                  "msg_status": 0
                }
              },
              {
                "session_id": 5,
                "session_user_id": 12387123123,
                "session_user_name": "江东刀郎",
                "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hlu1n13ni4j316o1kwgt1.jpg",
                "is_follow": 1,
                "session_ts": 1693372352970827,
                "unread_count": 1,
                "live_status": 0,
                "last_msg": {
                  "sender_uid": 96081167,
                  "receiver_type": 1,
                  "receiver_id": 271221082,
                  "msg_type": 2,
                  "content": {
                    "content": "图片",
                    "height": 1280,
                    "imageType": "png",
                    "original": 0,
                    "size": "173",
                    "url": "https://i0.hdslb.com/bfs/im_new/aa7c4f07f8552bce791565469ab48e7a96081167.jpg",
                    "width": 795
                  },
                  "timestamp": 1693372352,
                  "at_uids": null,
                  "msg_key": 7272978872691186000,
                  "msg_status": 0
                }
              },
              {
                "session_id": 6,
                "session_user_id": 12319823123,
                "session_user_name": "福利吧搬运工",
                "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hlu1n1w2m7j335s2dcx14.jpg",
                "is_follow": 1,
                "session_ts": 1672072267119796,
                "unread_count": 1,
                "live_status": 0,
                "last_msg": {
                  "sender_uid": 1803963357,
                  "receiver_type": 1,
                  "receiver_id": 271221082,
                  "msg_type": 1,
                  "content": {
                    "content": "影视歌只要想的基本全本地化。网盘不知哪天变动，就被动vip了。阿里云就是，还好大多在天翼和迅雷。"
                  },
                  "timestamp": 1672072266,
                  "at_uids": null,
                  "msg_key": 7181495700031737000,
                  "msg_status": 0
                }
              },
              {
                "session_id": 7,
                "session_user_id": 1231113423123,
                "session_user_name": "私募小日常",
                "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hm7wguih2rj316o1kwk8h.jpg",
                "is_follow": 1,
                "session_ts": 1672072267119796,
                "unread_count": 1,
                "live_status": 0,
                "last_msg": {
                  "sender_uid": 1803963357,
                  "receiver_type": 1,
                  "receiver_id": 271221082,
                  "msg_type": 1,
                  "content": {"content": "宝贝，请坐我的小板凳～来了就别走啦！我给你看我收藏的好东西(ू•ᴗ•ू❁)有啥想问的随时私信我！聊个5毛钱的哈哈哈哈哈"},
                  "timestamp": 1672072266,
                  "at_uids": null,
                  "msg_key": 7181495700031737000,
                  "msg_status": 0
                }
              },
              {
                "session_id": 8,
                "session_user_id": 12083123123,
                "session_user_name": "依旧smile",
                "session_user_avatar": "https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hmcl0nlc5sj335s23v7j6.jpg",
                "is_follow": 1,
                "session_ts": 1672072267119796,
                "unread_count": 1,
                "live_status": 0,
                "last_msg": {
                  "sender_uid": 1803963357,
                  "receiver_type": 1,
                  "receiver_id": 271221082,
                  "msg_type": 1,
                  "content": {"content": "音乐嘛。我觉得最重要的就是全。很少有比较全的音乐app，我都是混着用"},
                  "timestamp": 1672072266,
                  "at_uids": null,
                  "msg_key": 7181495700031737000,
                  "msg_status": 0
                }
              },
              {
                "session_id": 9,
                "session_user_id": 115723123123,
                "session_user_name": "深夜港湾",
                "session_user_avatar": "https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1hmet8wel4mj327x2yo4qp.jpg",
                "is_follow": 1,
                "session_ts": 1672072267119796,
                "unread_count": 1,
                "live_status": 0,
                "last_msg": {
                  "sender_uid": 1803963357,
                  "receiver_type": 1,
                  "receiver_id": 271221082,
                  "msg_type": 1,
                  "content": {"content": "内容还蛮有趣，画风是Q版的，没那么辣眼睛，如果你的对象比较含蓄也可以毫不违和的一起看。"},
                  "timestamp": 1672072266,
                  "at_uids": null,
                  "msg_key": 7181495700031737000,
                  "msg_status": 0
                }
              }
            ]
            let session = this.sessionList.length > 0 ? this.sessionList[0] : {};
            this.activeSession.session_id = session.session_id;
            this.activeSession.session_user_id = session.session_user_id;
            this.activeSession.session_user_name = session.session_user_name;
            this.activeSession.session_user_avatar = session.session_user_avatar;
            break;
          case
          'ramblyJot'
          :
            break;
        }
      },
      formatTime,
      changeActiveSession(session) {
        this.activeSession.session_id = session.session_id;
        this.activeSession.session_user_id = session.session_user_id;
        this.activeSession.session_user_name = session.session_user_name;
        this.activeSession.session_user_avatar = session.session_user_avatar;
        this.activeSession.messages = [];
      },
      sendMessage(msgContent, clear) {
        // 清空输入框内容
        clear();
        // 发送消息
        setTimeout(() => {
          this.addMsgTime(msgContent.createTime);
          this.activeSession.messages.push({
            "sender_uid": this.userInfo.uid,
            "receiver_type": 1,
            "receiver_id": this.activeSession.session_id,
            "msg_type": 1,
            "content": {"content": msgContent.content},
            "timestamp": msgContent.createTime,
            "msg_key": this.tmpId++,
            "msg_status": 0
          });
          let messageScroll = this.$refs.messageScroll;
          if (messageScroll) {
            // 使用 setTimeout 来确保在 DOM 更新之后再进行滚动
            this.$nextTick(() => {
              // 将滚动位置设置为容器的滚动高度
              messageScroll.scrollTop = messageScroll.scrollHeight;
            });
          }
        }, 500)
        this.ifShowEmojiSelector = false;
      },
      sendImage(file) {
        // 生成base64格式进行显示
        const reader = new FileReader(); // 创建FileReader对象
        reader.onload = () => {
          // 读取文件完成后将结果设置为预览图URL
          let fileUrl = reader.result;
          let now = Date.now();
          this.addMsgTime(now);
          // 发送消息
          setTimeout(() => {
            this.activeSession.messages.push({
              "sender_uid": this.userInfo.uid,
              "receiver_type": 1,
              "receiver_id": this.activeSession.session_id,
              "msg_type": 2,
              "content": {"content": "图片", "imageUrl": fileUrl},
              "timestamp": now,
              "msg_key": this.tmpId++,
              "msg_status": 0
            });
            let messageScroll = this.$refs.messageScroll;
            if (messageScroll) {
              // 使用 setTimeout 来确保在 DOM 更新之后再进行滚动
              this.$nextTick(() => {
                // 将滚动位置设置为容器的滚动高度
                messageScroll.scrollTop = messageScroll.scrollHeight;
              });
            }
          }, 500)
        };
        // 读取文件内容，这里使用DataURL格式
        reader.readAsDataURL(file);
      },
      addMsgTime(now) {
        // 比较当前时间与最后一条数据的时间差
        let size = this.activeSession?.messages?.length;
        if (!size) {
          this.activeSession.messages = [
            {
              "msg_type": 0,
              "timestamp": now
            }
          ];
          return;
        }
        let message = this.activeSession.messages[size - 1];
        if (message?.type !== 0 && (now - message.timestamp) > 1000 * 60 * 5) {
          this.activeSession.messages.push({
            "msg_type": 0,
            "timestamp": now
          });
        }
      },
      msgNotifyChange() {
        this.$Message.success('设置成功');
      }
    },
    watch: {
      'msgNotifyTypeActive'(newVal) {
        if (newVal === this.activeMenu) {
          return;
        }
        this.activeMenu = newVal;
        this.loadMsgNotify(newVal);
      },
      'activeSession.session_id'(newVal, oldVla) {
        // TODO 获取消息列表
        if (newVal === oldVla) {
          return;
        }
        setTimeout(() => {
          this.activeSession.messages = [
            // msg_type 0用于时间显示 1文本消息 2图片消息
            {
              "msg_type": 0,
              "timestamp": 1711211709000
            },
            {
              "sender_uid": 123123123,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 1,
              "content": {"content": "宝贝，请坐我的小板凳～来了就别走啦！我给你看我收藏的好东西(ू•ᴗ•ू❁)有啥想问的随时私信我！聊个5毛钱的哈哈哈哈哈"},
              "timestamp": 1706546109000,
              "msg_key": 11,
              "msg_status": 0
            },
            {
              "msg_type": 0,
              "timestamp": 1709481909000
            },
            {
              "sender_uid": 0,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 1,
              "content": {"content": "桃哥，怎么开0.5的"},
              "timestamp": 1672072266000,
              "msg_key": 22,
              "msg_status": 0
            },
            {
              "msg_type": 0,
              "timestamp": 1711730115671
            },
            {
              "sender_uid": 123123123,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 1,
              "content": {"content": "加下我qq<br> 2156058387"},
              "timestamp": 1711730115671,
              "msg_key": 33,
              "msg_status": 0
            },
            {
              "sender_uid": 123123123,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 1,
              "content": {"content": "完了，BBQ了，停不下来了"},
              "timestamp": 1711730115671,
              "msg_key": 44,
              "msg_status": 0
            },
            {
              "sender_uid": 123123123,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 1,
              "content": {"content": "再发我就不干了"},
              "timestamp": 1711730115671,
              "msg_key": 55,
              "msg_status": 0
            },
            {
              "sender_uid": 123123123,
              "receiver_type": 1,
              "receiver_id": 271221082,
              "msg_type": 2,
              "content": {
                "content": "图片",
                'imageUrl': 'https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hlu1m6vedbj30is0qaabq.jpg'
              },
              "timestamp": 1711730115671,
              "msg_key": 66,
              "msg_status": 0
            }
          ];
          let messageScroll = this.$refs.messageScroll;
          if (messageScroll) {
            // 使用 setTimeout 来确保在 DOM 更新之后再进行滚动
            this.$nextTick(() => {
              // 将滚动位置设置为容器的滚动高度
              messageScroll.scrollTop = messageScroll.scrollHeight;
            });
          }
        }, 500)
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    components: {
      InputBox
    },
    mounted() {
      this.activeMenu = 'commentReply';
      this.loadMsgNotify('commentReply');
    }
  }
</script>

<style lang="less" scope>
  @import "./css/message-notification.less";
</style>
