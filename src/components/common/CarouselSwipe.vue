<template>
  <b-container class="carousel_swipe" v-bind:id="'carousel_swipe'+id" :style="swipeStyle" @mouseenter.stop="handleStop"
               @mouseleave.stop="handleGo">
    <!--图片轮播区域-->
    <transition-group :name="'list-'+ (direction === 'forward' ? 'in' : 'out')" tag="ul" class="swipe_list">
      <!--      <li style="color:green">-->
      <!--        hah-->
      <!--      </li>-->
      <li v-for="(item,index) in images" :key="index+1" class="list-item" v-show="index===currentIndex">
        <a :href="item.url" target="_blank">
          <img alt="" :src="item.src">
        </a>
        {{item.title}}
      </li>
    </transition-group>
    <!--控制点-->
    <div class="swipe_dian">
        <span v-for="(item,index) in images" :class="{'active':index===currentIndex}"
              :key="index" @mouseover="handleChange(index)"></span>
    </div>
    <!--        &lt;!&ndash;左右控制，使用elementUI 的图标&ndash;&gt;-->
    <!--        <div class="swipe_control" v-bind:id="'swipe_control'+id" v-show="control">-->
    <!--          <i class="el-icon-arrow-left prev" v-on:click="handleChange(prevIndex)"></i>-->
    <!--          <i class="el-icon-arrow-right next" v-on:click="handleChange(nextIndex)"></i>-->
    <!--        </div>-->
    <!--底部标题-->
    <div class="swipe_title" v-for="(item,index) in images" v-show="index===currentIndex" :key="index">
      <div class="text">{{item.title}}</div>
    </div>
    <!--    <div class="swipe_bottom"></div>-->
  </b-container>
</template>

<script>
  export default {
    name: 'CarouselSwipe',
    data () {
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
        default: '80%'
      },
      swipeHeight: {
        type: String,
        default: '10rem'
      },
      images: {
        type: Array,
        default: function () {
          return [
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
          ]
        }
      }
    },

    mounted () {
      this.swipeStyle = {
        // width: this.imageWidth + 'rem',
        width: this.swipeWidth,
        height: this.swipeHeight
      }
      this.handleGo();
      // document.getElementById('carousel_swipe' + this.id).style.width =
      //   this.imageWidth + 'rem'
      // document.getElementById('carousel_swipe' + this.id).style.height =
      //   this.imageHeight + 'rem'
      // document.getElementById('swipe_control' + this.id).style.top =
      //   this.imageHeight / 2 - 1 + 'rem'
    },
    // 为了能在同一页面内多次使用轮播组件，每个组件的id都不一样，因此在组件创建的时候生成随机数作为id的一部分
    created () {
      this.id = Math.random()
    },
    methods: {
      /**
       * 开始轮播
       */
      handleGo () {
        this.control = false
        this.timer = setInterval(() => {
          this.currentIndex++
          if (this.currentIndex > this.images.length - 1) {
            this.currentIndex = 0
          }
        }, this.interval)
      },
      /**
       * 停止轮播
       */
      handleStop () {
        this.control = true
        clearInterval(this.timer)
        this.timer = null
      },
      /**
       * 控制左右切换
       * @param index
       */
      handleChange (index) {
        if (index > this.currentIndex) {
          this.direction = 'forward'
        } else {
          this.direction = ''
        }
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped lang="less">
  .carousel_swipe {
    text-align: center;
    margin-left: 15px;
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
