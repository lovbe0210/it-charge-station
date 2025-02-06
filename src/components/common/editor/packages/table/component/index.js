import {
  $,
  Card,
  closest,
  DATA_CONTENTEDITABLE_KEY,
  DATA_ELEMENT,
  EDITABLE_SELECTOR,
  isEngine,
  isMobile,
  Parser,
  removeUnit,
  Scrollbar,
  SelectStyleType
} from '@aomao/engine';
import Helper from './helper';
import Template from './template';
import menuData from './menu';
import ControllBar from './controllbar';
import TableSelection from './selection';
import TableCommand from './command';
import {ColorTool, Palette} from './toolbar';

class TableComponent extends Card {
  constructor(options) {
    super(options);
    const pluginOptions = this.getOptions();
    this.contenteditable = [`div${Template.TABLE_TD_CONTENT_CLASS}`];
    this.colMinWidth = (pluginOptions && pluginOptions.colMinWidth) || 40;
    this.rowMinHeight = (pluginOptions && pluginOptions.rowMinHeight) || 35;
    this.maxInsertNum = (pluginOptions && pluginOptions.maxInsertNum) || 30;
    this.helper = new Helper(this.editor);
    this.template = new Template(this);
    this.selection = new TableSelection(this.editor, this);
    this.conltrollBar = new ControllBar(this.editor, this, {
      col_min_width: this.colMinWidth,
      row_min_height: this.rowMinHeight,
      max_insert_num: this.maxInsertNum
    });
    this.command = new TableCommand(this.editor, this);
    this.enableScroll = pluginOptions && pluginOptions.enableScroll !== false;
    // 以下用于显示工具栏颜色等
    this.colorTool = undefined;
    this.noBorderToolButton = undefined;
    this.alignToolButton = undefined;
  }

  // 指定卡片的 contenteditable 区域
  // get contenteditable() {
  //   return [`div${Template.TABLE_TD_CONTENT_CLASS}`];
  // }

  static get cardName() {
    return 'table';
  }

  static get cardType() {
    return Card.CardType.BLOCK;
  }

  static get selectStyleType() {
    return SelectStyleType.BACKGROUND;
  }

  static get autoSelected() {
    return false;
  }

  static get lazyRender() {
    return true;
  }

  static get colors() {
    return Palette.getColors().map((group) =>
      group.map((color) => {
        return {color, border: Palette.getStroke(color)};
      })
    );
  }

