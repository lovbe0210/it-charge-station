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
            <a-checkbox :checked="treeParamBox.checkedNodes.has(treeNode.id)"
                        @change="treeParamBox.checkChange(treeNode)"
                        :disabled="treeParamBox.checkedNodes.has(treeNode.parentId)">
            </a-checkbox>
            <div class="node-title">
              <span class="title-content">
                {{ treeNode.title }}
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
                      @on-click="changeCollectType"
                      trigger="click">
              <span class="article-action">
                <span class="iconfont operate"/>
              </span>
              <DropdownMenu slot="list">
                <DropdownItem name="">
                  <span>
                    重命名
                  </span>
                </DropdownItem>
                <DropdownItem name="1">
                  <span>
                    查看文档
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span>
                    移出专栏
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span>
                    编辑文档
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span>
                    复制
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span>
                    导出文档
                  </span>
                </DropdownItem>
                <DropdownItem name="2">
                  <span>
                    删除
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
            <a-checkbox :checked="treeParamBox.checkedNodes.has(treeNode.id)"
                        @change="treeParamBox.checkChange(treeNode)"
                        :disabled="treeParamBox.checkedNodes.has(treeNode.parentId)">
            </a-checkbox>
            <span class="node-title">
              {{ treeNode.title }}
            </span>
          </div>
          <div class="action-more">
            <Dropdown placement="bottom-end" @on-click="changeCollectType">
              <span class="dir-action">
                <span class="iconfont add"/>
              </span>
              <DropdownMenu slot="list">
                <DropdownItem name="">
                  目录
                </DropdownItem>
                <DropdownItem name="1">
                  文档
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
    return {}
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
      return {
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
  methods: {}
}
</script>

<style scoped lang="less">
@import "./css/treenode.less";
</style>
