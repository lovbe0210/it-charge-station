import {EventEmitter2} from 'eventemitter2';
import {$, CardActiveTrigger, getComputedStyle, isEngine, isHotkey, isMobile, removeUnit} from '@aomao/engine';
import Template from './template';

class ControllBar extends EventEmitter2 {
  constructor(editor, table, options) {
    super();
    this.editor = editor;
    this.table = table;
    this.COL_MIN_WIDTH = options.col_min_width;
    this.ROW_MIN_HEIGHT = options.row_min_height;
    this.MAX_INSERT_NUM = options.max_insert_num;
    this.tableRoot = undefined;
    this.colsHeader = undefined;
    this.rowsHeader = undefined;
    this.tableHeader = undefined;
    this.menuBar = undefined;
    this.dragging = undefined;
    this.draggingHeader = undefined;
    this.changeSize = undefined;
    this.viewport = undefined;
    this.placeholder = undefined;
    this.contextVisible = false;
    // 行删除按钮
    this.rowDeleteButton = undefined;
    // 列删除按钮
    this.colDeleteButton = undefined;
    // 列增加按钮相关
    this.colAddButton = undefined;
    this.colAddAlign = undefined;
    this.colAddButtonSplit = undefined;
    this.moveColIndex = -1;
    this.hideColAddButtonTimeount = undefined;
    // 行增加按钮相关
    this.rowAddButton = undefined;
    this.rowAddAlign = undefined;
    this.rowAddButtonSplit = undefined;
    this.moveRowIndex = -1;
    this.hideRowAddButtonTimeount = undefined;
  }

  init() {
    const {wrapper} = this.table;
    if (!wrapper) return;
    this.tableRoot = wrapper.find(Template.TABLE_CLASS);
    this.colsHeader = wrapper.find(Template.COLS_HEADER_CLASS);
    this.rowsHeader = wrapper.find(Template.ROWS_HEADER_CLASS);
    this.tableHeader = wrapper.find(Template.HEADER_CLASS);
    this.viewport = wrapper.find(Template.VIEWPORT);
    this.menuBar = wrapper.find(Template.MENUBAR_CLASS);
    this.placeholder = wrapper.find(Template.PLACEHOLDER_CLASS);
    this.renderRowBars();
    this.renderColBars();
    this.bindEvents();
  }


