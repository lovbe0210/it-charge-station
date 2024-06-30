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
          <span class="node-label node">
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
          </span>
          <span class="article-more">
            <span class="article-time">
              {{ treeParamBox.articleShowInfo === 'updateTime'
                ? treeParamBox.formatTime(treeNode.updateTime) : treeParamBox.formatTime(treeNode.createTime) }}
            </span>
            <span class="article-action">
              <span class="iconfont operate"/>
            </span>
          </span>
        </div>
        <div class="node-item-content" v-else>
          <span class="node-label dir">
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
          </span>
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
    methods: {

    }
  }
</script>

<style scoped lang="less">
  @import "./css/treenode.less";
</style>
