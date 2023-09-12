<template>
  <div class="layout-module_SeriesColumn" ref="TooltipContainer">
    <div class="column-home-header">
      <h2 class="title">个人专栏</h2>
      <hr class="separator-line">
      <div class="operation">
        <div class="action">
          <div class="icon-box">
            <a-tooltip :getPopupContainer="getTooltipContainer">
              <template slot="title">
                新建专栏
              </template>
              <span class="iconfont add"></span>
            </a-tooltip>
          </div>
          <div class="icon-box">
            <a-tooltip :getPopupContainer="getTooltipContainer">
              <template slot="title">
                详情展示
              </template>
              <span class="iconfont list" @click="columnShowType = 2"></span>
            </a-tooltip>
          </div>
          <div class="icon-box">
            <a-tooltip :getPopupContainer="getTooltipContainer">
              <template slot="title">
                图文展示
              </template>
              <span class="iconfont detail" @click="columnShowType = 1"></span>
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="column-home-list">
      <div class="column-list-item" v-for="columnItem in seriesColumnList" :key="columnItem.id">
        <div class="column-card-body">
          <div class="column-cover" v-if="columnShowType == 1">
            <a class="cover-box" href="/lovbe0210/nhagpt">
              <img :src="columnItem.coverImg"
                   alt="啊实打实">
            </a>
          </div>
          <div class="column-meta">
            <div class="card-meta-title">
              <a data-testid="adapter-link" href="/lovbe0210/pb2d66" class="book-link" target="_self"
                 draggable="false">
                    <span class="lark-book-title">
                      <span class="book-name">
                        <span class="book-name-text" title="从头开始">从头开始</span>
                        <span class="book-name-scope">
                          <span class="name-lock larkui-tooltip"></span>
                        </span>
                      </span>
                    </span>
              </a>
            </div>
            <div class="card-meta-description">
              <span class="columns-module_description">forever study a little everyday</span>
            </div>
          </div>
          <ul class="column-article" v-if="columnShowType == 2">
            <li><a target="_blank" href="/lovbe0210/pb2d66/vv91fhpithr0t7sl" title="it充电站系统架构图"
                   class="columnsummary-module_item_J-WKN" data-openexternal="true" draggable="false"><span
              class="columnsummary-module_itemText_1czVk">it充电站系统架构图</span><span
              class="columnsummary-module_itemTime_+aQcL"><span>08-14 14:10</span></span></a></li>
            <li><a target="_blank" href="/lovbe0210/pb2d66/zuzq9q" title="决策指挥大屏系统V4.30数据同步"
                   class="columnsummary-module_item_J-WKN" data-openexternal="true" draggable="false"><span
              class="columnsummary-module_itemText_1czVk">决策指挥大屏系统V4.30数据同步</span><span
              class="columnsummary-module_itemTime_+aQcL"><span>08-08 14:09</span></span></a></li>
            <li><a target="_blank" href="/lovbe0210/pb2d66/zxm2dd" title="初识Vue"
                   class="columnsummary-module_item_J-WKN"
                   data-openexternal="true" draggable="false"><span
              class="columnsummary-module_itemText_1czVk">初识Vue</span><span
              class="columnsummary-module_itemTime_+aQcL"><span>06-27 16:17</span></span></a></li>
          </ul>
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
        // 专栏展示方式 1图文模式，2列表模式
        columnShowType: 2,
        seriesColumnList: [
          {
            id: '1231asdasdad',
            columnName: '从头开始知识库',
            coverImg: require('@/assets/cover/cover1.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 1
          },
          {
            id: '233424dfgdgd',
            columnName: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: '76558fghfghfccbc',
            columnName: '是个标题啊',
            coverImg: require('@/assets/cover/cover3.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: 'ddfgdfgd23424242',
            columnName: '是个标题啊',
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 1
          },
          {
            id: '5657656585fghfghf',
            columnName: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            coverImg: require('@/assets/cover/cover1.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: 'sdadsa2323',
            columnName: '是个标题啊',
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: '333323243234234234',
            columnName: '是个标题啊',
            coverImg: require('@/assets/cover/cover3.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 1
          },
          {
            id: '66767dfgdfgdfgd',
            coverImg: require('@/assets/cover/cover1.png'),
            columnName: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: '1112121212',
            columnName: '是个标题啊',
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
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
