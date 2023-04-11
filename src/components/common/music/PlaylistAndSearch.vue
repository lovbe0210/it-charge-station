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
        <Input search :placeholder="placeholder" @on-search="searchMusic()" v-model="keywords">
        </Input>
        </span>
    </div>
    <!-- 歌单 -->
    <b-list-group class="list" @wheel="handleScrollWheel">
      <b-list-group-item class="playItem" v-for="(item,index) in playList" :key="item.id" @dblclick="playSelect(index)">
        <b-row :class="[$store.state.musicInfo.musicId === item.id ? 'currentPlay' : '']">
          <b-col cols="8" class="musicName">
            {{item.name}}
          </b-col>
          <b-col cols="4" class="signerName">
            {{item.ar[0].name}}
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

        /*let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 设备/屏幕高度
        let scrollObj = document.getElementById(div); // 滚动区域
        let scrollTop = scrollObj.scrollTop; // div 到头部的距离
        let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
        //滚动条到底部的条件
        if (scrollTop + clientHeight === scrollHeight) {
          // div 到头部的距离 + 屏幕高度 = 可滚动的总高度
        }*/
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
