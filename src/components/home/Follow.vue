<template>
  <b-container fluid ref="popoverContainer">
    <div v-if="userInfo?.uid"
         class="un-select"
         v-infinite-scroll="loadMore"
         :infinite-scroll-disabled="!hasMore"
         :infinite-scroll-distance="500">
      <div v-if="creatorTrend" class="creator-trend">
        <div class="trend-item" v-for="item in creatorTrend" :key="item.targetId">
          <b-avatar :src="fileUrl(item.userInfo?.avatarUrl)"
                    class="avatar"
                    href="javascript:void(0)">
            <span v-if="!item.userInfo?.avatarUrl">{{ item.userInfo?.username }}</span>
          </b-avatar>
          <div class="trend-info">
            <div class="post-info">
              <user-card :userInfo="item.userInfo" :popoverContainer="popoverContainer">
                <slot>
                  <span class="post-user">{{ item.userInfo?.username }}</span>
                </slot>
              </user-card>
              <span class="post-time">
                <Time class="time" :time="item.createTime" v-if="needFormatDate(item.createTime)"/>
                <Time class="time" :time="item.createTime" v-else type="datetime"/>
              </span>
              <span class="post-type">
                <span v-if="item.targetType === 1 ||  item.targetType === 3">发布了</span>
                <span v-else>创建了</span>
                <span :class="['item-type', item.targetType == 1 ? 'doc' : item.targetType == 2 ? 'colum' : 'rambly-jot']">
                  {{ item.targetType === 1 ? '文章' : item.targetType === 2 ? '专栏' : '随笔' }}
                </span>
              </span>
            </div>
            <div :class="['trend-content', item.targetType === 3 ? 'rambly' : '']">
              <div class="post-desc">
                <b-link :href="getRouterPath(item)" :target="item.targetType === 1 || item.targetType === 2 ? 'black' : ''">
                  <p class="post-title" v-if="item.targetType === 1">{{ item.articleInfo?.title }}</p>
                  <p class="post-title" v-if="item.targetType === 2">{{ item.columnInfo?.title }}</p>
                  <p class="post-title" v-if="item.targetType === 3">{{ item.ramblyJotDo?.title }}</p>
                </b-link>
                <div>
                  <p class="post-content" v-if="item.targetType === 1">{{ item.articleInfo?.summary }}</p>
                  <p class="post-content" v-if="item.targetType === 2">{{ item.columnInfo?.synopsis }}</p>
                  <p class="post-content" v-if="item.targetType === 3">{{ item.ramblyJotDo?.previewContent }}</p>
                </div>
                <div class="post-image" v-if="item.targetType === 3 && item.ramblyJotDo?.previewImg.length > 0">
                  <div :id="item.targetId" class="rambly-img-box">
                    <div v-for="(pic, index) in item.ramblyJotDo.previewImg"
                         :key="index"
                         class="rambly-img"
                         @click="previewImage(item, index)">
                      <b-img-lazy height="100%"
                                  rounded
                                  :src="fileUrl(pic)">
                      </b-img-lazy>
                    </div>
                  </div>
                </div>
                <div class="action">
                <span class="reply-btn">
                  <span :class="['iconfont', item.targetType === 1 || item.targetType === 2 ? 'viewed' : 'reply']"/>
                  {{ item.targetType === 1 ? item.articleInfo?.viewCount :
                     item.targetType === 2 ? item.columnInfo?.viewCount : item.ramblyJotDo?.commentCount }}
                </span>
                <span class="like-btn">
                  <span :class="['iconfont', 'like', item.ifLike ? 'ilike' : '']"></span>
                  {{ item.targetType === 1 ? item.articleInfo?.likeCount :
                  item.targetType === 2 ? item.columnInfo?.likeCount : item.ramblyJotDo?.likeCount }}
                </span>
                </div>
              </div>
              <div class="post-image" v-if="item.targetType === 1 && item.articleInfo?.coverUrl">
                <b-link :to="getRouterPath(item)" target="_blank">
                  <b-img-lazy height="100%" rounded
                              class="as-img"
                              :src="fileUrl(item.articleInfo?.coverUrl)">
                  </b-img-lazy>
                </b-link>
              </div>
              <div class="post-image" v-if="item.targetType === 2 && item.columnInfo?.coverUrl">
                <b-link :to="getRouterPath(item)" target="_blank">
                  <b-img-lazy height="100%" rounded
                              class="as-img"
                              :src="fileUrl(item.columnInfo?.coverUrl)">
                  </b-img-lazy>
                </b-link>
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
  import contentPicksApi from "@/api/ContentPicksApi";

  export default {
    name: 'Follow',
    data() {
      return {
        popoverContainer: null,
        // 图片预览
        pswp: null,
        hasMore: true,
        offset: 0,
        creatorTrend: null
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
      fileUrl(path) {
        return this.fileService + path;
      },
      previewImage(trendItem, currentIndex) {
        if (this.pswp === null) {
          this.pswp = new Pswp(null);
        }
        let imgWrapp = document.getElementById(trendItem.targetId);
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
        switch (trendItem.targetType) {
          case 1:
            routerPath += trendItem.userInfo?.domain;
            if (trendItem.articleInfo?.columnUri) {
              routerPath += ("/" + trendItem.articleInfo?.columnUri + "/" + trendItem.articleInfo?.uri);
            } else {
              routerPath += ("/" + trendItem.articleInfo?.uri);
            }
            break;
          case 2:
            routerPath += trendItem.userInfo?.domain;
            routerPath += ("/" + trendItem.columnInfo?.uri);
            break;
          case 3:
            routerPath += ("ramblyJot/" + trendItem.ramblyJotDo?.uid)
            break
        }
        return routerPath;
      },
      loadMore() {
        contentPicksApi.getCreateRecords({offset: this.offset}).then(data => {
          if (data?.result) {
            this.creatorTrend.push(...data.data.list);
            this.hasMore = data.data.hasMore;
            if (this.offset === 0 && this.creatorTrend.length === 0) {
              this.creatorTrend = null;
            }
            this.offset += 20;
          }
        })
      }
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
    },
    created() {
      this.creatorTrend = [];
    }
  }
</script>

<style scoped lang="less">
  @import "../css/home/follow.less";
  @import "../css/common-var";
</style>
