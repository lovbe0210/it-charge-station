/**
 * @fileoverview 本文件为 TypeScript 类型定义的转换版，使用 JSDoc 注释记录原有接口信息，供开发时参考。
 * 注意：以下内容仅为类型注释，不会在运行时产生实际代码。
 */

/**
 * @typedef {Object} HelperInterface
 * @property {function((TableModelCol|TableModelEmptyCol)): boolean} isEmptyModelCol 判断当前单元格是否为空（合并单元格占位）。
 * @property {function(NodeInterface): TableModel} getTableModel 提取表格数据模型。
 * @property {function(NodeInterface): NodeInterface} normalize 标准化表格结构，补齐丢失的单元格和行。
 * @property {function(DragEvent): void} fixDragEvent 处理 Firefox 下拖拽事件的兼容性问题。
 * @property {function((NodeInterface|Node), (NodeInterface|Node)): void} copyCss 从源节点复制样式到目标节点。
 * @property {function((NodeInterface|Node), (NodeInterface|Node)): void} copyTo 从源节点复制样式和内容到目标节点。
 * @property {function(string): void} copyHTML 复制 HTML 内容。
 * @property {function(): ({html: string, text: string}|undefined)} getCopyData 获取复制的数据。
 * @property {function(): void} clearCopyData 清除复制的数据。
 * @property {function(NodeInterface): NodeInterface} trimBlankSpan 去除空白的 span 标签。
 * @property {function(NodeInterface): NodeInterface} normalizeTable 标准化表格结构，补齐缺失单元格和行。
 */

/**
 * @typedef {Object} TemplateInterface
 * @property {boolean} isReadonly 是否只读
 * @property {function(TableValue, TableMenu): string} htmlEdit 编辑模式下的表格渲染，返回 HTML 字符串
 * @property {function(TableValue): string} htmlView 阅读模式下的表格渲染，返回 HTML 字符串
 * @property {function(): string} getEmptyCell 获取空单元格的模板
 * @property {function(number): string} renderRowsHeader 渲染指定行数的行头
 * @property {function(number): string} renderColsHeader 渲染指定列数的列头
 */

/**
 * @typedef {Object} TableValue
 * @property {string} id 表格 ID
 * @property {number} rows 行数
 * @property {number} cols 列数
 * @property {number} [width] 表格宽度
 * @property {number} [height] 表格高度
 * @property {string} [html] 表格的 HTML 内容
 * @property {string} [color] 表格颜色
 * @property {boolean} [noBorder] 是否无边框
 * @property {boolean} [overflow] 是否启用滚动
 */

/**
 * @typedef {Object} TableMenuItem
 * @property {string} [action] 操作名称
 * @property {string} [icon] 图标
 * @property {string} [text] 显示文本
 * @property {true} [split] 分割线标识
 */

/**
 * @typedef {Array<TableMenuItem>} TableMenu
 */

/**
 * @typedef {Object} TableModelCol
 * @property {boolean} [isShadow] 是否为补充单元格
 * @property {number} rowSpan 单元格行合并数
 * @property {number} colSpan 单元格列合并数
 * @property {boolean} [isMulti] 是否合并单元格
 * @property {(HTMLTableColElement|HTMLTableDataCellElement|null)} element 对应的原生 DOM 元素
 */

/**
 * @typedef {Object} TableModelEmptyCol
 * @property {true} isEmpty 标识为空占位
 * @property {{row: number, col: number}} parent 父单元格的坐标位置
 */

/**
 * @typedef {Object} TableModel
 * @property {number} rows 行数
 * @property {number} cols 列数
 * @property {number} width 表格宽度
 * @property {number} height 表格高度
 * @property {Array<Array<TableModelCol|TableModelEmptyCol>>} table 表格数据模型，二维数组
 */