  init() {
    super.init();
    const editor = this.editor;
    if (isEngine(editor)) {
      // tab 键选择
      if (!editor.event.listeners['keydown:tab']) {
        editor.event.listeners['keydown:tab'] = [];
      }

      editor.event.listeners['keydown:tab'].unshift((event) => {
        if (!isEngine(editor) || editor.readonly) return;
        const {change, block, node, card} = editor;
        const range = change.range.get();
        const td = range.endNode.closest('td');
        if (td.length === 0 || !td.inEditor()) return;
        const component = card.closest(td, true);
        if (!component || !component.equal(this.root)) return;
        const closestBlock = block.closest(range.endNode);
        if (
          td.length > 0 &&
          (block.isLastOffset(range, 'end') ||
            (closestBlock.name !== 'li' && node.isEmptyWidthChild(closestBlock)))
        ) {
          let next = td.next();
          if (!next) {
            // 最后一行，最后一列，新建一行
            this.command.insertRowDown();
            next = td.parent()?.next()?.find('td:first-child') || null;
          } else {
            next = next.find('td:first-child') || null;
          }
          if (next) {
            event.preventDefault();
            this.selection.focusCell(next);
            return false;
          }
        }
        if (td.length > 0 && this.enableScroll) {
          setTimeout(() => {
            this.scrollbar && this.scrollbar.refresh();
          }, 0);
        }
      });
      // 下键选择
      editor.on('keydown:down', (event) => {
        if (!isEngine(editor) || editor.readonly) return;
        const {change, card} = editor;
        const range = change.range.get();
        const td = range.endNode.closest('td');
        if (td.length === 0 || !td.inEditor()) return;
        const component = card.closest(td, true);
        if (!component || !component.equal(this.root)) return;
        const contentElement = td.find('.table-main-content');
        if (!contentElement) return;
        const tdRect = contentElement.get().getBoundingClientRect();
        const rangeRect = range.getBoundingClientRect();
        if (
          td.length > 0 &&
          (rangeRect.bottom === 0 || tdRect.bottom - rangeRect.bottom < 10)
        ) {
          const index = td.index();
          const nextRow = td.parent()?.next();
          if (nextRow) {
            let nextIndex = 0;
            let nextTd = nextRow.find('td:last-child');
            this.selection.tableModel &&
            this.selection.tableModel.table[nextRow.index()].some((cell) => {
              if (!this.helper.isEmptyModelCol(cell) && nextIndex >= index && cell.element) {
                nextTd = $(cell.element);
                return true;
              }
              nextIndex++;
              return false;
            });
            if (nextTd) {
              event.preventDefault();
              this.selection.focusCell(nextTd, true);
              return false;
            }
          } else {
            event.preventDefault();
            const cloneRange = range.cloneRange();
            const next = this.root.next();
            const cardComponent = next ? editor.card.find(next) : undefined;
            if (cardComponent && cardComponent.onSelectDown) {
              cardComponent.onSelectDown(event);
            } else {
              card.focusNextBlock(this, cloneRange, false);
              change.range.select(cloneRange);
            }
            return false;
          }
        }
        if (td.length > 0 && this.enableScroll) {
          setTimeout(() => {
            this.scrollbar && this.scrollbar.refresh();
          }, 0);
        }
      });
      // 上键选择
      editor.on('keydown:up', (event) => {
        if (!isEngine(editor) || editor.readonly) return;
        const {change, card} = editor;
        const range = change.range.get();
        const td = range.endNode.closest('td');
        if (td.length === 0 || !td.inEditor()) return;
        const component = card.closest(td, true);
        if (!component || !component.equal(this.root)) return;
        const contentElement = td.find('.table-main-content');
        if (!contentElement) return;
        const tdRect = contentElement.get().getBoundingClientRect();
        const rangeRect = range.getBoundingClientRect();
        if (
          td.length > 0 &&
          (rangeRect.top === 0 || rangeRect.top - tdRect.top < 10)
        ) {
          const index = td.index();
          const prevRow = td.parent()?.prev();
          if (prevRow) {
            let prevIndex = 0;
            let prevTd = prevRow.find('td:first-child');
            this.selection.tableModel &&
            this.selection.tableModel.table[prevRow.index()].some((cell) => {
              if (!this.helper.isEmptyModelCol(cell) && prevIndex >= index && cell.element) {
                prevTd = $(cell.element);
                return true;
              }
              prevIndex++;
              return false;
            });
            if (prevTd) {
              event.preventDefault();
              this.selection.focusCell(prevTd);
              return false;
            }
          } else {
            event.preventDefault();
            const cloneRange = range.cloneRange();
            const prev = this.root.prev();
            const cardComponent = prev ? editor.card.find(prev) : undefined;
            if (cardComponent && cardComponent.onSelectUp) {
              cardComponent.onSelectUp(event);
            } else {
              card.focusPrevBlock(this, cloneRange, false);
              change.range.select(cloneRange);
            }
            return false;
          }
        }
        if (td.length > 0 && this.enableScroll) {
          setTimeout(() => {
            this.scrollbar && this.scrollbar.refresh();
          }, 0);
        }
      });
      // 左键和右键的处理仅用于刷新滚动条
      editor.on('keydown:left', () => {
        if (!isEngine(editor) || editor.readonly) return;
        const {change} = editor;
        const range = change.range.get();
        const td = range.endNode.closest('td');
        if (td.length === 0 || !td.inEditor()) return;
        if (td.length > 0 && this.enableScroll) {
          setTimeout(() => {
            this.scrollbar && this.scrollbar.refresh();
          }, 0);
        }
      });
      editor.on('keydown:right', () => {
        if (!isEngine(editor) || editor.readonly) return;
        const {change} = editor;
        const range = change.range.get();
        const td = range.endNode.closest('td');
        if (td.length === 0 || !td.inEditor()) return;
        if (td.length > 0 && this.enableScroll) {
          setTimeout(() => {
            this.scrollbar && this.scrollbar.refresh();
          }, 0);
        }
      });
    }
    if (this.colorTool) return;
    this.colorTool = new ColorTool(
      this.editor,
      this.id,
      {
        colors: TableComponent.colors,
        defaultColor: super.getValue() && super.getValue().color,
        onChange: (color) => {
          this.conltrollBar.drawBackgroundColor(color);
          const value = this.getValue();
          this.setValue({...value, color});
        }
      }
    );
  }

