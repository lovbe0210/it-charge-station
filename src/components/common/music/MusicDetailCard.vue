<template>
  <div class="music-detail-card"
       :class="[$store.state.musicInfo.isMusicDetailCardShow ? '' : 'hide']"
       :style="`background-image:` +  showBackground">
    <div class="glassCard"></div>
    <div class="left">
      <div class="toList" @click="toPlayList()">
        <div :class="['iconfont',returnStatus == 0 ? 'return' : 'return']"
             :style="'color:' + (returnStatus == 0 ? '#515a6e' : '#515a6e')">返回
        </div>
      </div>
      <div class="discContainer">
        <div class="needle" :class="$store.state.musicInfo.isPlay ? 'needleRotate' : ''" ref="needle">
          <img src="https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/needle.png" alt=""/>
        </div>
        <!-- 通过音乐的加载时差删除discAnimation类名再添加,达到重置动画的效果 -->
        <div class="disc" :class="[$store.state.musicInfo.isPlay ? '' : 'pause',
                                   $store.state.musicInfo.isMusicLoad ? '' : 'discAnimation']" ref="disc">
          <img src="https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/disc.png" alt=""/>
          <img src="https://lovbe-blog.oss-cn-chengdu.aliyuncs.com/sysconfig/background/test.jpg" alt="" class="musicAvatar" v-if="!musicInfo.musicCover"
               ref="avatar"/>
          <img :src="musicInfo.musicCover" alt="" class="musicAvatar" v-else ref="avatar" crossorigin="anonymous"/>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title">
        <div class="musicInfo">
          <div class="music-name" :title="musicInfo.musicName">
            {{ musicInfo.musicName }}
          </div>
          <div class="singer" :title="musicInfo.musicName ? musicInfo.author : ''">
            {{ musicInfo.musicName ? musicInfo.author : ""}}
          </div>
        </div>
      </div>
      <div class="lyrics">
        <!-- 占位 -->
        <div class="placeholder"></div>
        <!-- 因为歌词快了一句,所以减1 -->
        <!-- 歌词item -->
        <div class="lyricsItem" v-for="(item, index) in lyric" :key="index"
             :class="lyricsIndex - 1 == index ? 'currentLyric' : ''"
             :style="lyricsIndex - 1 == index ? '' : `color: ` + background">
          {{ item[1] }}
        </div>
        <!-- 占位 -->
        <div class="placeholder"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import ColorThief from 'colorthief';
  import MusicApi from "@/api/MusicApi";
  import color from "../editor/packages/table/component/toolbar/color";

  let placeholderHeight = 0;
  export default {
    data() {
      return {
        musicInfo: {
          musicId: null,
          musicCover: null
        },
        // 是否删除卡片渲染的内容
        cleanCard: true,
        //   歌词
        lyric: [[0, "无限音乐，无限可能"]],
        // 当前歌词索引
        lyricsIndex: 0,
        background: "var(--dropdown-bg-color)",
        // 0播放界面1列表界面
        returnStatus: 1,
        // 当前歌曲id,用于判断是否已经计算过主题色
        currentMusicId: null
      }
    },
    computed: {
      color() {
        return color
      },
      // 是否显示歌曲详情卡片
      isMusicDetailCardShow() {
        return this.$store.state.musicInfo.isMusicDetailCardShow;
      },
      showBackground() {
        return "linear-gradient(to bottom," + this.background + ", white)";
      }
    },
    methods: {
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
        if (lyricsArr[currentLyric - 1]) {
          let distance = lyricsArr[currentLyric - 1].offsetTop - lyrics.offsetTop;
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
      getColor(imgEl) {
        let colorThief = new ColorThief();
        let themColor = colorThief.getColor(imgEl);
        return `rgb(${themColor.join(',')})`;
      },
      toPlayList() {
        this.$store.commit("updateMusicInfo", {"isMusicDetailCardShow": false})
      }
    },

    watch: {
      // 当vuex中的歌曲id发生变化时,需要重新获取评论和歌词
      "$store.state.musicInfo.musicId"(musicId) {
        if (musicId === null) {
          this.lyric = [[0, "无限音乐，无限可能"]];
          this.lyricsIndex = 0;
          this.musicInfo = {
            musicId: null,
            musicCover: null
          };
          // 重置背景色
          this.background = "var(--dropdown-bg-color)";
          this.returnStatus = 1;
          return;
        }
        // 清空歌词
        this.lyric = [[0, "无限音乐，无限可能"]];
        this.lyricsIndex = 0;
        // 更新当前歌曲信息
        this.musicInfo = this.$store.state.musicInfo.musicList[this.$store.state.musicInfo.currentIndex];
        // 优化性能,仅在卡片展示时才发送请求
        if (this.isMusicDetailCardShow) {
          MusicApi.getLyricById(musicId).then((data) => {
            this.lyric = data;
          })
          // 重置背景色
          this.background = "var(--dropdown-bg-color)";
          this.returnStatus = 1;
          setTimeout(() => {
            this.returnStatus = 0;
            this.background = this.getColor(this.$refs.avatar);
            this.currentMusicId = this.musicInfo.musicId;
          }, 2000);
        }
      },

      // 监听是否打开了播放页面
      "$store.state.musicInfo.isMusicDetailCardShow"(flag) {
        if (!flag) {
          return;
        }
        // 更新当前歌曲信息
        if (this.musicInfo.musicId === null) {
          return;
        }
        // this.musicInfo = this.$store.state.musicInfo.musicList[this.$store.state.musicInfo.currentIndex];
        let currentTime = this.$store.state.musicInfo.currentTime;
        if (this.lyric.length === 1) {
          MusicApi.getLyricById(this.musicInfo.musicId).then((data) => {
            this.lyric = data;
            // 歌词处理,直接跳转到当前播放歌词
            this.getCurrentLyricsIndex(currentTime);
            this.lyricScroll(this.lyricsIndex)
          });
        } else {
          // 判断进度条是否拖动，如果拖动也需要滑动歌词
          let lyricIndex = this.lyricsIndex;
          this.getCurrentLyricsIndex(currentTime);
          if (Math.abs(lyricIndex - this.lyricsIndex) > 1) {
            this.lyricScroll(this.lyricsIndex)
          }
        }

        // 重置背景色
        if (this.musicInfo.musicId !== this.currentMusicId) {
          this.background = "var(--dropdown-bg-color)";
          this.returnStatus = 1;
          setTimeout(() => {
            this.returnStatus = 0;
            let color = this.getColor(this.$refs.avatar);
            this.background = color;
            this.currentMusicId = this.musicInfo.musicId;
          }, 2000);
        }
      },

      // 监听当前播放时间
      "$store.state.musicInfo.currentTime"(currentTime, lastTime) {
        if (!this.isMusicDetailCardShow) {
          return;
        }
        // 如果两个时间间隔有1秒,则可得知进度条被拖动 需要重新校准歌词index
        // 当歌词数量大于1并且索引为零时,可能歌词位置差距较大,走这个if进行快速跳转
        let var1 = lastTime && Math.abs(currentTime - lastTime) >= 1;
        let var2 = this.lyricsIndex === 0 && this.lyric.length > 1;
        if ((var1 || var2) && this.lyric.length > 1) {
          // 根据播放时间跳转时歌词位置的校准
          // console.log("原歌词索引：", this.lyricsIndex)
          this.getCurrentLyricsIndex(currentTime);
          // console.log("更新后索引：", this.lyricsIndex)
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
      }
      // lyric(current) {
      //   // 大于一秒，说明歌词在1秒后才请求成功 歌词可能不能马上跳转到当前时间 这里进行校准
      //   if (this.$store.state.currentTime > 1) {
      //     // 处理播放时间跳转时歌词位置的校准
      //     if (this.lyric.length > 1) {
      //       this.getCurrentLyricsIndex(this.$store.state.currentTime);
      //       this.$nextTick(() => {
      //         // 滑动到当前歌词
      //         this.lyricScroll(this.lyricsIndex);
      //       });
      //     }
      //   }
      // }
    },
    mounted() {
      // 每次刷新页面都需要重新渲染
      if (this.isMusicDetailCardShow) {
        this.$store.commit("updateMusicInfo", {isMusicDetailCardShow: false})
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./css/music-detail-card.less";
</style>
