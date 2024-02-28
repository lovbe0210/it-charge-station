<template>
  <div class="u-comment">
    <div class="comment-form">
      <slot name="header">
        <div class="reply-header">
          <div class="reply-navigation">
            <ul class="nav-bar">
              <li class="nav-title">
                <span class="nav-title-text">评论</span>
                <span class="total-reply">1947</span>
              </li>
              <li class="nav-sort hot">
                <div :class="['hot-sort', latest ? 'apply-sort' : '']" @click="latest = true">最热</div>
                <div class="part-symbol"></div>
                <div :class="['time-sort', latest ? '' : 'apply-sort']" @click="latest = false">最新</div>
              </li>
            </ul>
          </div>
        </div>
      </slot>
      <div class="content">
        <div class="avatar-box">
          <b-avatar :src="config.user.avatar" variant="light" to="/settings" size="6rem">
            <span v-if="config.user.username">{{ config.user.username }}</span>
            <img v-else src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </b-avatar>
        </div>
        <InputBox v-bind="$attrs"
                  ref="inputBox"
                  :placeholder="placeholder"
                  :mentionConfig="config.mentionConfig"
                  @submit="submit"
                  content-btn="发表评论"
                  cancel-btn="取消"/>
      </div>
    </div>
    <div class="comment-list-wrapper">
      <CommentList :data="config.comments" :contentBoxParam="contentBoxParam"></CommentList>
    </div>
  </div>
</template>

<script>
  import { isNull, createObjectURL } from '@/utils/emoji'
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
        placeholder: '输入评论（Enter换行，Ctrl + Enter发送）',
        showLikes: true,
        showAddress: true,
        showHomeLink: true,
        showReply: true,
        latest: true,
        config: {
          user: {
            id: 0,
            username: '',
            avatar: ''
            // // 评论id数组 建议:存储方式用户id和文章id和评论id组成关系,根据用户id和文章id来获取对应点赞评论id,然后加入到数组中返回
            // likeIds: []
          },
          // emoji: emoji,
          comments: []
        }
      }
    },
    computed: {
      // 评论盒子参数或方法
      contentBoxParam() {
        return {
          user: this.config.user,
          like: this.like,
          relativeTime: isNull(this.relativeTime, false),
          showInfo: (uid, finish) => this.$emit("showInfo", uid, finish),
          aTarget: isNull(this.config.aTarget, "_blank"),
          showLikes: this.config.showLikes,
          showAddress: this.config.showAddress,
          showHomeLink: this.config.showHomeLink,
          showReply: this.config.showReply
        }
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
          uid: this.config.user.id,
          address: '来自江苏',
          content: content,
          likes: 0,
          createTime: Date.now(),
          contentImg: contentImg,
          user: {
            username: this.config.user.username,
            avatar: this.config.user.avatar,
            level: 6,
            homeLink: `/${this.tempId}`
          },
          reply: null
        }
        setTimeout(() => {
          console.log(comment)
          // 提交评论添加到评论列表
          if (comment) {
            if (parentId) {
              let rawComment = this.config.comments.find(v => v.id === parentId)
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
              this.config.comments.unshift(comment)
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
        this.config.comments.value.forEach(v => {
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
          let comment = this.config.comments.find(item => item.id === parentId)
          let reply = comment?.reply
          if (reply) {
            let index = reply.list.findIndex(item => item.id === id)
            if (index !== -1) {
              reply.list.splice(index, 1)
              reply.total--
            }
          }
        } else {
          let index = this.config.comments.findIndex(item => item.id === id)
          if (index !== -1) {
            this.config.comments.splice(index, 1)
          }
        }
      }
    },
    mounted() {
      // 初始化评论列表
      this.config.comments = getComment(1, 10);
      setTimeout(() => {
        const user = {
          id: 1,
          username: 'user',
          avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
          // 评论id数组 建议:存储方式用户id和文章id和评论id组成关系,根据用户id和文章id来获取对应点赞评论id,然后加入到数组中返回
          likeIds: [1, 2, 3]
        }
        this.config.user = user
      }, 100)

      setTimeout(() => {
        this.config.user.likeIds = [2, 3]
      }, 5000)
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/comment.less';
</style>
