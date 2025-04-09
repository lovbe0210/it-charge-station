<template>
  <b-row class="body-row" ref="popoverContainer">
    <b-col :cols="adaptiveCols" class="enable-background top-show">
      <!--主体页面选择-->
      <router-view></router-view>
    </b-col>

    <b-col class="only-style" style="width: 13px" md="auto">
    </b-col>

    <!-- 右侧页面 -->
    <b-col v-if="!this.$store.state.isPhone" lg="3" md="auto" class="hosted">
      <div class="enable-background">
        <div class="featured-notes">
          <div class="text">
            精选文章
            <b-link class="more" to="/hot/articles">
              <span class="content">更多</span>
              <span class="iconfont i-more"></span>
            </b-link>
            <hr>
          </div>
          <div class="swipe">
            <carousel-swipe :interval="5000" :featuredArticle="featuredArticle"></carousel-swipe>
          </div>
        </div>
        <div class="recommend-topics">
          <div class="text">
            推荐专栏
            <b-link class="more" to="/hot/column">
              更多<span class="iconfont i-more"></span>
            </b-link>
            <hr>
          </div>
          <div class="topic">
            <b-list-group flush>
              <b-list-group-item class="flex-column align-items-start" v-for="item in featuredColumn" :key="item.uid">
                <div class="title">
                  <b-link :to="'/' + item.userInfo?.domain + '/' + item.uri" target="_blank">
                    <span class="title">{{item.title}}</span>
                  </b-link>
                </div>
                <span class="desc">
                  {{item.synopsis}}
                </span>
                <b-row class="icon">
                  <div v-if="item.uid">
                    <span class="iconfont series-column"></span> {{ item.articleCount }}
                  </div>
                  <div v-if="item.uid">
                    <span class="iconfont like"></span> {{ item.viewCount }}
                  </div>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>
        <div class="creator-ranking">
          <div class="text">
            创作者排行榜
            <b-link class="more" to="/hot/authors">
              完整榜单<span class="iconfont i-more"></span>
            </b-link>
            <hr>
          </div>
          <b-list-group class="rank">
            <b-list-group-item :to="'/' + item.domain"
                               target="_blank"
                               v-for="item in authors"
                               :key="item.uid">
              <b-avatar variant="info"
                        v-if="item.avatarUrl"
                        :src="fileUrl(item.avatarUrl)"
                        :to="'/' + item.domain"
                        target="_blank"
                        class="creator-avatar"
                        size="40px"/>
              <b-avatar v-else
                        :to="'/' + item.domain"
                        class="creator-avatar"
                        size="40px">
                <span>
                  {{item.username}}
                </span>
              </b-avatar>
              <div class="info">
                <b-row>
                    <user-card :userInfo="item" :popoverContainer="popoverContainer">
                      <slot>
                        <span class="nick-name">
                          {{item.username}}
                          <span :class="'iconfont icon-level' + item.level"/>
                        </span>
                      </slot>
                    </user-card>

                </b-row>
                <span class="tag">
                    {{ authorShow(item) }}
                </span>
              </div>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>

      <div :class="{'hasFixed': needFixed}" ref="fixedElement">
        <div class="persona-lization enable-background">
          <div class="user-flag">
            <span>
              我的Flag
            </span>
            <div class="textarea-wrapper">
                <textarea rows="4" type="textarea" placeholder="立个flag？来吧"
                          maxlength="150" v-model="flagContent"
                          class="be-textarea_inner"
                          @blur="isEditable(false)"
                          @focus="isEditable(true)">
                </textarea>
              <div class="be-input-word-counter" v-show="focused">{{contentLength}}/150</div>
            </div>
          </div>
        </div>
        <div class="site-info enable-background">
          <div class="links">
            <span>
              常用链接:
            </span>
            <span v-for="(item,index) in links" :key="index">
              <a :href="item.url" target="_blank">{{item.title}}</a>
            </span>

            <div class="chicken-soup">{{chickenSoup}}</div>

          </div>
          <div class="about">
            <span class="first">
              <a href="/lovbe/_4Mv9P" target="_blank">关于本站</a>
            </span>
            <span>
              <a href="/lovbe/tngG-C" target="_blank">BUG反馈</a>
            </span>
          </div>
          <div class="contact">
            <b-link href="https://github.com/lovbe0210/it-charge-station" target="_blank">
              <span class="iconfont icon-github"/>
            </b-link>
            <b-link href="https://gitee.com/ichargehub/it-charge-station" target="_blank">
              <span class="iconfont icon-gitee"/>
            </b-link>
            <b-link href="https://qm.qq.com/q/hWb4PzdhxQ" target="_blank">
              <span class="iconfont icon-qqqun"/>
            </b-link>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import CarouselSwipe from '@/components/common/CarouselSwipe';
  import contentPicksApi from "@/api/ContentPicksApi";
  import preferenceApi from "@/api/PreferenceApi";
  import UserCard from "@/components/common/UserCard.vue";

  export default {
    name: 'Body',
    data() {
      return {
        featuredColumn: [],
        featuredArticle: [],
        authors: [],
        links: [
          {
            title: '编程自学之路',
            url: 'https://www.r2coding.com'
          },
          {
            title: '陌溪LearningNotes',
            url: 'https://gitee.com/moxi159753/LearningNotes'
          },
          {
            title: '千古前段笔记',
            url: 'https://web.qianguyihao.com/'
          }
        ],
        flagContent: '',
        focused: false,
        hovered: false,
        needFixed: false,
        currentId: 0,
        popoverContainer: null
      }
    },
    components: {
      CarouselSwipe,
      UserCard
    },
    computed: {
      // 判断页面是手机页面还是pc页面，如果是手机页面则进行全屏显示
      adaptiveCols() {
        return this.$store.state.isPhone ? 12 : 8
      },
      fixedHeight: {
        get() {
          return this.$store.state.fixedHeight;
        },
        set(fixedHeight) {
          this.$store.commit("computeFixHeight", fixedHeight);
        }
      },
      contentLength() {
        return this.flagContent == null ? 0 : this.flagContent.length
      },
      stateFlag() {
        return this.$store.state.flagContent;
      },
      chickenSoup() {
        let content = '每日一句心灵鸡汤'
        // 请求接口
        content = ''
        if (!true) {
          return content
        } else {
          return '每一步黑暗，都踩亮一颗星。'
        }
      },
      loginStatus() {
        let userInfo = this.$store.state.userInfo
        return userInfo !== null && userInfo.token?.length === 32
      }
    },
    methods: {
      isEditable(flag) {
        if (!flag) {
          // 失去焦点，判断内容是否有变化然后更新内容
          let content = this.stateFlag.content;
          if (content !== this.flagContent) {
            let flag = {
              content: this.flagContent,
              timestamp: this.flagContent && this.flagContent.trim().length > 0 ? new Date().getTime() : null
            }
            this.$store.commit('editFlag', flag);
            // 调用接口更新
            if (this.loginStatus) {
              preferenceApi.updatePreferenceSetting({flagContent: JSON.stringify(flag)});
            }
          }
        }
        this.focused = flag;
      },
      // 滚动条滚动处理事件：
      handleScroll() {
        let app = document.getElementById("app");
        const scrollTop = app.pageYOffset || app.scrollTop || app.scrollTop;
        // 视窗固定
        if (scrollTop > this.fixedHeight) {
          this.needFixed = true;
        } else {
          this.needFixed = false;
        }
      },
      fileUrl(path) {
        return this.fileService + path;
      },
      authorShow(user) {
        if (user.tags && user.tags.length > 0) {
          return user.tags.map(tag => tag.content).join(" @ ");
        }
        return user.introduction || user.industry || user.location || " ";
      }
    },
    created() {
      contentPicksApi.getFeaturedArticle().then(data => {
        if (data?.result) {
          this.featuredArticle = data.data;
        }
      })
      contentPicksApi.getFeaturedColumn().then(data => {
        if (data?.result) {
          this.featuredColumn = data.data;
          this.$nextTick(() => {
            this.fixedHeight = this.$refs.fixedElement.getBoundingClientRect().top;
          })
        }
      })
      contentPicksApi.getExcellentAuthor().then(data => {
        if (data?.result) {
          this.authors = data.data;
          this.$nextTick(() => {
            this.fixedHeight = this.$refs.fixedElement.getBoundingClientRect().top;
          })
        }
      })
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
      this.needFixed = false;
      // 从store中获取今日flag并赋值给flagContent
      this.flagContent = this.stateFlag.content;
      if (!this.$store.state.isPhone) {
        // 给window添加一个滚动监听事件
        let app = document.getElementById("app");
        app.addEventListener('scroll', this.handleScroll);
        // 获取元素高度
        this.$nextTick(() => {
          this.fixedHeight = this.$refs.fixedElement.getBoundingClientRect().top;
        })
      }
    },
    destroyed() {
      // 释放监听
      let app = document.getElementById("app");
      app.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>

<style scoped lang="less">
  @import "./css/body.less";
</style>
