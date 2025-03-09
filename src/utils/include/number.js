/**
 * 数字格式化 大于1万
 * @param num
 * @returns {*|string}
 */
export function handleNum(num) {
  if (num > 10000) {
    num = (num / 10000).toFixed(1);
    return num + '万';
  } else {
    return num;
  }
}

/**
 * 数字格式化 输出"501" "1.5K" "1.2W"
 * @param num
 * @returns {string}
 */
export function formatNumber(num) {
  if (!num) {
    return 0;
  }
  if (num > 1000 && num <= 10000) {
    return (num / 1000).toFixed(1) + 'K';
  } else if (num > 10000) {
    return (num / 10000).toFixed(1) + 'W';
  } else {
    return num.toString();
  }
}

/**
 * 处理音乐时长的时间，将毫秒数或秒数转换为字符串
 * @param time
 * @returns {string}
 */
export function handleMusicTime(time) {
  // 如果超过了100000 基本都是毫秒为单位的了 先转成秒的
  time = typeof time === "number" ? time : parseInt(time);
  if (time > 10000) {
    time = Math.floor(time / 1000);
  } else {
    time = Math.floor(time);
  }
  let m = Math.floor(time / 60);
  let s = Math.floor(time % 60);
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  return m + ':' + s;
}

/**
 * 将字符串转换为秒数时间
 * @param time
 * @returns {number}
 */
export function returnSecond(time) {
  time = time.split(':');
  let m = parseInt(time[0]);
  let s = parseInt(time[1]);
  return m * 60 + s;
}
