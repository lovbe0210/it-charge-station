<template>
  <b-container fluid ref="popoverContainer">
    <div class="header-row">
      <Dropdown trigger="click"
                placement="bottom-end"
                transfer-class-name="dropdown-background dropdown-item-all-hover"
                @on-click="sortBy">
        <a href="javascript:void(0)">
          {{ sortedValue.at(recommendRequest.sortType).name }}
          <span class="iconfont expand" style="font-size: 14px;"/>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem v-for="item in sortedValue"
                        :class="recommendRequest.sortType === item.value ? 'selected' : ''"
                        :key="item.value"
                        :name="item.value">
            {{ item.name }}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="topic-row"
         v-infinite-scroll="loadMore"
         :infinite-scroll-disabled="busy"
         :infinite-scroll-distance="100">
      <a-card hoverable v-for="item in columnList" :key="item.uid" size="small" class="topic-card dropdown-background">
        <img slot="cover" :alt="item.title" :src="fileUrl(item.coverUrl)"/>
        <a-card-meta>
          <template slot="description">
            <user-card :userInfo="item.userInfo"
                       :popoverContainer="popoverContainer">
              <b-avatar :src="fileUrl(item.userInfo?.avatarUrl)" variant="light" :to="'/' + item.userInfo?.domain"
                        class="topic-avatar">
                <span v-if="!item.userInfo?.avatarUrl" class="iconfont author2" style="font-size:2.5rem;"></span>
              </b-avatar>
            </user-card>
            <a :href="'/' + item.userInfo?.domain + '/' + item.uri" target="_blank">
              <div class="card-content-item">
                <p class="topic-title" :title="item.title">
                  {{ item.title }}
                </p>
                <p class="topic-description" :title="item.synopsis">
                  {{ item.synopsis }}
                </p>
                <p class="topic-viewCount">
                  <span>{{ item.viewCount }}</span>次看过
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
import contentPicksApi from "@/api/ContentPicksApi";
import UserCard from "@/components/common/UserCard.vue";

export default {
  name: 'SeriesColumn',
  data() {
    return {
      recommendRequest: {
        hasMore: true,
        offSet: 0,
        sortType: 0
      },
      sortedValue: [
        {
          value: 0,
          name: "最多浏览"
        },
        {
          value: 1,
          name: "最多收藏"
        },
        {
          value: 2,
          name: "最近更新"
        }
      ],
      columnList: [],
      popoverContainer: null
    }
  },
  computed: {
    // 设置无限滚动条目数
    busy() {
      return this.columnList.length > 100
    }
  },
  components: {
    UserCard
  },
  methods: {
    fileUrl(path) {
      if (!path) {
        return require('@/assets/cover/no-cover.png')
      }
      return this.fileService + path;
    },
    sortBy(val) {
      if (val !== this.recommendRequest.sortType) {
        // 条件发生变化，更新list
        this.recommendRequest.sortType = val;
        this.recommendRequest.offSet = 0;
        contentPicksApi.getPublicColumn(this.recommendRequest).then(data => {
          if (data?.result) {
            this.columnList = data.data.list;
            this.recommendRequest.hasMore = data.data.hasMore
          }
        })
      }
    },
    loadMore() {
      if (!this.hasMore || this.busy) {
        return;
      }
      contentPicksApi.getPublicColumn(this.recommendRequest).then(data => {
        if (data?.result) {
          this.columnList.push(...data.data.list);
          this.recommendRequest.hasMore = data.data.hasMore
          if (data.data.hasMore) {
            this.recommendRequest.offset = this.recommendRequest.offset + 20;
          }
        }
      })
    }
  },
  mounted() {
    this.popoverContainer = this.$refs.popoverContainer;
  },
  created() {
    contentPicksApi.getPublicColumn(this.recommendRequest).then(data => {
      if (data?.result) {
        this.columnList = data.data.list;
        this.recommendRequest.hasMore = data.data.hasMore
      }
    })
  }
}
</script>

<style scoped lang="less">
@import "../css/home/series-column.less";
@import "../css/common-var";
</style>
