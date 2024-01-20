<template>
  <b-row class="body-row">
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
            精选笔记
            <b-link class="more" to="/hot/articles">
              <span class="content">更多</span>
              <span class="iconfont icon-more"></span>
            </b-link>
            <hr>
          </div>
          <div class="swipe">
            <carousel-swipe :interval="5000" :images="images"></carousel-swipe>
          </div>
        </div>
        <div class="recommend-topics">
          <div class="text">
            推荐专栏
            <b-link class="more" to="/hot/column">
              更多<span class="iconfont icon-more"></span>
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
                <b-row class="icon">
                  <div>
                    <span class="iconfont icon-article"></span> 2233
                  </div>
                  <div>
                    <span class="iconfont icon-collected"></span> 11223
                  </div>
                  <div>
                    <span class="iconfont icon-like1"></span> 11223
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
              完整榜单<span class="iconfont icon-more"></span>
            </b-link>
            <hr>
          </div>
          <b-list-group class="rank">
            <b-list-group-item to="some-link" v-for="item in creators" :key="item.id">
              <b-avatar variant="info" :src="item.avatar" to="/lovbe0210"/>
              <div class="info">
                <b-row>
                    <span class="nick-name">
                      {{item.nickName}}
                    </span>
                  <span :class="'iconfont icon-level' + item.level"/>
                </b-row>
                <span class="tag">
                    {{item.tag.toString().replace(/,/g,' @ ')}}
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
            <div class="textarea-wrapper"
                 @mouseenter="isHover(true)"
                 @mouseleave="isHover(false)">
                <textarea rows="4" type="textarea" placeholder="立个flag？来吧"
                          :class="{'hover-border':changeBorder,'primeval-border':!changeBorder}"
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
            <span class="first"><a href="">关于本站</a></span>
            <span><a href="">BUG反馈</a></span>
          </div>
          <div class="contact">
            <span class="iconfont icon-github"/>
            <span class="iconfont icon-gitee"/>
            <span class="iconfont icon-qqqun"/>
          </div>
        </div>
      </div>
    </b-col>

<!--    <back-top></back-top>-->
  </b-row>
</template>

<script>
  import CarouselSwipe from '@/components/common/CarouselSwipe';
  // import BackTop from '@/components/common/BackTop';
  import {MESSAGE_TYPE} from 'vue-baberrage'

  export default {
    name: 'Body',
    data() {
      return {
        topics: [
          {
            id: '001',
            title: 'MySQL精讲30篇让你一次性学够还不够啊',
            description: '很多朋友会提出语的困惑'
          },
          {
            id: '002',
            title: 'Java后端随笔',
            description: '王有志，一个分享硬核Java技术的互金摸鱼侠 加入Java人的提桶跑路群：共同富裕的Java人 平时我在网上冲浪的时候，收集了不少八股文和面试文，内容虽然多，但质量上良莠不齐，主打一个不假思索的互相抄，使得很多错误内容一代代得“传承”了下来。所以，我对收集的内容做了归纳和整理，通过查阅资料重新做了解答，并给出了每道八股文评分'
          },
          {
            id: '003',
            title: 'Java 内存模型（JMM）',
            description: '内存模型定义了共享内存系统中多线程程序读写操作行为的规范，来屏蔽各种硬件和操作系统的内存访问差异，来实现 Java 程序在各个平台下都能达到一致的内存访问效果。'
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
            nickName: '昵称多的字数需要限制',
            tag: ['自我驱动', '坚持不懈', '目标大厂', '年薪百万']
          },
          {
            id: '002',
            avatar: 'https://tvax4.sinaimg.cn/large/718153f4gy1gxuwa18v4jj20m80rsqa3.jpg',
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
            avatar: 'https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/t01948ff2341a5d1ac3.jpg',
            level: '2',
            nickName: 'lovbe0210',
            tag: ['前段', '用心写文']
          }
        ],
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
        currentId: 0
      }
    },
    components: {
      CarouselSwipe
      // BackTop
      // CustomerSet,
      // MusicIndex
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
      changeBorder() {
        return this.focused ? true : this.hovered
      },
      chickenSoup() {
        let content = '每日一句心灵鸡汤'
        // 请求接口
        content = ''
        if (!true) {
          return content
        } else {
          return '每日一句心灵鸡汤'
        }
      }


    },
    methods: {
      isEditable(flag) {
        if (!flag) {
          // 失去焦点，更新内容
          this.$store.commit('editFlagContent', this.flagContent)
        }
        this.focused = flag
      },
      isHover(flag) {
        this.hovered = flag
      },
      // 滚动条滚动处理事件：
      handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // 视窗固定
        if (scrollTop > this.fixedHeight) {
          this.needFixed = true
        } else {
          this.needFixed = false
        }
      },
      /**
       * 弹幕添加方法
       */
      addToList() {
        let barrage = {
          id: ++this.currentId,
          avatar: require('@/assets/music_bacc.jpg'),
          msg: '这是一条弹幕',
          time: 5,
          type: MESSAGE_TYPE.NORMAL
        };
        // debugger
        this.barrageList.push(barrage);
      }
    },
    mounted() {
      this.needFixed = false;
      if (!this.$store.state.isPhone) {
        // 给window添加一个滚动监听事件
        window.addEventListener('scroll', this.handleScroll)
        // 从store中获取今日flag并赋值给flagContent
        this.flagContent = this.$store.state.flagContent.content
        // 获取元素高度
        this.$nextTick(() => {
          if (this.fixedHeight !== null) {
            return;
          }
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
    destroyed() {
      // 释放监听
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped lang="less">
  @import "./css/body.less";
</style>
