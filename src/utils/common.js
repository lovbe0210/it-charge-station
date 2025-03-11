/**
 * 主题刷新
 * @param themProperty
 */
export function flushCustomerSet(themProperty) {
  let backgroundImg;
  if (themProperty.backgroundImg?.indexOf('linear-gradient') !== -1) {
    backgroundImg = themProperty.backgroundImg;
  } else {
   let url = themProperty.backgroundImg && themProperty.backgroundImg.startsWith('http')
      ? themProperty.backgroundImg : (location.origin + themProperty.backgroundImg);
    backgroundImg = themProperty.backgroundImg ? ('url("' + url + '")') : undefined;
  }
  let styleProperty =
    `--background-img: ${backgroundImg};` +
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
}

/**
 * 获取浏览器标识
 * @returns {string}
 */
export function getBrowerAgent() {
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

/**
 * 制作简易签名
 * @param requestObj
 * @returns {string}
 */
export function encodeSign(sourceStr) {
  let buffer = Buffer.from(sourceStr);
  let encodeStr = buffer.toString('base64');
  let charArr = Array.from(encodeStr);
  // 简单转码
  for (let i = 0; i < charArr.length; i++) {
    let uniCode = charArr[i].charCodeAt(0);
    if (!isLetterOrDigit(uniCode)) {
      continue;
    }
    let newChar = uniCode ^ 127;
    if (isLetterOrDigit(newChar)) {
      charArr[i] = String.fromCharCode(newChar);
    }
  }
  let sign = charArr.join('');
  return sign;
}

/**
 * 签名解析
 * @param sourceStr
 * @returns {string}
 */
export function decodeSign(sourceStr) {
  let charArr = Array.from(sourceStr);
  // 简单转码
  for (let i = 0; i < charArr.length; i++) {
    let uniCode = charArr[i].charCodeAt(0);
    if (!isLetterOrDigit(uniCode)) {
      continue;
    }
    let newChar = uniCode ^ 127;
    if (isLetterOrDigit(newChar)) {
      charArr[i] = String.fromCharCode(newChar);
    }
  }
  let decodeStr = charArr.join('');
  let msgBody = Buffer.from(decodeStr, 'base64').toString();
  return msgBody;
}

/**
 * 判断字符为字母或数字
 * @param code
 * @returns {boolean}
 */
export function isLetterOrDigit(code) {
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
}

// 获取预置的随机颜色
export function getRandomColor() {
  let colorsArray = ['pink', 'red', 'orange', 'green', 'blue', 'purple'];
  let index = Math.floor(Math.random() * (colorsArray.length));
  return colorsArray[index];
}
