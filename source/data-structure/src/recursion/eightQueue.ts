
/**
 * @description 八皇后问题
 * @author Star Shi
 * @date 2020-01-06
 * @export
 * @class EightQueue
 */
export default class EightQueue {
    // 使用一维数组来保存皇后的位置
    // 比如 position = [0,4,7,5,2,6,1,3]
    // position[0] = val 表示第i+1个皇后的位置，在第i行，在第val列
    public position: number[] = [];
    public max: number = 8;
    public count: number = 0;//统计8皇后的解法

    // 摆放皇后
    public putQueue(n: number) {
        if (n === this.max) {
            this.count++;
            return;
        }
        // 遍历每一列
        for (let i: number = 0; i < this.max; i++) {
            //先把当前皇后放在该行的第一列
            this.position[n] = i;
            // 如果不冲突
            if (this.judge(n)) {
                // 继续放置 n+1 个皇后，即开始递归
                this.putQueue(n + 1);
            }
            // 如果冲突则继续执行循环，将当前的第n个皇后，后移一列
        }

    }

    // 判断放置的第n个皇后，是否与之前放置的皇后冲突
    public judge(n: number): boolean {
        for (let i: number = 0; i < n; i++) {
            // 如果数组中的值相同，则在同一列
            // 如果列距等于行距，则在同一斜线
            if (this.position[i] === this.position[n] || Math.abs(n - i) === Math.abs(this.position[n] - this.position[i])) {
                return false;
            }
        }
        return true

    }
}