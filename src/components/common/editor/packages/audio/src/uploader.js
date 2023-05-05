import {
  isAndroid,
  isEngine,
  Plugin,
  READY_CARD_KEY,
  getExtensionName,
  CARD_VALUE_KEY,
  decodeCardValue,
  encodeCardValue
} from "@aomao/engine"

export default class extends Plugin {
  cardComponents = {}

  static get pluginName() {
    return "audio-uploader"
  }

  extensionNames = ["mp3"]

  init() {
    if (isEngine(this.editor)) {
      this.editor.on("drop:files", files => this.dropFiles(files))
      this.editor.on("paste:event", ({ files }) => this.pasteFiles(files))
      this.editor.on("paste:each", node => this.pasteEach(node))
    }
    let { accept } = this.options
    const names = []
    if (typeof accept === "string") accept = accept.split(",")

    ;(accept || []).forEach(name => {
      name = name.trim()
      const newName = name.split(".").pop()
      if (newName) names.push(newName)
    })
    if (names.length > 0) this.extensionNames = names
  }

  isAudio(file) {
    const name = getExtensionName(file)
    return this.extensionNames.indexOf(name) >= 0
  }

  async execute(files, ...args) {
    if (typeof files === "string") {
      switch (files) {
        case "query":
          return this.query(args[0], args[1], args[2])
      }
      return
    }
    const { request, card, language } = this.editor
    const {
      action,
      data,
      type,
      contentType,
      multiple,
      crossOrigin,
      headers,
      name
    } = this.options
    const { parse } = this.options
    const limitSize = this.options.limitSize || 5 * 1024 * 1024
    if (!Array.isArray(files)) {
      files = await request.getFiles({
        event: files,
        accept: isAndroid
          ? "audio/*"
          : this.extensionNames.length > 0
            ? "." + this.extensionNames.join(",.")
            : "",
        multiple
      })
    }
    if (files.length === 0) return
    request.upload(
      {
        url: action,
        data,
        type,
        contentType,
        crossOrigin,
        headers,
        onBefore: file => {
          if (file.size > limitSize) {
            this.editor.messageError(
              "upload-limit",
              language
                .get("audio", "uploadLimitError")
                .toString()
                .replace("$size", (limitSize / 1024 / 1024).toFixed(0) + "M")
            )
            return false
          }
          return true
        },
        onReady: fileInfo => {
          if (!isEngine(this.editor) || this.cardComponents[fileInfo.uid])
            return
          const component = card.insert("audio", {
            status: "uploading",
            name: fileInfo.name,
            size: fileInfo.size
          })
          this.cardComponents[fileInfo.uid] = component
        },
        onUploading: (file, { percent }) => {
          const component = this.cardComponents[file.uid || ""]
          if (!component) return
          component.setProgressPercent(percent)
        },
        onSuccess: (response, file) => {
          const component = this.cardComponents[file.uid || ""]
          if (!component) return
          const id = response.id || (response.data && response.data.id)
          const url = response.url || (response.data && response.data.url)
          const cover = response.cover || (response.data && response.data.cover)
          const download =
            response.download || (response.data && response.data.download)
          let status =
            response.status || (response.data && response.data.status)
          status = status === "transcoding" ? "transcoding" : "done"
          let result = {
            result: true,
            data: {
              audio_id: id,
              url,
              cover,
              download,
              status
            }
          }
          if (parse) {
            const customizeResult = parse(response)
            if (customizeResult.result) {
              let data = result.data
              if (typeof customizeResult.data === "string")
                result.data = {
                  ...data,
                  url: customizeResult.data
                }
              else {
                data.url = customizeResult.data.url
                if (customizeResult.data.status !== undefined)
                  data = {
                    ...data,
                    status: customizeResult.data.status
                  }
                if (customizeResult.data.id !== undefined)
                  data = {
                    ...data,
                    audio_id: customizeResult.data.id
                  }
                result.data = { ...data }
              }
            } else {
              result = {
                result: false,
                data: customizeResult.data.toString()
              }
            }
          } else if (!url) {
            result = { result: false, data: response.data }
          }
          //失败
          if (!result.result) {
            card.update(component.id, {
              status: "error",
              message:
                result.data || this.editor.language.get("audio", "uploadError")
            })
          }
          //成功
          else {
            this.editor.card.update(
              component.id,
              typeof result.data === "string"
                ? { url: result.data }
                : {
                  ...result.data
                }
            )
          }
          delete this.cardComponents[file.uid || ""]
        },
        onError: (error, file) => {
          const component = this.cardComponents[file.uid || ""]
          if (!component) return
          card.update(component.id, {
            status: "error",
            message:
              error.message || this.editor.language.get("audio", "uploadError")
          })
          delete this.cardComponents[file.uid || ""]
        }
      },
      files,
      name
    )
    return
  }

  query(
    audio_id,
    success,
    failed = () => {
      return
    }
  ) {
    const { request } = this.editor

    const { query, parse } = this.options
    if (!query || !audio_id) return success()

    const { action, type, contentType, data } = query
    request.ajax({
      url: action,
      contentType: contentType || "",
      type: type === undefined ? "json" : type,
      data:
        typeof data === "function"
          ? async () => {
            const newData = data()
            return {
              ...newData,
              id: audio_id
            }
          }
          : {
            ...data,
            id: audio_id
          },
      success: response => {
        const { result, data } = response
        if (!result) {
          failed(data)
        } else {
          const result = parse ? parse(response) : response
          if (result.result === false) {
            failed(
              result.data || this.editor.language.get("audio", "loadError")
            )
          } else
            success({
              ...result.data,
              status:
                result.data.status !== "transcoding" ? "done" : "transcoding"
            })
        }
      },
      error: error => {
        failed(error.message || this.editor.language.get("audio", "loadError"))
      },
      method: "GET"
    })
  }

  dropFiles(files) {
    if (!isEngine(this.editor)) return
    files = files.filter(file => this.isAudio(file))
    if (files.length === 0) return
    this.editor.command.execute("audio-uploader", files)
    return false
  }

  pasteFiles(files) {
    if (!isEngine(this.editor)) return
    files = files.filter(file => this.isAudio(file))
    if (files.length === 0) return
    this.editor.command.execute(
      "audio-uploader",
      files.filter(file => this.isAudio(file)),
      files
    )
    return false
  }

  pasteEach(node) {
    //是卡片，并且还没渲染
    if (node.isCard() && node.attributes(READY_CARD_KEY)) {
      if (node.attributes(READY_CARD_KEY) !== "audio") return
      const value = decodeCardValue(node.attributes(CARD_VALUE_KEY))
      if (!value || !value.url) {
        node.remove()
        return
      }
      if (value.status === "uploading") {
        //如果是上传状态，设置为正常状态
        value.percent = 0
        node.attributes(
          CARD_VALUE_KEY,
          encodeCardValue({ ...value, status: "done" })
        )
      }
      return
    }
  }
}
