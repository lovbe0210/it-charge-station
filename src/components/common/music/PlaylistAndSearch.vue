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
    <b-list-group class="list">
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
        keywords: ""
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
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import "./css/playlist-andl-search.less";
  @import "../../css/common-var.less";
</style>
