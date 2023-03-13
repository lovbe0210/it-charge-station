<template>
  <div class="music-detail-card" :class="[isMusicDetailCardShow ? '' : 'hide', backgroundMode ? '' : '',]">
    <div class="glassCard"></div>
    <div class="left">
      <div class="discContainer">
        <div class="needle" :class="$store.state.musicPlay.isPlay ? 'needleRotate' : ''" ref="needle">
          <img :src="require('@/assets/img/MusicDetailCard/needle.png')" alt=""/>
        </div>
        <!-- 通过音乐的加载时差删除discAnimation类名再添加,达到重置动画的效果 -->
        <div class="disc"
             :class="[$store.state.musicPlay.isPlay ? '' : 'pause',$store.state.musicPlay.isMusicLoad ? '' : 'discAnimation']"
             ref="disc">
          <img :src="require('@/assets/img/MusicDetailCard/disc.png')" alt=""/>
          <img :src="require('@/assets/img/test.jpg')" alt="" class="musicAvatar" v-if="!musicInfo.al"/>
          <img :src="musicInfo.al.picUrl" alt="" class="musicAvatar" v-else/>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title">
        <div class="musicName">{{ musicInfo.name }}</div>
        <div class="singer" @click="goToDetailPage('singerDetail', musicInfo.ar[0].id)">
          {{ musicInfo.ar[0].name }}
        </div>
      </div>
      <lyrics-scroll :lyric="lyric"></lyrics-scroll>
    </div>
    <!--      <div class="bottom" v-loading="isCommentLoading" element-loading-background="rgba(255, 255, 255, 0.1)">-->
    <!--        <comment :comments="hotComments" :commentType="'music'" :commentId="$store.state.musicId + ''"-->
    <!--          :musicTitle="musicInfo.name" @getComment="getMusicComment($store.state.musicId)"-->
    <!--          class="commentComponent" v-if="currentCommentPage == 1">-->
    <!--          <div slot="title">热门评论</div>-->
    <!--        </comment>-->
    <!--        <comment :comments="comment.comments" :commentType="'music'" :commentId="$store.state.musicId + ''"-->
    <!--          :musicTitle="musicInfo.name" @getComment="getMusicComment($store.state.musicId)"-->
    <!--          class="commentComponent">-->
    <!--          <div slot="title">最新评论({{ comment.total }})</div>-->
    <!--        </comment>-->
    <!-- 评论分页 -->
    <!--        <div class="page" v-show="comment.comments && comment.comments[0]">-->
    <!--          <el-pagination background layout="prev, pager, next" :total="comment.total" small :page-size="20" -->
    <!--           :current-page="currentCommentPage" @current-change="commentPageChange">-->
    <!--          </el-pagination>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <go-top scrollObj=".musicDetailCardContainer"></go-top>-->
  </div>
</template>

<script>
  import LyricsScroll from "./LyricsScroll";
  export default {
    data() {
      return {
        musicInfo: {
          "name": "Love Story",
          "id": 19292984,
          "pst": 0,
          "t": 0,
          "ar": [{"id": 44266, "name": "Taylor Swift", "tns": ["泰勒·斯威夫特"], "alias": []}],
          "alia": [],
          "pop": 100,
          "st": 0,
          "rt": "600902000007282990",
          "fee": 1,
          "v": 129,
          "crbt": null,
          "cf": "",
          "al": {
            "id": 1770438,
            "name": "Fearless",
            "picUrl": "http://p4.music.126.net/KurKrZ-dMmviArT5lM2RCQ==/18517974836953202.jpg",
            "tns": [],
            "pic_str": "18517974836953202",
            "pic": 18517974836953200
          },
          "dt": "03:56",
          "h": {"br": 320000, "fid": 0, "size": 9452191, "vd": -65540, "sr": 44100},
          "m": {"br": 192000, "fid": 0, "size": 5671332, "vd": -63094, "sr": 44100},
          "l": {"br": 128000, "fid": 0, "size": 3780902, "vd": -61573, "sr": 44100},
          "sq": null,
          "hr": null,
          "a": null,
          "cd": "1",
          "no": 3,
          "rtUrl": null,
          "ftype": 0,
          "rtUrls": [],
          "djId": 0,
          "copyright": 1,
          "s_id": 0,
          "mark": 270336,
          "originCoverType": 1,
          "originSongSimpleData": null,
          "tagPicList": null,
          "resourceState": true,
          "version": 129,
          "songJumpInfo": null,
          "entertainmentTags": null,
          "single": 0,
          "noCopyrightRcmd": null,
          "mst": 9,
          "cp": 7003,
          "mv": 503185,
          "rtype": 0,
          "rurl": null,
          "publishTime": 1230739200000,
          "privilege": {
            "id": 19292984,
            "fee": 1,
            "payed": 0,
            "st": 0,
            "pl": 0,
            "dl": 0,
            "sp": 7,
            "cp": 1,
            "subp": 1,
            "cs": false,
            "maxbr": 320000,
            "fl": 0,
            "toast": false,
            "flag": 1284,
            "preSell": false,
            "playMaxbr": 320000,
            "downloadMaxbr": 320000,
            "maxBrLevel": "exhigh",
            "playMaxBrLevel": "exhigh",
            "downloadMaxBrLevel": "exhigh",
            "plLevel": "none",
            "dlLevel": "none",
            "flLevel": "none",
            "rscl": null,
            "freeTrialPrivilege": {"resConsumable": false, "userConsumable": false, "listenType": 5},
            "chargeInfoList": [{
              "rate": 128000,
              "chargeUrl": null,
              "chargeMessage": null,
              "chargeType": 1
            }, {"rate": 192000, "chargeUrl": null, "chargeMessage": null, "chargeType": 1}, {
              "rate": 320000,
              "chargeUrl": null,
              "chargeMessage": null,
              "chargeType": 1
            }, {"rate": 999000, "chargeUrl": null, "chargeMessage": null, "chargeType": 1}]
          }
        },
        // 是否删除卡片渲染的内容
        cleanCard: true,
        // 是否显示歌曲详情卡片
        isMusicDetailCardShow: true,
        //   歌词
        lyric: [[0, "正在加载歌词"]],
        // 背景显示模式  true为白色渐变背景  false为毛玻璃背景
        backgroundMode: false
      }
    },
    comments: {
      LyricsScroll
    },
    watch: {
      // 当vuex中的歌曲id发生变化时,需要重新获取评论和歌词
      "$store.state.musicInfo.musicId"(musicId) {
        // 清空歌词
        this.lyric = [[0, "正在加载歌词"]];
        // 重置评论页数
        this.currentCommentPage = 1;
        // 更新当前歌曲信息
        this.musicInfo =
          this.$store.state.musicInfo.musicList[this.$store.state.musicInfo.currentIndex];
        this.comment = {};
        // 优化性能,仅在卡片展示时才发送请求
        if (this.isMusicDetailCardShow) {
          this.getLyric(musicId);
          this.getMusicComment(musicId);
          console.log(this.$refs.musicDetailCard)
        }
        //   console.log(this.musicInfo);
        //   console.log(this.$refs.disc);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./css/music-detail-card.less";
</style>
