<template>
  <div ref="btoContainer"
       :class="[$store.state.musicInfo.isMusicDetailCardShow ? 'bottom-control detail-control' : 'bottom-control']">
    <audio
      :src="musicUrl"
      ref="audioPlayer"
      @play="changeState(true)"
      @pause="changeState(false)"
      @ended="changeMusic('next')"
      @timeupdate="timeupdate">
    </audio>
    <!-- 左边 -->
    <div class="left">
      <div class="avatar" @click="showDetailCard()">
        <img :src="musicInfo.musicCover" alt="" v-if="musicInfo.musicCover" :draggable="false"/>
        <img :src="require('@/assets/img/test.jpg')" alt="" v-else :draggable="false"/>
      </div>
      <div class="musicInfo">
        <div class="music-name"
             v-show="musicInfo.musicName"
             :title="musicInfo.musicName">
          {{ musicInfo.musicName }}
        </div>
        <div class="singer"
             v-show="musicInfo.author"
             :title="musicInfo.author"
             @click="goToSingerDetail">
          {{ musicInfo.author }}
        </div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="center">
      <div class="buttons">
        <span
          @click="playType = playType === 'listLoop' ? 'singleLoop' : playType === 'singleLoop' ? 'listRandom' : 'listLoop'">
          <span class="iconfont list-loop" v-show="playType == 'listLoop'"/>
          <span class="iconfont single-loop" v-show="playType == 'singleLoop'"/>
          <span class="iconfont list-random" v-show="playType == 'listRandom'"/>
        </span>
        <span @click="musicList.length != 0 ? changeMusic('pre') : ''">
          <span class="iconfont previous"/>
        </span>
        <span @click="musicList.length != 0 ? changePlayState() : ''">
          <span class="iconfont play" v-show="this.$store.state.musicInfo.isPlay"/>
          <span class="iconfont paused" v-show="!this.$store.state.musicInfo.isPlay"/>
        </span>
        <span @click="musicList.length != 0 ? changeMusic('next') : ''">
          <span class="iconfont next"/>
        </span>
        <!--        <span>
                  <span class="iconfont" :class="isUserLikeCurrentMusic ? 'like-yes' : 'like-no'"
                     @click="musicList.length != 0 ? likeIt() : ''"/>
                </span>-->
        <a-tooltip placement="top"
                   overlayClassName="volume-control-tooltip"
                   :getPopupContainer="()=>this.$refs.btoContainer">
          <template slot="title">
            <input type="range" min=0 max=100 step=2 v-model="volume" @change="changeVolume"
                   class="volume-input"/>
          </template>
          <span>
            <span class="iconfont" :class="isMuted ? 'volume-close' : 'volume-open'" id="volumeController"
                  @click="changeVolumeState()"/>
          </span>
        </a-tooltip>
      </div>
      <!-- 进度条 -->
      <div class="progressBar">
        <span class="currentTime">{{ currentTime }}</span>
        <div class="progress-wrapp">
          <div class="totalProgress" @click="changeProgress">
            <div class="currentProgress" :style="'width:' + timeProgress + '%'"/>
          </div>
        </div>
        <span class="totalTime">
          {{ handleMusicTime(musicInfo.duration) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {handleMusicTime, returnSecond} from "@/utils/utils"
import MusicApi from '@/api/MusicApi'
import preferenceApi from "../../../api/PreferenceApi";

export default {
  name: "BottomControl",
  data() {
    return {
      musicInfo: {
        // 页面需要使用v-if判断，所以先赋给默认值
        musicName: "it充电站",
        musicId: null,
        author: "布衣草人",
        musicCover: null,
        duration: "00:00"
      },
      musicUrl: null,
      // 进度条的位置
      timeProgress: 0,
      // 是否准备好可以播放
      readyState: false,
      // 是否静音
      isMuted: false,
      // 用户的喜欢音乐列表
      likeMuiscList: [],
      // 用户是否喜欢当前音乐
      isUserLikeCurrentMusic: false
    };
  },
  methods: {
    handleMusicTime,
    returnSecond,
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
      // 如果当前播放id为空，则无法播放
      if (this.musicId === null) {
        return;
      }
      let readyState = this.$refs.audioPlayer?.readyState;
      if (readyState === 4) {
        // 主流浏览器已经禁用了自动播放，所以在初始化时播放会报错
        this.$refs.audioPlayer.play().catch(e => {
          setTimeout(() => {
            console.log("等待用户与页面交互，0.5s后再次尝试播放。。。")
            this.playMusic();
          }, 500)
        })
      } else {
        setTimeout(() => {
          console.log("等待播放状态就绪，1s后再次尝试播放。。。")
          this.playMusic();
        }, 1000)
      }
    },
    // 暂停音乐的函数
    pauseMusic() {
      this.$refs.audioPlayer.pause();
    },
    // audio开始或暂停播放的回调  在vuex中改变状态
    changeState(state) {
      this.$store.commit("updateMusicInfo", {isPlay: state});
    },
    // 切歌函数
    changeMusic(type) {
      if (this.musicList.length === 0) {
        return;
      }
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
        this.$store.commit("updateMusicInfo", {currentIndex: preIndex, musicId: this.musicList[preIndex].musicId});

        // 下一首
      } else if (type === "next") {
        let currentMusicIndex = this.currentMusicIndex;
        let nextIndex;
        if (this.playType === "singleLoop" || this.musicList.length === 1) {
          // 如果是单曲循环，则直接重新开始播放就行, 还有一种情况，列表中只有一首歌，此时也相当于单曲循环
          this.pauseMusic();
          this.$refs.audioPlayer.currentTime = 0;
          this.playMusic();
          return;
        } else if (this.playType === "listLoop") {
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
        }
        this.$store.commit("updateMusicInfo", {currentIndex: nextIndex, musicId: this.musicList[nextIndex].musicId});
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
      return this.musicInfo.duration / 1000;
    },
    currentTime: {
      get() {
        return handleMusicTime(this.$store.state.musicInfo.currentTime);
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
    musicId() {
      return this.$store.state.musicInfo.musicId;
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
    },
    loginStatus() {
      let userInfo = this.$store.state.userInfo
      return userInfo !== null && userInfo.token?.length === 32
    }
  },
  mounted() {
    // 初始化音量
    this.changeVolume();
    if (this.musicList.length === 0 || this.musicId === null) {
      return;
    }

    // 初始化当前播放的歌曲信息
    this.musicInfo = this.musicList[this.currentMusicIndex];
    // 更新musicId
    this.$store.commit("updateMusicInfo", {musicId: this.musicInfo.musicId})
    MusicApi.getMusicUrlById(this.musicInfo.musicId).then((data) => {
      this.musicUrl = data;
      // 初始化播放时间和vuex中的保持一致
      this.$refs.audioPlayer.currentTime = this.$store.state.musicInfo.currentTime;
    });
    // 判断用户是否喜欢当前音乐
    // this.getIsUserLikeCurrentMusic();
    let play = !this.$refs.audioPlayer.paused;
    if (this.isPlay !== play && !play) {
      this.playMusic();
    }
  },
  watch: {
    // 监听vuex中musicId的变化
    "$store.state.musicInfo.musicId"(newVal) {
      if (newVal === null) {
        // 停止播放
        this.pauseMusic();
        // 数据初始化
        this.musicInfo = {
          musicName: "it充电站",
          musicId: null,
          author: "布衣草人",
          musicCover: null,
          duration: "00:00"
        }
        this.timeProgress = 0;
        this.$refs.audioPlayer.currentTime = 0;
        return;
      }
      // 先暂停当前播放的音乐
      this.pauseMusic();
      // 根据list中的索引直接获取歌曲信息（这就要求其他地方必须同时更新currentIndex）
      this.musicInfo = this.musicList[this.currentMusicIndex]
      // 获取歌曲播放url
      MusicApi.getMusicUrlById(newVal).then((data) => {
        this.musicUrl = data;
      });
      // 判断用户是否喜欢当前音乐
      this.getIsUserLikeCurrentMusic();
      // 播放时间重置，开始播放(如果首次进来时则不需要播放)
      this.$refs.audioPlayer.currentTime = 0;
      this.playMusic();
      // 播放器状态入库
      if (this.loginStatus) {
        let musicPlay = {
          musicId: newVal,
          currentVolume: this.volume,
          playType: this.playType
        }
        preferenceApi.updatePreferenceSetting({musicPlay});
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "./css/bottom-controller.less";
</style>
