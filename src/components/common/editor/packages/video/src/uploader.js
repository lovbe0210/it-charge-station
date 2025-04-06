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

export default class extends Plugin {
  cardComponents = {};

  static get pluginName() {
    return 'video-uploader';
  }

  extensionNames = {mp4: 'video/mp4'};

  init() {
    const editor = this.editor;
    if (isEngine(editor)) {
      editor.on(DROP_FILES, this.dropFiles);
      editor.on(PASTE_EVENT, this.pasteFiles);
      editor.on(PASTE_EACH, this.pasteEach);
    }
    let {accept} = this.options.file || {};
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

  isVideo(file) {
    const name = getExtensionName(file);
    const names = Array.isArray(this.extensionNames)
      ? this.extensionNames
      : Object.keys(this.extensionNames);
    return names.indexOf('*') >= 0 || names.indexOf(name) >= 0;
  }

  async execute(files, ...args) {
    if (typeof files === 'string') {
      switch (files) {
        case 'query':
          return this.query(args[0], args[1], args[2]);
      }
      return;
    }
    const editor = this.editor;
    const {request, card, language} = editor;
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
    } = this.options;
    const {parse} = this.options;
    const limitSize = this.options.limitSize || 5 * 1024 * 1024;
    if (!Array.isArray(files)) {
      const accepts = Array.isArray(this.extensionNames)
        ? '.' + this.extensionNames.join(',.')
        : Object.values(this.extensionNames).join(',');
      files = await request.getFiles({
        event: files,
        accept: isAndroid
          ? 'video/*'
          : accepts.length > 0
            ? accepts
            : '',
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
                .get('video', 'uploadLimitError')
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
          const component = card.insert('video', {
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
          const id = response.id || (response.data && response.data.id);
          let url = response.url || (response.data && response.data.url);
          const cover = response.cover || (response.data && response.data.cover);
          const download = response.download ||
            (response.data && response.data.download);
          const width = response.width || (response.data && response.data.width);
          const height = response.height || (response.data && response.data.height);
          let status = response.status || (response.data && response.data.status);
          status = status === 'transcoding' ? 'transcoding' : 'done';
          let result = {
            result: true,
            data: {
              videoId: id,
              url,
              cover,
              download,
              status,
              width,
              height
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
                if (customizeResult.data.id !== undefined) {
                  data = {
                    ...data,
                    videoId: customizeResult.data.id
                  };
                }
                if (customizeResult.data.cover !== undefined) {
                  data = {
                    ...data,
                    cover: customizeResult.data.cover
                  };
                }
                if (customizeResult.data.width !== undefined) {
                  data = {
                    ...data,
                    width: customizeResult.data.width
                  };
                }
                if (customizeResult.data.height !== undefined) {
                  data = {
                    ...data,
                    height: customizeResult.data.height
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
          //失败
          if (!result.result) {
            card.update(component.id, {
              status: 'error',
              message: typeof result.data === 'string' ? result.data : language.get('video', 'uploadError')
            });
          } else {
            //成功
            editor.card.update(
              component.id,
              typeof result.data === 'string' ? {url: result.data} : {
                ...result.data,
                naturalWidth: result.data.width,
                naturalHeight: result.data.height
              }
            );
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
              language.get('video', 'uploadError')
          });
          delete this.cardComponents[file.uid || ''];
        }
      },
      files,
      name
    );

  }

  query(videoId, success, failed) {
    const {request, language} = this.editor;

    const {query, parse} = this.options;
    if (!query || !videoId) return success();

    const {action, type, contentType, data, headers} = query;
    request.ajax({
      url: action,
      contentType: contentType || '',
      type: type === undefined ? 'json' : type,
      headers,
      data:
        typeof data === 'function'
          ? async () => {
            const newData = await data();
            return {...newData, id: videoId};
          }
          : {
            ...data,
            id: videoId
          },
      success: (response) => {
        const {result, data} = response;
        if (!result) {
          failed(data);
        } else {
          const result = parse ? parse(response) : response;
          if (result.result === false) {
            failed(
              result.data || language.get('video', 'loadError')
            );
          } else {
            success({
              ...result.data,
              status:
                result.data.status !== 'transcoding'
                  ? 'done'
                  : 'transcoding'
            });
          }
        }
      },
      error: (error) => {
        failed(error.message || language.get('video', 'loadError'));
      },
      method: 'GET'
    });
  }

  dropFiles = (files) => {
    const editor = this.editor;
    if (!isEngine(editor)) return;
    files = files.filter((file) => this.isVideo(file));
    if (files.length === 0) return;
    editor.command.execute('video-uploader', files);
    return false;
  };

  pasteFiles = ({files}) => {
    const editor = this.editor;
    if (!isEngine(editor)) return;
    files = files.filter((file) => this.isVideo(file));
    if (files.length === 0) return;
    editor.command.execute(
      'video-uploader',
      files.filter((file) => this.isVideo(file)),
      files
    );
    return false;
  };

  pasteEach = (node) => {
    //是卡片，并且还没渲染
    if (node.isCard() && node.attributes(READY_CARD_KEY)) {
      if (node.attributes(READY_CARD_KEY) !== 'video') return;
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
    editor.off(DROP_FILES, this.dropFiles);
    editor.off(PASTE_EVENT, this.pasteFiles);
    editor.off(PASTE_EACH, this.pasteEach);
  }
}
