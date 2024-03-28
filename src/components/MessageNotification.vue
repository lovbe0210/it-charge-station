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
          <span>新增粉丝</span>
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
              回复我的
            </span>
            <span class="all-read-action">
              <span class="iconfont clean"></span>
              <span>
                全部已读
              </span>
            </span>
          </div>
          <div class="tabs-content-holder">
            <ul class="tab-list-items" v-if="activeMenu === 'commentReply'">
              <li class="tab-list-item"
                  v-for="item in commentReplyList"
                  :key="item.id">
                <div class="notification-item">
                  <b-avatar class="avatar"
                            :src="item.avatar"
                            variant="light" to="/asdasd" size="2rem">
                    <span v-if="!item.username">{{ row.username }}</span>
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
                    <span v-if="!item.username">{{ row.username }}</span>
                  </b-avatar>
                  <div class="item-content">
                    <p>
                      <a href="/u25607691" target="_blank" class="context-actor">{{item.username}}</a>
                      赞了我的{{ item.type == 1 ? '文档' : item.type == 2 ? '随笔' : '评论' }}
                      <a href="/go/notification/134715579" target="_blank">
                        <span class="context-subject">{{item.targetVectorName}}</span>
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
                    <span v-if="!item.username">{{ row.username }}</span>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        activeMenu: null
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
        setTimeout(() => { console.log('更新数据') }, 1000)
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
                id: 12312313123,
                content: '进来抽奖，即得100万现金红包瓜分资格! ',
                label: '点此查看',
                url: 'http://www.baidu.com',
                read: 0
              },
              {
                id: 12312313123,
                content: '进来抽奖，即得100万现金红包瓜分资格! ',
                label: '点此查看',
                url: 'http://www.baidu.com',
                read: 1
              },
              {
                id: 12312313123,
                content: '进来抽奖，即得100万现金红包瓜分资格! ',
                label: '点此查看',
                url: 'http://www.baidu.com',
                read: 1
              },
              {
                id: 12312313123,
                content: '叮！你获得了新的限时任务啦！ ',
                label: '查看任务',
                url: 'https://message.bilibili.com/?spm_id_from=333.1228.0.0#/system',
                read: 0
              },
              {
                id: 12312313123,
                content: '2022年的愿望，都来这里实现！ ',
                label: '点我马上参与>>> ',
                url: 'https://www.bilibili.com/blackboard/activity-DWi81m1Xbv.html',
                read: 0
              }
            ]
            break;
          case 'chatMessage':
            this.$router.push({name: 'ChatMessage'})
            break;
          case 'ramblyJot':
            this.$router.push({name: 'RamblyJot'})
            break;
        }
      }
    },
    watch: {
      'msgNotifyTypeActive'(newVal) {
        if (newVal === this.activeMenu) {
          return;
        }
        this.activeMenu = newVal;
        this.loadMsgNotify(newVal);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./css/message-notification.less";
</style>
