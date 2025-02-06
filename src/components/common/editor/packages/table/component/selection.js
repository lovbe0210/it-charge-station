import {EventEmitter2} from 'eventemitter2';
import {$, EDITABLE_SELECTOR, isEngine, isMobile, removeUnit} from '@aomao/engine';
import Template from './template';

class TableSelection extends EventEmitter2 {
  constructor(editor, table) {
    super();
    this.editor = editor;
    this.table = table;

    // 以下属性用于记录选区状态
    this.tableRoot = undefined;
    this.colsHeader = undefined;
    this.rowsHeader = undefined;
    this.tableHeader = undefined;
    this.tableModel = undefined;
    this.selectArea = undefined;
    this.selectRange = undefined; // { type: 'left'|'right'|'top'|'bottom', startOffset, endOffset }
    this.dragging = undefined; // 用于拖拽时记录信息
    this.isShift = false;
    this.prevMouseDownTd = undefined;
    this.prevOverTd = undefined;
    this.highlight = undefined;
    this.beginAllRow = undefined; // 第一次选中一行的行号
    this.beginAllCol = undefined; // 第一次选中一列的列号
  }

  init() {
    const {wrapper} = this.table;
    if (!wrapper) return;
    this.tableRoot = wrapper.find(Template.TABLE_CLASS);
    this.colsHeader = wrapper.find(Template.COLS_HEADER_CLASS);
    this.rowsHeader = wrapper.find(Template.ROWS_HEADER_CLASS);
    this.tableHeader = wrapper.find(Template.HEADER_CLASS);
    this.highlight = wrapper.find(Template.TABLE_HIGHLIGHT_CLASS);

    this.render('init');
    this.bindEvents();
  }

  render(action) {
    this.refreshModel();
    const tableModel = this.tableModel;
    if (!tableModel) return;
    const {begin, end} = this.getSelectArea();
    if (action === 'mergeCell' || action === 'splitCell') {
      const row = begin.row < 0 ? 0 : Math.min(begin.row, tableModel.rows - 1);
      const col = begin.col < 0 ? 0 : Math.min(begin.col, tableModel.cols - 1);
      let cell = tableModel.table[row][col];
      if (this.table.helper.isEmptyModelCol(cell)) {
        cell = tableModel.table[cell.parent.row][cell.parent.col];
      }
      if (!this.table.helper.isEmptyModelCol(cell) && cell.element) {
        if (action === 'mergeCell') {
          this.clearSelect();
          this.selectCellRange(cell.element);
        }
      }
    } else if (action === 'removeRow') {
      const row = begin.row < 0 ? 0 : Math.min(begin.row, tableModel.rows - 1);
      const cell = tableModel.table[row][0];
      if (!this.table.helper.isEmptyModelCol(cell) && cell.element) {
        this.focusCell(cell.element);
      }
    } else if (action === 'removeCol') {
      const col = begin.col < 0 ? 0 : Math.min(begin.col, tableModel.cols - 1);
      const cell = tableModel.table[0][col];
      if (!this.table.helper.isEmptyModelCol(cell) && cell.element) {
        this.focusCell(cell.element);
      }
    } else {
      this.select(begin, end);
    }
    this.renderBorder();
  }

  renderBorder() {
    const tableModel = this.tableModel;
    if (!tableModel) return;
    tableModel.table.forEach((cols, row) => {
      cols.forEach((cell, col) => {
        if (!this.table.helper.isEmptyModelCol(cell)) {
          if (!cell.element) return;
          // 根据合并情况判断当前单元格是否为最后一行或最后一列
          let isLastCol = col === tableModel.cols - 1;
          let isLastRow = row === tableModel.rows - 1;
          if (cell.isMulti) {
            if (col + cell.colSpan === tableModel.cols) isLastRow = true;
            if (row + cell.rowSpan === tableModel.rows) isLastCol = true;
          }
          if (isLastCol) {
            if (!cell.element.classList.contains('table-last-column')) {
              cell.element.classList.add('table-last-column');
            }
          } else if (cell.element.classList.contains('table-last-column')) {
            cell.element.classList.remove('table-last-column');
          }
          if (isLastRow) {
            if (!cell.element.classList.contains('table-last-row')) {
              cell.element.classList.add('table-last-row');
            }
          } else if (cell.element.classList.contains('table-last-row')) {
            cell.element.classList.remove('table-last-row');
          }
        }
      });
    });
  }

  bindEvents() {
    document.addEventListener('keydown', this.onShiftKeydown);
    document.addEventListener('keyup', this.onShiftKeyup);
    if (this.table.wrapper) {
      this.table.wrapper
        .on('mousedown', this.onTdMouseDown)
        .on('keydown', this.onKeydown);
    }
  }

