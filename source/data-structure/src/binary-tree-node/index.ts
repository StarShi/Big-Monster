
/**
 * @description 树的结点
 * @author Star Shi
 * @date 2020-03-11
 * @export
 * @class Node
 */
export default class Node {
    public data: any;
    public left: Node | null;
    public right: Node | null;

    public constructor(data: any) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    // 设置左孩子
    public setLeft(node: Node): void {
        this.left = node;
    }
    // 设置右孩子
    public setRight(node: Node): void {
        this.right = node;
    }

    // 前序遍历
    public preVisit(): void {
        // 输出当前结点数据
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
        // 输出当前结点数据
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
        // 输出当前结点数据
        console.log("后序遍历输出=>", this.data)
    }

    // 前序查找
    public preSearch(data: any): any {

        // 如果找到当前结点
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
        // 如果找到当前结点
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
        // 如果找到当前结点
        if (this.data === data) {
            return this.data;
        }
        return node
    }

    // 递归删除结点
    // 如果删除的结点是叶子结点，则删除该结点
    // 如果删除的结点是非叶子结点，则删除该树

    public deleteNode(data: any): boolean {
        // 1、判断左子结点是否为要删除的结点
        if (this.left !== null && this.left.data === data) {
            this.left = null;
            return true
        }
        // 2、判断右子结点是否为要删除的结点
        if (this.right !== null && this.right.data === data) {
            this.right = null;
            return true
        }

        // 如果 1 和 2 都没有找到要删除的结点
        // 左子树递归删除
        if(this.left !== null){
            return this.left.deleteNode(data);
        }
         // 右子树递归删除
        if(this.right !== null){
            return this.right.deleteNode(data);
        }
        return false
    }

    public toString(): string {
        return this.data.toString()
    }
}