import { $, Card, CardType, isEngine, Parser } from "@aomao/engine"
import themeSelector from "./theme/index"
import "./style.css"

class Lightblock extends Card {
  static get cardName() {
    return "lightblock"
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

  contenteditable = ["div.lightblock-editor-container"]

  #container

  #changeTimeout

  toolbar() {
    if (!isEngine(this.editor) || this.editor.readonly) return []

    const value = this.getValue()
    const language = this.editor.language.get("lightblock")

    return [
      { type: "dnd" },
      { type: "copy" },
      {
        type: "node",
        title: language.theme,
        node: $("<span></span>"),
        didMount: node => {
          themeSelector(
            node.get(),
            language,
            value,
            (data) => {
              this.setValue({
                ...value,
                showIcon: data.showIcon,
                backgroundColor: data.background,
                borderColor: data.border
              })
              this.updateColor();
            }
          )
        }
      },
      { type: "separator" },
      { type: "delete" }
    ]
  }

  getValue() {
    const value = super.getValue()
    const editorContainer = this.#container?.find(
      this.contenteditable.join(",")
    )
    if (!editorContainer) return value
    const editor = this.editor
    const { schema, conversion } = editor
    const container = $("<div></div>")

    container.append(editorContainer.clone(true).children())
    const parser = new Parser(container, editor)
    const html = parser.toValue(schema, conversion, false, false)
    if (!isEngine(editor)) return { ...value, html }
    return {
      ...value,
      html
    }
  }

  updateColor = (value = this.getValue()) => {
    this.#container?.css({
      borderColor: value.borderColor,
      backgroundColor: value.backgroundColor
    })
  }

  onChange = (trigger = "local") => {
    const editor = this.editor
    if (isEngine(editor) && trigger === "local" && editor.model.mutation.isStopped) return

    if (this.#changeTimeout) clearTimeout(this.#changeTimeout)
    this.#changeTimeout = setTimeout(() => {
      const value = this.getValue()
      this.updateColor(value)
      if (trigger === "local" && isEngine(editor)) {
        if (value) this.setValue(value)
      }
    }, 50)
  }

  render(isFoucs) {
    const value = this.getValue()
    const { borderColor, backgroundColor } = value
    const childValue = value.html
      ? new Parser(value.html, this.editor).toValue()
      : "<br />"
    this.#container = $(
      `<div class="lightblock-container" style="border-color: ${borderColor};background-color:${backgroundColor};">
          <div class="lightblock-editor-container">${childValue}</div>
       </div>`
    )

    if (isFoucs) {
      setTimeout(() => {
        this.#container
          ?.find(".lightblock-editor-container")
          ?.get?.()
          ?.focus?.()
      }, 0)
    }

    return this.#container
  }

  didRender() {
    super.didRender()
    this.updateColor()
  }
}
export default Lightblock
