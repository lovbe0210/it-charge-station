// 格式化时间
export function formatDate(date, fmt) {
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

// 不足两位补足两位 04:05:09
function padLeftZero(str) {
  // str=4 -> 004 截取 1 位 -> 04
  return ('00' + str).substr(str.length);
}

// 处理大于1w的数字
export function handleNum(num) {
  if (num > 10000) {
    num = (num / 10000).toFixed(1);
    return num + '万';
  } else {
    return num;
  }
}

// 处理音乐时长的时间
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

// 将播放时长还原为秒数
export function returnSecond(time) {
  time = time.split(':');
  let m = parseInt(time[0]);
  let s = parseInt(time[1]);
  return m * 60 + s;
}

// 生成当前时间戳
export function getTimeStamp() {
  return Date.now();
}

// 获取预置的随机颜色
export function getRandomColor() {
  let colorsArray = ['pink', 'red', 'orange', 'green', 'blue', 'purple'];
  let index = Math.floor(Math.random() * (colorsArray.length));
  return colorsArray[index];
}

// 全球国家代码
// eslint-disable-next-line no-unused-vars
const prefixSorted = [
  {prefix: '1', en: 'USA', cn: '美国'},
  {prefix: '1', en: 'PuertoRico', cn: '波多黎各'},
  {prefix: '1', en: 'Canada', cn: '加拿大'},
  {prefix: '7', en: 'Russia', cn: '俄罗斯'},
  {prefix: '7', en: 'Kazeakhstan', cn: '哈萨克斯坦'},
  {prefix: '20', en: 'Egypt', cn: '埃及'},
  {prefix: '27', en: 'South Africa', cn: '南非'},
  {prefix: '30', en: 'Greece', cn: '希腊'},
  {prefix: '31', en: 'Netherlands', cn: '荷兰'},
  {prefix: '32', en: 'Belgium', cn: '比利时'},
  {prefix: '33', en: 'France', cn: '法国'},
  {prefix: '34', en: 'Spain', cn: '西班牙'},
  {prefix: '36', en: 'Hungary', cn: '匈牙利'},
  {prefix: '40', en: 'Romania', cn: '罗马尼亚'},
  {prefix: '41', en: 'Switzerland', cn: '瑞士'},
  {prefix: '43', en: 'Austria', cn: '奥地利'},
  {prefix: '44', en: 'United Kingdom', cn: '英国'},
  {prefix: '44', en: 'Jersey', cn: '泽西岛'},
  {prefix: '44', en: 'Isle of Man', cn: '马恩岛'},
  {prefix: '44', en: 'Guernsey', cn: '根西'},
  {prefix: '45', en: 'Denmark', cn: '丹麦'},
  {prefix: '46', en: 'Sweden', cn: '瑞典'},
  {prefix: '47', en: 'Norway', cn: '挪威'},
  {prefix: '48', en: 'Poland', cn: '波兰'},
  {prefix: '51', en: 'Peru', cn: '秘鲁'},
  {prefix: '52', en: 'Mexico', cn: '墨西哥'},
  {prefix: '53', en: 'Cuba', cn: '古巴'},
  {prefix: '54', en: 'Argentina', cn: '阿根廷'},
  {prefix: '55', en: 'Brazill', cn: '巴西'},
  {prefix: '56', en: 'Chile', cn: '智利'},
  {prefix: '57', en: 'Colombia', cn: '哥伦比亚'},
  {prefix: '58', en: 'Venezuela', cn: '委内瑞拉'},
  {prefix: '60', en: 'Malaysia', cn: '马来西亚'},
  {prefix: '61', en: 'Australia', cn: '澳大利亚'},
  {prefix: '62', en: 'Indonesia', cn: '印度尼西亚'},
  {prefix: '63', en: 'Philippines', cn: '菲律宾'},
  {prefix: '64', en: 'NewZealand', cn: '新西兰'},
  {prefix: '65', en: 'Singapore', cn: '新加坡'},
  {prefix: '66', en: 'Thailand', cn: '泰国'},
  {prefix: '81', en: 'Japan', cn: '日本'},
  {prefix: '82', en: 'Korea', cn: '韩国'},
  {prefix: '84', en: 'Vietnam', cn: '越南'},
  {prefix: '86', en: 'China', cn: '中国'},
  {prefix: '90', en: 'Turkey', cn: '土耳其'},
  {prefix: '91', en: 'Indea', cn: '印度'},
  {prefix: '92', en: 'Pakistan', cn: '巴基斯坦'},
  {prefix: '93', en: 'Italy', cn: '意大利'},
  {prefix: '93', en: 'Afghanistan', cn: '阿富汗'},
  {prefix: '94', en: 'SriLanka', cn: '斯里兰卡'},
  {prefix: '94', en: 'Germany', cn: '德国'},
  {prefix: '95', en: 'Myanmar', cn: '缅甸'},
  {prefix: '98', en: 'Iran', cn: '伊朗'},
  {prefix: '212', en: 'Morocco', cn: '摩洛哥'},
  {prefix: '213', en: 'Algera', cn: '阿尔格拉'},
  {prefix: '216', en: 'Tunisia', cn: '突尼斯'},
  {prefix: '218', en: 'Libya', cn: '利比亚'},
  {prefix: '220', en: 'Gambia', cn: '冈比亚'},
  {prefix: '221', en: 'Senegal', cn: '塞内加尔'},
  {prefix: '222', en: 'Mauritania', cn: '毛里塔尼亚'},
  {prefix: '223', en: 'Mali', cn: '马里'},
  {prefix: '224', en: 'Guinea', cn: '几内亚'},
  {prefix: '225', en: 'Cote divoire', cn: '科特迪沃'},
  {prefix: '226', en: 'Burkina Faso', cn: '布基纳法索'},
  {prefix: '227', en: 'Niger', cn: '尼日尔'},
  {prefix: '228', en: 'Togo', cn: '多哥'},
  {prefix: '229', en: 'Benin', cn: '贝宁'},
  {prefix: '230', en: 'Mauritius', cn: '毛里求斯'},
  {prefix: '231', en: 'Liberia', cn: '利比里亚'},
  {prefix: '232', en: 'Sierra Leone', cn: '塞拉利昂'},
  {prefix: '233', en: 'Ghana', cn: '加纳'},
  {prefix: '234', en: 'Nigeria', cn: '尼日利亚'},
  {prefix: '235', en: 'Chad', cn: '乍得'},
  {prefix: '236', en: 'Central African Republic', cn: '中非共和国'},
  {prefix: '237', en: 'Cameroon', cn: '喀麦隆'},
  {prefix: '238', en: 'Cape Verde', cn: '佛得角'},
  {prefix: '239', en: 'Sao Tome and Principe', cn: '圣多美和普林西比'},
  {prefix: '240', en: 'Guinea', cn: '几内亚'},
  {prefix: '241', en: 'Gabon', cn: '加蓬'},
  {prefix: '242', en: 'Republic of the Congo', cn: '刚果共和国'},
  {prefix: '243', en: 'Democratic Republic of the Congo', cn: '刚果民主共和国'},
  {prefix: '244', en: 'Angola', cn: '安哥拉'},
  {prefix: '247', en: 'Ascension', cn: '阿森松岛'},
  {prefix: '248', en: 'Seychelles', cn: '塞舌尔'},
  {prefix: '249', en: 'Sudan', cn: '苏丹'},
  {prefix: '250', en: 'Rwanda', cn: '卢旺达'},
  {prefix: '251', en: 'Ethiopia', cn: '埃塞俄比亚'},
  {prefix: '253', en: 'Djibouti', cn: '吉布提'},
  {prefix: '254', en: 'Kenya', cn: '肯尼亚'},
  {prefix: '255', en: 'Tanzania', cn: '坦桑尼亚'},
  {prefix: '256', en: 'Uganda', cn: '乌干达'},
  {prefix: '257', en: 'Burundi', cn: '布隆迪'},
  {prefix: '258', en: 'Mozambique', cn: '莫桑比克'},
  {prefix: '260', en: 'Zambia', cn: '赞比亚'},
  {prefix: '261', en: 'Madagascar', cn: '马达加斯加'},
  {prefix: '262', en: 'Reunion', cn: '留尼汪'},
  {prefix: '262', en: 'Mayotte', cn: '马约特'},
  {prefix: '263', en: 'Zimbabwe', cn: '津巴布韦'},
  {prefix: '264', en: 'Namibia', cn: '纳米比亚'},
  {prefix: '265', en: 'Malawi', cn: '马拉维'},
  {prefix: '266', en: 'Lesotho', cn: '莱索托'},
  {prefix: '267', en: 'Botwana', cn: '博茨瓦纳'},
  {prefix: '268', en: 'Swaziland', cn: '斯威士兰'},
  {prefix: '269', en: 'Comoros', cn: '科摩罗'},
  {prefix: '297', en: 'Aruba', cn: '阿鲁巴'},
  {prefix: '298', en: 'Faroe Islands', cn: '法罗群岛'},
  {prefix: '299', en: 'Greenland', cn: '格陵兰'},
  {prefix: '350', en: 'Gibraltar', cn: '直布罗陀'},
  {prefix: '351', en: 'Portugal', cn: '葡萄牙'},
  {prefix: '352', en: 'Luxembourg', cn: '卢森堡'},
  {prefix: '353', en: 'Ireland', cn: '爱尔兰'},
  {prefix: '354', en: 'Iceland', cn: '冰岛'},
  {prefix: '355', en: 'Albania', cn: '阿尔巴尼亚'},
  {prefix: '356', en: 'Malta', cn: '马耳他'},
  {prefix: '357', en: 'Cyprus', cn: '塞浦路斯'},
  {prefix: '358', en: 'Finland', cn: '芬兰'},
  {prefix: '359', en: 'Bulgaria', cn: '保加利亚'},
  {prefix: '370', en: 'Lithuania', cn: '立陶宛'},
  {prefix: '371', en: 'Latvia', cn: '拉脱维亚'},
  {prefix: '372', en: 'Estonia', cn: '爱沙尼亚'},
  {prefix: '373', en: 'Moldova', cn: '摩尔多瓦'},
  {prefix: '374', en: 'Armenia', cn: '亚美尼亚'},
  {prefix: '375', en: 'Belarus', cn: '白俄罗斯'},
  {prefix: '376', en: 'Andorra', cn: '安道尔'},
  {prefix: '377', en: 'Monaco', cn: '摩纳哥'},
  {prefix: '378', en: 'San Marino', cn: '圣马力诺'},
  {prefix: '380', en: 'Ukraine', cn: '乌克兰'},
  {prefix: '381', en: 'Serbia', cn: '塞尔维亚'},
  {prefix: '382', en: 'Montenegro', cn: '黑山'},
  {prefix: '383', en: 'Kosovo', cn: '科索沃'},
  {prefix: '385', en: 'Croatia', cn: '克罗地亚'},
  {prefix: '386', en: 'Slovenia', cn: '斯洛文尼亚'},
  {prefix: '387', en: 'Bosnia and Herzegovina', cn: '波斯尼亚和黑塞哥维那'},
  {prefix: '389', en: 'Macedonia', cn: '马其顿'},
  {prefix: '420', en: 'Czech Republic', cn: '捷克共和国'},
  {prefix: '421', en: 'Slovakia', cn: '斯洛伐克'},
  {prefix: '423', en: 'Liechtenstein', cn: '列支敦士登'},
  {prefix: '501', en: 'Belize', cn: '伯利兹'},
  {prefix: '502', en: 'Guatemala', cn: '危地马拉'},
  {prefix: '503', en: 'EISalvador', cn: '艾萨尔瓦多'},
  {prefix: '504', en: 'Honduras', cn: '洪都拉斯'},
  {prefix: '505', en: 'Nicaragua', cn: '尼加拉瓜'},
  {prefix: '506', en: 'Costa Rica', cn: '哥斯达黎加'},
  {prefix: '507', en: 'Panama', cn: '巴拿马'},
  {prefix: '509', en: 'Haiti', cn: '海地'},
  {prefix: '590', en: 'Guadeloupe', cn: '瓜德罗普'},
  {prefix: '591', en: 'Bolivia', cn: '玻利维亚'},
  {prefix: '592', en: 'Guyana', cn: '圭亚那'},
  {prefix: '593', en: 'Ecuador', cn: '厄瓜多尔'},
  {prefix: '594', en: 'French Guiana', cn: '法属圭亚那'},
  {prefix: '595', en: 'Paraguay', cn: '巴拉圭'},
  {prefix: '596', en: 'Martinique', cn: '马提尼克'},
  {prefix: '597', en: 'Suriname', cn: '苏里南'},
  {prefix: '598', en: 'Uruguay', cn: '乌拉圭'},
  {prefix: '599', en: 'Netherlands Antillse', cn: '荷属安的列斯'},
  {prefix: '670', en: 'Timor Leste', cn: '东帝汶'},
  {prefix: '673', en: 'Brunei', cn: '文莱'},
  {prefix: '675', en: 'Papua New Guinea', cn: '巴布亚新几内亚'},
  {prefix: '676', en: 'Tonga', cn: '汤加'},
  {prefix: '678', en: 'Vanuatu', cn: '瓦努阿图'},
  {prefix: '679', en: 'Fiji', cn: '斐济'},
  {prefix: '682', en: 'Cook Islands', cn: '库克群岛'},
  {prefix: '684', en: 'Samoa Eastern', cn: '萨摩亚东部'},
  {prefix: '685', en: 'Samoa Western', cn: '萨摩亚西部'},
  {prefix: '687', en: 'New Caledonia', cn: '新喀里多尼亚'},
  {prefix: '689', en: 'French Polynesia', cn: '法属波利尼西亚'},
  {prefix: '852', en: 'Hong Kong', cn: '香港'},
  {prefix: '853', en: 'Macao', cn: '澳门'},
  {prefix: '855', en: 'Cambodia', cn: '柬埔寨'},
  {prefix: '856', en: 'Laos', cn: '老挝'},
  {prefix: '880', en: 'Bangladesh', cn: '孟加拉国'},
  {prefix: '886', en: 'Taiwan', cn: '台湾'},
  {prefix: '960', en: 'Maldives', cn: '马尔代夫'},
  {prefix: '961', en: 'Lebanon', cn: '黎巴嫩'},
  {prefix: '962', en: 'Jordan', cn: '约旦'},
  {prefix: '963', en: 'Syria', cn: '叙利亚'},
  {prefix: '964', en: 'Iraq', cn: '伊拉克'},
  {prefix: '965', en: 'Kuwait', cn: '科威特'},
  {prefix: '966', en: 'Saudi Arabia', cn: '沙特阿拉伯'},
  {prefix: '967', en: 'Yemen', cn: '也门'},
  {prefix: '968', en: 'Oman', cn: '阿曼'},
  {prefix: '970', en: 'Palestinian', cn: '巴勒斯坦'},
  {prefix: '971', en: 'United Arab Emirates', cn: '阿拉伯联合酋长国'},
  {prefix: '972', en: 'Israel', cn: '以色列'},
  {prefix: '973', en: 'Bahrain', cn: '巴林'},
  {prefix: '974', en: 'Qotar', cn: '库塔'},
  {prefix: '975', en: 'Bhutan', cn: '不丹'},
  {prefix: '976', en: 'Mongolia', cn: '蒙古'},
  {prefix: '977', en: 'Nepal', cn: '尼泊尔'},
  {prefix: '992', en: 'Tajikistan', cn: '塔吉克斯坦'},
  {prefix: '993', en: 'Turkmenistan', cn: '土库曼斯坦'},
  {prefix: '994', en: 'Azerbaijan', cn: '阿塞拜疆'},
  {prefix: '995', en: 'Georgia', cn: '格鲁吉亚'},
  {prefix: '996', en: 'Kyrgyzstan', cn: '吉尔吉斯斯坦'},
  {prefix: '998', en: 'Uzbekistan', cn: '乌兹别克斯坦'},
  {prefix: '1242', en: 'Bahamas', cn: '巴哈马'},
  {prefix: '1246', en: 'Barbados', cn: '巴巴多斯'},
  {prefix: '1264', en: 'Anguilla', cn: '安圭拉'},
  {prefix: '1268', en: 'Antigua and Barbuda', cn: '安提瓜和巴布达'},
  {prefix: '1340', en: 'Virgin Islands', cn: '维尔京群岛'},
  {prefix: '1345', en: 'Cayman Islands', cn: '开曼群岛'},
  {prefix: '1441', en: 'Bermuda', cn: '百慕大'},
  {prefix: '1473', en: 'Grenada', cn: '格林纳达'},
  {prefix: '1649', en: 'Turks and Caicos Islands', cn: '特克斯和凯科斯群岛'},
  {prefix: '1664', en: 'Montserrat', cn: '蒙特塞拉特'},
  {prefix: '1671', en: 'Guam', cn: '关岛'},
  {prefix: '1758', en: 'St.Lucia', cn: '圣卢西亚'},
  {prefix: '1767', en: 'Dominica', cn: '多米尼加'},
  {prefix: '1784', en: 'St.Vincent', cn: '圣文森特'},
  {prefix: '1809', en: 'Dominican Republic', cn: '多米尼加共和国'},
  {prefix: '1868', en: 'Trinidad and Tobago', cn: '特立尼达和多巴哥'},
  {prefix: '1869', en: 'St Kitts and Nevis', cn: '圣基茨和尼维斯'},
  {prefix: '1876', en: 'Jamaica', cn: '牙买加'}
];

// 国内手机号码
const chinaPhoneReg = /^1[3456789]\d{9}$/;
// 国际手机号码
const otherPhoneReg = /^[0-9]+(-[0-9]+)*$/;
// 邮箱验证
export const emailRegex = /^([a-z0-9A-Z]+[-|.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?.)+[a-zA-Z]{2,}$/;
// 个人主页路径验证
export const domainRegex = /^[a-z0-9-_.]{4,}$/;

export function verifyTelLawful(telephone) {
  if (telephone == null || telephone.length === 0) {
    return false;
  }
  let prefix = telephone.indexOf("+");
  if (prefix === -1) {
    // 国内手机号
    return chinaPhoneReg.test(telephone);
  }
  let replace = telephone.replace('+', '');
  let filter = prefixSorted.filter(pre => {
    return replace.startWith(pre.prefix);
  });
  if (filter == null || filter.length === 0) {
    return false;
  }
  let filterPrefix = filter[0].prefix;
  replace = replace.replace(filterPrefix, '');
  if (filterPrefix === '86') {
    // 校验国内手机号码格式
    return chinaPhoneReg.test(replace);
  } else {
    return otherPhoneReg.test(replace);
  }

}

/**
 * 将base64转换为blob
 * @param dataurl
 * @returns {module:buffer.Blob}
 */
export function dataURLtoFile(dataurl, fileName) {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  let blob = new Blob([u8arr], {type: mime});
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
}
