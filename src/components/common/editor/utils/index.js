import Vue from "vue"
import {Outline} from "@aomao/plugin-heading";
import {$} from "@aomao/engine";

function creatComponent(component, containter, props = {}, emitEvent = {}) {
  const comp = new Vue({
    render(createElement) {
      return createElement(component, {
        props,
        on: emitEvent
      })
    }
  }).$mount()

  containter.appendChild(comp.$el)

  // comp.remove = (): void => {
  //   containter.removeChild(comp.$el);
  //   comp.$destroy();
  // };
  return comp
}

export {creatComponent}

/**
 * 获取标题节点数据
 * @param editor
 * @returns {Array<any>}
 */
const outline = new Outline();

export function getTocData(editor) {
  // 从编辑区域提取符合结构要求的标题 Dom 节点
  let nodes = []
  const {card} = editor;
  editor.container.find("h1,h2,h3,h4,h5,h6").each(child => {
    const node = $(child)
    // Card 里的标题，不纳入大纲
    if (card.closest(node)) {
      return
    }
    // 非一级深度标题，不纳入大纲
    if (!node.parent()?.isRoot()) {
      return
    }
    nodes.push(node.get())
  })
  return outline.normalize(nodes)
}

/**
 * 获取当前node节点的最顶层父节点--container容器下的子节点
 * @param nodeInterface
 */
export function getParentNode(nodeInterface) {
  if (nodeInterface === null || nodeInterface === undefined) {
    return null;
  }
  let parent = nodeInterface.parent();
  let isRoot = parent?.isRoot();
  if (isRoot) {
    return nodeInterface;
  }
  return getParentNode(parent);
}


/**
 * 判断当前输入是否是标题
 * @param levelName
 * @returns {boolean}
 */

const tocLevel = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
export function belongToc(levelName) {
  if (levelName === null || levelName.length === 0) {
    return false;
  }
  for (let i = 0; i < tocLevel.length; i++) {
    if (tocLevel[i] === levelName) {
      return true;
    }
  }
  return false;
}
