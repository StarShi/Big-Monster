import { deepClone } from "../../utils/tools";
import TwoDimensionArray from "../../src/two-array";
/**
 * @description 排序
 * @author Star Shi
 * @date 2020-01-07
 * @export
 * @class Sort
 */
export default class Sort {

    /**
     * @description 冒泡排序：从下标较小的元素开始，依次比较相邻的值，若发现逆序，则交换
     * @author Star Shi
     * @date 2020-01-07
     * @param {any[]} [list=[]]
     */
    public bubble(list: any[] = []): any[] {
        let newList: any[] = deepClone(list);
        let len: number = newList.length;
        let flag: boolean = false;//判断是否交换过，一次冒泡的过程中，若没有产生交换(flag = false)，即认为序列已经有序，无需继续进行冒泡
        for (let i: number = 0; i < len; i++) {
            for (let j: number = 0; j < len - i; j++) {
                // 如果逆序，则交换，冒泡一趟下来，可能发生零次或数次交换，但末尾一定是最大值
                // 交换发生在相邻元素之间
                if (newList[j] > newList[j + 1]) {
                    flag = true;
                    this.swap(newList, j, j + 1);// 交换
                }
            }
            //如果该轮冒泡中没有产生交换，则认为序列已经有序，可直接退出外层循环，结束冒泡
            if (!flag) {
                break;
            } else {
                flag = false;//重置判断开关，继续下次冒泡
            }
        }
        return newList;
    }

    /**
     * @description 选择排序 依次比较序列中的数与首个数的大小，若逆序，则交换
     * @author Star Shi
     * @date 2020-01-08
     * @param {any[]} [list=[]]
     * @returns {any[]}
     */
    public select(list: any[] = []): any[] {
        let newList: any[] = deepClone(list);
        let len: number = newList.length;
        for (let i: number = 0; i < len; i++) {
            for (let j: number = i + 1; j < len; j++) {
                // 如果逆序，则交换，循环一趟下来，可选出最小值排在队列之首
                // 与冒泡相似，但选择排序的交换只固定存在与首位元素的交换
                if (newList[i] > newList[j]) {
                    this.swap(newList, i, j);// 交换
                }
            }
        }
        return newList;
    }

    /**
     * @description 插入排序 默认序列第一个元素为有序序列，从第二个元素开始，寻找其在有序序列中的合适的位置并插入，得到一个新的有序序列，直到所有的记录插入完为止
     * @author Star Shi
     * @date 2020-01-08
     * @param {any[]} [list=[]]
     * @returns {any[]}
     */
    public insert(list: any[] = []): any[] {
        let newList: any[] = deepClone(list);
        let len = newList.length;
        let index: number;
        let tempValue: any;
        // 默认序列第一个元素为有序序列，从第二个元素开始
        for (let i: number = 1; i < len; i++) {
            tempValue = newList[i];
            index = i - 1;
            // 与选择排序相似，选择排序选择最小（最大）的插在序列首个元素，只与序列首个元素做交换
            // 插入排序，元素插入位置不确定，需要与有序序列中的所有元素进行比较，确定合适位置再做交换
            // 如果待插入元素逆序，寻找待插入的位置，一次性插入
            if (newList[index + 1] < newList[index]) {
                while (index >= 0 && tempValue < newList[index]) {
                    newList[index + 1] = newList[index];//进行移位
                    index--;
                }
                // 因为最后一次满足条件时进行了index--，判断是否终止移位，所以在找到适合的位置时，需要对进行index + 1 
                newList[index + 1] = tempValue;
            }
        }
        return newList
    }

    /**
     * @description 希尔排序 分成 d = len / 2 组，向下取整，对每组进行直接插入排序，让其尽可能接近最终的位置；
     *              使 d = d / 2,再次分组为上次步长的一半，重复分组与排序；
     *              直至步长 d = 1 时，即把所有元素放在同一组中完成一次直接插入排序为止；
     * @author Star Shi
     * @date 2020-01-08
     * @param {any[]} list
     * @returns {any[]}
     */
    public shell(list: any[]): any[] {
        let newList: any[] = deepClone(list);
        let len = newList.length;
        // 假设分组时，每组两个元素
        // 分成 len / 2 组，向下取整，得到步长
        // 每轮排序时，取上次步长的一半
        // 直到步长为1时，即把所有元素放在同一组中，完成一次完整的插入排序
        let index: number;
        let tempValue: any;
        for (let d: number = Math.floor(len / 2); d > 0; d = Math.floor(d / 2)) {
            // 初始化 i = d ，取间隔位置的元素向前插入
            // 为什么取间隔位置的元素？与插入排序一样，每个分组中的第一个元素默认有序，从每个分组的第二位开始比较插入即可
            for (let i: number = d; i < len; i++) {
                tempValue = newList[i];
                index = i - d;
                // 如果待插入元素逆序，寻找待插入的位置，一次性插入
                if (newList[index + d] < newList[index]) {
                    while (index >= 0 && tempValue < newList[index]) {
                        newList[index + d] = newList[index];//移位
                        index -= d;
                    }
                    newList[index + d] = tempValue;
                }
            }
        }
        return newList;
    }

