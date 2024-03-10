<template>
  <div class="u-comment" ref="popoverContainer">
    <div class="comment-form">
      <div class="reply-header">
        所有评论（{{total}}）
      </div>
      <div class="content">
        <div class="avatar-box">
          <b-avatar :src="userInfo.avatar" variant="light" to="/settings" size="2.5rem">
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
  import { createObjectURL } from '@/utils/emoji'
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
          submit: this.submit,
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
       * 点赞评论数组处理
       */
      editLikeCount(id, count) {
        let tar = null;
        this.commentList.forEach(v => {
          if (v.id === id) {
            tar = v;
          } else {
            tar = v.reply?.list.find(v => v.id === id);
          }
          if (tar && tar.likes) {
            tar.likes += count;
          }
        })
      },
      /**
       * 点赞事件
       * @param id
       */
      like(id) {
        // 点赞事件处理
        const likeIds = this.config.user.likeIds
        if (likeIds) {
          console.log('点赞: ' + id)
          setTimeout(() => {
            if (likeIds.findIndex(item => item === id) === -1) {
              // 点赞
              likeIds.push(id)
              this.editLikeCount(id, 1)
            } else {
              // 取消点赞
              let index = likeIds.findIndex(item => item === id)
              if (index !== -1) {
                likeIds.splice(index, 1)
                this.editLikeCount(id, -1)
              }
            }
          }, 200)
        }
      },
      /**
       * 删除当前评论
       * @param comment
       */
      remove(comment) {
        // 删除评论数据操作
        const {parentId, id} = comment
        if (parentId) {
          let comment = this.commentList.find(item => item.id === parentId)
          let reply = comment?.reply
          if (reply) {
            let index = reply.list.findIndex(item => item.id === id)
            if (index !== -1) {
              reply.list.splice(index, 1)
              reply.total--
            }
          }
        } else {
          let index = this.commentList.findIndex(item => item.id === id)
          if (index !== -1) {
            this.commentList.splice(index, 1)
          }
        }
      },
      updateTotal() {
        this.total++;
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
