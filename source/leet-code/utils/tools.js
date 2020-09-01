/**
 * @description 交换数组元素
 * @author Star Shi
 * @date 2020-09-01
 * @param {*} list 数组
 * @param {*} i 需要交换元素的下标
 * @param {*} j 需要交换元素的下标
 */
function swap(list,i,j){
  let temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

export { swap }