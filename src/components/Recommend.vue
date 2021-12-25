<template>
  <b-container fluid>
    <b-list-group>
      <BackTop :height="10" :bottom="80" v-if="isPhone">
        <div class="to-top">
          <b-icon icon="arrow-bar-up"></b-icon>
        </div>
      </BackTop>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
        <b-row v-for="item in data" :key="item.id" fluid="true" class="item">
          <b-col :cols="isPhone || item.avatar == null ? 12 : 8" class="text">
            <b-link to="/login">
              <div class="title">
                <span>{{item.title}}</span>
              </div>
            </b-link>
            <div class="description">
              <span>
                {{item.description}}
              </span>
            </div>
            <div class="item-icons">
              <b-icon icon="hand-thumbs-up" style="margin-right: 10px"/>
              2233
              <b-icon icon="book-half" style="margin-left: 20px;margin-right: 10px;"/>
              11223
              <div>
                来自🕊<b-link to="/follow"><span>语雀精选</span></b-link>
              </div>
            </div>
          </b-col>
          <b-col v-if="!isPhone && item.avatar != null" cols="4" fluid class="image">
            <b-img right fluid rounded :src="item.avatar" alt="Image 1"/>
          </b-col>
        </b-row>
      </div>
      <div class="bottom" v-if="busy">
        我是有底线的，休息一会儿再来吧！
      </div>
    </b-list-group>
  </b-container>
</template>

<script>
  export default {
    name: 'Recommend',
    // 如果通过首页进来则一定显示推荐页面，否则显示用户自己上次选择的页面，这样如果用户不点击主页无论怎么刷新页面都将会显示上次浏览的页面
    beforeRouteEnter (from, to, next) {
      next(vc => {
        // 通过 `vc` 访问组件实例
        if (vc.$route.params.index) {
          vc.$store.commit('changeActiveRoute', 'recommend')
        }
        next()
      })
    },
    data () {
      return {
        loading: false,
        showImg: true,
        data: [
          {
            id: '001',
            title: '臻默：整理100+语雀小技巧之后，我们开始了知识管理的大航海大巷哈',
            description: '缘起：开始整理语雀小技巧的动机，是因为雀友群很多朋友会提出语雀日常使用的困惑：实际上，贴心的语雀官方已经提供了帮助手册和语雀小技巧卡片，不过卡片了缘起：开始整理语雀小技巧的动机，是因为雀友群很多朋友会提出语雀日常使用的困惑：实际上，贴心的语雀官方已经提供了帮助手册和语雀小技巧卡片，不过卡片了',
            // avatar: require('@/assets/img/1.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.'
          },
          {
            id: '002',
            title: 'This is title 2',
            description: 'This is description, this is description, this is description.',
            avatar: require('@/assets/img/2.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.'
          },
          {
            id: '003',
            title: 'This is title 3',
            description: 'This is description, this is description, this is description.',
            avatar: require('@/assets/img/3.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.'
          },
          {
            id: '004',
            title: '臻默：整理100+语雀小技巧之后，我们开始了知识管理的大航海',
            description: '缘起：开始整理语雀小技巧的动机，是因为雀友群很多朋友会提出语雀日常使用的困惑：实际上，贴心的语雀官方已经提供了帮助手册和语雀小技巧卡片，不过卡片了缘起：开始整理语雀小技巧的动机，是因为雀友群很多朋友会提出语雀日常使用的困惑：实际上，贴心的语雀官方已经提供了帮助手册和语雀小技巧卡片，不过卡片了',
            avatar: require('@/assets/img/4.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.'
          },
          {
            id: '005',
            title: 'This is title 5',
            description: 'This is description, this is description, this is description.',
            avatar: require('@/assets/img/5.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.'
          },
          {
            id: '006',
            title: 'This is title 6',
            description: 'This is description, this is description, this is description.',
            avatar: require('@/assets/img/6.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.'
          }
        ],
        count: 0
      }
    },
    computed: {
      /**
       * 判断页面是手机页面还是pc页面，如果是手机页面则进行全屏显示
       * @returns {boolean}
       */
      isPhone () {
        return this.$store.state.isPhone
      },
      busy () {
        return this.count > 100
      }
    },
    methods: {
      loadMore () {
        for (let i = 0, j = 10; i < j; i++) {
          this.data.push(
            {
              id: '00' + (this.data.length + 1),
              title: 'This is title ' + '00' + this.data.length,
              description: this.data.length % 2 === 0 ? '我是偶数title @~@' : '我是奇数title @…@',
              avatar: require('@/assets/img/' + Math.ceil(Math.random() * 31) + '.jpg'),
              content: this.data.length % 2 === 0 ? '我是偶数content @~@' : '我是偶数content @…@'
            }
          )
        }
        console.log(this.data)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./css/recommend.less";

  .t-scroll {
    position: relative;
    overflow: scroll;
  }

  .to-top {
    padding: 10px;
    color: #589D1D;
    text-align: center;
    /*margin-right: 10px;*/
    font-size: 30px;
  }
</style>
