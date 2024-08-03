<template>
  <div class="u-comment" ref="popoverContainer">
    <div class="comment-form">
      <div class="reply-header">
        所有评论（{{total}}）
      </div>
      <div class="content">
        <div class="avatar-box">
          <b-avatar :src="userInfo.avatar" variant="light" to="/user" size="2.5rem">
            <span v-if="!userInfo.avatar">{{ userInfo.username }}</span>
          </b-avatar>
        </div>
        <InputBox @submit="submit"
                  content-btn="发表评论"
                  cancel-btn="取消"/>
      </div>
    </div>
    <div class="comment-list-wrapper">
      <div class="comment-list">
        <u-comment v-for="comment in commentList"
                   :key="comment.id"
                   :data="comment"
                   :contentBoxParam="contentBoxParam"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {createObjectURL} from '@/utils/emoji'
  import {getComment} from '@/assets/emoji/comment';
  import InputBox from './InputBox'
  import UComment from './Comment'

  export default {
    name: 'CommentFull',
    data() {
      return {
        tempId: 100,
        commentList: [],
        total: '0'
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      },
      contentBoxParam() {
        return {
          remove: this.remove,
          updateTotal: this.updateTotal
        }
      }
    },
    components: {
      InputBox,
      UComment
    },
    methods: {
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
    created() {
      // 初始化评论列表
      this.commentList = getComment(1, 10);
      this.total = this.commentList.length;
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/comment.less';
</style>
