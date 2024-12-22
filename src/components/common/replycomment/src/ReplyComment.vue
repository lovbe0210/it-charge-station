<template>
  <div class="u-comment" ref="popoverContainer">
    <div class="comment-form">
      <div class="reply-header">
        所有评论（{{ total }}）
      </div>
      <div class="content">
        <div class="avatar-box">
          <b-avatar v-if="userInfo?.token && userInfo.token.length == 32"
                    :src="fileUrl(userInfo.avatarUrl)"
                    variant="light"
                    :to="'/' + userInfo.domain"
                    size="2.5rem">
            <span v-if="!userInfo.avatarUrl">{{ userInfo.username }}</span>
          </b-avatar>
          <b-avatar v-else
                    variant="light"
                    size="2.5rem">
            <span class="iconfont author2 un-login-avatar"></span>
          </b-avatar>
        </div>
        <InputBox v-if="userInfo?.token && userInfo.token.length == 32"
                  @submit="submit"
                  content-btn="发表评论"
                  cancel-btn="取消"/>
        <div class="input-lock" v-else>
          <span class="lock-tip un-select">
            <auth-modal :normalBackground="docStyle.asyncTheme ? 0 : 1">
              <slot>
                <a href="javascript: void(0)">登陆&nbsp;</a>
              </slot>
            </auth-modal>
            <span>后发表评论</span>
          </span>
        </div>
      </div>
    </div>
    <div class="comment-list-wrapper">
      <div class="comment-list" v-show="commentList && commentList.length > 0">
        <u-comment v-for="comment in commentList"
                   :key="comment.uid"
                   :data="comment"
                   :contentBoxParam="contentBoxParam"/>
      </div>
      <div v-if="!commentList || commentList.length == 0" class="comment-empty un-select">
        <span>没有更多评论</span>
      </div>
    </div>
  </div>
</template>

<script>
import {createObjectURL} from '@/utils/emoji'
import InputBox from './component/InputBox'
import UComment from './component/Comment'
import AuthModal from "@/components/common/AuthModal.vue";
import ContentPicksApi from "@/api/ContentPicksApi";

export default {
  name: 'CommentFull',
  data() {
    return {
      tempId: 100,
      commentList: [],
      total: 0
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    docStyle() {
      return this.$store.state.docStyle;
    },
    contentBoxParam() {
      return {
        remove: this.remove,
        updateTotal: this.updateTotal,
        popoverContainer: this.$refs.popoverContainer
      }
    }
  },
  props: ["targetId"],
  components: {
    AuthModal,
    InputBox,
    UComment
  },
  methods: {
    fileUrl(path) {
      return this.fileService + path;
    },
    /**
     * 提交评论
     */
    submit(comment, clear) {
      // 添加评论
      if (!comment) {
        return;
      }
      // TODO 开发完成后就不需要生成URL了，返回云端地址
      if (comment.file) {
        comment.contentImg = createObjectURL(comment.file)
      }
      setTimeout(() => {
        // 提交评论添加到评论列表
        this.commentList.unshift(comment);
        this.total++;
        // 清空输入框内容
        clear();
        this.$Message.success('评论成功!')
      }, 200)
    },
    /**
     * 删除当前评论
     * @param comment
     */
    remove(id) {
      if (!id) {
        return;
      }
      let index = this.commentList.findIndex(item => item.id === id)
      if (index !== -1) {
        this.commentList.splice(index, 1);
        this.total--;
      }
    },
    /**
     * 页面展示用的总数
     * @param inc
     */
    updateTotal(inc) {
      this.total = this.total + inc;
      this.total = this.total < 0 ? 0 : this.total;
    }
  },
  watch: {
    "targetId"(newVal) {
      // 更新评论列表
      let targetCommentInfo = {
        targetId: newVal,
        offset: 0,
        limit: 50
      }
      ContentPicksApi.getCommentList(targetCommentInfo).then(data => {
        if (data?.result) {
          this.total = data.data.total;
          this.commentList = data.data.list;
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './style/comment.less';
</style>
