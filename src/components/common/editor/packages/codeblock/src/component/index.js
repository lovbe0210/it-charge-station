import {
  $,
  CardActiveTrigger,
  Card,
  CardType,
  isEngine,
  isServer
} from "@aomao/engine"
import CodeBlockEditor from "./editor"
import renderSelect from "./select"
import modeDatas from "./mode"
import "./index.css"

class CodeBlcok extends Card {
  static get cardName() {
    return "codeblock"
  }

  static get cardType() {
    return CardType.BLOCK
  }

  static get autoSelected() {
    return false
  }

  static get singleSelectable() {
    return false
  }

  static getModes() {
    return modeDatas
  }

  static get lazyRender() {
    return false
  }

  resize = () => {
    return this.codeEditor?.container.find(".data-codeblock-content")
  }

  #modeNameMap = {}
  #modeSynatxMap = {}

  init() {
    if (isServer) return
    super.init()
    if (this.codeEditor) return
    modeDatas.forEach(item => {
      this.#modeNameMap[item.value] = item.name
      this.#modeSynatxMap[item.value] = item.syntax
      if (item.alias) {
        item.alias.forEach(name => {
          this.#modeNameMap[name] = item.name
          this.#modeSynatxMap[name] = item.syntax
        })
      }
    })

    this.codeEditor = new CodeBlockEditor(this.editor, {
      synatxMap: this.#modeSynatxMap,
      onSave: (mode, value) => {
        const oldValue = this.getValue()
        if (mode === oldValue?.mode && value === oldValue.code) return
        this.setValue({
          mode,
          code: value
        })
      },
      onMouseDown: event => {
        if (!this.activated) {
          setTimeout(() => {
            this.editor.card.activate(this.root, CardActiveTrigger.MOUSE_DOWN)
          }, 10)
        }
      },
      onUpFocus: event => {
        debugger
        if (!isEngine(this.editor)) return
        event.preventDefault()
        const { change, card } = this.editor
        const range = change.range.get().cloneRange()
        const prev = this.root.prev()
        const cardComponent = prev ? card.find(prev) : undefined
        if (cardComponent?.onSelectUp) {
          cardComponent.onSelectUp(event)
        } else if (prev) {
          card.focusPrevBlock(this, range, false)
          change.range.select(range)
        } else {
          this.focus(range, true)
          change.range.select(range)
          return
        }
        this.activate(false)
        this.toolbarModel?.hide()
      },
      onDownFocus: event => {
        debugger
        if (!isEngine(this.editor)) return
        event.preventDefault()
        const { change, card } = this.editor
        const range = change.range.get().cloneRange()
        const next = this.root.next()
        const cardComponent = next ? card.find(next) : undefined
        if (cardComponent?.onSelectDown) {
          cardComponent.onSelectDown(event)
        } else if (next) {
          card.focusNextBlock(this, range, false)
          change.range.select(range)
        } else {
          this.focus(range, false)
          change.range.select(range)
          return
        }
        this.activate(false)
        this.toolbarModel?.hide()
      },
      onLeftFocus: event => {
        debugger
        if (!isEngine(this.editor)) return
        event.preventDefault()
        const { change } = this.editor
        const range = change.range.get().cloneRange()
        this.focus(range, true)
        change.range.select(range)
        this.activate(false)
        this.toolbarModel?.hide()
      },
      onRightFocus: event => {
        debugger
        if (!isEngine(this.editor)) return
        event.preventDefault()
        const { change } = this.editor
        const range = change.range.get().cloneRange()
        this.focus(range, false)
        change.range.select(range)
        this.activate(false)
        this.toolbarModel?.hide()
      }
    })
  }

  #viewAutoWrap = undefined
  toolbar() {
    const getItems = () => {
      if (this.loading) return []
      if (!isEngine(this.editor) || this.editor.readonly) {
        return [
          { key: "copy", type: "copy" },
          {
            key: "autoWrap",
            type: "switch",
            content: this.editor.language.get(CodeBlcok.cardName, "autoWrap"),
            getState: () => {
              if (this.#viewAutoWrap === undefined) {
                this.#viewAutoWrap = !!this.getValue()?.autoWrap
              }
              return this.#viewAutoWrap
            },
            onClick: () => {
              const autoWrap = !this.#viewAutoWrap
              this.#viewAutoWrap = autoWrap
              this.codeEditor?.setAutoWrap(autoWrap)
            }
          }
        ]
      }
      return [
        { key: "dnd", type: "dnd" },
        {
          key: "copy",
          type: "copy"
        },
        {
          key: "delete",
          type: "delete"
        },
        {
          key: "select",
          type: "node",
          node: $("<div />"),
          didMount: node => {
            // 等待编辑插件渲染成功后才能去到mode
            renderSelect(
              node.get(),
              this.codeEditor.mode || this.#modeNameMap[this.codeEditor.mode] || "plain",
              mode => {
                setTimeout(() => {
                  debugger
                  this.focusEditor()
                  this.codeEditor?.update(mode)
                }, 10)
              }
            )
            setTimeout(() => {

            }, 100)
          }
        },
        {
          key: "autoWrap",
          type: "switch",
          content: this.editor.language.get(CodeBlcok.cardName, "autoWrap"),
          getState: () => {
            return !!this.getValue()?.autoWrap
          },
          onClick: () => {
            const value = this.getValue()
            const autoWrap = !value?.autoWrap
            this.setValue({
              autoWrap
            })
            this.codeEditor?.setAutoWrap(autoWrap)
          }
        }
      ]
    }
    const options = this.editor.plugin.findPlugin("codeblock")?.options
    if (options?.cardToolbars) {
      return options.cardToolbars(getItems())
    }
    return getItems()
  }

  focusEditor() {
    debugger
    this.codeEditor?.focus()
    this.editor.card.activate(this.root)
  }

  onSelectLeft(event) {
    if (!this.codeEditor) return
    event.preventDefault()
    this.codeEditor.select(false)
    this.activate(true)
    this.toolbarModel?.show()
  }

  onSelectRight(event) {
    if (!this.codeEditor) return
    event.preventDefault()
    this.codeEditor.select(true)
    this.activate(true)
    this.toolbarModel?.show()
  }

  onSelectDown(event) {
    if (!this.codeEditor) return
    event.preventDefault()
    this.codeEditor.select(true)
    this.activate(true)
    this.toolbarModel?.show()
  }

  onSelectUp(event) {
    if (!this.codeEditor) return
    event.preventDefault()
    this.codeEditor.select(false)
    this.activate(true)
    this.toolbarModel?.show()
  }

  render() {
    debugger
    if (!this.codeEditor) return
    if (!this.codeEditor.container.inEditor()) {
      this.codeEditor.container = $(this.codeEditor.renderTemplate())
      this.mirror = undefined
      this.getCenter()
        .empty()
        .append(this.codeEditor.container)
    }
    const value = this.getValue()

    const mode = value?.mode || "plain"
    const code = value?.code || ""
    if (isEngine(this.editor)) {
      if (this.mirror) {
        this.codeEditor.update(mode, code)
        this.codeEditor.setAutoWrap(!!value?.autoWrap)
        return
      }
      this.mirror = this.codeEditor?.create(mode, code, {
        lineWrapping: !!value?.autoWrap
      })
    } else {
      this.codeEditor?.create(mode, code, {
        lineWrapping: !!value?.autoWrap
      })
    }
  }
}

export default CodeBlcok
export { CodeBlockEditor }