  unbindEvents() {
    document.removeEventListener('keydown', this.onShiftKeydown);
    document.removeEventListener('keyup', this.onShiftKeyup);
    if (this.table.wrapper) {
      this.table.wrapper
        .off('mousedown', this.onTdMouseDown)
        .off('keydown', this.onKeydown);
    }
  }

  refreshModel() {
    if (!this.tableRoot || this.tableRoot.length === 0) return;
    this.tableModel = this.table.helper.getTableModel(this.tableRoot);
  }

  each(fn, reverse = false) {
    const tableModel = this.tableModel;
    if (!tableModel) return;
    const {begin, end} = this.getSelectArea();
    if (begin.row < 0 || begin.col < 0) return;
    if (reverse) {
      for (let r = end.row; r >= begin.row; r--) {
        for (let c = end.col; c >= begin.col; c--) {
          const tdModel = tableModel.table[r][c];
          fn(tdModel, r, c);
        }
      }
    } else {
      for (let r = begin.row; r <= end.row; r++) {
        for (let c = begin.col; c <= end.col; c++) {
          const tdModel = tableModel.table[r][c];
          fn(tdModel, r, c);
        }
      }
    }
  }

  getCellPoint(td) {
    if (td.name !== 'td') return [-1, -1];
    const row = td.parent() ? td.parent().index() : -1;
    if (row < 0) return [-1, -1];
    const tr = this.tableModel && this.tableModel.table[row];
    const col = tr ? tr.findIndex(cell => {
      // 若是空占位，取父单元格对应的元素
      const elem = this.table.helper.isEmptyModelCol(cell) && cell.parent ? this.tableModel.table[cell.parent.row][cell.parent.col].element : cell.element;
      return elem && td.equal($(elem));
    }) : -1;
    if (col < 0) return [-1, -1];
    return [row, col];
  }


  getCellIndex(row, col) {
    if (!this.tableModel) return 0;
    const trModel = this.tableModel.table[row];
    let index = 0;
    for (let i = 0; i < col; i++) {
      const tdModel = trModel[i];
      if (!this.table.helper.isEmptyModelCol(tdModel) && tdModel.element) {
        index++;
      }
    }
    return index;
  }

// 获取上一次鼠标按下的单元格（单选时即为选中的单元格）
  getSingleCell() {
    if (!this.prevMouseDownTd) return null;
    return this.prevMouseDownTd;
  }

  getSingleCellPoint() {
    const td = this.getSingleCell();
    if (!td) return [-1, -1];
    return this.getCellPoint(td);
  }

  getSelectArea() {
    if (this.selectArea) return this.selectArea;
    let curPoint = this.getSingleCellPoint();
    if (!this.tableModel || curPoint[0] === -1) {
      return {
        begin: {row: -1, col: -1},
        end: {row: -1, col: -1},
        count: 0,
        allCol: false,
        allRow: false
      };
    }

    const {cols, rows, table} = this.tableModel;
    let cell = table[curPoint[0]][curPoint[1]];
    if (this.table.helper.isEmptyModelCol(cell)) {
      cell = table[cell.parent.row][cell.parent.col];
      if (cell.element) curPoint = this.getCellPoint($(cell.element));
    }
    return {
      begin: {row: curPoint[0], col: curPoint[1]},
      end: {row: curPoint[0], col: curPoint[1]},
      count: curPoint[0] === -1 ? 0 : 1,
      allCol: cols === 1,
      allRow: rows === 1
    };
  }

  selectCol(begin, end = begin) {
    if (!this.tableModel) return;
    if (this.isShift) {
      if (this.beginAllCol !== undefined) {
        if (begin < this.beginAllCol) {
          end = this.beginAllCol;
        } else {
          begin = this.beginAllCol;
        }
      } else if (this.prevMouseDownTd) {
        const [col] = this.getCellPoint(this.prevMouseDownTd);
        begin = col;
        this.beginAllCol = col;
      } else if (this.selectArea) {
        begin = this.selectArea.begin.col;
        if (this.tableModel) {
          const tdModel = this.tableModel.table[this.selectArea.begin.row][this.selectArea.begin.col];
          if (!this.table.helper.isEmptyModelCol(tdModel) && tdModel.element) {
            this.focusCell(tdModel.element);
          }
        }
      }
    }
    this.select({row: 0, col: begin}, {row: this.tableModel.rows - 1, col: end});
  }

