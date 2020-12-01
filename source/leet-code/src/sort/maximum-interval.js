
// 求间距
function maximunmInterval(arr) {
  let len = arr.length;
  let maxNum = 0;
  // 如果数组长度小于2，直接返回0
  if (len < 2) {
    return maxNum;
  }
  // 对数组进行基数排序
  radixSort(arr);
  // 遍历有序数组，取出最大差值
  for (let i = 1, len = arr.length; i < len; i++) {
    let interval = arr[i] - arr[i - 1];
    if (interval > maxNum) {
      maxNum = interval;
    }
  }
  return maxNum;
}

// 基数排序
function radixSort(arr) {
  let arrLength = arr.length;
  let maxNumLength = Math.max(...arr).toString().length; // 最大数的位数
  let digit = 1; // 按位数的大小排序，先排个位 1 10 100 ，digit *= 10
  let bucket = new Array(10);
  for (let i = 0; i < maxNumLength; i++, digit *= 10) {
    for (let j = 0; j < arrLength; j++) {
      // 计算当前数应放在对应bucket的位置，即按digit取出的数对应的下标 0 - 9
      let index = Math.floor(arr[j] / digit) % 10;
      if(!bucket[index]){
        bucket[index] = []
      }
      bucket[index].push(arr[j]);

    }
    let pos = 0;
    // 按基数排完一次，即完成一位数的比较，就遍历十个桶把顺序更新到对应的数组中
    for (let k = 0; k < bucket.length; k++) {
      // 如果存在有效数据，则遍历对应的桶，放入原始数组中
      while(bucket[k] && bucket[k].length > 0){
        arr[pos] = bucket[k].shift();
        pos++;
      }
    }
  }
}

export {
  radixSort,
  maximunmInterval
}