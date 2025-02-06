import isInteger from 'lodash/isInteger';
import {$, DATA_TRANSIENT_ATTRIBUTES, EDITABLE_SELECTOR, isEngine, isNode, transformCustomTags} from '@aomao/engine';
import Template from './template';

class Helper {
  constructor(editor) {
    this._editor = editor;
    this.clipboard = undefined;
  }

  // 判断模型是否为空（合并单元格占位）
  isEmptyModelCol(model) {
    return model && model.isEmpty;
  }

  /**
   * 获取表格数据模型
   * @param {NodeInterface} table
   * @returns {TableModel}
   */
  getTableModel(table) {
    let model = [];
    const tableElement = table.get();
    const rows = tableElement.rows;
    const rowCount = rows ? rows.length : 0;

    for (let r = 0; r < rowCount; r++) {
      const tr = rows[r];
      const cells = tr.cells;
      const cellCount = cells.length;

      for (let c = 0; c < cellCount; c++) {
        const td = cells[c];
        let { rowSpan, colSpan } = td;
        rowSpan = rowSpan === undefined ? 1 : rowSpan;
        colSpan = colSpan === undefined ? 1 : colSpan;
        const isMulti = rowSpan > 1 || colSpan > 1;
        if (!model[r]) model[r] = [];
        // 如果当前位置已有数据，则向右推移
        let _c = c;
        while (model[r][_c]) {
          _c++;
        }

        model[r][_c] = {
          rowSpan: rowSpan,
          colSpan: colSpan,
          isMulti: isMulti,
          element: td
        };

        if (isMulti) {
          // 补齐被合并单元格的占位
          let _rowCount = rowSpan;
          while (_rowCount > 0) {
            let colCount = colSpan;
            while (colCount > 0) {
              if (colCount !== 1 || _rowCount !== 1) {
                const rowIndex = r + _rowCount - 1;
                const colIndex = _c + colCount - 1;
                if (!model[rowIndex]) model[rowIndex] = [];
                model[rowIndex][colIndex] = {
                  isEmpty: true,
                  parent: { row: r, col: _c },
                  element: null
                };
              }
              colCount--;
            }
            _rowCount--;
          }
        }
      }
    }

    const colCounts = model.map((trModel) => trModel.length);
    const MaxColCount = Math.max(...colCounts);
    model.forEach((trModel) => {
      if (trModel.length < MaxColCount) {
        let addCount = MaxColCount - trModel.length;
        while (addCount--) {
          trModel.push({
            rowSpan: 1,
            colSpan: 1,
            isShadow: true,
            element: null
          });
        }
      }
      // 对于数组中可能存在的空项，也补齐为 shadow
      for (let i = 0; i < MaxColCount; i++) {
        if (!trModel[i]) {
          trModel[i] = {
            rowSpan: 1,
            colSpan: 1,
            isShadow: true,
            element: null
          };
        }
      }
    });

    return {
      rows: model.length,
      cols: MaxColCount,
      width: tableElement.offsetWidth,
      height: tableElement.offsetHeight,
      table: model
    };
  }

