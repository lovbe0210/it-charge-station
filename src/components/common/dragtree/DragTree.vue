<template>
  <div class="tree-container">
    <div class="tree-header">
      <a-checkbox :indeterminate="selectedNodes.size > 0 && selectedNodes.size < totalDirNode"
                  :checked="totalDirNode === selectedNodes.size"
                  @change="onCheckAllChange">
        <span>选择{{ selectedNodes.size }}个</span>
      </a-checkbox>
    </div>
    <div class="tree-wrapper">
      <tree-node :treeList="dirData"
                 @treeUpdate="treeUpdate"/>
    </div>
  </div>
</template>

<script>
import TreeNode from './TreeNode.vue';

export default {
  name: "DragTree",
  data() {
    return {
      // type 1文章 2文件夹
      dirData: [
        {
          id: 1,
          type: 1,
          title: '文章1'
        },
        {
          id: 2,
          type: 2,
          title: '目录1',
          expand: false,
          children: [
            {
              id: 21,
              type: 2,
              title: '子目录11',
              expand: false,
              children: [
                {
                  id: 2111,
                  type: 1,
                  title: '文章2111'
                },
                {
                  id: 2112,
                  type: 2,
                  title: '空目录2112',
                  expand: true,
                  children: []
                },
                {
                  id: 2113,
                  type: 2,
                  title: '子目录2113',
                  expand: true,
                  children: [
                    {
                      id: 21131,
                      type: 1,
                      sort: 0,
                      title: '深层文章21131'
                    },
                    {
                      id: 21132,
                      type: 1,
                      sort: 1,
                      title: '深层文章21132'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 5,
          type: 1,
          title: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1'
        }
      ],
      treeData: [
        {
          id: 1,
          name: "1号",
          type: 2,
          children: []
        },
        {
          id: 2,
          name: "2号",
          type: 1,
          children: [
            {
              id: 4,
              type: 2,
              name: "4号",
              children: []
            },
            {
              id: 5,
              name: "5号",
              type: 1,
              children: []
            }
          ]
        },
        {
          id: 3,
          type: 1,
          name: "3号",
          children: []
        }
      ],
      totalDirNode: 5,
      selectedNodes: new Set()
    }
  },
  components: {
    TreeNode
  },
  props: ['columnId'],
  methods: {
    treeUpdate(data) {
      this.dirData = data;
      if (data && data.length > 0) {
        let total = 0;
        data.forEach(node => {
          total += this.getDirTotal(node);
        })
        this.totalDirNode = total;
      } else {
        this.totalDirNode = 0;
      }
    },
    getDirTotal(node) {
      if (node?.type === 1) {
        return 1;
      }
      let total = 1;
      if (node?.type === 2 && node.children?.length > 0) {
        node.children.forEach(child => {
          total += this.getDirTotal(child);
        })
      }
      return total;
    },
    onCheckAllChange(e) {
      if (e.target.checked) {
        // 全选
        this.selectedNodes = new Set(this.dirData.flatMap(node => this.collectIds(node.id)));
      } else {
        this.selectedNodes.clear();
      }
    },


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
  width: 100%;

  .tree-header {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .tree-wrapper {
    width: 98%;
    margin: 0 auto;
  }
}
</style>
