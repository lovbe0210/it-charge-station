<template>
  <div class="comment" ref="tooltipContainer">
    <div class="comment-sub un-select">
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
    <div class="comment-primary">
      <div class="comment-main">
        <div class="user-info un-select">
          <user-card :userInfo="commentReply.userInfo"
                     :popoverContainer="contentBoxParam.popoverContainer">
            <slot>
              <div class="username">
                <span class="name">{{ commentReply.userInfo?.username }}</span>
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
        <div class="action-box un-select">
          <div class="like-and-reply">
            <!-- 点赞 -->
            <div class="item" @click="like" v-if="loginStatus">
              <span :class="['iconfont', 'like', commentReply.ifLike ? 'ilike' : '']"></span>
              <span v-if="commentReply.likeCount !== 0">{{ commentReply.likeCount }}</span>
            </div>
            <div v-else class="item" @click="login">
              <span class="iconfont like"></span>
              <span v-if="commentReply.likeCount !== 0">{{ commentReply.likeCount }}</span>
            </div>

            <!-- 回复 -->
            <div class="item" :class="{ active }" @click="reply" v-if="loginStatus">
              <span class="iconfont reply"></span>
              <span class="reply-btn">{{ active ? '取消回复' : ('回复' + (replyCount ? replyCount : '')) }}</span>
            </div>
            <div class="item" v-else @click="login">
              <span class="iconfont reply"></span>
              <span class="reply-btn">{{'回复' + (replyCount ? replyCount : '')}}</span>
            </div>
            <div class="item delete-warn" v-if="commentReply.userInfo.uid === userInfo.uid">
              <a-popover placement="top"
                         trigger="click"
                         v-model="showDel"
                         :getPopupContainer="() => contentBoxParam.popoverContainer"
                         overlayClassName="operate-more">
                <template slot="content">
                  <div class="delete-popover-message">
                    <span class="iconfont delete-warn"></span>
                    <div class="title">删除评论后，评论下所有回复都会被删除,是否继续?</div>
                  </div>
                  <div class="del-warn-btn">
                    <Button type="success" size="small" @click="contentBoxParam.remove(commentReply.uid)">确定</Button>
                    <Button @click="showDel = false" size="small">取消</Button>
                  </div>
                </template>
                <div>
                  <span class="iconfont delete" tabindex="0"></span>
                </div>
              </a-popover>
            </div>
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
import {cloneDeep, needFormatDate, useEmojiParse} from '@/utils';
import InputBox from './InputBox';
import Pswp from "@/components/common/imagepreview/index"
import UserCard from "@/components/common/UserCard.vue";
import socialApi from "@/api/SocialApi";
import emoji from '@/assets/emoji/emoji';

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
      pswp: null,
      showDel: false
    }
  },
  props: {
    // 评论/楼中楼回复
    data: {
      type: Object
    },
    parentId: {
      type: Number
    },
    replyCount: {
      type: Number
    },
    contentBoxParam: {
      type: Object
    }
  },
  computed: {
    docStyle() {
      return this.$store.state.docStyle;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    loginStatus() {
      let userInfo = this.$store.state.userInfo
      return userInfo !== null && userInfo.token?.length === 32
    },
    contentHtmlValue() {
      let content = this.commentReply.content;
      if (content?.length > 0) {
        // 对特殊字符进行转义
        content = content?.replace(/[&<>"']/g, tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        }[tag]));
        // 需要将表情转换为img标签
        content = useEmojiParse(emoji.allEmoji, content);
      }
      if (this.commentReply.replyUserInfo?.username) {
        content = `回复 <span style="color: #008Ac5;">@${this.commentReply.replyUserInfo.username}:</span> ${content}`;
      }
      return content;
    }
  },
  components: {
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
      let likeAction = {
        targetId: this.commentReply.uid,
        targetType: 4,
        action: this.commentReply.ifLike ? 0 : 1
      }
      socialApi.contentLikeMark(likeAction).then(data => {
        if (data?.result) {
          if (this.commentReply.ifLike) {
            // 取消点赞
            this.commentReply.likeCount = (this.commentReply.likeCount - 1) < 0 ? 0 : (this.commentReply.likeCount - 1);
          } else {
            ++this.commentReply.likeCount;
          }
          this.commentReply.ifLike = this.commentReply.ifLike ? 0 : 1;
        }
      })
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
    },
    login() {
      let loginBtn = document.getElementById("pwdLoginBtn");
      if (loginBtn) {
        loginBtn.click();
      }
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