  selectRow(begin, end = begin) {
    if (!this.tableModel) return;
    if (this.isShift) {
      if (this.beginAllRow !== undefined) {
        if (begin < this.beginAllRow) {
          end = this.beginAllRow;
        } else {
          begin = this.beginAllRow;
        }
      } else if (this.prevMouseDownTd) {
        const [row] = this.getCellPoint(this.prevMouseDownTd);
        begin = row;
        this.beginAllRow = row;
      } else if (this.selectArea) {
        begin = this.selectArea.begin.row;
        if (this.tableModel) {
          const tdModel = this.tableModel.table[this.selectArea.begin.row][this.selectArea.begin.col];
          if (!this.table.helper.isEmptyModelCol(tdModel) && tdModel.element) {
            this.focusCell(tdModel.element);
          }
        }
      }
    }
    this.select({row: begin, col: 0}, {row: end, col: this.tableModel.cols - 1});
  }

  selectCell(begin, end) {
    if (begin.name !== 'td' || end.name !== 'td') return;
    const beginPoint = this.getCellPoint(begin);
    const endPoint = this.getCellPoint(end);
    this.select({row: beginPoint[0], col: beginPoint[1]}, {row: endPoint[0], col: endPoint[1]});
  }

  clearSelect() {
    this.select({row: -1, col: -1}, {row: -1, col: -1});
  }

  calcEdge(begin, end) {
    let beginRow = Math.min(begin.row, end.row);
    let endRow = Math.max(begin.row, end.row);
    let beginCol = Math.min(begin.col, end.col);
    let endCol = Math.max(begin.col, end.col);
    const calc = () => {
      if (!this.tableModel) {
        return {beginCol, beginRow, endCol, endRow};
      }
      for (let r = beginRow; r <= endRow; r++) {
        const row = this.tableModel.table[r];
        if (!row) continue;
        for (let c = beginCol; c <= endCol; c++) {
          const cell = row[c];
          if (!cell) continue;
          if (!this.table.helper.isEmptyModelCol(cell)) {
            if (c !== beginCol && cell.colSpan + c - 1 === beginCol) {
              beginCol = c;
              return calc();
            }
            if (r !== beginRow && cell.rowSpan + r - 1 === beginRow) {
              beginRow = r;
              return calc();
            }
            if (cell.rowSpan > 1 && endRow < cell.rowSpan - 1 + r) {
              endRow = cell.rowSpan - 1 + r;
              return calc();
            }
            if (cell.colSpan > 1 && endCol < cell.colSpan - 1 + c) {
              endCol = cell.colSpan - 1 + c;
              return calc();
            }
          } else {
            const parent = this.tableModel.table[cell.parent.row][cell.parent.col];
            if (this.table.helper.isEmptyModelCol(parent)) continue;
            if (parent.colSpan + cell.parent.col - 1 === beginCol && cell.parent.col < beginCol) {
              beginCol = cell.parent.col;
              return calc();
            }
            if (parent.rowSpan + cell.parent.row - 1 === beginRow && cell.parent.row < beginRow) {
              beginRow = cell.parent.row;
              return calc();
            }
            if (parent.rowSpan > 1 && endRow < parent.rowSpan - 1 + cell.parent.row) {
              endRow = parent.rowSpan - 1 + cell.parent.row;
              return calc();
            }
            if (parent.colSpan > 1 && endCol < parent.colSpan - 1 + cell.parent.col) {
              endCol = parent.colSpan - 1 + cell.parent.col;
              return calc();
            }
          }
        }
      }
      return {beginCol, beginRow, endCol, endRow};
    };
    return calc();
  }

  select(begin, end) {
    if (!this.tableModel) return;
    const isSame = begin.row === end.row && begin.col === end.col;
    this.tableRoot && this.tableRoot.find('td[table-cell-selection]').removeAttributes('table-cell-selection');

    const {beginRow, endRow, beginCol, endCol} = this.calcEdge(begin, end);
    let count = 0;
    if (beginRow >= 0 && beginCol >= 0 && endRow < this.tableModel.rows && endCol < this.tableModel.cols) {
      for (let r = beginRow; r <= endRow; r++) {
        for (let c = beginCol; c <= endCol; c++) {
          const row = this.tableModel.table[r];
          if (!row) continue;
          const col = row[c];
          if (!col) continue;
          if (!this.table.helper.isEmptyModelCol(col)) {
            if (!isSame && col.element) {
              $(col.element).attributes('table-cell-selection', 'true');
            }
            count++;
          }
        }
      }
    }
    if (isSame && begin.row > -1 && begin.col > -1) {
      const cell = this.tableModel.table[begin.row][begin.col];
      if (cell && !this.table.helper.isEmptyModelCol(cell) && cell.element && !this.prevMouseDownTd?.equal(cell.element)) {
        this.focusCell(cell.element);
      }
    }
    const allCol = beginCol === 0 && endCol === this.tableModel.cols - 1;
    const allRow = beginRow === 0 && endRow === this.tableModel.rows - 1;
    if (allCol && this.beginAllRow === undefined) {
      this.beginAllRow = beginRow;
    } else if (!allCol && this.beginAllRow !== undefined) {
      this.beginAllRow = undefined;
    }
    if (allRow && this.beginAllCol === undefined) {
      this.beginAllCol = beginCol;
    } else if (!allRow && this.beginAllCol !== undefined) {
      this.beginAllCol = undefined;
    }
    this.selectArea = count === 0 || isSame ? undefined : {
      begin: {row: beginRow, col: beginCol},
      end: {row: endRow, col: endCol},
      count,
      allCol,
      allRow
    };
    this.emit('select', this.selectArea);
  }