  getOptions() {
    return this.editor.plugin.findPlugin('table')?.options;
  }

  doChange = () => {
    this.remoteRefresh();
    this.handleChange('local');
  };

  toolbar() {
    const editor = this.editor;
    const getItems = () => {
      if (!isEngine(editor) || editor.readonly) {
        return [
          // {
          //   key: 'maximize',
          //   type: 'maximize'
          // }
        ];
      }

      const language = editor.language.get('table');
      const funBtns = [
        {
          key: 'color',
          type: 'node',
          title: editor.language.get('table', 'color', 'title'),
          node: this.colorTool.getButton()
        },
        {
          key: 'border',
          type: 'button',
          title: super.getValue() && super.getValue().noBorder
            ? language.showBorder
            : language.noBorder,
          content: '<span class="data-icon data-icon-no-border"></span>',
          didMount: (node) => {
            const value = super.getValue();
            if (value && value.noBorder === true) {
              node.addClass('active');
            }
            this.noBorderToolButton = node;
          },
          onClick: (_, node) => {
            const value = super.getValue();
            this.setValue({
              noBorder: !value?.noBorder
            });
            const table = this.wrapper && this.wrapper.find('.data-table');
            if (value && value.noBorder === true) {
              table && table.removeAttributes('data-table-no-border');
              node.removeClass('active');
            } else {
              table && table.attributes('data-table-no-border', 'true');
              node.addClass('active');
            }
          }
        },
        {
          key: 'align',
          type: 'dropdown',
          content: '<span class="data-icon data-icon-align-top" />',
          title: language.verticalAlign.title,
          didMount: (node) => {
            this.alignToolButton = node.find('.data-toolbar-btn');
          },
          items: [
            {
              type: 'button',
              content: `<span class="data-icon data-icon-align-top"></span> ${language.verticalAlign.top}`,
              onClick: (event) => this.updateAlign(event, 'top')
            },
            {
              type: 'button',
              content: `<span class="data-icon data-icon-align-middle"></span> ${language.verticalAlign.middle}`,
              onClick: (event) => this.updateAlign(event, 'middle')
            },
            {
              type: 'button',
              content: `<span class="data-icon data-icon-align-bottom"></span> ${language.verticalAlign.bottom}`,
              onClick: (event) => this.updateAlign(event, 'bottom')
            }
          ]
        },
        {
          key: 'merge',
          type: 'button',
          title: language.mergeCell,
          content: '<span class="data-icon data-icon-merge-cells"></span>',
          disabled: this.conltrollBar.getMenuDisabled('mergeCell'),
          onClick: () => {
            this.command.mergeCell();
          }
        },
        {
          key: 'split',
          type: 'button',
          title: language.splitCell,
          content: '<span class="data-icon data-icon-solit-cells"></span>',
          disabled: this.conltrollBar.getMenuDisabled('splitCell'),
          onClick: () => {
            this.command.splitCell();
          }
        }
      ];
      if (this.isMaximize) return funBtns;
      const toolbars = [
        {
          key: 'maximize',
          type: 'maximize'
        },
        {
          key: 'copy',
          type: 'copy',
          onClick: () => {
            this.command.copy(true);
            editor.messageSuccess('copy', editor.language.get('copy', 'success'));
          }
        },
        {
          key: 'delete',
          type: 'delete'
        },
        {
          key: 'separator',
          type: 'separator'
        },
        ...funBtns
      ];
      if (removeUnit((this.wrapper && this.wrapper.css('margin-left')) || '0') === 0) {
        toolbars.unshift({
          key: 'dnd',
          type: 'dnd'
        });
      }
      return toolbars;
    };
    const options = this.getOptions();
    if (options && options.cardToolbars) {
      return options.cardToolbars(getItems(), this.editor);
    }
    return getItems();
  }

  onSelectLeft(event) {
    const {tableModel} = this.selection;
    if (!tableModel) return;
    for (let r = tableModel.rows - 1; r >= 0; r--) {
      for (let c = tableModel.cols - 1; c >= 0; c--) {
        const cell = tableModel.table[r][c];
        if (!this.helper.isEmptyModelCol(cell) && cell.element) {
          event.preventDefault();
          this.selection.focusCell($(cell.element).find(EDITABLE_SELECTOR));
          return false;
        }
      }
    }
  }

