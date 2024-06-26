<template>
  <div class="tree-container">
    <div>
      <button @click="selectAll">全选</button>
      <button @click="deselectAll">取消全选</button>
    </div>
    <div>
      <tree-node class="drag-tree" :treeList="treeData" />
      <!--<draggable
        v-bind="dragOptions"
        tag="div"
        class="item-container"
        v-model="treeData">
        <div class="item-group" :key="el.id" v-for="el in treeData">
          <div class="item">{{ el.name }}</div>
          <tree-node class="item-sub" :list="el.elements" />
        </div>
      </draggable>-->
    </div>
    <!--<draggable
      tag="div"
      v-model="treeData"
      :animation="200"
      :move="checkMove"
      :fallbackOnBody="true"
      :inverSwap="true"
      @onMoveCallback="moveResult"
      @end="onDragEnd"
      group="drag"
    >
      <transition-group>
        <tree-node
          v-for="(element, index) in treeData"
          :key="index"
          :node="element"
          @add-node="addNode(element)"
          @edit-node="editNode(element)"
          @delete-node="deleteNode(element, index)"
        />
      </transition-group>

    </draggable>-->
  </div>
</template>

<script>
  import TreeNode from './TreeNode.vue';

  export default {
    name: "DragTree",
    data() {
      return {
        treeData: [
          {
            id: 1,
            name: "1号",
            elements: []
          },
          {
            id: 2,
            name: "2号",
            elements: [
              {
                id: 4,
                name: "4号",
                elements: []
              },
              {
                id: 5,
                name: "5号",
                elements: []
              }
            ]
          },
          {
            id: 3,
            name: "3号",
            elements: []
          }
        ],
        selectedNodes: new Set()
      }
    },
    components: {
      TreeNode
    },
    methods: {
      addNode(node) {
        return () => {
          const newNode = {
            id: Date.now(),
            name: `新节点${node.children.length + 1}`,
            children: []
          };
          node.children.push(newNode);
        };
      },
      editNode(node) {
        return () => {
          const newName = prompt('请输入新节点名称', node.name);
          if (newName) {
            node.name = newName;
          }
        };
      },
      deleteNode(node) {
        return () => {
          if (confirm('确定删除该节点吗？')) {
            const parent = this.findParent(node.id, this.treeData);
            if (parent) {
              const childIndex = parent.children.findIndex(child => child.id === node.id);
              parent.children.splice(childIndex, 1);
            } else {
              const index = this.treeData.findIndex(n => n.id === node.id);
              this.treeData.splice(index, 1);
            }
          }
        };
      },
      findParent(id, nodes) {
        for (const node of nodes) {
          if (node.children) {
            if (node.children.some(child => child.id === id)) {
              return node;
            } else {
              const found = this.findParent(id, node.children);
              if (found) {
                return found;
              }
            }
          }
        }
        return null;
      },
      selectAll() {
        this.selectedNodes = new Set(this.treeData.flatMap(node => this.collectIds(node)));
      },
      deselectAll() {
        this.selectedNodes.clear();
      },
      collectIds(node) {
        return [node.id, ...(node.children || []).flatMap(child => this.collectIds(child))];
      },
      checkMove(evt) {
        // 检查是否可以拖动
        return true;
      },
      onDragEnd(evt) {
        // 拖动结束的处理
        console.log('拖动结束:', evt);
      },
      moveResult(evt, originalEvent) {
        console.log(originalEvent);
        console.log(evt);
        return false;
      }
    }
  }
</script>

<style scoped lang="less">
  .tree-container {
    max-width: 600px;
    margin: 0 auto;
  }

  .tree-node {
    margin-left: 20px;
  }
</style>
