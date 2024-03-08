<template>
  <div>
    <ContentBox :data="data"
                :parent-id="data.id"
                :contentBoxParam="param"/>
    <div class="reply-box" v-if="data.reply?.total > 0">
      <div class="reply-list">
        <ContentBox v-for="(reply, index) in replyList(data.reply)"
                    :key="index"
                    :data="reply"
                    :parent-id="data.id"
                    :contentBoxParam="param"/>
        <!-- 如果total>3则进行折叠，打开折叠后如果小于分页数，直接全部显示，否则使用分页显示 -->
        <div v-if="data.reply.total > 3" class="fetch-more">
          <div v-if="collapse">
            <span>共{{ data.reply.total }}条回复,&nbsp;</span>
            <span class="fetch-more-comment" @click="moreReply">
                点击查看
                <span class="iconfont drop-down"></span>
              </span>
          </div>
        </div>
        <div v-if="!collapse && data.reply.total > pageSize" class="fetch-more">
          <a-pagination
            size="small"
            v-model="currentPage"
            :pageSize="pageSize"
            :total="data.reply.total"
            :show-total="total => `共 ${total} 条`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {str, createObjectURL, cloneDeep} from '@/utils/emoji'
  import ContentBox from './ContentBox.vue'

  export default {
    name: 'UComment',
    data() {
      return {
        collapse: true,
        currentPage: 1,
        pageSize: 5,
        tempId: 1000
      }
    },
    props: {
      data: {
        type: Object
      },
      contentBoxParam: {
        // submit、delete
        type: Object
      }
    },
    computed: {
      param() {
        let { remove } = this.contentBoxParam;
        return { remove, submit: this.submit};
      },
      userInfo() {
        return this.$store.state.userInfo;
      }
    },

    components: {
      ContentBox
    },
    methods: {
      safeStr(id) {
        return str(id)
      },
      moreReply() {
        // 请求数据
        setTimeout(() => {
          // this.changePage(1);
          this.collapse = false;
        }, 200)
      },
      replyList(reply) {
        console.log("触发计算", reply.total)
        if (this.collapse && reply?.total > 3) {
          return reply.list.slice(0, 3);
        } else if (this.collapse && reply?.total <= 3) {
          return reply.list
        } else {
          return reply.list?.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
        }
      },
      /**
       * 提交评论
       */
      submit({content, parentId, file, clear}) {
        let contentImg = file?.map(e => createObjectURL(e)).join('||')

        this.tempId += 1
        const comment = {
          id: this.tempId,
          parentId: parentId,
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
          // 提交评论添加到评论列表
          debugger
          if (comment) {
            let rawComment = this.data.reply.find(v => v.id === parentId)
            if (rawComment) {
              let replys = rawComment.reply
              let tmpReply = null;
              if (replys) {
                let tmpReplyList = cloneDeep(replys.list);
                if (this.collapse) {
                  tmpReplyList.splice(2, 0, comment);
                } else if (!this.collapse && tmpReplyList.length < 5) {
                  tmpReplyList.unshift(comment);
                } else if (!this.collapse && tmpReplyList.length >= 5) {
                  tmpReplyList.splice(this.pageSize * this.currentPage - 1, 0, comment);
                } else {
                  tmpReplyList.unshift(comment);
                }
                tmpReply = {
                  list: tmpReplyList,
                  total: tmpReplyList.length
                }
              } else {
                tmpReply = {
                  total: 1,
                  list: [comment]
                }
              }
              rawComment.reply = tmpReply;
            }
          }

          // 清空输入框内容
          clear();

          this.$Message.success('评论成功!')
        }, 200)
      }
    }
  }

</script>

<style lang="less" scoped>
  .comment-list > .comment > .comment-primary > .comment-main {
    margin-right: 12px;
  }

  .reply-box {
    margin: 10px 0 10px 56px;
    background: #f7f7f7;

    .reply-list {
      padding: 12px 12px 12px 0;
      border-radius: 4px;
    }

    .fetch-more {
      margin-left: 36px;
      margin-top: 10px;
      color: #6d757a;
      font-size: 12px;
      line-height: 22px;

      .fetch-more-comment {
        color: #1890ff;
        box-sizing: border-box;
        cursor: pointer;

        .iconfont {
          font-size: 12px;
        }
      }

      /deep/ .ant-pagination {
        // 分页UI
        font-size: 12px !important;

        .ant-pagination-item-link {
          display: flex;
          justify-content: center;
          align-items: center;
          border: none !important;

          i {
            font-size: 10px;
          }
        }

        .ant-pagination-prev:focus .ant-pagination-item-link, .ant-pagination-next:focus .ant-pagination-item-link {
          color: unset;
        }

        .ant-pagination-item {
          border: none !important;
        }

        .ant-pagination-item-active {
          border: none !important;
          background-color: unset !important;
          color: #1890ff;
        }
      }
    }
  }

  html.dark {
  }

</style>
