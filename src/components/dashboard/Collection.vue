<template>
  <div class="layout-module_collection" ref="tooltipContainer">
    <div class="collect-header">
      <h2 class="title">收藏</h2>
      <hr class="separator-line">
      <div class="operation">
        <Input class="search" search placeholder="搜索标题关键词"/>
        <div class="action">
          <Dropdown placement="bottom-end" @on-click="changeCollectType">
            <a href="javascript:void(0)">
              <div class="icon-box">
                <span class="iconfont filter"></span>
              </div>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="">
                <div style="min-width: 25px">
                  <span class="iconfont true" v-if="groupType === ''"></span>
                </div>
                全部
              </DropdownItem>
              <DropdownItem name="1">
                <div style="min-width: 25px">
                  <span class="iconfont true" v-if="groupType === '1'"></span>
                </div>
                文档
              </DropdownItem>
              <DropdownItem name="2">
                <div style="min-width: 25px">
                  <span class="iconfont true" v-if="groupType === '2'"></span>
                </div>
                专题
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="mark-module_container">
      <div class="marks-group">
        <div :class="['mark-item', selectGroup === null ? 'active' : '']" @click="getCollectList(null)">
          <div class="mark-name">
            全部收藏
            <div class="mark-aside-add">
              <span class="iconfont add"/>
            </div>
          </div>
          <div class="mark-action-count">
            <span class="mark-count-number">{{totalCollect}} 条内容</span>
          </div>
        </div>
        <div v-for="group in groupList"
             :key="group.uid"
             :class="['mark-item', selectGroup === group.uid ? 'active' : '']"
             @click="getCollectList(group.uid)">
          <div class="mark-name">
            {{group.name}}
            <div class="mark-aside-add">
              <span class="iconfont operate"/>
            </div>
          </div>
          <div class="mark-action-count">
            <span class="mark-count-number">{{group.collectCount}} 条内容</span>
          </div>
        </div>
      </div>
      <div class="marks-list">
        <Table :columns="tableHeader"
               :data="collectList"
               no-data-text="空空如也，快去首页看看吧"
               @on-cell-click="clickCell">
          <template slot-scope="{ row }" slot="name">
            <a-tooltip :getPopupContainer="()=>tooltipContainer"
                       placement="topLeft">
              <template slot="title">
                {{ row.name }}
              </template>
              <span>
                {{ row.name }}
              </span>
            </a-tooltip>
          </template>
          <template slot-scope="{ row }" slot="belongName">
            <a-tooltip :getPopupContainer="()=>tooltipContainer"
                       placement="topLeft">
              <template slot="title">
                {{ row.type === 1 ? row.userName + ' / ' + row.columnName : row.userName }}
              </template>
              <span>
                {{ row.type === 1 ? row.userName + ' / ' + row.columnName : row.userName }}
              </span>
            </a-tooltip>
          </template>
          <template slot-scope="{ row }" slot="collectTime">
            <span>
              {{ formatDateString(row.collectTime) }}
            </span>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '@/utils/utils.js'

  export default {
    name: 'Collection',
    data() {
      return {
        selectGroup: null,
        groupType: '',
        groupList: [
          {
            uid: 112,
            name: '我的最爱',
            collectCount: 10
          },
          {
            uid: 113,
            name: 'web前端学习',
            collectCount: 10
          },
          {
            uid: 114,
            name: 'JAVA',
            collectCount: 102
          }
        ],
        // 收藏类型 1文章 2专栏
        collectList: [
        /*  {
            id: 12345,
            name: '系统架构图',
            type: 1,
            domain: '123444',
            userName: '小黑bu惑',
            columnId: 12121212,
            columnName: '吉吉国王的春秋美梦吉吉国王的春秋美梦吉吉国王的春秋美梦吉吉国王的春秋美梦',
            collectTime: 1683029838000
          },
          {
            id: 12341,
            name: '能解答一切的答案',
            type: 2,
            domain: '123444',
            userName: '小黑bu惑',
            columnId: 12341,
            columnName: '能解答一切的答案',
            collectTime: 1683004838000
          },
          {
            id: 12355,
            name: '系统架构图',
            type: 1,
            domain: '12113444',
            userName: 'Andy',
            columnId: 22233232323,
            columnName: '捷停车基础业务培训',
            collectTime: 1700666438000
          },
          {
            id: 12145,
            name: 'Java开发技术手册',
            type: 2,
            domain: '123444',
            userName: '小黑bu惑',
            columnId: 12145,
            columnName: 'Java开发技术手册',
            collectTime: 1705936838000
          },
          {
            id: 17345,
            name: ' Seata—分布式事务解决方案',
            type: 1,
            domain: '123444',
            userName: '小黑bu惑',
            columnId: 2323,
            columnName: 'Java开发技术手册',
            collectTime: 1711120838000
          }*/
        ],
        tableHeader: [
          {
            title: '名称',
            slot: 'name',
            sortable: true,
            width: 260
          },
          {
            title: '归属',
            slot: 'belongName',
            width: 240
          },
          {
            title: '收藏时间',
            slot: 'collectTime',
            sortable: true,
            width: 170
          }
        ],
        tooltipContainer: null
      }
    },
    methods: {
      getCollectList(uid) {
        this.selectGroup = uid;
      },
      changeCollectType(name) {
        this.groupType = name;
      },
      formatDateString(timestamp) {
        let fmt = 'yyyy-MM-dd HH:mm:ss';
        return formatDate(new Date(timestamp), fmt);
      },
      clickCell(row, column) {
        // 收藏类型 1文章 2专栏
        if (column._index === 0) {
          if (row.type === 1) {
            let path = row.columnId ? ('/column/' + row.columnId + '/' + row.id) : ('/article/' + row.id);
            this.$router.push({path: path});
          } else {
            this.$router.push({path: '/column/' + row.id});
          }
          return;
        }

        if (column._index === 1) {
          if (row.type === 1) {
            let path = row.columnId ? ('/column/' + row.columnId) : ('/' + row.domain);
            this.$router.push({path: path});
          } else {
            this.$router.push({path: '/' + row.domain});
          }
        }
      }
    },
    computed: {
      totalCollect() {
        let total = 0;
        this.groupList.forEach(group => {
          total = total + group.collectCount;
        })
        return total;
      }
    },
    mounted() {
      this.tooltipContainer = this.$refs.tooltipContainer;
    }
  }
</script>

<style scoped lang="less">
  @import '../css/dashboard/collection.less';
</style>
