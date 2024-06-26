<template>
  <div class="tree-node">
    <draggable
      v-bind="dragOptions"
      tag="div"
      class="item-container"
      v-model="treeList"
    >
      <div class="item-group" :key="el.id" v-for="el in showTreeData">
        <div class="item">{{ el.name }}</div>
        <tree-node class="drag-tree" :treeList="el.elements"/>
      </div>
    </draggable>
    <!--<div>
      <input type="checkbox" :checked="isSelected" @change="toggleSelect"/>
      <span @click="editNode" class="node-name">{{ node.name }}</span>
      <Button type="text" @click="addNode">添加子节点</Button>
      <Button type="text" @click="deleteNode">删除</Button>
    </div>-->
    <!--<ul v-if="node.children && node.children.length">
      <draggable tag="div"
                 v-model="node.children"
                 :move="checkMove"
                 :fallbackOnBody="true"
                 :inverSwap="true"
                 group="drag"
                 @end="onDragEnd"
                 :animation="200">
        <transition-group>
          <tree-node
            v-for="(element, index) in node.children"
            :key="index"
            :node="element"
            @add-node="addNode(element)"
            @edit-node="editNode(element)"
            @delete-node="deleteNode(element)"
          />
        </transition-group>

      </draggable>
    </ul>-->
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
          disabled: false,
          ghostClass: "ghost"
        };
      },
      showTreeData() {
        return this.treeList;
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
      checkMove(evt) {
        // 检查是否可以拖动
        return true;
      },
      addNode() {
        this.$emit('add-node');
      },
      editNode() {
        this.$emit('edit-node');
      },
      deleteNode() {
        this.$emit('delete-node');
      },
      onDragEnd(evt) {
        // 拖动结束的处理
        console.log('拖动结束:', evt);
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