    /**
     * @description 快速排序 首先序列末尾数据作为分界，然后将所有比它小的数都放到它左边，所有比它大的数都放到它右边，完成一次快排序，继续向左右两边递归快排
     * @author Star Shi
     * @date 2020-01-13
     * @param {any[]} list
     * @param {number} start
     * @param {number} end
     */
    public quick(list: any[], start: number, end: number): void {
        if (start >= end) { return }
        let pivot: any = list[end];//末尾值为分界值
        let left: number = start;
        let right: number = end - 1;//在获取分片分界值时，数组已经将三个数中最大的一个数，放置分片的末尾，所以只需将下标减一 即可得的将right下标指向分解值
        // 当left 与 right 不相遇时，循环进行检索
        while (left < right) {
            // 找到一个比分界值pivot更大的值的位置，如果没找到继续往右找
            while (left <= right && list[left] <= pivot) {
                left++;
            }
            // 找到一个比分界值pivot更小的值的位置,如果没找到继续往左找
            while (left <= right && list[right] > pivot) {
                right--;
            }
            // 找到之后，如果左指针小于右指针
            if (left < right) {
                // 使找到的两个值进行交换
                this.swap(list, left, right);
            } else {
                break;
            }
        }
        // 将分界值放置在正确的位置
        this.swap(list, left, end);
        // 排左边
        this.quick(list, start, left - 1);
        // 排右边
        this.quick(list, left + 1, end);

    }

    /**
     * @description 归并排序 递归折半拆分序列，直至形成只有单个元素的有序的子序列，然后在进行两两合并
     * @author Star Shi
     * @date 2020-01-13
     * @param {any[]} list
     * @param {number} start
     * @param {number} end
     */
    public mergeSort(list: any[], start: number, end: number) {
        if (start >= end) return //如果只有一个数字，直接返回
        let mid: number = Math.floor((start + end) / 2);
        // 递归分治排序
        // 拆分mid左边的序列
        this.mergeSort(list, start, mid);
        // 拆分mid右边的序列
        this.mergeSort(list, mid + 1, end);
        // 合并整个序列
        this.merge(list, start, mid, end);
    }

    /**
     * @description 如果有一个序列，序列分成两半，并且各自有序，使之进行排序合并
     * @author Star Shi
     * @date 2020-01-13
     * @param {any[]} list
     * @param {number} start
     * @param {number} mid
     * @param {number} end
     */
    public merge(list: any[], start: number, mid: number, end: number): void {
        let temp: any[] = [];
        let left: number = start;
        let right: number = mid + 1;
        // 数组两边进行比较合并
        while (left <= mid && right <= end) {
            if (list[left] <= list[right]) {
                temp.push(list[left]);
                left++;
            } else {
                temp.push(list[right]);
                right++;
            }
        }
        // 如果左边有剩余
        while (left <= mid) {
            temp.push(list[left]);
            left++;
        }
        // 如果右边有剩余
        while (right <= end) {
            temp.push(list[left]);
            right++;
        }
        // 拷贝temp 数组，到原始数组
        let tIndex: number = 0;
        let tempLeft = start;
        while (tempLeft <= end) {
            list[tempLeft] = temp[tIndex];
            tIndex++;
            tempLeft++;
        }
    }

    public radix(list: any[]) {
        let newList: any[] = deepClone(list);
        let len: number = list.length;
        let max = Math.max(...newList);// 最大数
        let maxLength = ("" + max).length;//最大数的长度，以及基数排序次数
        let bucket: TwoDimensionArray = new TwoDimensionArray(10, len);
        let bucketElemCount = new Array(10).fill(0);//每个桶中的有效数据个数
        for (let i: number = 0, n: number = 1; i < maxLength; i++ , n *= 10) {

            for (let j: number = 0; j < len; j++) {
                // 取每一位上的数，位数不足为0
                let digitOfElement = Math.floor(newList[j] % (n * 10) / n);
                // 入编号0-9的桶,digitOfElement行 bucketElemCount[digitOfElement] 列
                bucket.setValue(newList[j], digitOfElement, bucketElemCount[digitOfElement]);
                // 有效数加 1
                bucketElemCount[digitOfElement]++;
            }
            // 每完成一位数的比较，就将其顺序更新至二维数组中
            let index: number = 0;
            // 遍历每一个桶
            for (let k: number = 0; k < bucketElemCount.length; k++) {
                // 如果存在数据
                if (bucketElemCount[k] !== 0) {
                    // 循环取出桶中数据,放入原始数组中
                    for (let l: number = 0; l < bucketElemCount[k]; l++) {
                        newList[index] = bucket.getValue(k, l);
                        index++;
                    }
                    // 取完后需要将桶中有效数据个数清空
                    // 如此便无需删除二维数组中的数据，只需根据有效数据个数取值即可
                    // 当基数入相同的桶时新的值会覆盖原来的值，取的值也是二维数组更新后的值
                    bucketElemCount[k] = 0;
                }
            }
        }
        return newList;
    }

    // 交换
    public swap(list: any, left: number, right: number) {
        let temp: any = list[left];
        list[left] = list[right];
        list[right] = temp;
    }
}