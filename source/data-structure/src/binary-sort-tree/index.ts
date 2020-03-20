import Node from '../binary-sort-tree-node'

/**
 * @description 二叉排序树
 * @author Star Shi
 * @date 2020-03-11
 * @export
 * @class BinaryTree
 */
export default class BinarySortTree {
    public root: Node | null = null;

    public constructor(arr: number[]) {
        this.createTree(arr);
    }

    // 创建二叉排序树
    public createTree(arr: number[]) {
        for (let i: number = 0; i < arr.length; i++) {
            this.addNode(new Node(arr[i]));
        }
    }

    // 创建二叉排序树
    public addNode(node: Node) {
        // 如果二叉树为空
        if (this.root === null) {
            this.root = node;
        } else {
            this.root.addNode(node);
        }
    }

    // 中序遍历
    public midVisit(): void {
        if (this.root === null) {
            return
        }
        // 调用结点的中序遍历
        this.root.midVisit();
    }

    // 查找要删除的结点
    public searchNode(value: number): Node | null {
        if (this.root === null) {
            return null
        } else {
            return this.root.searchNode(value);
        }
    }

    // 查找要删除的父结点
    public searchParentNode(value: number): Node | null {
        if (this.root === null) {
            return null
        } else {
            return this.root.searchParentNode(value);
        }
    }

    // 寻找以node为根结点的二叉排序树的最小值,返回该值，并删除该结点
    public minNode(node: Node): number {
        let tempNode: Node = node;
        // 循环查找最小值
        while (tempNode.left !== null) {
            tempNode = tempNode.left;
        }
        this.delNode(tempNode.value);
        return tempNode.value;
    }

    // 删除结点
    public delNode(value: number): void {
        if (this.root === null) {
            return
        }
        let node: Node | null = this.searchNode(value);
        // 如果没找到要删除的结点
        if (node === null) {
            return
        }
        // 如果二叉树只有一个叶子结点
        if (this.root.left === null && this.root.right === null) {
            this.root = null;
            return
        }

        let parentNode: Node | null = this.searchParentNode(value);
        // 如果是叶子节点
        if (parentNode !== null && node.left === null && node.right === null) {
            if (parentNode.left !== null && parentNode.left === node) {// 是左子结点
                parentNode.left = null;
            } else {
                parentNode.right = null;
            }
        } else if (node.left !== null && node.right !== null) { // 如果有两棵子树
            node.value = this.minNode(node.right);
        } else {// 如果只有一棵子树
            if(parentNode === null){// parentNode 为 null 即只有两个结点 删除父节点的情况 该父节点为根节点没有父节点
                this.root = node.left !== null ? node.left : node.right
            }else{
                if (parentNode.left === node) {
                    parentNode.left = node.left !== null ? node.left : node.right;
                } else {// node 是 parentNode 的右子结点
                    parentNode.right = node.left !== null ? node.left : node.right;
                }
            }
        }

    }
}