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
        <g :transform="'translate(' + (4+index*19.14) + ')'" v-for="(dayItem,index) in hotMap.dayBox"
           :key="index">
          <a-tooltip overlayClassName="personal-center-tooltip" v-for="(item,index) in dayItem" :key="index"
                     :getPopupContainer="getTooltipContainer">
            <template slot="title">
              {{item.day + ' ' + item.week}}
            </template>
            <rect class="hotmapRender-module_dayBox" width="14" height="14" rx="2" ry="2"
                  x="0" :y="index * 19.14" :data-level="item.level">
            </rect>
          </a-tooltip>
        </g>
        <g transform="translate(4, 136.84)" height="16">
          <text v-for="(item,index) in hotMap.monthLabel" :key="index" class="hotmapRender-module_monthLabel"
                :x="19.14 * item.firstDayByWeek" y="0">
            {{item.month}}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
    export default {
        name: "HotMap",
        data() {
            return {
              tooltipContainer: null,
              hotMap: {
                monthLabel: [
                  {
                    month: '8月',
                    firstDayByWeek: 2
                  }, {
                    month: '9月',
                    firstDayByWeek: 6
                  }, {
                    month: '10月',
                    firstDayByWeek: 10
                  }, {
                    month: '11月',
                    firstDayByWeek: 15
                  }, {
                    month: '12月',
                    firstDayByWeek: 19
                  }, {
                    month: '1月',
                    firstDayByWeek: 24
                  }, {
                    month: '2月',
                    firstDayByWeek: 28
                  }, {
                    month: '3月',
                    firstDayByWeek: 32
                  }, {
                    month: '4月',
                    firstDayByWeek: 36
                  }, {
                    month: '5月',
                    firstDayByWeek: 41
                  }, {
                    month: '6月',
                    firstDayByWeek: 45
                  }, {
                    month: '7月',
                    firstDayByWeek: 49
                  }
                ],
                dayBox: [
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: 4
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: 1
                    }
                  ],
                  [
                    {
                      day: '2022-07-11',
                      week: '周一',
                      level: 1
                    },
                    {
                      day: '2022-07-12',
                      week: '周二',
                      level: 3
                    },
                    {
                      day: '2022-07-13',
                      week: '周三',
                      level: 0
                    },
                    {
                      day: '2022-07-14',
                      week: '周四',
                      level: 5
                    },
                    {
                      day: '2022-07-15',
                      week: '周五',
                      level: 0
                    },
                    {
                      day: '2022-07-16',
                      week: '周六',
                      level: -1
                    },
                    {
                      day: '2022-07-17',
                      week: '周日',
                      level: -1
                    }
                  ]
                ]
              }
            }
        },
      methods: {
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
  .hotmap-module_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    max-width: 992px;

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
        color: #262626;
        line-height: 24px;
        font-weight: 500;
      }

      .hotmap-module_exhibition {
        display: flex;
        justify-content: space-between;

        .hotmap-module_exhibitionDesc {
          font-size: 14px;
          color: #585A5A;
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
            background-color: #F4F5F5;
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

      .hotmapRender-module_dayBox[data-level="-1"] {
        fill: #FFFFFF;
        outline: 1px solid #f5f5f5;
      }

      .hotmapRender-module_dayBox[data-level="0"] {
        fill: #F4F5F5;
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

  /deep/.personal-center-tooltip {
    padding-top: 0 !important;
  }

  /deep/ .ant-tooltip-placement-top {
    padding-bottom: 5px !important;
  }

  /deep/.ant-tooltip-inner {
    font-size: 12px;
    background-color: rgba(0, 0, 0, 0.85);
  }

  /deep/ .ant-tooltip-arrow {
    display: none;
  }
</style>
