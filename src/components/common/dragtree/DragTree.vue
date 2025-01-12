<template>
  <div class="tree-container un-select">
    <div class="tree-header">
      <div class="action-select">
        <a-checkbox
          :indeterminate="Object.keys(checkedNodes).length > 0 && Object.keys(checkedNodes).length < totalDirNode"
          :checked="Object.keys(checkedNodes).length === totalDirNode && totalDirNode !== 0"
          @change="onCheckAllChange">
          <div>选择{{ Object.keys(checkedNodes).length }}个</div>
        </a-checkbox>
        <Button type="text" @click="expandTreeNode" v-show="!filterKeywords || filterKeywords.trim().length === 0">
          <span :class="['iconfont', openAllTree ? 'nav-open' : 'nav-close']"/>
          {{ openAllTree ? '全部折叠' : '全部展开' }}
        </Button>
      </div>
      <div class="action-btn" v-if="Object.keys(checkedNodes).length > 0">
        <Button type="text" @click="copyNode(checkedNodes)">
          <span class="iconfont copy"></span>
          复制
        </Button>
        <Button type="text" @click="confirmAction(checkedNodes, 'delete0')">
          <span class="iconfont delete"></span>
          删除
        </Button>
        <Button type="text" @click="confirmAction(checkedNodes, 'remove0')">
          <span class="iconfont remove-from-column"></span>
          移出专栏
        </Button>
      </div>
      <div class="article-info" v-else>
        <Dropdown trigger="click"
                  placement="bottom"
                  transfer-class-name="dropdown-background dropdown-item-all-hover"
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
              : actionType.indexOf('delete') !== -1 ? '删除' : ''"
        @on-ok="deleteNode">
        <div v-if="actionType.indexOf('remove1') !== -1">
          确定将文章移出专栏吗？
        </div>
        <div v-if="actionType.indexOf('remove2') !== -1">
          确定将分组移出专栏吗？如果分组下有节点也将全部移出专栏！
        </div>
        <div v-if="actionType.indexOf('remove0') !== -1">
          确定将所选节点移出专栏吗？如果包含分组，则分组下的节点也将全部移出专栏！
        </div>
        <div v-if="actionType.indexOf('delete1') !== -1">
          确定删除文章吗？
        </div>
        <div v-if="actionType.indexOf('delete2') !== -1">
          确定删除分组吗？如果分组下有节点也将全部删除，请慎重操作！
        </div>
        <div v-if="actionType.indexOf('delete0') !== -1">
          确定删除所选节点吗？如果包含分组，则分组下的节点也将全部删除，请慎重操作！
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import TreeNode from './TreeNode.vue';
import {formatTime} from '@/utils/emoji';
import WriteCenterApi from "@/api/WriteCenterApi";

