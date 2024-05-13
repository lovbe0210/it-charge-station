<template>
  <b-container fluid>
    <div v-if="userInfo?.uid">
      <b-row v-if="creatorTrend && creatorTrend.length > 0" class="creator-trend">
        <!--<b-card body-class="trend-item" v-for="(item,index) in creatorTrend" :key="item.id">
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
        </b-card>-->


        <div class="trend-item" v-for="item in creatorTrend" :key="item.id">
          <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer" class="item-left">
            <slot>
              <b-avatar :src="item.userInfo.avatar" class="avatar">
                <span v-if="!item.userInfo.avatar">{{item.userInfo.username}}</span>
              </b-avatar>
            </slot>
          </user-card>
          <div class="item-right">
            <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer">
              <slot>
                <span class="username">{{item.userInfo.username}}</span>
              </slot>
            </user-card>
            <div class="post-content">
              <b-link to="/ramblyJot/sadasd">
                <p>{{item.PublicTitle}}</p>
              </b-link>
            </div>
            <div class="post-image">
              <div class="photo-content p1" v-if="item.picList?.length === 1">
                <div>
                  <div class="cover-url">
                    <div class="cover-url-item">
                      <div class="bottom-mask">
                        <img :src="item.picList[0]" :alt="'灵感时刻-' + item.createTime" class="bottom-img">
                      </div>
                      <div class="blur"></div>
                      <div class="cover-item">
                        <img :src="item.picList[0]" :alt="'灵感时刻-' + item.createTime" class="cover-url-item">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="photo-content p2" v-if="item.picList?.length === 2">
                <div>
                  <div class="cover-url">
                    <div class="cover-url-item">
                      <div class="bottom-mask">
                        <img v-for="pic in item.picList" :key="pic" :src="pic" :alt="'灵感时刻-' + item.createTime"
                             class="bottom-img">
                      </div>
                      <div class="blur"></div>
                      <div class="cover-item">
                        <div v-for="pic in item.picList" :key="pic" class="cover-item-box">
                          <img :src="pic" :alt="'灵感时刻-' + item.createTime" class="cover-url-item">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="photo-content p3" v-if="item.picList?.length === 3">
                <div class="more-images">
                  <div v-for="pic in item.picList" :key="pic" class="photo">
                    <img :src="pic" :alt="'灵感时刻-' + item.createTime">
                  </div>
                </div>
              </div>
            </div>
            <div class="action-box">
              <div class="post-time">
                <span>发布于 </span>
                <Time class="time" :time="item.createTime" v-if="needFormatDate(item.createTime)"/>
                <Time class="time" :time="item.createTime" v-else type="datetime"/>
              </div>
              <div class="action">
              <span class="reply-btn">
                <span class="iconfont reply"></span>
                {{item.comments}}
              </span>
                <span class="like-btn">
                <span class="iconfont like"></span>
                {{item.likes}}
              </span>
              </div>
            </div>
          </div>
        </div>


      </b-row>
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
  import AuthModal from "@/components/common/AuthModal.vue";

  export default {
    name: 'Follow',
    data() {
      return {
        popoverContainer: null,
        creatorTrend: [
          {
            id: '001',
            // 动态类型 1笔记 2动态 3专栏
            pubType: '1',
            PublicTitle: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
            PublicContent: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
            pubTime: '10分钟前',
            userInfo: {
              userId: 1,
              username: '闪魔亮晶晶',
              avatar: require('@/assets/avatar/16.png')
            }
          },
          {
            id: '002',
            // 动态类型 1笔记 2动态 3专栏
            pubType: '2',
            PublicTitle: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
            PublicContent: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
            pubTime: '10分钟前',
            userInfo: {
              userId: 1,
              username: '闪魔亮晶晶',
              avatar: require('@/assets/avatar/16.png')
            }
          },
          {
            id: '003',
            // 动态类型 1笔记 2动态 3专栏
            pubType: '3',
            PublicTitle: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
            PublicContent: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
            pubTime: '10分钟前',
            userInfo: {
              userId: 1,
              username: '闪魔亮晶晶',
              avatar: require('@/assets/avatar/16.png')
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
      AuthModal
    },
    methods: {},
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
    }
  }
</script>

<style scoped lang="less">
  @import "./css/follow.less";
  @import "./css/common-var";
</style>
