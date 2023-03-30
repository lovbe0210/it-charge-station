<template>
  <div class="playlist" v-show="playListShow">
    <div class="title-search">
      <span class="iconfont icon-music-list">&ensp;共{{playList.length}}首</span>
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
  export default {
    name: "PlayListAndSearch",
    data() {
      return {
        playListShow: true,
        placeholder: "周杰伦",
        keywords: "",
        topMusicScroll: 0
      };
    },
    computed: {
      playList() {
        return this.$store.state.musicInfo.musicList;
      }
    },
    methods: {
      searchMusic() {
        console.log("搜索歌曲" + (this.keywords.length === 0 ? this.placeholder : this.keywords))
      },
      playSelect(index) {
        let selectMusic = this.playList[index];
        this.$store.commit("updateMusicInfo", {musicId: selectMusic.id, currentIndex: index});
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
