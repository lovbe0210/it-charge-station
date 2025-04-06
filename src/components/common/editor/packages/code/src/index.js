import {InlinePlugin, isEngine, $} from '@aomao/engine';
import './index.css';

const PARSE_HTML = 'parse:html';
const MARKDOWN_IT = 'markdown-it';
export default class extends InlinePlugin {
  static get pluginName() {
    return 'code';
  }


  init() {
    super.init();
    const editor = this.editor;
    editor.on(PARSE_HTML, this.parseHtml);
    if (isEngine(editor)) {
      editor.on(MARKDOWN_IT, this.markdownIt);
      // editor.on("beforeSetValue", "code", value => {
      //   console.log(value);
      // })
      /*editor.on("realtimeChange", () => {
        let range = editor.change.range.get();
        let collapsed = range?.collapsed;
        let startNode = collapsed ? range.startNode : range.endNode;
        let node = startNode?.get(0);
        let parentNode = node?.parentNode;
        if (this.tagName.toUpperCase() !== parentNode?.nodeName) {
          return;
        }
        let nodeValue = node.nodeValue;
        if (nodeValue) {
          // const div = document.createElement('div');
          // div.textContent = nodeValue;
          // node.nodeValue = div.innerHTML;
          // console.log(div.innerHTML)
        }
      })*/
    }
  }

  execute(...args) {
    debugger
    const editor = this.editor;
    if (!isEngine(editor)) return;
    const inlineNode = $(`<${this.tagName} />`);
    this.setStyle(inlineNode, ...args);
    this.setAttributes(inlineNode, ...args);
    const { inline } = editor;
    const trigger = this.isTrigger
      ? this.isTrigger(...args)
      : !this.queryState();
    if (trigger) {
      inline.wrap(inlineNode);
    } else {
      inline.unwrap();
    }
  }

  tagName = 'code';

  markdownIt = (mardown) => {
    if (this.options.markdown !== false) mardown.enable('backticks');
  };

  hotkey() {
    return this.options.hotkey || 'mod+e';
  }

  parseHtml = (root) => {
    debugger
    root.find(this.tagName).css({
      'font-family': 'monospace',
      'font-size': 'inherit',
      'background-color': 'rgba(0,0,0,.06)',
      padding: '0 2px',
      'border-radius': '6px',
      'line-height': 'inherit',
      'overflow-wrap': 'break-word',
      'text-indent': '0'
    });
  };

  destroy() {
    const editor = this.editor;
    editor.off(PARSE_HTML, this.parseHtml);
    editor.off(MARKDOWN_IT, this.markdownIt);
  }
}
