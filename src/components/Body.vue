<template>
  <b-row class="body-row">
    <b-col :cols="adaptiveCols" class="enable-background top-show">
      <!--主体页面选择-->
      <Menu mode="horizontal" :active-name="activeName" @on-select="onSelect" class="top">
        <MenuItem name="follow" to="/follow" :on-select="onSelect">
          关注
        </MenuItem>
        <MenuItem name="recommend" to="/recommend" :on-select="onSelect">
          推荐
        </MenuItem>
        <MenuItem name="hot" to="/hot" :on-select="onSelect">
          专题
        </MenuItem>
      </Menu>
      <router-view class="show"></router-view>
    </b-col>

    <b-col class="only-style" style="width: 13px" md="auto">
    </b-col>

    <!-- 右侧页面 -->
    <b-col v-if="!this.$store.state.isPhone" lg="3" md="auto" class="hosted">
      <div class="enable-background">
        <div class="featured-notes">
          <div class="text">
            精选笔记
            <b-link class="more">
              更多
              <b-icon icon="chevron-right"></b-icon>
            </b-link>
            <hr>
          </div>
          <div class="swipe">
            <carousel-swipe :interval="5000" :images="images"></carousel-swipe>
          </div>
        </div>
        <div class="recommend-topics">
          <div class="text">
            推荐专题
            <b-link class="more">
              更多
              <b-icon icon="chevron-right"></b-icon>
            </b-link>
            <hr>
          </div>
          <div class="topic">
            <b-list-group flush>
              <b-list-group-item class="flex-column align-items-start" v-for="item in topics" :key="item.id">
                <div class="title">
                  <b-link to="/login">
                    <span class="title">{{item.title}}</span>
                  </b-link>
                </div>
                <span class="desc">
                  {{item.description}}
                </span>
                <small class="icon">
                  <b-icon icon="journal-text" style="margin-right: 6px"/>
                  2233
                  <b-icon icon="book-half" style="margin-left: 10px;margin-right: 6px;"/>
                  11223
                  <b-icon icon="star-fill" style="margin-left: 10px;margin-right: 6px;"/>
                  11223
                </small>
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>
        <div class="creator-ranking">
          <div class="text">
            创作者排行榜
            <b-link class="more">
              完整榜单
              <b-icon icon="chevron-right"></b-icon>
            </b-link>
            <hr>
          </div>
          <b-list-group class="rank">
            <b-list-group-item href="#some-link" v-for="item in creators" :key="item.id">
              <b-avatar variant="info" :src="item.avatar"/>
              <div class="info">
                <b-row>
                    <span class="nick-name">
                      {{item.nickName}}
                    </span>
                  <span :class="`iconfont icon-level`+item.level"/>
                </b-row>
                <span class="tag">
                    {{item.tag.toString().replace(/,/g,' @ ')}}
                </span>
              </div>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>

      <div class="only-style" style="height: 13px"></div>

      <div :class="{'hasFixed': needFixed == true}" class="enable-background">
        <div class="persona-lization" ref="fixedElement">
          <div class="site-content">
            <span>
              我的Flag
            </span>
            <hr :class="{'primeval-border':changeBorder}">
            <div class="textarea-wrapper"
                 @mouseenter="isHover(true)"
                 @mouseleave="isHover(false)">
                <textarea rows="4" type="textarea" placeholder="编辑我的空间公告" :class="{'hover-border':changeBorder,'primeval-border':!changeBorder}"
                          maxlength="150" v-model="flagContent"
                          class="be-textarea_inner"
                          @blur="isEditable(false)"
                          @focus="isEditable(true)">
                </textarea>
              <div class="be-input-word-counter" v-show="focused">{{contentLength}}/150</div>
            </div>

          </div>
        </div>
        <div class="about">
          guanyu

        </div>
        <!-- 返回顶部 -->
        <BackTop :height="800" :bottom="150" :right="338">
          <div class="to-top">
            <b-icon icon="chevron-bar-up" v-b-tooltip.hover.left.v-secondary="'返回顶部'"/>
            <br>
          </div>
        </BackTop>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import CarouselSwipe from '@/components/common/CarouselSwipe'

  export default {
    name: 'Body',
    data () {
      return {
        topics: [
          {
            id: '001',
            title: 'MySQL精讲30篇让你一次性学够还不够啊',
            description: '很多朋友会提出语的困惑'
          },
          {
            id: '002',
            title: 'This is title 2',
            description: 'This is description, this is description, this is description.this is description.this is description.this is description.'
          },
          {
            id: '003',
            title: 'This is title 3',
            description: 'This is description, this is description, this is description.'
          }
        ],
        images: [
          {
            url: '/',
            src: require('@/assets/img/2.jpg'),
            title: 'title1title1title1title1title1title1tititle1title1title1title1title1title1tle1title1title1title1'
          },
          {
            url: '/',
            src: require('@/assets/img/4.jpg'),
            title: 'title2'
          },
          {
            url: '/',
            src: require('@/assets/img/6.jpg'),
            title: 'title3'
          }
        ],
        creators: [
          {
            id: '001',
            avatar: require('@/assets/avatar/01.jpg'),
            level: '6',
            nickName: '昵称多的字数需要限',
            tag: ['自我驱动', '坚持不懈', '目标大厂', '年薪百万']
          },
          {
            id: '002',
            avatar: require('@/assets/avatar/02.jpg'),
            level: '0',
            nickName: 'lovbe0210',
            tag: ['创新', '原创']
          },
          {
            id: '003',
            avatar: require('@/assets/avatar/03.jpg'),
            level: '5',
            nickName: 'lovbe0210',
            tag: ['全栈', '用心写文']
          },
          {
            id: '004',
            avatar: require('@/assets/avatar/02.jpg'),
            level: '2',
            nickName: 'lovbe0210',
            tag: ['前段', '用心写文']
          }
        ],
        flagContent: '',
        focused: false,
        hovered: false,
        needFixed: false,
        fixedHeight: '99999px'
      }
    },
    components: {
      CarouselSwipe
    },
    computed: {
      // 从vuex中获取上一次的选中菜单项
      activeName () {
        return this.$store.state.activeName
      },
      // 判断页面是手机页面还是pc页面，如果是手机页面则进行全屏显示
      adaptiveCols () {
        return this.$store.state.isPhone ? 12 : 8
      },
      contentLength () {
        return this.flagContent == null ? 0 : this.flagContent.length
      },
      changeBorder () {
        return this.focused ? true : this.hovered
      }
    },
    methods: {
      /**
       * 当前选择的显示项
       * @param activeName
       */
      onSelect (activeName) {
        this.$store.commit('changeActiveRoute', activeName)
      },
      isEditable (flag) {
        if (!flag) {
          // 失去焦点，更新内容
          this.$store.commit('editFlagContent', this.flagContent)
        }
        this.focused = flag
      },
      isHover (flag) {
        this.hovered = flag
      },
      handleScroll () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // if (scrollTop > 1140) {
        if (scrollTop > this.fixedHeight) {
          this.needFixed = true
        } else {
          this.needFixed = false
        }
      }
    },
    mounted () {
      if (!this.$store.state.isPhone) {
        // 给window添加一个滚动监听事件
        window.addEventListener('scroll', this.handleScroll)
        // 从store中获取今日flag并赋值给flagContent
        this.flagContent = this.$store.state.flagContent.content
        // 获取元素高度
        this.$nextTick(() => {
          this.fixedHeight = this.$refs.fixedElement.getBoundingClientRect().top
        })
      }
      setInterval(() => {
        for (let i = 0; i < this.images.length; i++) {
          this.$set(this.images, i, {
            url: '/',
            src: require('@/assets/img/' + Math.ceil(Math.random() * 31) + '.jpg'),
            title: 'title' + i
          })
        }
      }, 13000)
    },
    destroyed () {
      // 释放监听
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped lang="less">
  @import './css/common-var.less';
  @import "./css/body.less";
  @import "../assets/font_class/iconfont.css";
</style>
