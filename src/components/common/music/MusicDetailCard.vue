<template>
    <div>
      <div class="musicDetailCardContainer" v-show="!cleanCard && musicInfo.name">
        <div class="top">
          <div class="left">
            <div class="discContainer">
              <div
                class="needle"
                :class="$store.state.isPlay ? 'needleRotate' : ''"
                ref="needle"
              >
                <img :src="require('@/assets/img/MusicDetailCard/needle.png')" alt="" />
              </div>
              <!-- 通过音乐的加载时差删除discAnimation类名再添加,达到重置动画的效果 -->
              <div
                class="disc"
                :class="[
                $store.state.isPlay ? '' : 'pause',
                $store.state.isMusicLoad ? '' : 'discAnimation',
              ]"
                ref="disc"
              >
                <img :src="require('@/assets/img/MusicDetailCard/disc.png')" alt="" />
                <img :src="require('@/assets/img/test.jpg')"
                  alt=""
                  class="musicAvatar"
                  v-if="!musicInfo.al"
                />
                <img
                  :src="musicInfo.al.picUrl"
                  alt=""
                  class="musicAvatar"
                  v-else
                />
              </div>
            </div>
          </div>
          <div class="right">
            <div class="title">
              <div class="musicName">{{ musicInfo.name }}</div>
              <div
                class="album"
                @click="goToDetailPage('album', musicInfo.al.id)"
              >
                {{ musicInfo.al.name }}
              </div>
              <div
                class="singer"
                @click="goToDetailPage('singerDetail', musicInfo.ar[0].id)"
              >
                {{ musicInfo.ar[0].name }}
              </div>
            </div>
            <lyrics-scroll :lyric="lyric"></lyrics-scroll>
          </div>
        </div>
        <div
          class="bottom"
          v-loading="isCommentLoading"
          element-loading-background="rgba(255, 255, 255, 0.1)"
        >
          <comment
            :comments="hotComments"
            :commentType="'music'"
            :commentId="$store.state.musicId + ''"
            :musicTitle="musicInfo.name"
            @getComment="getMusicComment($store.state.musicId)"
            class="commentComponent"
            v-if="currentCommentPage == 1"
          ><div slot="title">热门评论</div></comment
          >
          <comment
            :comments="comment.comments"
            :commentType="'music'"
            :commentId="$store.state.musicId + ''"
            :musicTitle="musicInfo.name"
            @getComment="getMusicComment($store.state.musicId)"
            class="commentComponent"
          ><div slot="title">最新评论({{ comment.total }})</div></comment
          >
          <!-- 评论分页 -->
          <div class="page" v-show="comment.comments && comment.comments[0]">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="comment.total"
              small
              :page-size="20"
              :current-page="currentCommentPage"
              @current-change="commentPageChange"
            >
            </el-pagination>
          </div>
        </div>
        <go-top scrollObj=".musicDetailCardContainer"></go-top>
      </div>
    </div>
</template>

<script>
    export default {
        name: "PlayView.vue",
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>
