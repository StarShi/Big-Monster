
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

    // 递归删除节点
    // 如果删除的节点是叶子节点，则删除该节点
    // 如果删除的节点是非叶子节点，则删除该树

    public deleteNode(data: any): boolean {
        // 1、判断左子节点是否为要删除的节点
        if (this.left !== null && this.left.data === data) {
            this.left = null;
            return true
        }
        // 2、判断右子节点是否为要删除的节点
        if (this.right !== null && this.right.data === data) {
            this.right = null;
            return true
        }

        // 如果 1 和 2 都没有找到要删除的节点
        // 左子树递归删除
        if (this.left !== null) {
            return this.left.deleteNode(data);
        }
        // 右子树递归删除
        if (this.right !== null) {
            return this.right.deleteNode(data);
        }
        return false
    }

    public toString(): string {
        return this.data.toString()
    }
}