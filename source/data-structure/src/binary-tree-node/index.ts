
/**
 * @description 树的节点
 * @author Star Shi
 * @date 2020-03-11
 * @export
 * @class Node
 */
export default class Node {
    public data: any;
    public left: Node | any;
    public right: Node | any;

    public constructor(data: any) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    // 设置左孩子
    public setLeft(node:Node):void{
        this.left = node;
    }
    // 设置有右孩子
    public setRight(node:Node):void{
        this.right = node;
    }

    // 前序遍历
    public preVisit():void {
        // 输出当前节点数据
        console.log(this.data)
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
    public midVisit():void {
        // 递归遍历左子树
        if (this.left !== null) {
            this.left.midVisit();
        }
        // 输出当前节点数据
        console.log(this.data)
        // 递归遍历右子树
        if (this.right !== null) {
            this.right.midVisit();
        }
    }

    // 后序遍历
    public postVisit():void {
        // 递归遍历左子树
        if (this.left !== null) {
            this.left.postVisit();
        }
        // 递归遍历右子树
        if (this.right !== null) {
            this.right.postVisit();
        }
        // 输出当前节点数据
        console.log(this.data)
    }

    public toString():string {
        return this.data.toString()
    }
}