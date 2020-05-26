/**
 * @description 合并乱序区间
 * @author Star Shi
 * @date 2020-05-26
 * @param {*} arr 乱序区间数组
 * @returns  合并后的区间
 */
function merge_range_fn_1(arr) {
  let result = [];
  // 对区间进行排序
  arr.sort(sortArr);
  // 取出输入区间数组的第一个元素，放入结果数组
  result.push(arr.shift());
  // 遍历输入区间数组
  for (let i = 0, len = arr.length; i < len; i++) {
    // 将输入区间数组的当前区间与结果数组的最后一个区间进行比较
    let index = result.length - 1;
    let [a, b] = result[index];
    let [c, d] = arr[i];
    // 如果结果数组中的区间的结束区间 大于等于当前区间的起始区间 则表示可以进行合并
    if (b >= c) {
      result[index] = [a, d];
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

/**
 * @description 合并乱序区间
 * @author Star Shi
 * @date 2020-05-26
 * @param {*} arr 乱序区间数组
 * @returns  合并后的区间
 */
function merge_range_fn_2(arr) {
  let result = [];
  // 取出输入区间数组的第一个元素，放入结果数组
  result.push(arr.shift());
  // 遍历输入区间数组
  for (let i = 0, len = arr.length; i < len; i++) {
    // 判断是否有合并
    let flag = false;
    // 遍历结果区间数组
    for (let j = 0, len_res = result.length; j < len_res; j++) {
      let [a, b] = result[j];
      let [c, d] = arr[i];
      // 如果结果数组中的区间的起始区间 小于等于当前区间的结束区间 则表示可以进行合并
      // 如果结果数组中的区间的结束区间 大于等于当前区间的起始区间 则表示可以进行合并
      if ((b < d && b >= c) || (a >= c && a < d)) {
        result[j] = [Math.min(a, c), Math.max(b, d)];
        flag = true;
        break;
      }
    }
    // 如果没有区间合并，则将输入数组中的当前区间，推到结果数组中
    if (!flag) {
      result.push(arr[i]);
    }
  }
  return result;
}

function sortArr(a, b) {
  return a[0] - b[0];
}

export { merge_range_fn_1, merge_range_fn_2 };
