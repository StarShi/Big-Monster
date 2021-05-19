// 根据冒泡排序
function bubbleSort(nums) {
  let numsLength = nums.length;
  if (numsLength < 2) {
    return nums;
  }
  let flag = false; //判断是否交换过，一次冒泡的过程中，若没有产生交换(flag = false)，即认为序列已经有序，无需继续进行冒泡
  // 冒泡排序
  for (let i = 0; i < numsLength - 1; i++) {
    for (let j = i + 1; j < numsLength; j++) {
      // 找到数据最小的值
      if (nums[i] > nums[j]) {
        swap(nums, i, j);
        flag = true;
      }
    }
    //如果该轮冒泡中没有产生交换，则认为序列已经有序，可直接退出外层循环，结束冒泡
    if (!flag) {
      break;
    } else {
      flag = false; //重置判断开关，继续下次冒泡
    }
  }
}

// 交换位置
function swap(nums, i, j) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

// 比较前后两个数组合的大小，取最大的值
function maxNum(nums) {
  let numsLength = nums.length;
  if (numsLength === 0) {
    return '0';
  }
  if (numsLength === 1) {
    return nums[0].toString();
  }
  // 进行排序
  bubbleSort(nums);
  // 取出首位，必须转成字符串，否则组合的时候会进行隐式转换，变成两数相加而不是组合
  let maxNumber = nums.shift().toString();
  numsLength = nums.length;
  // 与其余的数进行组合
  for (let i = 0; i < numsLength; i++) {
    // 返回组合中最大的值
    maxNumber = Math.max(maxNumber + nums[i], nums[i] + [maxNumber]).toString();
  }
  return maxNumber;
}

export { bubbleSort, maxNum };
