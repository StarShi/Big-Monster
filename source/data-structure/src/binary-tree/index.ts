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
        // 调用结点的前序遍历
        this.root.preVisit();
    }

    // 中序遍历
    public midVisit(): void {
        if (this.root === null) {
            return
        }
        // 调用结点的中序遍历
        this.root.midVisit();
    }

    // 后序遍历
    public postVisit(): void {
        if (this.root === null) {
            return
        }
        // 调用结点的后序遍历
        this.root.postVisit();
    }

    // 前序查找
    public preSearch(data: any): Boolean {
        if (this.root === null) {
            return false
        }
        // 调用结点的前序查找
        return this.root.preSearch(data) !== null;
    }

    // 中序查找
    public midSearch(data: any): Boolean {
        if (this.root === null) {
            return false
        }
        // 调用结点的中序查找
        return this.root.midSearch(data) !== null;
    }

    // 后序查找
    public postSearch(data: any): Boolean {
        if (this.root === null) {
            return false
        }
        // 调用结点的后序查找
        return this.root.postSearch(data) !== null;
    }

    // 删除结点
    public deleteNode(data: any): boolean {
        // 如果为空树，删除失败
        if (this.root === null) {
            return false
        } else {
            // 如果不为空树，且根结点就是要删除的结点，直接置为空树
            if (this.root.data === data) {
                this.root = null;
                return true 
            }else{// 递归删除
                return this.root.deleteNode(data);
            }
        }

    }
}