import { deepClone } from "../../utils/tools";

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

    
    /**
     * @description 二分查找 非递归实现
     * @author Star Shi
     * @date 2020-04-13
     * @param {any[]} list
     * @param {*} value
     * @returns {number}
     */
    public binary_no_recursion(list: any[], value: any): number {
        let left: number = 0;
        let right: number = list.length - 1;
        while (left <= right) {
            let mid = ~~((left + right) / 2);
            if (list[mid] === value) {
                return mid
            } else if (list[mid] > value) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return -1
    }

    /**
     * @description 插值查找 与二分查找相似，只不过mid的查找方式不同 mid = left +  (right - left) * (findVal - list[left])/ (list[right] - list[left])
     * @author Star Shi
     * @date 2020-01-16
     * @param {any[]} list
     * @param {*} value
     * @param {number} [left=0]
     * @param {number} [right=list.length - 1]
     * @returns
     */
    public insert(list: any[], value: any, left: number = 0, right: number = list.length - 1, ) {
        // 如果 left 大于 right 时，说明查找值并不存在，直接返回 -1  之所以判断value 的值，是防止待查找的数过大时，计算出的mid越界
        if (left > right || value < list[0] || value > list[list.length - 1]) { return -1 }
        let mid: number = Math.floor(left + (right - left) * (value - list[left]) / (list[right] - list[left]));
        if (value > list[mid]) {// 向右递归
            return this.binary(list, value, mid + 1, right);
        } else if (value < list[mid]) {// 向左递归
            return this.binary(list, value, left, mid - 1);
        } else {
            return mid
        }
    }

    /**
     * @description 斐波那契查找
     * @author Star Shi
     * @date 2020-01-16
     * @param {any[]} list
     * @param {*} value
     * @returns
     */
    public fibonacci(list: any[], value: any) {
        let left: number = 0;
        let right: number = list.length - 1;
        let k: number = 0;// 存放斐波那契数列的分割下标
        let mid: number = 0;// 存放mid值
        let fib: number[] = this.createFib(20);
        while (right > fib[k] - 1) {
            k++;
        }
        // 因为最终所得的fib[k]的值可能大于数组的长度，所以需要将数组长度延长
        // 不足的位置用数组最后一位补齐
        let temp: any[] = deepClone(list);
        for (let i: number = right + 1; i < fib[k]; i++) {
            temp[i] = temp[right];
        }
        // 使用while循环，查找value
        while (left <= right) {
            mid = left + fib[k - 1] - 1;
            if (value < temp[mid]) {//条件成立，应继续向左查找
                right = mid - 1;
                // F(k) = F(k-1) + F(k-2)
                // 因为mid位置之前，有F(k-1)个元素，所以仍然可以拆分
                k--;
            } else if (value > temp[mid]) {// 往右边继续查找
                // F(k) = F(k-1) + F(k-2)
                // 因为mid位置之后，有F(k-2)个元素，所以仍然可以拆分
                left = mid + 1;
                k -= 2;
            } else {
                if (mid <= right) {
                    return mid;
                } else {
                    return right;
                }
            }
        }
        return -1;
    }

    // 创建一个斐波那契数列
    public createFib(n: number): number[] {
        let fib: number[] = [];
        fib[0] = 1;
        fib[1] = 1;
        for (let i: number = 2; i < n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        return fib;
    }
}