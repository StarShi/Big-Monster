/**
 * @description 查找 
 * @author Star Shi
 * @date 2020-01-14
 * @export
 * @class Search
 */
export default class Search {

    /**
     * @description 线性 查找 找到一个满足条件的值，则返回该值下标，若没找到，则直接返回-1
     * @author Star Shi
     * @date 2020-01-14
     * @param {any[]} list
     * @param {*} value
     * @returns {number}
     */
    public line(list: any[], value: any): number {
        let len: number = list.length;
        for (let i: number = 0; i < len; i++) {
            if (list[i] === value) {
                return i;
            }
        }
        return -1;
    }

    /**
     * @description 二分查找 假设列表元素从小到大排序，找到数组中间元素的下标mid，如果寻找值>中间值，往右寻找中间值，继续递归查找，如果寻找值<中间值,往右寻找中间值递归查找，如果寻找值=中间值，则返回该中间值的下标。
     * @author Star Shi
     * @date 2020-01-14
     * @param {any[]} list
     * @param {*} value
     * @param {number} [left=0]
     * @param {number} [right=list.length-1]
     * @returns {number}
     */
    
    public binary(list: any[], value: any, left: number = 0, right: number = list.length - 1, ): number {
        // 如果 left 大于 right 时，说明查找值并不存在，直接返回 -1
        if (left > right) { return -1 }
        let mid: number = Math.floor((left + right) / 2);
        if (value > list[mid]) {// 向右递归
            return this.binary(list, value, mid + 1, right);
        } else if (value < list[mid]) {// 向左递归
            return this.binary(list, value, left, mid - 1);
        } else {
            return mid
        }
    }
}