<template>
  <div class="layout-module_NoteHome" ref="TooltipContainer">
    <div class="note-home-header">
      <h2 class="title">创作文章</h2>
      <hr class="separator-line">
      <div class="operation">
        <Input class="search" search placeholder="搜索标题关键词"/>
        <div class="action">
          <Dropdown placement="bottom-end"
                    transfer-class-name="dropdown-background dropdown-item-all-hover"
                    @on-click="updateNoteOrderType">
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
            共选择了{{checkedList.length}}篇文章
          </span>
          <Button type="text" ghost @click="cancelCheck">
            取消选择
          </Button>
        </div>
        <div class="action">
          <Button type="text" ghost>合并移动到专栏</Button>
          <Button type="text" ghost>批量发布</Button>
          <Button type="text" ghost>批量删除</Button>
        </div>
      </div>
      <div class="note-list-item" v-for="noteItem in noteList" :key="noteItem.id">
        <div class="index-module_leftToolBar">
          <a-checkbox :class="showCheckToolBar ? '' : 'check-show'" :checked="isCheck(noteItem.id)"
                      @change="onCheckChange(noteItem.id, $event)">
          </a-checkbox>
        </div>
        <div :class="['index-module_noteItem', isCheck(noteItem.id) ? 'checked' : '']">
          <div class="index-module_meta un-select">
            <div class="tag-add-control">
              <template v-for="(tag, index) in noteItem.tags">
                <a-tooltip :key="index" overlayClassName="tag-color-tooltip" :getPopupContainer="getTooltipContainer">
                  <template slot="title">
                    <div :style="{background: tag.color}" @click="changeTagColor(tag)" class="tag-color-btn">
                      <div class="hazy">
                        <span class="iconfont random"></span>
                      </div>
                    </div>
                  </template>
                  <a-tag :color=tag.color closable @close="() => handleClose(noteItem, tag)">
                    {{ tag.content }}
                  </a-tag>
                </a-tooltip>
              </template>
              <span v-if="!noteItem.tags || noteItem.tags.length < 3">
                <Input class="tag-input"
                       v-if="inputVisibleId === noteItem.id"
                       :ref="'input' + noteItem.id"
                       type="text" size="small"
                       maxlength="10"
                       :style="{ width: '78px' }"
                       v-model="inputValue"
                       @on-blur="handleInputConfirm(noteItem)"
                       @on-enter="handleInputConfirm(noteItem)"/>
                <a-tag v-else class="add-tag-btn" @click="showInput(noteItem.id)">
                  <span class="iconfont add" style="font-size: 12px"></span>
                  添加标签
                </a-tag>
              </span>
            </div>
            <div class="order-time">
              <span class="note-status-module_text un-select" v-if="orderType === 'updateTime'">更新于 09-03 16:51</span>
              <span class="note-status-module_text un-select" v-if="orderType === 'createTime'">创建于 09-03 16:51</span>
            </div>
          </div>
          <div class="index-module_content">
            <div class="viewer-header" @click="routeNavigate('read', noteItem)">
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
              <Dropdown placement="bottom-end"
                        transfer-class-name="dropdown-background dropdown-item-all-hover"
                        trigger="click">
                <a href="javascript:void(0)">
                  <div class="menu-btn">
                    <span class="iconfont operate"></span>
                  </div>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem>
                    <span @click="routeNavigate('edit', noteItem)">编辑</span>
                  </DropdownItem>
                  <DropdownItem>
                    <span>发布</span>
                  </DropdownItem>
                  <DropdownItem>
                    <span @click="routeNavigate('delete', noteItem)">删除</span>
                  </DropdownItem>
                  <DropdownItem>
                    <span>取消置顶</span>
                  </DropdownItem>
                  <DropdownItem>
                    <span @click="routeNavigate('setting', noteItem)">文档设置</span>
                  </DropdownItem>
                  <DropdownItem>
                    <span @click="routeNavigate('column', noteItem)">移至专栏</span>
                  </DropdownItem>
                  <DropdownItem>
                    <span>复制链接</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="showModal"
           :width="modalContentType === 2 ? 520 : 416"
           class="operate-modal"
           :transfer="false"
           :footer-hide="true">
      <div class="modal-delete-item" v-if="modalContentType === 1">
        <div class="delete-tips">
          <span class="iconfont i-warn"></span>
          <span>确认删除 {{ currentOperateArticle?.title }} ？</span>
        </div>
        <div class="confirm-btn">
          <Button type="text" ghost @click="showModal = false">取消</Button>
          <Button type="success">确定</Button>
        </div>
      </div>
      <div class="modal-setting-item" v-if="modalContentType === 2">
        <article-setting :articleId="currentOperateArticle?.uid"
                         :changePermission="true"
                         :editTitle="true"/>
      </div>
      <div class="modal-column-item" v-if="modalContentType === 3">
        <div class="remove-tips">
          <span class="tip-title">移动至专栏</span>
          <span class="tip-desc">文章会保存到专栏目录下，并继承专栏的所有设置，原先的访问路径会失效，将会生成新的访问路径。</span>
        </div>
        <div class="select-columns">
          <Select v-model="currentOperateArticle.columnId"
                  placeholder="下拉选择专栏"
                  class="first-level">
            <Option v-for="item in columnList"
                    :value="item.uid"
                    :key="item.uid">
              {{ item.columnName }}
            </Option>
          </Select>
        </div>
        <div class="confirm-btn">
          <Button type="success">确定移动</Button>
          <Button type="text" ghost @click="showModal=false">取消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {getRandomColor} from '@/utils/utils'
  import ArticleSetting from "@/components/common/ArticleSetting"

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
              {content: 'React', color: 'orange'}
            ]
          },
          {
            id: '233424dfgdgd',
            title: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 0,
            tags: []
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
              {content: 'k8s', color: 'green'}
            ]
          },
          {
            id: '5657656585fghfghf',
            title: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 0,
            tags: []
          },
          {
            id: 'sdadsa2323',
            title: '是个标题啊',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 0,
            tags: []
          },
          {
            id: '333323243234234234',
            title: '是个标题啊',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 1,
            tags: []
          },
          {
            id: '66767dfgdfgdfgd',
            title: '是个标题啊是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试给刷卡机较大饭卡手机班米啊试',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大啊沙发啦班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 0,
            tags: []
          },
          {
            id: '1112121212',
            title: '是个标题啊',
            desc: '我就是已很难过航班米啊试试阿萨德哈师大旷达科技登记卡送达给刷卡机较大饭卡手机啊沙发啦咔咔好卡手打发撒公司控股见大好',
            createTime: '2023-12-23 22:09:11',
            updateTime: '2023-12-23 22:09:11',
            sort: 0,
            tags: []
          }
        ],
        columnList: [
          {
            uid: 121212,
            columnName: '这是一个专栏'
          },
          {
            uid: 243434,
            columnName: '这是第二个专栏'
          },
          {
            uid: 11255,
            columnName: '这是Java笔记专栏'
          },
          {
            uid: 35676767,
            columnName: '这是一我自己创建的专栏'
          }
        ],
        checkedList: [],
        showCheckToolBar: false,
        inputVisibleId: '',
        inputValue: '',
        showModal: false,
        // 1删除 2文档设置 3移至专栏
        modalContentType: 1,
        // 当前操作的文章
        currentOperateArticle: null
      }
    },
    components: {
      ArticleSetting
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
      routeNavigate(routePath, articleItem) {
        switch (routePath) {
          case 'edit':
            this.$router.push({path: '/editor/' + articleItem.id});
            break;
          case 'read':
            this.$router.push({path: '/article/' + articleItem.id});
            break;
          case 'delete':
            this.currentOperateArticle = articleItem;
            this.modalContentType = 1;
            this.showModal = true;
            break;
          case 'setting':
            this.currentOperateArticle = articleItem;
            this.modalContentType = 2;
            this.showModal = true;
            break;
          case 'column':
            this.currentOperateArticle = articleItem;
            this.modalContentType = 3;
            this.showModal = true;
            break;
          case 'history':
            this.$Message.warning("敬请期待，感谢支持！")
        }
      },
      changeTagColor(tag) {
        tag.color = getRandomColor();
      },
      // 标签移除
      handleClose(noteItem, removedTag) {
        noteItem.tags = noteItem.tags.filter(tag => tag !== removedTag);
      },
      // 展示添加新标签
      showInput(noteId) {
        this.inputVisibleId = noteId;

        this.$nextTick(function () {
          let inputId = 'input' + noteId;
          this.$refs[inputId][0].focus();
        });
      },
      // 标签添加完成
      handleInputConfirm(noteItem) {
        const tag = {content: this.inputValue, color: getRandomColor()};
        let tags = noteItem.tags;
        if (tag.content && tags.indexOf(tag) === -1) {
          noteItem.tags = [...tags, tag];
        }
        this.inputVisibleId = '';
        this.inputValue = '';
      },
      getTooltipContainer() {
        return this.$refs.TooltipContainer
      }
    },
    watch: {
      "showModal"(status) {
        if (!status) {
          setTimeout(() => {
            this.currentOperateArticle = null;
            this.modalContentType = 1;
          }, 500)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../css/creativespace/noteHome.less';
</style>
