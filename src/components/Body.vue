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
        <MenuItem name="hot" to="/topic" :on-select="onSelect">
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
              更多<span class="iconfont icon-more"></span>
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
            <b-link class="more">
              完整榜单<span class="iconfont icon-more"></span>
            </b-link>
            <hr>
          </div>
          <b-list-group class="rank">
            <b-list-group-item to="some-link" v-for="item in creators" :key="item.id">
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

        <!-- 返回顶部 -->
        <back-top></back-top>
        <!-- 自定义主题 -->
        <Drawer placement="right" v-model="showCustomer" :closable="false"
                width="18" :lock-scroll="false" class-name="customer">
          <div class="them">
            <div class="title">
<!--              <span class="iconfont icon-theme"/>-->
              🎨 个人偏好
            </div>
            <div class="theme-color setting">
              主题设置
              <ColorPicker v-model="customerSet.themeColor" alpha size="small"/>
            </div>
            <div class="bacc-color setting">
              背景设置
              <Upload
                action="//jsonplaceholder.typicode.com/posts/" :show-upload-list="false"
                :format="['jpg','jpeg','png']" :max-size="10240" :on-progress="uploading"
                accept="image/png, image/jpeg" :disabled="uploadStatus === 1"
                :on-exceeded-size="handleMaxSize" :on-format-error="handleFormatError"
                :on-success="handleServerSuccess" :on-error="handleServerError"
              >
                <div class="upload-icon align-items-center">
                  <Icon :type="uploadIcon" size="24" :color="uploadStatus===3?'#00AE9D':uploadStatus===2?'red': ''"
                        v-show="uploadStatus !== 1"/>
                  <b-spinner style="width: 1.1rem; height: 1.1rem;color: #00AE9D;" v-show="uploadStatus === 1"/>
                </div>
              </Upload>
            </div>
            <div class="setting">
              <Button @click="changeThem(0)" size="small">恢复默认</Button>
              <Button @click="changeThem(1)" size="small">预设一</Button>
              <Button @click="changeThem(2)" size="small">预设二</Button>
              <Button @click="changeThem(3)" size="small">预设三</Button>
            </div>
          </div>
          <div class="music">
          </div>
          <div class="other">
            <Button class="title" @click="addToList">回声洞</Button>
            <vue-baberrage :isShow="true" :barrageList="barrageList" :loop="false">

            </vue-baberrage>
          </div>
        </Drawer>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import CarouselSwipe from '@/components/common/CarouselSwipe'
  import BackTop from '@/components/common/BackTop'
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
            avatar: require('@/assets/avatar/02.jpg'),
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
        fixedHeight: '99999px',
        currentId: 0,
        barrageList: [],
        uploadIcon: 'md-cloud-upload',
        // 0 未上传 1上传中 2上传错误 3上传成功
        uploadStatus: 0
      }
    },
    components: {
      CarouselSwipe,
      BackTop
    },
    computed: {
      // 从vuex中获取上一次的选中菜单项
      activeName() {
        return this.$store.state.activeName
      },
      // 判断页面是手机页面还是pc页面，如果是手机页面则进行全屏显示
      adaptiveCols() {
        return this.$store.state.isPhone ? 12 : 8
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
      },
      showCustomer: {
        get() {
          return this.$store.state.showCustomer;
        },
        set(value) {
          this.$store.commit('showCustomer', value);
          if (!value) {
            // 自定义主题关闭时恢复一些状态设置
            this.uploadStatus = 0;
            this.uploadIcon = 'md-cloud-upload';
          }
        }
      },
      // 通过计算属性获取用户自定义设置主题
      customerSet: {
        get() {
          return this.$store.state.customerSet
        },
        set(value) {
          this.$store.commit('customerSet', value);
        }
      }
    },
    watch: {
      showCustomer() {
        if (this.showCustomer) {
          // 禁止滚轮滚动
          document.body.addEventListener('wheel', this.tempFunction, {passive: false});
        } else {
          // 解除阻止
          document.body.removeEventListener('wheel', this.tempFunction)
        }
      }
    },
    methods: {
      /**
       * 当前选择的显示项
       * @param activeName
       */
      onSelect(activeName) {
        this.$store.commit('changeActiveRoute', activeName)
      },
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
      tempFunction(e) {
        e.preventDefault()
      },
      changeThem(value) {
        let customerSet = {};
        switch (value) {
          case 0:
            customerSet = {
              themeColor: 'rgba(255,255,255,1)',
              fontColor: '#404040',
              titleColor: '#0a0a0a',
              backgroundImg: 'linear-gradient(45deg, #F4F5F7 0%, #F4F5F7 100%)'
            }
            break;
          case 1:
            customerSet = {
              themeColor: 'rgba(18,18,18,1)',
              fontColor: '#404040',
              titleColor: '#0a0a0a',
              backgroundImg: 'linear-gradient(45deg, #0D0D0D 0%, #0D0D0D 100%)'
            }
            break;
          case 2:
            customerSet = {
              themeColor: 'rgba(255,255,255,0.90)',
              fontColor: '#404040',
              titleColor: '#0a0a0a',
              backgroundImg: 'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)'
            }
            break;
          case 3:
            customerSet = {
              themeColor: 'rgba(255,255,255,0.89)',
              fontColor: '#404040',
              titleColor: '#0a0a0a',
              backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/9b60dd9ddaf3c7f84e4414f0cef8b151.jpg)'
            }
            break;
        }
        this.$store.commit('customerSet', customerSet)
      },
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
      },
      /**
       * 文件上传相关方法
       */
      uploading() {
        this.uploadStatus = 1;
        console.log('uploading...')
      },
      handleMaxSize() {
        this.uploadIcon = 'md-close-circle';
        this.uploadStatus = 2;
        this.$Notice.warning({
          title: '文件大小不得超过10MB！'
        });
      },
      handleFormatError() {
        this.uploadIcon = 'md-close-circle';
        this.uploadStatus = 2;
        this.$Notice.warning({
          title: '文件格式错误，请上传正确的图片'
        });
      },
      handleServerSuccess() {
        this.uploadIcon = 'md-cloud-done';
        this.uploadStatus = 3;
        let tmp = Math.ceil(Math.random() * 10);
        console.log(tmp)
        let baccObj;
        switch (tmp) {
          case 1:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/23451916UME.jpg)'}
            break;
          case 2:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/9b60dd9ddaf3c7f84e4414f0cef8b151.jpg)'}
            break;
          case 3:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/%E6%97%A0%E6%A0%87%E9%A2%98.png)'}
            break;
          case 4:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/b9eb713f63.jpg)'}
            break;
          case 5:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/23451916UME.jpg)'}
            break;
          case 6:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/9b60dd9ddaf3c7f84e4414f0cef8b151.jpg)'}
            break;
          case 7:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/%E6%97%A0%E6%A0%87%E9%A2%98.png)'}
            break;
          case 8:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/b9eb713f63.jpg)'}
            break;
          case 9:
            baccObj = {backgroundImg: 'url(https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/t01948ff2341a5d1ac3.jpg)'}
            break;
        }

        this.$store.commit('customerSet', baccObj)
      },
      handleServerError() {
        this.uploadIcon = 'md-close-circle';
        this.uploadStatus = 2;
        this.$Notice.warning({
          title: '网络错误，请稍后重试！'
        });
      }
    },
    mounted() {
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
    destroyed() {
      // 释放监听
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped lang="less">
  @import './css/common-var.less';
  @import "./css/body.less";
</style>