  focusCell(cell, start = false) {
    const editor = this.editor;
    if (!isEngine(editor)) return;
    const {change} = editor;
    if (typeof cell !== 'object' || !cell.find) {
      cell = $(cell);
    }
    const range = change.range.get();
    const editableElement = cell.find(EDITABLE_SELECTOR);
    if (editableElement.length > 0) {
      range.select(editableElement, true)
        .shrinkToElementNode()
        .shrinkToTextNode()
        .collapse(start);
      setTimeout(() => {
        change.range.select(range);
      }, 20);
      editableElement.get() && editableElement.get().focus();
      this.prevMouseDownTd = cell;
      this.selectCell(cell, cell);
    }
  }

  selectCellRange(cell) {
    const editor = this.editor;
    if (!isEngine(editor)) return;
    const {change} = editor;
    if (typeof cell !== 'object' || !cell.find) {
      cell = $(cell);
    }
    const range = change.range.get();
    const editableElement = cell.find(EDITABLE_SELECTOR);
    if (editableElement.length === 0) return;
    range.select(editableElement, true).shrinkToElementNode();
    const children = editableElement.children();
    const firstChildren = children.eq(0);
    if (children.length === 1 && firstChildren && firstChildren.first().name === 'br') {
      range.collapse(false);
      change.range.select(range);
      editableElement.get() && editableElement.get().focus();
    } else {
      change.range.select(range);
    }
    this.prevMouseDownTd = cell;
    this.selectCell(cell, cell);
  }

  onTdMouseDown = (event) => {
    this.selectRange = undefined;
    const editor = this.editor;
    if (!event.target || !isEngine(editor)) return;
    const target = $(event.target);
    const td = target.closest('td');
    if (td.length === 0 || !td.inEditor()) return;
    const range = editor.change.range.get();
    const [row, col] = this.getCellPoint(td);
    const isSelection = !!td.attributes('table-cell-selection');
    if (this.isShift) {
      let begin = {row: 0, col: 0};
      if (this.prevMouseDownTd) {
        const [r, c] = this.getCellPoint(this.prevMouseDownTd);
        begin = {row: r, col: c};
      } else if (this.selectArea) {
        begin = this.selectArea.begin;
        if (this.tableModel) {
          const tdModel = this.tableModel.table[begin.row][begin.col];
          if (!this.table.helper.isEmptyModelCol(tdModel) && tdModel.element) {
            this.prevMouseDownTd = $(tdModel.element);
          }
        }
      }
      this.select(begin, {row, col});
      return;
    } else {
      this.prevMouseDownTd = td;
      if (event instanceof MouseEvent && event.button !== 2) {
        this.select({row, col}, {row, col});
      }

    }
    if (target.name === 'td' &&
      (isSelection ||
        !range.startNode.closest('td').equal(td) ||
        !range.endNode.closest('td').equal(td))) {
      if (event instanceof MouseEvent && event.button === 2 && !!target.attributes('table-cell-selection')) {
        return;
      }
      event.preventDefault();
      this.focusCell(td);
    } else if (target.name === 'td') {
      event.preventDefault();
    }
    const next = () => {
      this.select({row, col}, {row, col});
      this.dragging = {trigger: {element: td}};
      this.addDragEvent();
    };
    if (event instanceof MouseEvent && event.button === 2) {
      if (target.attributes('table-cell-selection')) {
        event.preventDefault();
      }
      return;
    } else if (target.name === 'td') {
      const editableElement = td.find(EDITABLE_SELECTOR);
      if (editableElement.length > 0) {
        const block = editableElement.last();
        if (block) {
          if (!block.isBlockCard()) return next();
          if ((block.get().offsetTop || 0) + (block.get().clientHeight || 0) > (event instanceof MouseEvent ? event.clientY : event.touches[0].clientY)) {
            return next();
          }
          const node = $('<p><br /></p>');
          editableElement.append(node);
          const range = editor.change.range.get();
          range.select(node, true).collapse(false);
          editor.change.apply(range);
        }
      }
    }
    next();
  };

