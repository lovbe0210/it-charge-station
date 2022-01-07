<template>
  <b-container fluid>
    <b-row v-if="1" class="creator-avatar">
      <Button ghost type="text" @click="previous()">
          <span :class="leftHoverClass?'iconfont icon-left-hover':'iconfont icon-left'"
                @mouseenter="isHover('left',true)" @mouseleave="isHover('left',false)"/>
      </Button>
      <b-avatar-group overlap="0.65">
        <b-link v-for="item in creators" :key="item.id" class="creator-item">
          <div class="avatar-wrapper">
            <b-avatar :src="item.avatar">
              <span v-if="!item.avatar" class="iconfont icon-avatar-man" style="font-size:1.8rem;"></span>
            </b-avatar>
            <div class="c-badge" v-if="1"></div>
          </div>
          <p style="width:62px;font-size:12px;margin-top:8px;">{{item.nickName}}</p>
        </b-link>
      </b-avatar-group>
      <Button ghost type="text" @click="next()">
          <span :class="rightHoverClass?'iconfont icon-right-hover':'iconfont icon-right'"
                @mouseenter="isHover('right',true)" @mouseleave="isHover('right',false)"/>
      </Button>
    </b-row>
    <b-row v-else class="creator-avatar">
      <div class="_blank">
        <b-row>
          <span class="iconfont icon-creator-b"></span>
        </b-row>
        <b-row>
          空空如也，去
          <b-link>发现</b-link>
        </b-row>
      </div>
    </b-row>
    <b-row v-if="0" class="creator-trend">

    </b-row>
    <b-row v-else class="creator-trend">
      <div class="_blank">
        <b-row>
          <span class="iconfont icon-trend_b" style="font-size:50px;"></span>
        </b-row>
        <b-row>
          暂无动态更新，先去
          <b-link>推荐</b-link>
          看看
        </b-row>
      </div>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'Follow',
    data() {
      return {
        creators: [
          {
            id: '000',
            avatar: '',
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
        leftHoverClass: false,
        rightHoverClass: false
      }
    },
    methods: {
      isHover(position, flag) {
        if (position === 'left') {
          this.leftHoverClass = flag;
        } else {
          this.rightHoverClass = flag;
        }
      },
      previous() {
        console.log('previous page')
      },
      next() {
        console.log('next page')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./css/follow.less";
  @import "./css/common-var";
</style>
