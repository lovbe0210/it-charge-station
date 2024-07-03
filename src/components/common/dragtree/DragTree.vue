<template>
  <div class="tree-container un-select">
    <div class="tree-header">
      <div class="action-select">
        <a-checkbox :indeterminate="Object.keys(checkedNodes).length > 0 && Object.keys(checkedNodes).length < totalDirNode"
                    :checked="Object.keys(checkedNodes).length === totalDirNode"
                    @change="onCheckAllChange">
          <span>选择{{ Object.keys(checkedNodes).length }}个</span>
        </a-checkbox>
        <Button type="text" @click="expandTreeNode" v-show="!filterKeywords || filterKeywords.trim().length === 0">
          <span :class="['iconfont', openAllTree ? 'nav-open' : 'nav-close']"/>
          {{ openAllTree ? '全部折叠' : '全部展开' }}
        </Button>
      </div>
      <div class="action-btn" v-if="Object.keys(checkedNodes).length > 0">
        <Button type="text">
          <span class="iconfont copy"></span>
          复制
        </Button>
        <Button type="text" @click="deleteNode(checkedNodes)">
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
    <div class="tree-wrapper beauty-scroll">
      <tree-node :treeList="treeData"
                 :treeParamBox="treeParamBox"
                 @treeUpdate="treeUpdate"/>
    </div>
    <div class="modal-box">
      <Modal
        v-model="showModal"
        :title="actionType.indexOf('remove') !== -1 ? '移出专栏'
              : actionType.indexOf('delete1') !== -1 ? '删除文档'
              : actionType.indexOf('delete2') !== -1 ? '删除分组' : ''">
        <div v-if="actionType.indexOf('remove1') !== -1">
          确定将文档移出专栏吗？
        </div>
        <div v-if="actionType.indexOf('remove2') !== -1">
          确定将分组内的所有文档移出专栏吗？
        </div>
        <div v-if="actionType.indexOf('delete1') !== -1">
          确定删除文档吗？
        </div>
        <div v-if="actionType.indexOf('delete2') !== -1">
          确定删除分组及分组内的所有文档吗？
        </div>
      </Modal>
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
      checkedNodes: {},
      tmpAllNodeMap: {},
      showModal: false,
      // remove 移出 delete 删除 1 文档 2节点
      actionType: 'remove1'
    }
  },
  components: {
    TreeNode
  },
  props: ['columnId', 'filterKeywords'],
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
        formatTime: formatTime,
        // 复制节点
        copyNode: this.copyNode,
        // 新建节点
        createNode: this.createNode,
        // 搜索过滤关键字
        filterKeywords: this.filterKeywords
      }
    },
    treeData() {
      if (this.filterKeywords && this.filterKeywords.trim().length > 0) {
        return Object.values(this.tmpAllNodeMap)
          .filter(node => node.type === 1 && node.title.indexOf(this.filterKeywords.trim()) !== -1)
          .sort((n1, n2) => n2.updateTime - n1.updateTime);
      } else {
        return this.dirData;
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
        this.tmpAllNodeMap = {};
      }
    },
    getDirTotal(node) {
      this.$set(this.tmpAllNodeMap, node.id, node);
      if (node?.type === 1) {
        return 1;
      }
      let total = 1;
      if (node?.type === 2 && node.children?.length > 0) {
        node.children.forEach(child => {
          child.parentId = node.id;
          if (this.checkedNodes[node.id]) {
            this.$set(this.checkedNodes, child.id, child);
          } else {
            this.$delete(this.checkedNodes, child.id);
          }
          total += this.getDirTotal(child);
        })
      }
      return total;
    },
    onCheckAllChange(e) {
      if (e.target.checked) {
        // 全选
        this.checkedNodes = {...this.tmpAllNodeMap};
      } else {
        this.checkedNodes = {};
      }
    },

    // 节点的新增、复制、删除
    copyNode(node) {
      // 本级节点构造
      let newNode = {
        id: node.id + Math.floor(Math.random() * 1000),
        type: node.type,
        title: node.title + ' 副本',
        createTime: Date.now(),
        updateTime: Date.now(),
        parentId: null
      };
      if (node.type === 2) {
        newNode.expand = false;
        newNode.children = [];
      }
      if (!node.parentId) {
        this.dirData.unshift(newNode);
        this.onTreeChange();
        return;
      }
      let parentNode = this.tmpAllNodeMap[node.parentId];
      if (!parentNode && parentNode.type !== 2) {
        this.onTreeChange();
        return;
      }
      newNode.parentId = node.parentId;
      if (parentNode.children) {
        parentNode.children.unshift(newNode);
      } else {
        parentNode.children = [newNode];
      }
      this.onTreeChange();
    },
    createNode(currentNode, newNodeType) {
      // 本级节点构造
      let newNode = {
        id: Math.floor(Math.random() * 1000),
        type: newNodeType,
        title: newNodeType === 1 ? '无标题文档' : newNodeType === 2 ? '新分组' : '请输入标题',
        createTime: Date.now(),
        updateTime: Date.now(),
        parentId: currentNode?.id
      };
      if (newNodeType === 2) {
        newNode.expand = false;
        newNode.children = [];
      }
      if (!currentNode) {
        this.dirData.unshift(newNode);
        this.onTreeChange();
        return;
      }
      currentNode.expand = true;
      if (currentNode.children) {
        currentNode.children.unshift(newNode);
      } else {
        currentNode.children = [newNode];
      }
      this.onTreeChange();
    },
    deleteNode(checkNodes) {
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
          if (treeNode.type === 2) {
            treeNode.expand = isOpen;
          }
          this.recursiveExpansion(children.children, isOpen)
        })
      }
    },
    checkChange(treeNode) {
      // 本级
      let currentNodeStatus = !!this.checkedNodes[treeNode.id];
      if (currentNodeStatus) {
        this.$delete(this.checkedNodes, treeNode.id);
      } else {
        this.$set(this.checkedNodes, treeNode.id, treeNode);
      }
      // 如果时目录，则需要联动下级，无需关注上级
      if (treeNode.type === 2 && treeNode.children && treeNode.children.length > 0) {
        treeNode.children.forEach(node => this.recursiveChecked(node, !currentNodeStatus));
      }
    },
    recursiveChecked(treeNode, parentNodeStatus) {
      if (parentNodeStatus) {
        this.$set(this.checkedNodes, treeNode.id, treeNode);
      } else {
        this.$delete(this.checkedNodes, treeNode.id);
      }
      if (treeNode.type === 1 || !treeNode.children) {
        return;
      }
      treeNode.children.forEach(node => this.recursiveChecked(node, parentNodeStatus));
    }
  },
  mounted() {
    this.$emit('reportParamBox', this.treeParamBox)
    this.onTreeChange();
  }
}
</script>

<style scoped lang="less">
@import "./css/dragtree.less";
</style>
