import {
  $,
  CardType,
  CARD_KEY,
  CARD_TYPE_KEY,
  CARD_VALUE_KEY,
  decodeCardValue,
  Plugin,
  READY_CARD_KEY
} from "@aomao/engine"
import ImageComponent from "./component"
import ImageUploader from "./uploader"
import locales from "./locales"

const PARSE_HTML = "parse:html"

export default class extends Plugin {
  static get pluginName() {
    return "image"
  }

  init() {
    const editor = this.editor
    editor.language.add(locales)
    editor.on(PARSE_HTML, this.parseHtml)
  }

  execute(status, src, alt) {
    const value = {
      status,
      src,
      alt
    }
    if (status === "error") {
      value.src = ""
      value.message = src
    }
    this.editor.card.insert("image", value)
  }

  async waiting(callback) {
    debugger
    const {card} = this.editor
    // 检测单个组件
    const check = component => {
      return (
        component.root.inEditor() &&
        component.name === ImageComponent.cardName &&
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
            return new Error({
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
    // 这里注释了promise中的async
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

  parseHtml = (root, callback) => {
    debugger
    const results = []
    const editor = this.editor
    root
      .find(
        `[${CARD_KEY}="${ImageComponent.cardName}"],[${READY_CARD_KEY}="${ImageComponent.cardName}"]`
      )
      .each(cardNode => {
        const node = $(cardNode)
        const card = editor.card.find(node)
        const value =
          card?.getValue() || decodeCardValue(node.attributes(CARD_VALUE_KEY))
        if (value?.src && value.status === "done") {
          const currentImg = node.find(".data-image-meta img")
          let img =
            currentImg.length > 0 ? currentImg.clone(true) : $("<img />")
          node.empty()
          let src = value.src
          const {onBeforeRender} = this.options
          if (onBeforeRender) {
            src = onBeforeRender(value.status, value.src, this.editor)
          }
          const type = node.attributes(CARD_TYPE_KEY)
          img.attributes("src", src)
          img.css("visibility", "visible")
          const size = value.size
          if (size?.width) img.css("width", `${size.width}px`)
          if (size?.height) img.css("height", `${size.height}px`)
          img.removeAttributes("class")
          img.attributes("data-type", type)
          if (callback) {
            img = callback(img, value)
          }
          if (type === CardType.BLOCK) {
            img = editor.node.wrap(img, $(`<p id="test" style="text-align:center;"></p>`))
          }
          node.replaceWith(img)
          results.push(img)
        } else node.remove()
      })
    return results
  }

  destroy() {
    this.editor.off(PARSE_HTML, this.parseHtml)
  }
}

export {ImageComponent, ImageUploader}