  onSelectRight(event) {
    const {tableModel} = this.selection;
    if (!tableModel) return;
    for (let r = 0; r < tableModel.rows; r++) {
      for (let c = 0; c < tableModel.cols; c++) {
        const cell = tableModel.table[r][c];
        if (!this.helper.isEmptyModelCol(cell) && cell.element) {
          event.preventDefault();
          this.selection.focusCell($(cell.element).find(EDITABLE_SELECTOR));
          return false;
        }
      }
    }
  }

  onSelectUp(event) {
    const {tableModel} = this.selection;
    if (!tableModel) return;
    for (let r = tableModel.rows - 1; r >= 0; r--) {
      for (let c = 0; c < tableModel.cols; c++) {
        const cell = tableModel.table[r][c];
        if (!this.helper.isEmptyModelCol(cell) && cell.element) {
          event.preventDefault();
          this.selection.focusCell($(cell.element).find(EDITABLE_SELECTOR), false);
          return false;
        }
      }
    }
  }

  onSelectDown(event) {
    const {tableModel} = this.selection;
    if (!tableModel) return;
    for (let r = 0; r < tableModel.rows; r++) {
      for (let c = 0; c < tableModel.cols; c++) {
        const cell = tableModel.table[r][c];
        if (!this.helper.isEmptyModelCol(cell) && cell.element) {
          event.preventDefault();
          this.selection.focusCell($(cell.element).find(EDITABLE_SELECTOR));
          return false;
        }
      }
    }
  }

  updateAlign(event, align = 'top') {
    event.preventDefault();
    this.conltrollBar.setAlign(align);
    this.onChange('local');
    this.updateAlignText(align);
  }

  updateAlignText(align = 'top') {
    const alignHtml = `<span class="data-icon data-icon-align-${align}"></span>`;
    this.alignToolButton && this.alignToolButton.html(alignHtml);
  }

  getValue() {
    const value = super.getValue();
    if (!this.wrapper) return value;
    const tableRoot = this.wrapper.find(Template.TABLE_CLASS);
    if (!tableRoot) return value;
    const {tableModel} = this.selection;
    if (!tableModel) return value;
    const editor = this.editor;
    const {schema, conversion} = editor;
    const container = $('<div></div>');
    container.append(tableRoot.clone(true));
    const parser = new Parser(container, editor, (node) => {
      node.find(Template.TABLE_TD_BG_CLASS).remove();
      node.find(EDITABLE_SELECTOR).each((root) => {
        if (root.nodeName === 'TD') {
          $(root).removeAttributes(DATA_ELEMENT);
        } else {
          editor.node.unwrap($(root));
        }
      });
    });
    const {rows, cols, height, width} = tableModel;
    const html = parser.toValue(schema, conversion, false, false);
    if (!isEngine(editor)) return {...value, html};
    return {
      ...value,
      rows,
      cols,
      height,
      width,
      html
    };
  }

  drawBackground(node, range) {
    const backgroundRect = node.get().getBoundingClientRect();
    const domRect = new DOMRect(backgroundRect.x, backgroundRect.y, 0, 0);
    const {startContainer, endContainer} = range;
    const startElement = closest(startContainer, 'td');
    const endElement = closest(endContainer, 'td');
    if (
      !(startElement instanceof Element) ||
      !(endElement instanceof Element) ||
      startElement.nodeName !== 'TD' ||
      endElement.nodeName !== 'TD' ||
      startElement === endElement
    ) {
      return;
    }
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    const viewportRect = this.viewport && this.viewport.getBoundingClientRect();
    const vLeft = (viewportRect ? viewportRect.left : 0) + (this.activated ? 13 : 0);
    domRect.x = Math.max(
      startRect.left - backgroundRect.left,
      vLeft - ((this.editor.root.getBoundingClientRect()?.left) || 0)
    );
    domRect.y = startRect.top - backgroundRect.top;
    domRect.width =
      (viewportRect ? Math.min(endRect.right, viewportRect.right) : endRect.right) - startRect.left;
    domRect.height = endRect.bottom - startRect.top;
    if (domRect.width < 0) domRect.width = 0;
    return domRect;
  }

  activate(activated) {
    super.activate(activated);
    if (activated) {
      this.conltrollBar.refresh();
      this.wrapper && this.wrapper.addClass('active');
    } else {
      this.selection.clearSelect();
      this.conltrollBar.hideContextMenu();
      this.wrapper && this.wrapper.removeClass('active');
    }
    if (this.enableScroll) this.scrollbar && this.scrollbar.refresh();
  }

