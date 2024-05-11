import {
  isAndroid,
  isEngine,
  Plugin,
  random,
  READY_CARD_KEY,
  getExtensionName,
  CARD_VALUE_KEY,
  decodeCardValue,
  encodeCardValue,
  removeUnit,
  CardType
} from "@aomao/engine"

const DROP_FILES = "drop:files"
const PASTE_EVENT = "paste:event"
const PASTE_SCHEMA = "paste:schema"
const PASTE_EACH = "paste:each"
const PASTE_AFTER = "paste:after"
const MARKDOWN_IT = "markdown-it"

export default class extends Plugin {
  cardComponents = {}
  loadCounts = {}

  static get pluginName() {
    return "image-uploader"
  }

  extensionNames = {
    svg: "image/svg+xml",
    png: "image/png",
    bmp: "image/bmp",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    tif: "image/tiff",
    tiff: "image/tiff",
    emf: "image/emf",
    webp: "image/webp"
  }

  init() {
    const editor = this.editor
    if (isEngine(this.editor)) {
      editor.on(DROP_FILES, this.dropFiles)
      editor.on(PASTE_EVENT, this.pasteFiles)
      editor.on(PASTE_SCHEMA, this.pasteSchema)
      editor.on(PASTE_EACH, this.pasteEach)
      editor.on(PASTE_AFTER, this.pasteAfter)
      editor.on(MARKDOWN_IT, this.markdownIt)
    }
    let { accept } = this.options.file || {}
    if (typeof accept === "string") accept = accept.split(",")
    if (Array.isArray(accept)) {
      const names = []
      ;(accept || []).forEach(name => {
        name = name.trim()
        const newName = name.split(".").pop()
        if (newName) names.push(newName)
      })
      if (names.length > 0) this.extensionNames = names
    } else if (typeof accept === "object") {
      this.extensionNames = accept
    }
  }

  isImage(file) {
    const name = getExtensionName(file)
    const names = Array.isArray(this.extensionNames)
      ? this.extensionNames
      : Object.keys(this.extensionNames)
    return names.indexOf("*") >= 0 || names.indexOf(name) >= 0
  }

  dataURIToFile(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString

    if (dataURI.split(",")[0].indexOf("base64") >= 0) {
      byteString = atob(dataURI.split(",")[1])
    } else {
      byteString = unescape(dataURI.split(",")[1])
    }
    // separate out the mime component
    const mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0] // write the bytes of the string to a typed array

