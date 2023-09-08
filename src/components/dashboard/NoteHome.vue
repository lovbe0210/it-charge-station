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
      <div class="note-list-operate">
        <div>
          <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
          </a-checkbox>
        </div>
        <div>
          <span>
            共选择了1篇笔记
          </span>
          <Button>
            取消选择
          </Button>
        </div>
        <div class="action">
          <Button>合并移动到知识库</Button>
          <Button>批量删除</Button>
        </div>
      </div>
      <div class="note-list-item">
        <div class="index-module_leftToolBar">
          <div class="index-module_checkBox">
            <label class="ant-checkbox-wrapper">
              <span class="ant-checkbox">
                <input type="checkbox" class="ant-checkbox-input" value="">
                <span class="ant-checkbox-inner"></span>
              </span>
            </label>
          </div>
        </div>
        <div class="index-module_noteItem">
          <div class="index-module_meta_B+ClL"><span class="note-status-module_text_ZLRRs">更新于 09-03 16:51</span>
          </div>
          <div class="ant-card index-module_content_Yf3Cm note-item-normal index-module_reading_dfUvx">
            <div class="ant-card-body">
              <div>
                <div style="z-index: 3; left: 0px; top: 0px;">
                  <div class="yuque-doc-content" data-df="lake" style="position: relative;">
                    <div>
                      <div
                        class="ne-viewer larkx-yuque-theme-light ne-typography-classic ne-viewer-layout-mode-adapt"
                        data-viewer-mode="normal" id="ub0cd">
                        <div class="ne-viewer-header">
                          <h2>标题</h2>
                        </div>
                        <div class="ne-viewer-body">
                          <ne-p id="ua3f11f63" data-lake-id="ua3f11f63">
                            <ne-text id="u86b531a6">阿萨大大阿达阿达是的</ne-text>
                            <span class="ne-viewer-b-filler" ne-filler="block"><br></span></ne-p>
                        </div>
                        <div class="ne-inner-overlay-container"></div>
                      </div>
                      <div style="height: 0px; overflow: hidden;"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="index-module_viewBlank_ecM7l view-blank"></div>
              <div id="doclet-viewmore-46842329" class="index-module_viewMore_gsQbm view-more"></div>
            </div>
          </div>
          <div class="index-module_tagContainer_nVqVt note-list-item-read-tag-add"></div>
        </div>
        <div class="index-module_rightToolBar">
          <div class="index-module_toolbar_qdXT3 index-module_noteListToolBar_wBtt4 note-list-toolbar">
            <span class="iconfont icon-editor-setting"></span>
            <span class="iconfont icon-history"></span>
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
        orderType: 'updateTime'
      }
    },
    methods: {
      updateNoteOrderType(type) {
        this.orderType = type;
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  @import '../css/dashboard/noteHome.less';
</style>
