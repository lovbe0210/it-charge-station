<template>
  <div class="layout-module_relational" ref="popoverContainer">
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
        <div class="head-input-search">
          <Input placeholder="搜索">
            <span class="iconfont i-search" slot="prefix"/>
          </Input>
        </div>
      </div>
    </div>
    <div class="relational-body">
      <Table :columns="tableHeader"
             :data="relationanList"
             no-data-text="空空如也，快去首页看看吧">
        <template slot-scope="{ row }" slot="username">
          <div class="user-show-info">
            <user-card :userInfo="row" :popoverContainer="popoverContainer" class="avatar">
              <slot>
                <b-avatar :src="fileUrl(row.avatarUrl)"
                          variant="light"
                          :to="'/' + row.domain"
                          target="_blank"
                          size="1.7rem">
                  <span v-if="!row.avatarUrl">{{ row.username }}</span>
                </b-avatar>
              </slot>
            </user-card>
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
  </div>
</template>

<script>
  import UserCard from "@/components/common/UserCard.vue";
  import socialApi from "../../api/SocialApi";

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
        relationanList: [],
        popoverContainer: null,
        // 当前hover的行id
        hoverRow: null,
        limit: 10,
        offset: 0
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
      }
    },
    components: {
      UserCard
    },
    watch: {
      'relational'(newValue, oldValue) {
        socialApi.getRelationshipList(newValue).then(data => {
          if (data?.result) {
            this.relationanList = data.data;
          }
        })
      }
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
      socialApi.getRelationshipList(this.relational).then(data => {
        if (data?.result) {
          this.relationanList = data.data;
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import '../css/creativespace/relational';
</style>
