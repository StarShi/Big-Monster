
/**
 * @description 顺序二叉树
 * @author Star Shi
 * @date 2020-03-12
 * @export
 * @class ArrayBinaryTree
 */
export default class ArrayBinaryTree {
    public array: any[];
    public constructor(arr: any = []) {
        this.array = arr;
    }


    // 前序遍历顺序二叉树 index 表示数组下标
    public preVisit(index: number = 0): void {
        if (this.array.length === 0) {
            return
        }
        // 输出当前节点
        console.log("顺序二叉树前序遍历=>",this.array[index]);
        // 向左递归
        if ((index * 2 + 1) < this.array.length) {
            this.preVisit(index * 2 + 1)
        }
        // 向右递归
        if ((index * 2 + 2) < this.array.length) {
            this.preVisit(index * 2 + 2)
        }
    }
    // 中序遍历顺序二叉树
    public midVisit(index: number = 0): void {
        if (this.array.length === 0) {
            return
        }
        // 向左递归
        if ((index * 2 + 1) < this.array.length) {
            this.midVisit(index * 2 + 1)
        }
        // 输出当前节点
        console.log("顺序二叉树中序遍历=>",this.array[index]);
        // 向右递归
        if ((index * 2 + 2) < this.array.length) {
            this.midVisit(index * 2 + 2)
        }
    }
    // 后序遍历顺序二叉树
    public postVisit(index: number = 0): void {
        if (this.array.length === 0) {
            return
        }
        // 向左递归
        if ((index * 2 + 1) < this.array.length) {
            this.postVisit(index * 2 + 1)
        }
        // 向右递归
        if ((index * 2 + 2) < this.array.length) {
            this.postVisit(index * 2 + 2)
        }
        // 输出当前节点
        console.log("顺序二叉树后序遍历=>",this.array[index]);
    }
}