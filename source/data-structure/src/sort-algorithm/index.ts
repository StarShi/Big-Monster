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
     * @param {number[]} [list=[]]
     */
    public bubble(list: number[] = []):any[] {
        let newLsit:any = [...list]
        let len: number = newLsit.length;
        let flag:boolean = false;//判断是否交换过，一次冒泡的过程中，若没有产生交换(flag = false)，即认为序列已经有序，无需继续进行冒泡
        for (let i: number = 0; i < len; i++) {
            for (let j: number = 0; j < len - i; j++) {
                if (newLsit[j] > newLsit[j + 1]) {
                    flag = true;
                    newLsit[j] = newLsit[j] + newLsit[j + 1];
                    newLsit[j + 1] = newLsit[j] - newLsit[j + 1];
                    newLsit[j] = newLsit[j] - newLsit[j + 1]; 
                }
            }
            //如果该轮冒泡中没有产生交换，则认为序列已经有序，可直接退出外层循环，结束冒泡
            if(!flag){
                break;
            }else{
                flag = false;//重置判断开关，继续下次冒泡
            }
        }
        return newLsit
    }
}