<template>
  <b-container>
    <b-row>
      <b-col :cols="adaptiveCols" class="top-show">
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
      <b-col v-if="!this.$store.state.isPhone" cols="4" class="hosted">
        <!--        <Swiper v-if="list.length > 0">-->
        <!--          <Slide v-for="(item,index) in list" :key="index">-->
        <!--          </Slide>-->
        <!--        </Swiper>-->
        <div class="text">
          精选
          <hr>
        </div>
        <Swiper interval="5000" class="item">
          <Slide v-for="item in imgList" :key="item.id">
            <img :src="item.url" :alt="item.title" />
          </Slide>
        </Swiper>
      </b-col>
    </b-row>
  </b-container>


  <!-- 推荐和个人收藏 -->


</template>

<script>
  import { Swiper, Slide } from 'vue-swiper-component'

  export default {
    name: 'Body',
    data () {
      return {
        imgList: [
          {
            url: require('@/assets/img/1.jpg'),
            title: 'img1',
            id: '001'
          },
          {
            url: require('@/assets/img/2.jpg'),
            title: 'img2',
            id: '002'
          },
          {
            url: require('@/assets/img/3.jpg'),
            title: 'img3',
            id: '003'
          },
          {
            url: require('@/assets/img/4.jpg'),
            title: 'img4',
            id: '004'
          },
          {
            url: require('@/assets/img/5.jpg'),
            title: 'img5',
            id: '005'
          },
          {
            url: require('@/assets/img/6.jpg'),
            title: 'img6',
            id: '006'
          },
          {
            url: require('@/assets/img/7.jpg'),
            title: 'img7',
            id: '007'
          },
          {
            url: require('@/assets/img/8.jpg'),
            title: 'img8',
            id: '008'
          },
          {
            url: require('@/assets/img/9.jpg'),
            title: 'img9',
            id: '009'
          },
          {
            url: require('@/assets/img/10.jpg'),
            title: 'img10',
            id: '010'
          },
          {
            url: require('@/assets/img/11.gif'),
            title: 'img11',
            id: '011'
          },
          {
            url: require('@/assets/img/12.jpg'),
            title: 'img12',
            id: '012'
          },
          {
            url: require('@/assets/img/13.jpg'),
            title: 'img13',
            id: '013'
          },
          {
            url: require('@/assets/img/14.gif'),
            title: 'img14',
            id: '014'
          },
          {
            url: require('@/assets/img/15.jpg'),
            title: 'img15',
            id: '015'
          },
          {
            url: require('@/assets/img/16.jpg'),
            title: 'img16',
            id: '016'
          },
          {
            url: require('@/assets/img/17.jpg'),
            title: 'img17',
            id: '017'
          },
          {
            url: require('@/assets/img/18.jpg'),
            title: 'img18',
            id: '018'
          },
          {
            url: require('@/assets/img/19.jpg'),
            title: 'img19',
            id: '019'
          },
          {
            url: require('@/assets/img/20.jpg'),
            title: 'img20',
            id: '020'
          },
          {
            url: require('@/assets/img/21.jpg'),
            title: 'img21',
            id: '021'
          },
          {
            url: require('@/assets/img/22.jpg'),
            title: 'img22',
            id: '022'
          },
          {
            url: require('@/assets/img/23.jpg'),
            title: 'img23',
            id: '023'
          },
          {
            url: require('@/assets/img/24.jpg'),
            title: 'img24',
            id: '024'
          },
          {
            url: require('@/assets/img/25.jpg'),
            title: 'img25',
            id: '025'
          },
          {
            url: require('@/assets/img/26.jpg'),
            title: 'img26',
            id: '026'
          },
          {
            url: require('@/assets/img/27.jpg'),
            title: 'img27',
            id: '027'
          },
          {
            url: require('@/assets/img/28.jpg'),
            title: 'img28',
            id: '028'
          },
          {
            url: require('@/assets/img/29.jpg'),
            title: 'img29',
            id: '029'
          },
          {
            url: require('@/assets/img/30.jpg'),
            title: 'img30',
            id: '030'
          },
          {
            url: require('@/assets/img/31.jpg'),
            title: 'img31',
            id: '031'
          }
        ]
      }
    },
    components: {
      Swiper,
      Slide
    },
    computed: {
      // 从vuex中获取上一次的选中菜单项
      activeName () {
        return this.$store.state.activeName
      },
      // 判断页面是手机页面还是pc页面，如果是手机页面则进行全屏显示
      adaptiveCols () {
        return this.$store.state.isPhone ? 12 : 8
      }
    },
    methods: {
      /**
       * 当前选择的显示项
       * @param activeName
       */
      onSelect (activeName) {
        this.$store.commit('changeActiveRoute', activeName)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./css/body.less";
</style>
