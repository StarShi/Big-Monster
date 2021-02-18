
/**
 * @description 大数相加
 * @author Star Shi
 * @date 2021-02-18
 * @param {*} a
 * @param {*} b
 * @returns 返回相加的结果
 */
function addString(a, b) {
  let aLength = a.length;
  let bLength = b.length;
  let maxLength = Math.max(aLength, bLength);
  // 补零
  if (aLength < maxLength) {
    for (let i = 0,len = maxLength-aLength; i < len; i++) {
      a =  '0'+ a
    }
  }
  if (bLength < maxLength) {
    for (let i = 0,len = maxLength-bLength; i < len; i++) {
      b =  '0'+ b
    }
  }
  let result = "";//结果字符串 
  let flag = 0;// 满十进一标记
  for(let i = maxLength - 1;i>=0;i--){
    let temp = parseInt(a[i]) + parseInt(b[i]) + flag;
    flag = Math.floor(temp / 10);
    result = '' + temp % 10 + result;
  }
  if(flag === 1){
    result = "1" + result
  }
  return result;
}

export { addString };