  handleChange = (trigger = 'local') => {
    const editor = this.editor;
    this.conltrollBar.refresh();
    this.selection.render('change');
    const oldValue = super.getValue();
    if (oldValue && oldValue.noBorder) {
      this.noBorderToolButton && this.noBorderToolButton.addClass('active');
    } else {
      this.noBorderToolButton && this.noBorderToolButton.removeClass('active');
    }
    if (trigger === 'local' && isEngine(editor)) {
      const value = this.getValue();
      if (value) this.setValue(value);
    }
  };

  onChange = (trigger = 'local') => {
    const editor = this.editor;
    if (isEngine(editor) && trigger === 'local' && editor.model.mutation.isStopped) return;
    if (this._changeTimeout) clearTimeout(this._changeTimeout);
    this._changeTimeout = setTimeout(() => {
      this.handleChange(trigger);
      if (trigger === 'remote') {
        this.remoteRefresh();
      }
    }, 50);
  };

  maximize() {
    super.maximize();
    if (this.enableScroll) this.scrollbar && this.scrollbar.refresh();
    const {editor} = this;
    if (isEngine(editor) && !isMobile) {
      this.getCenter().on('scroll', this.updateScrollbar, {passive: true});
    }
  }

  minimize() {
    super.minimize();
    if (this.enableScroll) this.scrollbar && this.scrollbar.refresh();
    this.getCenter().off('scroll', this.updateScrollbar);
  }

  getSelectionNodes() {
    const nodes = [];
    this.selection.each((cell) => {
      if (!this.helper.isEmptyModelCol(cell) && cell.element) {
        nodes.push($(cell.element).find(EDITABLE_SELECTOR));
      }
    });
    if (
      nodes.length === 1 &&
      nodes[0].closest('[table-cell-selection=true]').length === 0
    ) {
      return [];
    }
    return nodes;
  }

  overflow(max) {
    if (!this.enableScroll) return;
    const tableWidth = (this.wrapper && this.wrapper.find('.data-table') && this.wrapper.find('.data-table').width()) || 0;
    const rootWidth = this.getCenter().width();
    const overflowWidth = tableWidth - rootWidth;
    if (overflowWidth > 0 && !this.isMaximize) {
      this.wrapper && this.wrapper.css('margin-right', `-${overflowWidth > max ? max : overflowWidth}px`);
    } else if (overflowWidth < 0 || this.isMaximize) {
      this.wrapper && this.wrapper.css('margin-right', '');
    }
  }

  updateScrollbar = () => {
    if (!this.scrollbar || !this.enableScroll) return;
    const hideHeight =
      ((this.wrapper && this.wrapper.getBoundingClientRect().bottom) || 0) -
      ((this.wrapper && this.wrapper.getViewport().bottom) || 0);
    this.wrapper && this.wrapper.find('.data-scrollbar-x').css({
      bottom: `${hideHeight > 0 ? hideHeight + 2 : 0}px`
    });
  };

  initScrollbar() {
    if (!this.viewport) return;
    const editor = this.editor;
    const tablePlugin = editor.plugin.findPlugin('table');
    const tableOptions = (tablePlugin && tablePlugin.options.overflow) || {};
    const overflowLeftConfig = tableOptions.maxLeftWidth
      ? {
        onScrollX: (x) => {
          if (this.isMaximize) x = 0;
          const max = tableOptions.maxLeftWidth();
          this.wrapper && this.wrapper.css('margin-left', `-${x > max ? max : x}px`);
          if (x > 0) {
            editor.root.find('.data-card-dnd').hide();
          } else {
            editor.root.find('.data-card-dnd').show();
          }
          return x - max;
        },
        getScrollLeft: (left) => {
          return left - removeUnit((this.wrapper && this.wrapper.css('margin-left')) || '0');
        },
        getOffsetWidth: (width) => {
          return width + removeUnit((this.wrapper && this.wrapper.css('margin-left')) || '0');
        }
      }
      : undefined;

    if (this.enableScroll) {
      this.scrollbar = new Scrollbar(this.viewport, true, false, true, overflowLeftConfig);
    }
    this.scrollbar && this.scrollbar.setContentNode(this.viewport.find('.data-table'));
    this.scrollbar && this.scrollbar.on('display', (display) => {
      if (display === 'block') {
        this.wrapper && this.wrapper.addClass('scrollbar-show');
      } else {
        this.wrapper && this.wrapper.removeClass('scrollbar-show');
      }
    });
    let prevScrollData = {x: 0, y: 0};
    const handleScrollbarChange = ({x, y}) => {
      if (tableOptions.maxRightWidth) {
        this.overflow(tableOptions.maxRightWidth());
      }
      if (prevScrollData.x === x && prevScrollData.y === y) return;
      prevScrollData = {x, y};
      if (isEngine(editor)) {
        editor.trigger('scroll', this.root, {x, y});
        this.conltrollBar.refresh();
      }
    };
    this.scrollbar && this.scrollbar.on('change', handleScrollbarChange);
    if (!isMobile) {
      window.addEventListener('scroll', this.updateScrollbar, {passive: true});
    }
    window.addEventListener('resize', this.updateScrollbar);
    if (isEngine(editor) && !isMobile) {
      editor.scrollNode && editor.scrollNode.on('scroll', this.updateScrollbar, {passive: true});
    }
  }

