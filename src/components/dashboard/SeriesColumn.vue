<template>
  <div class="layout-module_SeriesColumn" ref="TooltipContainer">
    <div class="column-home-header">
      <h2 class="title">个人专栏</h2>
      <div class="operation">
        <div class="action">
          <div class="icon-box">
            <a-tooltip placement="bottom" :getPopupContainer="getTooltipContainer">
              <template slot="title">
                新建专栏
              </template>
              <span class="iconfont add"></span>
            </a-tooltip>
          </div>
          <div class="icon-box" style="opacity: 0.5; pointer-events: none;cursor: not-allowed !important; ">
            <a-tooltip placement="bottom" :getPopupContainer="getTooltipContainer">
              <template slot="title">
                列表展示
              </template>
              <span class="iconfont icon-drop-down"></span>
            </a-tooltip>
          </div>
          <div class="icon-box">
            <a-tooltip placement="bottom" :getPopupContainer="getTooltipContainer">
              <template slot="title">
                详情展示
              </template>
              <span class="iconfont icon-drop-down" style="transform: rotate(180deg);"></span>
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="column-home-list">
      <div class="column-list-item" v-for="columnItem in seriesColumnList" :key="columnItem.id">
        <div class="ant-card larkui-card Books-module_book">
          <div class="ant-card-body">
            <div class="ant-card-meta">
              <div class="ant-card-meta-avatar">
                <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                     class="larkui-icon larkui-icon-book-type-default icon-svg Books-module_cardMetaIcon_KJzga larkui-tooltip index-module_size_wVASz"
                     group="[object Object]" data-name="BookTypeDefault"
                     style="width: 24px; height: 24px; min-width: 24px;">
                  <g fill="none" fill-rule="evenodd">
                    <path d="M4.75 1.267h10.5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4.75a2 2 0 0 1-2-2v-14a2 2 0 0 1 2-2Z"
                          fill="#C4DCFF"></path>
                    <path d="M4.75 1.267h2.215v18H5.75a3 3 0 0 1-3-3v-13a2 2 0 0 1 2-2Z" fill="#679FF4"></path>
                    <path stroke="#397ABD" d="M7.25 1.1v17.667"></path>
                    <path stroke="#397ABD" stroke-linecap="round" stroke-linejoin="round" d="M10.85 5.394h3.4"></path>
                    <path
                      d="M4.25 1.267h11.5a1.5 1.5 0 0 1 1.5 1.5v14.5a1.5 1.5 0 0 1-1.5 1.5H4.25a1.5 1.5 0 0 1-1.5-1.5v-14.5a1.5 1.5 0 0 1 1.5-1.5Z"
                      stroke="#397ABD"></path>
                  </g>
                </svg>
              </div>
              <div class="ant-card-meta-detail">
                <div class="ant-card-meta-title"><a data-testid="adapter-link" href="/lovbe0210/pb2d66"
                                                    class="book-link" target="_self" draggable="false"><span
                  class="lark-book-title"><span class="book-name"><span class="book-name-text"
                                                                        title="从头开始">从头开始</span><span
                  class="book-name-scope"><span class="name-lock larkui-tooltip"><svg width="1em" height="1em"
                                                                                      viewBox="0 0 256 256"
                                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                                      class="larkui-icon larkui-icon-permission-private icon-svg index-module_size_wVASz"
                                                                                      data-name="PermissionPrivate"
                                                                                      style="width: 14px; min-width: 14px; height: 14px;"><g
                  transform="translate(32 15)" fill="currentColor" fill-rule="evenodd"><path
                  d="M168 78c13.255 0 24 10.745 24 24v100c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V102c0-13.255 10.745-24 24-24h144Zm0 20H24a4 4 0 0 0-3.995 3.8L20 102v100a4 4 0 0 0 3.8 3.995l.2.005h144a4 4 0 0 0 3.995-3.8l.005-.2V102a4 4 0 0 0-3.8-3.995L168 98Z"
                  fill-rule="nonzero"></path><path
                  d="M96 0c29.823 0 54 24.177 54 54v44H42V54C42 24.177 66.177 0 96 0Zm0 20c-18.59 0-33.695 14.92-33.995 33.438L62 54v24h68V54c0-18.59-14.92-33.695-33.438-33.995L96 20Z"
                  fill-rule="nonzero"></path><rect fill-rule="nonzero" x="78" y="123" width="36" height="36"
                                                   rx="18"></rect><rect x="86" y="141" width="20" height="40"
                                                                        rx="10"></rect></g></svg></span></span></span></span></a>
                </div>
                <div class="ant-card-meta-description"><span class="Books-module_description_iLF02">forever study a little everyday</span>
                </div>
              </div>
            </div>
            <span
              class="index-module_more_sDgGm BookSettingOptions-module_extra_ofpiD Books-module_hoverShow_m6d7- larkui-popover-trigger"
              data-testid="more-actions" style="line-height: 16px; padding: 4px;"><svg width="1em" height="1em"
                                                                                       viewBox="0 0 256 256"
                                                                                       xmlns="http://www.w3.org/2000/svg"
                                                                                       class="larkui-icon larkui-icon-more-horizontal icon-svg index-module_size_wVASz"
                                                                                       data-name="MoreHorizontal"
                                                                                       style="width: 16px; min-width: 16px; height: 16px;"><path
              d="M227.008 128c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20ZM148 128c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20Zm-78.992 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20Z"
              fill="currentColor" fill-rule="nonzero"></path></svg></span>
            <ul class="BookSummary-module_default_WpxoC">
              <li><a target="_blank" href="/lovbe0210/pb2d66/vv91fhpithr0t7sl" title="it充电站系统架构图"
                     class="BookSummary-module_item_J-WKN" data-openexternal="true" draggable="false"><span
                class="BookSummary-module_itemText_1czVk">it充电站系统架构图</span><span
                class="BookSummary-module_itemTime_+aQcL"><span>08-14 14:10</span></span></a></li>
              <li><a target="_blank" href="/lovbe0210/pb2d66/zuzq9q" title="决策指挥大屏系统V4.30数据同步"
                     class="BookSummary-module_item_J-WKN" data-openexternal="true" draggable="false"><span
                class="BookSummary-module_itemText_1czVk">决策指挥大屏系统V4.30数据同步</span><span
                class="BookSummary-module_itemTime_+aQcL"><span>08-08 14:09</span></span></a></li>
              <li><a target="_blank" href="/lovbe0210/pb2d66/zxm2dd" title="初识Vue" class="BookSummary-module_item_J-WKN"
                     data-openexternal="true" draggable="false"><span
                class="BookSummary-module_itemText_1czVk">初识Vue</span><span
                class="BookSummary-module_itemTime_+aQcL"><span>06-27 16:17</span></span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SeriesColumn',
    data() {
      return {
        seriesColumnShowType: 'detail',
        seriesColumnList: [
          {
            id: '1231asdasdad',
            title: '是个标题啊',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 1
          },
          {
            id: '233424dfgdgd',
            title: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: '76558fghfghfccbc',
            title: '是个标题啊',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: 'ddfgdfgd23424242',
            title: '是个标题啊',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 1
          },
          {
            id: '5657656585fghfghf',
            title: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: 'sdadsa2323',
            title: '是个标题啊',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: '333323243234234234',
            title: '是个标题啊',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 1
          },
          {
            id: '66767dfgdfgdfgd',
            title: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: '1112121212',
            title: '是个标题啊',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          }
        ]
      }
    },
    methods: {
      getTooltipContainer() {
        return this.$refs.TooltipContainer
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import '../css/dashboard/seriesColumn.less';
</style>
