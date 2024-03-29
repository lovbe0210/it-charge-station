import {
  $,
  Plugin,
  CARD_KEY,
  isEngine,
  decodeCardValue,
  encodeCardValue,
  READY_CARD_KEY,
  Parser
} from "@aomao/engine"
import locales from "./locale"
import LightblockComponent from "./component"
import lightblockMk from "./component/markdown"

export default class extends Plugin {
  static get pluginName() {
    return "lightblock"
  }

  init() {
    this.editor.language.add(locales)

    this.editor.on("parse:html", this.parseHtml)
    this.editor.on("paste:schema", this.pasteSchema)
    this.editor.on("paste:each", this.pasteHtml)
    if (isEngine(this.editor)) {
      this.editor.on("markdown-it", this.markdownIt)
    }
  }

  execute() {
    const editor = this.editor

    if (!isEngine(editor) || this.editor.readonly) return
    const { card } = this.editor

    card.insert(LightblockComponent.cardName, {
        borderColor: "#fed4a4",
        backgroundColor: "#fff5eb",
        text: "light-block"
      },
      true)
  }

  markdownIt = markdown => {
    if (this.options.markdown !== false) {
      lightblockMk(markdown)
    }
  }

  pasteSchema(schema) {
    schema.add({
      type: "block",
      name: "div",
      attributes: {
        "data-type": {
          required: true,
          value: LightblockComponent.cardName
        },
        "data-value": "*"
      }
    })
  }

  pasteHtml = node => {
    const editor = this.editor
    const cardName = LightblockComponent.cardName

    if (!isEngine(editor) || editor.readonly) return
    if (node.isElement()) {
      const type = node.attributes("data-type")
      if (type === cardName) {
        const value = node.attributes("data-value")
        const cardValue = decodeCardValue(value)
        editor.card.replaceNode(node, cardName, cardValue)
        node.remove()
        return false
      }
    }
    return true
  }

  parseHtml = root => {
    const cardName = LightblockComponent.cardName

    root
      .find(`[${CARD_KEY}="${cardName}"],[${READY_CARD_KEY}="${cardName}"]`)
      .each(cardNode => {
        const node = $(cardNode)
        const card = this.editor.card.find(node)
        const value = card?.getValue()
        if (value) {
          node.empty()
          const div = this.renderHtml(value, cardName)
          node.replaceWith(div)
        } else node.remove()
      })
  }

  renderHtml = (value, cardName) => {
    const htmlstring = new Parser(
      value.html || value.text,
      this.editor
    ).toHTML()

    return $(
      `<div data-type="${cardName}" data-value="${encodeCardValue(
        value
      )}">${htmlstring}</div>`
    )
  }

  destroy() {
    const editor = this.editor

    editor.off("parse:html", this.parseHtml)
    editor.off("paste:schema", this.pasteSchema)
    editor.off("paste:each", this.pasteHtml)
  }
}
export { LightblockComponent }
