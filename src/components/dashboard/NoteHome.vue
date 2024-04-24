<template>
  <div class="layout-module_NoteHome">
    <div class="note-home-header">
      <h2 class="title">创作笔记</h2>
      <hr class="separator-line">
      <div class="operation">
        <Input class="search" search placeholder="搜索标题关键词"/>
        <div class="action">
          <Dropdown placement="bottom-end" @on-click="updateNoteOrderType">
            <a href="javascript:void(0)">
              <div class="icon-box">
                <span class="iconfont order"></span>
              </div>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="updateTime">
                <div style="min-width: 20px">
                  <span class="iconfont true" v-if="orderType === 'updateTime'"></span>
                </div>
                更新时间排序
              </DropdownItem>
              <DropdownItem name="createTime">
                <div style="min-width: 20px">
                  <span class="iconfont true" v-if="orderType === 'createTime'"></span>
                </div>
                创建时间排序
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="note-home-list">
      <div class="note-list-item note-list-operate" v-if="checkedList.length > 0 || showCheckToolBar">
        <div class="index-module_leftToolBar">
          <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
          </a-checkbox>
        </div>
        <div class="note-item-check">
          <span>
            共选择了{{checkedList.length}}篇笔记
          </span>
          <Button type="text" @click="cancelCheck">
            取消选择
          </Button>
        </div>
        <div class="action">
          <Button type="text">合并移动到专栏</Button>
          <Button type="text">批量删除</Button>
        </div>
      </div>
      <div class="note-list-item" v-for="noteItem in noteList" :key="noteItem.id">
        <div class="index-module_leftToolBar">
          <a-checkbox :class="showCheckToolBar ? '' : 'check-show'" :checked="isCheck(noteItem.id)"
                      @change="onCheckChange(noteItem.id, $event)">
          </a-checkbox>
        </div>
        <div class="index-module_noteItem">
          <div class="index-module_meta un-select">
            <div class="article-tag">
              <a-tag :color="tag.color" v-for="(tag,index) in noteItem.tags" :key="index">
                {{tag.content}}
              </a-tag>
            </div>
            <div class="order-time">
              <span class="note-status-module_text un-select" v-if="orderType === 'updateTime'">更新于 09-03 16:51</span>
              <span class="note-status-module_text un-select" v-if="orderType === 'createTime'">创建于 09-03 16:51</span>
            </div>
          </div>
          <div class="index-module_content">
            <div class="viewer-header" @click="routeNavigate('read', noteItem.id)">
              <span class="viewer-content">{{noteItem.title}}</span>
            </div>
            <div class="viewer-body">
              <span class="viewer-content">{{noteItem.desc}}</span>
            </div>
          </div>
        </div>
        <div class="index-module_rightToolBar">
          <div class="note-list-toolbar">
            <div class="menu-btn-wrapp">
              <Dropdown placement="bottom-end">
                <a href="javascript:void(0)">
                  <div class="menu-btn">
                    <span class="iconfont icon-nav-menu"></span>
                  </div>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>取消置顶</DropdownItem>
                  <DropdownItem>复制链接</DropdownItem>
                  <DropdownItem>分享至动态</DropdownItem>
                  <DropdownItem>移动至专题</DropdownItem>
                  <DropdownItem>添加标签</DropdownItem>
                  <DropdownItem>删除</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoteHome',
    data() {
      return {
        orderType: 'updateTime',
        noteList: [
          {
            id: '1231asdasdad',
            title: '是个标题啊',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 1,
            tags: [
              {content: '大前段', color: 'blue'},
              {content: 'Vue', color: 'red'},
              {content: 'React', color: 'orange'},
              {content: '前端框架', color: 'green'}
            ]
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
            sort: 0,
            tags: [
              {content: '后端', color: 'blue'},
              {content: 'JAVA', color: 'red'},
              {content: 'Springboot', color: 'orange'},
              {content: '分布式', color: 'green'}
            ]
          },
          {
            id: 'ddfgdfgd23424242',
            title: '是个标题啊',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 1,
            tags: [
              {content: '运维', color: 'blue'},
              {content: 'linux', color: 'red'},
              {content: 'docker', color: 'orange'},
              {content: 'k8s', color: 'green'}
            ]
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
        ],
        checkedList: [],
        showCheckToolBar: false
      }
    },
    computed: {
      checkAll() {
        return this.checkedList.length > 0 && this.checkedList.length === this.noteList.length;
      },
      indeterminate() {
        return this.checkedList.length > 0 && this.checkedList.length !== this.noteList.length
      }
    },
    methods: {
      updateNoteOrderType(type) {
        this.orderType = type;
      },
      onCheckAllChange(e) {
        this.showCheckToolBar = true;
        this.checkedList = e.target.checked ? this.noteList.map(note => note.id) : [];
      },
      onCheckChange(noteId, e) {
        this.showCheckToolBar = true;
        if (e.target.checked) {
          this.checkedList.push(noteId);
        } else {
          this.checkedList = this.checkedList.filter(nid => nid !== noteId);
        }
      },
      isCheck(noteId) {
        return this.checkedList.indexOf(noteId) !== -1;
      },
      cancelCheck() {
        this.showCheckToolBar = false;
        this.checkedList = [];
      },
      /**
       * @param itemName 路由跳转标志
       */
      routeNavigate(routePath, routeParam) {
        switch (routePath) {
          case 'edit':
            this.$router.push({path: '/editor/' + routeParam});
            break;
          case 'read':
            this.$router.push({path: '/article/' + routeParam});
            break;
          case 'history':
            this.$Message.warning("敬请期待，感谢支持！")
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import '../css/dashboard/noteHome.less';
</style>
