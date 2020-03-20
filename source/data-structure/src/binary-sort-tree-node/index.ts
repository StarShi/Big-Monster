
/**
 * @description 二叉排序树的结点
 * @author Star Shi
 * @date 2020-03-20
 * @export
 * @class Node
 */
export default class Node {
    public value: number;
    public left: Node | null;
    public right: Node | null;

    public constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    // 插入节点
    public addNode(node: Node): void {
        // 如果值比当前值要小
        if (node.value < this.value) {
            if (this.left === null) {
                this.left = node;
            } else {
                this.left.addNode(node);
            }
        } else { // 如果等于当前值 或 比当前值大
            if (this.right === null) {
                this.right = node;
            } else {
                this.right.addNode(node);
            }
        }
    }


    // 中序遍历
    public midVisit(): void {
        // 递归遍历左子树
        if (this.left !== null) {
            this.left.midVisit();
        }
        // 输出当前结点数据
        console.log("二叉排序树中序=>", this.value)
        // 递归遍历右子树
        if (this.right !== null) {
            this.right.midVisit();
        }
    }

    // 查找要删除的结点
    public searchNode(value: number): Node | null {
        // 如果值相等 直接返回
        if (this.value === value) {
            return this;
        } else if (value < this.value) {// 左递归查找
            if (this.left === null) {
                return null;
            }
            return this.left.searchNode(value);
        } else {// 右递归查找
            if (this.right === null) {
                return null;
            }
            return this.right.searchNode(value);
        }
    }

    // 查找要删除的父结点
    public searchParentNode(value: number): Node | null {
        if ((this.left !== null && this.left.value === value) || (this.right !== null && this.right.value === value)) {
            return this;
        } else {
            if (value < this.value && this.left !== null) {  // 如果查找值小于当前值 左递归
                return this.left.searchParentNode(value);
            } else if (value > this.value && this.right !== null) {// 如果查找值大于当前值 右递归
                return this.right.searchParentNode(value);
            } else {
                return null;
            }
        }
    }

    public toString(): string {
        return this.value.toString()
    }
}