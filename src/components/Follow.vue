<template>
  <b-container fluid>
    <b-row v-if="1" class="creator-avatar">
      <Button ghost type="text" @click="previous()">
          <span :class="hoverClass?'iconfont icon-left-hover':'iconfont icon-left'"
                @mouseenter="isHover(true)" @mouseleave="isHover(false)"/>
      </Button>
      <b-avatar-group overlap="0.65">
        <b-link v-for="item in creators" :key="item.id" class="creator-item">
          <b-avatar :src="item.avatar">
            <span v-if="0" class="iconfont icon-avatar-man" style="font-size:1.8rem;"></span>
            <div class="c-badge" v-if="0"></div>
          </b-avatar>
          <p style="width:62px;font-size:12px;margin-top:8px;">{{item.nickName}}</p>
        </b-link>
      </b-avatar-group>
      <Button ghost type="text" @click="next()">
          <span :class="hoverClass?'iconfont icon-right-hover':'iconfont icon-right'"
                @mouseenter="isHover(true)" @mouseleave="isHover(false)"/>
      </Button>
    </b-row>
    <b-row v-else class="creator-avatar">
      <div>
        去
        <b-link>发现</b-link>
        优秀的创作者
      </div>
    </b-row>
    <b-row v-if="0">

    </b-row>
    <b-row v-else>
      <div>暂无动态更新，先去
        <b-link>推荐</b-link>
        看看
      </div>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'Follow',
    data () {
      return {
        creators: [
          {
            id: '000',
            avatar: 'https://tvax4.sinaimg.cn/large/718153f4gy1gy1oaw1rojj20u018w78c.jpg',
            nickName: '查看全部'
          },
          {
            id: '001',
            avatar: 'https://tvax1.sinaimg.cn/large/718153f4gy1gy47gm06y9j20m80rsq8t.jpg',
            nickName: '昵称多的字数需要限制'
          },
          {
            id: '002',
            avatar: 'https://tvax3.sinaimg.cn/large/718153f4gy1gy1ob6nxj1j20lo0ot41b.jpg',
            nickName: 'lovbe0210'
          },
          {
            id: '003',
            avatar: 'https://tvax1.sinaimg.cn/large/718153f4gy1gxzk3fro87j20nc0ncq3z.jpg',
            nickName: 'lovbe0210'
          },
          {
            id: '004',
            avatar: 'https://tvax2.sinaimg.cn/large/718153f4gy1gy47gj6p22j20xc0p0n1v.jpg',
            nickName: 'lovbe0210'
          },
          {
            id: '005',
            avatar: 'https://tva3.sinaimg.cn/large/718153f4gy1gy47gg8nutj20m80m8te2.jpg',
            nickName: 'lovbe0210'
          },
          {
            id: '006',
            avatar: 'https://tvax1.sinaimg.cn/large/718153f4gy1gy47fewe03g20a205m1ky.gif',
            nickName: 'lovbe0210'
          }
        ],
        hoverClass: false
      }
    },
    methods: {
      isHover (flag) {
        this.hoverClass = flag
      },
      previous () {
        console.log('previous page')
      },
      next () {
        console.log('next page')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./css/follow.less";
  @import "./css/common-var";
</style>
