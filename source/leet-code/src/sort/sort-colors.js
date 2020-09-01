/**
 * @description 计数排序
 * @author Star Shi
 * @date 2020-09-01
 * @param {*} arr
 * @returns 返回一个新结果数组
 */
function sortColors_1(arr) {
  let result = [];
  let index = arr.length;
  //计数器 count 的下标 0 1 2 分别代表红、白、蓝三个颜色
  let count = [0, 0, 0];
  // 循环统计三种颜色出现的次数
  while (index--) {
    if (count[arr[index]] !== 0) {
      count[arr[index]] = 1;
    }
    count[arr[index]]++;
  }
  // 遍历 count 计数器
  for (let i = 0, len = count.length; i < len; i++) {
    // 根据统计出现的次数，将计数器 count 的下标推入结果数据
    while (count[i]--) {
      result.push(i);
    }
  }
  return result;
}

/**
 * @description 快速排序
 * @author Star Shi
 * @date 2020-09-01
 * @param {*} arr
 * @returns 返回排序后的结果数组
 */
function sortColors_2(arr) {
  let len  = arr.length;
  if(arr.length <= 1 ){
    return arr
  }
  let pivot = arr.splice(~~(len/2),1);
  let left = [];
  let right = [];
  len = arr.length;
  for (let i = 0; i < len; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return sortColors_2(left).concat(pivot,sortColors_2(right));
}

export { sortColors_1, sortColors_2 };