export default {
  name: "DragTree",
  data() {
    return {
      // type 1文章 2文件夹
      dirData: [],
      totalDirNode: 5,
      openAllTree: false,
      articleShowInfo: 'updateTime',
      checkedNodes: {},
      tmpAllNodeMap: {},
      showModal: false,
      // remove 移出 delete 删除 1 文档 2节点
      actionType: 'remove1',
      delCheckNodes: {}
    }
  },
  components: {
    TreeNode
  },
  props: ['columnInfo', 'filterKeywords'],
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
        // 删除/移出节点
        confirmAction: this.confirmAction,
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
    onTreeChange(event, init) {
      this.totalDirNode = 0;
      this.tmpAllNodeMap = {};
      if (this.dirData && this.dirData.length > 0) {
        let total = 0;
        this.dirData.forEach(node => {
          node.parentId = null;
          total += this.getDirTotal(node);
        })
        this.totalDirNode = total;
      } else {
        this.checkedNodes = {}
      }
      let removed = event?.removed;
      let element = removed?.element;
      if (element && element?.parentId) {
        let parentNode = this.tmpAllNodeMap[element?.parentId];
        if (parentNode && parentNode.type === 2) {
          parentNode.expand = true;
        }
      }
      if ((typeof init === "boolean" && init) || event?.removed) {
        return;
      }
      let dirInfo = {
        uid: this.columnInfo.uid,
        dirContent: JSON.stringify(this.dirData)
      }
      WriteCenterApi.updateColumnDir(dirInfo)
    },
    getDirTotal(node) {
      this.$set(this.tmpAllNodeMap, node.uid, node);
      if (node?.type === 1) {
        return 1;
      }
      let total = 1;
      if (node?.type === 2 && node.children?.length > 0) {
        node.children.forEach(child => {
          child.parentId = node.uid;
          if (this.checkedNodes[node.uid]) {
            this.$set(this.checkedNodes, child.uid, child);
          } else {
            this.$delete(this.checkedNodes, child.uid);
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
    copyNode(nodeList) {
      if (!nodeList || Object.keys(nodeList).length === 0) {
        return;
      }
      // 先过滤出需要复制的文章id然后统一提交服务器
      let copyArticleList = [];
      Object.values(nodeList).forEach(node => {
        if (node.type === 1) {
          copyArticleList.push(node.uid);
        }
      });
      if (copyArticleList.length > 0) {
        WriteCenterApi.copyArticle(this.columnInfo.uid, copyArticleList).then(data => {
          if (data?.result) {
            let copyArticleMap = data.data;
            Object.values(nodeList).forEach(node => {
              // 本级节点构造
              let newNode = {};
              if (node.type === 1 && copyArticleMap[node.uid]) {
                newNode = {
                  uid: copyArticleMap[node.uid].uid,
                  type: node.type,
                  title: copyArticleMap[node.uid].title,
                  createTime: copyArticleMap[node.uid].createTime,
                  updateTime: copyArticleMap[node.uid].updateTime,
                  parentId: null
                };
              } else if (node.type === 2) {
                newNode = {
                  uid: node.uid + Math.floor(Math.random() * 1000),
                  type: node.type,
                  title: node.title + ' 副本',
                  createTime: Date.now(),
                  updateTime: Date.now(),
                  parentId: null,
                  expand: false,
                  children: []
                };
              }
              if (!node.parentId) {
                this.dirData.unshift(newNode);
                return;
              }
              let parentNode = this.tmpAllNodeMap[node.parentId];
              if (!parentNode && parentNode.type !== 2) {
                return;
              }
              newNode.parentId = node.parentId;
              if (parentNode.children) {
                parentNode.children.unshift(newNode);
              } else {
                parentNode.children = [newNode];
              }
            })
            this.onTreeChange();
          }
        })
      } else {
        Object.values(nodeList).forEach(node => {
          // 本级节点构造
          let newNode = {
            uid: node.uid + Math.floor(Math.random() * 1000),
            type: node.type,
            title: node.title + ' 副本',
            createTime: Date.now(),
            updateTime: Date.now(),
            parentId: null
          };
          if (node.type === 2) {
            newNode.expand = true;
            newNode.children = [];
          }
          if (!node.parentId) {
            this.dirData.unshift(newNode);
            return;
          }
          let parentNode = this.tmpAllNodeMap[node.parentId];
          if (!parentNode && parentNode.type !== 2) {
            return;
          }
          newNode.parentId = node.parentId;
          if (parentNode.children) {
            parentNode.children.unshift(newNode);
          } else {
            parentNode.children = [newNode];
          }
        })
        this.onTreeChange();
      }

    },
    createNode(currentNode, newNodeType) {
      if (newNodeType === 1) {
        // 新建文章
        WriteCenterApi.createArticle(this.columnInfo.uid).then(data => {
          if (data?.result) {
            // 本级节点构造
            let newNode = {
              uid: data.data?.uid,
              type: newNodeType,
              title: data.data?.title,
              createTime: data.data?.createTime,
              updateTime: data.data?.updateTime,
              parentId: currentNode?.uid
            };
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
          }
        })
      } else if (newNodeType === 2) {
        let newNode = {
          uid: Math.floor(Math.random() * 1000),
          type: newNodeType,
          title: '新分组',
          createTime: Date.now(),
          updateTime: Date.now(),
          parentId: currentNode?.uid,
          expand: false,
          children: []
        };
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
      }
    },
    deleteNode() {
      let keys = Object.keys(this.delCheckNodes);
      if (keys.length === 0) {
        return;
      }
      let delNodeList = [];
      this.dirData = this.recursiveDeleteNode(this.delCheckNodes, false, this.dirData, delNodeList);
      // 判断是否有需要更新的文章
      delNodeList = delNodeList.filter(delNode => delNode.type === 1).map(delNode => delNode.uid);
      if (delNodeList.length === 0) {
        this.$Message.success('操作成功')
        this.onTreeChange();
      } else {
        let operateInfo = {
          columnId: this.columnInfo.uid,
          operateType: this.actionType.indexOf('remove') !== -1 ? 2 : this.actionType.indexOf('delete') !== -1 ? 5 : 0,
          articleList: delNodeList
        }
        WriteCenterApi.columnBatchOperate(operateInfo).then(data => {
          if (data?.result) {
            this.$Message.success('操作成功')
            this.onTreeChange();
          }
        })
      }
    },
    recursiveDeleteNode(checkNodes, parentDel, nodeList, delNodeList) {
      let newDir = [];
      nodeList.forEach(node => {
        // 如果是节点直接删除
        let directDel = parentDel && (node.type === 1 || (node.type === 2 && node.children?.length === 0));
        directDel = directDel || (checkNodes[node.uid] && (node.type === 1 || (node.type === 2 && node.children?.length === 0)));
        if (directDel) {
          this.$delete(this.checkedNodes, node.uid);
          delNodeList.push(node);
          return;
        }
        // 如果是分组则继续递归
        if (node.type === 2 && node.children) {
          node.children = this.recursiveDeleteNode(checkNodes, parentDel ? true : !!checkNodes[node.uid], node.children, delNodeList);
          // 处理完下级后判断分组是否需要删除
          if (parentDel || !!checkNodes[node.uid]) {
            this.$delete(this.checkedNodes, node.uid);
            delNodeList.push(node);
            return;
          }
        }
        newDir.push(node);
      })
      return newDir;
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
      let currentNodeStatus = !!this.checkedNodes[treeNode.uid];
      if (currentNodeStatus) {
        this.$delete(this.checkedNodes, treeNode.uid);
      } else {
        this.$set(this.checkedNodes, treeNode.uid, treeNode);
      }
      // 如果时目录，则需要联动下级，无需关注上级
      if (treeNode.type === 2 && treeNode.children && treeNode.children.length > 0) {
        treeNode.children.forEach(node => this.recursiveChecked(node, !currentNodeStatus));
      }
    },
    recursiveChecked(treeNode, parentNodeStatus) {
      if (parentNodeStatus) {
        this.$set(this.checkedNodes, treeNode.uid, treeNode);
      } else {
        this.$delete(this.checkedNodes, treeNode.uid);
      }
      if (treeNode.type === 1 || !treeNode.children) {
        return;
      }
      treeNode.children.forEach(node => this.recursiveChecked(node, parentNodeStatus));
    },
    confirmAction(checkNodes, actionType) {
      this.showModal = true;
      this.actionType = actionType;
      this.delCheckNodes = checkNodes;
    }
  },
  watch: {
    "showModal"(val) {
      if (val) {
        return;
      }
      this.actionType = '';
      this.delCheckNodes = {};
    }
  },
  created() {
    if (this.columnInfo?.dirContentId) {
      WriteCenterApi.getColumnDir(this.columnInfo.uid).then(data => {
        if (data?.result) {
          this.dirData = data.data;
          this.onTreeChange(undefined, true);
        }
      })
    } else if (this.columnInfo?.articleList?.length > 0) {
      let articleList = this.columnInfo.articleList;
      articleList.forEach(article => {
        let dirNode = {
          uid: article.uid,
          type: 1,
          title: article.title,
          createTime: article.createTime,
          updateTime: article.updateTime
        }
        this.dirData.unshift(dirNode);
      })
      this.onTreeChange(true);
      this.totalDirNode = this.columnInfo.articleList.length;
      let dirInfo = {
        uid: this.columnInfo.uid,
        dirContent: JSON.stringify(this.dirData)
      }
      WriteCenterApi.updateColumnDir(dirInfo).then(data => {
        if (data?.result) {
          this.$emit("updateDirContentId", data.data);
        }
      })
    }
  },
  mounted() {
    this.$emit('reportParamBox', this.treeParamBox)
  }
}
</script>

<style scoped lang="less">
@import "./css/dragtree.less";
</style>
