<template>
  <div class="layout-module_recentView">
    <div class="recent-view-header">
      <h2 class="title">浏览记录</h2>
      <hr class="separator-line">
      <div class="operation">
        <Input class="search" search placeholder="搜索标题关键词"/>
        <div class="action">
          <span class="iconfont delete"></span>
          <span>清空记录</span>
        </div>
      </div>
    </div>
    <div class="recent-view-list">
      <div class="list-wrapp" v-for="(item,index) in recentViewList" :key="index">
        <div class="time-line">
          <span class="iconfont history"></span>
          {{item.viewDate}}
        </div>
        <div class="view-list-item" v-for="viewItem in item.viewList" :key="viewItem.id">
          <b-link class="item-header" :to="'/article/' + viewItem.id">
            <span :class="['item-type', viewItem.type == 1 ? 'doc' : viewItem.type == 2 ? 'colum' : 'rambly-jot']">
              {{viewItem.type == 1 ? '文章' : viewItem.type == 2 ? '专栏' : '随笔'}}
            </span>
            <h2 class="item-title">{{viewItem.title}}</h2>
          </b-link>
          <div class="item-content">
            <span>{{viewItem.content}}</span>
          </div>
          <div class="item-info-action">
            <div>
              <b-link class="item-author" :to="'/' + viewItem.authorId">
                {{viewItem.authorName}}
              </b-link>
              <span class="tag">|</span>
              <span class="item-count" v-if="viewItem.type === 1">
                {{viewItem.viewCount}}阅读 · {{viewItem.likeCount}}赞 · {{viewItem.commentCount}}评论
              </span>
              <span class="item-count" v-if="viewItem.type === 2">
                {{viewItem.viewCount}}阅读 · {{viewItem.likeCount}}赞 · {{viewItem.collectCount}}收藏
              </span>
              <span class="item-count" v-if="viewItem.type === 3">
                {{viewItem.viewCount}}阅读 · {{viewItem.commentCount}}评论
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecentView',
    data() {
      return {
        recentViewList: [
          {
            viewDate: '2023-02-10',
            viewList: [
              {
                id: 'sdasd223232',
                type: 1,
                title: '爷青回，canal1.1.6回来了，几个重要特性和bug修复',
                content: '刚刚在群里看到消息说，时隔一年，canal 1.1.6正式release了，赶紧上去看看有什么新特性。快来免费体验ChatGpt plus版本的，我们出的钱 体验地址:https://chat.waixingyun.cn 可以加入网站底部技术群',
                authorName: '阿婉笔记',
                authorId: 'asd234d2wsdasdsad',
                viewCount: 123,
                likeCount: 32,
                commentCount: 14,
                collectCount: 344
              },
              {
                id: 'dfdf4454562',
                type: 1,
                title: 'CSS如何让蚊子只能适配背景颜色',
                content: '原文链接：[https://icloudnative.io/posts/completely-free-to-use-gpt4/](https://icloudnative.io/posts/c最近有小伙伴问我能不能抓取同花顺的数据，最近股票行情',
                authorName: '阿婉笔记',
                authorId: 'asd234d2wsdasds2ad',
                viewCount: 123,
                likeCount: 32,
                commentCount: 14,
                collectCount: 164
              },
              {
                id: 'fgfg565657',
                type: 1,
                title: 'Vue实现滑动解锁',
                content: '注点 实现文字渐变，这里涉猎了下面 2 个重要的属性： background + -webkit-backgroun使用 vue 实现 滑动解锁 从0开始，一步一步教你怎么写一个简洁的登录页面以及附加图片滑动解锁的',
                authorName: '阿婉笔记',
                authorId: 'asd234d2wsdasdsad',
                viewCount: 123,
                likeCount: 32,
                commentCount: 14,
                collectCount: 314
              }
            ]
          },
          {
            viewDate: '2023-02-01',
            viewList: [
              {
                id: 'sdasd223232',
                type: 2,
                title: '爷青回，canal1.1.6回来了，几个重要特性和bug修复',
                content: '刚刚在群里看到消息说，时隔一年，canal 1.1.6正式release了，赶紧上去看看有什么新特性。快来免费体验ChatGpt plus版本的，我们出的钱 体验地址:https://chat.waixingyun.cn 可以加入网站底部技术群',
                authorName: '阿婉笔记',
                authorId: 'asd2134d2wsdasdsad',
                viewCount: 123,
                likeCount: 32,
                commentCount: 14,
                collectCount: 304
              },
              {
                id: 'dfdf4454562',
                type: 3,
                title: 'CSS如何让蚊子只能适配背景颜色',
                content: '原文链接：[https://icloudnative.io/posts/completely-free-to-use-gpt4/](https://icloudnative.io/posts/c最近有小伙伴问我能不能抓取同花顺的数据，最近股票行情',
                authorName: '阿婉笔记',
                authorId: 'asd8234d2wsdasdsad',
                viewCount: 123,
                likeCount: 32,
                commentCount: 14,
                collectCount: 34
              },
              {
                id: 'fgfg565657',
                type: 1,
                title: 'Vue实现滑动解锁',
                content: '注点 实现文字渐变，这里涉猎了下面 2 个重要的属性： background + -webkit-backgroun使用 vue 实现 滑动解锁 从0开始，一步一步教你怎么写一个简洁的登录页面以及附加图片滑动解锁的',
                authorName: '阿婉笔记',
                authorId: 'asd234d2wsdasds0ad',
                viewCount: 123,
                likeCount: 32,
                commentCount: 14,
                collectCount: 54
              }
            ]
          },
          {
            viewDate: '2023-02-10',
            viewList: [
              {
                id: 'sdasd223232',
                type: 3,
                title: '爷青回，canal1.1.6回来了，几个重要特性和bug修复',
                content: '刚刚在群里看到消息说，时隔一年，canal 1.1.6正式release了，赶紧上去看看有什么新特性。快来免费体验ChatGpt plus版本的，我们出的钱 体验地址:https://chat.waixingyun.cn 可以加入网站底部技术群',
                authorName: '阿婉笔记',
                authorId: 'asd234d2wsdasddsad',
                viewCount: 123,
                likeCount: 32,
                commentCount: 14,
                collectCount: 24
              },
              {
                id: 'dfdf4454562',
                type: 1,
                title: 'CSS如何让蚊子只能适配背景颜色',
                content: '原文链接：[https://icloudnative.io/posts/completely-free-to-use-gpt4/](https://icloudnative.io/posts/c最近有小伙伴问我能不能抓取同花顺的数据，最近股票行情',
                authorName: '阿婉笔记',
                authorId: 'asd234d2wsdasdsad',
                viewCount: 123,
                likeCount: 32,
                commentCount: 14,
                collectCount: 84
              },
              {
                id: 'fgfg565657',
                type: 1,
                title: 'Vue实现滑动解锁',
                content: '注点 实现文字渐变，这里涉猎了下面 2 个重要的属性： background + -webkit-backgroun使用 vue 实现 滑动解锁 从0开始，一步一步教你怎么写一个简洁的登录页面以及附加图片滑动解锁的',
                authorName: '阿婉笔记',
                authorId: 'asd2234d2wsdasdsad',
                viewCount: 123,
                likeCount: 32,
                commentCount: 14,
                collectCount: 34
              }
            ]
          }
        ]
      }
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import '../css/creativespace/recentView.less';
</style>
