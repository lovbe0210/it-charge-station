<template>
  <div class="layout-module_collection" ref="tooltipContainer">
    <div class="collect-header">
      <h2 class="title">收藏</h2>
      <hr class="separator-line">
      <div class="operation">
        <Input class="search" v-model="queryMeta.keywords" search placeholder="搜索标题关键词"/>
        <div class="action">
          <Dropdown placement="bottom-end"
                    transfer-class-name="dropdown-background dropdown-item-all-hover"
                    @on-click="changeCollectType">
            <a href="javascript:void(0)">
              <div class="icon-box">
                <span class="iconfont filter"></span>
              </div>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="">
                <div style="min-width: 25px">
                  <span class="iconfont true" v-if="queryMeta.collectType === ''"></span>
                </div>
                全部
              </DropdownItem>
              <DropdownItem name="1">
                <div style="min-width: 25px">
                  <span class="iconfont true" v-if="queryMeta.collectType === '1'"></span>
                </div>
                文章
              </DropdownItem>
              <DropdownItem name="2">
                <div style="min-width: 25px">
                  <span class="iconfont true" v-if="queryMeta.collectType === '2'"></span>
                </div>
                专栏
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="mark-module_container">
      <div class="marks-group beauty-scroll">
        <div v-for="tag in collectTags"
             :key="tag.uid"
             :class="['mark-item', queryMeta.selectTag === tag.uid ? 'active' : '']"
             @click="queryMeta.selectTag = tag.uid">
          <div class="mark-name">
            <span class="mark-name-content" :title="tag.title">
              {{ tag.title }}
            </span>
            <div class="mark-aside-add">
              <a-tooltip v-if="tag.uid === -1" placement="top" :getPopupContainer="()=>tooltipContainer">
                <template slot="title">
                  新建分组
                </template>
                <span class="iconfont add" @click="createNewTag = true"/>
              </a-tooltip>
              <Dropdown placement="bottom-end"
                        trigger="click"
                        transfer-class-name="dropdown-background dropdown-item-all-hover"
                        v-else
                        @on-click="tagOperate">
                <a href="javascript:void(0)">
                  <div class="icon-box">
                    <span class="iconfont operate"/>
                  </div>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem :name="'editor' + tag.uid">
                    编辑
                  </DropdownItem>
                  <DropdownItem :name="'delete' + tag.uid">
                    删除
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div class="mark-action-count">
            <span class="mark-count-number">{{ tag.collectCount }} 条内容</span>
          </div>
        </div>
      </div>
      <div class="marks-list un-select">
        <Table :columns="tableHeader"
               :data="collectList"
               no-data-text="空空如也，快去首页看看吧"
               @on-cell-click="clickCell"
               @on-sort-change="sortedRequest">
          <template slot-scope="{ row }" slot="name">
            <a-tooltip :getPopupContainer="()=>tooltipContainer"
                       placement="topLeft">
              <template slot="title">
                {{ row.name }}
              </template>
              <span>
                {{ row.name }}
              </span>
            </a-tooltip>
          </template>
          <template slot-scope="{ row }" slot="belongName">
            <a-tooltip :getPopupContainer="()=>tooltipContainer"
                       placement="topLeft">
              <template slot="title">
                {{ row.targetType === 1 ? row.username + ' / ' + row.columnName : row.userName }}
              </template>
              <span>
                {{ row.targetType === 1 ? row.username + ' / ' + row.columnName : row.userName }}
              </span>
            </a-tooltip>
          </template>
          <template slot-scope="{ row }" slot="createTime">
            <span>
              {{ formatDateString(row.createTime) }}
            </span>
          </template>
          <template slot-scope="{ row }" slot="action">
            <Poptip placement="bottom-end" transfer="transfer" padding="0px">
              <span class="iconfont collected" :title="row.uid"/>
              <div slot="content" class="select-group">
                <div class="select-group-title">
                  <p class="select-group-p1">选择分组</p>
                  <p class="select-group-p2">你可以选择分组或直接
                    <a @click="unmark(row.uid)">取消收藏</a>
                  </p>
                </div>
                <div class="select-group-tags beauty-scroll">
                  <div v-if="inputNewTag" class="select-group-tags-check">
                    <label class="select-group-tags-checkboxWrapper">
                      <a-checkbox :checked="false"
                                  @change="updateCollectTags(row, tag.uid)">
                      </a-checkbox>
                      <span class="checkbox-label">
                        <Input v-model="inputTagTmp"
                               size="small"
                               :autofocus="true"
                               @blur="completeAddTag"
                               placeholder="请输入分组名称"
                               maxlength="30"/>
                      </span>
                    </label>
                  </div>
                  <div class="select-group-tags-check" v-for="tag in collectTags.filter(t => t.uid !== -1)" :key="tag.uid">
                    <label class="select-group-tags-checkboxWrapper">
                      <a-checkbox :checked="row.tags && row.tags.includes(tag.uid)"
                                  @change="updateCollectTags(row, tag.uid)">
                      </a-checkbox>
                      <span class="checkbox-label" :title="tag.title">{{ tag.title }}</span>
                    </label>
                  </div>
                </div>
                <div class="select-group-footer" @click="inputNewTag = true">
                  <span class="iconfont add"></span>
                  新建分组
                </div>
              </div>
            </Poptip>
          </template>
        </Table>
      </div>
    </div>
    <Modal v-model="createNewTag"
           width="400"
           title="新建分组"
           :footer-hide="true"
           class-name="create-new-tag">
      <div class="add-form">
        <p class="add-label">分组名称</p>
        <Input placeholder="请输入分组名称"
               v-model="tmpTag.title"
               @on-change="showErrorTag=''"
               maxlength="30"/>
        <p class="error" v-if="showErrorTag?.length > 0">{{ showErrorTag }}</p>
      </div>
      <div class="add-form-footer">
        <Button type="success"
                class="ok"
                @click="addNewTag"
                :disabled="!(tmpTag.title?.length > 0)">
          确定
        </Button>
        <Button type="text" @click="createNewTag = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {formatDate} from '@/utils/utils.js'
