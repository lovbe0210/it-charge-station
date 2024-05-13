<template>
  <b-container fluid>
    <div v-if="userInfo?.uid">
      <div v-if="creatorTrend && creatorTrend.length > 0" class="creator-trend">
        <div class="trend-item" v-for="item in creatorTrend" :key="item.id">
          <div class="trend-info">
            <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer" class="item-left">
              <slot>
                <b-avatar :src="item.userInfo.avatar" class="avatar">
                  <span v-if="!item.userInfo.avatar">{{ item.userInfo.username }}</span>
                </b-avatar>
              </slot>
            </user-card>
            <div class="item-right">
              <span class="post-user">{{ item.userInfo.username }}</span>
              <span class="post-time">
                <Time class="time" :time="item.pubTime" v-if="needFormatDate(item.pubTime)"/>
                <Time class="time" :time="item.pubTime" v-else type="datetime"/>
              </span>
              <span class="post-type">
                {{ item.pubType === '1' ? '发布了文章' : item.pubType === '2' ? '发布了随笔' : '创建了专栏' }}
              </span>
            </div>
          </div>

          <div :class="['trend-content', item.pubType === '2' ? 'rambly' : '']">
            <b-link to="/ramblyJot/sadasd" class="post-desc">
              <p class="post-title" v-if="item.pubType !== '2'">{{ item.PublicTitle }}</p>
              <p class="post-content">{{ item.PublicContent }}</p>
            </b-link>
            <div class="post-image" v-if="item.picList && item.picList.length > 0">
              <b-img-lazy v-for="(pic, index) in item.picList"
                          :key="index"
                          :src="pic">
              </b-img-lazy>
            </div>
          </div>
        </div>
      </div>
      <b-row v-else class="trend-empty">
        <span class="iconfont beauty-empty"></span>
        <div class="list-empty-text">
          <span>好像没有新动态</span>
          <span class="empty-btn">
            去<b-link class="highlight" to="/"> 推荐 </b-link>看看
          </span>
        </div>
      </b-row>
    </div>
    <div v-else>
      <div class="unlogin un-select">
        <div class="unlogin_img">
          <img :src="require('@/assets/img/unlogin.png')" alt="">
        </div>
        <div class="to-login">
          <div class="unlogin_title">登录后看看都有哪些新动态</div>
          <span class="unlogin_btn">
            <auth-modal>
              <slot>
                赶快
                <a href="javascript: void(0)">登陆&nbsp;</a>
                吧
              </slot>
            </auth-modal>
          </span>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import UserCard from "@/components/common/UserCard.vue";
import {needFormatDate} from '@/utils/emoji';

export default {
  name: 'Follow',
  data() {
    return {
      popoverContainer: null,
      creatorTrend: [
        {
          id: '001',
          // 动态类型 1笔记 2随笔 3专栏
          pubType: '1',
          PublicTitle: '运算符🔣Family',
          PublicContent: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
          picList: [
            require('@/assets/img/6.jpg')
          ],
          pubTime: 1715609438640,
          userInfo: {
            userId: 1,
            username: '闪魔亮晶晶',
            avatar: require('@/assets/avatar/16.png')
          }
        },
        {
          id: '002',
          pubType: '2',
          PublicTitle: null,
          PublicContent: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
          picList: [
            require('@/assets/avatar/01.jpg'),
            require('@/assets/avatar/04.jpg'),
            require('@/assets/avatar/05.jpg')
          ],
          pubTime: 1707833424000,
          userInfo: {
            userId: 1,
            username: '晶莹剔透的Q宝',
            avatar: require('@/assets/avatar/03.jpg')
          }
        },
        {
          id: '003',
          pubType: '3',
          PublicTitle: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
          PublicContent: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
          picList: [
            require('@/assets/img/5.jpg')
          ],
          pubTime: 1715602224000,
          userInfo: {
            userId: 1,
            username: '无懈可击',
            avatar: require('@/assets/avatar/01.jpg')
          }
        },
        {
          id: '004',
          pubType: '3',
          PublicTitle: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
          PublicContent: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
          picList: [
            require('@/assets/img/3.jpg')
          ],
          pubTime: 1715584224000,
          userInfo: {
            userId: 1,
            username: '这是啥撒啊阿萨 ',
            avatar: require('@/assets/avatar/01.jpg')
          }
        }
      ]
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  components: {
    UserCard
  },
  methods: {
    needFormatDate
  },
  mounted() {
    this.popoverContainer = this.$refs.popoverContainer;
  }
}
</script>

<style scoped lang="less">
@import "./css/follow.less";
@import "./css/common-var";
</style>
