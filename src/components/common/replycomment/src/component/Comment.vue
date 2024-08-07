<template>
  <div>
    <ContentBox :data="data"
                :parent-id="data.id"
                :contentBoxParam="param"/>
    <div class="reply-box" v-if="total > 0">
      <div class="reply-list">
        <ContentBox v-for="(reply, index) in showReply"
                    :key="index"
                    :data="reply"
                    :parent-id="data.id"
                    :contentBoxParam="param"/>
        <!-- 如果total>3则进行折叠，打开折叠后如果小于分页数，直接全部显示，否则使用分页显示 -->
        <div v-if="total > 3" class="fetch-more">
          <div v-if="collapse">
            <span>共{{ total }}条回复,&nbsp;</span>
            <span class="fetch-more-comment" @click="moreReply">
                点击查看
                <span class="iconfont drop-down"></span>
              </span>
          </div>
        </div>
        <div v-if="!collapse && total > pageSize" class="fetch-more">
          <a-pagination
            size="small"
            v-model="currentPage"
            :pageSize="pageSize"
            :total="total"
            :show-total="() => `共 ${total} 条`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {createObjectURL, cloneDeep} from '@/utils/emoji'
  import ContentBox from './ContentBox.vue'

  export default {
    name: 'UComment',
    data() {
      return {
        collapse: true,
        currentPage: 1,
        pageSize: 5,
        tempId: 1000,
        // 当前展示的回复list
        replyList: [],
        // 首次初始化后获取的总回复数
        total: 0
      }
    },
    props: {
      data: {
        type: Object
      },
      contentBoxParam: {
        // remove、addTotal
        type: Object
      }
    },
    computed: {
      param() {
        return {
                  remove: this.remove,
                  submit: this.submit
                };
      },
      userInfo() {
        return this.$store.state.userInfo;
      },
      showReply() {
        if (this.collapse && this.total > 3) {
          return this.replyList.slice(0, 3);
        } else if (this.collapse && this.total <= 3) {
          return this.replyList;
        } else {
          return this.replyList.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
        }
      }
    },

    components: {
      ContentBox
    },
    methods: {
      moreReply() {
        // 请求数据
        setTimeout(() => {
          this.collapse = false;
        }, 200)
      },

      /**
       * 提交评论
       */
      submit(comment, clear) {
        if (!comment) {
          return;
        }
        // TODO 开发完成后就不需要生成URL了，返回云端地址
        if (comment.file) {
          comment.contentImg = createObjectURL(comment.file)
        }

        setTimeout(() => {
          // 提交评论添加到评论列表
          if (this.collapse) {
            this.replyList.splice(2, 0, comment);
          } else if (!this.collapse && this.total < 5) {
            this.replyList.unshift(comment);
          } else if (!this.collapse && this.total >= 5) {
            this.replyList.splice(this.pageSize * this.currentPage - 1, 0, comment);
          } else {
            this.replyList.unshift(comment);
          }
          this.total++;
          // 外层评论总数也需要加1
          this.contentBoxParam.updateTotal(1)
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

        if (id === this.data.id) {
          // 需要向上删除
          this.contentBoxParam.remove(id);
          this.return;
        }

        // 删除掉具体的回复即可
        let index = this.replyList.findIndex(item => item.id === id)
        if (index !== -1) {
          this.replyList.splice(index, 1)
        }
        this.total--;
        // 外层评论总数也需要减1
        this.contentBoxParam.updateTotal(-1)
      }
    },
    created() {
      let tmpList = cloneDeep(this.data.reply?.list);
      this.replyList = tmpList == null ? [] : tmpList;
      this.total = tmpList == null ? 0 : tmpList.length
    }
  }

</script>

<style lang="less" scoped>
  .comment-list > .comment > .comment-primary > .comment-main {
    margin-right: 12px;
  }

  .reply-box {
    margin: 10px 0 10px 56px;
    background: var(--on-theme-bg-color);

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
