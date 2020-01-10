import { deepClone } from "../../utils/tools";
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
                    newList[j] = newList[j] + newList[j + 1];
                    newList[j + 1] = newList[j] - newList[j + 1];
                    newList[j] = newList[j] - newList[j + 1];
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
                    newList[i] = newList[j] + newList[i];
                    newList[j] = newList[i] - newList[j];
                    newList[i] = newList[i] - newList[j];
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

    public quick(list: any[], start: number, end: number) {
        if (start >= end) { return }
        // let pivot: any = this.getPivot(list, start, end);//获取分界值
        let pivot: any  = list[end];//末尾值为分界值

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
            console.log("=>", left, right, list,pivot)
            // 找到之后，如果左指针小于右指针
            if (left < right) {
                // 使找到的两个值进行交换
                this.swap(list, left, right);
            } else {
                break;
            }
        }
        console.log(left, end)
        // 将分界值放置在正确的位置
        this.swap(list, left, end);
        // 排左边
        this.quick(list, start, left - 1);
        // 排右边
        this.quick(list, left + 1, end);
    }

    // 获取分界值，返回数组第一位，中间位和最后一位的中位数
    public getPivot(list: any, start: number, end: number) {
        let mid: number = Math.floor((start + end) / 2);
        // 如果第一个值大于中间的值，则交换，
        if (list[start] > list[mid]) {
            this.swap(list, start, mid);
        }
        // 用前两个中最大值与最后一个值比较，如果大于则继续交换，然后得到的最后一位则是三位之中最大的
        if (list[mid] > list[end]) {
            this.swap(list, mid, end);
        }
        // 最后比较剩余两个数的大小，若是list[start] 大，则其换到 end-1 的位置
        if (list[start] > list[mid]) {
            this.swap(list, start, end - 1);
        } else {// 否则将mid 换到 end-1 的位置
            this.swap(list, mid, end - 1);
        }
        return list[end - 1];
    }

    // 交换
    public swap(list: any, left: number, right: number) {
        let temp: any = list[left];
        list[left] = list[right];
        list[right] = temp;
    }
}