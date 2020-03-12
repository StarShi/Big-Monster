
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
    public leftType: boolean;//指针类型 false 表示指向左子树  true 表示指向前驱节点
    public rightType: boolean;//指针类型 false 表示指向右子树  true 表示指向后继节点

    public constructor(data: any) {
        this.data = data;
        this.left = null;
        this.right = null;
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

    // 前序遍历
    public preVisit(): void {
        // 输出当前节点数据
        console.log("前序遍历输出=>", this.data)
        // 递归遍历左子树
        if (this.left !== null) {
            this.left.preVisit();
        }
        // 递归遍历右子树
        if (this.right !== null) {
            this.right.preVisit();
        }
    }
    // 中序遍历
    public midVisit(): void {
        // 递归遍历左子树
        if (this.left !== null) {
            this.left.midVisit();
        }
        // 输出当前节点数据
        console.log("中序遍历输出=>", this.data)
        // 递归遍历右子树
        if (this.right !== null) {
            this.right.midVisit();
        }
    }

    // 后序遍历
    public postVisit(): void {
        // 递归遍历左子树
        if (this.left !== null) {
            this.left.postVisit();
        }
        // 递归遍历右子树
        if (this.right !== null) {
            this.right.postVisit();
        }
        // 输出当前节点数据
        console.log("后序遍历输出=>", this.data)
    }

    // 前序查找
    public preSearch(data: any): any {

        // 如果找到当前节点
        if (this.data === data) {
            return this.data;
        }
        let node: any = null;
        // 递归遍历左子树
        if (this.left !== null) {
            node = this.left.preSearch(data);
        }
        // 如果在左子树找到
        if (node !== null) {
            return node
        }
        // 递归遍历右子树
        if (this.right !== null) {
            node = this.right.preSearch(data);
        }
        return node
    }

    // 中序查找
    public midSearch(data: any): any {

        let node: any = null;
        // 递归遍历左子树
        if (this.left !== null) {
            node = this.left.midSearch(data);
        }
        // 如果在左子树找到
        if (node !== null) {
            return node
        }
        // 如果找到当前节点
        if (this.data === data) {
            return this.data;
        }
        // 递归遍历右子树
        if (this.right !== null) {
            node = this.right.midSearch(data);
        }
        return node
    }

    // 中序查找
    public postSearch(data: any): any {

        let node: any = null;
        // 递归遍历左子树
        if (this.left !== null) {
            node = this.left.postSearch(data);
        }
        // 如果在左子树找到
        if (node !== null) {
            return node
        }
        // 递归遍历右子树
        if (this.right !== null) {
            node = this.right.postSearch(data);
        }
        // 如果在左子树找到
        if (node !== null) {
            return node
        }
        // 如果找到当前节点
        if (this.data === data) {
            return this.data;
        }
        return node
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