  addDragEvent() {
    this.tableRoot && this.tableRoot.addClass('drag-select');
    document.addEventListener(isMobile ? 'touchend' : 'mouseup', this.removeDragEvent, {passive: true});
    document.addEventListener(isMobile ? 'touchmove' : 'mousemove', this.onDragMove, {passive: true});
  }

  removeDragEvent = () => {
    this.tableRoot && this.tableRoot.removeClass('drag-select');
    this.table.wrapper && this.table.wrapper.removeClass('drag-selecting');
    document.removeEventListener(isMobile ? 'touchend' : 'mouseup', this.removeDragEvent);
    document.removeEventListener(isMobile ? 'touchmove' : 'mousemove', this.onDragMove);
    this.dragging = undefined;
  };

  onDragMove = (event) => {
    if (!this.dragging || !event.target) return;
    const dragoverTd = $(event.target).closest('td');
    if (dragoverTd.length === 0 || !dragoverTd.inEditor() || (this.prevOverTd && dragoverTd.equal(this.prevOverTd))) {
      return;
    }

    this.prevOverTd = dragoverTd;
    if (!this.dragging.trigger.element.equal(dragoverTd)) {
      this.table.wrapper && this.table.wrapper.addClass('drag-selecting');
      this.selectCell(this.dragging.trigger.element, dragoverTd);
    } else {
      this.table.wrapper && this.table.wrapper.removeClass('drag-selecting');
      this.clearSelect();
    }
  };

  onShiftKeydown = (event) => {
    if (!event.target || !this.tableModel || !isEngine(this.editor)) return;
    if (event.key === 'Shift') {
      this.isShift = true;
    }
  };

