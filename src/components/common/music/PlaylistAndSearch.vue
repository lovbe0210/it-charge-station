<template>
  <div class="playlist" v-show="playListShow">
    <div class="title-search">
      <span class="iconfont icon-music-list" v-show="ifSearchOrPlayList === 0">
        <span class="icon-context">共{{playList.length}}首</span>
      </span>
      <span class="iconfont icon-return-copy" @click="ifSearchOrPlayList = 0" v-show="ifSearchOrPlayList === 1">
        <span>返回</span>
      </span>
      <span class="search">
        <Input search :placeholder="placeholder" @on-search="searchMusic()" v-model="keywords" clearable>
        </Input>
        </span>
    </div>
    <!-- 歌单 -->
    <b-list-group class="list" @wheel="handleScrollWheel">
      <b-list-group-item class="playItem" v-for="(item,index) in playList" :key="item.id" @dblclick="playSelect(index)">
        <b-row :class="[$store.state.musicInfo.musicId === item.id ? 'currentPlay' : '']"
               @mouseenter="currentShowId=item.id"
               @mouseleave="currentShowId=null">
          <b-col cols="7" class="musicName">
            {{item.name}}
          </b-col>
          <b-col cols="3" class="signerName">
            {{item.ar[0].name}}
          </b-col>
          <b-col cols="2" class="next-play" v-show="ifSearchOrPlayList && currentShowId===item.id"
                 @click="nextPlay(index)">
            <span class="iconfont icon-music-add"></span>
          </b-col>
        </b-row>

      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  import MusicApi from '@/utils/MusicApi.js'

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
      currentMusicId() {
        return this.$store.state.musicInfo.musicId;
      }
    },
    methods: {
      searchMusic() {
        MusicApi.cloudSearch(this, this.keywords.length === 0 ? this.placeholder : this.keywords).then(data => {
          this.ifSearchOrPlayList = 1;
          this.searchResult = [];
          this.topMusicScroll = 0;
          let playList = document.querySelector(".list");
          playList.scrollTo({
            behavior: "instant",
            top: this.topMusicScroll
          });
          setTimeout(() => {
            if (data.length > 0) {
              this.searchResult = data;
            }
          }, 1)
        })
      },
      playSelect(index) {
        let selectMusic = this.playList[index];
        if (this.ifSearchOrPlayList === 0) {
          // 播放列表
          this.$store.commit("updateMusicInfo", {musicId: selectMusic.id, currentIndex: index});
        } else {
          // 搜索列表
          let playList = this.$store.state.musicInfo.musicList;
          let index = playList.findIndex(
            (item) => item.id === selectMusic.id
          );
          if (index === -1) {
            playList.push(selectMusic)
            this.$store.commit("updateMusicInfo", {
              musicList: playList,
              musicId: selectMusic.id,
              currentIndex: playList.length - 1
            });
          } else {
            this.$store.commit("updateMusicInfo", {
              musicId: selectMusic.id,
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
          (item) => item.id === selectMusic.id
        );
        if (findIndex === -1) {
          debugger
          let currentPlayIndex = this.$store.state.musicInfo.currentIndex;
          playList.splice(currentPlayIndex, 0, selectMusic);
          // TODO
          // this.$store.commit("updateMusicInfo", {
          //   musicList: playList
          // });
        }
      },
      handleScrollWheel(event) {
        // debugger
        // 如果list大于4时才进行滚动
        if (this.playList == null || this.playList.length <= 4) {
          return;
        }
        let playList = document.querySelector(".list");
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
            // debugger
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
      },
      playListShow(flag) {
        if (flag) {

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
