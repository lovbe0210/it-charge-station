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
                <b-avatar :src="row.avatar" variant="light" :to="row.domain" size="1.7rem">
                  <span v-if="!row.avatar">{{ row.username }}</span>
                </b-avatar>
              </slot>
            </user-card>
            <user-card :userInfo="row" :popoverContainer="popoverContainer" class="username">
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
              <span v-show="hoverRow == null || hoverRow !== row.id">
                <span v-if="relational === 'follow'">
                  {{ row.iFollow === 1 && row.followMe === 1 ? '互相关注' : row.iFollow === 1 ? '已关注' : '关注' }}
                </span>
                <span v-if="relational === 'fans'">
                  {{ row.iFollow === 1 && row.followMe === 1 ? '互相关注' : '关注' }}
                </span>
              </span>
              <span v-show="hoverRow == row.id">
                <span v-if="relational === 'follow'">
                  {{ row.iFollow === 1 ? '取消关注' : '关注' }}
                </span>
                <span v-if="relational === 'fans'">
                  {{ row.iFollow === 1 ? '取消关注' : '关注' }}
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
        // iFollow/followMe: 0 没有任何关系 1 已关注/关注我的
        relationanList: [],
        popoverContainer: null,
        // 当前hover的行id
        hoverRow: null
      }
    },
    computed: {

    },
    props: ['relational'],
    methods: {
      btnHover(row, relational, flag) {
        this.hoverRow = flag ? row.id : null;
      },
      changeRelationalType() {
        this.$router.push({path: '/dashboard/relational/' + (this.relational === 'follow' ? 'fans' : 'follow')})
      },
      changeRelational(row) {
        let filter = this.relationanList.filter(item => item.id === row.id);
        if (filter) {
          filter[0].iFollow = filter[0].iFollow === 1 ? 0 : 1;
        }
      }
    },
    components: {
      UserCard
    },
    watch: {
      'relational'(newValue, oldValue) {
        let dataList = [
          {
            id: 121112,
            username: '安沐夕',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1ho0pjdv722j30m80hs771.jpg',
            introduction: '追求卓越，学无止境！程序猿，键盘艺术家，运动（间歇性）爱好者',
            domain: 'asd34dsff',
            iFollow: 0,
            followMe: 1
          },
          {
            id: 2235663,
            username: 'HappyDragon1994',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho0pjm24n7j30m80rsn0a.jpg',
            introduction: 'work hard,play hard',
            domain: 'asd34dsasdff',
            iFollow: 1,
            followMe: 0
          },
          {
            id: 11553436,
            username: 'bravo1988',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1ho0pjmc45ij30m80rlgp3.jpg',
            introduction: '书写是思维的缓存',
            domain: '23dfsssgg55',
            iFollow: 1,
            followMe: 0
          },
          {
            id: 33442222,
            username: '咔咔',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjnvgwdj30m80rsdj1.jpg',
            introduction: 'PHP的一个小青年',
            domain: 'sasdasdas',
            iFollow: 1,
            followMe: 1
          },
          {
            id: 1214424,
            username: '白白bai',
            avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjp45pmj30jz0qndkw.jpg',
            introduction: '好白好白就是好白',
            domain: 'sasdasdas',
            iFollow: 0,
            followMe: 1
          },
          {
            id: 754345353,
            username: 'IT\'S ME!',
            avatar: 'https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hln4xfe6glj30u011in2q.jpg',
            introduction: '这就是我',
            domain: 'ssds2323',
            iFollow: 1,
            followMe: 1
          }
        ];
        this.relationanList = dataList.filter(item => {
          if (newValue === 'follow') {
            return item.iFollow === 1;
          }
          if (newValue === 'fans') {
            return item.followMe === 1;
          }
        })
      }
    },
    mounted() {
      this.popoverContainer = this.$refs.popoverContainer;
      let dataList = [
        {
          id: 121112,
          username: '安沐夕安沐夕安沐夕安沐夕安沐夕安沐夕安沐夕安沐夕安沐夕安沐夕安沐夕安沐夕安沐夕安沐夕安沐夕安沐夕',
          avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1ho0pjdv722j30m80hs771.jpg',
          introduction: '追求卓越，学无止境！程序猿，键盘艺术家，运动（间歇性）爱好者',
          domain: 'asd34dsff',
          iFollow: 0,
          followMe: 1
        },
        {
          id: 2235663,
          username: 'HappyDragon1994',
          avatar: 'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/006BNqYCly1ho0pjm24n7j30m80rsn0a.jpg',
          introduction: 'work hard,play hard',
          domain: 'asd34dsasdff',
          iFollow: 1,
          followMe: 0
        },
        {
          id: 11553436,
          username: 'bravo1988',
          avatar: 'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/006BNqYCly1ho0pjmc45ij30m80rlgp3.jpg',
          introduction: '书写是思维的缓存',
          domain: '23dfsssgg55',
          iFollow: 1,
          followMe: 0
        },
        {
          id: 33442222,
          username: '咔咔',
          avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjnvgwdj30m80rsdj1.jpg',
          introduction: 'PHP的一个小青年',
          domain: 'sasdasdas',
          iFollow: 1,
          followMe: 1
        },
        {
          id: 1214424,
          username: '白白bai',
          avatar: 'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/006BNqYCly1ho0pjp45pmj30jz0qndkw.jpg',
          introduction: '好白好白就是好白',
          domain: 'sasdasdas',
          iFollow: 0,
          followMe: 1
        },
        {
          id: 754345353,
          username: 'IT\'S ME!',
          avatar: 'https://image.baidu.com/search/down?url=https://tva1.sinaimg.cn/large/006BNqYCly1hln4xfe6glj30u011in2q.jpg',
          introduction: '这就是我',
          domain: 'ssds2323',
          iFollow: 1,
          followMe: 1
        }
      ];
      this.relationanList = dataList.filter(item => {
        if (this.relational === 'follow') {
          return item.iFollow === 1;
        }
        if (this.relational === 'fans') {
          return item.followMe === 1;
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import '../css/dashboard/relational';
</style>