/**
 * @typedef {Object} TableInterface
 * @property {NodeInterface} [wrapper] 表格外层包装节点
 * @property {HelperInterface} helper 表格助手对象
 * @property {TemplateInterface} template 表格模板
 * @property {TableSelectionInterface} selection 表格选择相关操作
 * @property {ControllBarInterface} conltrollBar 控制栏对象
 * @property {TableCommandInterface} command 表格命令接口
 * @property {number} colMinWidth 列最小宽度
 * @property {number} rowMinHeight 行最小高度
 * @property {boolean} enableScroll 是否开启滚动\n* 渲染方法：返回字符串、NodeInterface 或执行其它操作\n* @returns {string|NodeInterface|void}\n* @function render\n */

/**
 * @typedef {Object} TableOptions
 * @property {string|string[]} [hotkey] 快捷键设置
 * @property {{maxLeftWidth?: function(): number, maxRightWidth?: function(): number}} [overflow] 滚动相关配置
 * @property {number} [colMinWidth] 列最小宽度
 * @property {number} [rowMinHeight] 行最小高度
 * @property {number} [maxInsertNum] 最大插入行列数
 * @property {boolean} [markdown] 是否启用 Markdown 支持
 * @property {function((Array<ToolbarItemOptions|CardToolbarItemOptions>), EditorInterface): Array<ToolbarItemOptions|CardToolbarItemOptions>} [cardToolbars] 卡片工具栏配置函数
 * @property {boolean} [enableScroll] 是否开启滚动，默认开启
 */

/**
 * @typedef {Object} ControllOptions
 * @property {number} col_min_width 列最小宽度
 * @property {number} row_min_height 行最小高度
 * @property {number} max_insert_num 最大插入行列数
 */

/**
 * @typedef {Object} ControllDragging
 * @property {number} x 拖动时的 x 坐标
 * @property {number} y 拖动时的 y 坐标
 */

/**
 * @typedef {Object} ControllDraggingHeader
 * @property {NodeInterface} element 拖拽的头部元素
 * @property {number} minIndex 最小索引
 * @property {number} maxIndex 最大索引
 * @property {number} count 数量\n * @property {number} [index] 当前索引\n * @property {boolean} [isNext] 是否为下一个\n */

/**
 * @typedef {Object} ControllChangeSize
 * @property {{element: NodeInterface, height: number, width: number}} trigger 触发调整大小的元素信息
 * @property {number} width 新宽度
 * @property {number} height 新高度
 * @property {NodeInterface} element 调整大小的目标元素
 * @property {number} index 调整大小的索引\n * @property {{width: number, height: number}} table 表格当前宽高\n * @property {number[]} [colsWidths] 每列的宽度数组\n */

/**
 * @typedef {Object} ControllBarInterface
 * @property {ControllDragging} [dragging] 拖动参数
 * @property {ControllDraggingHeader} [draggingHeader] 拖动头部参数
 * @property {ControllChangeSize} [changeSize] 调整大小参数
 * @property {function(): void} init 初始化\n * @function refresh\n * @param {boolean} [refershSize]\n * @function renderRowBars\n * @param {boolean} [refershSize]\n * @function renderColBars\n * @param {boolean} [refershSize]\n * @function removeRow\n * @param {number} index\n * @function removeCol\n * @param {number} index\n * @function showContextMenu\n * @param {MouseEvent} event\n * @function hideContextMenu\n * @function drawBackgroundColor\n * @param {string} [color]\n * @function setAlign\n * @param {'top'|'middle'|'bottom'} [align]\n * @function getMenuDisabled\n * @param {string} action\n * @returns {boolean}\n * @function destroy\n */

