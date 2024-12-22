<template>
  <div class="comment" :class="{ 'reply-from-comment': commentReply.parentId }" ref="tooltipContainer">
    <div class="comment-sub">
      <user-card :userInfo="commentReply.userInfo"
                 :popoverContainer="contentBoxParam.popoverContainer"
                 class="user-info-card-box">
        <slot>
          <b-avatar :src="fileUrl(commentReply.userInfo?.avatarUrl)" variant="light" size="2.5rem">
            <span v-if="!commentReply.userInfo?.avatarUrl">{{ commentReply.userInfo?.username }}</span>
          </b-avatar>
        </slot>
      </user-card>
    </div>
    <div class="comment-primary un-select">
      <div class="comment-main">
        <div class="user-info">
          <user-card :userInfo="commentReply.userInfo" :popoverContainer="contentBoxParam.popoverContainer">
            <slot>
              <div class="username">
                <span class="name" style="max-width: 10em">{{ commentReply.userInfo?.username }}</span>
                <!-- level -->
                <span blank="true" class="rank">
                  <span :class="['iconfont',  'icon-level' + commentReply.userInfo?.level]"></span>
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
                <div v-html="contentHtmlValue"></div>
                <div class="imgbox" v-if="commentReply.contentImgUrl" style="display: flex;">
                  <b-img :src="fileUrl(commentReply.contentImgUrl)" @click="previewImage"
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
          <div class="like-and-reply">
            <!-- 点赞 -->
            <div class="item" @click="like" v-if="userInfo?.token && userInfo.token.length === 32">
              <span :class="['iconfont', 'like', commentReply.iflike ? 'ilike' : '']"></span>
              <span v-if="data.likeCount != 0">{{ commentReply.likeCount }}</span>
            </div>
            <auth-modal v-else :normalBackground="docStyle.asyncTheme ? 0 : 1">
              <slot>
                <div class="item">
                  <span class="iconfont like"></span>
                  <span v-if="data.likeCount != 0">{{ commentReply.likeCount }}</span>
                </div>
              </slot>
            </auth-modal>

            <!-- 回复 -->
            <div class="item" :class="{ active }" @click="reply" v-if="userInfo?.token && userInfo.token.length === 32">
              <span class="iconfont reply"></span>
              <span class="reply-btn">{{ active ? '取消回复' : '回复' }}</span>
            </div>
            <auth-modal v-else :normalBackground="docStyle.asyncTheme ? 0 : 1">
              <slot>
                <div class="item">
                  <span class="iconfont reply"></span>
                  <span class="reply-btn">回复</span>
                </div>
              </slot>
            </auth-modal>
          </div>
          <!-- 操作栏 -->
          <div class="item" v-if="commentReply.userInfo.uid === userInfo.uid">
            <a-popover placement="leftTop"
                       trigger="click"
                       :getPopupContainer="() => contentBoxParam.popoverContainer"
                       overlayClassName="operate-more">
              <template slot="content">
                <div  class="del" @click="contentBoxParam.remove(commentReply.uid)">
                  <span>删除</span>
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
            :placeholder="'回复@' + commentReply.userInfo.username"
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
import {cloneDeep, needFormatDate} from '@/utils/emoji';
import InputBox from './InputBox';
import Pswp from "@/components/common/imagepreview/index"
import UserCard from "@/components/common/UserCard.vue";
import AuthModal from "@/components/common/AuthModal.vue";

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
      commentReply: {},
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
      type: Number
    },
    contentBoxParam: {
      type: Object
    }
  },
  computed: {
    /* contents() {
       return useEmojiParse(emoji.allEmoji, this.data.content);
     },*/
    docStyle() {
      return this.$store.state.docStyle;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    contentHtmlValue() {
      let content = this.commentReply.content;
      if (this.commentReply.replyUserInfo?.username) {
        content = `回复 <span style="color: #008Ac5;">@${this.commentReply.replyUserInfo.username}:</span> ${content}`;
      }
      return content;
    }
  },
  components: {
    AuthModal,
    InputBox,
    UserCard
  },
  methods: {
    fileUrl(path) {
      return this.fileService + path;
    },
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
