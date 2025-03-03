export const useEmojiParse = (allEmoji, val) => {
  //解析表情
  const reg = /\[.+?\]/g
  val = val.replace(reg, (str) => {
    const emojiPath = allEmoji[str]
    //表情库不存在的就默认返回原字符串
    if (!emojiPath) {
      return str
    }
    return [
      '<img src="',
      emojiPath,
      '" width="18" height="18" alt="',
      str,
      '" style="margin: 0 1px; vertical-align: text-bottom"',
      '/>'
    ].join('');
  })
  return val
}

export const resetEmojiText = (content) => {
  // 创建临时容器
  const container = document.createElement('div');
  container.innerHTML = content;

  // 找到所有表情图片
  const emojiImgs = container.querySelectorAll('img.emoji');

  // 替换为alt文本
  emojiImgs.forEach(img => {
    const textNode = document.createTextNode(img.alt);
    img.parentNode.replaceChild(textNode, img);
  });

  return container.innerHTML;
}
