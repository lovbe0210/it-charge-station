<template>
  <b-container class="carousel_swipe" v-bind:id="'carousel_swipe'+id" :style="swipeStyle" @mouseenter.stop="handleStop"
               @mouseleave.stop="handleGo">
    <!--图片轮播区域-->
    <transition-group :name="'list-'+ (direction === 'forward' ? 'in' : 'out')" tag="ul" class="swipe_list">
      <li v-for="(item,index) in featuredArticle" :key="item.uid" class="list-item" v-show="index===currentIndex">
        <a :href="articleUrl(item)" target="_blank">
          <img alt="" :src="fileUrl(item.coverUrl)">
        </a>
        {{ item.title }}
      </li>
    </transition-group>
    <!--控制点-->
    <div class="swipe_dian">
        <span v-for="(item,index) in featuredArticle" :class="{'active':index===currentIndex}"
              :key="index" @mouseover="handleChange(index)"></span>
    </div>
    <!--底部标题-->
    <div class="swipe_title">
      <div class="text">{{ featuredArticle[currentIndex]?.title }}</div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'CarouselSwipe',
  data() {
    return {
      id: 0,
      currentIndex: 0,
      timer: '',
      control: false,
      direction: 'forward',
      swipeStyle: {}
    }
  },
  props: {
    interval: {
      type: Number,
      default: 4000 //单位毫秒
    },
    swipeWidth: {
      type: String,
      default: '83%'
    },
    swipeHeight: {
      type: String,
      default: '10rem'
    },
    featuredArticle: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    fileUrl(path) {
      if (!path) {
        return 'https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/no-cover.png';
      }
      return this.fileService + path;
    },
    articleUrl(item) {
      let href = '/' + item?.userInfo?.domain + '/';
      return href + (item.columnUri ? (item.columnUri + '/') : '') + item.uri;
    },
    /**
     * 开始轮播
     */
    handleGo() {
      this.control = false
      this.timer = setInterval(() => {
        this.currentIndex++
        if (this.currentIndex > this.featuredArticle.length - 1) {
          this.currentIndex = 0
        }
      }, this.interval)
    },
    /**
     * 停止轮播
     */
    handleStop() {
      this.control = true
      clearInterval(this.timer)
      this.timer = null
    },
    /**
     * 控制左右切换
     * @param index
     */
    handleChange(index) {
      if (index > this.currentIndex) {
        this.direction = 'forward'
      } else {
        this.direction = ''
      }
      this.currentIndex = index
    }
  },
  mounted() {
    this.swipeStyle = {
      width: this.swipeWidth,
      height: this.swipeHeight
    }
    this.handleGo();
  },
  // 为了能在同一页面内多次使用轮播组件，每个组件的id都不一样，因此在组件创建的时候生成随机数作为id的一部分
  created() {
    this.id = Math.random()
  }
}
</script>

<style scoped lang="less">
@import "../css/common-var";

.carousel_swipe {
  text-align: center;
  margin-left: 15px;
  border-radius: 4px;
}

/*切换到下一张的变化*/
.list-in-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}

.list-in-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%);
}

.list-in-enter {
  transform: translateX(100%);
}

.list-in-leave {
  transform: translateX(0);
}

/*切换到上一张的变化*/
.list-out-leave {
  transform: translateX(0);
}

.list-out-leave-active {
  transition: all 1s ease;
  transform: translateX(100%);
}

.list-out-enter {
  transform: translateX(-100%);
}

.list-out-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}

.carousel_swipe {
  position: relative;
  width: 518px;
  height: 357px;
  overflow: hidden;
  background-color: #fff;
}

.swipe_list {
  width: 100%;
  height: 100%;
}

.swipe_list li {
  position: absolute;
  width: 100%;
  height: 100%;
  list-style-type: none;
}

.swipe_list li a {
  width: 100%;
  height: 100%;
}

.swipe_list li img {
  width: 100%;
  height: 100%;
}

.swipe_dian {
  position: absolute;
  z-index: 90;
  bottom: 0;
  height: 60px;
  text-align: right;
  font-size: 0;
  right: 10px;
}

.swipe_dian span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 26px 5px;
  background-color: #5f5853;
  cursor: pointer;
}

.swipe_dian .active {
  background-color: #ffffff;
}

.swipe_title {
  .text {
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  filter: alpha(Opacity=60);
  -moz-opacity: 0.5;
  opacity: 0.7;
  background-color: #595959;
  position: absolute;
  line-height: 30px;
  height: 30px;
  width: 100%;
  z-index: 20;
  text-align: left;
  color: white;
  font-size: 18px;
  bottom: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-position: center top;
  background-size: cover;
  overflow: hidden;

  ::after {
    background-position: center top;
    background-size: cover;
    background-attachment: fixed;
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -ms-filter: blur(20px);
    -o-filter: blur(20px);
    filter: blur(20px);
    margin: -30px;
  }
}

.swipe_bottom {
  position: absolute;
  width: 100%;
  height: 60px;
  bottom: 0;
  background-color: green;
  z-index: 10;
}
</style>
