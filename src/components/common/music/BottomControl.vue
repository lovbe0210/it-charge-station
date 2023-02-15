<template>
  <div class="bottom-control">
    <audio
      :src="require('@/assets/Love Story.mp3')"
      ref="audioPlayer"
      autoplay
      @play="changeState(true)"
      @pause="changeState(false)"
      @ended="changeMusic('next')"
      @timeupdate="timeupdate"
      loop></audio>
    <!-- 左边 -->
    <div class="left">
      <div class="avatar" @click="$store.commit('changeMusicDetailCardState')">
        <img :src="musicDetail.al.picUrl" alt="" v-if="musicDetail.al" :draggable="false"/>
        <img :src="require('@/assets/img/test.jpg')" alt="" v-else :draggable="false"/>
      </div>
      <div class="musicInfo">
        <div class="musicName" v-show="musicDetail && musicDetail.name">
          {{ musicDetail.name }}
        </div>
        <div class="singer" v-show="musicDetail && musicDetail.name" @click="goToSingerDetail">
          {{ musicDetail.ar[0].name }}
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
          <i class="iconfont icon-play" v-show="this.$store.state.musicPlay.isPlay"></i>
          <i class="iconfont icon-paused" v-show="!this.$store.state.musicPlay.isPlay"></i>
        </span>
        <span @click="musicList.length != 0 ? changeMusic('next') : ''">
          <i class="iconfont icon-next"></i>
        </span>
        <span>
          <i class="iconfont" :class="isUserLikeCurrentMusic ? 'icon-like-yes' : 'icon-like-no'"
             @click="musicList.length != 0 ? likeIt() : ''"></i>
        </span>
      </div>
      <!-- 进度条 -->
      <div class="progressBar">
        <span class="currentTime">{{ currentTime | handleMusicTime }}</span>
        <!-- :value 是单向的  要实现双向要v-model -->
        <Progress class="progressSlider" :percent="timeProgress" :stroke-width="5" stroke-color="#FF4E4E" hide-info/>
        <!--        <el-slider class="progressSlider" v-model="timeProgress"-->
        <!--                   :show-tooltip="false" @change="changeProgress"-->
        <!--                   :disabled="musicList.length == 0"></el-slider>-->
        <span class="totalTime">{{ duration }}</span>
      </div>
    </div>
    <!-- 右边 -->
    <!--    <div class="right">-->
    <!--      <div class="volumeControl">-->
    <!--        <i class="iconfont icon-yinliang" @click="changeMutedState"></i>-->
    <!--        <el-slider-->
    <!--          class="volumeSlider"-->
    <!--          v-model="volume"-->
    <!--          @input="changeVolume"-->
    <!--          :show-tooltip="false"-->
    <!--        ></el-slider>-->
    <!--      </div>-->
    <!--      <div class="playList" @click="openDrawer">-->
    <!--        <i class="iconfont icon-bofangliebiao"></i>-->
    <!--      </div>-->
    <!--    </div>-->
    <!-- 抽屉 -->
    <!--    <el-drawer :visible.sync="drawer" :with-header="false" width="300">-->
    <!--      <div class="drawerHeader">总{{ musicList.length }}首</div>-->
    <!--      <el-table-->
    <!--        :data="musicList"-->
    <!--        stripe-->
    <!--        style="width: 100%"-->
    <!--        :show-header="false"-->
    <!--        @row-dblclick="clickRow"-->
    <!--        highlight-current-row-->
    <!--        lazy-->
    <!--      >-->
    <!--        <el-table-column prop="name" width="150px"></el-table-column>-->
    <!--        <el-table-column prop="ar[0].name" width="80px"></el-table-column>-->
    <!--        <el-table-column prop="dt" width="70px"></el-table-column>-->
    <!--      </el-table>-->
    <!--    </el-drawer>-->
  </div>
</template>

