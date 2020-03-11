
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

    // 前序遍历
    public preVisit() {
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
    public midVisit() {
        // 递归遍历左子树
        if (this.left !== null) {
            this.left.preVisit();
        }
        // 输出当前节点数据
        console.log(this.data)
        // 递归遍历右子树
        if (this.right !== null) {
            this.right.preVisit();
        }
    }

    // 后序遍历
    public postVisit() {
        // 递归遍历左子树
        if (this.left !== null) {
            this.left.preVisit();
        }
        // 递归遍历右子树
        if (this.right !== null) {
            this.right.preVisit();
        }
        // 输出当前节点数据
        console.log(this.data)
    }

    public toString() {
        return this.data.toString()
    }
}