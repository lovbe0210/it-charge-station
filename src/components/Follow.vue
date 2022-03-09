<template>
  <b-container fluid>
    <b-row v-if="1" class="creator-avatar">
      <Button ghost type="text" @click="previous()">
          <span :class="leftHoverClass?'iconfont icon-left-hover':'iconfont icon-left'"
                @mouseenter="isHover('left',true)" @mouseleave="isHover('left',false)"/>
      </Button>
      <b-avatar-group overlap="0.65">
        <b-link class="creator-item">
          <div class="avatar-wrapper">
            <b-avatar variant="light">
              <span class="iconfont icon-all-flush" style="font-size:2.5rem;"></span>
            </b-avatar>
          </div>
          <p>查看全部</p>
        </b-link>
        <div v-for="item in creators" :key="item.id" class="creator-item">
          <div class="avatar-wrapper">
            <b-avatar :src="item.avatar" variant="light" :to="'/some-link' + item.id">
              <span v-if="!item.avatar" class="iconfont icon-all-flush" style="font-size:2.5rem;"></span>
            </b-avatar>
            <div class="c-badge" v-if="1"></div>
          </div>
          <b-link :to="'/some-link' + item.id">
            <p style="width:62px;font-size:12px;margin-top:8px;">{{item.nickName}}</p>
          </b-link>
        </div>
      </b-avatar-group>
      <Button ghost type="text" @click="next()">
          <span :class="rightHoverClass?'iconfont icon-right-hover':'iconfont icon-right'"
                @mouseenter="isHover('right',true)" @mouseleave="isHover('right',false)"/>
      </Button>
    </b-row>
    <b-row v-else class="creator-avatar">
      <div class="_blank">
        <b-row>
          <span class="iconfont icon-no-follow"></span>
        </b-row>
        <b-row>
          空空如也，去
          <b-link>发现</b-link>
        </b-row>
      </div>
    </b-row>
    <b-row v-if="1" class="creator-trend">
      <b-card body-class="trend-item" v-for="(item,index) in creatorTrend" :key="item.id">
        <b-card-title>
          <b-avatar variant="light" :src="item.avatar" to="some-link">
            <span v-if="!item.avatar" class="iconfont icon-all-flush" style="font-size:2.5rem;"></span>
          </b-avatar>
          <span class="title">{{item.trendTitle}}</span>
          <span class="time">{{item.publicTime}}</span>
        </b-card-title>
        <b-card-text>
          {{item.previewContent}}
        </b-card-text>
        <b-card-text class="small text-muted">
          <span class="iconfont icon-personal-man"></span><span>{{item.nickName}}</span>
          <span class="iconfont icon-comment" style="margin-left: 5px;"></span><span>{{item.commentCount}}</span>
          <span class="iconfont icon-like1" style="margin-left: 5px;"></span><span>{{item.likeCount}}</span>
        </b-card-text>
        <hr v-if="index !== creatorTrend.length-1">
      </b-card>
    </b-row>
    <b-row v-else class="creator-trend">
      <div class="_blank">
        <b-row>
          <span class="iconfont icon-blank" style="font-size:50px;"></span>
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
        creatorTrend: [
          {
            id: '001',
            avatar: 'https://tvax1.sinaimg.cn/large/718153f4gy1gy47gm06y9j20m80rsq8t.jpg',
            nickName: 'lovbe0210',
            trendTitle: '发表了笔记 MySQL索引初见闻',
            previewContent: 'MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻MySQL索引初见闻',
            publicTime: '10分钟前',
            likeCount: 15,
            commentCount: 15
          },
          {
            id: '002',
            avatar: 'https://tvax3.sinaimg.cn/large/718153f4gy1gy1ob6nxj1j20lo0ot41b.jpg',
            nickName: 'lovbe0210',
            trendTitle: '发表了心情',
            previewContent: '今天蒙蒙顿顿',
            publicTime: '昨天09:30',
            likeCount: 15,
            commentCount: 15
          },
          {
            id: '003',
            avatar: 'https://tvax1.sinaimg.cn/large/718153f4gy1gxzk3fro87j20nc0ncq3z.jpg',
            nickName: 'lovbe0210',
            trendTitle: '发表了专题文章 K8S自动部署（上）—— 认识Docker',
            previewContent: 'K8S自动部署（上）—— 认识DockerK8S自动部署（上）—— 认识DockerK8S自动部署（上）—— 认识DockerK8S自动部署（上）—— 认识DockerK8S自动部署（上）—— 认识Docker',
            publicTime: '01-17',
            likeCount: 15,
            commentCount: 15
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
