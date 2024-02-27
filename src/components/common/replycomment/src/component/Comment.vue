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
                  @mentionSearch="mentionSearch"
                  @changeMetionList="changeMetionList"
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
  import { isNull, debounce, createObjectURL } from '@/utils/emoji'
  import { getComment } from '@/assets/emoji/comment';
  import InputBox from './InputBox'
  import CommentList from './CommentList'
  import {dayjs} from "dayjs";

  const baseUserArr = [
    {
      userId: 1,
      userName: '张三',
      userAvatar: 'https://gd-hbimg.huaban.com/cba6c7af94997ba172c32bbe668794553f29e91ef26f-qnroJ7_fw240webp'
    },
    {
      userId: 2,
      userName: '李四',
      userAvatar: 'https://gd-hbimg.huaban.com/d01263d11d07748a2193bbbdd3b9a0c8a4b062b9f39d-PKvV2t_fw240webp'
    },
    {
      userId: 3,
      userName: '王五',
      userAvatar: 'https://gd-hbimg.huaban.com/69d92bfbf36fc111e1f563403311e7943628c9fc108bf-6l34Pa_fw240webp'
    },
    {
      userId: 4,
      userName: '赵六',
      userAvatar: 'https://gd-hbimg.huaban.com/7f5c54a455f61f431ec1f7b7c0e583f4a725fb73adba-5DgU3q_fw240webp'
    },
    {
      userId: 5,
      userName: '孙七',
      userAvatar: 'https://gd-hbimg.huaban.com/edea85f44f3f8bce8d094ed78f390164a9eba229cb2e-1Lc22F_fw240webp'
    },
    {
      userId: 6,
      userName: '周八',
      userAvatar: 'https://gd-hbimg.huaban.com/c1b2131c6977e01a430d6575ba678a4afeabcad222605-UJUwwb_fw240webp'
    },
    {
      userId: 7,
      userName: '吴九',
      userAvatar: 'https://gd-hbimg.huaban.com/4942e77078bda39a458980049b528236bf79183814998-zVzEJv_fw240webp'
    },
    {
      userId: 8,
      userName: '郑十',
      userAvatar: 'https://gd-hbimg.huaban.com/628236086a2ca12d2074bdd29f496f38a4d0c06ae50f-Rj3vsO_fw240webp'
    },
    {
      userId: 9,
      userName: '王富贵',
      userAvatar: 'https://gd-hbimg.huaban.com/0108a6b65d211d3bc602bc0431e84b31f9e62ac08015f-JifENm_fw240webp'
    },
    {
      userId: 10,
      userName: '赵富贵',
      userAvatar: 'https://gd-hbimg.huaban.com/d9643d6181d506ccc159a940e11bdc6b9a2b53ae57139-pxAnk9_fw240webp'
    }
  ];

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
          comments: [],
          mentionConfig: {
            userArr: [
              {
                userId: 1,
                userName: '张三',
                userAvatar: 'https://gd-hbimg.huaban.com/cba6c7af94997ba172c32bbe668794553f29e91ef26f-qnroJ7_fw240webp'
              },
              {
                userId: 2,
                userName: '李四',
                userAvatar: 'https://gd-hbimg.huaban.com/d01263d11d07748a2193bbbdd3b9a0c8a4b062b9f39d-PKvV2t_fw240webp'
              },
              {
                userId: 3,
                userName: '王五',
                userAvatar: 'https://gd-hbimg.huaban.com/69d92bfbf36fc111e1f563403311e7943628c9fc108bf-6l34Pa_fw240webp'
              },
              {
                userId: 4,
                userName: '赵六',
                userAvatar: 'https://gd-hbimg.huaban.com/7f5c54a455f61f431ec1f7b7c0e583f4a725fb73adba-5DgU3q_fw240webp'
              },
              {
                userId: 5,
                userName: '孙七',
                userAvatar: 'https://gd-hbimg.huaban.com/edea85f44f3f8bce8d094ed78f390164a9eba229cb2e-1Lc22F_fw240webp'
              },
              {
                userId: 6,
                userName: '周八',
                userAvatar: 'https://gd-hbimg.huaban.com/c1b2131c6977e01a430d6575ba678a4afeabcad222605-UJUwwb_fw240webp'
              },
              {
                userId: 7,
                userName: '吴九',
                userAvatar: 'https://gd-hbimg.huaban.com/4942e77078bda39a458980049b528236bf79183814998-zVzEJv_fw240webp'
              },
              {
                userId: 8,
                userName: '郑十',
                userAvatar: 'https://gd-hbimg.huaban.com/628236086a2ca12d2074bdd29f496f38a4d0c06ae50f-Rj3vsO_fw240webp'
              },
              {
                userId: 9,
                userName: '王富贵',
                userAvatar: 'https://gd-hbimg.huaban.com/0108a6b65d211d3bc602bc0431e84b31f9e62ac08015f-JifENm_fw240webp'
              },
              {
                userId: 10,
                userName: '赵富贵',
                userAvatar: 'https://gd-hbimg.huaban.com/d9643d6181d506ccc159a940e11bdc6b9a2b53ae57139-pxAnk9_fw240webp'
              }
            ],
            userIdKey: 'userId',
            userNameKey: 'userName',
            userAvatarKey: 'userAvatar',
            show: true,
            mentionColor: '#1e80ff',
            showAvatar: true,
            isLoading: true
          }
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
        debugger
        let str = '提交评论:' + content + ';\t父id: ' + parentId + ';\t图片:' + file + ';\t被回复评论:' + reply +
          ';\t提及列表:' + JSON.stringify(this.mentionList)
        console.log(str)
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
          createTime: dayjs().subtract(5, 'seconds').toString(),
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
          this.$Message.success('评论成功!')
        }, 200)
      },
      focus() {
        console.log('评论框焦点事件')
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
          // this.$emit('mentionSearch', searchStr)
          if (this.config && this.config.mentionConfig) {
            this.config.mentionConfig.isLoading = true
          }
          if (!searchStr) {
            setTimeout(() => {
              if (this.config && this.config.mentionConfig) {
                this.config.mentionConfig.userArr = baseUserArr
              }
            }, 1000)

            if (this.config && this.config.mentionConfig) {
              this.config.mentionConfig.isLoading = false
            }
            return
          }
          setTimeout(() => {
            if (this.config && this.config.mentionConfig) {
              this.config.mentionConfig.userArr = baseUserArr.filter(e => {
                return e.userName.includes(searchStr)
              })
            }
            if (this.config && this.config.mentionConfig) {
              this.config.mentionConfig.isLoading = false
            }
          }, 1000)
        }, 300)
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
