<template>
  <div class="comment" :class="{ 'reply-from-comment': commentReply?.parentId }" ref="tooltipContainer">
    <div class="comment-sub">
      <user-card :userInfo="userInfo" :popoverContainer="this.$refs.tooltipContainer" class="user-info-card-box">
        <slot>
          <b-avatar :src="commentReply.user.avatar" variant="light" size="2.5rem">
            <span v-if="!commentReply.user.avatar">{{ commentReply.user.username }}</span>
          </b-avatar>
        </slot>
      </user-card>
      <a-popover placement="topLeft"
                 trigger="hover"
                 :getPopupContainer="()=>this.$refs.tooltipContainer"
                 overlayClassName="user-info-card-box">
        <template slot="content">

        </template>
        <!-- :to="data.user.homeLink" -->

      </a-popover>
    </div>
    <div class="comment-primary">
      <div class="comment-main">
        <div class="user-info">
          <user-card :userInfo="userInfo" :popoverContainer="this.$refs.tooltipContainer">
            <slot>
              <div class="username">
                <span class="name" style="max-width: 10em">{{ commentReply.user.username }}</span>
                <!-- level -->
                <span blank="true" class="rank">
                  <span :class="['iconfont',  'icon-level' + commentReply.user.level]"></span>
              </span>
              </div>
            </slot>
          </user-card>
          <Time class="time" :time="commentReply.createTime" v-if="needFormatDate(commentReply.createTime)"/>
          <Time class="time" :time="commentReply.createTime" v-else type="datetime"/>
        </div>
        <div class="content">
          <div class="u-fold">
            <div ref="textBox" class="txt-box" :class="{ 'over-hidden': !unfold }">
              <div ref="divBox">
                <div v-html="this.data.content"></div>
                <div class="imgbox" v-if="commentReply.contentImg" style="display: flex;">
                  <b-img :src="commentReply.contentImg" @click="previewImage"
                         style="height: 72px; margin: 8px 4px; border-radius: 2px; cursor: pointer"
                         lazy/>
                </div>
              </div>
            </div>
            <div class="action-box">
              <div v-if="isOver" class="expand-btn" @click="unfold = !unfold">{{ unfold ? '收起' : '展开' }}</div>
            </div>
          </div>
        </div>
        <div class="action-box">
          <!-- 点赞 -->
          <div class="like-and-reply">
            <div class="item" @click="like">
              <span :class="['iconfont', 'like', commentReply.ilike ? 'ilike' : '']"></span>
              <span v-if="data.likes != 0">{{ commentReply.likes }}</span>
            </div>
            <!-- 回复 -->
            <div class="item" :class="{ active }" @click="reply">
              <span class="iconfont reply"></span>
              <span class="reply-btn">{{ active ? '取消回复' : '回复' }}</span>
            </div>
          </div>
          <!-- 操作栏 -->
          <div class="item" v-if="commentReply.user.uid === userInfo.uid">
            <a-popover placement="leftTop"
                       trigger="click"
                       :getPopupContainer="()=>this.$refs.tooltipContainer"
                       overlayClassName="operate-more">
              <template slot="content">
                <div @click="contentBoxParam.remove(commentReply.id)">
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
            :placeholder="'回复@' + commentReply.user.username"
            :reply="commentReply"
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
  import { cloneDeep, needFormatDate } from '@/utils/emoji';
  import InputBox from './InputBox';
  import Pswp from "@/components/common/imagepreview/index"
  import UserCard from "@/components/common/UserCard.vue";

  export default {
    name: 'ContentBox',
    data() {
      return {
        active: false,
        editorRef: null,
        // imgPreview: false,
        //文本是否超出五行，默认否
        isOver: false,
        // 文本是否是展开状态 默认为收起
        unfold: false,
        // dom监视器
        observer: null,
        commentReply: null,
        // 图片预览
        pswp: null
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
     /* contents() {
        return useEmojiParse(emoji.allEmoji, this.data.content);
      },*/
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    components: {
      InputBox,
      UserCard
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
      exposeEditor(editorRef) {
        this.editorRef = editorRef;
      },
      needFormatDate,
      like() {
        if (this.commentReply.ilike) {
          // 原来点赞，现在取消
          --this.commentReply.likes;
        } else {
          // 相反
          ++this.commentReply.likes;
        }
        this.commentReply.ilike = !this.commentReply.ilike;
        // TODO commentReply.id action：like or cancelLike --> to server
      },
      previewImage(event) {
        if (this.pswp === null) {
          this.pswp = new Pswp(null);
        }
        let img = event.target;
        let items = [{
          src: img.src,
          msrc: img.src,
          w: img.naturalWidth,
          h: img.naturalHeight
        }]
        this.pswp.open(items, 0)
      }
    },
    created() {
      this.commentReply = cloneDeep(this.data);
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
      this.observer.observe(this.$refs.divBox);
    },
    beforeDestroy() {
      this.observer?.disconnect()
    }
  }
</script>

<style lang="less" scoped>
@import "../../../../css/common-var.less";
@import '../style/content-box.less';
</style>
