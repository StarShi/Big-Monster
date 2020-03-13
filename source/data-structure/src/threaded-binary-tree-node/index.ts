
/**
 * @description 线索化二叉树的节点
 * @author Star Shi
 * @date 2020-03-12
 * @export
 * @class Node
 */
export default class Node {
    public data: any;
    public left: Node | null;
    public right: Node | null;
    public parentNode: Node | null;//用于后续遍历
    public leftType: boolean;//指针类型 false 表示指向左子树  true 表示指向前驱节点
    public rightType: boolean;//指针类型 false 表示指向右子树  true 表示指向后继节点

    public constructor(data: any) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.parentNode = null;
        this.leftType = false;
        this.rightType = false;
    }

    // 设置左孩子
    public setLeft(node: Node): void {
        this.left = node;
    }
    // 设置有右孩子
    public setRight(node: Node): void {
        this.right = node;
    }

    public toString(): string {
        return this.data.toString()
    }
}