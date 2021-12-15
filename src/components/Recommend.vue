<template>
  <b-container fluid>
    <b-list-group>
        <b-row v-for="item in data" :key="item.id" fluid="true" class="item">
          <b-col :cols="isPhone ? 12 : 8" class="text">
            <div class="title">
              <span>{{item.title}}</span>
            </div>

            <div class="description">
              <span>
                {{item.description}}
              </span>
            </div>

            <div class="item-icons">
              <b-icon icon="hand-thumbs-up" style="margin-right: 10px"/>2323
              <b-icon icon="book" style="margin-left: 20px;margin-right: 10px;"/>11223
              <span>来自🕊 语雀精选</span>
            </div>
          </b-col>
          <b-col v-if="!isPhone" cols="4" fluid class="image">
              <b-img right thumbnail fluid="true" :src="item.avatar" alt="Image 1" />
          </b-col>
        </b-row>
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
            title: '臻默：整理100+语雀小技巧之后，我们开始了知识管理的大航海',
            description: '缘起：开始整理语雀小技巧的动机，是因为雀友群很多朋友会提出语雀日常使用的困惑：实际上，贴心的语雀官方已经提供了帮助手册和语雀小技巧卡片，不过卡片了缘起：开始整理语雀小技巧的动机，是因为雀友群很多朋友会提出语雀日常使用的困惑：实际上，贴心的语雀官方已经提供了帮助手册和语雀小技巧卡片，不过卡片了',
            avatar: require('@/assets/img/1.jpg'),
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
          }
        ]
      }
    },
    computed: {
      // 判断页面是手机页面还是pc页面，如果是手机页面则进行全屏显示
      isPhone () {
        return this.$store.state.isPhone
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./css/recommend.less";
</style>
