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
 * 格式化时间 今日内显示今日 超过一天显示昨天，否则显示日期
 * @param timestamp 时间戳
 * @returns {string}
 */
export function formatTime(timestamp) {
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
 * 数字格式化 输出"501" "1.5K" "1.2W"
 * @param num
 * @returns {string}
 */
export function formatNumber(num) {
  if (num >= 1000 && num < 10000) {
    return (num / 1000).toFixed(1) + 'K';
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'W';
  } else {
    return num.toString();
  }
}

/**
 * 是否需要格式化时间
 * @param createTime  时间戳
 * @returns {boolean}
 */
export function needFormatDate(createTime) {
  return Date.now() - createTime <= 60 * 60 * 1000 * 24 * 2
}
