import {EDITABLE_SELECTOR, isEngine, Plugin} from '@aomao/engine';
import TableComponent from './component';
import locales from './locale';
import './index.css';

class Table extends Plugin {
  static get pluginName() {
    return 'table';
  }

  init() {
    const editor = this.editor;
    if (!this.options.colMinWidth) {
      this.options.colMinWidth = 40;
    }
    if (!this.options.rowMinHeight) {
      this.options.rowMinHeight = 30;
    }
    editor.language.add(locales);
    editor.schema.add(this.schema());
    editor.conversion.add('th', 'td');
    editor.on('parse:html', this.parseHtml);
    editor.on('paste:each', this.pasteEach);
    editor.on('paste:each-after', this.pasteHtml);
    editor.on('paste:schema', this.pasteSchema);
    if (isEngine(editor)) {
      this.editor.on('markdown-it', this.markdownIt);
      editor.change.event.onDocument('copy', this.onCopy, 0);
      editor.change.event.onDocument('cut', this.onCut, 0);
      editor.change.event.onDocument('paste', this.onPaste, 0);
    }
  }

  onCopy(event) {
    const editor = this.editor;
    if (!isEngine(editor)) return true;
    const {change, card} = editor;
    const range = change.range.get();
    const component = card.find(range.commonAncestorNode, true);
    if (component && component.name === TableComponent.cardName && !component.isCursor(range.startNode)) {
      const nodes = component.getSelectionNodes();
      if (nodes.length > 1) {
        event.preventDefault();
        component.command.copy();
        editor.messageSuccess('copy', editor.language.get('copy', 'success'));
        return false;
      }
    }
    return true;
  }

  onCut(event) {
    const editor = this.editor;
    if (!isEngine(editor) || editor.readonly) return true;
    const {change, card} = editor;
    const range = change.range.get();
    const component = card.find(range.commonAncestorNode, true);
    if (component && component.name === TableComponent.cardName && !component.isCursor(range.startNode)) {
      const nodes = component.getSelectionNodes();
      if (nodes.length > 1) {
        event.preventDefault();
        component.command.cut();
        return false;
      }
    }
    return true;
  }

  onPaste(event) {
    const editor = this.editor;
    if (!isEngine(editor) || editor.readonly) return true;
    const {change, card} = editor;
    const range = change.range.get();
    const component = card.find(range.commonAncestorNode, true);
    if (component && component.name === TableComponent.cardName && !component.isCursor(range.startNode)) {
      const data = editor.clipboard.getData(event);
      if (!data || !/<meta\s+name="aomao"\s+content="table"\s{0,}\/?>/gi.test(data.html || '')) {
        if (data.html && ~data.html.indexOf('<table')) {
          event.preventDefault();
          component.command.paste(data);
          return false;
        }
        return true;
      }
      event.preventDefault();
      component.command.paste(data);
      return false;
    }
    return true;
  }

  hotkey() {
    return this.options.hotkey || '';
  }

  schema() {
    return [
      {
        name: 'table',
        type: 'block',
        attributes: {
          class: ['data-table'],
          'data-table-no-border': '*',
          style: {width: '@length'}
        }
      }
    ];
  }

  execute(rows = 3, cols = 3) {
    const editor = this.editor;
    if (!isEngine(editor)) return;
    const {change} = editor;
    const range = change.range.get();
    if (range.startNode.closest(EDITABLE_SELECTOR).isCard()) return;
    editor.card.insert(TableComponent.cardName, {rows, cols, overflow: !!this.options.overflow});
  }
}

export default Table;
export { TableComponent };
