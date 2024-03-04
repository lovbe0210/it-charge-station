<template>
  <div class="u-comment">
    <div class="comment-form">
      <div class="reply-header">
        所有评论（4）
      </div>
      <div class="content">
        <div class="avatar-box">
          <b-avatar variant="light" to="/settings" size="2.5rem">
            <span v-if="userInfo.username">{{ userInfo.username }}</span>
            <img v-else :src="userInfo.avatar"/>
          </b-avatar>
        </div>
        <InputBox @submit="submit"
                  content-btn="发表评论"
                  cancel-btn="取消"/>
      </div>
    </div>
    <div class="comment-list-wrapper">
      <CommentList :data="comments"></CommentList>
    </div>
  </div>
</template>

<script>
  import { createObjectURL } from '@/utils/emoji'
  import { getComment } from '@/assets/emoji/comment';
  import InputBox from './InputBox'
  import CommentList from './CommentList'

  export default {
    name: 'UComment',
    data() {
      return {
        tempId: 100,
        mentionList: [],
        replyShowSize: null,
        aTarget: null,
        showLikes: true,
        showAddress: true,
        showHomeLink: true,
        showReply: true,
        comments: []
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    components: {
      InputBox,
      CommentList
    },
    methods: {
      /**
       * 提交评论
       */
      submit({content, parentId, reply, file, clear}) {
        // 添加评论
        /**
         * 上传文件后端返回图片访问地址，格式以'||'为分割; 如:  '/static/img/program.gif||/static/img/normal.webp'
         */
        let contentImg = file?.map(e => createObjectURL(e)).join('||')

        this.tempId += 1
        const comment = {
          id: this.tempId,
          parentId: parentId,
          uid: this.userInfo.uid,
          address: '来自江苏',
          content: content,
          likes: 0,
          createTime: Date.now(),
          contentImg: contentImg,
          user: {
            username: this.userInfo.username,
            avatar: this.userInfo.avatar,
            level: this.userInfo.level,
            homeLink: this.userInfo.domain
          },
          reply: null
        }
        setTimeout(() => {
          console.log(comment)
          // 提交评论添加到评论列表
          if (comment) {
            if (parentId) {
              let rawComment = this.comments.find(v => v.id === parentId)
              if (rawComment) {
                let replys = rawComment.reply
                if (replys) {
                  replys.list.unshift(comment)
                  replys.total++
                } else {
                  rawComment.reply = {
                    total: 1,
                    list: [comment]
                  }
                }
              }
            } else {
              this.comments.unshift(comment)
            }
          }

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
        this.comments.forEach(v => {
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
          let comment = this.comments.find(item => item.id === parentId)
          let reply = comment?.reply
          if (reply) {
            let index = reply.list.findIndex(item => item.id === id)
            if (index !== -1) {
              reply.list.splice(index, 1)
              reply.total--
            }
          }
        } else {
          let index = this.comments.findIndex(item => item.id === id)
          if (index !== -1) {
            this.comments.splice(index, 1)
          }
        }
      }
    },
    mounted() {
      // 初始化评论列表
      this.comments = getComment(1, 10);

      /*setTimeout(() => {
        this.config.user.likeIds = [2, 3]
      }, 5000)*/
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/comment.less';
</style>
