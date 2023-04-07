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
      `--title-color: ${themProperty.titleColor};`
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
  }
}
