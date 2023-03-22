<template>
  <div class="music-detail-card" :class="[isMusicDetailCardShow ? '' : 'hide', backgroundMode ? '' : '',]"
       :style="`background-image:` +  background">
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
          <img :src="require('@/assets/img/test.jpg')" alt="" class="musicAvatar" v-if="!musicInfo.al" ref="avatar"/>
          <img :src="musicInfo.al.picUrl" alt="" class="musicAvatar" v-else ref="avatar"/>
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
  </div>

</template>

<script>
  let placeholderHeight = 0;
  export default {
    data() {
      return {
        musicInfo: {
          "name": "Love Story",
          "id": 19292984,
          "pst": 0,
          "t": 0,
          "ar": [{
            "id": 44266,
            "name": "Taylor Swift",
            "tns": [],
            "alias": []
          }],
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
            "picUrl": "https://p2.music.126.net/KurKrZ-dMmviArT5lM2RCQ==/18517974836953202.jpg",
            "tns": [],
            "pic_str": "18517974836953202",
            "pic": 18517974836953200
          },
          "dt": "03:56",
          "h": {
            "br": 320000,
            "fid": 0,
            "size": 9452191,
            "vd": -65540,
            "sr": 44100
          },
          "m": {
            "br": 192000,
            "fid": 0,
            "size": 5671332,
            "vd": -63094,
            "sr": 44100
          },
          "l": {
            "br": 128000,
            "fid": 0,
            "size": 3780902,
            "vd": -61573,
            "sr": 44100
          },
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
          "awardTags": null,
          "single": 0,
          "noCopyrightRcmd": null,
          "rtype": 0,
          "rurl": null,
          "mst": 9,
          "cp": 7003,
          "mv": 503185,
          "publishTime": 1230739200000
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
        backgroundMode: false,
        background: "linear-gradient(to bottom, #f1b7f1, #FEFEFE);"
      }
    },
    methods: {
      //请求并处理歌词数据
      async getLyric(id) {
        let res = await this.$request({
          url: "/lyric?id=19292984",
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
        this.lyricsIndex = lyricsIndex;
      },
      // 获取图片主题色
      getColor() {
        debugger
        let avatar = this.$refs.avatar;
        let arr = [];
        avatar.onload = () => {
          const w = this.width;
          const h = this.height;
          let canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          let context = canvas.getContext('2d');
          context.drawImage(this, 0, 0)
          let pxArray = context.getImageData(0, 0, w, h);
          pxArray = Array.from(pxArray);

          const colorList = {};
          let i = 0;
          while (i < pxArray.length) {
            const r = pxArray[i];
            const g = pxArray[i + 1];
            const b = pxArray[i + 2];
            const a = pxArray[i + 3];
            i = i + 4;
            const key = [r, g, b, a].join(',')
            key in colorList ? ++context[key] : (colorList[key] = 1)
          }

          for (let key in colorList) {
            arr.push({
              rgba: `rgba(${key})`,
              num: colorList[key]
            })
          }
          arr = arr.sort((a, b) => b.num - a.num)
          console.log(arr)
        }
        return arr;
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
        if (this.isMusicDetailCardShow && this.lyric.length === 1) {
          this.getLyric(musicId);
          // this.getMusicComment(musicId);
        }

        // 重置背景色
        let color = this.getColor();
        console.log(color)
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
