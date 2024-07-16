<template>
  <div class="layout-module_stats" ref="tooltipContainer">
    <div class="data-stats-tip">
      <div class="data-center-title">
        <p class="title-welcome">
          👋 布衣草人，这是你和小站相伴的第 850 天
        </p>
        <p class="title-desc">
          数据更新至 2023-08-08（每日上午更新昨日数据，"--"表示暂无数据）
        </p>
      </div>
      <div class="data-center-overview">
        <div class="overview-title">
          <div class="overview-title-info">
            <h2>数据总览</h2>
            <p>你的每一份成长都被记录</p>
          </div>
          <div class="overview-title-options">
            <Dropdown placement="bottom"
                      transfer-class-name="dropdown-background dropdown-item-all-hover"
                      trigger="click" @on-click = changeStatsOption>
              <span class="stats-range">
                {{statsOption == 1 ? '近 1 年' : statsOption == 2 ? '近 30 天' : ''}}
                <span class="iconfont date-range"></span>
              </span>
              <DropdownMenu slot="list">
                <DropdownItem name="1">
                  近 1 年
                  <span class="iconfont true" v-if="statsOption === '1'" style="margin-left: 10px"/>
                </DropdownItem>
                <DropdownItem name="2">
                  近 30 天
                  <span class="iconfont true" v-if="statsOption === '2'" style="margin-left: 8px"/>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="overview-body">
          <div>
            <p>创作天数</p>
            <p>25</p>
          </div>
          <div>
            <p>创作字数</p>
            <p>349</p>
          </div>
          <div>
            <p>内容更新</p>
            <p>114</p>
          </div>
          <div>
            <p>获得点赞</p>
            <p>1</p>
          </div>
        </div>
      </div>
      <div class="data-center-detail">
        <div class="detail-myData data-item">
          <div class="data-title-Info">
            <h2>个人知识创作</h2>
          </div>
          <div class="myData-common-body">
            <div>
              <p>22,071</p>
              <p>总字数</p>
            </div>
            <div>
              <p>43</p>
              <p>笔记</p>
            </div>
            <div>
              <p>1</p>
              <p>专栏</p>
            </div>
          </div>
          <div class="myData-book">
            <img src="https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*3GL9T4hyZBMAAAAAAAAAAAAADvuFAQ/original"
                 alt="">
            <div>
              <p>其中字数最多的专栏是</p>
              <p>从头开始</p>
              <p>共有 26 篇文档，21803 字</p>
            </div>
          </div>
        </div>
        <div class="detail-public data-item">
          <div class="data-title-Info">
            <h2>对外知识分享</h2>
            <a-tooltip overlayClassName="public-data-tooltip" :getPopupContainer="getTooltipContainer">
              <template slot="title">
                含公开专栏的文档及公开分享的其他文档
              </template>
              <span class="iconfont icon-doubt"></span>
            </a-tooltip>
          </div>
          <div class="public-data-common-body">
            <div>
              <p>--</p>
              <p>公开文档</p>
            </div>
            <div>
              <p>--</p>
              <p>阅读量</p>
            </div>
            <div>
              <p>--</p>
              <p>点赞量</p>
            </div>
            <div>
              <p>--</p>
              <p>评论量</p>
            </div>
            <div>
              <p>--</p>
              <p>收录精选</p>
            </div>
          </div>
        </div>
      </div>
      <div class="data-center-hotmap">
        <hot-map></hot-map>
      </div>
    </div>
  </div>
</template>

<script>
  import HotMap from "@/components/common/HotMap";
  export default {
    name: 'Stats',
    data() {
      return {
        statsOption: '1',
        tooltipContainer: null
      }
    },
    components: {
      HotMap
    },
    methods: {
      changeStatsOption(option) {
        if (this.statsOption === option) {
          return;
        }
        this.statsOption = option;
        // 查询统计数据
      },
      getTooltipContainer() {
        return this.tooltipContainer;
      }
    },
    mounted() {
      if (this.tooltipContainer == null) {
        this.tooltipContainer = this.$refs.tooltipContainer;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../css/dashboard/stats.less';
</style>