  didRender() {
    super.didRender();
    const editor = this.editor;
    editor.on('undo', this.doChange);
    editor.on('redo', this.doChange);
    this.viewport = isEngine(editor)
      ? this.wrapper && this.wrapper.find(Template.VIEWPORT)
      : this.wrapper && this.wrapper.find(Template.VIEWPORT_READER);
    this.selection.init();
    this.conltrollBar.init();
    this.command.init();
    if (!isEngine(editor) || editor.readonly) {
      this.toolbarModel && this.toolbarModel.setOffset([0, 0]);
    } else {
      this.toolbarModel && this.toolbarModel.setOffset([13, -28, 0, -6]);
    }
    const options = this.getOptions();
    const tableOptions = (options && options.overflow) || {};
    if (this.viewport) {
      this.selection.refreshModel();
      if (this.enableScroll) {
        setTimeout(() => {
          this.initScrollbar();
        }, 0);
      }
    }
    this.selection.on('select', () => {
      this.conltrollBar.refresh(false);
      if (!isEngine(editor)) return;
      const align = this.selection.getSingleCell() && this.selection.getSingleCell().css('vertical-align');
      this.updateAlignText(align);
      this.toolbarModel && this.toolbarModel.update();
    });
    this.conltrollBar.on('sizeChanged', () => {
      this.selection.refreshModel();
      this.onChange();
      if (this.enableScroll) this.scrollbar && this.scrollbar.refresh();
    });
    this.conltrollBar.on('sizeChanging', () => {
      if (this.enableScroll) this.scrollbar && this.scrollbar.refresh();
      editor.trigger('editor:resize');
      this.updateScrollbar();
    });
    this.command.on('actioned', (action, silence) => {
      if (action === 'paste') {
        editor.card.render(this.wrapper);
      }
      if (['splitCell', 'mergeCell', 'insertCol'].includes(action)) {
        editor.trigger('editor:resize');
      }
      this.selection.render(action);
      this.toolbarModel && this.toolbarModel.update();
      if (!silence) {
        this.onChange();
      }
      if (tableOptions.maxRightWidth) {
        this.overflow(tableOptions.maxRightWidth());
      }
      if (this.enableScroll) this.scrollbar && this.scrollbar.refresh();
    });
    const tableRoot = this.wrapper && this.wrapper.find(Template.TABLE_CLASS);
    if (!tableRoot) return;
    const value = super.getValue();
    if (!value || !value.html) {
      const tableValue = this.getValue();
      if (tableValue && isEngine(editor)) this.setValue(tableValue);
      this.onChange();
    }
    if (tableOptions.maxRightWidth) {
      this.overflow(tableOptions.maxRightWidth());
    }
  }