  onKeydown = (event) => {
    if (!event.target || !this.tableModel || !isEngine(this.editor)) return;
    const td = $(event.target).closest('td');
    if (td.length === 0 || !td.inEditor()) return;
    const [row, col] = this.getCellPoint(td);
    if (row < 0 || col < 0) return;
    if (event.key === 'Shift+ArrowLeft') {
      this.selectLeft(event, td);
    } else if (event.key === 'Shift+ArrowRight') {
      this.selectRigth(event, td);
    } else if (event.key === 'Shift+ArrowUp') {
      this.selectUp(event, td);
    } else if (event.key === 'Shift+ArrowDown') {
      this.selectDown(event, td);
    }
    if (event.key === 'Shift') {
      this.isShift = true;
    } else {
      if (this.selectRange) {
        this.isShift = false;
        this.selectRange = undefined;
      }
      if (
        event.key === 'Tab' ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      setTimeout(() => {
        this.clearSelect();
      }, 50);
    }
  };

  onShiftKeyup = (event) => {
    if (this.isShift === false && this.selectRange) {
      this.selectRange = undefined;
      this.clearSelect();
    }
    this.isShift = false;
  };

  selectLeft(event, td) {
    const editor = this.editor;
    if (!isEngine(editor)) return;
    const [row, col] = this.getCellPoint(td);
    if (row < 0 || col < 0) return;
    const count = this.selectArea ? this.selectArea.count : 0;
    const range = editor.change.range.get();
    if (count === 0) {
      if (this.selectRange && this.selectRange.type === 'left') {
        if (range.endOffset !== this.selectRange.startOffset) {
          return;
        }
      }
      this.selectRange = {
        type: 'left',
        startOffset: range.startOffset,
        endOffset: range.endOffset
      };
      const {startNode} = range;
      if (range.startOffset !== 0) {
        return;
      }
      if (startNode.prev()) return;
      let currentParent = startNode.parent();
      while (currentParent && !currentParent.isEditable()) {
        if (currentParent.prev()) return;
        currentParent = currentParent.parent();
      }
    }
    const begin = this.selectArea ? this.selectArea.begin : {row, col};
    const end = this.selectArea ? this.selectArea.end : {row, col};
    const isLeft = begin.col !== col;
    let triggerCol = isLeft ? begin.col - 1 : end.col - 1;
    if (triggerCol < 0) return;
    event.preventDefault();
    if (triggerCol === col && count === 2) {
      triggerCol = -1;
    }
    if (isLeft) {
      this.select({...begin, col: triggerCol}, end);
    } else {
      this.select(begin, {...end, col: triggerCol});
    }
  }

  selectRigth(event, td) {
    const editor = this.editor;
    if (!isEngine(editor) || !this.tableModel) return;
    event.stopPropagation();
    const [row, col] = this.getCellPoint(td);
    if (row < 0 || col < 0) return;
    const count = this.selectArea ? this.selectArea.count : 0;
    const range = editor.change.range.get();
    if (count === 0) {
      if (this.selectRange && this.selectRange.type === 'left') {
        if (range.startOffset !== this.selectRange.endOffset) {
          return;
        }
      }
      this.selectRange = {
        type: 'right',
        startOffset: range.startOffset,
        endOffset: range.endOffset
      };
      const {endNode} = range;
      if (endNode.isText() && range.endOffset !== endNode.text().length) {
        return;
      }
      const children = endNode.children();
      if (endNode.isElement() && range.endOffset !== children.length && endNode.last()?.name !== 'br') {
        return;
      }
      if (endNode.next()) return;
      let currentParent = endNode.parent();
      while (currentParent && !currentParent.isEditable()) {
        if (currentParent.next()) return;
        currentParent = currentParent.parent();
      }
    }
    const {cols} = this.tableModel;
    const begin = this.selectArea ? this.selectArea.begin : {row, col};
    const end = this.selectArea ? this.selectArea.end : {row, col};
    const isLeft = begin.col !== col;
    let triggerCol = isLeft ? begin.col + 1 : end.col + 1;
    if (triggerCol > cols - 1) return;
    event.preventDefault();
    if (triggerCol === col && count === 2) {
      triggerCol = -1;
    }
    if (isLeft) {
      this.select({...begin, col: triggerCol}, end);
    } else {
      this.select(begin, {...end, col: triggerCol});
    }
  }

  selectUp(event, td) {
    const editor = this.editor;
    if (!isEngine(editor) || !this.tableModel) return;
    const [row, col] = this.getCellPoint(td);
    if (row < 0 || col < 0) return;
    const count = this.selectArea ? this.selectArea.count : 0;
    const range = editor.change.range.get();
    if (count === 0) {
      if (this.selectRange && this.selectRange.type === 'bottom') {
        if (range.endOffset !== this.selectRange.startOffset) return;
      }
      this.selectRange = {
        type: 'top',
        startOffset: range.startOffset,
        endOffset: range.endOffset
      };
      const rangeRect = range.getBoundingClientRect();
      const tdRect = td.find(EDITABLE_SELECTOR).getBoundingClientRect();
      if (rangeRect.width !== 0 && rangeRect.height === 0 && rangeRect.top - (tdRect?.top || 0) > 10) {
        return;
      }
    }
    const begin = this.selectArea ? this.selectArea.begin : {row, col};
    const end = this.selectArea ? this.selectArea.end : {row, col};
    const isUp = begin.row !== row;
    let triggerRow = isUp ? begin.row - 1 : end.row - 1;
    event.preventDefault();
    if (triggerRow < 0) return;
    if (triggerRow === row && count === 2) {
      triggerRow = -1;
    }
    if (isUp) {
      this.select({...begin, row: triggerRow}, end);
    } else {
      this.select(begin, {...end, row: triggerRow});
    }
  }

  selectDown(event, td) {
    const editor = this.editor;
    if (!isEngine(editor) || !this.tableModel) return;
    const [row, col] = this.getCellPoint(td);
    if (row < 0 || col < 0) return;
    const count = this.selectArea ? this.selectArea.count : 0;
    const range = editor.change.range.get();
    range.shrinkToElementNode();
    if (count === 0) {
      if (this.selectRange && this.selectRange.type === 'top') {
        if (range.startOffset !== this.selectRange.endOffset) return;
      }
      this.selectRange = {
        type: 'bottom',
        startOffset: range.startOffset,
        endOffset: range.endOffset
      };
      const rangeRect = range.getBoundingClientRect();
      const tdRect = td.find(EDITABLE_SELECTOR).getBoundingClientRect();
      if (rangeRect.width !== 0 && rangeRect.height === 0 && (tdRect?.bottom || 0) - rangeRect.bottom > 10) {
        return;
      }
    }
    const {rows} = this.tableModel;
    const begin = this.selectArea ? this.selectArea.begin : {row, col};
    const end = this.selectArea ? this.selectArea.end : {row, col};
    const isUp = begin.row !== row;
    let triggerRow = isUp ? begin.row + 1 : end.row + 1;
    if (triggerRow > rows - 1) return;
    event.preventDefault();
    if (triggerRow === row && count === 2) {
      triggerRow = -1;
    }
    if (isUp) {
      this.select({...begin, row: triggerRow}, end);
    } else {
      this.select(begin, {...end, row: triggerRow});
    }
  }

  getSelectionHtml(all = false) {
    const tableModel = this.tableModel;
    if (!tableModel || !this.tableRoot) return null;
    let begin = {row: 0, col: 0};
    let end = {row: tableModel.rows - 1, col: tableModel.cols - 1};
    if (!all) {
      const area = this.getSelectArea();
      begin = area.begin;
      end = area.end;
    }
    const colsEl = this.tableRoot.find('col');
    let cols = [];
    let tableWidth = 0;
    for (let c = begin.col; c <= end.col; c++) {
      const colElement = colsEl.eq(c) && colsEl.eq(c).get();
      if (!colElement) continue;
      cols.push('<col width="' + colElement.width + '" />');
      tableWidth += parseInt(colElement.width);
    }
    const colgroup = '<colgroup>' + cols.join('') + '</colgroup>';
    let trHtml = [];
    for (let r = begin.row; r <= end.row; r++) {
      let tdHtml = [];
      let trHeight;
      for (let c = begin.col; c <= end.col; c++) {
        const tdModel = tableModel.table[r][c];
        let rowRemain;
        let colRemain;
        let tdClone;
        if (!this.table.helper.isEmptyModelCol(tdModel) && tdModel.element) {
          tdClone = tdModel.element.cloneNode(true);
          if (tdModel.element.parentElement) { trHeight = $(tdModel.element.parentElement).css('height'); }
        }
        if (!this.table.helper.isEmptyModelCol(tdModel) && tdModel.isMulti) {
          rowRemain = Math.min(r + tdModel.rowSpan - 1, end.row) - r + 1;
          colRemain = Math.min(c + tdModel.colSpan - 1, end.col) - c + 1;
        }
        if (this.table.helper.isEmptyModelCol(tdModel)) {
          const parentTd = tableModel.table[tdModel.parent.row][tdModel.parent.col];
          if (tdModel.parent.row === r && tdModel.parent.col < begin.col && c === begin.col) {
            const colCut = begin.col - tdModel.parent.col;
            if (!this.table.helper.isEmptyModelCol(parentTd)) {
              colRemain = Math.min(parentTd.colSpan - colCut, end.col - begin.col + 1);
              rowRemain = parentTd.rowSpan;
              tdClone = parentTd.element && parentTd.element.cloneNode(true);
            }
          }
          if (tdModel.parent.col === c && tdModel.parent.row < begin.row && r === begin.row) {
            const rowCut = begin.row - tdModel.parent.row;
            if (!this.table.helper.isEmptyModelCol(parentTd)) {
              rowRemain = Math.min(parentTd.rowSpan - rowCut, end.row - begin.row + 1);
              colRemain = parentTd.colSpan;
              tdClone = parentTd.element && parentTd.element.cloneNode(true);
            }
          }
        }
        if (tdClone) {
          if (rowRemain) tdClone.setAttribute('rowspan', rowRemain);
          if (colRemain) tdClone.setAttribute('colspan', colRemain);
          const editableElement = tdClone.firstChild;
          if (editableElement && editableElement.classList.contains('table-main-content')) {
            const copyNode = tdClone.cloneNode(false);
            copyNode.innerHTML = editableElement.innerHTML;
            tdHtml.push(copyNode.outerHTML);
          } else {
            tdHtml.push(tdClone.outerHTML);
          }
        }
      }
      const trElement = $(`<tr>${tdHtml.join('')}</tr>`);
      if (trHeight) trElement.css('height', trHeight);
      trHtml.push(trElement.get().outerHTML);
    }
    return `<body><meta name="aomao" content="table" /><table style="width:${tableWidth}px">${colgroup}${trHtml.join('')}</table></body>`;
  }

  hasMergeCell() {
    const {tableModel} = this;
    if (!tableModel) return false;
    const {begin, count} = this.getSelectArea();
    if (count !== 1) return false;
    const cell = tableModel.table[begin.row][begin.col];
    return !this.table.helper.isEmptyModelCol(cell) && cell.isMulti === true;
  }

  isRowSelected() {
    return !!this.selectArea && this.selectArea.allRow;
  }

  isColSelected() {
    return !!this.selectArea && this.selectArea.allCol;
  }

  isTableSelected() {
    return !!this.selectArea && this.selectArea.allCol && this.selectArea.allRow;
  }

  showHighlight(area) {
    const helper = this.table.helper;
    const tableModel = this.tableModel;
    if (!tableModel) return;
    const {begin, end, allCol, allRow} = area;
    if (begin.row < 0 || begin.col < 0) return;
    let beginRow = begin.row;
    let endRow = end.row;
    if (allCol && !allRow) {
      for (let r = begin.row; r <= end.row; r++) {
        const cell = tableModel.table[r][begin.col];
        if (helper.isEmptyModelCol(cell)) {
          const parentTd = tableModel.table[cell.parent.row][cell.parent.col];
          if (helper.isEmptyModelCol(parentTd)) continue;
          beginRow = Math.min(cell.parent.row, beginRow);
        } else {
          endRow = Math.max(r + cell.rowSpan - 1, endRow);
        }
      }
    }
    let beginCol = begin.col;
    let endCol = end.col;
    if (allRow && !allCol) {
      for (let c = begin.col; c <= end.col; c++) {
        const cell = tableModel.table[begin.row][c];
        if (helper.isEmptyModelCol(cell)) {
          const parentTd = tableModel.table[cell.parent.row][cell.parent.col];
          if (helper.isEmptyModelCol(parentTd)) continue;
          beginCol = Math.min(cell.parent.col, beginCol);
        } else {
          endCol = Math.max(c + cell.colSpan - 1, endCol);
        }
      }
    }
    this.hideHighlight();
    const colsHeader = this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS);
    const rowsHeader = this.rowsHeader && this.rowsHeader.find(Template.ROWS_HEADER_ITEM_CLASS);
    let height = 0;
    let width = 0;
    for (let r = allRow ? 0 : beginRow; r <= (allRow ? tableModel.rows - 1 : endRow); r++) {
      const cell = tableModel.table[r][beginCol];
      if (!helper.isEmptyModelCol(cell)) {
        if (cell.element) height += cell.element.offsetHeight;
        rowsHeader && rowsHeader.eq(r) && rowsHeader.eq(r).addClass('active');
      } else {
        const parentTd = tableModel.table[cell.parent.row][cell.parent.col];
        if (helper.isEmptyModelCol(parentTd)) continue;
        if (parentTd.element && allRow) { height += parentTd.element.offsetHeight; }
        rowsHeader && rowsHeader.eq(r) && rowsHeader.eq(r).addClass('active');
      }
    }
    for (let c = allCol ? 0 : beginCol; c <= (allCol ? tableModel.cols - 1 : endCol); c++) {
      const cell = tableModel.table[beginRow][c];
      if (!helper.isEmptyModelCol(cell)) {
        if (cell.element) width += cell.element.offsetWidth;
        colsHeader && colsHeader.eq(c) && colsHeader.eq(c).addClass('active');
      } else {
        const parentTd = tableModel.table[cell.parent.row][cell.parent.col];
        if (helper.isEmptyModelCol(parentTd)) continue;
        if (parentTd.element && allCol) { width += parentTd.element.offsetWidth; }
        colsHeader && colsHeader.eq(c) && colsHeader.eq(c).addClass('active');
      }
    }
    if (endRow === tableModel.rows - 1 && endCol === tableModel.cols - 1) {
      this.tableHeader && this.tableHeader.addClass('active');
    }
    const firstCell = tableModel.table[allRow ? 0 : beginRow][allCol ? 0 : beginCol];
    let top = 0;
    let left = 0;
    if (!helper.isEmptyModelCol(firstCell) && firstCell.element) {
      const viewport = this.tableRoot && this.tableRoot.parent();
      const vRect = viewport && viewport.getBoundingClientRect();
      const rect = firstCell.element.getBoundingClientRect();
      top += rect.top - (vRect ? vRect.top : 0) - 13;
      left += rect.left - (vRect ? vRect.left : 0);
    }
    const sLeft = removeUnit((this.table.wrapper && this.table.wrapper.find('.data-scrollbar') && this.table.wrapper.find('.data-scrollbar').css('left')) || '0') +
      removeUnit((this.table.wrapper && this.table.wrapper.css('margin-left')) || '0');
    left += sLeft;
    const headerHeight = this.colsHeader && this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS).get() ? this.colsHeader.find(Template.COLS_HEADER_ITEM_CLASS).get().offsetHeight : 0;
    top += headerHeight;
    if (height > 0 && width > 0) {
      this.highlight && this.highlight.css('width', `${width}px`);
      this.highlight && this.highlight.css('height', `${height}px`);
      this.highlight && this.highlight.css('top', `${top}px`);
      this.highlight && this.highlight.css('left', `${left}px`);
      this.highlight && this.highlight.show('block');
      this.table.wrapper && this.table.wrapper.addClass('data-table-highlight');
      if (allCol) {
        this.table.wrapper && this.table.wrapper.addClass('data-table-highlight-row');
      }
      if (allRow) {
        this.table.wrapper && this.table.wrapper.addClass('data-table-highlight-col');
      }
      if (allCol && allRow) {
        this.table.wrapper && this.table.wrapper.addClass('data-table-highlight-all');
      }
    }
  }

  hideHighlight() {
    this.highlight && this.highlight.hide();
    this.colsHeader && this.colsHeader.find('.active').removeClass('active');
    this.rowsHeader && this.rowsHeader.find('.active').removeClass('active');
    this.tableHeader && this.tableHeader.removeClass('active');
    this.table.wrapper && this.table.wrapper.removeClass('data-table-highlight data-table-highlight-row data-table-highlight-col data-table-highlight-all');
  }

  destroy() {
    this.unbindEvents();
  }
}

export default TableSelection;
