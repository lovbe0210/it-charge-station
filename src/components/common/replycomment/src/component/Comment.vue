<template>
  <div class="u-comment">
    <div v-if="showForm" class="comment-form">
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
                  @mentionSearch="mentionSearch"
                  @changeMetionList="changeMetionList"
                  @submit="submit"
                  content-btn="发表评论"
                  cancel-btn="取消"/>
      </div>
    </div>
    <div v-if="showContent" class="comment-list-wrapper">
      <CommentList :data="config.comments" :contentBoxParam="contentBoxParam" :upload="upload"></CommentList>
    </div>
  </div>
</template>

<script>
  import {isNull, debounce} from '@/utils/emoji'
  import InputBox from './InputBox'
  import CommentList from './CommentList'

  export default {
    name: 'UComment',
    data() {
      return {
        mentionList: [],
        replyShowSize: null,
        aTarget: null,
        placeholder: '输入评论（Enter换行，Ctrl + Enter发送）',
        showForm: true,
        showContent: true,
        showLevel: true,
        showLikes: true,
        showAddress: true,
        showHomeLink: true,
        showReply: true,
        latest: true
      }
    },
    props: {
      // 定义page prop，默认值为false
        page: {
        type: Boolean,
        default: false
      },
      // 定义upload prop，默认值为false
      upload: {
        type: Boolean,
        default: false
      },
      // 定义formDisabled prop，默认值为true
      formDisabled: {
        type: Boolean,
        default: true
      },
      relativeTime: {
        type: Boolean,
        default: true
      },
      config: {
        type: Object
        /**
         * {
         *   user,
         *   emoji,
         *   comments,
         *   mentionConfig
         * }
         * */
      }
    },
    computed: {
      inputBoxParam() {
        return {
          upload: this.upload,
          submit: this.submit,
          focus: () => this.$emit('focus')
        }
      },
      // 评论盒子参数或方法
      contentBoxParam() {
        return {
          user: this.config.user,
          like: this.like,
          relativeTime: isNull(this.relativeTime, false),
          showInfo: (uid, finish) => this.$emit("showInfo", uid, finish),
          aTarget: isNull(this.config.aTarget, "_blank"),
          showLevel: this.config.showLevel,
          showLikes: this.config.showLikes,
          showAddress: this.config.showAddress,
          showHomeLink: this.config.showHomeLink,
          showReply: this.config.showReply
        }
      },
      // 回复盒子
      replyBoxParam() {
        return {
          page: this.page,
          replyPage: (parentId, pageNum, pageSize, finish) => {
            this.$emit('replyPage', {parentId, pageNum, pageSize, finish})
          },
          replyShowSize: isNull(this.config.replyShowSize?.value, 3),
          comments: this.config.comments
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
      submit({content, parentId, reply, files, clear}) {
        // 添加评论
        debugger
        const finish = (comment) => {
          // 清空输入框内容
          clear();
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
        }
        this.$emit('submit', {content, parentId, reply, files, mentionList: this.mentionList, finish})
      },
      focus() {
        this.$emit('focus')
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
          this.$emit('like', id, () => {
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
          })
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
          let comment = this.config.comments.value.find(item => item.id === parentId)
          let reply = comment?.reply
          if (reply) {
            let index = reply.list.findIndex(item => item.id === id)
            if (index !== -1) {
              reply.list.splice(index, 1)
              reply.total--
            }
          }
        } else {
          let index = this.config.comments.value.findIndex(item => item.id === id)
          if (index !== -1) {
            this.config.comments.value.splice(index, 1)
          }
        }
      },
      /**
       *
       * @param list
       */
      changeMetionList(list) {
        this.mentionList = list
      },
      // mentionList 触发事件
      mentionSearch() {
        debounce((searchStr) => {
          this.$emit('mentionSearch', searchStr)
        }, 300)
      }
    }
  }


  // 输入框盒子
  // provide(InjectInputBox, inputBoxParam)
  // provide('cancelFn', () => this.$emit('cancel'))


  // provide(InjectContentBox, contentBoxParam)


  // provide(InjectReplyBox, replyBoxParam)


  // const inputBox = ref(null)
  // const mentionList = ref([])

  // function getMentionList() {
  //   return mentionList.value
  // }

  // 表情包
  // provide(InjectionEmojiApi, props.config.emoji)
  //提及配置
  // provide('mentionConfig', mentionConfig)
  // 工具卡槽
  // provide(InjectSlots, useSlots())
  //修改提及列表
  // provide('changeMetionList', changeMetionList)
  //修改提及列表
  // provide('mentionSearch', mentionSearch)
  // defineExpose({
  //   remove: remove,
  //   mentionList: mentionList,
  //   getMentionList: getMentionList,
  //   setMentionShow: (show) => {
  //     ;(inputBox.value).setMentionShow(show)
  //   }
  // })
</script>

<style lang="less" scoped>
  @import '../style/comment.less';
</style>
