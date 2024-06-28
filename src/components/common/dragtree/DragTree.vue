<template>
  <div class="tree-container">
    <div class="tree-header">
      <div>
        <a-checkbox :indeterminate="checkedNodes.size > 0 && checkedNodes.size < totalDirNode"
                    :checked="totalDirNode === checkedNodes.size"
                    @change="onCheckAllChange">
          <span>选择{{ checkedNodes.size }}个</span>
        </a-checkbox>
        <Button type="text" @click="expandTreeNode">
          <span :class="['iconfont', openAllTree ? 'nav-open' : 'nav-close']"/>
          {{ openAllTree ? '全部折叠' : '全部展开' }}
        </Button>
      </div>
      <div class="action-btn">
        <Button type="text">
          <span class="iconfont copy"></span>
          复制
        </Button>
        <Button type="text">
          <span class="iconfont delete"></span>
          删除
        </Button>
      </div>
    </div>
    <div class="tree-wrapper">
      <tree-node :treeList="dirData"
                 :checkedNodes="checkedNodes"
                 @checkChange="checkChange"
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
                      title: '深层文章21131'
                    },
                    {
                      id: 21132,
                      type: 1,
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
      totalDirNode: 5,
      openAllTree: false,
      checkedNodes: new Set()
    }
  },
  components: {
    TreeNode
  },
  props: ['columnId'],
  computed: {
  },
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
        this.checkedNodes = new Set(this.dirData.flatMap(node => this.collectIds(node.id)));
      } else {
        this.checkedNodes.clear();
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
    /**
     * tree节点展开/收起
     */
    expandTreeNode() {
      this.openAllTree = !this.openAllTree;
      if (this.dirData?.length > 0) {
        this.dirData.forEach(dir => {
          if (dir.type === 2) {
            let children = dir.children;
            this.recursiveExpansion(children, this.openAllTree);
          }
        });
      }
    },
    recursiveExpansion(children, isOpen) {
      if (children && children.length > 0) {
        children.forEach(treeNode => {
          if (treeNode.expand !== undefined) {
            treeNode.expand = isOpen;
          }
          this.recursiveExpansion(children.children, isOpen)
        })
      }
    },
    checkChange(treeNode) {
      if (this.checkedNodes.has(treeNode.id)) {
        this.checkedNodes.delete(treeNode.id)
      } else {
        this.checkedNodes.add(treeNode.id)
      }
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
    display: flex;
    justify-content: space-between;
    align-items: center;

    .ivu-btn {
      padding: 0 10px;
    }
  }

  .tree-wrapper {
    width: 98%;
    margin: 0 auto;
  }
}
</style>
