import Node from '../binary-tree-node'

/**
 * @description 二叉树
 * @author Star Shi
 * @date 2020-03-11
 * @export
 * @class BinaryTree
 */
export default class BinaryTree {
    public root: Node | any;
    public setRoot(root: Node | any = null): void {
        this.root = root;
    }

    // 前序遍历
    public preVisit(): void {
        if (this.root === null) {
            return
        }
        // 调用节点的前序遍历
        this.root.preVisit();
    }

    // 中序遍历
    public midVisit(): void {
        if (this.root === null) {
            return
        }
        // 调用节点的中序遍历
        this.root.midVisit();
    }

    // 后序遍历
    public postVisit(): void {
        if (this.root === null) {
            return
        }
        // 调用节点的后序遍历
        this.root.postVisit();
    }
}