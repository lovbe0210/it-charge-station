import {
  CARD_VALUE_KEY,
  decodeCardValue,
  encodeCardValue,
  getExtensionName,
  isAndroid,
  isEngine,
  Plugin,
  READY_CARD_KEY
} from '@aomao/engine';

const DROP_FILES = 'drop:files';
const PASTE_EVENT = 'paste:event';
const PASTE_EACH = 'paste:each';

export default class FileUploader extends Plugin {

  static get pluginName() {
    return 'file-uploader';
  }

  cardComponents = {};

  extensionNames = {'*': '*'};

  init() {
    const editor = this.editor;
    if (isEngine(editor)) {
      editor.on(DROP_FILES, this.dropFiles);
      editor.on(PASTE_EVENT, this.pasteFiles);
      editor.on(PASTE_EACH, this.pasteEach);
    }
    let accept = this.options?.accept || this.options?.file?.accept;
    if (typeof accept === 'string') accept = accept.split(',');
    if (Array.isArray(accept)) {
      const names = [];
      (accept || []).forEach((name) => {
        name = name.trim();
        const newName = name.split('.').pop();
        if (newName) names.push(newName);
      });
      if (names.length > 0) this.extensionNames = names;
    } else if (typeof accept === 'object') {
      this.extensionNames = accept;
    }
  }

  isFile(file) {
    const name = getExtensionName(file) ?? '';
    const names = Array.isArray(this.extensionNames)
      ? this.extensionNames
      : Object.keys(this.extensionNames);
    return names.indexOf('*') >= 0 || names.indexOf(name) >= 0;
  }

  async execute(files) {
    const editor = this.editor;
    if (!isEngine(editor)) return;
    const {request, card, language} = editor;
    const {
      action,
      type,
      contentType,
      multiple,
      crossOrigin,
      withCredentials,
      headers,
      name
    } = this.options;
    let data = this.options.data;
    if (typeof data === 'function') {
      data = await data();
    }
    const {parse} = this.options;
    const limitSize = this.options.limitSize || 5 * 1024 * 1024;
    if (!Array.isArray(files)) {
      const accepts = Array.isArray(this.extensionNames)
        ? '.' + this.extensionNames.join(',.')
        : Object.values(this.extensionNames).join(',');
      files = await request.getFiles({
        event: files,
        accept: isAndroid ? '*' : accepts.length > 0 ? accepts : '',
        multiple
      });
    }
    if (files.length === 0) return;
    request.upload(
      {
        url: action,
        data,
        type,
        contentType,
        crossOrigin,
        withCredentials,
        headers,
        onBefore: (file) => {
          if (file.size > limitSize) {
            editor.messageError(
              'upload-limit',
              language
                .get('file', 'uploadLimitError')
                .toString()
                .replace(
                  '$size',
                  (limitSize / 1024 / 1024).toFixed(0) + 'M'
                )
            );
            return false;
          }
          return true;
        },
        onReady: (fileInfo) => {
          if (
            !isEngine(editor) ||
            !!this.cardComponents[fileInfo.uid]
          ) {
            return;
          }
          const component = card.insert('file', {
            status: 'uploading',
            name: fileInfo.name,
            size: fileInfo.size
          });
          this.cardComponents[fileInfo.uid] = component;
        },
        onUploading: (file, {percent}) => {
          const component = this.cardComponents[file.uid || ''];
          if (!component) return;
          component.setProgressPercent(percent);
        },
        onSuccess: (response, file) => {
          const component = this.cardComponents[file.uid || ''];
          if (!component) return;
          const url =
            response.url || (response.data && response.data.url);
          const preview =
            response.preview ||
            (response.data && response.data.preview);
          const download =
            response.download ||
            (response.data && response.data.download);
          let result = {
            result: true,
            data: {
              status: 'done',
              url,
              preview,
              download
            }
          };
          if (parse) {
            const customizeResult = parse(response);
            if (customizeResult.result) {
              let data = result.data;
              if (typeof customizeResult.data === 'string') {
                result.data = {
                  ...data,
                  url: customizeResult.data
                };
              } else {
                data.url = customizeResult.data.url;
                if (customizeResult.data.status !== undefined) {
                  data = {
                    ...data,
                    status: customizeResult.data.status
                  };
                }
                if (customizeResult.data.preview !== undefined) {
                  data = {
                    ...data,
                    preview: customizeResult.data.preview
                  };
                }
                if (customizeResult.data.download !== undefined) {
                  data = {
                    ...data,
                    download: customizeResult.data.download
                  };
                }
                result.data = {...data};
              }
            } else {
              result = {
                result: false,
                data: customizeResult.data.toString()
              };
            }
          } else if (!url) {
            result = {result: false, data: response.data};
          }
          if (!result.result) {
            card.update(component.id, {
              status: 'error',
              message:
                typeof result.data === 'string'
                  ? result.data
                  : language.get(
                    'file',
                    'uploadError'
                  )
            });
          } else {
            const value =
              typeof result.data === 'string'
                ? {url: result.data}
                : {
                  ...result.data
                };
            editor.card.update(component.id, value);
          }
          delete this.cardComponents[file.uid || ''];
        },
        onError: (error, file) => {
          const component = this.cardComponents[file.uid || ''];
          if (!component) return;
          card.update(component.id, {
            status: 'error',
            message:
              error.message ||
              language.get('file', 'uploadError')
          });
          delete this.cardComponents[file.uid || ''];
        }
      },
      files,
      name
    );

  }

  dropFiles = (files) => {
    const editor = this.editor;
    if (!isEngine(editor)) return;
    files = files.filter((file) => this.isFile(file));
    if (files.length === 0) return;
    editor.command.execute('file-uploader', files);
    return false;
  };

  pasteFiles = ({files}) => {
    const editor = this.editor;
    if (!isEngine(editor)) return;
    files = files.filter((file) => this.isFile(file));
    if (files.length === 0) return;
    editor.command.execute(
      'file-uploader',
      files.filter((file) => this.isFile(file)),
      files
    );
    return false;
  };

  pasteEach = (node) => {
    //是卡片，并且还没渲染
    if (node.isCard() && node.attributes(READY_CARD_KEY)) {
      if (node.attributes(READY_CARD_KEY) !== 'file') return;
      const value = decodeCardValue(node.attributes(CARD_VALUE_KEY));
      if (!value || !value.url) {
        node.remove();
        return;
      }
      if (value.status === 'uploading') {
        //如果是上传状态，设置为正常状态
        value.percent = 0;
        node.attributes(
          CARD_VALUE_KEY,
          encodeCardValue({...value, status: 'done'})
        );
      }
    }
  };

  destroy() {
    const editor = this.editor;
    if (isEngine(editor)) {
      editor.off(DROP_FILES, this.dropFiles);
      editor.off(PASTE_EVENT, this.pasteFiles);
      editor.off(PASTE_EACH, this.pasteEach);
    }
  }
}
