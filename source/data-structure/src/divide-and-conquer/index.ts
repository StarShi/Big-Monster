
/**
 * @description 分而治之
 * @author Star Shi
 * @date 2020-04-20
 * @export
 * @class DivideAndConquer
 */
export default class DivideAndConquer {

    /**
     * @description 汉诺塔
     * @author Star Shi
     * @date 2020-04-20
     * @param {number} num
     * @param {string} a
     * @param {string} b
     * @param {string} c
     */
    public hanoitower(num: number, a: string, b: string, c: string) {
        if (num === 1) {
            console.log(`第${num}个盘从${a}->${c}`);
        } else {
            // 如果 num 大于 2 ，我们总是可以看成两个盘，最下面的一个盘和上面的所有盘
            // 先把上面的盘 a -> b , 借助c
            this.hanoitower(num - 1, a, c, b);
            // 把下面的盘 a -> c
            console.log(`第${num}个盘从${a}->${c}`);
            // 把 b 塔上的盘 b -> c
            this.hanoitower(num - 1, b, a, c);
        }
    }
}