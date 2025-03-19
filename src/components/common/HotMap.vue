<template>
  <div class="hotmap-module_box" ref="tooltipContainer">
    <div class="hotmap-module_title">
      <span class="hotmap-module_label">创作指数</span>
      <div class="hotmap-module_exhibition">
        <span class="hotmap-module_exhibitionDesc">不活跃</span>
        <div class="hotmap-module_exhibitionBlock">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <span class="hotmap-module_exhibitionDesc">活跃</span>
      </div>
    </div>
    <div class="hotmap">
      <svg width="998.14" height="158.84000000000003" class="hotmap-module_hotmapSvg hotmap-svg">
        <g :transform="'translate(' + (4+index*19.14) + ')'" v-for="(dayItem,index) in hotMap.yearLabel"
           :key="index">
          <a-tooltip overlayClassName="personal-center-tooltip" v-for="(item,index) in dayItem" :key="index"
                     :getPopupContainer="getTooltipContainer">
            <template slot="title">
              {{ item.date + ' ' + item.week }}
            </template>
            <rect class="hotmapRender-module_dayBox" width="14" height="14" rx="2" ry="2"
                  x="0" :y="index * 19.14" :data-level="item.level">
            </rect>
          </a-tooltip>
        </g>
        <g transform="translate(4, 136.84)" height="16">
          <text v-for="(item,index) in hotMap.monthLabel" :key="index" class="hotmapRender-module_monthLabel"
                :x="19.14 * item.firstDayByWeek" y="0">
            {{ item.month }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import writeCenterApi from "@/api/WriteCenterApi";

export default {
  name: "HotMap",
  data() {
    return {
      tooltipContainer: null,
      hotMap: {
        monthLabel: [],
        yearLabel: []
      }
    }
  },
  props: ["domain"],
  methods: {
    getTooltipContainer() {
      return this.tooltipContainer;
    }
  },
  mounted() {
    this.tooltipContainer = this.$refs.tooltipContainer;
  },
  created() {
    writeCenterApi.getGrowthStatList(this.domain).then(data => {
      if (data?.result) {
        this.hotMap = data.data;
      }
    })
  }
}
</script>

<style scoped lang="less">
.hotmap-module_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .hotmap-module_title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 24px;

    .hotmap-module_label {
      flex: 1;
      font-size: 16px;
      color: var(--font-color);
      line-height: 24px;
      font-weight: 500;
    }

    .hotmap-module_exhibition {
      display: flex;
      justify-content: space-between;

      .hotmap-module_exhibitionDesc {
        font-size: 14px;
        color: var(--title-color);
      }

      .hotmap-module_exhibitionBlock {
        display: flex;
        align-items: center;
        margin: 0 12px;
        margin-right: 6px;

        span {
          width: 14px;
          height: 14px;
          border-radius: 2px;
          margin-right: 6px;
          display: block;
        }

        span:first-child {
          background-color: #ffffff;
          outline: 1px solid #f1f1f1;
        }

        span:nth-child(2) {
          background-color: #DAF6EA;
        }

        span:nth-child(3) {
          background-color: #C7F0DF;
        }

        span:nth-child(4) {
          background-color: #82EDC0;
        }

        span:nth-child(5) {
          background-color: #0BD07D;
        }

        span:nth-child(6) {
          background-color: #00663B;
        }
      }
    }
  }

  .hotmap {
    width: 100%;
    overflow-x: auto;

    &::-webkit-scrollbar-thumb {
      background-color: unset;
      border-radius: 4px;
    }

    &::-webkit-scrollbar {
      height: 7px;
    }

    &:hover::-webkit-scrollbar {
      width: 7px;
    }

    &:hover::-webkit-scrollbar-thumb {
      background-color: rgba(139, 139, 139, 0.93);
      border-radius: 4px;
    }


    svg:not(:root) {
      overflow: hidden;
    }

    .hotmapRender-module_dayBox {
      shape-rendering: geometricPrecision;
      fill: #F4F5F5;
      outline-offset: -1px;
      pointer-events: all;
    }

    .hotmapRender-module_monthLabel {
      fill: #8A8F8D;
      font-size: 12px;
      dominant-baseline: text-before-edge;
    }

    .hotmapRender-module_dayBox[data-level="0"] {
      fill: #ffffff;
      outline: 1px solid #f1f1f1;
    }

    .hotmapRender-module_dayBox[data-level="1"] {
      fill: #DAF6EA;
    }

    .hotmapRender-module_dayBox[data-level="2"] {
      fill: #C7F0DF;
    }

    .hotmapRender-module_dayBox[data-level="3"] {
      fill: #82EDC0;
    }

    .hotmapRender-module_dayBox[data-level="4"] {
      fill: #0BD07D;
    }

    .hotmapRender-module_dayBox[data-level="5"] {
      fill: #00663B;
    }
  }
}

/deep/ .personal-center-tooltip {
  padding-top: 0 !important;
}

/deep/ .ant-tooltip-placement-top {
  padding-bottom: 5px !important;
}

/deep/ .ant-tooltip-inner {
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.85);
}

/deep/ .ant-tooltip-arrow {
  display: none;
}
</style>
