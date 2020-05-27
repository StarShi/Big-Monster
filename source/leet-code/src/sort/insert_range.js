/**
 * @description 插入区间
 * @author Star Shi
 * @date 2020-05-27
 * @param {*} arr
 * @param {*} insertInterval
 * @returns
 */
function insert_range_fn_1(arr, insertInterval) {
  let result = [];
  // 判断是否将插入区间推到结果数组，默认未推
  let flag = false;
  for (let i = 0, len = arr.length; i < len; i++) {
    let [a, b] = arr[i];
    let [c, d] = insertInterval;
    // 将区间小于插入区间的，推到结果区间数组
    if (b < c) {
      result.push(arr[i]);
    } else if (a > d) {
      // 如果区间大于插入区间
      // 如果flag为false,则先将插入区间推入结果区间数组
      if (!flag) {
        result.push(insertInterval);
        flag = true;
      }
      // 将区间大于插入区间的值推入结果区间数组
      result.push(arr[i]);
    } else {
      // 与插入区间进行合并
      insertInterval = [Math.min(a, c), Math.max(b, d)];
    }
  }
  // 如果直到循环结束都没推过插入区间，则将插入区间推入数组
  !flag && result.push(insertInterval);
  return result;
}

export { insert_range_fn_1 };