  /**
   * 修复表格，补全丢失的单元格和行
   * @param {NodeInterface} table
   * @returns {NodeInterface} 修正后的 table
   */
  normalize(table) {
    this.trimStartTr(table);
    this.fixNumberTr(table);
    table.addClass('data-table');
    table.attributes(DATA_TRANSIENT_ATTRIBUTES, 'class');

    // 修正表格宽度（针对 pt 单位场景）
    const width = table.css('width');
    if (parseInt(width) === 0) {
      table.css('width', 'auto');
    }
    table.css('background-color', '');

    const model = this.getTableModel(table);

    // 修正列的 span 场景
    let cols = table.find('col');
    if (cols.length !== 0) {
      for (let c = cols.length - 1; c >= 0; c--) {
        const colElement = cols[c];
        const _width = cols.eq(c) && cols.eq(c).attributes('width');
        if (_width) {
          cols.eq(c).attributes('width', parseInt(_width));
        }
        if (colElement.span > 1) {
          let addCount = colElement.span - 1;
          while (addCount--) {
            let parent = cols[c].parentElement || cols[c].parentNode;
            parent && parent.insertBefore(cols[c].cloneNode(), cols[c]);
          }
        }
      }
      cols = table.find('col');
      if (cols.length < model.cols) {
        const lastCol = cols.length - 1;
        let colsAddCount = model.cols - cols.length;
        while (colsAddCount--) {
          let parent = cols[0].parentElement || cols[0].parentNode;
          parent && parent.appendChild(cols[lastCol].cloneNode());
        }
      }
      table.find('col').attributes('span', 1);
    } else {
      let colgroup = table.find('colgroup')[0];
      if (!colgroup) {
        colgroup = document.createElement('colgroup');
      }
      table.prepend(colgroup);
      const widths = (function (table) {
        const tr = table.find('tr')[0];
        const tds = $(tr).find('td');
        const widthArray = [];
        tds.each((_, index) => {
          const $td = tds.eq(index);
          if (!$td) return;
          let colWidth = $td.attributes('data-colwidth');
          let tdWidth = $td.attributes('width');
          const tdColSpan = $td[0].colSpan;
          if (colWidth) {
            colWidth = colWidth.split(',');
          } else if (tdWidth) {
            tdWidth = parseInt(tdWidth) / tdColSpan;
          }
          for (let o = 0; o < tdColSpan; o++) {
            if (colWidth && colWidth[o]) {
              widthArray.push(parseInt(colWidth[o]));
            } else if (tdWidth) {
              widthArray.push(parseInt(tdWidth.toString()));
            } else {
              widthArray.push(undefined);
            }
          }
        });
        const td = table.find('td');
        td.removeAttributes('data-colwidth');
        td.removeAttributes('width');
        return widthArray;
      })(table);
      const col = document.createElement('col');
      for (let f = 0; f < model.cols; f++) {
        const node = col.cloneNode();
        if (widths[f]) {
          node.setAttribute('width', (widths[f] || '').toString());
        }
        colgroup.appendChild(node);
      }
    }

    // 补齐表格行：当数据模型与实际 DOM 行数不一致时，插入缺失的行
    const tableElement = table.get();
    model.table.forEach((tr, r) => {
      if (!tableElement.rows[r]) {
        tableElement.insertRow(r);
      }
      const shadow = tr.filter((td) => {
        return this.isEmptyModelCol(td) ? false : td.isShadow;
      });
      let shadowCount = shadow.length;
      while (shadowCount--) {
        tableElement.rows[r].insertCell();
      }
    });

    // 修正每行行高
    const trs = table.find('tr');
    trs.each((_, index) => {
      const $tr = trs.eq(index);
      if (!$tr) return;
      let height = parseInt($tr.css('height'));
      height =
        height ||
        (this._editor.plugin.findPlugin('table') &&
          this._editor.plugin.findPlugin('table').options.rowMinHeight) ||
        0;
      $tr.css('height', height + 'px');
    });

    // 补充可编辑区域：为单元格添加空白占位符，并确保编辑器区域内至少有一个 <br>
    const tds = table.find('td');
    const emptyTd = $(Template.EmptyCell(!isEngine(this._editor) || this._editor.readonly));
    tds.each((_, index) => {
      const tdNode = tds.eq(index);
      if (!tdNode) return;
      tdNode.attributes(DATA_TRANSIENT_ATTRIBUTES, 'table-cell-selection');
      let editableElement = tdNode.find(EDITABLE_SELECTOR);
      if (editableElement.length === 0) {
        const children = tdNode.children();
        tdNode.append(emptyTd.clone(true));
        editableElement = tdNode.find(EDITABLE_SELECTOR);
        editableElement.empty();
        editableElement.append(children);
      }
      editableElement.find('p').each((pNode) => {
        if (pNode.childNodes.length === 0) {
          pNode.appendChild(document.createElement('br'));
        }
      });
    });
    return table;
  }

  /**
   * 过滤掉 table 开头的空 tr（部分网页拷贝时会出现空行）
   * @param {NodeInterface} table
   */
  trimStartTr(table) {
    const tr = table.find('tr');
    const first = tr.eq(0);
    if (first && first.get() && first.get().childNodes.length === 0) {
      first.remove();
    }
  }

