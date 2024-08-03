<template>
  <b-container fluid>
    <div class="header-row">
      <Dropdown trigger="click"
                placement="bottom-end"
                transfer-class-name="dropdown-background dropdown-item-all-hover"
                @on-click="sortBy">
        <a href="javascript:void(0)">
          {{sortedValue.at(curSort).name}}
          <span class="iconfont expand" style="font-size: 14px;"/>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem v-for="item in sortedValue"
                        :class="curSort === item.value ? 'selected' : ''"
                        :key="item.value"
                        :name="item.value">
            {{item.name}}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="topic-row">
      <a-card hoverable v-for="item in topicList" :key="item.uid" size="small" class="topic-card dropdown-background">
        <img slot="cover" alt="example" :src="item.coverUrl"/>
        <a-card-meta>
          <template slot="description">
            <b-avatar :src="item.avatar" variant="light" :to="'/' + item.personalDomain" class="topic-avatar">
              <span v-if="!item.avatar" class="iconfont icon-all-flush" style="font-size:2.5rem;"></span>
            </b-avatar>
            <a :href="'/column/' + item.columnId" target="_blank">
              <div class="card-content-item">
                <p class="topic-title" :title="item.title">
                  {{item.title}}
                </p>
                <p class="topic-description" :title="item.describe">
                  {{item.describe}}
                </p>
                <p class="topic-viewCount">
                  <span>{{item.viewCount}}</span>次看过
                </p>
              </div>
            </a>
          </template>
        </a-card-meta>
      </a-card>
    </div>
  </b-container>
</template>

<script>
  export default {
    name: 'SeriesColumn',
    data() {
      return {
        curSort: 0,
        sortedValue: [
          {
            value: 0,
            name: "最多收藏"
          },
          {
            value: 1,
            name: "最多浏览"
          },
          {
            value: 2,
            name: "最近更新"
          }
        ],
        topicList: [
          {
            uid: "001",
            personalDomain: "lovbe0210",
            title: "Java开发技术手册",
            coverUrl: 'https://pic.netbian.com/uploads/allimg/240727/150142-172206370296d1.jpg',
            describe: "个人学习、工作常用知识或工作遇到问题的小记",
            viewCount: 1002,
            columnId: 12444343,
            avatar: 'https://pic.netbian.com/uploads/allimg/240626/203002-1719405002f79c.jpg'
          }, {
            uid: "002",
            personalDomain: "lzy8684",
            title: "开发精品文章",
            coverUrl: 'https://pic.netbian.com/uploads/allimg/240727/141653-1722061013ab7a.jpg',
            describe: "该知识库用于收藏平常遇到过的一些关于技术的文章（涵盖前端与后端）",
            viewCount: 4202,
            columnId: 12444343,
            avatar: 'https://pic.netbian.com/uploads/allimg/240709/175343-17205188236911.jpg'
          }, {
            uid: "003",
            personalDomain: "wuyiwa",
            title: "Linux 系统环境部署大飒飒大啊实打实多",
            coverUrl: require('@/assets/img/3.jpg'),
            describe: "讲解 Linux 系统部署 Java 项目需要的环境",
            viewCount: 502,
            columnId: 12444343,
            avatar: 'https://pic.netbian.com/uploads/allimg/240519/205724-17161234447284.jpg'
          }, {
            uid: "004",
            personalDomain: "whalexplorer",
            title: "我是第4个",
            coverUrl: require('@/assets/img/04.jpg'),
            avatar: 'https://pic.netbian.com/uploads/allimg/240424/003411-1713890051411d.jpg',
            viewCount: 308,
            columnId: 12444343,
            describe: "水电费师傅是"
          }, {
            uid: "005",
            personalDomain: "jiaowovitamin",
            title: "我是第5个",
            coverUrl: require('@/assets/img/05.jpg'),
            avatar: 'https://pic.netbian.com/uploads/allimg/240727/161014-172206781404ef.jpg',
            viewCount: 100,
            columnId: 12444343,
            describe: "水电费师傅是"
          }
        ]
      }
    },
    methods: {
      sortBy(val) {
        if (val !== this.curSort) {
          // 条件发生变化，更新list
          this.curSort = val
          alert('list刷新')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../css/home/series-column.less";
  @import "../css/common-var";
</style>
