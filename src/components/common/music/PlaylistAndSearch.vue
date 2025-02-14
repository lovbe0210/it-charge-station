<template>
  <div class="playlist" v-show="playListShow">
    <div class="title-search">
      <span v-show="ifSearchOrPlayList === 0">
        <span class="iconfont i-music-list"/>
        <span class="icon-context">共{{playList.length}}首</span>
      </span>
      <span class="return-playlist"
            v-show="ifSearchOrPlayList === 1"
            @click="ifSearchOrPlayList = 0">
        <span class="iconfont return"/>
        <span class="icon-context">返回</span>
      </span>
      <span class="search">
        <Input search :placeholder="placeholder" @on-search="searchMusic()" v-model="keywords" clearable>
        </Input>
      </span>
    </div>
    <!-- 歌单 -->
    <b-list-group class="music-list" @wheel="handleScrollWheel">
      <b-list-group-item class="playItem" v-for="(item,index) in playList" :key="item.musicId" @dblclick="playSelect(index)">
        <b-row :class="[$store.state.musicInfo.musicId === item.musicId ? 'currentPlay' : '']"
               @mouseenter="currentShowId=item.musicId"
               @mouseleave="currentShowId=null">
          <b-col cols="6" class="music-name" :title="item.musicName">
            {{item.musicName}}
          </b-col>
          <b-col cols="3" class="signerName" :title="item.author">
            {{item.author}}
          </b-col>
          <b-col cols="2" class="next-play" v-show="ifSearchOrPlayList && currentShowId===item.musicId"
                 @click="nextPlay(index)">
            <span class="iconfont add"></span>
          </b-col>
          <b-col cols="2" class="music-del" v-show="!ifSearchOrPlayList && currentShowId===item.musicId"
                 @click="removeFromPlayList(index)">
            <span class="iconfont delete"></span>
          </b-col>
        </b-row>

      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  import MusicApi from '@/api/MusicApi.js'
  import { returnSecond } from "@/utils/utils"
  import preferenceApi from "../../../api/PreferenceApi";

  export default {
    name: "PlayListAndSearch",
    data() {
      return {
        playListShow: true,
        placeholder: "周杰伦",
        keywords: "",
        topMusicScroll: 0,
        // 此处表示展示列表为搜索列表还是播放列表 0 playList，1 searchList
        ifSearchOrPlayList: 0,
        currentShowId: null,
        searchResult: []
      };
    },
    computed: {
      playList() {
        if (this.ifSearchOrPlayList === 0) {
          return this.$store.state.musicInfo.musicList;
        } else {
          return this.searchResult;
        }
      },
      isPlay() {
        return this.$store.state.musicInfo.isPlay;
      },
      currentMusicId() {
        return this.$store.state.musicInfo.musicId;
      },
      loginStatus() {
        let userInfo = this.$store.state.userInfo
        return userInfo !== null && userInfo.token?.length === 32
      }
    },
    methods: {
      searchMusic() {
        MusicApi.cloudSearch(this.keywords.length === 0 ? this.placeholder : this.keywords).then(data => {
          this.ifSearchOrPlayList = 1;
          this.searchResult = [];
          this.topMusicScroll = 0;
          let playList = document.querySelector(".music-list");
          playList.scrollTo({
            behavior: "instant",
            top: this.topMusicScroll
          });
          setTimeout(() => {
            if (data.length > 0) {
              this.searchResult = data.map(resultItem => {
                return {
                  musicId: resultItem.id,
                  musicName: resultItem.name,
                  musicCover: resultItem.al?.picUrl,
                  author: resultItem.ar?.map(r => r.name).join(','),
                  duration: typeof resultItem.dt === "number" ? resultItem.dt : returnSecond(resultItem.dt),
                  platformCode: 1
                }
              });
            }
          }, 1)
        })
      },
      playSelect(index) {
        let selectMusic = this.playList[index];
        if (this.ifSearchOrPlayList === 0) {
          // 播放列表
          this.$store.commit("updateMusicInfo", {musicId: selectMusic.musicId, currentIndex: index});
        } else {
          // 搜索列表
          let playList = this.$store.state.musicInfo.musicList;
          let index = playList.findIndex(
            (item) => item.musicId === selectMusic.musicId
          );
          if (index === -1) {
            playList.push(selectMusic);
            this.$store.commit("updateMusicInfo", {
              musicId: selectMusic.musicId,
              currentIndex: playList.length - 1
            });
            // 如果是登陆用户保存播放列表
            if (this.loginStatus) {
              preferenceApi.addMusic2PlayList(selectMusic);
            }
          } else {
            this.$store.commit("updateMusicInfo", {
              musicId: selectMusic.musicId,
              currentIndex: index
            });
          }
        }
      },
      // 添加到下一首播放
      nextPlay(index) {
        let selectMusic = this.playList[index];
        // 搜索列表
        let playList = this.$store.state.musicInfo.musicList;
        let findIndex = playList.findIndex(
          (item) => item.musicId === selectMusic.musicId
        );
        if (findIndex === -1) {
          let currentPlayIndex = this.$store.state.musicInfo.currentIndex;
          playList.splice(currentPlayIndex + 1, 0, selectMusic);
          if (this.loginStatus) {
            preferenceApi.addMusic2PlayList(selectMusic);
          }
        }
      },
      removeFromPlayList(index) {
        let selectMusic = this.playList[index];
        this.playList.splice(index, 1);
        if (selectMusic.musicId === this.currentMusicId) {
          // 直接停止音乐
          this.$store.commit("updateMusicInfo", {musicId: null});
        } else if (this.currentMusicId !== null) {
          // 更新当前播放音乐的index
          let findIndex = this.playList.findIndex(
            (item) => item.musicId === this.currentMusicId
          );
          this.$store.commit("updateMusicInfo", {currentIndex: findIndex});
          if (this.loginStatus) {
            preferenceApi.deleteMusicPlayList(selectMusic);
          }
        }

      },
      handleScrollWheel(event) {
        // 如果list大于4时才进行滚动
        if (this.playList == null || this.playList.length <= 4) {
          return;
        }
        let playList = document.querySelector(".music-list");
        let itemHeight = parseFloat(window.getComputedStyle(playList.firstChild).getPropertyValue("height"));
        let totalHeight = itemHeight * (this.playList.length - 4);
        if (event.wheelDelta || event.detail) {
          // down
          if (event.wheelDelta > 0 || event.detail < 0) {
            let scrollDistance = this.topMusicScroll - itemHeight;
            if (scrollDistance >= 0) {
              this.topMusicScroll -= itemHeight;
            }
            playList.scrollTo({
              behavior: "smooth",
              top: this.topMusicScroll
            });
          }
          if (event.wheelDelta < 0 || event.detail > 0) {
            // up
            let scrollDistance = this.topMusicScroll + itemHeight;
            if (scrollDistance <= totalHeight) {
              this.topMusicScroll += itemHeight;
            }
            playList.scrollTo({
              behavior: "smooth",
              top: this.topMusicScroll
            });
          }
        }
      }
    },
    watch: {
      "$store.state.musicInfo.isMusicDetailCardShow"(isMusicDetailCardShow) {
        if (isMusicDetailCardShow) {
          this.playListShow = false;
        } else {
          setTimeout(() => {
            this.playListShow = true;
          }, 200)
        }
      }
    },
    created() {
      this.topMusicScroll = 0;
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import "./css/playlist-andl-search.less";
  @import "../../css/common-var.less";
</style>
