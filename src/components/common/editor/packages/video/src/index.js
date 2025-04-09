import {
  $,
  CARD_KEY,
  CARD_VALUE_KEY,
  decodeCardValue,
  encodeCardValue,
  isEngine,
  Plugin,
  READY_CARD_KEY,
  sanitizeUrl
} from '@aomao/engine';
import VideoComponent from './component';
import VideoUploader from './uploader';
import locales from './locales';

const PARSE_HTML = 'parse:html';
const PASTE_EACH = 'paste:each';
const PASTE_SCHEMA = 'paste:schema';

export default class VideoPlugin extends Plugin {
  static get pluginName() {
    return 'video';
  }

  init() {
    const editor = this.editor;
    editor.language.add(locales);
    editor.on(PARSE_HTML, this.parseHtml);
    editor.on(PASTE_EACH, this.pasteHtml);
    editor.on(PASTE_SCHEMA, this.pasteSchema);
  }

  execute(status, url, name, videoId, cover, size, download, naturalWidth, naturalHeight, width, height) {
    const value = {
      status,
      videoId,
      cover,
      url,
      name: name || url,
      size,
      download,
      width,
      height,
      naturalWidth,
      naturalHeight
    };
    if (status === 'error') {
      value.url = '';
      value.message = url;
    }
    this.editor.card.insert('video', value);
  }

  async waiting(callback) {
    const {card} = this.editor;
    // 检测单个组件
    const check = (component) => {
      return (
        component.root.inEditor() &&
        component.name === VideoComponent.cardName &&
        (component).getValue()?.status === 'uploading');
    };
    // 找到不合格的组件
    const find = () => {
      return card.components.find(check);
    };
    const waitCheck = (component) => {
      let time = 60000;
      return new Promise((resolve, reject) => {
        if (callback) {
          const result = callback(
              (this.constructor).pluginName,
              component
            )
          ;
          if (result === false) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject({
              name: (this.constructo).pluginName,
              card: component
            });
          } else if (typeof result === 'number') {
            time = result;
          }
        }
        const beginTime = new Date().getTime();
        const now = new Date().getTime();
        const timeout = () => {
          if (now - beginTime >= time) return resolve();
          setTimeout(() => {
            if (check(component)) timeout();
            else resolve();
          }, 10);
        };
        timeout();
      });
    };
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const component = find();
      const wait = (component) => {
        waitCheck(component)
          .then(() => {
            const next = find();
            if (next) wait(next);
            else resolve();
          })
          .catch(reject);
      };
      if (component) wait(component);
      else resolve();
    });
  }

  pasteSchema = (schema) => {
    schema.add({
      type: 'block',
      name: 'div',
      attributes: {
        'data-value': '*',
        'data-type': {
          required: true,
          value: VideoComponent.cardName
        }
      }
    });
  };

  pasteHtml = (node) => {
    const editor = this.editor;
    if (!isEngine(editor)) return;
    if (node.isElement()) {
      const type = node.attributes('data-type');
      if (type === VideoComponent.cardName) {
        const value = node.attributes('data-value');
        const cardValue = decodeCardValue(value);
        if (!cardValue.url) return;
        editor.card.replaceNode(
          node,
          VideoComponent.cardName,
          cardValue
        );
        node.remove();
        return false;
      }
    }
    return true;
  };

  parseHtml = (root, callback) => {
    const results = [];
    root.find(
      `[${CARD_KEY}="${VideoComponent.cardName}"],[${READY_CARD_KEY}="${VideoComponent.cardName}"]`
    ).each((cardNode) => {
      const node = $(cardNode);
      const card = this.editor.card.find(node);
      const value =
        card?.getValue() ||
        decodeCardValue(node.attributes(CARD_VALUE_KEY));
      if (value?.url && value.status === 'done') {
        const {onBeforeRender} = this.options;
        const {cover, url} = value;
        const html = `<div data-type="${
          VideoComponent.cardName
        }"  data-value="${encodeCardValue(
          value
        )}"><video controls src="${sanitizeUrl(
          onBeforeRender
            ? onBeforeRender('query', url, this.editor)
            : url
        )}" poster="${
          !cover
            ? 'none'
            : sanitizeUrl(
              onBeforeRender
                ? onBeforeRender(
                  'cover',
                  cover,
                  this.editor
                )
                : cover
            )
        }" webkit-playsinline="webkit-playsinline" playsinline="playsinline" style="outline:none;" /></div>`;
        node.empty();
        let newNode = $(html);
        if (callback) {
          newNode = callback(newNode, value);
        }
        node.replaceWith(newNode);
        results.push(newNode);
      } else node.remove();
    });
    return results;
  };

  destroy() {
    const editor = this.editor;
    editor.off(PARSE_HTML, this.parseHtml);
    editor.off(PASTE_EACH, this.pasteHtml);
    editor.off(PASTE_SCHEMA, this.pasteSchema);
  }
}

export {VideoComponent, VideoUploader};
