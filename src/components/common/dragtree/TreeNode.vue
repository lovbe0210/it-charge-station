<template>
  <div class="drag-tree">
    <draggable
      v-bind="dragOptions"
      tag="div"
      class="drag-tree-wrapper"
      @change="treeParamBox.onTreeChange"
      v-model="dragTree">
      <div class="node-item-container" :key="treeNode.uid" v-for="treeNode in treeList">
        <div class="node-item-content" v-if="showChildren && treeNode.type === 1">
          <div class="node-label node">
            <div>
              <span class="iconfont dir-open" v-if="treeNode.type === 1 && treeNode.expand"/>
              <span class="iconfont dir-collapse" v-else/>
            </div>
            <a-checkbox :checked="!!treeParamBox.checkedNodes[treeNode.uid]"
                        @change="treeParamBox.checkChange(treeNode)"
                        :disabled="!!(treeNode.parentId && treeParamBox.checkedNodes[treeNode.parentId])">
            </a-checkbox>
            <div :class="['node-title', showInput && treeNode.uid === currentNode?.uid ? 'editing' : '']">
              <span class="title-content">
                <span class="content">
                  {{ treeNode.title }}
                </span>
                <input type="text"
                       :ref="treeNode.uid"
                       v-if="showInput && treeNode.uid === currentNode?.uid"
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
                      transfer-class-name="dropdown-background dropdown-item-all-hover"
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
                        @click="nodeAction(treeNode, 'delete1')" >
                    <span class="iconfont delete"></span>
                    删除
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span class="action-item"
                        @click="nodeAction(treeNode, 'remove1')" >
                    <span class="iconfont remove-from-column"></span>
                    移出专栏
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="node-item-content" v-if="showChildren && treeNode.type === 2">
          <div class="node-label dir">
            <span @click="treeNode.expand = !treeNode.expand">
              <span class="iconfont dir-open" v-if="treeNode.expand"/>
              <span class="iconfont dir-collapse" v-else/>
            </span>
            <a-checkbox :checked="!!treeParamBox.checkedNodes[treeNode.uid]"
                        @change="treeParamBox.checkChange(treeNode)"
                        :disabled="!!(treeNode.parentId && treeParamBox.checkedNodes[treeNode.parentId])">
            </a-checkbox>
            <span :class="['node-title', showInput && treeNode.uid === currentNode?.uid ? 'editing' : '']">
              <span class="content" @click="treeNode.expand = !treeNode.expand">
                {{ treeNode.title }}
              </span>
              <input type="text"
                     :ref="treeNode.uid"
                     v-if="showInput && treeNode.uid === currentNode?.uid"
                     @blur="updateNodeTitle"
                     @keyup="updateNodeTitle"
                     maxlength="30"
                     v-model="tmpName"/>
            </span>
          </div>
          <div class="action-more" tabindex="1">
            <Dropdown placement="bottom-end"
                      transfer-class-name="dropdown-background dropdown-item-all-hover"
                      trigger="click">
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
                      transfer-class-name="dropdown-background dropdown-item-all-hover"
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
                  <span class="action-item" @click="nodeAction(treeNode, 'delete2')">
                    <span class="iconfont delete"></span>
                    删除
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span class="action-item" @click="nodeAction(treeNode, 'remove2')" >
                    <span class="iconfont remove-from-column"></span>
                    移出专栏
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="node-item-children" v-if="showChildren && treeNode.type === 2">
          <tree-node :showChildren="treeNode.expand"
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
import WriteCenterApi from "../../../api/WriteCenterApi";

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
    },
    showChildren: {
      type: Boolean,
      default: true
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
            this.$refs[treeNode.uid][0].focus();
          });
          break
        case "copy":
          let copyNode = {};
          this.$set(copyNode, treeNode.uid, treeNode);
          this.treeParamBox.copyNode(copyNode);
          break;
        case "newNode":
          this.treeParamBox.createNode(treeNode, newNodeType);
          break;
        case "delete1":
        case "delete2":
        case "remove1":
        case "remove2":
          let checkNode = {};
          this.$set(checkNode, treeNode.uid, treeNode);
          this.treeParamBox.confirmAction(checkNode, actionType);
          break;
      }
    },
    updateNodeTitle(event) {
      if ((event instanceof KeyboardEvent && event.key === 'Enter') || event instanceof FocusEvent) {
        if (this.tmpName?.trim().length > 0 && this.currentNode.title !== this.tmpName.trim()) {
          // 如果为文章节点还需要同步更新数据库
          if (this.currentNode.type === 1) {
            let articleInfo = {
              uid: this.currentNode.uid,
              title: this.tmpName.trim()
            }
            WriteCenterApi.updateArticleInfo(this, articleInfo).then(data => {
              if (data?.result) {
                this.currentNode.title = articleInfo.title;
                this.treeParamBox.onTreeChange();
                this.showInput = false;
              }
            })
          } else {
            this.currentNode.title = this.tmpName.trim();
            this.treeParamBox.onTreeChange();
            this.showInput = false;
          }
        }

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
