/**
 * 根据指定格式序列化时间
 * @param date 日期时间
 * @param fmt format时间格式
 * @returns {*}
 */
export function formatTime(date, fmt) {
  // 1.获取年份
  // y+ 1个或者多个y  yyyy:2021
  // y* 0个或者多个y
  // y? 0个或者1个y
  if (/(y+)/.test(fmt)) {
    // RegExp.$1 指的是与正则表达式匹配的第一个子匹配
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  // 2.获取月日等
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

/**
 * 格式化时间 今日内显示今日 超过一天显示昨天，否则显示日期
 * @param timestamp 时间戳
 * @returns {string}
 */
export function formatTime2H(timestamp) {
  if (timestamp == null || timestamp === undefined) {
    return '';
  }
  let now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let date = now.getDate()
  let str = `${year}/${month}/${date}` //获取今天的日期
  let today = new Date(str).getTime() //今天
  let yesterday = new Date(str).getTime() - 1000 * 60 * 60 * 24 //昨天
  let time = new Date(timestamp) //实际时间
  let fullYear = time.getFullYear();
  let hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
  let minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  if (time.getTime() > today) {
    return '今天 ' + hours + ':' + minutes;
  } else if (time.getTime() > yesterday) {
    return '昨天 ' + hours + ':' + minutes;
  } else if (year === fullYear) {
    return time.getMonth() + 1 + '月' + time.getDate() + '日 ' +
      hours + ':' + minutes;
  } else {
    return fullYear + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日 ' +
      hours + ':' + minutes;
  }
}

/**
 * 深度比较两个对象是否相等
 * @param a
 * @param b
 * @returns {false|this is string[]|*|boolean}
 */
export function deepEqual(a, b) {
  // 处理严格相等情况（包括基本类型和同一对象引用）
  if (a === b) return true;

  // 处理 null/undefined 的情况
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return a === b;
  }

  // 获取对象类型标识
  const typeA = Object.prototype.toString.call(a);
  const typeB = Object.prototype.toString.call(b);
  if (typeA !== typeB) return false;

  // 处理特殊对象类型
  switch (typeA) {
    case '[object Date]':
      return a.getTime() === b.getTime();
    case '[object RegExp]':
      return a.toString() === b.toString();
    case '[object Number]':
    case '[object String]':
    case '[object Boolean]':
      return a.valueOf() === b.valueOf();
  }

  // 处理数组
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }

  // 处理普通对象
  if (typeA === '[object Object]') {
    const keysA = Object.keys(a).sort();
    const keysB = Object.keys(b).sort();
    return keysA.length === keysB.length &&
      keysA.every((key, index) => key === keysB[index] && deepEqual(a[key], b[key]));
  }

  // 其他未处理的对象类型默认返回 false
  return false;
}

/**
 * 转换字符串，为null转换为空字符串
 * @param val
 * @returns
 */
export const str = val => {
  if (val == null) {
    return ''
  }
  return String(val);
}

/**
 * 判断是否是图片类型
 * @param filePath
 * @returns
 */
export function isImage(filePath) {
  let type = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']
  // 获取最后一个.的位置
  let index = filePath.lastIndexOf('.')
  //获取后缀
  let suffix = filePath.substring(index + 1)
  return type.indexOf(suffix.toLowerCase()) !== -1;
}

//获取文件url
export function createObjectURL(blob) {
  if (window.URL) {
    return window.URL.createObjectURL(blob);
  } else if (window.webkitURL) {
    return window.webkitURL.createObjectURL(blob);
  } else {
    return ''
  }
}

/**
 * 将base64转换为blob
 * @param dataurl
 * @returns {module:buffer.Blob}
 */
export function dataURLtoFile(dataurl, fileName) {
  // 将base64的数据部分提取出来
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  // 将Uint8Array转换为Blob对象
  const blob = new Blob([u8arr], {type: mime});

  // 创建File对象
  const file = new File([blob], fileName, {type: mime});

  return file;
}

// 生成当前时间戳
export function getTimeStamp() {
  return Date.now();
}

/**
 * 是否需要格式化时间
 * @param createTime  时间戳
 * @returns {boolean}
 */
export function needFormatDate(createTime) {
  return Date.now() - createTime <= 60 * 60 * 1000 * 24 * 2
}

// 不足两位补足两位 04:05:09
function padLeftZero(str) {
  // str=4 -> 004 截取 1 位 -> 04
  return ('00' + str).substr(str.length);
}
