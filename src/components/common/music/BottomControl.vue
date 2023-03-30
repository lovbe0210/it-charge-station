<template>
  <div class="bottom-control">
    <audio
      :src="musicUrl ? musicUrl : require('@/assets/Love Story.mp3')"
      ref="audioPlayer"
      @play="changeState(true)"
      @pause="changeState(false)"
      @ended="changeMusic('next')"
      @timeupdate="timeupdate">
    </audio>
    <!-- 左边 -->
    <div class="left">
      <div class="avatar" @click="showDetailCard()">
        <img :src="musicInfo.al.picUrl" alt="" v-if="musicInfo.al.picUrl" :draggable="false"/>
        <img :src="require('@/assets/img/test.jpg')" alt="" v-else :draggable="false"/>
      </div>
      <div class="musicInfo">
        <div class="musicName" v-show="musicInfo.name">
          {{ musicInfo.name }}
        </div>
        <div class="singer" v-show="musicInfo.ar[0].name" @click="goToSingerDetail">
          {{ musicInfo.ar[0].name }}
        </div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="center">
      <div class="buttons">
        <span
          @click="playType = playType === 'listLoop' ? 'singleLoop' : playType === 'singleLoop' ? 'listRandom' : 'listLoop'">
          <i class="iconfont icon-list-loop" v-show="playType == 'listLoop'"></i>
          <i class="iconfont icon-single-loop" v-show="playType == 'singleLoop'"></i>
          <i class="iconfont icon-list-random" v-show="playType == 'listRandom'"></i>
        </span>
        <span @click="musicList.length != 0 ? changeMusic('pre') : ''">
          <i class="iconfont icon-previous"></i>
        </span>
        <span @click="musicList.length != 0 ? changePlayState() : ''">
          <i class="iconfont icon-play" v-show="this.$store.state.musicInfo.isPlay"></i>
          <i class="iconfont icon-paused" v-show="!this.$store.state.musicInfo.isPlay"></i>
        </span>
        <span @click="musicList.length != 0 ? changeMusic('next') : ''">
          <i class="iconfont icon-next"></i>
        </span>
        <span>
          <i class="iconfont" :class="isUserLikeCurrentMusic ? 'icon-like-yes' : 'icon-like-no'"
             @click="musicList.length != 0 ? likeIt() : ''"></i>
        </span>
        <span id="volumeController">
              <i class="iconfont" :class="isMuted ? 'icon-volume-close' : 'icon-volume-open'"
                 @click="changeVolumeState()"></i>
        </span>
        <b-tooltip target="volumeController" triggers="hover" custom-class="volume-controller" placement="top"
                   container="volumeController">
          <input type="range" min=0 max=100 step=10 v-model="volume" @change="changeVolume"
                 class="volume-input"/>
        </b-tooltip>
      </div>
      <!-- 进度条 -->
      <div class="progressBar">
        <span class="currentTime">{{ currentTime | handleMusicTime }}</span>
        <div class="progress-wrapp">
          <div class="totalProgress" @click="changeProgress">
            <div class="currentProgress" :style="'width:' + timeProgress + '%'"/>
          </div>
        </div>
        <span class="totalTime">{{ musicInfo.dt }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {handleMusicTime, returnSecond} from "@/utils/utils"
  import MusicApi from '@/utils/MusicApi'

  export default {
    name: "BottomControl",
    data() {
      return {
        musicInfo: {
          // 页面需要使用v-if判断，所以先赋给默认值
          name: null,
          id: null,
          al: {
            picUrl: null
          },
          ar: [{
            name: null
          }],
          dt: "--:--"
        },
        musicUrl: null,
        // 进度条的位置
        timeProgress: 0,
        // 音量

        // 是否静音
        isMuted: false,
        // 用户的喜欢音乐列表
        likeMuiscList: [],
        // 用户是否喜欢当前音乐
        isUserLikeCurrentMusic: false
      };
    },
    methods: {
      // 请求
      // 请求歌曲的url
      async getmusicInfo(id) {
        this.$store.commit("updateMusicLoadState", true);
        let result = await this.$request("/song/url", {id});
        // console.log(musicInfo);
        // console.log(result);
        // 获取不到url
        if (result.data.data[0].url == null) {
          this.$message.error("该歌曲暂无版权，将为您播放下一首歌曲");
          this.changeMusic("next");
          return;
        }
        this.musicUrl = result.data.data[0].url;
        this.$store.commit("updateMusicLoadState", false);
      },
      // 喜欢该音乐
      // like参数:是否喜欢该音乐
      async likeMusic(id, like) {
        let res = await this.$request("/like", {
          id,
          like
        });
        if (res.data.code === 200) {
          console.log("喜欢操作成功");
        } else {
          console.log("喜欢操作失败");
        }
      },
      // 获取喜欢音乐列表
      async getLikeMusicList() {
        // 获取时间戳
        var timestamp = Date.parse(new Date());
        // 因为喜欢音乐列表实时性较高，为了避免接口缓存，在请求后面加上一个时间戳
        let res = await this.$request("/likelist", {
          uid: window.localStorage.getItem("userId"),
          timestamp
        });
        this.likeMuiscList = res.data.ids;
        // 将喜欢列表提交到vuex 供歌单中显示喜欢使用 （因为性能问题暂时没做）
        this.$store.commit("updataLikeMuiscList", this.likeMuiscList);
      },

      // 点击播放键的回调
      changePlayState() {
        this.$store.state.musicInfo.isPlay ? this.pauseMusic() : this.playMusic();
      },
      // 播放音乐的函数
      playMusic() {
        // 主流浏览器已经禁用了自动播放，所以在初始化时播放会报错
        this.$refs.audioPlayer.play().catch(e => {
          setTimeout(() => {
            this.playMusic();
          }, 1000)
        })
      },
      // 暂停音乐的函数
      pauseMusic() {
        this.$refs.audioPlayer.pause();
      },
      // audio开始或暂停播放的回调  在vuex中改变状态
      changeState(state) {
        this.$store.commit("updateMusicInfo", {isPlay: state});
      },
      // 根据id找到 musicList中对应的musicInfo
      getmusicInfoFromMusicList() {
        // console.log(this.musicList);
        // this.musicList.forEach((item, index) => {
        //   // console.log(index);
        //   if (item.id == this.$store.state.musicId) {
        //     // 记录当前音乐的index
        //     this.currentMusicIndex = index;
        //     // 将索引传至vuex
        //     this.$store.commit("updateCurrentIndex", index);
        //     this.musicInfo = item;
        //     // 直接从audio标签中的duration属性拿时长会有请求时差问题，所以直接在musicInfo中拿
        //     this.duration = this.musicList[index].dt;
        //   }
        // });

        let index = this.musicList.findIndex(
          (item) => item.id === this.$store.state.musicInfo.musicId
        );
        console.log(index);
        if (index !== -1) {
          // 记录当前音乐的index
          this.currentMusicIndex = index;
          // 将索引传至vuex
          this.$store.commit("updateCurrentIndex", index);
          this.musicInfo = this.musicList[index];
          // 直接从audio标签中的duration属性拿时长会有请求时差问题，所以直接在musicInfo中拿
          this.duration = this.musicList[index].dt;
        }
      },
      // 切歌函数
      changeMusic(type) {
        // 上一首
        if (type === "pre") {
          let currentMusicIndex = this.currentMusicIndex;
          let preIndex;
          if (this.playType === "listLoop") {
            preIndex = currentMusicIndex - 1 < 0 ? this.musicList.length - 1 : currentMusicIndex - 1;
          } else if (this.playType === "listRandom") {
            if (this.musicList.length === 1) {
              preIndex = currentMusicIndex;
            } else {
              preIndex = currentMusicIndex;
              while (preIndex === currentMusicIndex) {
                preIndex = Math.floor(Math.random() * this.musicList.length);
              }
            }
          } else {
            // 如果是单曲循环，则直接从头开始播放就行
            this.pauseMusic();
            this.$refs.audioPlayer.currentTime = 0;
            this.playMusic();
          }
          this.$store.commit("updateMusicInfo", {currentIndex: preIndex, musicId: this.musicList[preIndex].id});

          // 下一首
        } else if (type === "next") {
          let currentMusicIndex = this.currentMusicIndex;
          let nextIndex;
          if (this.playType === "listLoop") {
            nextIndex = currentMusicIndex + 1 === this.musicList.length ? 0 : currentMusicIndex + 1;
          } else if (this.playType === "listRandom") {
            if (this.musicList.length === 1) {
              nextIndex = currentMusicIndex;
            } else {
              nextIndex = currentMusicIndex;
              while (nextIndex === currentMusicIndex) {
                nextIndex = Math.floor(Math.random() * this.musicList.length);
              }
            }
          } else {
            // 如果是单曲循环，则直接重新开始播放就行
            this.pauseMusic();
            this.$refs.audioPlayer.currentTime = 0;
            this.playMusic();
          }
          this.$store.commit("updateMusicInfo", {currentIndex: nextIndex, musicId: this.musicList[nextIndex].id});
        }
      },
      // 当前播放时间位置
      timeupdate() {
        try {
          // 节流sd
          let time = this.$refs.audioPlayer.currentTime;
          // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
          this.currentTime = time;
          // 计算进度条的位置
          this.timeProgress = (time / this.duration) * 100;
        } catch (e) {
          // audio对象还没初始化完
        }
      },
      // 更改进度条的回调
      changeProgress(e) {
        //总进度条的实际长度
        let totawidth = e.currentTarget.offsetWidth;
        //鼠标的x坐标(相对于div内部的坐标)
        let mouseX = e.offsetX;
        // 改变audio的实际当前播放时间
        let currentTime = Math.floor(mouseX / totawidth * this.duration);
        this.$refs.audioPlayer.currentTime = currentTime;
      },
      // 拖动音量条的回调
      changeVolume() {
        // 改变audio的音量
        this.$refs.audioPlayer.volume = this.volume / 100;
        if (this.isMuted && this.volume > 0) {
          this.isMuted = false;
        } else if (this.volume === "0" && this.isMuted === false) {
          this.isMuted = true;
        }
      },
      // 点击小喇叭的回调 （切换静音状态）
      changeVolumeState() {
        if (!this.isMuted) {
          this.$refs.audioPlayer.volume = 0;
        } else {
          this.$refs.audioPlayer.volume = this.volume / 100;
        }
        this.isMuted = !this.isMuted;
      },

      // 判断用户是否喜欢该音乐
      getIsUserLikeCurrentMusic() {
        this.isUserLikeCurrentMusic = this.likeMuiscList.find(
          (item) => item === this.$store.state.musicId
        );
      },
      // 用户点击喜欢该音乐的回调
      async likeIt() {
        let userInfo = this.$store.state.userInfo
        if (userInfo == null || userInfo.token == null || userInfo.token.length !== 32) {
          this.$Message.error("请先登录!");
          return;
        }
        this.isUserLikeCurrentMusic = !this.isUserLikeCurrentMusic;
        await this.likeMusic(
          this.$store.state.musicId,
          this.isUserLikeCurrentMusic
        );
        await this.getLikeMusicList();
      },

      // 点击歌手名跳转至歌手页面的回调
      goToSingerDetail() {
        if (this.$route.path === `/singerDetail/${this.musicInfo.ar[0].id}`) {
          this.$router.push({
            name: "singerDetail",
            params: {id: this.musicInfo.ar[0].id}
          })
        }
        if (this.$store.state.ismusicInfoCardShow === true) {
          this.$store.state.commit("changemusicInfoCardState", false);
        }
      },

      // 是否展示播放页面
      showDetailCard() {
        if (this.musicInfo.name !== null) {
          this.$store.commit('updateMusicInfo', {'isMusicDetailCardShow': true})
        }
      }
    },
    computed: {
      duration() {
        return returnSecond(this.musicInfo.dt);
      },
      currentTime: {
        get() {
          return this.$store.state.musicInfo.currentTime;
        },
        set(time) {
          this.$store.commit("updateMusicInfo", {currentTime: time});
        }
      },
      musicList() {
        return this.$store.state.musicInfo.musicList;
      },
      volume: {
        get() {
          return this.$store.state.musicInfo.currentVolume;
        },
        set(value) {
          this.$store.commit("updateMusicInfo", {currentVolume: value});
        }
      },
      currentMusicIndex() {
        return this.$store.state.musicInfo.currentIndex;
      },
      isPlay() {
        return this.$store.state.musicInfo.isPlay;
      },
      playType: {
        get() {
          return this.$store.state.musicInfo.playType;
        },
        set(value) {
          this.$store.commit("updateMusicInfo", {playType: value});
        }
      }
    },
    mounted() {
      // 初始化音量
      this.changeVolume();
      // 初始化当前播放的歌曲信息
      this.musicInfo = (this.musicList && this.musicList.length > 0) ? this.musicList[this.currentMusicIndex] : {};
      MusicApi.getMusicUrlById(this, this.musicInfo.id).then((data) => {
        this.musicUrl = data;
      });
      // 判断用户是否喜欢当前音乐
      this.getIsUserLikeCurrentMusic();
      // 更新musicId
      this.$store.commit("updateMusicInfo", {musicId: this.musicInfo.id})
      // 初始化播放状态和时间和vuex中的保持一致
      this.$refs.audioPlayer.currentTime = this.$store.state.musicInfo.currentTime;
      let play = !this.$refs.audioPlayer.paused;
      if (this.isPlay !== play) {
        play ? this.pauseMusic() : this.playMusic();
      }
    },
    watch: {
      // 监听vuex中musicId的变化
      "$store.state.musicInfo.musicId"(newVal, oldVal) {
        if (oldVal !== null) {
          // 先暂停当前播放的音乐
          this.pauseMusic();
          // 根据list中的索引直接获取歌曲信息（这就要求其他地方必须同时更新currentIndex）
          this.musicInfo = this.musicList[this.currentMusicIndex]
          // 获取歌曲播放url
          MusicApi.getMusicUrlById(this, newVal).then((data) => {
            this.musicUrl = data;
          });
          // 判断用户是否喜欢当前音乐
          this.getIsUserLikeCurrentMusic();
          // 播放时间重置，开始播放(如果首次进来时则不需要播放)
          this.$refs.audioPlayer.currentTime = 0;
          this.playMusic();
        }
      },

      // 监听是否登陆且绑定了网易云账号 TODO
      "$store.state.isLogin"(current) {
        if (current) {
          this.getLikeMusicList();
        } else {
          // 清空喜欢列表
          this.likeMuiscList = [];
        }
      }
    },
    filters: {
      handleMusicTime
    }
  };
</script>

<style scoped lang="less">
  @import "./css/bottom-controller.less";
</style>
