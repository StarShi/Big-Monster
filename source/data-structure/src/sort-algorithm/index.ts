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
        // 默认序列第一个元素为有序序列，从第二个元素开始
        for (let i: number = 1; i < len; i++) {
            for (let j: number = i - 1; j >= 0; j--) {
                // 如果待插入元素逆序，则进行交换，直到不在逆序为止
                // 与选择排序相似，选择排序选择最小（最大）的插在序列首个元素，只与序列首个元素做交换
                // 插入排序，元素插入位置不确定，需要与有序序列中的所有元素进行比较，确定合适位置再做交换
                // 之所以使用 j+1 而不是 j ,是因为要实时获取交换后的数据
                if (newList[j + 1] < newList[j]) {
                    newList[j + 1] = newList[j] + newList[j + 1];
                    newList[j] = newList[j + 1] - newList[j];
                    newList[j + 1] = newList[j + 1] - newList[j];
                }
            }
        }
        return newList
    }

    /**
     * @description 希尔排序
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
        for (let d: number = Math.floor(len / 2); d > 0; d = Math.floor(d / 2)) {
            for (let i: number = d; i < len; i++) {
                for (let j: number = i - d; j >= 0; j -= d) {
                    // 取间隔位置的元素向前插入
                    // 如果待插入元素逆序，则交换，直到不在逆序为止
                    // 之所以使用 j+1 而不是 j ,是因为要实时获取交换后的数据
                    if (newList[j + d] < newList[j]) {
                        newList[j + d] = newList[j] + newList[j + d];
                        newList[j] = newList[j + d] - newList[j];
                        newList[j + d] = newList[j + d] - newList[j];
                    }
                }
            }
            console.log(newList)
        }
        return newList;
    }
}