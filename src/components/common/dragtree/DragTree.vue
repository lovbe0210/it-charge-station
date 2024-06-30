<template>
  <div class="tree-container un-select">
    <div class="tree-header">
      <div>
        <a-checkbox :indeterminate="checkedNodes.size > 0 && checkedNodes.size < totalDirNode"
                    :checked="checkedNodes.size === totalDirNode"
                    @change="onCheckAllChange">
          <span>选择{{ checkedNodes.size }}个</span>
        </a-checkbox>
        <Button type="text" @click="expandTreeNode">
          <span :class="['iconfont', openAllTree ? 'nav-open' : 'nav-close']"/>
          {{ openAllTree ? '全部折叠' : '全部展开' }}
        </Button>
      </div>
      <div class="action-btn" v-if="checkedNodes.size > 0">
        <Button type="text">
          <span class="iconfont copy"></span>
          复制
        </Button>
        <Button type="text">
          <span class="iconfont delete"></span>
          删除
        </Button>
      </div>
      <div class="article-info" v-else>
        <Dropdown trigger="click"
                  placement="bottom"
                  @on-click="selectedName => articleShowInfo = selectedName">
          <div class="menu-icon">
            <span>文档信息：{{ articleShowInfo === 'updateTime' ? '更新时间' : '创建时间' }}</span>
            <span class="iconfont expand"></span>
          </div>
          <DropdownMenu slot="list">
            <DropdownItem name="updateTime" :class="articleShowInfo === 'updateTime' ? 'selected' : ''">
              <span>更新时间</span>
              <span class="iconfont true"/>
            </DropdownItem>
            <DropdownItem name="createTime" :class="articleShowInfo === 'createTime' ? 'selected' : ''">
              <span>创建时间</span>
              <span class="iconfont true"/>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="tree-wrapper">
      <tree-node :treeList="dirData"
                 :treeParamBox="treeParamBox"
                 @treeUpdate="treeUpdate"/>
    </div>
  </div>
</template>

<script>
import TreeNode from './TreeNode.vue';
import {formatTime} from '@/utils/emoji';

export default {
  name: "DragTree",
  data() {
    return {
      // type 1文章 2文件夹
      dirData: [
        {
          id: 1,
          type: 1,
          title: '文章1',
          createTime: 1706504807000,
          updateTime: 1719540407000
        },
        {
          id: 2,
          type: 2,
          title: '目录1',
          expand: true,
          children: [
            {
              id: 21,
              type: 2,
              title: '子目录11',
              expand: false,
              parentId: 2,
              children: [
                {
                  id: 2111,
                  type: 1,
                  title: '文章2111',
                  createTime: 1706504807000,
                  updateTime: 1719637607000,
                  parentId: 21
                },
                {
                  id: 2112,
                  type: 2,
                  title: '空目录2112',
                  expand: true,
                  parentId: 21,
                  children: []
                },
                {
                  id: 2113,
                  type: 2,
                  title: '子目录2113',
                  expand: true,
                  parentId: 21,
                  children: [
                    {
                      id: 21131,
                      type: 1,
                      title: '深层文章21131',
                      createTime: 1706504807000,
                      updateTime: 1719626807000,
                      parentId: 2113
                    },
                    {
                      id: 21132,
                      type: 1,
                      title: '深层文章21132',
                      createTime: 1706504807000,
                      updateTime: 1719626807000,
                      parentId: 2113
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
          title: '单文章节点asd阿萨达啊实打实多爱仕达多撒啊实打实阿萨达1',
          createTime: 1706504807000,
          updateTime: 1716948407000
        }
      ],
      totalDirNode: 5,
      openAllTree: false,
      articleShowInfo: 'updateTime',
      checkedNodes: new Set(),
      tmpAllNodeIds: new Set()
    }
  },
  components: {
    TreeNode
  },
  props: ['columnId'],
  computed: {
    treeParamBox() {
      return {
        // 已选中节点
        checkedNodes: this.checkedNodes,
        // 当选中或取消选中时触发
        checkChange: this.checkChange,
        // 当树节点发生变化时触发
        onTreeChange: this.onTreeChange,
        // 文章显示信息
        articleShowInfo: this.articleShowInfo,
        formatTime: formatTime
      }
    }
  },
  methods: {
    treeUpdate(data) {
      this.dirData = data;
    },
    onTreeChange() {
      if (this.dirData && this.dirData.length > 0) {
        let total = 0;
        this.dirData.forEach(node => {
          node.parentId = null;
          total += this.getDirTotal(node);
        })
        this.totalDirNode = total;
      } else {
        this.totalDirNode = 0;
        this.tmpAllNodeIds.clear();
      }
    },
    getDirTotal(node) {
      this.tmpAllNodeIds.add(node.id);
      if (node?.type === 1) {
        return 1;
      }
      let total = 1;
      if (node?.type === 2 && node.children?.length > 0) {
        node.children.forEach(child => {
          child.parentId = node.id;
          total += this.getDirTotal(child);
        })
      }
      return total;
    },
    onCheckAllChange(e) {
      if (e.target.checked) {
        // 全选
        this.checkedNodes = new Set(this.tmpAllNodeIds.keys());
      } else {
        this.checkedNodes = new Set();
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
            dir.expand = this.openAllTree;
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
      // 本级
      let currentNodeStatus = this.checkedNodes.has(treeNode.id);
      if (currentNodeStatus) {
        this.checkedNodes.delete(treeNode.id)
      } else {
        this.checkedNodes.add(treeNode.id)
      }
      // 如果时目录，则需要联动下级，无需关注上级
      if (treeNode.type === 2 && treeNode.children && treeNode.children.length > 0) {
        treeNode.children.forEach(node => this.recursiveChecked(node, !currentNodeStatus));
      }
      this.checkedNodes = new Set(this.checkedNodes.keys());
    },
    recursiveChecked(treeNode, parentNodeStatus) {
      if (parentNodeStatus) {
        this.checkedNodes.add(treeNode.id)
      } else {
        this.checkedNodes.delete(treeNode.id)
      }
      if (treeNode.type === 1 || !treeNode.children) {
        return;
      }
      treeNode.children.forEach(node => this.recursiveChecked(node, parentNodeStatus));
    }
  }
}
</script>

<style scoped lang="less">
  @import "./css/dragtree.less";
</style>