  renderRowBars(refershSize = true) {
    const table = this.tableRoot && this.tableRoot.get();
    if (!table) return;
    // 行删除按钮
    this.rowDeleteButton && this.rowDeleteButton.removeAllEvents();
    this.rowDeleteButton = this.rowsHeader && this.rowsHeader.find(Template.ROW_DELETE_BUTTON_CLASS);
    // 行增加按钮
    this.rowAddButton && this.rowAddButton.removeAllEvents();
    this.rowAddButton = this.rowsHeader && this.rowsHeader.find(Template.ROW_ADD_BUTTON_CLASS);
    this.rowAddButtonSplit = this.rowAddButton && this.rowAddButton.find(Template.ROW_ADD_BUTTON_SPLIT_CLASS);
    this.rowDeleteButton && this.rowDeleteButton
      .on('mouseover', (event) => this.handleHighlightRow())
      .on('mouseleave', (event) => this.hideHighlight(event))
      .on('mousedown', (event) => {
        event.preventDefault();
        this.table.command.removeRow();
      });
    this.rowAddButton && this.rowAddButton
      .on('mouseenter', () => {
        if (this.hideRowAddButtonTimeount) {
          clearTimeout(this.hideRowAddButtonTimeount);
        }
        this.rowsHeader && this.rowsHeader.css('z-index', 128);
      })
      .on('mouseleave', () => {
        this.hideRowAddButtonTimeount = setTimeout(() => {
          this.rowAddButton && this.rowAddButton.hide();
          this.rowsHeader && this.rowsHeader.css('z-index', 1);
          this.moveRowIndex = -1;
        }, 200);
      })
      .on('mousedown', (event) => {
        event.preventDefault();
        this.table.command.insertRowAt(
          this.moveRowIndex,
          1,
          this.rowAddAlign !== 'down'
        );
      });
    if (refershSize) {
      const trs = table.rows;
      const end = trs ? trs.length : 0;
      const rowBars = this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS);
      if (rowBars) {
        for (let i = 0; i < end; i++) {
          const newHeight = getComputedStyle(trs[i], 'height');
          const bar = rowBars[i];
          const oldHeight = bar && bar.style.height;
          if (bar && newHeight !== oldHeight) {
            bar.style.height = newHeight;
          }
        }
      }
      const rowTrigger = this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_TRIGGER_CLASS);
      const tableWidth = this.tableRoot.width();
      const wrapperWidth = (this.table.wrapper && this.table.wrapper.width()) || 0;
      const width = tableWidth < wrapperWidth ? tableWidth : wrapperWidth;
      const newWidth = width + ((this.rowsHeader && this.rowsHeader.width()) || 0) - 1;
      rowTrigger && rowTrigger.each((row) => {
        const oldWidth = row.style.width;
        if (oldWidth !== newWidth + 'px') {
          row.style.width = newWidth + 'px';
        }
      });
    }
  }

  renderColBars(refershSize = true) {
    const table = this.tableRoot && this.tableRoot.get();
    if (!table) return;
    const tableWidth = removeUnit(getComputedStyle(table, 'width'));
    // 列删除按钮
    this.colDeleteButton && this.colDeleteButton.removeAllEvents();
    this.colDeleteButton = this.table.wrapper && this.table.wrapper.find(Template.COL_DELETE_BUTTON_CLASS);
    // 列增加按钮
    this.colAddButton && this.colAddButton.removeAllEvents();
    this.colAddButton = this.colsHeader && this.colsHeader.find(Template.COL_ADD_BUTTON_CLASS);
    this.colAddButtonSplit = this.colAddButton && this.colAddButton.find(Template.COL_ADD_BUTTON_SPLIT_CLASS);
    this.colDeleteButton && this.colDeleteButton
      .on('mouseover', (event) => this.handleHighlightCol())
      .on('mouseleave', (event) => this.hideHighlight(event))
      .on('mousedown', (event) => {
        event.preventDefault();
        this.table.command.removeCol();
      });
    this.colAddButton && this.colAddButton
      .on('mouseenter', () => {
        if (this.hideColAddButtonTimeount) {
          clearTimeout(this.hideColAddButtonTimeount);
        }
      })
      .on('mouseleave', () => {
        this.hideColAddButtonTimeount = setTimeout(() => {
          this.colAddButton && this.colAddButton.hide();
          this.moveColIndex = -1;
        }, 200);
      })
      .on('mousedown', (event) => {
        event.preventDefault();
        if (this.moveColIndex > -1) {
          this.table.command.insertColAt(
            this.moveColIndex,
            1,
            this.colAddAlign !== 'right'
          );
        }
      });
    const containerWidth = this.table.root.width();
    const width = !this.table.enableScroll
      ? Math.min(tableWidth, containerWidth)
      : tableWidth;
    this.tableRoot && this.tableRoot.css('width', `${width}px`);
    this.colsHeader && this.colsHeader.css('width', `${width}px`);
    if (refershSize) this.renderColSize();
  }

  renderColSize() {
    const table = this.tableRoot && this.tableRoot.get();
    if (!table) return;
    let tableWidth = removeUnit(getComputedStyle(table, 'width'));
    if (!this.table.enableScroll) {
      tableWidth = Math.min(tableWidth, this.table.root.width());
    }
    const cols = this.tableRoot && this.tableRoot.find('col');
    if (!cols) return;
    let isInit = true;
    const colWidthArray = {};
    let allColWidth = 0;
    let colIndex = 0;
    cols.each((_, i) => {
      const col = cols[i];
      const colWidth = removeUnit($(col).attributes('width'));
      if (colWidth) {
        colWidthArray[i] = colWidth;
        allColWidth += colWidth;
        isInit = false;
      } else {
        colIndex++;
      }
    });
    const colBars = this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS);
    if (!colBars) return;
    const tableModel = this.table.selection.tableModel;
    if (isInit) {
      let tdWidth = [];
      tableModel && tableModel.table && tableModel.table.forEach((trModel) => {
        trModel.forEach((tdModel, c) => {
          if (!tdWidth[c] && !this.table.helper.isEmptyModelCol(tdModel) && !tdModel.isMulti && tdModel.element) {
            tdWidth[c] = removeUnit(getComputedStyle(tdModel.element, 'width'));
          }
        });
      });
      let unkownCount = 0;
      let knownWidth = 0;
      for (let c = 0; c < cols.length; c++) {
        if (!tdWidth[c]) {
          unkownCount++;
        } else {
          knownWidth += tdWidth[c];
        }
      }
      let averageWidth = 0;
      if (unkownCount > 0) {
        averageWidth = Math.round(((tableWidth - knownWidth) / unkownCount) * 10000) / 10000;
      }
      for (let i = 0; i < cols.length; i++) {
        const width = tdWidth[i] || averageWidth;
        colBars.eq(i) && colBars.eq(i).css('width', width + 'px');
        cols.eq(i) && cols.eq(i).attributes('width', width);
      }
    } else if (colIndex) {
      const averageWidth = Math.round(((tableWidth - allColWidth) / colIndex) * 10000) / 10000;
      cols.each((_, index) => {
        const width = (colWidthArray[index] === undefined) ? averageWidth : colWidthArray[index];
        colBars.eq(index) && colBars.eq(index).css('width', width + 'px');
        cols.eq(index) && cols.eq(index).attributes('width', width);
      });
    } else {
      cols.each((_, index) => {
        const newWidth = Math.round(((tableWidth * colWidthArray[index]) / allColWidth) * 10000) / 10000;
        const bar = colBars[index];
        const oldWidth = bar && bar.style.width;
        if (bar && oldWidth !== newWidth + 'px') {
          bar.style.width = newWidth + 'px';
        }

      });
    }
    const colTrigger = this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_TRIGGER_CLASS);
    const newHeight = ((tableModel && tableModel.height) || 0) + ((this.colsHeader && this.colsHeader.height()) || 0);
    colTrigger && colTrigger.each((col) => {
      const oldHeight = col.style.height;
      if (oldHeight !== newHeight + 'px') {
        col.style.height = newHeight + 'px';
      }
    });
  }

  bindEvents() {
    this.colsHeader && this.colsHeader
      .on(isMobile ? 'touchstart' : 'mousedown', this.onMouseDownColsHeader)
      .on('mouseup', this.onClickColsHeader)
      .on('dragstart', this.onDragStartColsHeader);
    this.rowsHeader && this.rowsHeader
      .on(isMobile ? 'touchstart' : 'mousedown', this.onMouseDownRowsHeader)
      .on('mouseup', this.onClickRowsHeader)
      .on('dragstart', this.onDragStartRowsHeader);
    this.tableHeader && this.tableHeader.on('mousedown', this.onClickTableHeader);
    this.table.wrapper && this.table.wrapper.on('contextmenu', (event) => event.preventDefault());
    this.tableRoot && this.tableRoot.on('contextmenu', (event) => event.preventDefault());
    this.colsHeader && this.colsHeader.on('contextmenu', (event) => event.preventDefault());
    this.rowsHeader && this.rowsHeader.on('contextmenu', (event) => event.preventDefault());
    this.tableRoot && this.tableRoot.on('mousedown', (event) => this.onTableMouseDown(event));
    this.menuBar && this.menuBar.on('click', (event) => this.handleClickMenu(event));
    this.menuBar && this.menuBar.on('mouseover', (event) => this.handleHoverMenu(event));
    this.menuBar && this.menuBar.on('mouseleave', (event) => this.hideHighlight(event));
    const editor = this.editor;
    this.viewport && this.viewport.on(isMobile ? 'touchstart' : 'mousedown', (event) => {
      if (!event.target) return;
      const targetNode = $(event.target);
      if (!isEngine(editor) || !event.target || !(this.viewport && this.viewport.equal(targetNode))) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const {change} = editor;
      const range = change.range.get();
      editor.card.focusPrevBlock(this.table, range, true);
      editor.card.activate(range.startNode, CardActiveTrigger.MOUSE_DOWN);
      change.range.select(range);
    });
    let colMoveTimeout = null;
    this.colsHeader && this.colsHeader
      .on('mouseenter', () => {
        if (this.hideColAddButtonTimeount) {
          clearTimeout(this.hideColAddButtonTimeount);
        }
      })
      .on('mousemove', (event) => {
        if (colMoveTimeout) clearTimeout(colMoveTimeout);
        colMoveTimeout = setTimeout(() => {
          this.onMouseMoveColsHeader(event);
        }, 200);
      })
      .on('mouseleave', (e) => {
        if (colMoveTimeout) clearTimeout(colMoveTimeout);
        this.hideColAddButtonTimeount = setTimeout(() => {
          this.colAddButton && this.colAddButton.hide();
        }, 200);
      });
    let colItemTimeout = null;
    this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS)
      .on('mouseenter', (e) => {
        if (colItemTimeout) clearTimeout(colItemTimeout);
        colItemTimeout = setTimeout(() => {
          if (e.target) {
            $(e.target).closest(Template.COLS_HEADER_ITEM_CLASS).addClass('active');
          }
        }, 200);
      })
      .on('mouseleave', (e) => {
        if (colItemTimeout) clearTimeout(colItemTimeout);
        if (e.target) {
          $(e.target).closest(Template.COLS_HEADER_ITEM_CLASS).removeClass('active');
        }
      });
    let colTriggerTimeout = null;
    this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_TRIGGER_CLASS)
      .on('mouseenter', (e) => {
        if (colTriggerTimeout) clearTimeout(colTriggerTimeout);
        const target = $(e.target || []);
        colTriggerTimeout = setTimeout(() => {
          target.addClass('active');
        }, 200);
      })
      .on('mouseleave', (e) => {
        if (colTriggerTimeout) clearTimeout(colTriggerTimeout);
        if (e.target) {
          $(e.target).removeClass('active');
        }
      });
    let rowMoveTimeout = null;
    this.rowsHeader && this.rowsHeader
      .on('mouseenter', () => {
        if (this.hideRowAddButtonTimeount) {
          clearTimeout(this.hideRowAddButtonTimeount);
        }
      })
      .on('mousemove', (event) => {
        if (rowMoveTimeout) clearTimeout(rowMoveTimeout);
        rowMoveTimeout = setTimeout(() => {
          this.onMouseMoveRowsHeader(event);
          this.rowsHeader && this.rowsHeader.css('z-index', 128);
        }, 200);
      })
      .on('mouseleave', () => {
        if (rowMoveTimeout) clearTimeout(rowMoveTimeout);
        this.hideRowAddButtonTimeount = setTimeout(() => {
          this.rowsHeader && this.rowsHeader.css('z-index', '');
          this.rowAddButton && this.rowAddButton.hide();
        }, 200);
      });
    let rowItemTimeout = null;
    this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS)
      .on('mouseenter', (e) => {
        if (rowItemTimeout) clearTimeout(rowItemTimeout);
        rowItemTimeout = setTimeout(() => {
          if (e.target) {
            $(e.target).closest(Template.ROWS_HEADER_ITEM_CLASS).addClass('active');
          }
        }, 200);
      })
      .on('mouseleave', (e) => {
        if (rowItemTimeout) clearTimeout(rowItemTimeout);
        if (e.target) {
          $(e.target).closest(Template.ROWS_HEADER_ITEM_CLASS).removeClass('active');
        }
      });
    let rowTriggerTimeout = null;
    this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_TRIGGER_CLASS)
      .on('mouseenter', (e) => {
        if (rowTriggerTimeout) clearTimeout(rowTriggerTimeout);
        const target = $(e.target || []);
        rowTriggerTimeout = setTimeout(() => {
          target.addClass('active');
        }, 200);
      })
      .on('mouseleave', (e) => {
        if (rowTriggerTimeout) clearTimeout(rowTriggerTimeout);
        if (e.target) {
          $(e.target).removeClass('active');
        }
      });
  }

  /**
   * 在表格上单击
   * @param event
   */
  onTableMouseDown(event) {
    if (!event.target) return;
    const td = $(event.target).closest('td');
    if (td.length > 0 && event.button === 2 && this.table.activated) {
      this.showContextMenu(event);
    } else {
      this.hideContextMenu();
    }
  }

  onMouseMoveColsHeader(event) {
    if (!event.target || !this.colAddButton || !this.colAddButtonSplit) return;
    const targetNode = $(event.target);
    const itemNode = targetNode.closest(Template.COLS_HEADER_ITEM_CLASS);
    if (itemNode.length === 0) return;
    const items = this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS).toArray();
    const width = itemNode.width();
    const buttonWidth = this.colAddButton.width();
    let left = itemNode.get().offsetLeft;
    const index = items.findIndex((item) => item.equal(itemNode));
    const isEnd = event.offsetX > width / 2 || targetNode.hasClass('cols-trigger');
    const isLast = items[items.length - 1].equal(itemNode);
    if (isEnd) {
      left += isLast ? width - buttonWidth / 2 : width;
    }
    this.colAddAlign = isEnd ? 'left' : 'right';
    this.moveColIndex = index;
    this.colAddButton.show('flex');
    this.colAddButton.css('left', `${left}px`);
    this.colAddButton.css('z-index', 128);
    const splitHeight = ((this.table.selection.tableModel && this.table.selection.tableModel.height) || 0) + itemNode.height() + 4;
    this.colAddButtonSplit.css('height', `${splitHeight}px`);
    this.colAddButtonSplit.css('left', isLast && isEnd ? buttonWidth - 3 + 'px' : '');
  }

  onMouseMoveRowsHeader(event) {
    if (!event.target || !this.rowAddButton || !this.rowAddButtonSplit) return;
    const targetNode = $(event.target);
    const itemNode = targetNode.closest(Template.ROWS_HEADER_ITEM_CLASS);
    if (itemNode.length === 0) return;
    const items = this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS).toArray();
    const height = itemNode.height();
    let top = itemNode.get().offsetTop;
    const index = items.findIndex((item) => item.equal(itemNode));
    const isEnd = event.offsetY > height / 2 || targetNode.hasClass('rows-trigger');
    if (isEnd) {
      top += height;
    }
    this.moveRowIndex = index;
    this.rowAddButton.show('flex');
    this.rowAddButton.css('top', `${top}px`);
    this.rowAddAlign = isEnd ? 'down' : 'up';
    const viewportElement = this.viewport && this.viewport.get();
    const splitWidth = ((this.table.selection.tableModel && this.table.selection.tableModel.width) || 0) + itemNode.width() + 4;
    let width = Math.min(viewportElement.offsetWidth + 4, splitWidth);
    this.rowAddButtonSplit.css('width', `${width}px`);
  }

  onMouseDownColsHeader = (event) => {
    const trigger = $(event.target || []).closest(Template.COLS_HEADER_TRIGGER_CLASS);
    if (trigger.length === 0) {
      if (event instanceof MouseEvent && event.button === 2) {
        this.showContextMenu(event);
      }
      return;
    }
    this.startChangeCol(trigger, event);
  };

  onMouseDownRowsHeader = (event) => {
    const trigger = $(event.target || []).closest(Template.ROWS_HEADER_TRIGGER_CLASS);
    if (trigger.length === 0) {
      if (event instanceof MouseEvent && event.button === 2) {
        this.showContextMenu(event);
      }
      return;
    }
    this.startChangeRow(trigger, event);
  };

  onClickColsHeader = (event) => {
    const selection = this.table.selection;
    const trigger = $(event.target || []).closest(Template.COLS_HEADER_TRIGGER_CLASS);
    if (trigger.length > 0) return;
    const colHeader = $(event.target || []).closest(Template.COLS_HEADER_ITEM_CLASS);
    if (colHeader.length === 0) return;
    const index = this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS).toArray().findIndex((item) => item.equal(colHeader));
    if (index === undefined) return;
    selection.selectCol(index);
  };

  onClickRowsHeader = (event) => {
    const selection = this.table.selection;
    const trigger = $(event.target || []).closest(Template.ROWS_HEADER_TRIGGER_CLASS);
    if (trigger.length > 0) return;
    const rowHeader = $(event.target || []).closest(Template.ROWS_HEADER_ITEM_CLASS);
    if (rowHeader.length === 0) return;
    const index = this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS).toArray().findIndex((item) => item.equal(rowHeader));
    if (index === undefined) return;
    selection.selectRow(index);
  };

  onClickTableHeader = (event) => {
    event.preventDefault();
    const selection = this.table.selection;
    if (this.tableHeader && this.tableHeader.hasClass('selected')) {
      selection.clearSelect();
    } else {
      const tableModel = selection.tableModel;
      if (!tableModel) return;
      selection.select({row: 0, col: 0}, {row: tableModel.rows - 1, col: tableModel.cols - 1});
    }
  };

  /**
   * 激活表头状态
   * @returns
   */
  activeHeader() {
    const selectArea = this.table.selection.getSelectArea();
    this.clearActiveStatus();
    const colBars = this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS);
    const rowBars = this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS);
    const {begin, end, allCol, allRow} = selectArea;
    if (rowBars) {
      for (let r = begin.row; r <= end.row; r++) {
        if (allCol) {
          const bar = rowBars[r];
          if (bar && !bar.classList.contains('selected')) {
            bar.classList.add('selected');
          }
          if (allRow && bar && !bar.classList.contains('no-dragger')) {
            bar.classList.add('no-dragger');
          }
        }
      }
    }
    if (colBars) {
      for (let c = begin.col; c <= end.col; c++) {
        if (allRow) {
          const bar = colBars[c];
          if (bar && !bar.classList.contains('selected')) {
            bar.classList.add('selected');
          }
          if (allCol && bar && !bar.classList.contains('no-dragger')) {
            bar.classList.add('no-dragger');
          }

        }
      }
    }
    const tableHeaderElement = this.tableHeader && this.tableHeader.get();
    if (allCol && allRow) {
      if (tableHeaderElement && !tableHeaderElement.classList.contains('selected')) {
        tableHeaderElement.classList.add('selected');
      }
    } else {
      if (tableHeaderElement && tableHeaderElement.classList.contains('selected')) {
        tableHeaderElement.classList.remove('selected');
      }
    }
    if (allCol && !allRow) {
      const tr = this.tableRoot && this.tableRoot.find('tr').eq(begin.row);
      if (tr) {
        const top = tr.get().offsetTop;
        this.rowDeleteButton && this.rowDeleteButton.show('flex');
        this.rowDeleteButton && this.rowDeleteButton.css('top', `${top - this.rowDeleteButton.height()}px`);
      }
    } else {
      this.rowDeleteButton && this.rowDeleteButton.hide();
    }
    if (!allCol && allRow) {
      let width = 0;
      for (let c = begin.col; c <= end.col; c++) {
        width += colBars && colBars.eq(c) ? colBars.eq(c).width() : 0;
      }
      const left = colBars && colBars.eq(begin.col) ? colBars.eq(begin.col).get().offsetLeft : 0;
      this.colDeleteButton && this.colDeleteButton.show('flex');
      this.colDeleteButton && this.colDeleteButton.css('left', `${left + width / 2}px`);
    } else {
      this.colDeleteButton && this.colDeleteButton.hide();
    }
  }

  clearActiveStatus() {
    const colBars = this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS);
    const rowBars = this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS);
    colBars && colBars.each((bar) => {
      const barElement = bar;
      if (barElement.classList.contains('selected')) {
        barElement.classList.remove('selected');
      }
      if (barElement.classList.contains('no-dragger')) {
        barElement.classList.remove('no-dragger');
      }
    });
    rowBars && rowBars.each((bar) => {
      const barElement = bar;
      if (barElement.classList.contains('selected')) {
        barElement.classList.remove('selected');
      }
      if (barElement.classList.contains('no-dragger')) {
        barElement.classList.remove('no-dragger');
      }
    });
    const tableHeader = this.tableHeader && this.tableHeader.get();
    if (tableHeader && tableHeader.classList.contains('selected')) {
      tableHeader.classList.remove('selected');
    }
  }

  refresh(refershSize = true) {
    this.renderColBars(refershSize);
    this.renderRowBars(refershSize);
    this.activeHeader();
  }

  startChangeCol(trigger, event) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.colsHeader) return;
    const currentCol = trigger.parent();
    const currentColElement = currentCol.get();
    this.table.selection.clearSelect();
    this.dragging = {
      x: event instanceof MouseEvent ? event.clientX : event.touches[0].clientX,
      y: -1
    };
    const cols = this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS);
    const colArray = cols.toArray();
    let index = 0;
    const colsWidths = [];
    for (let i = 0; i < colArray.length; i++) {
      const colNode = colArray[i];
      if (colNode.equal(currentCol)) {
        index = i;
      }
      colsWidths.push(removeUnit(colNode.css('width')));
    }
    this.changeSize = {
      trigger: {
        element: trigger,
        height: removeUnit(getComputedStyle(trigger.get(), 'height')),
        width: removeUnit(getComputedStyle(trigger.get(), 'width'))
      },
      element: currentCol,
      width: removeUnit(getComputedStyle(currentColElement, 'width')),
      height: -1,
      index: index,
      colsWidths: colsWidths,
      table: {
        width: (this.table.selection.tableModel && this.table.selection.tableModel.width) || 0,
        height: (this.table.selection.tableModel && this.table.selection.tableModel.height) || 0
      }
    };
    this.bindChangeSizeEvent();
  }

  startChangeRow(trigger, event) {
    event.stopPropagation();
    event.preventDefault();
    const row = trigger.parent();
    const rowElement = row.get();
    this.table.selection.clearSelect();
    this.dragging = {
      x: -1,
      y: event instanceof MouseEvent ? event.clientY : event.touches[0].clientY
    };
    const index = (this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS).toArray().findIndex((item) => item.equal(row))) || 0;
    this.changeSize = {
      trigger: {
        element: trigger,
        height: removeUnit(getComputedStyle(trigger.get(), 'height')),
        width: removeUnit(getComputedStyle(trigger.get(), 'width'))
      },
      element: row,
      width: -1,
      height: removeUnit(getComputedStyle(rowElement, 'height')),
      index: index,
      table: {
        width: (this.table.selection.tableModel && this.table.selection.tableModel.width) || 0,
        height: (this.table.selection.tableModel && this.table.selection.tableModel.height) || 0
      }
    };
    this.bindChangeSizeEvent();
  }

  bindChangeSizeEvent() {
    this.colsHeader && this.colsHeader.addClass('resize');
    this.rowsHeader && this.rowsHeader.addClass('resize');
    document.addEventListener(isMobile ? 'touchmove' : 'mousemove', this.onChangeSize);
    document.addEventListener(isMobile ? 'touchend' : 'mouseup', this.onChangeSizeEnd);
    if (!isMobile) {
      document.addEventListener('mouseleave', this.onChangeSizeEnd);
    }
  }

  unbindChangeSizeEvent() {
    this.colsHeader && this.colsHeader.removeClass('resize');
    this.rowsHeader && this.rowsHeader.removeClass('resize');
    document.removeEventListener(isMobile ? 'touchmove' : 'mousemove', this.onChangeSize);
    document.removeEventListener(isMobile ? 'touchend' : 'mouseup', this.onChangeSizeEnd);
    if (!isMobile) {
      document.removeEventListener('mouseleave', this.onChangeSizeEnd);
    }
  }

  onChangeSize = (event) => {
    if (!this.dragging) return;
    if (this.dragging.y > -1) {
      this.onChangeRowHeight(event);
    } else if (this.dragging.x > -1) {
      this.onChangeColWidth(event);
    }
    this.emit('sizeChanging');
  };

  onChangeColWidth(event) {
    if (!this.dragging || !this.changeSize) return;
    const containerWidth = this.table.root.width();
    const delta = (event instanceof MouseEvent ? event.clientX : event.touches[0].clientX) - this.dragging.x;
    let colWidth = Math.max(this.COL_MIN_WIDTH, this.changeSize.width + delta);
    let tableWidth = this.changeSize.table.width + (colWidth - this.changeSize.width);
    const cols = this.tableRoot && this.tableRoot.find('col');
    if (!this.table.enableScroll && cols) {
      const minColWidth = this.table.colMinWidth;
      const colsWidths = (this.changeSize.colsWidths ? this.changeSize.colsWidths.slice() : []);
      const start = this.changeSize.index;
      if (start < colsWidths.length - 1) {
        colWidth = Math.min(colsWidths[start] + colsWidths[start + 1] - minColWidth, colWidth);
        let nextW = colsWidths[start + 1] - delta;
        nextW = Math.max(nextW, minColWidth);
        nextW = Math.min(colsWidths[start] + colsWidths[start + 1] - minColWidth, nextW);
        colsWidths[start + 1] = nextW;
        this.changeSize.element.next() && this.changeSize.element.next().css('width', nextW + 'px');
        cols && cols.eq(start + 1) && cols.eq(start + 1).attributes('width', nextW);
      } else {
        const otherWidth = colsWidths.reduce((a, b, i) => (i !== start ? a + b : a), 0);
        colWidth = Math.min(containerWidth - otherWidth, colWidth);
      }
      colsWidths[start] = colWidth;
      this.changeSize.element.css('width', colWidth + 'px');
      cols && cols.eq(start) && cols.eq(start).attributes('width', colWidth);
      tableWidth = Math.min(colsWidths.reduce((a, b) => a + b, 0), containerWidth);
    } else {
      this.changeSize.element.css('width', colWidth + 'px');
      cols && cols.eq(this.changeSize.index) && cols.eq(this.changeSize.index).attributes('width', colWidth);
    }
    if (this.table.enableScroll) {
      const currentElement = this.changeSize.element.get();
      const viewportElement = this.viewport && this.viewport.get();
      const currentColRightSide = currentElement.offsetLeft + currentElement.offsetWidth;
      if (currentColRightSide - viewportElement.scrollLeft + 20 > viewportElement.offsetWidth) {
        viewportElement.scrollLeft = currentColRightSide + 20 - viewportElement.offsetWidth;
      } else if (viewportElement.scrollLeft + viewportElement.offsetWidth === viewportElement.scrollWidth) {
        viewportElement.scrollLeft = Math.max(0, tableWidth + 34 - viewportElement.offsetWidth);
      }
    }
    this.clearActiveStatus();
    this.hideContextMenu();
    this.renderRowBars();
    this.renderColSplitBars(this.changeSize.element, this.changeSize.trigger.element);
    this.tableRoot && this.tableRoot.css('width', `${tableWidth}px`);
    this.colsHeader && this.colsHeader.css('width', `${tableWidth}px`);
  }

  onChangeRowHeight(event) {
    if (!this.dragging || !this.changeSize) return;
    let height = (event instanceof MouseEvent ? event.clientY : event.touches[0].clientY) - this.dragging.y;
    const rowHeight = Math.max(this.ROW_MIN_HEIGHT, this.changeSize.height + height);
    height = rowHeight - this.changeSize.height;
    this.changeSize.element.css('height', rowHeight + 'px');
    this.clearActiveStatus();
    this.hideContextMenu();
    this.renderRowSplitBars(this.changeSize.element, this.changeSize.trigger.element);
    this.tableRoot && this.tableRoot.find('tr').eq(this.changeSize.index).css('height', `${rowHeight}px`);
  }

  renderColSplitBars(col, trigger) {
    const tableHeight = (this.table.selection.tableModel && this.table.selection.tableModel.height) || 0;
    trigger.addClass('dragging').css('height', `${tableHeight + col.height()}px`);
  }

  renderRowSplitBars(row, trigger) {
    const viewportElement = this.viewport && this.viewport.get();
    const tableWidth = (this.table.selection.tableModel && this.table.selection.tableModel.width) || 0;
    const width = Math.min(viewportElement.offsetWidth - row.width(), tableWidth);
    trigger.addClass('dragging').css('width', `${width + row.width()}px`);
  }

  onChangeSizeEnd = (event) => {
    if (event.type === 'mouseleave' && this.table.getCenter().contains(event.toElement)) {
      return;
    }
    if (this.dragging && this.changeSize) {
      const {width, height, element} = this.changeSize.trigger;
      element.removeClass('dragging');
      if (this.dragging.x > -1) element.css('height', `${height}px`);
      if (this.dragging.y > -1) element.css('width', `${width}px`);
      this.dragging = undefined;
      this.renderRowBars();
      this.emit('sizeChanged');
    }
    this.unbindChangeSizeEvent();
  };

  onDragStartColsHeader = (event) => {
    event.stopPropagation();
    const {selection} = this.table;
    const selectArea = selection.getSelectArea();
    if (!event.target || !selectArea.allRow) return;
    const colBar = $(event.target).closest(Template.COLS_HEADER_ITEM_CLASS);
    if (colBar.length === 0) return;
    const index = this.colsHeader
      ? this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS)
        .toArray()
        .findIndex((item) => item.equal(colBar))
      : undefined;
    if (index === undefined) return;
    const dragCol = index;
    if (dragCol < selectArea.begin.col || dragCol > selectArea.end.col) return;
    this.draggingHeader = {
      element: colBar,
      minIndex: selectArea.begin.col,
      maxIndex: selectArea.end.col,
      count: selectArea.end.col - selectArea.begin.col + 1
    };
    colBar.addClass('dragging');
    colBar
      .find('.drag-info')
      .html(
        this.editor.language
          .get('table', 'draggingCol')
          .replace('$data', this.draggingHeader.count.toString())
      );
    this.colsHeader && this.colsHeader.addClass('dragging');
    this.table.helper.fixDragEvent(event);
    this.bindDragColEvent();
  };

  onDragStartRowsHeader = (event) => {
    event.stopPropagation();
    const {selection} = this.table;
    const selectArea = selection.getSelectArea();
    if (!event.target || !selectArea.allCol) return;
    const rowBar = $(event.target).closest(Template.ROWS_HEADER_ITEM_CLASS);
    if (rowBar.length === 0) return;
    const index = this.rowsHeader
      ? this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS)
        .toArray()
        .findIndex((item) => item.equal(rowBar))
      : undefined;
    if (index === undefined) return;
    const dragRow = index;
    if (dragRow < selectArea.begin.row || dragRow > selectArea.end.row) return;
    this.draggingHeader = {
      element: rowBar,
      minIndex: selectArea.begin.row,
      maxIndex: selectArea.end.row,
      count: selectArea.end.row - selectArea.begin.row + 1
    };
    rowBar.addClass('dragging');
    rowBar
      .find('.drag-info')
      .html(
        this.editor.language
          .get('table', 'draggingRow')
          .replace('$data', this.draggingHeader.count.toString())
      );
    this.rowsHeader && this.rowsHeader.addClass('dragging');
    this.table.helper.fixDragEvent(event);
    this.bindDragRowEvent();
  };

  bindDragColEvent() {
    const {wrapper} = this.table;
    wrapper && wrapper.on('dragover', this.onDragCol);
    wrapper && wrapper.on('drop', this.onDragColEnd);
    wrapper && wrapper.on('dragend', this.onDragColEnd);
  }

  unbindDragColEvent() {
    const {wrapper} = this.table;
    const colBars = this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS);
    colBars && colBars.removeClass('dragging');
    this.colsHeader && this.colsHeader.removeClass('dragging');
    wrapper && wrapper.off('dragover', this.onDragCol);
    wrapper && wrapper.off('drop', this.onDragColEnd);
    wrapper && wrapper.off('dragend', this.onDragColEnd);
  }

  bindDragRowEvent() {
    const {wrapper} = this.table;
    wrapper && wrapper.on('dragover', this.onDragRow);
    wrapper && wrapper.on('drop', this.onDragRowEnd);
    wrapper && wrapper.on('dragend', this.onDragRowEnd);
  }

  unbindDragRowEvent() {
    const {wrapper} = this.table;
    const rowBars = this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS);
    rowBars && rowBars.removeClass('dragging');
    this.rowsHeader && this.rowsHeader.removeClass('dragging');
    wrapper && wrapper.off('dragover', this.onDragRow);
    wrapper && wrapper.off('drop', this.onDragRowEnd);
    wrapper && wrapper.off('dragend', this.onDragRowEnd);
  }

  showPlaceHolder(dropIndex, isNext) {
    if (!this.draggingHeader) return;
    const {element, minIndex, maxIndex} = this.draggingHeader;
    if (element.closest(Template.COLS_HEADER_CLASS).length > 0) {
      if (dropIndex === this.draggingHeader.index) return;
      if (minIndex <= dropIndex && dropIndex <= maxIndex + 1) {
        delete this.draggingHeader.index;
        delete this.draggingHeader.isNext;
        this.placeholder && this.placeholder.css('display', 'none');
        return;
      }
      this.draggingHeader.isNext = isNext;
      this.draggingHeader.index = dropIndex;
      const colBars = this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS);
      if (!colBars) return;
      const left =
        this.draggingHeader.index !== colBars.length
          ? colBars.eq(this.draggingHeader.index).get().offsetLeft + 2
          : colBars.eq(this.draggingHeader.index - 1).get().offsetLeft +
          colBars.eq(this.draggingHeader.index - 1).get().offsetWidth +
          2;
      const viewportElement = this.viewport && this.viewport.get();
      if (left < viewportElement.scrollLeft) {
        viewportElement.scrollLeft = left - 5;
      }
      if (left > viewportElement.scrollLeft + viewportElement.offsetWidth) {
        viewportElement.scrollLeft = left - viewportElement.offsetWidth + 5;
      }
      const height = ((this.table.selection.tableModel && this.table.selection.tableModel.height) || 0) + colBars.height();
      const paddingTop = this.viewport && this.viewport.css('padding-top');
      const paddingLeft = (this.viewport && this.viewport.css('padding-left')) || '0';
      this.placeholder && this.placeholder.css('width', '2px');
      this.placeholder && this.placeholder.css('height', `${height}px`);
      this.placeholder && this.placeholder.css('left', left - 4 + removeUnit(paddingLeft) + 'px');
      this.placeholder && this.placeholder.css('top', paddingTop);
      this.placeholder && this.placeholder.css('display', 'block');
    } else if (element.closest(Template.ROWS_HEADER_CLASS).length > 0) {
      if (dropIndex === this.draggingHeader.index) return;
      if (minIndex <= dropIndex && dropIndex <= maxIndex + 1) {
        delete this.draggingHeader.index;
        delete this.draggingHeader.isNext;
        this.placeholder && this.placeholder.css('display', 'none');
        return;
      }
      this.draggingHeader.index = dropIndex;
      this.draggingHeader.isNext = isNext;
      const rowBars = this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS);
      if (!rowBars) return;
      const top =
        this.draggingHeader.index !== rowBars.length
          ? rowBars.eq(this.draggingHeader.index).get().offsetTop + 2
          : rowBars.eq(this.draggingHeader.index - 1).get().offsetTop +
          rowBars.eq(this.draggingHeader.index - 1).get().offsetHeight - 2;
      const width = (this.table.selection.tableModel && this.table.selection.tableModel.width) || 0;
      const paddingTop = this.viewport && this.viewport.css('padding-top');
      const paddingLeft = (this.viewport && this.viewport.css('padding-left')) || '0';
      this.placeholder && this.placeholder.css('height', '2px');
      this.placeholder && this.placeholder.css('width', `${width}px`);
      this.placeholder && this.placeholder.css('left', paddingLeft);
      this.placeholder && this.placeholder.css('top', top + removeUnit(paddingTop || '0') + (this.colsHeader ? this.colsHeader.height() : 0) - 2 + 'px');
      this.placeholder && this.placeholder.css('display', 'block');
    }
  }

  onDragCol = (event) => {
    event.stopPropagation();
    if (!this.draggingHeader || !event.target) return;
    if (this.dragging === undefined) {
      this.dragging = {
        x: event.offsetX,
        y: event.offsetY
      };
    }
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    if (Math.abs(this.dragging.x - event.offsetX) < 3) return;
    this.dragging.x = event.offsetX;
    this.draggingHeader.element.removeClass('dragging');
    const td = $(event.target).closest('td');
    const colBar = $(event.target).closest(Template.COLS_HEADER_ITEM_CLASS);
    if (td.length === 0 && colBar.length === 0) return;
    if (colBar.length > 0) {
      const index = this.colsHeader
        ? this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS)
          .toArray()
          .findIndex((item) => item.equal(colBar))
        : undefined;
      if (index === undefined) return;
      const currentCol = index;
      const _dropCol =
        event.offsetX > colBar.get().offsetWidth / 2 ? currentCol + 1 : currentCol;
      this.showPlaceHolder(_dropCol, _dropCol !== currentCol);
      return;
    }
    const colBars = this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS);
    if (!colBars) return;
    const tdElement = td.get();
    const colSpan = tdElement.colSpan;
    const [col] = this.table.selection.getCellPoint(td);
    let dropCol = col;
    let _passWidth = 0;
    for (let i = 0; i < colSpan; i++) {
      const colElement = colBars.eq(col + i).get();
      if (_passWidth + colElement.offsetWidth / 2 > event.offsetX) {
        dropCol = col + i;
        break;
      }
      if (_passWidth + colElement.offsetWidth > event.offsetX) {
        dropCol = col + i + 1;
        break;
      }
      _passWidth += colElement.offsetWidth;
    }
    this.showPlaceHolder(dropCol, dropCol !== col);
  };

  onDragColEnd = () => {
    this.unbindDragColEvent();
    const {index, count, isNext} = this.draggingHeader || {};
    if (!this.draggingHeader || index === undefined || count === undefined) return;
    const {command, selection} = this.table;
    const selectArea = selection.getSelectArea();
    const colBars = this.table.wrapper && this.table.wrapper.find(Template.COLS_HEADER_ITEM_CLASS);
    if (!colBars) return;
    let widths = [];
    for (let c = selectArea.begin.col; c <= selectArea.end.col; c++) {
      widths.push(colBars.eq(c).get().offsetWidth || 0);
    }
    command.mockCopy();
    if (selectArea.begin.col > index) {
      const targetIndex = isNext ? index - 1 : index;
      command.removeCol();
      command.insertColAt(targetIndex, count, isNext, widths, true);
      selection.selectCol(targetIndex, targetIndex + count - 1);
      command.mockPaste(true);
    } else {
      command.removeCol();
      const targetIndex = (isNext ? index - 1 : index) - count;
      command.insertColAt(targetIndex, count, isNext, widths, true);
      selection.selectCol(targetIndex + 1, targetIndex + count);
      command.mockPaste(true);
    }
    this.placeholder && this.placeholder.css('display', 'none');
    this.draggingHeader = undefined;
    this.dragging = undefined;
  };

  onDragRow = (event) => {
    event.stopPropagation();
    if (!this.draggingHeader || !event.target) return;
    if (this.dragging === undefined) {
      this.dragging = {
        x: event.offsetX,
        y: event.offsetY
      };
    }
    if (Math.abs(this.dragging.y - event.offsetY) < 3) return;
    this.dragging.y = event.offsetY;
    this.draggingHeader.element.removeClass('dragging');
    const td = $(event.target).closest('td');
    const rowBar = $(event.target).closest(Template.ROWS_HEADER_ITEM_CLASS);
    if (td.length === 0 && rowBar.length === 0) return;
    if (rowBar.length > 0) {
      const index = this.rowsHeader
        ? this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS)
          .toArray()
          .findIndex((item) => item.equal(rowBar))
        : undefined;
      if (index === undefined) return;
      const currentRow = index;
      const _dropRow =
        event.offsetY > rowBar.get().offsetHeight / 2 ? currentRow + 1 : currentRow;
      this.showPlaceHolder(_dropRow, _dropRow !== currentRow);
      return;
    }
    const rowBars = this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS);
    if (!rowBars) return;
    const rowSpan = td.get().rowSpan;
    const [row] = this.table.selection.getCellPoint(td);
    let dropRow = row;
    let _passHeight = 0;
    for (let i = 0; i < rowSpan; i++) {
      const rowElement = rowBars[row + i];
      if (_passHeight + rowElement.offsetHeight / 2 > event.offsetY) {
        dropRow = row + i;
        break;
      }
      if (_passHeight + rowElement.offsetHeight > event.offsetY) {
        dropRow = row + i + 1;
        break;
      }
      _passHeight += rowElement.offsetHeight;
    }
    this.showPlaceHolder(dropRow, dropRow !== row);
  };

  onDragRowEnd = () => {
    this.unbindDragRowEvent();
    const {index, count, isNext} = this.draggingHeader || {};
    if (!this.draggingHeader || index === undefined || count === undefined) return;
    const {command, selection} = this.table;
    const selectArea = selection.getSelectArea();
    const {begin} = selectArea;
    command.mockCopy();
    if (begin.row > index) {
      const targetIndex = isNext ? index - 1 : index;
      command.removeRow();
      command.insertRowAt(targetIndex, count, !isNext, true);
      selection.selectRow(index, index + count - 1);
      command.mockPaste(true);
    } else {
      command.removeRow();
      const targetIndex = (isNext ? index - 1 : index) - count;
      command.insertRowAt(targetIndex, count, !isNext, true);
      selection.selectRow(targetIndex + 1, targetIndex + count);
      command.mockPaste(true);
    }
    this.placeholder && this.placeholder.css('display', 'none');
    this.draggingHeader = undefined;
    this.dragging = undefined;
  };

  removeRow(index) {
    const rowsHeaderItem = this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS);
    const item = rowsHeaderItem && rowsHeaderItem.eq(index) && rowsHeaderItem.eq(index).get();
    if (item) this.rowsHeader && this.rowsHeader.get().removeChild(item);
  }

  removeCol(index) {
    const colsHeaderItem = this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS);
    const headerElement = this.colsHeader && this.colsHeader.get();
    const item = colsHeaderItem && colsHeaderItem.eq(index) && colsHeaderItem.eq(index).get();
    if (!headerElement || !item) return;
    this.colsHeader && this.colsHeader.css('width', headerElement.offsetWidth - item.offsetWidth + 'px');
    headerElement.removeChild(item);
    this.tableRoot && this.tableRoot.css('width', this.colsHeader && this.colsHeader.css('width'));
  }

  // 记录菜单节点，避免重复绑定 input 事件
  menuSets = new WeakSet();

  showContextMenu(event) {
    const editor = this.editor;
    if (!this.menuBar || !event.target || !this.table.wrapper || !editor.scrollNode) return;
    event.preventDefault();
    const {selection} = this.table;
    const menuItems = this.menuBar.find(Template.MENUBAR_ITEM_CLASS);
    menuItems.removeClass('disabled');
    menuItems.each((menu) => {
      const menuNode = $(menu);
      const action = menuNode.attributes('data-action');
      if (this.getMenuDisabled(action)) {
        menuNode.addClass('disabled');
      } else {
        const inputNode = menuNode.find(`input${Template.MENUBAR_ITEM_INPUT_CALSS}`);
        if (inputNode.length === 0) return;
        const inputElement = inputNode.get();
        if (!this.menuSets.has(menu)) {
          this.menuSets.add(menu);
          inputNode
            .on('blur', () => {
              inputElement.value = Math.min(parseInt(inputElement.value, 10) || 1, this.MAX_INSERT_NUM).toString();
            })
            .on('keydown', (event) => {
              if (isHotkey('enter', event)) {
                this.handleTriggerMenu(menuNode);
              }
            });
          inputNode.on('mousedown', this.onMenuInputMousedown);
        }
        const selectArea = selection.getSelectArea();
        const isInsertCol = ['insertColLeft', 'insertColRight'].indexOf(action) > -1;
        const isInsertRow = ['insertRowUp', 'insertRowDown'].indexOf(action) > -1;
        if (isInsertCol) {
          inputElement.value = `${selectArea.end.col - selectArea.begin.col + 1}`;
        }
        if (isInsertRow) {
          inputElement.value = `${selectArea.end.row - selectArea.begin.row + 1}`;
        }
      }
    });
    const splits = this.menuBar.find('div.split');
    splits.each((splitNode) => {
      const split = $(splitNode);
      let prev = split.prev();
      while (prev) {
        if (prev.hasClass('split')) {
          split.remove();
          break;
        }
        if (!prev.hasClass('disabled')) break;
        prev = prev.prev();
      }
      if (!prev) split.remove();
    });
    const tartgetNode = $(event.target);
    let prevRect = tartgetNode.getBoundingClientRect() || {top: 0, left: 0};
    let parentNode = tartgetNode.parent();
    let top = 0;
    let left = 0;
    while (parentNode && parentNode.closest(Template.TABLE_WRAPPER_CLASS).length > 0) {
      const rect = parentNode.getBoundingClientRect() || {top: 0, left: 0};
      top += prevRect.top - rect.top;
      left += prevRect.left - rect.left;
      prevRect = rect;
      parentNode = parentNode.parent();
    }
    const wrapperRect = this.table.wrapper.get().getBoundingClientRect();
    const viewport = editor.scrollNode.getViewport();
    top += event.offsetY;
    const menuHeight = this.menuBar.height();
    const allTop = wrapperRect.top + top + menuHeight + 4;
    if (allTop > viewport.bottom) {
      let diff = allTop - viewport.bottom;
      if (top - diff < 0 && wrapperRect.top + top - diff < viewport.top) {
        diff = wrapperRect.top + top - viewport.top;
      }
      top -= diff;
    }
    this.menuBar.css('left', left + event.offsetX + 'px');
    this.menuBar.css('top', top + 'px');
    this.contextVisible = true;
  }

  onMenuInputMousedown = (event) => {
    event.stopPropagation();
  };

  hideContextMenu() {
    if (!this.contextVisible) return;
    const menuItems = this.menuBar && this.menuBar.find(Template.MENUBAR_ITEM_CLASS);
    menuItems && menuItems.removeClass('disabled');
    this.contextVisible = false;
    this.menuBar && this.menuBar.css({top: '-99999px', left: '-99999px'});
  }

  getMenuDisabled(action) {
    const {selection, command} = this.table;
    switch (action) {
      case 'cut':
      case 'copy':
        return !selection.selectArea || selection.selectArea.count <= 1;
      case 'splitCell':
        return !selection.hasMergeCell();
      case 'mergeCell':
        return !selection.selectArea;
      case 'mockPaste':
        return !command.hasCopyData();
      case 'removeCol':
      case 'insertColLeft':
      case 'insertColRight':
        return selection.isColSelected();
      case 'removeRow':
      case 'insertRowUp':
      case 'insertRowDown':
        return selection.isRowSelected();
      default:
        return false;
    }
  }

  handleClickMenu(event) {
    if (!event.target) return;
    const targetNode = $(event.target);
    const menu = targetNode.closest('.table-menubar-item');
    if (menu.length === 0 || targetNode.name === 'input') return;
    event.stopPropagation();
    this.handleTriggerMenu(menu);
  }

  handleTriggerMenu(menu) {
    if (!menu.hasClass('disabled')) {
      const action = menu.attributes('data-action');
      const inputNode = menu.find(`input${Template.MENUBAR_ITEM_INPUT_CALSS}`);
      let args;
      if (inputNode.length > 0) {
        args = Math.min(parseInt(inputNode.get().value || '1', 10), this.MAX_INSERT_NUM);
      }
      this.table.command[action](args);
    }
    this.hideContextMenu();
  }

  handleHoverMenu(event) {
    if (!event.target) return;
    const menu = $(event.target).closest('.table-menubar-item');
    if (menu.length === 0) return;
    event.stopPropagation();
    const {selection} = this.table;
    if (!menu.hasClass('disabled')) {
      const action = menu.attributes('data-action');
      switch (action) {
        case 'removeCol':
          this.handleHighlightCol();
          break;
        case 'removeRow':
          this.handleHighlightRow();
          break;
        case 'removeTable':
          this.handleHighlightTable();
          break;
        default:
          selection.hideHighlight();
      }
    }
  }

  hideHighlight(event) {
    event.stopPropagation();
    this.table.selection.hideHighlight();
  }

  handleHighlightRow = () => {
    const {selection} = this.table;
    const tableModel = selection.tableModel;
    if (!tableModel) return;
    const selectArea = {...selection.getSelectArea()};
    selectArea.allCol = true;
    selection.showHighlight(selectArea);
  };

  handleHighlightCol = () => {
    const {selection} = this.table;
    const tableModel = selection.tableModel;
    if (!tableModel) return;
    const selectArea = {...selection.getSelectArea()};
    selectArea.allRow = true;
    selection.showHighlight(selectArea);
  };

  handleHighlightTable = () => {
    const {selection} = this.table;
    const tableModel = selection.tableModel;
    if (!tableModel) return;
    const selectArea = {...selection.getSelectArea()};
    selectArea.allRow = true;
    selectArea.allCol = true;
    selectArea.begin = {row: 0, col: 0};
    selectArea.end = {row: tableModel.rows - 1, col: tableModel.cols - 1};
    selection.showHighlight(selectArea);
  };

  drawBackgroundColor(color) {
    const {selection, helper} = this.table;
    selection.each((cell) => {
      if (!helper.isEmptyModelCol(cell) && cell.element) {
        if (!color || color === 'transparent') {
          cell.element.style.removeProperty('background-color');
        } else {
          cell.element.style.backgroundColor = color;
        }
      }
    });
  }

  setAlign(align) {
    const {selection, helper} = this.table;
    selection.each((cell) => {
      if (!helper.isEmptyModelCol(cell) && cell.element) {
        if (!align || align === 'top') {
          cell.element.style.removeProperty('vertical-align');
        } else {
          cell.element.style.verticalAlign = align;
        }
      }
    });
  }

  destroy() {
    this.colsHeader && this.colsHeader.removeAllEvents();
    this.rowsHeader && this.rowsHeader.removeAllEvents();
    this.tableHeader && this.tableHeader.removeAllEvents();
    this.table.wrapper && this.table.wrapper.removeAllEvents();
    this.tableRoot && this.tableRoot.removeAllEvents();
    this.menuBar && this.menuBar.removeAllEvents();
    this.viewport && this.viewport.removeAllEvents();
    this.rowDeleteButton && this.rowDeleteButton.removeAllEvents();
    this.colDeleteButton && this.colDeleteButton.removeAllEvents();
    this.colAddButton && this.colAddButton.removeAllEvents();
    this.colsHeader && this.colsHeader.removeAllEvents();
    this.rowAddButton && this.rowAddButton.removeAllEvents();
    this.rowsHeader && this.rowsHeader.removeAllEvents();
  }
}

export default ControllBar;
