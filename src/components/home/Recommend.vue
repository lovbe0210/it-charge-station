<template>
  <b-container fluid ref="popoverContainer">
    <b-list-group>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
        <b-row v-for="item in data" :key="item.id" fluid="true" class="item">
          <b-col :cols="isPhone || item.preview == null ? 12 : 8" class="text">
            <b-link :to="'/article/' + item.id">
              <div class="title">
                <span>{{item.title}}</span>
              </div>
              <div class="description">
                <span>
                  {{item.description}}
                </span>
              </div>
            </b-link>
            <b-row class="item-addition-info un-select">
              <div class="author-info">
                <user-card class="item-avatar"
                           :userInfo="item.userInfo"
                           :popoverContainer="popoverContainer">
                  <slot>
                    <b-link :to="('/' + item.userInfo.domain)" class="from">
                      <span>{{item.userInfo.username}}</span>
                    </b-link>
                  </slot>
                </user-card>
                <span class="count-info">
                  <span>
                    <span class="iconfont i-view"/> 777
                  </span>
                  <span>
                    <span class="iconfont like"/> 2233
                  </span>
                </span>
              </div>
              <span class="acticle-tags">
                <span :class="'ant-tag ant-tag-' + tag.color"
                      v-for="(tag,index) in item.tags"
                      :title="tag.content"
                      :key="index">{{tag.content}}</span>
              </span>
            </b-row>
          </b-col>
          <b-col v-if="!isPhone && item.preview != null" cols="4" fluid class="preview-image">
            <b-link :to="'/article/' + item.id">
              <b-img right fluid rounded :src="item.preview" alt="Image"/>
            </b-link>
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
  import UserCard from "@/components/common/UserCard.vue";
  export default {
    name: 'Recommend',
    // 如果通过首页进来则一定显示推荐页面，否则显示用户自己上次选择的页面，这样如果用户不点击主页无论怎么刷新页面都将会显示上次浏览的页面
    beforeRouteEnter(to, from, next) {
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
        popoverContainer: null,
        data: [
          {
            id: '001',
            title: '8051单片机结构与原理',
            description: '单片机的基本结构包括中央处理器(CPU) 、存储器、定时/计数器、输入输出接口、中断控制系统和时钟电路六部分',
            preview: require('@/assets/img/640.png'),
            content: 'This is the content, this is the content, this is the content, this is the content.',
            userInfo: {
              userId: 1,
              username: '闪魔亮晶晶闪魔亮晶晶闪魔亮晶晶',
              avatar: require('@/assets/avatar/16.jpg'),
              level: 5
            },
            tags: [
              {content: 'JAVA', color: 'blue'},
              {content: 'Springboot', color: 'red'},
              {content: '微服务', color: 'green'}
            ]
          },
          {
            id: '002',
            title: '工作中的23个设计模式',
            description: '从基础的角度看，设计模式是研究类本身或者类与类之间的协作模式，是进行抽象归纳的一个很好的速成思路。后面阅读设计模式后，为了加深理解，对相关图片进行了描绘和微调。从技术的角度已经有很多好的总结，本文会换一种角度思考，既然设计模式研究的是类与类的关系，作为工作的个体，一些工作中的策略是不是也可以进行类比，可以更好地去思考这些模式？答案是肯定的。',
            preview: require('@/assets/img/2.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.',
            userInfo: {
              userId: 1,
              username: '晶莹剔透的Q宝',
              avatar: require('@/assets/avatar/03.jpg')
            },
            tags: [
              {content: 'JAVA', color: 'blue'},
              {content: 'Springboot', color: 'red'},
              {content: '微服务', color: 'green'}
            ]
          },
          {
            id: '003',
            title: '如何正确的提问？',
            description: '上一篇我们提到了为什么问题比答案重要，这一篇我们来说说如何正确的提问。',
            preview: require('@/assets/img/3.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.',
            userInfo: {
              userId: 1,
              username: '无懈可击',
              avatar: require('@/assets/avatar/01.jpg')
            },
            tags: [
              {content: '最多可以输入几个汉字我试试地方', color: 'blue'},
              {content: '最多可以输入几个汉字我试试地方', color: 'orange'},
              {content: '微服最多可以输入几个汉字我试试', color: 'green'}
            ]
          },
          {
            id: '004',
            title: '写作｜《认知觉醒》',
            description: '如果让我用一句话来总结自己快速成长的“秘诀”，那就是：盯着改变去学习。这的确是我这些年快速蜕变的心法，也是我回答很多读者的答案。因为他们常问：你书中提到的那些书，其实很多我都读过，但为什么我读过之后就仅仅是读过，而你不仅能在这么短的时间里发生蜕变，还能写出这样两本书呢',
            preview: require('@/assets/img/04.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.',
            userInfo: {
              userId: 114,
              avatar: require('@/assets/avatar/16.jpg'),
              domain: 'lovesdfsd',
              username: 'whalexplorer'
            },
            tags: [
              {content: 'Springboot', color: 'red'},
              {content: 'SpringCloud', color: 'orange'},
              {content: '微服务', color: 'green'}
            ]
          },
          {
            id: '005',
            title: '结构性思维——解构问题的基础',
            description: '表达一个态度：思维只是一种思考角度或工具，不要过度解读和神话，一切是为了找到遇到问题更优的解法',
            preview: require('@/assets/img/05.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.',
            userInfo: {
              userId: 1,
              username: '闪魔亮晶晶',
              avatar: require('@/assets/avatar/16.jpg')
            },
            tags: [
              {content: 'JAVA', color: 'blue'},
              {content: 'Springboot', color: 'red'},
              {content: 'SpringCloud', color: 'orange'}
            ]
          },
          {
            id: '006',
            title: 'This is title 6',
            description: 'This is description, this is description, this is description.',
            preview: require('@/assets/img/6.jpg'),
            content: 'This is the content, this is the content, this is the content, this is the content.',
            userInfo: {
              userId: 1,
              username: '闪魔亮晶晶',
              avatar: require('@/assets/avatar/16.jpg')
            },
            tags: [
              {content: 'JAVA', color: 'blue'},
              {content: 'SpringCloud', color: 'orange'},
              {content: '微服务', color: 'green'}
            ]
          }
        ],
        count: 0
      }
    },
    components: {
      UserCard
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
              content: this.data.length % 2 === 0 ? '我是偶数content @~@' : '我是偶数content @…@',
              userInfo: {
                userId: 1,
                username: '闪魔亮晶晶',
                avatar: require('@/assets/avatar/16.jpg')
              },
              tags: [
                {content: 'JAVA', color: 'blue'},
                {content: 'Springboot', color: 'red'},
                {content: '微服务', color: 'green'}
              ]
            }
          );
          this.count++;
        }
      }
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
    }
  }
</script>

<style scoped lang="less">
  @import "../css/home/recommend.less";
  @import "../css/common-var.less";
</style>
