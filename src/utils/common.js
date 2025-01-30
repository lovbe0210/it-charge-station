import base64 from 'base-64';

export default {
  /**
   * 主题刷新
   * @param themProperty
   */
  flushCustomerSet(themProperty) {
    let styleProperty =
      `--background-img: ${themProperty.backgroundImg};` +
      `--background-color: ${themProperty.backgroundColor};` +
      `--theme-color: ${themProperty.themeColor};` +
      `--font-color: ${themProperty.fontColor};` +
      `--title-color: ${themProperty.titleColor};` +
      `--border-color: ${themProperty.borderColor};` +
      `--dropdown-bg-color: ${themProperty.dropdownBackgroundColor};` +
      `--dropdown-item-hover: ${themProperty.dropdownItemHover};` +
      `--on-theme-bg-color: ${themProperty.onThemeBackgroundColor};` +
      `--rj-editor-bg-color: ${themProperty.ramblyJotEditorBackgroundColor};` +
      `--modal-bg-color: ${themProperty.modalBackgroundColor};`
    document.querySelector(':root').setAttribute('style', styleProperty)
  },

  /**
   * 获取浏览器标识
   * @returns {string}
   */
  getBrowerAgent() {
    //取得浏览器的userAgent字符串
    let userAgent = navigator.userAgent;
    let isOpera = userAgent.indexOf("Opera") > -1;
    //Opera浏览器
    if (isOpera) {
      return "Opera"
    }
    //Firefox浏览器
    if (userAgent.indexOf("Firefox") > -1) {
      return "Firefox";
    }
    //Chrome浏览器
    if (userAgent.indexOf("Chrome") > -1) {
      return "Chrome";
    }
    //Edge浏览器
    if (userAgent.indexOf("Edge") > -1) {
      return "Edge";
    }
    //Safari浏览器
    if (userAgent.indexOf("Safari") > -1) {
      return "Safari";
    }
    //IE浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
      return "IE";
    }
  },

  /**
   * 制作简易签名
   * @param requestObj
   * @returns {string}
   */
  encodeSign(sourceStr) {
    let encodeStr = base64.encode(sourceStr);
    let charArr = Array.from(encodeStr);
    // 简单转码
    for (let i = 0; i < charArr.length; i++) {
      let uniCode = charArr[i].charCodeAt(0);
      if (!this.isLetterOrDigit(uniCode)) {
        continue;
      }
      let newChar = uniCode ^ 127;
      if (this.isLetterOrDigit(newChar)) {
        charArr[i] = String.fromCharCode(newChar);
      }
    }
    let sign = charArr.join('');
    return sign;
  },

  /**
   * 判断字符为字母或数字
   * @param code
   * @returns {boolean}
   */
  isLetterOrDigit(code) {
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
  }
}
