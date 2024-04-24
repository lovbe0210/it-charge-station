<template>
  <b-container fluid>
    <b-list-group>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
        <b-row v-for="item in data" :key="item.id" fluid="true" class="item">
          <b-col :cols="isPhone || item.preview == null ? 12 : 8" class="text">
            <b-link :to="'/article/' + item.id">
              <div class="title">
                <span>{{item.title}}</span>
              </div>
            </b-link>
            <div class="description">
              <span>
                {{item.description}}
              </span>
            </div>
            <b-row class="item-icons">
              <div>
                <span class="iconfont like"></span> 2233
              </div>
              <div>
                <span class="iconfont viewed"></span> 777
              </div>
              <div class="from">
                来自🕊
                <b-link to="/follow"><span>语雀精选</span></b-link>
              </div>
            </b-row>
          </b-col>
          <b-col v-if="!isPhone && item.preview != null" cols="4" fluid class="preview-image">
            <b-img right fluid rounded :src="item.preview" alt="Image"/>
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
    beforeRouteEnter(from, to, next) {
      next(vc => {
        // 通过 `vc` 访问组件实例
        if (vc.$route.params.index) {
          vc.$store.commit('changeActiveRoute', 'recommend')
        }
        next();
      })
    },
    data() {
      return {
        loading: false,
        showImg: true,
        data: [
          {
            id: '001',
            title: '臻默：整理100+语雀小技巧之后，我们开始了知识管理的大航海大巷哈',
            description: 'https://juejin.cn/post/7343441462644195362 缘起：开始整理语雀小技巧的动机，是因为雀友群很多朋友会提出语雀日常使用的困惑：实际上，贴心的语雀官方已经提供了帮助手册和语雀小技巧卡片，不过卡片了缘起：开始整理语雀小技巧的动机，是因为雀友群很多朋友会提出语雀日常使用的困惑：实际上，贴心的语雀官方已经提供了帮助手册和语雀小技巧卡片，不过卡片了',
            preview: require('@/assets/img/1.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.'
          },
          {
            id: '002',
            title: '工作中的23个设计模式',
            description: '从基础的角度看，设计模式是研究类本身或者类与类之间的协作模式，是进行抽象归纳的一个很好的速成思路。后面阅读设计模式后，为了加深理解，对相关图片进行了描绘和微调。从技术的角度已经有很多好的总结，本文会换一种角度思考，既然设计模式研究的是类与类的关系，作为工作的个体，一些工作中的策略是不是也可以进行类比，可以更好地去思考这些模式？答案是肯定的。',
            preview: require('@/assets/img/2.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.'
          },
          {
            id: '003',
            title: '如何正确的提问？',
            description: '上一篇我们提到了为什么问题比答案重要，这一篇我们来说说如何正确的提问。',
            preview: require('@/assets/img/3.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.'
          },
          {
            id: '004',
            title: '写作｜《认知觉醒》',
            description: '如果让我用一句话来总结自己快速成长的“秘诀”，那就是：盯着改变去学习。这的确是我这些年快速蜕变的心法，也是我回答很多读者的答案。因为他们常问：你书中提到的那些书，其实很多我都读过，但为什么我读过之后就仅仅是读过，而你不仅能在这么短的时间里发生蜕变，还能写出这样两本书呢',
            preview: require('@/assets/img/4.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.'
          },
          {
            id: '005',
            title: '单例模式',
            description: '人在干，天在看”，看来是苍天有眼啊，看着国办同志多年来辛辛苦苦、扎扎实实做出奉献，应该给予奖赏……',
            preview: require('@/assets/img/5.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.'
          },
          {
            id: '006',
            title: 'This is title 6',
            description: 'This is description, this is description, this is description.',
            preview: require('@/assets/img/6.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.'
          }
        ],
        count: 0
      }
    },
    computed: {
      // 判断页面是手机页面还是pc页面，如果是手机页面则进行全屏显示
      isPhone() {
        return this.$store.state.isPhone
      },
      // 设置无限滚动条目数
      busy() {
        return this.count > 100
      }
    },
    methods: {
      loadMore() {
        for (let i = 0, j = 10; i < j; i++) {
          this.data.push(
            {
              id: '00' + (this.data.length + 1),
              title: 'This is title ' + '00' + this.data.length,
              description: this.data.length % 2 === 0 ? '我是偶数title @~@' : '我是奇数title @…@',
              preview: require('@/assets/img/' + Math.ceil(Math.random() * 31) + '.jpg'),
              content: this.data.length % 2 === 0 ? '我是偶数content @~@' : '我是偶数content @…@'
            }
          );
          this.count++;
        }
      },
      toReadCenter() {
        let routeUrl = this.$router.resolve({
          path: '/readCenter/doc'
        })
        window.open(routeUrl.href, '_blank')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./css/recommend.less";
  @import "./css/common-var.less";

  .t-scroll {
    position: relative;
    overflow: scroll;
  }

  .to-top {
    padding: 10px;
    color: @border-color_hover;
    text-align: center;
    font-size: 30px;
  }
</style>
