import {$, DATA_ELEMENT, isMobile, Position, TRIGGER_CARD_ID, UI} from '@aomao/engine';
import {colord} from 'colord';
import Palette from './palette';

// Options 类型已移除，直接在构造函数中使用传入的参数

/*const TABLE_WRAPPER_CLASS_NAME = 'table-wrapper';
const TABLE_OVERFLOW_CLASS_NAME = 'table-overflow';
const TABLE_CLASS_NAME = 'data-table';
const COLS_HEADER_CLASS_NAME = 'table-cols-header';
const COLS_HEADER_ITEM_CLASS_NAME = 'table-cols-header-item';
const COLS_HEADER_TRIGGER_CLASS_NAME = 'cols-trigger';
const COLS_ADDITION_HEADER_CLASS_NAME = 'cols-addition-header';
const ROWS_HEADER_CLASS_NAME = 'table-rows-header';
const ROWS_HEADER_ITEM_CLASS_NAME = 'table-rows-header-item';
const ROWS_HEADER_TRIGGER_CLASS_NAME = 'rows-trigger';
const HEADER_CLASS_NAME = 'table-header';
const MENUBAR_CLASS_NAME = 'table-menubar';
const MENUBAR_ITEM_CLASS_NAME = 'table-menubar-item';
const MENUBAR_ITEM_INPUT_CALSS_NAME = 'table-menubar-item-input';
const VIEWPORT = 'table-viewport';
const VIEWPORT_READER = 'data-table-reader';
const PLACEHOLDER_CLASS_NAME = 'table-placeholder';
const MULTI_ADDITION_CLASS_NAME = 'multi-addition';
const TABLE_HIGHLIGHT = 'table-highlight';
const ROW_DELETE_BUTTON_CLASS_NAME = 'table-row-delete-button';
const COL_DELETE_BUTTON_CLASS_NAME = 'table-col-delete-button';
const ROW_ADD_BUTTON_CLASS_NAME = 'table-row-add-button';
const ROW_ADD_BUTTON_SPLIT_CLASS_NAME = 'table-row-add-split-button';
const COL_ADD_BUTTON_CLASS_NAME = 'table-col-add-button';
const COL_ADD_BUTTON_SPLIT_CLASS_NAME = 'table-col-add-split-button';
const TABLE_TD_CONTENT_CLASS_NAME = 'table-main-content';*/
// const TABLE_TD_BG_CLASS_NAME = 'table-main-bg';

/*const CellBG = `<div class="${TABLE_TD_BG_CLASS_NAME}">
  <div class="table-main-border-top"></div>
  <div class="table-main-border-right"></div>
  <div class="table-main-border-bottom"></div>
  <div class="table-main-border-left"></div>
</div>`;*/

class Color {
  constructor(editor, cardId, options) {
    this._editor = editor;
    this._cardId = cardId;
    this._options = options;
    this._position = new Position(this._editor);
    this._color = options.defaultColor || 'transparent';
    this._button = $(`<div class="table-color-dropdown-trigger">
        <button type="button" class="table-color-dropdown-button-text">
            <svg width="16px" height="16px" viewBox="0 0 16 16" style="margin-bottom: ${this._color === 'transparent' ? -5 : -3}">
                <g strokeWidth="1" fill="none" fillRule="evenodd">
                    <path d="M11.9745711,7.921875 C11.9745711,7.921875 13.2147672,9.2863447 13.2147672,10.1226326 C13.2147672,10.8142992 12.6566789,11.3802083 11.9745711,11.3802083 C11.2924632,11.3802083 10.734375,10.8142992 10.734375,10.1226326 C10.734375,9.2863447 11.9745711,7.921875 11.9745711,7.921875 Z M9.07958999,6.47535893 L6.28501575,3.68078468 L3.4904415,6.47535893 L9.07958999,6.47535893 Z M5.3326566,3.04215357 L4.28223263,1.9917296 C4.22692962,1.93642659 4.22692962,1.84676271 4.28223263,1.7914597 L5.03228902,1.0414033 C5.08759203,0.986100299 5.17725591,0.986100299 5.23255892,1.0414033 L6.4546098,2.26345418 C6.46530408,2.27146914 6.4755605,2.28033918 6.48528564,2.29006432 L10.4848531,6.28963174 C10.5954591,6.40023775 10.5954591,6.57956552 10.4848531,6.69017153 L6.4838816,10.691143 C6.37327559,10.801749 6.19394782,10.801749 6.08334181,10.691143 L2.08377439,6.69157557 C1.97316838,6.58096956 1.97316838,6.40164179 2.08377439,6.29103578 L5.3326566,3.04215357 Z" fill="#595959"/>
                    <rect stroke="${Palette.getStroke(this._color)}" fill="${this._color}" strokeWidth="0.5" x="2" y="12.75" width="12" height="1.5" rx="0.125" />
                </g>
            </svg>
        </button>
        <button type="button" class="table-color-dropdown-arrow">
            <span class="table-color-dropdown-empty"></span>
            <span class="data-icon data-icon-arrow"></span>
        </button>
        </div>`);
    this._button.find('.table-color-dropdown-arrow').on('mousedown', (event) => {
      event.preventDefault();
      if (this._container !== undefined && this._container.length > 0) {
        this.remove();
      } else {
        this.render();
      }
    });
    this._button.find('.table-color-dropdown-button-text').on('mousedown', (event) => {
      event.preventDefault();
      const onChange = this._options.onChange;
      if (onChange) onChange(this._color);
    });
  }

