<template>
  <div class="reply-box">
    <div class="reply-list">
      <ContentBox v-for="(reply, index) in data.list" :id="id" :key="index" :data="reply" reply></ContentBox>
      <div v-if="data.length > replyShowSize" class="fetch-more">
        <span v-if="loading">{{ comment.more.loading }}</span>
        <div v-else>
          <div v-if="!over">
            <span class="fetch-more-comment select-none" @click="replyMore">
              {{ comment.more.prefixTotal }}{{ data.total }}{{ comment.more.suffixTotal }}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="">
                <path
                  data-v-d6f79dbc=""
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.99976 7.93206L10.0656 3.86619C10.1633 3.76856 10.3215 3.76856 10.4192 3.86619L10.7727 4.21975C10.8704 4.31738 10.8704 4.47567 10.7727 4.5733L6.35331 8.99272C6.15805 9.18798 5.84147 9.18798 5.6462 8.99272L1.22679 4.5733C1.12916 4.47567 1.12916 4.31738 1.22679 4.21975L1.58034 3.86619C1.67797 3.76856 1.83626 3.76856 1.93389 3.86619L5.99976 7.93206Z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div v-if="over && page" class="fetch-more">
        <br />
        <a-pagination
          show-size-changer
          :current="currentPage"
          :pageSize="pageSize"
          :total="data.total"
          :change="currentChange"
          @showSizeChange="sizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import ContentBox from './ContentBox'

  import { reply, comment } from '@/assets/emoji/comment.js';
  import {usePage} from "@/utils/hooks";

  export default {
    name: 'ReplyBox',
    data() {
      return {
        loading: false,
        over: false,
        currentPage: 1,
        pageSize: 5
      }
    },
    props: {
      data: {
        type: Object
      },
      id: {
        type: String
      },
      page: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      // 分页操作
      c_data() {
        let _data = {
          total: 0,
          length: 0,
          list: []
        }
        if (this.data) {
          let length = this.data.total;
          let list = this.data.list.slice(0, this.pageSize);
          _data = {
            total: length,
            list: list
          }
        }
        return _data;
      }
    },
    components: {
      ContentBox
    },
    watch: {
      "c_data.total"(val) {
        if (val) {
          let totalPage = Math.ceil(val / this.pageSize)
          let currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
          currentPage = currentPage < 1 ? 1 : currentPage
          if (this.currentPage !== currentPage) {
            this.changePage(currentPage)
          }
        }
      }
    },
    methods: {
      replyPage({parentId, pageNum, pageSize, finish}) {
        let tmp = {
          total: reply.total,
          list: usePage(pageNum, pageSize, reply.list)
        }
        console.log('回复分页')
        setTimeout(() => {
          finish(tmp)
        }, 200)
      },
      replyMore() {
        this.over = true
      },
      finish(val) {
        comment.value.forEach(e => {
          if (e.id === this.id) {
            if (e.reply) {
              e.reply = val
            }
          }
        })
      },

      /**
       * 改变当前页数
       * @param val
       */
      changePage(val) {
        console.log(val)
        this.state.currentPage = val
        this.replyPage(this.id, val, this.state.pageSize, reply => this.finish(reply))
      },

      currentChange(val) {
        this.changePage(val);
      },

      sizeChange(val) {
        this.state.pageSize = val
        this.replyPage(this.id, this.state.currentPage, val, reply => this.finish(reply))
      }
    }
  }

  // const {replyPage, replyShowSize, comments} = inject(InjectReplyBox) as InjectReplyBoxApi
  // const { page } = inject(InjectReplyBox) as InjectReplyBoxApi
</script>

<style lang="less" scoped>
  @import '../style/reply-box.less';
</style>
