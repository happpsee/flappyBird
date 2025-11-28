

/**
 * 用于给一个数字补充前置0
 * @param {number} num 要补充前导零的数字或字符串
 * @returns {string} 一个补充了前导0的字符串 
 */
export const padLeft = (num) => {
  if (String(num).length === 2) {
    return num;
  }
  return '0' + num;
}



/**
 * 得到当前的时间，格式为 hh: mm : ss
 * 
 * @returns {string} 一个符合格式的当前时间的字符串
 */
export const getCurrentTime = () => {
  const date = new Date();

  const hours = padLeft(date.getHours());
  const minutes = padLeft(date.getMinutes());
  const seconds = padLeft(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
}

/**
 * 获得范围内的随机数，如果传入的是单个数组，则返回数组中的任意一个元素
 * @param {Array || number} min 传入的范围的左边界，或者传入一个数组 
 * @param {*} max  传入的范围的右边界
 */
export const getRandom = (min, max) => {
  if (Array.isArray(min)) {
    return  min[Math.floor(Math.random() * min.length)];
  }

  return min + Math.random() * (max - min);
}

