import { $, Card, isEngine, isHotkey, CardType, isServer } from "@aomao/engine"
import { getToolbarDefaultConfig } from "../../config"
import CollapseComponent from "./collapse"
import ToolbarPopup from "./popup"
import "./index.css"

class ToolbarComponent extends Card {
  #collapseData
  #data

  static get cardName() {
    return "toolbar"
  }

  static get cardType() {
    return CardType.INLINE
  }

  static get singleSelectable() {
    return false
  }

  static get autoSelected() {
    return false
  }

  init() {
    if (!isEngine(this.editor) || isServer) {
      return
    }

    this.component = new CollapseComponent(this.editor, {
      onCancel: () => {
        this.changeToText()
      },
      onSelect: () => {
        this.remove()
      }
    })
  }

  setData(_data) {
    this.#data = _data
  }

  getData() {
    if (!isEngine(this.editor)) {
      return []
    }
    const data = []
    const defaultConfig = getToolbarDefaultConfig(this.editor)
    const collapseConfig = defaultConfig.find(({ type }) => type === "collapse")
    let collapseGroups = []
    if (collapseConfig) collapseGroups = collapseConfig.groups
    const collapseItems = []
    collapseGroups.forEach(group => {
      collapseItems.push(...group.items)
    })
    const value = this.getValue()
    ;(this.#data || (value ? value.data : []) || []).forEach(group => {
      const title = group.title
      const items = []
      group.items.forEach(item => {
        let name = item
        if (typeof item !== "string") name = item.name
        const collapseItem = collapseItems.find(item => item.name === name)
        if (collapseItem) {
          items.push({
            ...collapseItem,
            ...(typeof item !== "string" ? item : {}),
            disabled: collapseItem.onDisabled
              ? collapseItem.onDisabled()
              : !this.editor.command.queryEnabled(name)
          })
        } else if (typeof item === "object") items.push(item)
      })
      data.push({
        title,
        items
      })
    })
    return data
  }

  /**
   * 查询
   * @param keyword 关键字
   * @returns
   */
  search(keyword) {
    const items = []
    // search with case insensitive
    if (typeof keyword === "string") keyword = keyword.toLowerCase()
    // 已经有值了就不用赋值了，不然会影响禁用状态

    if (!this.#collapseData) this.#collapseData = []
    this.#collapseData.forEach(group => {
      group.items.forEach(item => {
        if (item.search && item.search.toLowerCase().indexOf(keyword) >= 0) {
          if (!items.find(({ name }) => name === item.name)) {
            items.push({ ...item })
          }
        }
      })
    })
    const data = []
    if (items.length > 0) {
      data.push({
        title: "",
        items: items
      })
    }
    return data
  }

  remove() {
    if (!isEngine(this.editor)) return
    this.component?.remove()
    this.editor.card.remove(this.id)
  }

  changeToText() {
    if (!this.root.inEditor() || !isEngine(this.editor)) {
      return
    }

    const content = this.keyword?.get?.()?.innerText || ""
    this.remove()
    this.editor.node.insertText(content)
  }

  destroy() {
    this.component?.unbindEvents()
    this.component?.remove()
  }

  activate(activated) {
    super.activate(activated)
    if (!activated) {
      this.component?.unbindEvents()
      this.changeToText()
    }
  }

  handleInput() {
    if (!isEngine(this.editor)) return
    const { change, card } = this.editor
    if (change.isComposing()) {
      return
    }
    const content =
      this.keyword?.get?.()?.innerText.replace(/[\r\n]/g, "") || ""
    // 内容为空
    if (content === "") {
      this.component?.remove()
      card.remove(this.id)
      return
    }

    const keyword = content.substr(1)
    // 搜索关键词为空
    if (keyword === "") {
      this.component?.render(
        this.editor.root,
        this.root,
        this.#collapseData || []
      )
      return
    }
    const data = this.search(keyword)
    this.component?.render(this.editor.root, this.root, data)
  }

  resetPlaceHolder() {
    if ("/" === this.keyword?.get?.()?.innerText) this.placeholder?.show()
    else this.placeholder?.hide()
  }

  render(data) {
    this.setData(data)
    const editor = this.editor
    if (!isEngine(editor) || isServer) return
    const language = editor.language.get("toolbar", "component")
    this.root.attributes("data-transient", "true")
    this.root.attributes("contenteditable", "false")
    // 编辑模式
    const container = $(
      `<span class="data-toolbar-component-keyword" contenteditable="true">/</span><span class="data-toolbar-component-placeholder">${language["placeholder"]}</span>`
    )
    const center = this.getCenter()
    center.empty().append(container)
    this.keyword = center.find(".data-toolbar-component-keyword")
    this.placeholder = center.find(".data-toolbar-component-placeholder")
    // 监听输入事件
    this.keyword?.on("keydown", e => {
      if (isHotkey("enter", e)) {
        e.preventDefault()
      }
    })
    const renderTime = Date.now()
    this.keyword?.on("input", () => {
      this.resetPlaceHolder()
      // 在 Windows 上使用中文输入法，在 keydown 事件里无法阻止用户的输入，所以在这里删除用户的输入
      if (Date.now() - renderTime < 200) {
        const textNode = this.keyword?.first()
        if (
          (textNode && textNode.isText() && textNode[0].nodeValue === "/、") ||
          textNode?.get?.()?.nodeValue === "//"
        ) {
          const text = textNode.get()?.splitText(1)
          text?.remove()
        }
      }

      setTimeout(() => {
        this.handleInput()
      }, 10)
    })
    if (!this.#collapseData) this.#collapseData = this.getData()
    // 显示下拉列表
    this.component?.render(editor.root, this.root, this.#collapseData)
  }
}

export default ToolbarComponent
export { ToolbarPopup }