  fixNumberTr(table) {
    const tableElement = table.get();
    const rows = tableElement.rows;
    const rowCount = rows ? rows.length : 0;
    let colCounts = [];
    let firstColCount = 0;
    let cellCounts = [];
    let totalCellCounts = 0;
    let emptyCounts = 0;
    let maxCellCounts = 0;

    for (let r = 0; r < rowCount; r++) {
      const row = rows[r];
      const cells = row.cells;
      let cellCountThisRow = 0;
      for (let c = 0; c < cells.length; c++) {
        const { rowSpan, colSpan } = cells[c];
        totalCellCounts += rowSpan * colSpan;
        cellCountThisRow += colSpan;
        if (rowSpan > 1) {
          emptyCounts += (rowSpan - 1) * colSpan;
        }
      }
      cellCounts[r] = cellCountThisRow;
      if (r === 0) {
        firstColCount = cellCountThisRow;
      }
      maxCellCounts = Math.max(cellCountThisRow, maxCellCounts);
    }

    const isNumber1 = isInteger(totalCellCounts / firstColCount);
    const isNumber2 = firstColCount === maxCellCounts;
    const isNumber = isNumber1 && isNumber2;

    if (isNumber) {
      let lossCellCounts = 0;
      cellCounts.forEach((cellCount) => {
        lossCellCounts += maxCellCounts - cellCount;
      });

      if (lossCellCounts !== emptyCounts) {
        const missCellCounts = emptyCounts - lossCellCounts;
        if (isInteger(missCellCounts / maxCellCounts)) {
          let lossRowIndex = [];
          for (let _r = 0; _r < rowCount; _r++) {
            const _row = rows[_r];
            const _cells = _row.cells;
            let realRow = _r + lossRowIndex.length;
            while (colCounts[realRow] === maxCellCounts) {
              lossRowIndex.push(realRow);
              realRow++;
            }
            for (let _c2 = 0; _c2 < _cells.length; _c2++) {
              const { rowSpan, colSpan } = _cells[_c2];
              if (rowSpan > 1) {
                for (let rr = 1; rr < rowSpan; rr++) {
                  colCounts[realRow + rr] = (colCounts[realRow + rr] || 0) + colSpan;
                }
              }
            }
          }
          lossRowIndex.forEach((row) => {
            tableElement.insertRow(row);
          });
        }
      }
    }
  }

  // firefox 下拖拽兼容处理：设置一个 firefox 不识别的 mimetype
  fixDragEvent(event) {
    if (event.dataTransfer) {
      event.dataTransfer.clearData();
      event.dataTransfer.setData('aomao', '');
      event.dataTransfer.effectAllowed = 'all';
    }
  }

  /**
   * 从源节点复制样式到目标节点
   * @param {NodeInterface|Node} from
   * @param {NodeInterface|Node} to
   */
  copyCss(from, to) {
    if (isNode(from)) from = $(from);
    if (isNode(to)) to = $(to);
    to.css('vertical-align', from.css('vertical-align'));
    let tdBgColor = from.css('background-color');
    tdBgColor = tdBgColor !== 'rgba(0, 0, 0, 0)' ? tdBgColor : '';
    to.css('background-color', tdBgColor);
  }

  /**
   * 从源节点复制样式和内容到目标节点
   * @param {NodeInterface|Node} from
   * @param {NodeInterface|Node} to
   */
  copyTo(from, to) {
    if (isNode(from)) from = $(from);
    if (isNode(to)) to = $(to);
    let editableElement = to.find(EDITABLE_SELECTOR);
    if (editableElement.length === 0) {
      to.html(Template.EmptyCell(!isEngine(this._editor) || this._editor.readonly));
      editableElement = to.find(EDITABLE_SELECTOR);
    }
    editableElement.html(transformCustomTags(from.html()));
    if (to.name === 'td' && to.find(Template.TABLE_TD_BG_CLASS).length === 0) {
      to.append($(Template.CellBG));
    }
    if (to.name === 'td') {
      to.attributes('data-transient-attributes', 'table-cell-selection');
    }
    this.copyCss(from, to);
  }

  copyHTML(html) {
    this.clipboard = {
      html: html,
      text: $(html).get() ? $(html).get().innerText : ''
    };
  }

  getCopyData() {
    return this.clipboard;
  }

  clearCopyData() {
    this.clipboard = undefined;
  }

  trimBlankSpan(node) {
    const len = node.length;
    let nodelist = [];
    let i = 0;
    let j = len - 1;
    while (
      node[i] &&
      node[i].tagName.toLowerCase() === 'span' &&
      node[i].innerText.trim() === ''
      ) {
      i++;
    }
    while (
      node[j] &&
      node[j].tagName.toLowerCase() === 'span' &&
      node[j].innerText.trim() === ''
      ) {
      j--;
    }
    if (i <= j) {
      for (let k = i; k <= j; k++) {
        nodelist.push(node[k]);
      }
    }
    return nodelist.length ? $(nodelist) : node;
  }