import ContentPicksApi from "@/api/ContentPicksApi";

export default {
  name: 'Collection',
  data() {
    return {
      queryMeta: {
        // 选中的分组
        selectTag: null,
        // 搜索关键字
        keywords: null,
        // 收藏类型
        collectType: '',
        // 名称排序 asc，desc
        titleSort: null,
        // 收藏时间排序
        timestampSort: null,
        // 查询坐标
        offset: 0,
        // 每页查询数量
        limit: 100
      },
      collectTags: [
        {
          uid: -1,
          title: "全部收藏",
          collectCount: 0
        }
      ],
      // model添加
      createNewTag: false,
      // 收藏页面添加
      inputNewTag: false,
      inputTagTmp: '',
      showErrorTag: '',
      tmpTag: {
        uid: null,
        title: ''
      },
      // 收藏类型 1文章 2专栏
      collectList: [],
      tableHeader: [
        {
          title: '名称',
          slot: 'name',
          sortable: 'custom',
          width: 230
        },
        {
          title: '归属',
          slot: 'belongName',
          width: 220
        },
        {
          title: '收藏时间',
          slot: 'createTime',
          sortable: 'custom',
          width: 175
        },
        {
          title: ' ',
          slot: 'action',
          width: 50
        }
      ],
      tooltipContainer: null
    }
  },
  methods: {
    selectTagList() {
      ContentPicksApi.getCollectTags().then(data => {
        if (data?.result) {
          this.collectTags = data.data;
          this.queryMeta.selectTag = -1;
        }
      })
    },
    selectCollectList() {
      ContentPicksApi.getCollectList(this.queryMeta).then(data => {
        if (data?.result) {
          this.collectList = data.data;
        }
      })
    },
    changeCollectType(name) {
      this.queryMeta.collectType = name;
      this.selectCollectList();
    },
    formatDateString(timestamp) {
      let fmt = 'yyyy-MM-dd HH:mm:ss';
      return formatDate(new Date(timestamp), fmt);
    },
    clickCell(row, column) {
      // 收藏类型 1文章 2专栏
      if (column._index === 0) {
        if (row.type === 1) {
          let path = row.columnId ? ('/column/' + row.columnId + '/' + row.id) : ('/article/' + row.id);
          this.$router.push({path: path});
        } else {
          this.$router.push({path: '/column/' + row.id});
        }
        return;
      }

      if (column._index === 1) {
        if (row.type === 1) {
          let path = row.columnId ? ('/column/' + row.columnId) : ('/' + row.domain);
          this.$router.push({path: path});
        } else {
          this.$router.push({path: '/' + row.domain});
        }
      }
    },
    unmark(uid) {
      console.log("取下", uid)
    },
    updateCollectTags(collect, tagId) {
      // 此处传递的对象是复制过来的，并不是源对象
      let tags = collect.tags;
      if (tags == null) {
        tags = [tagId];
      } else if (tags.includes(tagId)) {
        // 如果包含当前tagId,则删除
        tags = tags.filter(tag => tagId !== tag);
      } else {
        // 如果不包含则添加
        tags.push(tagId);
      }
      for (const source of this.collectList) {
        if (source.uid === collect.uid) {
          source.tags = tags;
          break;
        }
      }
    },
    /**
     * 排序触发
     * @param sortMeta
     */
    sortedRequest(sortMeta) {
      let field = sortMeta?.column?.slot;
      if (field === 'name') {
        this.queryMeta.titleSort = sortMeta.order;
        this.queryMeta.timestampSort = null;
      } else if (field === 'collectTime') {
        this.queryMeta.timestampSort = sortMeta.order;
        this.queryMeta.titleSort = null;
      }
      this.selectCollectList();
    },
    addNewTag() {
      if (!this.tmpTag.title) {
        return;
      }
      if (this.tmpTag.title?.length > 30) {
        this.showErrorTag = '分组名称不得超过30字';
      }
      // 标签名称去重
      if (this.collectTags?.length > 0) {
        let repeatTag = this.collectTags.filter(tag => tag.title === this.tmpTag.title);
        if (repeatTag?.length > 0 && repeatTag[0].uid !== this.tmpTag.uid) {
          this.showErrorTag = '已有相同分组名称';
          return;
        } else {
          this.showErrorTag = '';
        }
      }
      // 新建标签
      ContentPicksApi.createCollectTag(this.tmpTag).then(data => {
        if (data?.result) {
          this.createNewTag = false;
          ContentPicksApi.getCollectTags().then(data => {
            if (data?.result) {
              this.collectTags = data.data;
            }
          })
        }
      })
    },
    tagOperate(operateType) {
      if (operateType.indexOf('editor') !== -1) {
        let uid = Number.parseInt(operateType.replace('editor', ''))
        let filter = this.collectTags.filter(tag => tag.uid === uid);
        if (filter?.length === 0) {
          return;
        }
        this.tmpTag = {...this.tmpTag, ...filter[0]}
        this.createNewTag = true;
      } else if (operateType.indexOf('delete') !== -1) {
        let uid = operateType.replace('delete', '');
        let tag = {uid};
        ContentPicksApi.deleteCollectTag(tag).then(data => {
          if (data?.result) {
            this.$Message.success("删除成功");
            if (this.queryMeta.selectTag === Number.parseInt(uid)) {
              // 请求全部收藏
              this.queryMeta.selectTag = -1;
            }
            this.collectTags = this.collectTags.filter(tag => tag.uid !== Number.parseInt(uid));
          }
        })
      }
    },
    completeAddTag() {
      this.inputNewTag = false;
      this.inputTagTmp = '';

    }
  },
  watch: {
    createNewTag(newVal) {
      if (newVal) {
        return;
      }
      this.tmpTag.title = '';
      this.tmpTag.uid = null;
      this.showErrorTag = '';
    },
    "queryMeta.selectTag"() {
      this.selectCollectList();
    }
  },
  mounted() {
    this.tooltipContainer = this.$refs.tooltipContainer;
    this.selectTagList();
  }
}
</script>

<style scoped lang="less">
@import '../css/creativespace/collection.less';
</style>