    const ia = new Uint8Array(byteString.length)

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], {
      type: mimeString
    })
  }

  getUrl(value) {
    const imagePlugin = this.editor.plugin.components.image
    if (imagePlugin) {
      const { onBeforeRender } = imagePlugin.options || {}
      if (onBeforeRender) return onBeforeRender(value.status, value.src, this.editor)
    }
    return value.src
  }

  loadImage(id, value) {
    console.log("loadImage...")
    debugger
    if (!this.loadCounts[id]) this.loadCounts[id] = 1
    const image = new Image()
    const editor = this.editor
    image.src = this.getUrl(value)
    image.onload = () => {
      delete this.loadCounts[id]
      editor.card.update(id, value)
    }
    image.onerror = () => {
      if (this.loadCounts[id] <= 3) {
        setTimeout(() => {
          this.loadCounts[id]++
          this.loadImage(id, value)
        }, 500)
      } else {
        delete this.loadCounts[id]
        value.status = "error";
        value.message = editor.language.get("image", "loadError");
        editor.card.update(id, value)
      }
    }
  }

  async execute(files) {
    const editor = this.editor
    if (!isEngine(editor)) return
    const { request, card, language } = editor
    const {
      action,
      data,
      type,
      contentType,
      multiple,
      crossOrigin,
      withCredentials,
      headers,
      name
    } = this.options.file
    const { parse } = this.options
    const limitSize = this.options.file.limitSize || 5 * 1024 * 1024

    if (!Array.isArray(files) && typeof files !== "string") {
      const accepts = Array.isArray(this.extensionNames)
        ? "." + this.extensionNames.join(",.")
        : Object.values(this.extensionNames).join(",")
      files = await request.getFiles({
        event: files,
        accept: isAndroid ? "image/*" : accepts.length > 0 ? accepts : "",
        multiple
      })
    } else if (typeof files === "string") {
      this.insertRemote(files)
      return
    }
    if (files.length === 0) return
    request.upload(
      {
        url: action,
        crossOrigin,
        withCredentials,
        headers,
        data,
        type,
        contentType,
        onBefore: file => {
          if (file.size > limitSize) {
            editor.messageError(
              "upload-limit",
              language
                .get("image", "uploadLimitError")
                .toString()
                .replace("$size", (limitSize / 1024 / 1024).toFixed(0) + "M")
            )
            return false
          }
          return true
        },
        onReady: fileInfo => {
          if (!isEngine(editor) || !!this.cardComponents[fileInfo.uid]) return
          const src = fileInfo.src || ""
          const base64String =
            typeof src !== "string"
              ? window.btoa(String.fromCharCode(...new Uint8Array(src)))
              : src
          const insertCard = value => {
            const imagePlugin = editor.plugin.findPlugin("image")
            const component = card.insert(
              "image",
              {
                ...value,
                status: "uploading",
                type: value.type || imagePlugin?.options?.defaultType
                //fileInfo.src, 再协作中，如果大图片使用base64加载图片预览会造成很大资源浪费
              },
              base64String
            )
            this.cardComponents[fileInfo.uid] = component
          }
          return new Promise(resolve => {
            const image = new Image()
            image.src = base64String
            const imagePlugin = editor.plugin.findPlugin("image")

            image.onload = () => {
              const { naturalWidth, naturalHeight, height, width } = image

              let imageWidth = width
              let imageHeight = height
              const maxHeight = imagePlugin?.options?.maxHeight

              if (
                maxHeight &&
                naturalHeight > naturalWidth &&
                height > maxHeight
              ) {
                imageHeight = maxHeight
                imageWidth = naturalWidth * (maxHeight / naturalHeight)
              }

              insertCard({
                src: "",
                size: {
                  width: imageWidth,
                  height: imageHeight,
                  naturalHeight: image.naturalHeight,
                  naturalWidth: image.naturalWidth
                }
              })
              resolve()
            }
            image.onerror = () => {
              insertCard({ src: "", status: "error" })
              resolve()
            }
          })
        },
        onUploading: (file, { percent }) => {
          const component = this.cardComponents[file.uid || ""]
          if (!component) return
          component.setProgressPercent(percent)
        },
        onSuccess: (response, file) => {
          const component = this.cardComponents[file.uid || ""]
          if (!component) return
          let src =
            response.url ||
            (response.data && response.data.url) ||
            response.src ||
            (response.data && response.data.src)
          const result = parse
            ? parse(response)
            : src
              ? { result: true, data: src }
              : { result: false }
          if (!result.result) {
            card.update(component.id, {
              status: "error",
              message: result.data || language.get("image", "uploadError")
            })
          } else {
            src = result.data
          }
          const value = {
            status: "done"
          }
          if (src) {
            value.src = src
            this.loadImage(component.id, value)
          }
          delete this.cardComponents[file.uid || ""]
        },
        onError: (error, file) => {
          const component = this.cardComponents[file.uid || ""]
          if (!component) return
          card.update(component.id, {
            status: "error",
            message: error.message || language.get("image", "uploadError")
          })
          delete this.cardComponents[file.uid || ""]
        }
      },
      files,
      name
    )

  }

  dropFiles = files => {
    const editor = this.editor
    if (!isEngine(editor)) return
    files = files.filter(file => this.isImage(file))
    if (files.length === 0) return
    editor.command.execute("image-uploader", files)
    return false
  }

  pasteSchema = schema => {
    schema.add({
      type: "inline",
      name: "img",
      isVoid: true,
      attributes: {
        src: {
          required: true,
          value: "@url"
        },
        width: "@number",
        height: "@number",
        style: {
          "max-width": "@length",
          "max-height": "@length",
          width: "@length",
          height: "@length"
        },
        alt: "*",
        title: "*",
        "data-type": "*",
        "data-size": "@number",
        "data-width": "@number",
        "data-height": "@number"
      }
    })
  }

  pasteFiles = ({ files }) => {
    console.log("pasteFiles...")
    const editor = this.editor
    if (!isEngine(editor)) return
    files = files.filter(file => this.isImage(file))
    if (files.length === 0) return
    editor.command.execute("image-uploader", files)
    return false
  }

  pasteEach = node => {
    const editor = this.editor
    const { isRemote } = this.options
    //是卡片，并且还没渲染
    if (node.isCard() && node.attributes(READY_CARD_KEY)) {
      if (node.attributes(READY_CARD_KEY) !== "image") return
      const value = decodeCardValue(node.attributes(CARD_VALUE_KEY))
      if (!value || !value.src) {
        node.remove()
        return
      }
      //第三方图片，设置上传状态
      if (isRemote && isRemote(value.src)) {
        value.status = "uploading"
        value.percent = 0
        editor.card.replaceNode(node, "image", value)
      } else if (value.status === "uploading") {
        //如果是上传状态，设置为正常状态
        value.percent = 0
        node.attributes(
          CARD_VALUE_KEY,
          encodeCardValue({ ...value, status: "done" })
        )
      }
      return
    }
    //图片带链接
    /**
     if(node.name === "a" && node.find("img").length > 0){
            const img = node.find("img")
            const href = node.attributes("href")
            const target = node.attributes("target")
            const src = img.attributes("src") || img.attributes("data-src")
            const alt = img.attributes("alt")
            if(!src) {
                node.remove()
                return
            }
            this.editor.card.replaceNode(node,"image",{
                src,
                status:isRemote && isRemote(src) || /^data:image\//i.test(src) ? "uploading" : "done",
                alt,
                link:{
                    href,
                    target
                },
                percent:0
            })
        } */
    //图片
    if (node.name === "img") {
      const attributes = node.attributes()
      const src = attributes.src || attributes["data-src"]
      const alt = attributes.alt
      if (!src) {
        node.remove()
        return
      }
      const imagePlugin = editor.plugin.findPlugin("image")
      const attrWidth = attributes.width
      const attrHeight = attributes.height
      const width = attrWidth || node.css("width")
      const height = attrHeight || node.css("height")
      const dataTypeValue =
        attributes["data-type"] || imagePlugin?.options.defaultType
      let type = CardType.INLINE
      if (dataTypeValue === "block") {
        const parent = node.parent()
        // 移除转换为html的时候加载的额外p标签
        if (parent && parent.name === "p") {
          editor.node.unwrap(parent)
        }
        type = CardType.BLOCK
      }

      editor.card.replaceNode(node, "image", {
        type,
        src,
        status:
          (isRemote && isRemote(src)) || /^data:image\//i.test(src)
            ? "uploading"
            : "done",
        alt,
        percent: 0,
        size: {
          width: removeUnit(width),
          height: removeUnit(height)
        }
      })
      node.remove()
    }
  }

  async uploadAddress(src, component) {
    console.log("uploadAddress...")
    const editor = this.editor
    if (!isEngine(editor)) return
    const {
      action,
      type,
      contentType,
      crossOrigin,
      withCredentials,
      headers,
      name,
      data
    } = this.options.remote
    const { parse } = this.options
    const addressName = name || "url"
    editor.request.ajax({
      url: action,
      method: "POST",
      contentType: contentType || "application/json",
      type: type === undefined ? "json" : type,
      crossOrigin,
      withCredentials,
      headers,
      data:
        typeof data === "function"
          ? async () => {
            const newData = await data()
            return { ...newData, [addressName]: src }
          }
          : {
            ...data,
            [addressName]: src
          },
      success: response => {
        let src =
          response.url ||
          (response.data && response.data.url) ||
          response.src ||
          (response.data && response.data.src)

        const result = parse
          ? parse(response)
          : src
            ? { result: true, data: src }
            : { result: false }
        if (!result.result) {
          editor.card.update(component.id, {
            status: "error",
            message: result.data || editor.language.get("image", "uploadError")
          })
        } else {
          src = result.data
        }

        const value = {
          status: "done"
        }
        if (src) {
          value.src = src
          this.loadImage(component.id, value)
        }
      },
      error: error => {
        editor.card.update(component.id, {
          status: "error",
          message: error.message || editor.language.get("image", "uploadError")
        })
      }
    })
  }

  insertRemote(src, alt) {
    const editor = this.editor
    const imagePlugin = editor.plugin.findPlugin("image")
    const value = {
      src,
      alt,
      status: "uploading",
      type: imagePlugin?.options.defaultType || CardType.INLINE
    }
    const { isRemote } = this.options
    //上传第三方图片
    if (isRemote && isRemote(src)) {
      const component = editor.card.insert("image", value)
      this.uploadAddress(src, component)
      return
    }
    //当前图片
    value.status = "done"
    editor.card.insert("image", value)
  }

  pasteAfter = () => {
    console.log("pasteAfter...")
    const editor = this.editor
    editor.container.find("[data-card-key=image]").each((node, key) => {
      const component = editor.card.find(node)
      if (!component || !isEngine(editor)) return
      const value = component.getValue()
      //不是上传状态，或者当前卡片正在执行上传跳过
      if (
        value?.status !== "uploading" ||
        Object.keys(this.cardComponents).find(
          key => this.cardComponents[key].id === component.id
        )
      ) {
        return
      }

      const { src } = value
      // 转存 base64 图片
      if (/^data:image\//i.test(src)) {
        const fileBlob = this.dataURIToFile(src)
        const ext = getExtensionName(fileBlob)
        const name = ext ? "image.".concat(ext) : "image"
        const file = new File([fileBlob], name)
        file.uid = new Date().getTime() + "-" + random()
        editor.command.execute("image-uploader", [file])
        this.cardComponents[file.uid] = component
        return
      }
      const { isRemote } = this.options
      if (isRemote && isRemote(src)) {
        this.uploadAddress(src, component)
      }
    })
  }

  markdownIt = mardown => {
    if (this.options.markdown !== false) {
      mardown.enable("image")
      mardown.enable("reference")
    }
  }

  destroy() {
    const editor = this.editor
    if (isEngine(editor)) {
      editor.off(DROP_FILES, this.dropFiles)
      editor.off(PASTE_EVENT, this.pasteFiles)
      editor.off(PASTE_SCHEMA, this.pasteSchema)
      editor.off(PASTE_EACH, this.pasteEach)
      editor.off(PASTE_AFTER, this.pasteAfter)
      editor.off(MARKDOWN_IT, this.markdownIt)
    }
  }
}