  /**
   * 规范表格结构：补齐丢失的单元格、修正列宽和行高、补充编辑区域
   * @param {NodeInterface} table
   * @returns {NodeInterface} 规范后的 table
   */
  normalizeTable(table) {
    this.trimStartTr(table);
    this.fixNumberTr(table);
    table.addClass('data-table');
    const width = table.css('width');
    if (parseInt(width) === 0) {
      table.css('width', 'auto');
    } else if (!width.endsWith('%')) {
      table.css('width', parseInt(width, 10) + 'px');
    }
    table.css('background-color', '');
    const model = this.getTableModel(table);
    let cols = table.find('col');
    if (cols.length !== 0) {
      for (let c = cols.length - 1; c >= 0; c--) {
        const colElement = cols[c];
        const _width = cols.eq(c) && cols.eq(c).attributes('width');
        if (_width && !_width.endsWith('%')) {
          cols.eq(c) && cols.eq(c).attributes('width', parseInt(_width));
        }
        if (colElement.span > 1) {
          let addCount = colElement.span - 1;
          while (addCount--) {
            let parent = cols[c].parentElement || cols[c].parentNode;
            parent && parent.insertBefore(cols[c].cloneNode(), cols[c]);
          }
        }
      }
      cols = table.find('col');
      if (cols.length < model.cols) {
        const lastCol = cols.length - 1;
        let colsAddCount = model.cols - cols.length;
        while (colsAddCount--) {
          let parent = cols[0].parentElement || cols[0].parentNode;
          parent && parent.appendChild(cols[lastCol].cloneNode());
        }
      }
      table.find('col').attributes('span', 1);
    } else {
      let colgroup = table.find('colgroup')[0];
      if (!colgroup) {
        colgroup = document.createElement('colgroup');
      }
      table.prepend(colgroup);
      const widths = (function (table) {
        const tr = table.find('tr')[0];
        const tds = $(tr).find('td');
        const widthArray = [];
        tds.each((_, index) => {
          const $td = tds.eq(index);
          if (!$td) return;
          let colWidth = $td.attributes('data-colwidth');
          let tdWidth = $td.attributes('width') || $td.css('width');
          const tdColSpan = $td[0].colSpan;
          if (colWidth) {
            colWidth = colWidth.split(',');
          } else if (tdWidth) {
            tdWidth = parseInt(tdWidth) / tdColSpan;
          }
          for (let o = 0; o < tdColSpan; o++) {
            if (colWidth && colWidth[o]) {
              widthArray.push(parseInt(colWidth[o]));
            } else if (tdWidth) {
              widthArray.push(parseInt(tdWidth.toString()));
            } else {
              widthArray.push(undefined);
            }
          }
        });
        const td = table.find('td');
        td.removeAttributes('data-colwidth');
        td.removeAttributes('width');
        return widthArray;
      })(table);
      const col = document.createElement('col');
      for (let f = 0; f < model.cols; f++) {
        const node = col.cloneNode();
        if (widths[f]) {
          node.setAttribute('width', (widths[f] || '').toString());
        }
        colgroup.appendChild(node);
      }
    }
    const tableElement = table.get();
    model.table.forEach((tr, r) => {
      if (!tableElement.rows[r]) {
        tableElement.insertRow(r);
      }
      const shadow = tr.filter((td) => {
        return this.isEmptyModelCol(td) ? false : td.isShadow;
      });
      let shadowCount = shadow.length;
      while (shadowCount--) {
        tableElement.rows[r].insertCell();
      }
    });
    const trs = table.find('tr');
    trs.each((_, index) => {
      const $tr = trs.eq(index);
      if (!$tr) return;
      let height = parseInt($tr.css('height'));
      height =
        height ||
        (this._editor.plugin.findPlugin('table') &&
          this._editor.plugin.findPlugin('table').options.rowMinHeight) ||
        0;
      $tr.css('height', height + 'px');
    });
    const tds = table.find('td');
    const emptyTd = $(Template.EmptyCell(!isEngine(this._editor) || this._editor.readonly));
    tds.each((_, index) => {
      const tdNode = tds.eq(index);
      if (!tdNode) return;
      tdNode.attributes(DATA_TRANSIENT_ATTRIBUTES, 'table-cell-selection');
      let editableElement = tdNode.find(EDITABLE_SELECTOR);
      if (editableElement.length === 0) {
        const children = tdNode.children();
        tdNode.append(emptyTd.clone(true));
        editableElement = tdNode.find(EDITABLE_SELECTOR);
        editableElement.empty();
        editableElement.append(children);
      }
      editableElement.find('p').each((pNode) => {
        if (pNode.childNodes.length === 0) {
          pNode.appendChild(document.createElement('br'));
        }
      });
    });
    return table;
  }
}

export default Helper;
