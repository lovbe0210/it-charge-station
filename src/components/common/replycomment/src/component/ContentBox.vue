<template>
  <div class="comment" :class="{ 'reply-from-comment': data?.parentId }" ref="tooltipContainer">
    <div class="comment-sub">
      <a-popover placement="topLeft"
                 trigger="hover"
                 :getPopupContainer="()=>this.$refs.tooltipContainer"
                 overlayClassName="user-info-card-box">
        <template slot="content">
          <div class="user-info-card">
            <div class="user-avatar">
              <b-avatar :src="data.user.avatar" variant="light" :to="data.user.homeLink" size="2.5rem">
                <span v-if="!data.user.avatar">{{ data.user.username }}</span>
              </b-avatar>
            </div>
            <div class="user-content">
              <div class="user-info">
                <b-link class="username" target="_blank">
                  <span class="name" style="max-width: 10em;">{{ data.user.username }}</span>
                  <span :class="['iconfont',  'icon-level' + data.user.level]"></span>
                </b-link>
              </div>
              <div class="social-info">
                <b-link class="attention">
                  <span>15</span>
                  <span>关注</span>
                </b-link>
                <b-link class="follower">
                  <span>6878</span>
                  <span>粉丝</span>
                </b-link>
                <b-link class="likes">
                  <span>36011</span>
                  <span>获赞</span>
                </b-link>
              </div>
              <div class="card-btn">
                <Button type="primary">
                  <span class="">关注</span></Button>
                <Button>
                  <span class="">发消息</span></Button>
              </div>
            </div>
          </div>
        </template>
        <!-- :to="data.user.homeLink" -->
        <b-avatar :src="data.user.avatar" variant="light"  size="2.5rem">
          <span v-if="!data.user.avatar">{{ data.user.username }}</span>
        </b-avatar>
      </a-popover>
    </div>
    <div class="comment-primary">
      <div class="comment-main">
        <div class="user-info">
          <a-popover placement="top" :getPopupContainer="()=>this.$refs.tooltipContainer"
                     overlayClassName="user-info-card">
            <template slot="content">
              <div>
                用户信息卡片
              </div>
            </template>
            <div class="username">
              <span class="name" style="max-width: 10em">{{ data.user.username }}</span>
              <!-- level -->
              <span blank="true" class="rank">
                  <span :class="['iconfont',  'icon-level' + data.user.level]"></span>
              </span>
            </div>
          </a-popover>
          <time class="time">{{ data.createTime }}</time>
        </div>
        <div class="content">
          <div class="u-fold">
            <div ref="textBox" class="txt-box" :class="{ 'over-hidden': !unfold }">
              <div ref="divBox">
                <div v-html="contents"></div>
                <div class="imgbox" v-if="data.contentImg" style="display: flex;">
                  <b-img :src="data.contentImg" @click="imgPreview = true"
                         style="height: 72px; margin: 8px 4px; border-radius: 2px;"
                         lazy/>
                  <image-preview :src="data.contentImg" :isPreviewOpen="imgPreview"
                                 @toggleFullScreen="imgPreview = false"/>
                </div>
              </div>
            </div>
            <div class="action-box">
              <div v-if="isOver" class="expand-btn" @click="unfold = !unfold">{{ unfold ? '收起' : '展开' }}</div>
            </div>
          </div>
        </div>
        <div class="action-box select-none">
          <!-- 点赞 -->
          <div class="item" @click="contentBoxParam.like(str(data.id))">
            <span class="iconfont like"></span>
            <span v-if="data.likes != 0">{{ data.likes }}</span>
          </div>
          <!-- 回复 -->
          <div ref="btnRef" class="item" :class="{ active }" @click="reply">
            <span class="iconfont reply"></span>
            <span class="reply-btn">{{ active ? '取消回复' : '回复' }}</span>
          </div>
          <!-- 操作栏 -->
          <div class="item">
            <a-popover placement="leftTop"
                       trigger="click"
                       :getPopupContainer="()=>this.$refs.tooltipContainer"
                       overlayClassName="operate-more">
              <template slot="content">
                <div @click="contentBoxParam.remove(data)">
                  <span class="del">删除</span>
                </div>
              </template>
              <span class="iconfont operate"></span>
            </a-popover>

          </div>
        </div>
        <div v-if="active">
          <InputBox
            ref="commentRef"
            :parent-id="parentId"
            :placeholder="'回复@' + data.user.username"
            :reply="data"
            content-btn="发布"
            style="margin-top: 12px"
            @hide="hide"
            @submit="contentBoxParam.submit"
            @exposeEditor="exposeEditor"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {str} from '@/utils/emoji';
  import {useEmojiParse} from '@/utils/hooks';
  import emoji from '@/assets/emoji/emoji.js';
  import {dayjs} from 'dayjs';
  import InputBox from './InputBox';
  import ImagePreview from '@/components/common/ImagePreview'

  export default {
    name: 'ContentBox',
    data() {
      return {
        active: false,
        editorRef: null,
        imgPreview: false,
        //文本是否超出五行，默认否
        isOver: false,
        // 文本是否是展开状态 默认为收起
        unfold: false,
        // dom监视器
        observer: null
      }
    },
    props: {
      // 楼中楼的回复
      data: {
        type: Object
      },
      parentId: {
        type: String
      },
      contentBoxParam: {
        type: Object
      }
    },
    computed: {
      contents() {
        return useEmojiParse(emoji.allEmoji, this.data.content);
      }
    },
    components: {
      InputBox,
      ImagePreview
    },
    methods: {
      //点击回复按钮打开输入框
      reply() {
        this.active = !this.active
        if (this.active) {
          this.$nextTick(() => {
            this.editorRef?.focus()
          })
        }
      },

      // 提交评论关闭输入框
      hide() {
        this.active = false;
      },
      safeStr(id) {
        return str(id)
      },
      nowDateTime(dateTime) {
        return dayjs.fromNow();
      },
      exposeEditor(editorRef) {
        this.editorRef = editorRef;
      }
    },
    mounted() {
      this.observer = new ResizeObserver(entry => {
        if (!this.unfold && this.$refs.divBox && this.$refs.textBox) {
          //offsetHeight：包括内容可见部分的高度，border，可见的padding，水平方向的scrollbar（如果存在）；不包括margin。
          // clientHeight：包括内容可见部分的高度，可见的padding；不包括border，水平方向的scrollbar，margin。
          //scrollHeight：包括内容的高度（可见与不可见），padding（可见与不可见）；不包括border，margin。
          // isOver.value = divBox.value.offsetHeight < divBox.value.scrollHeight
          //兼容火狐
          this.isOver = this.$refs.textBox.clientHeight < this.$refs.divBox.scrollHeight
        }
      })
      this.observer.observe(this.$refs.divBox)
    },
    beforeDestroy() {
      this.observer?.disconnect()
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/content-box.less';
</style>