/**
 * @typedef {Object} TableCommandInterface
 * @property {function(): void} init 初始化\n * @function insertColAt\n * @param {number} index\n * @param {number} count\n * @param {boolean} [isLeft]\n * @param {number|number[]} [widths]\n * @param {...any} args\n * @function insertCol\n * @param {'left'|'end'|'right'} [position]\n * @param {number} [count]\n * @param {...any} args\n * @function removeCol\n * @param {...any} args\n * @function insertColLeft\n * @function insertColRight\n * @function insertRowAt\n * @param {number} index\n * @param {number} count\n * @param {boolean} [isUp]\n * @param {...any} args\n * @function insertRow\n * @param {'up'|'end'|'down'} [position]\n * @param {number} [count]\n * @param {...any} args\n * @function insertRowUp\n * @function insertRowDown\n * @function removeRow\n * @param {...any} args\n * @function removeTable\n * @function copy\n * @param {boolean} [all]\n * @function mockCopy\n * @function clearCopyData\n * @function shortcutCopy\n * @param {ClipboardEvent} event\n * @function cut\n * @function shortcutCut\n * @param {ClipboardEvent} event\n * @function clear\n * @function mockPaste\n * @param {...any} args\n * @function shortcutPaste\n * @param {ClipboardEvent} event\n * @function paste\n * @param {ClipboardData} data\n * @param {...any} args\n * @function mergeCell\n * @param {...any} args\n * @function splitCell\n * @param {...any} args\n * @function hasCopyData\n * @returns {boolean}\n */

/**
 * @typedef {Object} TableSelectionArea
 * @property {{row: number, col: number}} begin 起始单元格坐标
 * @property {{row: number, col: number}} end 结束单元格坐标
 * @property {number} count 总单元格数量\n * @property {boolean} allCol 是否选中所有列\n * @property {boolean} allRow 是否选中所有行\n */

/**
 * @typedef {Object} TableSelectionDragging
 * @property {{element: NodeInterface}} trigger 拖动触发信息
 */

/**
 * @typedef {Object} TableSelectionInterface
 * @property {TableModel} [tableModel] 当前表格模型
 * @property {TableSelectionArea} [selectArea] 选区信息
 * @property {function(): void} init 初始化\n * @function render\n * @param {string} action\n * @function each\n * @param {function((TableModelCol|TableModelEmptyCol), number, number): void} fn\n * @param {boolean} [reverse]\n * @function refreshModel\n * @function getCellPoint\n * @param {NodeInterface} td\n * @returns {number[]}\n * @function getCellIndex\n * @param {number} row\n * @param {number} col\n * @returns {number}\n * @function getSingleCell\n * @returns {(NodeInterface|null)}\n * @function getSingleCellPoint\n * @returns {number[]}\n * @function getSelectArea\n * @returns {TableSelectionArea}\n * @function selectCol\n * @param {number} begin\n * @param {number} [end]\n * @function selectRow\n * @param {number} begin\n * @param {number} [end]\n * @function select\n * @param {{row: number, col: number}} start\n * @param {{row: number, col: number}} end\n * @function clearSelect\n * @function getSelectionHtml\n * @param {boolean} [all]\n * @returns {(string|null)}\n * @function hasMergeCell\n * @returns {boolean}\n * @function isRowSelected\n * @returns {boolean}\n * @function isColSelected\n * @returns {boolean}\n * @function isTableSelected\n * @returns {boolean}\n * @function showHighlight\n * @param {TableSelectionArea} area\n * @function hideHighlight\n * @function focusCell\n * @param {(NodeInterface|Node)} cell\n * @param {boolean} [start]\n * @function selectCellRange\n * @param {(NodeInterface|Node)} cell\n * @function destroy\n */

// 如果需要将以上类型信息在运行时使用（例如作为文档说明），你可以在实际实现中通过 JSDoc 注释引用这些定义。
// 例如，在 Vue 2 的组件中，你可以这样写：
//
// /**
//  * @component
//  * @typedef {import('./tableTypes').TableInterface} TableInterface
//  */
// export default {\n//   name: 'MyTableComponent',\n//   data() {\n//     return {\n//       // ...\n//     };\n//   },\n//   methods: {\n//     // 实现表格逻辑\n//   }\n// };\n//
// 由于这些仅为类型定义，在纯 JavaScript 中不需要额外导出任何变量或对象。
//
// 导出一个空对象，避免模块报错（可选）。
export default {};