<script>
  import {handleMusicTime, returnSecond} from "@/utils/utils";

  let lastSecond = 0;
  // 总时长的秒数
  let durationNum = 0;
  // 保存当前音量
  let volumeSave = 0;
  // 当前音乐类型，用于下载
  let musicType = "";

  export default {
    name: "BottomControl",
    data() {
      return {
        // musicDetail: {},
        musicDetail: {
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
        musicUrl: "",
        musicList: [this.musicDetail],
        currentMusicIndex: 0,
        drawer: false,
        // 音乐总时长
        duration: "03:56",
        // 当前播放时间位置
        currentTime: 0,
        // 进度条的位置
        timeProgress: 0,
        // 音量
        volume: 30,
        // 是否静音
        isMuted: false,
        // 抽屉是否被打开过（如果没打开过，里面的数据是不会渲染的）
        hasDrawerOpend: false,
        // 用户的喜欢音乐列表
        likeMuiscList: [],
        // 用户是否喜欢当前音乐
        isUserLikeCurrentMusic: false,
        // 播放模式（顺序播放，随机播放）
        // listLoop singleLoop listRandom
        playType: "singleLoop"
      };
    },
    methods: {
      // 请求
      // 请求歌曲的url
      async getMusicDetail(id) {
        this.$store.commit("updateMusicLoadState", true);
        let result = await this.$request("/song/url", {id});
        // console.log(musicDetail);
        // console.log(result);
        // 获取不到url
        if (result.data.data[0].url == null) {
          this.$message.error("该歌曲暂无版权，将为您播放下一首歌曲");
          this.changeMusic("next");
          return;
        }
        this.musicUrl = result.data.data[0].url;
        musicType = result.data.data[0].type.toLowerCase();
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
        this.$store.state.musicPlay.isPlay ? this.pauseMusic() : this.playMusic();
      },
      // 播放音乐的函数
      playMusic() {
        this.$refs.audioPlayer.play();
      },
      // 暂停音乐的函数
      pauseMusic() {
        this.$refs.audioPlayer.pause();
      },
      // audio开始或暂停播放的回调  在vuex中改变状态
      changeState(state) {
        this.$store.commit("changePlayState", state);
      },
      // 根据id找到 musicList中对应的musicDetail
      getMusicDetailFromMusicList() {
        // console.log(this.musicList);
        // this.musicList.forEach((item, index) => {
        //   // console.log(index);
        //   if (item.id == this.$store.state.musicId) {
        //     // 记录当前音乐的index
        //     this.currentMusicIndex = index;
        //     // 将索引传至vuex
        //     this.$store.commit("updateCurrentIndex", index);
        //     this.musicDetail = item;
        //     // 直接从audio标签中的duration属性拿时长会有请求时差问题，所以直接在musicInfo中拿
        //     this.duration = this.musicList[index].dt;
        //   }
        // });

        let index = this.musicList.findIndex(
          (item) => item.id === this.$store.state.musicPlay.musicId
        );
        console.log(index);
        if (index !== -1) {
          // 记录当前音乐的index
          this.currentMusicIndex = index;
          // 将索引传至vuex
          this.$store.commit("updateCurrentIndex", index);
          this.musicDetail = this.musicList[index];
          // 直接从audio标签中的duration属性拿时长会有请求时差问题，所以直接在musicInfo中拿
          this.duration = this.musicList[index].dt;
        }
      },
      // 切歌函数
      changeMusic(type, id) {
        if (type === "click") {
          // 点击抽屉row进行切歌
          this.$store.commit("updateMusicId", id);
        } else if (type === "pre") {
          let currentMusicIndex = this.currentMusicIndex;
          let preIndex;
          if (this.playType === "order") {
            preIndex =
              currentMusicIndex - 1 < 0
                ? this.musicList.length - 1
                : currentMusicIndex - 1;
          } else if (this.playType === "random") {
            if (this.musicList.length === 1) {
              preIndex = currentMusicIndex;
            } else {
              // Math.floor(Math.random()*10); 可均衡获取0到9的随机整数。
              preIndex = currentMusicIndex;
              while (preIndex === currentMusicIndex) {
                preIndex = Math.floor(Math.random() * this.musicList.length);
              }
            }
          }
          console.log(this.musicList[preIndex].id);
          this.$store.commit("updateMusicId", this.musicList[preIndex].id);
        } else if (type === "next") {
          let currentMusicIndex = this.currentMusicIndex;
          let nextIndex;
          if (this.playType === "order") {
            nextIndex =
              currentMusicIndex + 1 === this.musicList.length
                ? 0
                : currentMusicIndex + 1;
          } else if (this.playType === "random") {
            if (this.musicList.length === 1) {
              nextIndex = currentMusicIndex;
            } else {
              // Math.floor(Math.random()*10); 可均衡获取0到9的随机整数。
              nextIndex = currentMusicIndex;
              while (nextIndex === currentMusicIndex) {
                nextIndex = Math.floor(Math.random() * this.musicList.length);
              }
            }
          }
          // console.log(this.musicList[nextIndex].id);
          this.$store.commit("updateMusicId", this.musicList[nextIndex].id);
        }
      },
      // 双击抽屉列表中的row的回调
      clickRow(row) {
        // console.log(row.id);
        this.changeMusic("click", row.id);
      },
      // 当前播放时间位置
      timeupdate() {
        // console.log(e);
        // console.log(this.$refs.audioPlayer.currentTime);
        // 节流
        let time = this.$refs.audioPlayer.currentTime;
        // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
        // this.$store.commit("updateCurrentTime", time);
        // time = Math.floor(time);
        if (time !== lastSecond) {
          // console.log(time);
          lastSecond = time;
          this.currentTime = time;
          // 计算进度条的位置
          // console.log('time: ', time, 'durationNum: ', this.durationTotalSecond)
          // this.timeProgress = Math.floor((time / this.durationTotalSecond) * 100);
          this.timeProgress = (time / this.durationTotalSecond) * 100;
          // console.log(this.timeProgress);
        }
      },
      // 拖动进度条的回调
      changeProgress(e) {
        // console.log(e);
        // 修改当前播放时间
        this.currentTime = Math.floor((e / 100) * durationNum);
        // 改变audio的实际当前播放时间
        this.$refs.audioPlayer.currentTime = this.currentTime;
      },
      // 拖动音量条的回调
      changeVolume(e) {
        // 改变audio的音量
        // input事件 实时触发
        this.$refs.audioPlayer.volume = e / 100;
        if (this.isMuted && e > 0) {
          this.isMuted = false;
        } else if (e === 0 && this.isMuted === false) {
          this.isMuted = true;
        }
      },
      // 点击小喇叭的回调 （切换静音状态）
      changeMutedState() {
        if (this.isMuted) {
          this.volume = volumeSave;
        } else {
          volumeSave = this.volume;
          this.volume = 0;
        }
        console.log(volumeSave, this.isMuted);
        this.isMuted = !this.isMuted;
      },
      // 操作drawerList中DOM的函数
      handleDrawerListDOM(currentIndex, lastIndex) {
        // 目前没什么好思路 直接操作原生DOM
        this.$nextTick(() => {
          let tableRows = document
            .querySelector(".bottomControl")
            .querySelectorAll(".el-table__row");
          // // 直接修改dom样式的颜色无效  可能是因为第三方组件 style scoped的原因
          // // 通过引入全局样式解决
          if (tableRows[currentIndex]) {
            tableRows[currentIndex].children[0]
              .querySelector(".cell")
              .classList.add("currentRow");
            tableRows[currentIndex].children[1]
              .querySelector(".cell")
              .classList.add("currentRow");
          }
          if (
            (lastIndex && lastIndex !== -1 && tableRows[lastIndex]) ||
            lastIndex === 0
          ) {
            // 将上一首的类名删掉
            tableRows[lastIndex].children[0]
              .querySelector(".cell")
              .classList.remove("currentRow");
            tableRows[lastIndex].children[1]
              .querySelector(".cell")
              .classList.remove("currentRow");
          }
        });
      },
      // 点击打开抽屉的回调
      openDrawer() {
        // 关闭也是这个回调，所以直接取反
        this.drawer = !this.drawer;
        this.hasDrawerOpend = true;
        this.handleDrawerListDOM(this.currentMusicIndex);
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

      // 点击下载按钮的回调
      downloadCurrentMusic() {
        // console.log("download");
        console.log(this.musicDetail, this.musicUrl);

        // 匹配资源的域名
        let url = this.musicUrl.match(/http.*?\.net/);
        // 匹配域名名称，并匹配对应的代理
        let serve = url[0].match(/http:\/(\S*).music/)[1];
        if (
          serve !== "/m7" &&
          serve !== "/m701" &&
          serve !== "/m8" &&
          serve !== "/m801"
        ) {
          // 没有对应的代理
          this.$message.error("匹配不到对应的代理,下载失败!");
          return;
        }
        // 截取后面的参数
        let params = this.musicUrl.slice(url[0].length);

        let downloadMusicInfo = {
          url: serve + params,
          name:
            this.musicDetail.name +
            " - " +
            this.musicDetail.ar[0].name +
            "." +
            musicType
        };

        console.log(downloadMusicInfo);
        this.$store.commit("updateDownloadMusicInfo", downloadMusicInfo);
      },

      // 点击歌手名跳转至歌手页面的回调
      goToSingerDetail() {
        if (this.$route.path === `/singerDetail/${this.musicDetail.ar[0].id}`) {
          this.$router.push({
            name: "singerDetail",
            params: {id: this.musicDetail.ar[0].id}
          })
        }
        if (this.$store.state.isMusicDetailCardShow === true) {
          this.$store.state.commit("changeMusicDetailCardState", false);
        }
      }
    },
    computed: {
      durationTotalSecond() {
        return returnSecond(this.duration);
      }
    },
    watch: {
      // 监听vuex中musicId的变化
      "$store.state.musicId"(id) {
        console.log("vuex中的id发生了变化");
        // 先暂停当前播放的音乐
        this.pauseMusic();
        this.musicList = this.$store.state.musicList;
        this.getMusicDetailFromMusicList();
        this.getMusicDetail(id);
        // durationNum = returnSecond(this.duration);
        // 判断用户是否喜欢当前音乐
        this.getIsUserLikeCurrentMusic();
        // console.log(this.$refs.audioPlayer);
      },
      // 监听currentIndex的变化
      "$store.state.currentIndex"(currentIndex, lastIndex) {
        if (this.hasDrawerOpend) {
          this.handleDrawerListDOM(currentIndex, lastIndex);
        }
      },
      // 监听播放状态
      "$store.state.isPlay"(isPlay) {
        if (isPlay) {
          this.playMusic();
        } else {
          this.pauseMusic();
        }
      },
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
