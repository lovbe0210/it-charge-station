import {Card, CardType, isEngine, isMobile} from "@aomao/engine"
import Image from "./image"

class ImageComponent extends Card {
  static get cardName() {
    return "image"
  }

  static get cardType() {
    return CardType.INLINE
  }

  static get collab() {
    return false
  }

  /**
   * 设置上传进度
   * @param percent 进度百分比
   */
  setProgressPercent(percent) {
    this.image?.setProgressPercent(percent)
    this.setValue({
      percent
    })
  }

  setSize(size, loaded) {
    if (!size.width || !size.height) return
    const value = this.getValue()
    if (!loaded ||
      !value.size ||
      !value.size.height ||
      !value.size.width ||
      !value.size.naturalWidth ||
      !value.size.naturalHeight) {
      this.setValue({
        size
      })
    }

    if (this.widthInput) {
      this.widthInput.get().value = size.width.toString()
    }
    if (this.heightInput) {
      this.heightInput.get().value = size.height.toString()
    }
  }

  onInputChange(width, height) {
    const value = this.getValue()
    if (typeof width === "string") {
      if (!/^[1-9]+(\d+)?$/.test(width) && this.widthInput) {
        width = value?.size?.width || value?.size?.naturalWidth || 0
        this.widthInput.get().value = width.toString()
      }
      width = parseInt(width.toString(), 10)
    }
    if (typeof height === "string") {
      if (!/^[1-9]+(\d+)?$/.test(height) && this.heightInput) {
        height = value?.size?.height || value?.size?.naturalHeight || 0
        this.heightInput.get().value = height.toString()
      }
      height = parseInt(height.toString(), 10)
    }
    this.image?.changeSize(parseInt(width.toString(), 10), height)
  }

  toolbar() {
    const editor = this.editor
    const getItems = () => {
      if (!isEngine(editor) || editor.readonly) return []
      const {language} = editor
      let value = this.getValue()
      if (this.isLocalError === true || value?.status !== "done") {
        return [
          {
            key: "delete",
            type: "delete"
          }
        ]
      }

      const items = [
        {
          key: "copy",
          type: "copy"
        },
        {
          key: "delete",
          type: "delete"
        }
      ]
      if (isMobile) return items
      const resizerItems = [
        {
          key: "width",
          type: "input",
          placeholder: language.get("image", "toolbbarWidthTitle").toString(),
          prefix: "W:",
          value: value?.size?.width || 0,
          didMount: node => {
            this.widthInput = node.find("input[type=input]")
          },
          onChange: value => {
            const height = Math.round(
              parseInt(value, 10) * (this.image?.rate || 1)
            )
            this.onInputChange(value, height)
          }
        },
        {
          key: "height",
          type: "input",
          placeholder: language.get("image", "toolbbarHeightTitle").toString(),
          prefix: "H:",
          value: value?.size?.height || 0,
          didMount: node => {
            this.heightInput = node.find("input[type=input]")
          },
          onChange: value => {
            const width = Math.round(
              parseInt(value, 10) / (this.image?.rate || 1)
            )
            this.onInputChange(width, value)
          }
        },
        {
          key: "resize",
          type: "button",
          content: '<span class="data-icon data-icon-huanyuan"></span>',
          title: language.get("image", "toolbarReductionTitle"),
          onClick: () => {
            value = this.getValue()
            this.onInputChange(
              value?.size?.naturalWidth || 0,
              value?.size?.naturalHeight || 0
            )
          }
        }
      ]
      const typeItems = [
        {
          key: "block",
          type: "button",
          content: '<span class="data-icon data-icon-block-image"></span>',
          title: language.get("image", "displayBlockTitle"),
          onClick: () => {
            this.type = CardType.BLOCK
          }
        },
        {
          key: "inline",
          type: "button",
          content: '<span class="data-icon data-icon-inline-image"></span>',
          title: language.get("image", "displayInlineTitle"),
          onClick: () => {
            this.type = CardType.INLINE
          }
        }
      ]
      const imagePlugin = editor.plugin.findPlugin("image")
      return items.concat([
        ...(imagePlugin?.options?.enableResizer === false ? [] : resizerItems),
        ...(imagePlugin?.options?.enableTypeSwitch === false ? [] : typeItems)
      ])
    }
    const options = editor.plugin.findPlugin("image")?.options
    if (options?.cardToolbars) {
      return options.cardToolbars(getItems(), this.editor)
    }
    return getItems()
  }

  onActivate(activated) {
    super.onActivate(activated)
    if (activated && !this.selectedByOther) this.image?.focus()
    else this.image?.blur()
  }

  onSelectByOther(selected, value) {
    this.image?.root?.css("outline", selected ? "2px solid " + value.color : "")
    const className = "card-selected-other"
    if (selected) this.root.addClass(className)
    else this.root.removeClass(className)
    return this.image?.root
  }

  writeHistoryOnValueChange() {
    if (this.loading) return false
  }

  render(loadingBg) {
    const value = this.getValue()
    if (!value) return
    const editor = this.editor
    if (!this.image || this.image.root.length === 0) {
      const imagePlugin = editor.plugin.findPlugin("image")
      this.image = new Image(editor, {
        root: this.root,
        container: this.getCenter(),
        status: value.status || "done",
        src: value.src,
        size: value.size,
        alt: value.alt,
        link: value.link,
        display: this.type,
        percent: value.percent,
        message: value.message,
        enableResizer: imagePlugin?.options?.enableResizer,
        onBeforeRender: (status, src) => {
          const imagePlugin = editor.plugin.findPlugin("image")
          if (imagePlugin) {
            const {onBeforeRender} = imagePlugin.options || {}
            if (onBeforeRender) return onBeforeRender(status, src, this.editor)
          }
          return src
        },
        onChange: (size, loaded) => {
          if (isEngine(editor) && !editor.readonly && size) this.setSize(size, loaded)
        },
        onError: () => {
          this.isLocalError = true
          this.didUpdate()
        },
        onLoad: () => {
          if (
            this.image?.size &&
            (!value.size?.naturalHeight || !value.size?.naturalWidth)
          ) {
            const {naturalHeight, naturalWidth} = this.image.size
            this.setSize(
              {
                ...value.size,
                naturalHeight,
                naturalWidth
              },
              true
            )
          }
          if (this.activated) this.image?.focus()
        },
        maxHeight: imagePlugin?.options?.maxHeight
      })
    } else {
      this.image.changeUrl(value.src)
      this.image.status = value.status || "done"
      this.image.message = value.message
      this.image.size.width = value.size?.width || 0
      this.image.size.height = value.size?.height || 0
      if (value.percent) this.image.setProgressPercent(value.percent)
      this.image.resizer?.destroy()
    }
    this.image.render(loadingBg)
  }

  didUpdate() {
    super.didUpdate()
    this.toolbarModel?.getContainer()?.remove()
    this.toolbarModel?.create()
    this.toolbarModel?.setDefaultAlign("top")
  }

  didRender() {
    const value = this.getValue()
    if (value.status === "done") super.didRender()
    this.toolbarModel?.setDefaultAlign("top")
  }
}

export default ImageComponent
