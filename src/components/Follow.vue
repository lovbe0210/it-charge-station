<template>
  <b-container fluid>
    <div v-if="userInfo?.uid">
      <b-row v-if="creatorTrend && creatorTrend.length == 0" class="creator-trend">
        <b-card body-class="trend-item" v-for="(item,index) in creatorTrend" :key="item.id">
          <b-card-title>
            <b-avatar variant="light" :src="item.avatar" to="some-link">
              <span v-if="!item.avatar" class="iconfont icon-all-flush" style="font-size:2.5rem;"></span>
            </b-avatar>
            <span class="title">{{item.trendTitle}}</span>
            <span class="time">{{item.publicTime}}</span>
          </b-card-title>
          <b-card-text>
            {{item.previewContent}}
          </b-card-text>
          <b-card-text class="small text-muted">
            <span class="iconfont icon-personal-man"></span><span>{{item.nickName}}</span>
            <span class="iconfont icon-comment" style="margin-left: 5px;"></span><span>{{item.commentCount}}</span>
            <span class="iconfont icon-like1" style="margin-left: 5px;"></span><span>{{item.likeCount}}</span>
          </b-card-text>
          <hr v-if="index !== creatorTrend.length-1">
        </b-card>
      </b-row>
      <b-row v-else class="trend-empty">
        <span class="iconfont beauty-empty"></span>
        <div class="list-empty-text un-select">
          <span>好像没有新动态</span>
          <span class="empty-btn">
            去<b-link class="highlight" to="/recommend"> 推荐 </b-link>看看
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
  import AuthModal from "@/components/common/AuthModal.vue";

  export default {
    name: 'Follow',
    data() {
      return {
        creatorTrend: [
          {
            id: '001',
            avatar: 'https://tvax1.sinaimg.cn/large/718153f4gy1gy47gm06y9j20m80rsq8t.jpg',
            nickName: 'lovbe0210',
            trendTitle: '发表了笔记 MySQL索引初见闻',
            previewContent: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
            publicTime: '10分钟前',
            likeCount: 15,
            commentCount: 15
          },
          {
            id: '002',
            avatar: 'https://tvax3.sinaimg.cn/large/718153f4gy1gy1ob6nxj1j20lo0ot41b.jpg',
            nickName: 'lovbe0210',
            trendTitle: '发表了心情',
            previewContent: '今天蒙蒙顿顿',
            publicTime: '昨天09:30',
            likeCount: 15,
            commentCount: 15
          },
          {
            id: '003',
            avatar: 'https://tvax1.sinaimg.cn/large/718153f4gy1gxzk3fro87j20nc0ncq3z.jpg',
            nickName: 'lovbe0210',
            trendTitle: '发表了专栏文章 K8S自动部署（上）—— 认识Docker',
            previewContent: 'K8S自动部署（上）—— 认识DockerK8S自动部署（上）—— 认识DockerK8S自动部署（上）—— 认识DockerK8S自动部署（上）—— 认识DockerK8S自动部署（上）—— 认识Docker',
            publicTime: '01-17',
            likeCount: 15,
            commentCount: 15
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
      AuthModal
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  @import "./css/follow.less";
  @import "./css/common-var";
</style>
