<template>
  <div class="u-comment">
    <div v-if="showForm" class="comment-form">
      <slot name="header">
        <div class="header">
          <span class="header-title">评论</span>
        </div>
      </slot>
      <div class="content">
        <div class="avatar-box">
          <el-avatar :size="40" :src="config.user.avatar">
            <span v-if="config.user.username">{{ config.user.username }}</span>
            <img v-else src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
        </div>
        <InputBox v-bind="$attrs" ref="inputBox" :placeholder="placeholder" content-btn="发表评论" />
      </div>
    </div>
    <!-- <div class="hot-list"></div> -->
    <div v-if="showContent" class="comment-list-wrapper">
      <slot>
        <div class="title">全部评论</div>
      </slot>
      <CommentList :data="comments"></CommentList>
    </div>
  </div>
</template>

<script>
  import { InjectionEmojiApi, isNull, debounce } from '~/index';
  import { InjectContentBox, InjectInputBox, InjectReplyBox, InjectSlots } from '../key';

  export default {
    name: 'UComment',
    data() {
      return {
        replyShowSize: null,
        aTarget: null,
        placeholder: '输入评论（Enter换行，Ctrl + Enter发送）',
        showForm: true,
        showContent: true,
        showLevel: true,
        showLikes: true,
        showAddress: true,
        showHomeLink: true,
        showReply: true
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
    methods: {
      /**
       * 提交评论
       */
      submit ({content, parentId, reply, files, clear}) {
        // 添加评论
        const finish = (comment) => {
          // 清空输入框内容
          clear();
          // 提交评论添加到评论列表
          if (Comment) {
            if (parentId) {
              let rawComment = this.config.comments.value.find(v => v.id === parentId)
              if (rawComment) {
                let replys = rawComment.reply
                if (replys) {
                  replys.list.unshift(Comment)
                  replys.total++
                } else {
                  rawComment.reply = {
                    total: 1,
                    list: [Comment]
                  }
                }
              }
            } else {
              this.config.comments.value.unshift(Comment)
            }
          }
        }
        this.$emit('submit', { content, parentId, reply, files, mentionList: mentionList.value, finish })
      }
    }
  }



  const inputBoxParam = {
    upload: props.upload,
    submit: submit,
    focus: () => emit('focus')
  }
  // 输入框盒子
  provide(InjectInputBox, inputBoxParam)
  provide('cancelFn', () => this.$emit('cancel'))

  // 点赞评论数组处理
  const editLikeCount = (id, count) => {
    let tar = null
    comments.value.forEach(v => {
      if (v.id == id) {
        tar = v
      } else {
        tar = v.reply?.list.find(v => v.id == id)
      }
      if (tar && tar.likes) {
        tar.likes += count
      }
    })
  }

  /**
   * 点赞事件
   * @param id
   */
  const like = (id) => {
    // 点赞事件处理
    const likeIds = props.config.user.likeIds
    if (likeIds) {
      emit('like', id, () => {
        if (likeIds.findIndex(item => item == id) == -1) {
          // 点赞
          likeIds.push(id)
          editLikeCount(id, 1)
        } else {
          // 取消点赞
          let index = likeIds.findIndex(item => item == id)
          if (index != -1) {
            likeIds.splice(index, 1)
            editLikeCount(id, -1)
          }
        }
      })
    }
  }
  /**
   * 评论盒子参数或方法
   */
  const contentBoxParam = {
    user: user,
    like: like,
    relativeTime: isNull(props.relativeTime, false),
    showInfo: (uid, finish) => emit('showInfo', uid, finish),
    aTarget: isNull(aTarget, '_blank'),
    showLevel,
    showLikes,
    showAddress,
    showHomeLink,
    showReply
  }
  provide(InjectContentBox, contentBoxParam)

  // 回复盒子
  const replyBoxParam = {
    page: props.page,
    replyPage: (parentId, pageNum, pageSize, finish) => {
      emit('replyPage', { parentId, pageNum, pageSize, finish })
    },
    replyShowSize: isNull(replyShowSize?.value, 3),
    comments: comments
  }
  provide(InjectReplyBox, replyBoxParam)

  /**
   * 删除当前评论
   * @param comment
   */
  const remove = (comment) => {
    // 删除评论数据操作
    const { parentId, id } = Comment
    if (parentId) {
      let comment = comments.value.find(item => item.id == parentId)
      let reply = Comment?.reply
      if (reply) {
        let index = reply.list.findIndex(item => item.id == id)
        if (index != -1) {
          reply.list.splice(index, 1)
          reply.total--
        }
      }
    } else {
      let index = comments.value.findIndex(item => item.id == id)
      if (index != -1) {
        comments.value.splice(index, 1)
      }
    }
  }
  const inputBox = ref(null)
  const mentionList = ref([])
  function changeMetionList(list) {
    mentionList.value = list
  }
  function getMentionList() {
    return mentionList.value
  }
  // mentionList 触发事件
  const mentionSearch = debounce((searchStr) => {
    emit('mentionSearch', searchStr)
  }, 300)
  // 表情包
  provide(InjectionEmojiApi, props.config.emoji)
  //提及配置
  provide('mentionConfig', mentionConfig)
  // 工具卡槽
  provide(InjectSlots, useSlots())
  //修改提及列表
  provide('changeMetionList', changeMetionList)
  //修改提及列表
  provide('mentionSearch', mentionSearch)
  defineExpose({
    remove: remove,
    mentionList: mentionList,
    getMentionList: getMentionList,
    setMentionShow: (show) => {
      ;(inputBox.value).setMentionShow(show)
    }
  })
</script>

<style lang="scss" scoped>
@use '../style/comment.scss';
</style>