  getButton() {
    return this._button;
  }

  select(color) {
    const stroke = Palette.getStroke(color);
    const rectElement = this._button.find('rect');
    rectElement.attributes('stroke', stroke);
    rectElement.attributes('fill', color);
    this._button.find('svg').css('margin-bottom', color === 'transparent' ? -5 : -3);
  }

  change(color) {
    this._color = color;
    this.select(color);
    const onChange = this._options.onChange;
    if (onChange) onChange(color);
  }

  toState(color, oldHue) {
    let c = color.hex || color;
    if (c === 'transparent') {
      c = 'rgba(0,0,0,0)';
    }
    const tinyColor = colord(c);
    const hsl = tinyColor.toHsl();
    const hsv = tinyColor.toHsv();
    const rgb = tinyColor.toRgb();
    const hex = tinyColor.toHex();

    if (hsl.s === 0) {
      hsl.h = oldHue || 0;
      hsv.h = oldHue || 0;
    }

    const transparent = hex === '000000' && rgb.a === 0;
    return {
      hsl: hsl,
      hex: transparent ? 'transparent' : '#' + hex,
      rgb: rgb,
      hsv: hsv,
      oldHue: color.h || oldHue || hsl.h,
      source: color.source
    };
  }

  render() {
    this._container = $(`<div class="data-table-color-tool${isMobile ? ' data-table-color-tool-mobile' : ''}" ${DATA_ELEMENT}="${UI}" ${TRIGGER_CARD_ID}="${this._cardId}"></div>`);
    const colorPanle = $(`<div class="data-table-color-tool-panle"></div>`);
    const colors = this._options.colors;

    const getItem = (color, display) => {
      const state = this.toState(color.color || '#FFFFFF');
      const needBorder = ['#ffffff', '#fafafa', 'transparent'].indexOf(state.hex) >= 0;
      const item = $(`<span class="data-table-color-tool-item${needBorder ? ' data-table-color-tool-border' : ''}">
            <span style="background-color:${color.color}${color.border
        ? (!needBorder ? `;border:1px solid ${color.border}` : '')
        : ''}">
              <svg style="fill: ${color.color.toUpperCase() === '#8C8C8C' ? '#FFFFFF' : '#8C8C8C'};display: ${color.color === this._color && display !== false ? 'block' : 'none'};" viewBox="0 0 18 18">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
              </svg>
            </span>
          </span>`);
      item.on('mousedown', (event) => {
        event.preventDefault();
        event.stopPropagation();
        colorPanle.find('svg').each(function () {
          this.style.display = 'none';
        });
        if (display !== false) item.find('svg').css('display', 'block');
        this.change(color.color);
      });
      return item;
    };

    const defaultItem = $(`<div class="data-table-color-tool-group data-table-color-tool-default"></div>`);
    const item = getItem({ color: 'transparent' }, false);
    defaultItem.append(item);
    defaultItem.on('mousedown', (event) => {
      event.preventDefault();
      colorPanle.find('svg').each(function () {
        this.style.display = 'none';
      });
      this.change('transparent');
    });
    const nofillText = this._editor.language.get('table', 'color', 'nonFillText');
    defaultItem.append($(`<span class="data-table-color-tool-default-text">${nofillText}</span>`));
    this._container.append(defaultItem);

    colors.forEach((group) => {
      const groupElement = $(`<div class="data-table-color-tool-group"></div>`);
      group.forEach((color) => {
        const item = getItem(color);
        groupElement.append(item);
      });
      colorPanle.append(groupElement);
    });
    this._container.append(colorPanle);
    if (this._position) {
      this._position.bind(this._container, this._button);
    }
    document.addEventListener('mousedown', this.windowClick, true);
  }

  windowClick(event) {
    const target = event.target;
    if (!target) return;
    if ($(target).closest('.data-table-color-tool,.table-color-dropdown-arrow').length === 0) {
      this.remove();
    }
  }

  remove() {
    if (this._container) {
      this._container.remove();
      if (this._position) {
        this._position.destroy();
      }
      document.removeEventListener('mousedown', this.windowClick, true);
      this._container = undefined;
    }
  }

  destroy() {
    this.remove();
    const onDestroy = this._options.onDestroy;
    if (onDestroy) onDestroy();
  }
}

export default Color;
