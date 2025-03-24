<template>
  <div class="layout-module_relational un-select" ref="popoverContainer">
    <div class="relational-header">
      <div class="head-wrapper">
        <div class="head-title">
          <span :class="relational === 'follow' ? 'active' : ''" @click="changeRelationalType">
            关注
          </span>
          <span :class="relational === 'fans' ? 'active' : ''" @click="changeRelationalType">
            粉丝
          </span>
        </div>
      </div>
    </div>
    <div class="relational-body">
      <Table :columns="tableHeader"
             :data="relationanList"
             no-data-text="空空如也，快去首页看看吧">
        <template slot-scope="{ row }" slot="username">
          <div class="user-show-info">
            <b-avatar :src="fileUrl(row.avatarUrl)"
                      variant="light"
                      :to="'/' + row.domain"
                      target="_blank"
                      size="1.7rem">
              <span v-if="!row.avatarUrl">{{ row.username }}</span>
            </b-avatar>
            <user-card :userInfo="row"
                       :popoverContainer="popoverContainer"
                       class="username">
              <slot>
                {{ row.username }}
              </slot>
            </user-card>
          </div>
        </template>
        <template slot-scope="{ row }" slot="status">
          <div @mouseenter="btnHover(row, relational, true)" @mouseleave="btnHover(row, relational, false)"
               style="width: 90px">
            <Button @click="changeRelational(row)" class="relation-btn">
              <span v-show="hoverRow == null || hoverRow !== row.uid">
                <span v-if="relational === 'follow'">
                  {{ row.isEachFollow === 1 ? '互相关注' : row.isEachFollow === 0 ? '已关注' : '关注' }}
                </span>
                <span v-if="relational === 'fans'">
                  {{ row.isEachFollow === 1 ? '互相关注' : '关注' }}
                </span>
              </span>
              <span v-show="hoverRow == row.uid">
                <span v-if="relational === 'follow'">
                  {{ (row.isEachFollow === 1 || row.isEachFollow === 0) ? '取消关注' : '关注' }}
                </span>
                <span v-if="relational === 'fans'">
                  {{ row.isEachFollow === 1 ? '取消关注' : '关注' }}
                </span>
              </span>
            </Button>
          </div>
        </template>
      </Table>
    </div>
    <div class="relationship-pagination" v-if="total > pageInfo.limit">
      <div class="pagination-prefix">
        <span>总共{{ total }}人</span>
      </div>
      <b-pagination
        v-model="currentPage"
        :total-rows="total"
        :per-page="pageInfo.limit"
        first-number
        last-number
        @change="pageChange">
        <template #prev-text>
          <span class="iconfont return"></span>
        </template>
        <template #next-text>
          <span class="iconfont to-right"></span>
        </template>
        <template #ellipsis-text>
          <span class="iconfont operate-standard"></span>
        </template>
      </b-pagination>
    </div>
  </div>
</template>

<script>
  import UserCard from "@/components/common/UserCard.vue";
  import socialApi from "@/api/SocialApi";

  export default {
    name: 'Relational',
    data() {
      return {
        tableHeader: [
          {
            title: '名称',
            slot: 'username',
            width: 340
          },
          {
            title: '简介',
            key: 'introduction',
            width: 320
          },
          {
            title: ' ',
            slot: 'status',
            width: 180
          }
        ],
        total: 0,
        currentPage: 1,
        relationanList: [],
        popoverContainer: null,
        // 当前hover的行id
        hoverRow: null,
        pageInfo: {
          limit: 10,
          offset: 0
        }
      }
    },
    computed: {
    },
    props: ['relational'],
    methods: {
      fileUrl(path) {
        return this.fileService + path;
      },
      btnHover(row, relational, flag) {
        this.hoverRow = flag ? row.uid : null;
      },
      changeRelationalType() {
        this.$router.push({path: '/user/relational/' + (this.relational === 'follow' ? 'fans' : 'follow')})
      },
      changeRelational(row) {
        let action = 0;
        if (this.relational === 'follow') {
          action = (row.isEachFollow === 1 || row.isEachFollow === 0) ? 0 : 1;
        } else {
          action = row.isEachFollow === 1 ? 0 : 1;
        }
        let attentionRequest = {
          targetUser: row.uid,
          action: action
        }
        socialApi.followAction(attentionRequest).then(data => {
          if (data?.result) {
            let action = 0;
            if (this.relational === 'follow') {
              action = row.isEachFollow === 1 ? -1 : row.isEachFollow === 0 ? -1 : 1;
            } else {
              action = row.isEachFollow === 1 ? -1 : 1;
            }
            this.relationanList
              .filter(relation => relation.uid === row.uid)
              .forEach(rel => {
                rel.isEachFollow = action;
                row.isEachFollow = action;
              });
            this.$Message.success(attentionRequest.action ? '关注成功' : '已取消关注');
          }
        })
      },
      pageChange(page) {
        this.pageInfo.offset = (page - 1) * this.pageInfo.limit;
        socialApi.getRelationshipList(this.relational, this.pageInfo).then(data => {
          if (data?.result) {
            this.relationanList = data.data.list;
            this.total = data.data.total;
          }
        })
      }
    },
    components: {
      UserCard
    },
    watch: {
      'relational'(newValue) {
        this.total = 0;
        this.currentPage = 1;
        this.pageInfo.offset = 0;
        this.pageInfo.limit = 10;
        socialApi.getRelationshipList(newValue, this.pageInfo).then(data => {
          if (data?.result) {
            this.relationanList = data.data.list;
            this.total = data.data.total;
          }
        })
      }
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
      socialApi.getRelationshipList(this.relational, this.pageInfo).then(data => {
        if (data?.result) {
          this.relationanList = data.data.list;
          this.total = data.data.total;
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import '../css/creativespace/relational';
</style>
