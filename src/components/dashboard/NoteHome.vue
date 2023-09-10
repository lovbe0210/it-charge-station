<template>
  <div class="layout-module_NoteHome">
    <div class="note-home-header">
      <h2 class="title">创作笔记</h2>
      <div class="operation">
        <Input class="search" search placeholder="搜索标题关键词"/>
        <div class="action">
          <Dropdown placement="bottom-end" @on-click="updateNoteOrderType">
            <a href="javascript:void(0)">
              <span class="iconfont order"></span>
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
          <div class="index-module_meta">
            <span class="note-status-module_text" v-if="orderType === 'updateTime'">更新于 09-03 16:51</span>
            <span class="note-status-module_text" v-if="orderType === 'createTime'">创建于 09-03 16:51</span>
          </div>
          <div class="index-module_content">
            <div class="viewer-header">
              <span class="viewer-content">{{noteItem.title}}</span>
            </div>
            <div class="viewer-body">
              <span class="viewer-content">{{noteItem.desc}}</span>
            </div>
          </div>
        </div>
        <div class="index-module_rightToolBar">
          <div class="note-list-toolbar">
            <div class="edit-btn">
              <span class="iconfont bianji"></span>
            </div>
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
                  <DropdownItem>查看历史</DropdownItem>
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
            updateTime: '2023-12-23 22:09:11'
          },
          {
            id: '233424dfgdgd',
            title: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11'
          },
          {
            id: '76558fghfghfccbc',
            title: '是个标题啊',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11'
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
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import '../css/dashboard/noteHome.less';
</style>
