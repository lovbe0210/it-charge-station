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
        <div class="column-cover" v-if="columnShowType == 1">
          <a class="cover-box" href="/lovbe0210/nhagpt">
            <img :src="columnItem.coverImg"
                 alt="啊实打实">
          </a>
          <a-tooltip :getPopupContainer="getTooltipContainer">
            <template slot="title">
              修改封面
            </template>
            <div class="cover-edit">
              <span class="iconfont bianji"></span>
            </div>
          </a-tooltip>

        </div>
        <div class="column-card-body" :style="columnShowType == 1 ? 'border-radius: 0 0 8px 8px;border-top: 0;' : 'border-radius: 8px;'">
          <div class="column-meta">
            <div class="card-meta-title">
              <a href="/column/pb2d66" class="book-link" target="_self">
                <span class="lark-book-title">
                  <span class="book-name">
                    <span class="book-name-text">{{columnItem.columnName}}</span>
                    <span class="book-name-scope">
                      <span class="iconfont lock"></span>
                    </span>
                  </span>
                </span>
              </a>
            </div>
            <div class="card-meta-description">
              <span class="columns-module_description">forever study a little everyday</span>
            </div>
          </div>
          <span class="column-hover-show"
                :style="columnShowType == 1 ? 'bottom: 48px;' : 'top: 12px;'">
            <Dropdown placement="bottom-end" @on-click="routeNavigate">
                <a href="javascript:void(0)">
                  <div class="menu-btn">
                    <span class="iconfont icon-nav-menu"></span>
                  </div>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="scope">
                    <span class="iconfont permissions"/> 权限
                  </DropdownItem>
                  <DropdownItem name="rename">
                    <span class="iconfont rename"/> 重命名
                  </DropdownItem>
                  <DropdownItem name="setting">
                    <span class="iconfont setting"/> 更多设置
                  </DropdownItem>
                  <DropdownItem name="delete">
                    <span class="iconfont delete"/> 删除
                  </DropdownItem>
                </DropdownMenu>
            </Dropdown>
          </span>
          <div v-if="columnShowType === 2 && (columnItem.articleList == null || columnItem.articleList.length === 0)">
            <ul class="column-article empty-li">
              <span>专栏暂无内容</span>
            </ul>
          </div>
          <div v-else>
            <ul class="column-article" v-if="columnShowType == 2">
              <li>
                <a target="_blank" href="/column/pb2d66/vv91fhpithr0t7sl" title="it充电站系统架构图"
                   class="column-summary-item">
                  <span class="column-summary-itemText">it充电站系统架构图a架构图啊真的是吗</span>
                  <span class="column-summary-itemTime">
                  <span>08-14 14:10</span>
                </span>
                </a>
              </li>
              <li>
                <a target="_blank" href="/column/pb2d66/vv91fhpithr0t7sl" title="决策指挥大屏系统V4.30数据同步"
                   class="column-summary-item">
                  <span class="column-summary-itemText">决策指挥大屏系统V4.30数据同步</span>
                  <span class="column-summary-itemTime">
                  <span>08-08 14:09</span>
                </span>
                </a>
              <li>
                <a target="_blank" href="/column/pb2d66/vv91fhpithr0t7sl" title="初识Vue"
                   class="column-summary-item">
                  <span class="column-summary-itemText">初识Vue</span>
                  <span class="column-summary-itemTime">
                  <span>06-27 16:17</span>
                </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-box">
      <Modal
        v-model="showModal"
        :title="changePermission ? '权限编辑' : deleteColumn ? '删除专栏' : ''"
        :mask-closable="false"
        :lock-scroll="false"
        :footer-hide="true">
        <div v-if="changePermission">
          <div class="modal-title">
            <span>公开性</span>
          </div>
          <RadioGroup v-model="isPublic" @change="changeScope">
            <Radio style="display: block; height: 30px; lineHeight: 30px" :label="0">
              仅作者可访问
            </Radio>
            <a-popconfirm
              ok-text="确认"
              cancel-text="取消"
              @confirm="confirmChangeScope(true)"
              @cancel="confirmChangeScope(false)"
              placement="rightBottom"
              :disabled="isPublic === 1"
            >
              <span class="iconfont delete" slot="icon"></span>
              <div slot="title">
                  <span>
                    确认公开给互联网所有人
                  </span>
                <span>
                    开启后，互联网所有获得链接的人皆可访问知识库下的全部内容。你需对其合法合规性负责，遵守相关法律法规及语雀 服务协议 约定，违规内容可能无法被查看。
                  </span>
              </div>
              <Radio style="display: block; height: 30px; lineHeight: 30px" :label="1">
                互联网所有人可访问
              </Radio>
            </a-popconfirm>

          </RadioGroup>
        </div>
        <div v-if="deleteColumn">
          删除专栏
        </div>
      </Modal>
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
        // 控制专栏名称编辑或显示
        editColumnName: false,
        // 控制权限和删除页面模态框的显示
        changePermission: false,
        deleteColumn: false,
        seriesColumnList: [
          {
            id: '1231asdasdad',
            columnName: '从头开始知识库',
            columnHome: '/lovbe0210/sd45454',
            coverImg: require('@/assets/cover/cover1.png'),
            isPublic: 0,
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            articleList: [
              {
                articleId: 'asdad2234234',
                articleName: '非常长的标题，标题很长很长非常长的标题，标题很长很长非常长的标题，标题很长很长',
                updateTime: '08-14 14:10'
              },
              {
                articleId: 'asdad22222111234234',
                articleName: 'it充电站系统架构图',
                updateTime: '08-14 14:10'
              },
              {
                articleId: 'asdad2234ssd234',
                articleName: 'it充电站系统架构图',
                updateTime: '08-14 14:10'
              }
            ],
            updateTime: '2023-12-23 22:09:11',
            sort: 1
          },
          {
            id: '233424dfgdgd',
            columnName: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            columnHome: '/lovbe0210/sd45454',
            isPublic: 1,
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: '76558fghfghfccbc',
            columnName: '是个标题啊',
            columnHome: '/lovbe0210/sd45454',
            isPublic: 1,
            coverImg: require('@/assets/cover/cover3.png'),
            desc: null,
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: 'ddfgdfgd23424242',
            columnName: '是个标题啊',
            columnHome: '/lovbe0210/sd45454',
            isPublic: 0,
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 1
          },
          {
            id: '5657656585fghfghf',
            columnName: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            columnHome: '/lovbe0210/sd45454',
            isPublic: 0,
            coverImg: 'https://fc.sinaimg.cn/large/006BNqYCly1hk88v14absj32yo1o0x6p.jpg',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: 'sdadsa2323',
            columnName: '是个标题啊',
            columnHome: '/lovbe0210/sd45454',
            isPublic: 1,
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: '333323243234234234',
            columnName: '是个标题啊',
            columnHome: '/lovbe0210/sd45454',
            isPublic: 1,
            coverImg: require('@/assets/cover/cover3.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 1
          },
          {
            id: '66767dfgdfgdfgd',
            coverImg: require('@/assets/cover/cover1.png'),
            columnName: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            isPublic: 1,
            columnHome: '/lovbe0210/sd45454',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          },
          {
            id: '1112121212',
            columnName: '是个标题啊',
            columnHome: '/lovbe0210/sd45454',
            coverImg: require('@/assets/cover/cover2.png'),
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            updateTime: '2023-12-23 22:09:11',
            sort: 0
          }
        ],
        isPublic: 0
      }
    },
    computed: {
      showModal: {
        get() {
          return this.changePermission || this.deleteColumn;
        },
        set(value) {
          this.changePermission = value;
          this.deleteColumn = value;
        }
      }
    },
    methods: {
      getTooltipContainer() {
        return this.$refs.TooltipContainer
      },
      routeNavigate(itemName) {
        switch (itemName) {
          case "scope":
            // 权限编辑，使用模态框显示
            this.changePermission = true;
            break;
          case "rename":
            this.editColumnName = true;
            break;
          case "setting":
            this.$router.push({})
            break;
          case "delete":
            this.deleteColumn = true;
            break;
        }
      },
      confirmChangeScope(value) {
        if (value) {
          this.isPublic = 1;
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import '../css/dashboard/seriesColumn.less';
</style>
