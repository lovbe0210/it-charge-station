<template>
  <div class="tree-node">
    <draggable
      v-bind="dragOptions"
      tag="div"
      class="item-container"
      v-model="dragTree">
      <div class="item-group" :key="treeNode.id" v-for="treeNode in treeList">
        <div class="item">
          <a-checkbox :checked="checkedNodes.has(treeNode.id)" @change="onCheckChange(treeNode)">
          </a-checkbox>
          <span>{{ treeNode.type === 1 ? 'node ' : 'dir ' }}</span>
          <span>{{ treeNode.title }}</span>
        </div>
        <div class="children" v-if="treeNode.type === 2">
          <tree-node class="drag-tree"
                     :treeList="treeNode.children"
                     :checkedNodes="checkedNodes"
                     @checkChange="checkChange"
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
      checkedNodes: {
        type: Set,
        required: true
      }
    },
    computed: {
      isSelected() {
        return true;
        // return this.$parent.selectedNodes.has(this.node.id);
      },
      dragOptions() {
        return {
          animation: 200,
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
      toggleSelect() {
        if (this.isSelected) {
          this.$parent.selectedNodes.delete(this.node.id);
        } else {
          this.$parent.selectedNodes.add(this.node.id);
        }
      },
      onCheckChange(treeNode) {
        this.$emit('checkChange', treeNode);
      },
      addNode() {
        this.$emit('add-node');
      },
      editNode() {
        this.$emit('edit-node');
      },
      deleteNode() {
        this.$emit('delete-node');
      }
    }
  }
</script>

<style scoped lang="less">
  .tree-node {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 5px;

    .node-name {
      border: 1px solid #9e9d9d;
    }
  }

</style>
