<template>
  <b-container fluid ref="popoverContainer">
    <div v-if="userInfo?.uid" class="un-select">
      <div v-if="creatorTrend && creatorTrend.length > 0" class="creator-trend">
        <div class="trend-item" v-for="item in creatorTrend" :key="item.id">
          <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer" class="item-left">
            <slot>
              <b-avatar :src="item.userInfo.avatar" class="avatar" :to="'/' + item.userInfo.domain">
                <span v-if="!item.userInfo.avatar">{{ item.userInfo.username }}</span>
              </b-avatar>
            </slot>
          </user-card>
          <div class="trend-info">
            <div class="post-info">
              <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer">
                <slot>
                  <span class="post-user">{{ item.userInfo.username }}</span>
                </slot>
              </user-card>
              <span class="post-time">
                <Time class="time" :time="item.pubTime" v-if="needFormatDate(item.pubTime)"/>
                <Time class="time" :time="item.pubTime" v-else type="datetime"/>
              </span>
              <span class="post-type">
                <span v-if="item.pubType === 1 ||  item.pubType === 2">发布了</span>
                <span v-else>创建了</span>
                <span :class="['item-type', item.pubType == 1 ? 'doc' : item.pubType == 2 ? 'colum' : 'rambly-jot']">
                  {{ item.pubType === 1 ? '文章' : item.pubType === 2 ? '随笔' : '专栏' }}
                </span>
              </span>
            </div>
            <div :class="['trend-content', item.pubType === 2 ? 'rambly' : '']">
              <div class="post-desc">
                <b-link :href="'' + getRouterPath(item)">
                  <p class="post-title" v-if="item.pubType !== 2">{{ item.PublicTitle }}</p>
                  <p class="post-content">{{ item.PublicContent }}</p>
                </b-link>
                <div class="action" v-if="item.pubType !== 2">
                <span class="reply-btn">
                  <span class="iconfont reply"></span>
                  {{ item.comments }}
                </span>
                  <span class="like-btn">
                  <span :class="['iconfont', 'like', item.ilike ? 'ilike' : '']"></span>
                  {{ item.likes }}
                </span>
                </div>
              </div>
              <div class="post-image" v-if="item.picList && item.picList.length > 0">
                <b-link v-if="item.pubType !== 2" to="/column/sadasd">
                  <b-img-lazy v-for="(pic, index) in item.picList" height="100%" rounded
                              :key="index"
                              class="as-img"
                              :src="pic">
                  </b-img-lazy>
                </b-link>
                <div v-else :id="item.id" class="rambly-img-box">
                  <div v-for="(pic, index) in item.picList"
                       :key="index"
                       class="rambly-img"
                       @click="previewImage(item, index)">
                    <b-img-lazy height="100%"
                                rounded
                                :src="pic">
                    </b-img-lazy>
                  </div>
                </div>
              </div>
              <div class="action" v-if="item.pubType === 2">
                <span class="reply-btn">
                  <span class="iconfont reply"></span>
                  {{ item.comments }}
                </span>
                <span class="like-btn">
                  <span :class="['iconfont', 'like', item.ilike ? 'ilike' : '']"></span>
                  {{ item.likes }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-row v-else class="trend-empty">
        <span class="iconfont on-the-way"></span>
        <div class="list-empty-text">
          <span>新动态好像还在路上</span>
          <span class="empty-btn">
            去<b-link class="highlight" to="/"> 推荐 </b-link>看看
          </span>
        </div>
      </b-row>
    </div>
    <div v-else>
      <div class="unlogin un-select">
        <div class="unlogin_img">
          <img src="https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/unlogin.png" alt="">
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
  import AuthModal from "@/components/common/AuthModal.vue";
  import {needFormatDate} from '@/utils';
  import Pswp from "@/components/common/imagepreview/index"

  export default {
    name: 'Follow',
    data() {
      return {
        popoverContainer: null,
        // 图片预览
        pswp: null,
        creatorTrend: [
          {
            id: '001',
            // 动态类型 1文章 2随笔 3专栏
            pubType: 1,
            PublicTitle: '运算符🔣Family',
            PublicContent: 'MySQL索引初见闻MySQL索引初见闻MySQL索得懂，我这句话主要说了什么？你要不尝试说一下引初见闻MySQL索引初见闻',
            picList: [
              // require('@/assets/img/6.jpg')
            ],
            pubTime: 1715609438640,
            comments: 10,
            likes: 20,
            ilike: false,
            columnId: '1231231df',
            articleId: 'ssasdas',
            ramblyId: 'asd32442sdf',
            userInfo: {
              userId: 1,
              username: '闪魔亮晶晶'
              // avatar: require('@/assets/avatar/16.jpg')
            }
          },
          {
            id: '002',
            pubType: 2,
            PublicTitle: null,
            PublicContent: '我就随便发表一句话，就看你能不能看得懂，我这句话主要说了什么？你要不尝试说一下，我们也好互相了解我就随便发表一句话，就看你能不能看得懂，我这句话主要说了什么？你要不尝试说一下，我们也好互相了解我就随便发表一句话，就看你能不能看得懂，我这句话主要说了什么？你要不尝试说一下，我们也好互相了解我就随便发表一句话，就看你能不能看得懂，我这句话主要说了什么？你要不尝试说一下，我们也好互相了解',
            comments: 15,
            likes: 202,
            ilike: true,
            columnId: '1231231df',
            articleId: 'ssasdas',
            ramblyId: 'asd32442sdf',
            picList: [
              // require('@/assets/img/05.jpg'),
              'https://pic.netbian.com/uploads/allimg/240715/001632-1720973792179d.jpg'
              // require('@/assets/img/19.jpg')
            ],
            pubTime: 1707833424000,
            userInfo: {
              userId: 1,
              username: '晶莹剔透的Q宝'
              // avatar: require('@/assets/avatar/03.jpg')
            }
          },
          {
            id: '003',
            pubType: 3,
            PublicTitle: 'MySQL索引初见闻',
            PublicContent: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
            picList: [
              // require('@/assets/img/05.jpg')
            ],
            pubTime: 1715602224000,
            comments: 10,
            likes: 20,
            ilike: false,
            columnId: '1231231df',
            articleId: 'ssasdas',
            ramblyId: 'asd32442sdf',
            userInfo: {
              userId: 1,
              username: '无懈可击'
              // avatar: require('@/assets/avatar/01.jpg')
            }
          },
          {
            id: '004',
            pubType: 1,
            PublicTitle: 'MySQL索引初见闻',
            PublicContent: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
            picList: [
              // require('@/assets/img/3.jpg')
            ],
            pubTime: 1715584224000,
            comments: 10,
            likes: 20,
            ilike: true,
            columnId: '',
            articleId: 'ssasdas',
            ramblyId: 'asd32442sdf',
            userInfo: {
              userId: 1,
              username: '这是啥撒啊阿萨 '
              // avatar: require('@/assets/avatar/01.jpg')
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
      UserCard,
      AuthModal
    },
    methods: {
      previewImage(trendItem, currentIndex) {
        if (this.pswp === null) {
          this.pswp = new Pswp(null);
        }
        let imgWrapp = document.getElementById(trendItem.id);
        let imgBoxList = imgWrapp?.children;
        if (imgBoxList) {
          let imgItems = [];
          for (let imgBox of imgBoxList) {
            let img = imgBox.firstChild;
            imgItems.push({
              src: img.src,
              msrc: img.src,
              w: img.naturalWidth,
              h: img.naturalHeight
            })
          }
          this.pswp.open(imgItems, currentIndex)
        }
      },
      needFormatDate,
      getRouterPath(trendItem) {
        let routerPath = "/";
        switch (trendItem.pubType) {
          case 1:
            if (trendItem.columnId) {
              routerPath += ("column/" + trendItem.columnId + "/" + trendItem.articleId);
            } else {
              routerPath += ("article/" + trendItem.articleId);
            }
            break;
          case 2:
            routerPath += ("ramblyJot/" + trendItem.ramblyId);
            break;
          case 3:
            routerPath += ("column/" + trendItem.columnId)
            break
        }
        return routerPath;
      }
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
    }
  }
</script>

<style scoped lang="less">
  @import "../css/home/follow.less";
  @import "../css/common-var";
</style>
