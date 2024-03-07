<template>
  <div class="reply-box">
    <div class="reply-list">
      <ContentBox v-for="(reply, index) in replyList"
                  :key="index"
                  :data="reply"
                  :parent-id="parentId"
                  :contentBoxParam="contentBoxParam"/>
      <!-- 如果total>3则进行折叠，打开折叠后如果小于分页数，直接全部显示，否则使用分页显示 -->
      <div v-if="data.total > 3" class="fetch-more">
        <div v-if="collapse">
          <span>共{{ data.total }}条回复,&nbsp;</span>
          <span class="fetch-more-comment" @click="moreReply">
            点击查看
            <span class="iconfont drop-down"></span>
          </span>
        </div>
      </div>
      <div v-if="!collapse && data.total > pageSize" class="fetch-more">
        <a-pagination
          size="small"
          v-model="currentPage"
          :pageSize="pageSize"
          :total="data.total"
          :show-total="total => `共 ${total} 条`"
          @change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import ContentBox from './ContentBox'

  // import {comment} from '@/assets/emoji/comment.js';

  export default {
    name: 'ReplyBox',
    data() {
      return {
        loading: false,
        collapse: true,
        currentPage: 1,
        pageSize: 5,
        dataList: []
      }
    },
    props: {
      data: {
        type: Object
      },
      parentId: {
        type: String
      },
      contentBoxParam: {
        type: Object
      }
    },
    computed: {
      // 分页操作
      replyList() {
        console.log("触发计算")
        if (this.collapse && this.data?.total > 3) {
          return this.data.list.slice(0, 3);
        } else if (this.collapse && this.data?.total <= 3) {
          return this.data.list
        } else {
          return this.data.list.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
        }
      }
    },
    components: {
      ContentBox
    },
    methods: {
      /**
       * 改变当前页数
       * @param val
       */
      changePage(val) {
       /* let rawComment = comment.find(v => v.id === this.parentId)
        if (rawComment?.reply) {
          let replyList = rawComment.reply.list;
          this.dataList = replyList.slice(this.pageSize * (val - 1), this.pageSize * val)
          return;
        }
        this.dataList = [];*/
      },
      moreReply() {
        // 请求数据
        setTimeout(() => {
          // this.changePage(1);
          this.collapse = false;
        }, 200)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/reply-box.less';
</style>
