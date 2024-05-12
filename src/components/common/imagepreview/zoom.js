import { $, Tooltip } from "@aomao/engine"
import CN from "@/components/common/editor/packages/image/src/locales/zh-CN.js"

class Zoom {
  prevStatus = "default"
  nextStatus = "default"
  zoomInStatus = "default"
  zoomOutStatus = "default"
  originSizeStatus = "default"
  bestSizeStatus = "default"

  constructor(editor, pswp) {
    this.editor = editor
    this.pswp = pswp
  }

  init() {
    this.pswp.on("afterzoom", () => {
      this.afterZoom()
    })

    this.pswp.on("afterchange", () => {
      this.afterChange()
    })

    this.pswp.on("resize", () => {
      setTimeout(() => {
        this.afterChange()
        this.afterZoom()
      }, 333)
    })
    this.render()
  }

  renderTemplate() {
    const root = $(`
        <div class="data-pswp-tool-bar">
            <div class="pswp-toolbar-content"></div>
        </div>
        `)

    const toolbarContent = root.find(".pswp-toolbar-content")

    // const lang = this.editor.language.get("image")
    const lang = CN.image

    toolbarContent.append(
      this.renderBtn("arrow-left", lang.prev, this.prevStatus, () => {
        if (this.prevStatus !== "disable") this.pswp.prev()
      })
    )

    toolbarContent.append('<span class="data-pswp-counter"></span>')

    toolbarContent.append(
      this.renderBtn("arrow-right", lang.next, this.nextStatus, () => {
        if (this.nextStatus !== "disable") this.pswp.next()
      })
    )

    toolbarContent.append('<span class="separation"></span>')

    toolbarContent.append(
      this.renderBtn("zoom-in", lang.zoomIn, this.zoomInStatus, () => {
        if (this.zoomInStatus !== "disable") this.pswp.zoomIn()
      })
    )

    toolbarContent.append(
      this.renderBtn("zoom-out", lang.zoomOut, this.zoomOutStatus, () => {
        if (this.zoomOutStatus !== "disable") this.pswp.zoomOut()
      })
    )

    toolbarContent.append(
      this.renderBtn(
        "origin-size",
        lang.originSize,
        this.originSizeStatus,
        () => {
          if (this.originSizeStatus !== "disable") this.pswp.zoomToOriginSize()
        }
      )
    )

    toolbarContent.append(
      this.renderBtn("best-size", lang.bestSize, this.bestSizeStatus, () => {
        if (this.bestSizeStatus !== "disable") this.pswp.zoomToBestSize()
      })
    )

    return root
  }

  afterZoom() {
    const currentLevel = this.pswp.getCurrentZoomLevel()
    const initLevel = this.pswp.getInitialZoomLevel()
    let status = "default"
    if (currentLevel === initLevel) {
      status = "activated"
    }
    if (initLevel === 1) {
      status = "disable"
    }
    this.zoomOutStatus = currentLevel === 0.05 ? "disable" : "default"
    this.zoomInStatus = currentLevel === 5 ? "disable" : "default"
    this.originSizeStatus = currentLevel === 1 ? "activated" : "default"
    this.bestSizeStatus = status
    this.render()
  }

  afterChange() {
    const count = this.pswp.getCount()
    this.nextStatus = count === 1 ? "disable" : "default"
    this.prevStatus = count === 1 ? "disable" : "default"
    this.render()
  }

  renderBtn(zoomClass, title, status, onClick) {
    const btn = $(`<span class="data-pswp-${zoomClass} btn ${status}"></span>`)
    btn.on("mouseenter", () => {
      Tooltip.show(btn, title)
    })
    btn.on("mouseleave", () => {
      Tooltip.hide()
    })
    btn.on("mousedown", e => {
      e.stopPropagation()
      Tooltip.hide()
    })
    btn.on("click", onClick)
    return btn
  }

  render() {
    this.pswp.barUI.empty()
    this.pswp.barUI.append(this.renderTemplate())
  }
}

export default Zoom
