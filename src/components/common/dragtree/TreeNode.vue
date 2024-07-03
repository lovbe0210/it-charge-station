<template>
  <div class="drag-tree">
    <draggable
      v-bind="dragOptions"
      tag="div"
      class="drag-tree-wrapper"
      @change="treeParamBox.onTreeChange"
      v-model="dragTree">
      <div class="node-item-container" :key="treeNode.id" v-for="treeNode in treeList">
        <div class="node-item-content" v-if="treeNode.type === 1">
          <div class="node-label node">
            <div @click="treeNode.expand = !treeNode.expand">
              <span class="iconfont dir-open" v-if="treeNode.expand"/>
              <span class="iconfont dir-collapse" v-else/>
            </div>
            <a-checkbox :checked="!!treeParamBox.checkedNodes[treeNode.id]"
                        @change="treeParamBox.checkChange(treeNode)"
                        :disabled="!!(treeNode.parentId && treeParamBox.checkedNodes[treeNode.parentId])">
            </a-checkbox>
            <div :class="['node-title', showInput && treeNode.id === currentNode?.id ? 'editing' : '']">
              <span class="title-content">
                <span class="content">
                  {{ treeNode.title }}
                </span>
                <input type="text"
                       :ref="treeNode.id"
                       v-if="showInput && treeNode.id === currentNode?.id"
                       @blur="updateNodeTitle"
                       @keyup="updateNodeTitle"
                       maxlength="30"
                       v-model="tmpName"/>
              </span>
              <span class="connect-driver">
                --------------------------------------------------------------------------------------------------------
              </span>
            </div>
          </div>
          <div class="action-more" tabindex="1">
            <span class="article-time">
              {{
                treeParamBox.articleShowInfo === 'updateTime'
                  ? treeParamBox.formatTime(treeNode.updateTime) : treeParamBox.formatTime(treeNode.createTime)
              }}
            </span>
            <Dropdown placement="bottom-end"
                      trigger="click">
              <span class="article-action">
                <span class="iconfont operate"/>
              </span>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <span @click="nodeAction(treeNode, 'rename')"
                        class="action-item">
                    <span class="iconfont rename"></span>
                    重命名
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span class="action-item"
                        @click="nodeAction(treeNode, 'copy')" >
                    <span class="iconfont copy"></span>
                    复制
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span class="action-item"
                        @click="nodeAction(treeNode, 'delete')" >
                    <span class="iconfont delete"></span>
                    删除
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span class="action-item"
                        @click="nodeAction(treeNode, 'remove')" >
                    <span class="iconfont remove"></span>
                    移出专栏
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="node-item-content" v-else>
          <div class="node-label dir">
            <span @click="treeNode.expand = !treeNode.expand">
              <span class="iconfont dir-open" v-if="treeNode.expand"/>
              <span class="iconfont dir-collapse" v-else/>
            </span>
            <a-checkbox :checked="!!treeParamBox.checkedNodes[treeNode.id]"
                        @change="treeParamBox.checkChange(treeNode)"
                        :disabled="!!(treeNode.parentId && treeParamBox.checkedNodes[treeNode.parentId])">
            </a-checkbox>
            <span :class="['node-title', showInput && treeNode.id === currentNode?.id ? 'editing' : '']">
              <span class="content" @click="treeNode.expand = !treeNode.expand">
                {{ treeNode.title }}
              </span>
              <input type="text"
                     :ref="treeNode.id"
                     v-if="showInput && treeNode.id === currentNode?.id"
                     @blur="updateNodeTitle"
                     @ended="updateNodeTitle"
                     maxlength="30"
                     v-model="tmpName"/>
            </span>
          </div>
          <div class="action-more" tabindex="1">
            <Dropdown placement="bottom-end" trigger="click">
              <span class="dir-action">
                <span class="iconfont add"/>
              </span>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <span class="action-item" @click="nodeAction(treeNode, 'newNode', 1)">
                    <span class="iconfont article"></span>
                    文档
                  </span>
                </DropdownItem>
                <DropdownItem>
                  <span class="action-item" @click="nodeAction(treeNode, 'newNode', 2)">
                    <span class="iconfont dir-fold"></span>
                    新建分组
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-end"
                      trigger="click">
              <span class="dir-action" style="margin-left: 6px">
                <span class="iconfont operate"/>
              </span>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <span @click="nodeAction(treeNode, 'rename')" class="action-item">
                    <span class="iconfont rename"></span>
                    重命名
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span class="action-item"  @click="nodeAction(treeNode, 'copy')">
                    <span class="iconfont copy"></span>
                    复制
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span class="action-item" @click="nodeAction(treeNode, 'delete')" >
                    <span class="iconfont delete"></span>
                    删除
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span class="action-item" @click="nodeAction(treeNode, 'remove')" >
                    <span class="iconfont remove"></span>
                    移出专栏
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="node-item-children" v-if="treeNode.type === 2">
          <tree-node v-show="treeNode.expand"
                     :treeList="treeNode.children"
                     :treeParamBox="treeParamBox"
                     @treeUpdate="node => treeNode.children = node"/>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: "TreeNode",
  data() {
    return {
      showInput: false,
      currentNode: null,
      tmpName: ''
    }
  },
  components: {
    draggable
  },
  props: {
    treeList: {
      type: Array,
      required: true
    },
    treeParamBox: {
      type: Object,
      required: true
    }
  },
  computed: {
    dragOptions() {
      let keywords = this.treeParamBox.filterKeywords;
      return {
        disabled: keywords ? keywords.trim().length > 0 : false,
        animation: 400,
        group: "description",
        pull: false,
        ghostClass: "ghost"
      };
    },
    dragTree: {
      get() {
        return this.treeList;
      },
      set(data) {
        this.$emit('treeUpdate', data);
      }
    }
  },
  methods: {
    nodeAction(treeNode, actionType, newNodeType) {
      switch (actionType) {
        case "rename":
          this.currentNode = treeNode;
          this.showInput = true;
          this.tmpName = treeNode.title;
          this.$nextTick(function () {
            this.$refs[treeNode.id][0].focus();
          });
          break
        case "copy":
          this.treeParamBox.copyNode(treeNode);
          break;
        case "newNode":
          this.treeParamBox.createNode(treeNode, newNodeType);
          break;
      }
    },
    updateNodeTitle(event) {
      if ((event instanceof KeyboardEvent && event.key === 'Enter') || event instanceof FocusEvent) {
        if (this.tmpName?.trim().length > 0) {
          this.currentNode.title = this.tmpName.trim();
        }
        this.showInput = false;
      }
    }
  },
  watch: {
    "showInput"(val) {
      if (!val) {
        this.currentNode = null;
        this.tmpName = '';
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "./css/treenode.less";
</style>
