import {
  $,
  CARD_KEY,
  decodeCardValue,
  encodeCardValue,
  isEngine,
  Plugin,
  sanitizeUrl
} from "@aomao/engine"
import AudioComponent from "./component"
import AudioUploader from "./uploader"
import locales from "./locales"

export default class AudioPlugin extends Plugin {
  static get pluginName() {
    return "audio"
  }

  init() {
    this.editor.language.add(locales)
    if (!isEngine(this.editor)) return
    this.editor.on("parse:html", node => this.parseHtml(node))
    this.editor.on("paste:each", child => this.pasteHtml(child))
    this.editor.on("paste:schema", schema => this.pasteSchema(schema))
  }

  execute(status, url, name, audioId, size, download) {
    const value = {
      status,
      audioId,
      url,
      name: name || url,
      size,
      download
    }
    if (status === "error") {
      value.url = ""
      value.message = url
    }
    this.editor.card.insert("audio", value)
  }

  async waiting(callback) {
    const { card } = this.editor
    // 检测单个组件
    const check = component => {
      return (
        component.root.inEditor() &&
        component.constructor.cardName === AudioComponent.cardName &&
        component.getValue()?.status === "uploading"
      )
    }
    // 找到不合格的组件
    const find = () => {
      return card.components.find(check)
    }
    const waitCheck = component => {
      let time = 60000
      return new Promise((resolve, reject) => {
        if (callback) {
          const result = callback(this.constructor.pluginName, component)
          if (result === false) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject({
              name: this.constructor.pluginName,
              card: component
            })
          } else if (typeof result === "number") {
            time = result
          }
        }
        const beginTime = new Date().getTime()
        const now = new Date().getTime()
        const timeout = () => {
          if (now - beginTime >= time) return resolve()
          setTimeout(() => {
            if (check(component)) timeout()
            else resolve()
          }, 10)
        }
        timeout()
      })
    }
    return new Promise((resolve, reject) => {
      const component = find()
      const wait = component => {
        waitCheck(component)
          .then(() => {
            const next = find()
            if (next) wait(next)
            else resolve()
          })
          .catch(reject)
      }
      if (component) wait(component)
      else resolve()
    })
  }

  pasteSchema(schema) {
    schema.add({
      type: "block",
      name: "div",
      attributes: {
        "data-value": "*",
        "data-type": {
          required: true,
          value: AudioComponent.cardName
        }
      }
    })
  }

  pasteHtml(node) {
    if (!isEngine(this.editor)) return
    if (node.isElement()) {
      const type = node.attributes("data-type")
      if (type === AudioComponent.cardName) {
        const value = node.attributes("data-value")
        const cardValue = decodeCardValue(value)
        if (!cardValue.url) return
        this.editor.card.replaceNode(node, AudioComponent.cardName, cardValue)
        node.remove()
        return false
      }
    }
    return true
  }

  parseHtml(root) {
    root.find(`[${CARD_KEY}=${AudioComponent.cardName}`).each(cardNode => {
      const node = $(cardNode)
      const card = this.editor.card.find(node)
      const value = card?.getValue()
      if (value?.url && value.status === "done") {
        const { onBeforeRender } = this.options
        const { url } = value
        const html = `<div data-type="${
          AudioComponent.cardName
        }"  data-value="${encodeCardValue(
          value
        )}"><audio controls src="${sanitizeUrl(
          onBeforeRender ? onBeforeRender("query", url) : url
        )}" webkit-playsinline="webkit-playsinline" playsinline="playsinline" style="outline:none;" /></div>`
        node.empty()
        node.replaceWith($(html))
      } else node.remove()
    })
  }
}

export { AudioComponent, AudioUploader }
