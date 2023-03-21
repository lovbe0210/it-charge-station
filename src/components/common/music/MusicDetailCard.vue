<template>
  <div class="music-detail-card" :class="[isMusicDetailCardShow ? '' : 'hide', backgroundMode ? '' : '',]">
    <div class="glassCard"></div>
    <div class="left">
      <div class="discContainer">
        <div class="needle" :class="$store.state.musicInfo.isPlay ? 'needleRotate' : ''" ref="needle">
          <img :src="require('@/assets/img/MusicDetailCard/needle.png')" alt=""/>
        </div>
        <!-- 通过音乐的加载时差删除discAnimation类名再添加,达到重置动画的效果 -->
        <div class="disc"
             :class="[$store.state.musicInfo.isPlay ? '' : 'pause',$store.state.musicInfo.isMusicLoad ? '' : 'discAnimation']"
             ref="disc">
          <img :src="require('@/assets/img/MusicDetailCard/disc.png')" alt=""/>
          <img :src="require('@/assets/img/test.jpg')" alt="" class="musicAvatar" v-if="!musicInfo.al"/>
          <img :src="musicInfo.al.picUrl" alt="" class="musicAvatar" v-else/>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title">
        <div class="musicName">
          {{ musicInfo.name }}
          <span class="singer" @click="goToDetailPage('singerDetail', musicInfo.ar[0].id)">
            {{ musicInfo.ar[0].name }}
          </span>
        </div>

      </div>

      <div class="lyrics">
        <!-- 占位 -->
        <div class="placeholder"></div>
        <!-- 因为歌词快了一句,所以减1 -->
        <!-- 歌词item -->
        <div class="lyricsItem" v-for="(item, index) in lyric" :key="index"
             :class="lyricsIndex - 1 == index ? 'currentLyric' : ''">
          {{ item[1] }}
        </div>
        <!-- 占位 -->
        <div class="placeholder"></div>
      </div>
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
  let placeholderHeight = 0;
  export default {
    data() {
      return {
        musicInfo: {
          "name": "幻听",
          "id": 167655,
          "pst": 0,
          "t": 0,
          "ar": [{"id": 5771, "name": "许嵩", "tns": [], "alias": ["Vae"], "alia": ["Vae"]}],
          "alia": [],
          "pop": 100,
          "st": 0,
          "rt": "600902000009334954",
          "fee": 8,
          "v": 51,
          "crbt": null,
          "cf": "",
          "al": {
            "id": 16932,
            "name": "梦游计",
            "picUrl": "http://p3.music.126.net/ifjKrYPuGzRHlbVDNScQfA==/109951166118946328.jpg",
            "tns": [],
            "pic_str": "109951166118946328",
            "pic": 109951166118946340
          },
          "dt": "04:33",
          "h": {"br": 320000, "fid": 0, "size": 10932811, "vd": -26180, "sr": 44100},
          "m": {"br": 192000, "fid": 0, "size": 6559704, "vd": -23577, "sr": 44100},
          "l": {"br": 128000, "fid": 0, "size": 4373151, "vd": -21810, "sr": 44100},
          "sq": {"br": 783967, "fid": 0, "size": 26779043, "vd": -26284, "sr": 44100},
          "hr": null,
          "a": null,
          "cd": "1",
          "no": 2,
          "rtUrl": null,
          "ftype": 0,
          "rtUrls": [],
          "djId": 0,
          "copyright": 1,
          "s_id": 0,
          "mark": 8192,
          "originCoverType": 1,
          "originSongSimpleData": null,
          "tagPicList": null,
          "resourceState": true,
          "version": 51,
          "songJumpInfo": null,
          "entertainmentTags": null,
          "single": 0,
          "noCopyrightRcmd": null,
          "rtype": 0,
          "rurl": null,
          "mst": 9,
          "cp": 22036,
          "mv": 304279,
          "publishTime": 1341936000007,
          "privilege": {
            "id": 167655,
            "fee": 8,
            "payed": 0,
            "st": 0,
            "pl": 128000,
            "dl": 0,
            "sp": 7,
            "cp": 1,
            "subp": 1,
            "cs": false,
            "maxbr": 999000,
            "fl": 128000,
            "toast": false,
            "flag": 260,
            "preSell": false,
            "playMaxbr": 999000,
            "downloadMaxbr": 999000,
            "maxBrLevel": "lossless",
            "playMaxBrLevel": "lossless",
            "downloadMaxBrLevel": "lossless",
            "plLevel": "standard",
            "dlLevel": "none",
            "flLevel": "standard",
            "rscl": null,
            "freeTrialPrivilege": {"resConsumable": false, "userConsumable": false, "listenType": 5},
            "chargeInfoList": [{
              "rate": 128000,
              "chargeUrl": null,
              "chargeMessage": null,
              "chargeType": 0
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
        lyric: [[0, "正在加载歌词..."]],
        // 当前歌词索引
        lyricsIndex: 0,
        // 背景显示模式  true为白色渐变背景  false为毛玻璃背景
        backgroundMode: false
      }
    },
    methods: {
      //请求并处理歌词数据
      async getLyric(id) {
        let res = await this.$request({
          url: "/lyric?id=167655",
          method: 'get'
        });
        // debugger
        // console.log(res);
        // TODO 注意出参格式
        let lyrics = res.lrc.lyric;
        // 对获取到的歌词进行处理
        let arr = lyrics.split("\n");
        let array = [];
        // let obj = {};
        let time = "";
        let value = "";
        let result = [];

        //去除空行
        arr.forEach((item) => {
          if (item !== "") {
            array.push(item);
          }
        });
        arr = array;
        arr.forEach((item) => {
          time = item.split("]")[0];
          value = item.split("]")[1];
          //去掉时间里的中括号得到xx:xx.xx
          var t = time.slice(1).split(":");
          //将结果压入最终数组
          result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });

        this.lyric = result;
        // console.log(this.lyric);
      },
      // 实现歌词滚动
      lyricScroll(currentLyric) {
        // 获取歌词item
        let lyricsArr = document.querySelectorAll(".lyricsItem");
        // 获取歌词框
        let lyrics = document.querySelector(".lyrics");
        // placeholder的高度
        if (placeholderHeight === 0) {
          placeholderHeight = lyricsArr[0].offsetTop - lyrics.offsetTop;
        }
        //   歌词item在歌词框的高度 = 歌词框的offsetTop - 歌词item的offsetTop
        //   console.log(currentLyric);
        if (lyricsArr[currentLyric - 1]) {
          let distance = lyricsArr[currentLyric - 1].offsetTop - lyrics.offsetTop;
          //   lyricsArr[currentLyric].scrollIntoView();
          lyrics.scrollTo({
            behavior: "smooth",
            top: distance - placeholderHeight
          });
        }
      },
      //获取当前歌词索引
      getCurrentLyricsIndex(currentTime) {
        let lyricsIndex = 0;
        this.lyric.some((item) => {
          if (lyricsIndex < this.lyric.length - 1) {
            if (currentTime > item[0]) {
              lyricsIndex += 1;
            }
            return currentTime <= item[0];
          }
        });
        // console.log(lyricsIndex);
        this.lyricsIndex = lyricsIndex;
      }
    },

    watch: {
      // 当vuex中的歌曲id发生变化时,需要重新获取评论和歌词
      "$store.state.musicInfo.musicId"(musicId) {
        // 清空歌词
        this.lyric = [[0, "正在加载歌词..."]];
        // 重置评论页数
        // this.currentCommentPage = 1;
        // 更新当前歌曲信息
        // this.musicInfo = this.$store.state.musicInfo.musicList[this.$store.state.musicInfo.currentIndex];
        // this.comment = {};
        // 优化性能,仅在卡片展示时才发送请求
        if (this.isMusicDetailCardShow) {
          this.getLyric(musicId);
          // this.getMusicComment(musicId);
        }
      },

      // 监听当前播放时间
      "$store.state.musicInfo.currentTime"(currentTime, lastTime) {
        // 如果两个时间间隔有1秒,则可得知进度条被拖动 需要重新校准歌词index
        // 当歌词数量大于1并且索引为零时,可能歌词位置差距较大,走这个if进行快速跳转
        // debugger
        let var1 = lastTime && Math.abs(currentTime - lastTime) >= 1;
        let var2 = this.lyricsIndex === 0 && this.lyric.length > 1;
        if ((var1 || var2) && this.lyric.length > 1) {
          // 处理播放时间跳转时歌词位置的校准
          this.getCurrentLyricsIndex(currentTime);
          // 滑动到当前歌词
          this.lyricScroll(this.lyricsIndex);
        }
        // 根据实时播放时间实现歌词滚动
        if (this.lyricsIndex < this.lyric.length) {
          if (currentTime >= this.lyric[this.lyricsIndex][0]) {
            this.lyricsIndex += 1;
            this.lyricScroll(this.lyricsIndex);
          }
        }
      },
      lyric(current) {
        console.log("获取了歌词");
        // 大于一秒，说明歌词在1秒后才请求成功 歌词可能不能马上跳转到当前时间 这里进行校准
        if (this.$store.state.currentTime > 1) {
          // 处理播放时间跳转时歌词位置的校准
          if (this.lyric.length > 1) {
            this.getCurrentLyricsIndex(this.$store.state.currentTime);
            this.$nextTick(() => {
              // 滑动到当前歌词
              this.lyricScroll(this.lyricsIndex);
            });
          }
        }
      }

    }
  }
</script>

<style scoped lang="less">
  @import "./css/music-detail-card.less";
</style>