  remoteRefresh() {
    if (
      !this.wrapper ||
      this.wrapper.length === 0 ||
      !(this.wrapper[0].parentElement || this.wrapper[0].parentNode)
    ) {
      return;
    }
    // 重新绘制列头和行头
    const colsHeader = this.wrapper.find(Template.COLS_HEADER_CLASS);
    const superValue = super.getValue();
    let colItems = colsHeader.find(Template.COLS_HEADER_ITEM_CLASS);
    const colCount = colItems.length;
    if (superValue.cols > colCount) {
      colsHeader.append(
        $(this.template.renderColsHeader(superValue.cols - colCount)).find(Template.COLS_HEADER_ITEM_CLASS)
      );
      colItems = colsHeader.find(Template.COLS_HEADER_ITEM_CLASS);
    } else if (superValue.cols < colCount) {
      for (let i = colCount; i > superValue.cols; i--) {
        colItems.eq(i - 1) && colItems.eq(i - 1).remove();
      }
    }
    const table = superValue.html ? $(superValue.html) : this.wrapper.find('table');
    const colElements = table.find('col').toArray();
    colElements.forEach((colElement, index) => {
      const width = colElement.attributes('width') || colElement.css('width');
      colItems.eq(index) && colItems.eq(index).css('width', `${Math.max(parseInt(width), this.colMinWidth)}px`);
    });
    const rowsHeader = this.wrapper.find(Template.ROWS_HEADER_CLASS);
    let rowItems = rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS);
    const rowCount = rowItems.length;
    if (superValue.rows > rowCount) {
      rowsHeader.append(
        $(this.template.renderRowsHeader(superValue.rows - rowCount)).find(Template.ROWS_HEADER_ITEM_CLASS)
      );
      rowItems = rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS);
    } else if (superValue.rows < rowCount) {
      for (let i = rowCount; i > superValue.rows; i--) {
        rowItems.eq(i - 1) && rowItems.eq(i - 1).remove();
      }
    }
    const rowElements = table.find('tr').toArray();
    rowElements.forEach((rowElement, index) => {
      rowItems.eq(index) && rowItems.eq(index).css('height', Math.max(parseInt(rowElement.css('width')), this.rowMinHeight));
    });
    if (this.enableScroll) this.scrollbar && this.scrollbar.refresh();
    if (this.remoteRefreshTimeout) clearTimeout(this.remoteRefreshTimeout);
    this.remoteRefreshTimeout = setTimeout(() => {
      this.wrapper && this.wrapper.find(EDITABLE_SELECTOR).each((editableNode) => {
        const editableElement = editableNode;
        if (!editableElement.hasAttribute(DATA_CONTENTEDITABLE_KEY)) {
          editableElement.setAttribute(
            DATA_CONTENTEDITABLE_KEY,
            this.template.isReadonly ? 'false' : 'true'
          );
        }
      });
    }, 10);
  }

  render() {
    const editor = this.editor;
    this.template.isReadonly = !isEngine(editor) || editor.readonly;
    if (
      this.wrapper &&
      this.wrapper.length > 0 &&
      (this.wrapper[0].parentElement || this.wrapper[0].parentNode)
    ) {
      this.remoteRefresh();
      return;
    }
    const value = this.getValue();
    if (!value) return 'Error value';
    if (value.html) {
      let table = $(value.html);
      if (table && table.name !== 'table') {
        table = table.toArray().find((child) => child.name === 'table');
        if (!table) {
          value.html = `<table><tr><td>${value.html}</td></tr></table>`;
          table = $(value.html);
        } else {
          value.html = table.get().outerHTML;
        }
      }
      const model = this.helper.getTableModel(table);
      value.rows = model.rows;
      value.cols = model.cols;
    }
    this.wrapper = isEngine(editor)
      ? $(this.template.htmlEdit(value, menuData(editor.language.get('table'))))
      : $(this.template.htmlView(value));
    if (!isEngine(editor)) {
      this.wrapper.find('table').addClass('data-table').addClass('data-table-view');
    }
    value.rows = this.wrapper.find('tr').length;
    if (value.width) {
      const containerWidth = this.root.width();
      this.wrapper.find('table').css(
        'width',
        `${!this.enableScroll ? Math.min(value.width, containerWidth) : value.width}px`
      );
    }
    return this.wrapper;
  }

  destroy() {
    super.destroy();
    const editor = this.editor;
    window.removeEventListener('scroll', this.updateScrollbar);
    window.removeEventListener('resize', this.updateScrollbar);
    editor.scrollNode && editor.scrollNode.off('scroll', this.updateScrollbar);
    if (this.enableScroll) this.scrollbar && this.scrollbar.destroy();
    this.command.removeAllListeners();
    const selection = this.selection;
    selection.removeAllListeners();
    selection.destroy();
    const bar = this.conltrollBar;
    bar.removeAllListeners();
    bar.destroy();
    editor.off('undo', this.doChange);
    editor.off('redo', this.doChange);
  }
}

export default TableComponent;
export {Template, Helper};
