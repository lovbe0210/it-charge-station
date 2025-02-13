<template>
  <div>
    <ContentBox :data="data"
                :parent-id="data.uid"
                :contentBoxParam="param"/>
    <div class="reply-box" v-if="total > 0">
      <div class="reply-list">
        <ContentBox v-for="reply in replyList"
                    :key="reply.uid"
                    :data="reply"
                    :parent-id="data.uid"
                    :contentBoxParam="param"/>
        <!-- 如果total>5则进行折叠，打开折叠后如果小于分页数，直接全部显示，否则使用分页显示 -->
        <div v-if="total > 3 && collapse" class="fetch-more un-select">
          <span>共{{ total }}条回复,&nbsp;</span>
          <span class="fetch-more-comment" @click="moreReply(1)">
                点击查看
                <span class="iconfont drop-down"></span>
              </span>
        </div>
        <div v-if="!collapse && total > pageSize" class="fetch-more un-select">
          <div class="pagination-prefix">
            <span>共{{ Math.ceil(total / pageSize) }}页</span>
          </div>
          <b-pagination
            v-model="currentPage"
            :total-rows="total"
            :per-page="pageSize"
            first-number
            last-number
            size="sm"
            @change="moreReply">
            <template #prev-text>
              <span class="prev-page">上一页</span>
            </template>
            <template #next-text>
              <span class="next-page">下一页</span>
            </template>
            <template #ellipsis-text>
              <span class="iconfont operate-standard"></span>
            </template>
          </b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {cloneDeep} from '@/utils/emoji'
import ContentBox from './ContentBox.vue'
import socialApi from "@/api/SocialApi";

export default {
  name: 'UComment',
  data() {
    return {
      collapse: true,
      currentPage: 1,
      pageSize: 5,
      tempId: 1000,
      // 当前评论的回复列表
      replyList: [],
      // 当前评论的回复数
      total: 0
    }
  },
  props: {
    data: {
      type: Object
    },
    contentBoxParam: {
      // targetId、remove、addTotal、popoverContainer
      type: Object
    }
  },
  computed: {
    param() {
      return {
        remove: this.remove,
        submit: this.submit,
        popoverContainer: this.contentBoxParam.popoverContainer
      };
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },

  components: {
    ContentBox
  },
  methods: {
    moreReply(page) {
      // 请求数据
      let commentReplyRequest = {
        targetId: this.contentBoxParam.targetId,
        commentId: this.data?.uid,
        offset: (page - 1) * this.pageSize,
        limit: this.pageSize
      };
      socialApi.getReplyList(commentReplyRequest).then(data => {
        if (data?.result) {
          this.replyList = data.data;
        }
      })
      if (this.collapse) {
        this.collapse = false;
      }
    },

    /**
     * 提交评论
     */
    submit(comment, clear) {
      if (!comment) {
        return;
      }
      let formData = new FormData();
      formData.append('targetId', this.contentBoxParam?.targetId);
      formData.append('targetType', '4');
      if (comment.parentId) {
        formData.append('parentId', comment.parentId);
      }
      formData.append('content', comment.content);
      if (comment.contentImgFile) {
        formData.append('contentImgFile', comment.contentImgFile);
      }
      if (comment.replyUserId) {
        formData.append('replyUserId', comment.replyUserId);
      }
      socialApi.replyComment(formData).then(data => {
        if (data?.result) {
          // 提交评论添加到评论列表
          if (this.collapse) {
            this.replyList.splice(2, 0, data.data);
          } else if (!this.collapse && this.total < 3) {
            this.replyList.unshift(data.data);
          } else if (!this.collapse && this.total >= 3) {
            this.replyList.splice(this.pageSize * this.currentPage - 1, 0, data.data);
          } else {
            this.replyList.unshift(data.data);
          }
          this.total++;
          // 外层评论总数也需要加1
          this.contentBoxParam.updateTotal(1)
          // 清空输入框内容
          clear();
          this.$Message.success('评论成功!')
        }
      })
    },

    /**
     * 删除当前评论
     * @param comment
     */
    remove(uid) {
      if (!uid) {
        return;
      }
      if (uid === this.data.uid) {
        // 需要向上删除
        this.contentBoxParam.remove(uid, this.total);
        this.return;
      }

      // 删除掉具体的回复即可
      let index = this.replyList.findIndex(item => item.uid === uid)
      if (index !== -1) {
        socialApi.deleteCommentReply(uid).then(data => {
          if (data?.result) {
            this.replyList.splice(index, 1);
            this.total--;
            // 外层评论总数也需要减1
            this.contentBoxParam.updateTotal(-1)
            this.$Message.success("删除成功");
          }
        })
      }
    }
  },
  created() {
    let tmpList = cloneDeep(this.data?.replyList);
    this.replyList = tmpList == null ? [] : tmpList;
    this.total = this.data?.replyCount;
  }
}

</script>

<style lang="less" scoped>
@import "../../../../css/common-var";
.comment-list > .comment > .comment-primary > .comment-main {
  margin-right: 12px;
}

.reply-box {
  margin: 10px 0 10px 56px;

  .reply-list {
    padding-left: 12px;
    border-radius: 4px;
  }

  .fetch-more {
    padding: 10px 0;
    font-size: 12px;
    line-height: 22px;
    display: flex;
    align-items: center;

    .fetch-more-comment {
      color: #1890ff;
      box-sizing: border-box;
      cursor: pointer;

      .iconfont {
        font-size: 12px;
      }
    }

    .pagination-prefix {
      margin-right: 8px;
    }

    .pagination {
      align-items: center;
      /deep/.page-item {
        .page-link {
          border: unset !important;
          background: unset;
          font-size: 13px;
          font-weight: 500;
          color: @light-font-color;

          &:hover {
            color: @link-color !important;
          }

          &:focus {
            box-shadow: unset;
          }
        }

        [role="menuitem"][aria-disabled="true"].page-link {
          display: none;
        }
      }

      /deep/.page-item.active .page-link {
        color: @link-color !important;
      }
    }
  }
}

html.dark {
}

</style>
