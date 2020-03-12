import Node from '../threaded-binary-tree-node'

/**
 * @description 二叉树
 * @author Star Shi
 * @date 2020-03-11
 * @export
 * @class BinaryTree
 */
export default class ThreadedBinaryTree {
    public root: Node | any;
    public preNode: Node | null = null; //总是保留当前处理节点的前驱节点，使得当前节点有可能指向前驱节点
    public setRoot(root: Node | any = null): void {
        this.root = root;
    }

    // 创建一颗满二叉树
    public createTree(array: any[], index: number = 0) {
        let node: Node | null = null;
        if (index < array.length) {
            node = new Node(array[index])
            node.left = this.createTree(array, index * 2 + 1);
            node.right = this.createTree(array, index * 2 + 2);
        }
        return node
    }
    // 前序线索化二叉树
    public preThreadedNodes(node: Node | null = this.root): void {
        // 如果node 为 null  不能进行线索化 
        if (node === null) {
            return
        }
        // 线索化当前节点
        // 处理前驱节点
        if (node.left === null) {
            //让当前节点的左指针指向前驱节点
            node.left = this.preNode;
            // 修改当前节点左指针的类型改为指向前驱节点，也即是true
            node.leftType = true;
        }
        // 处理后继节点,在下次递归时进行处理，使得保存的前驱节点，指向下次递归时的当前节点，即是处理了本次递归的后继节点
        if (this.preNode !== null && this.preNode.right === null) {
            this.preNode.right = node;
            this.preNode.rightType = true;
        }
        // 更新preNode 同步保存新的前驱节点
        this.preNode = node;
        // 线索化左子树
        if (!this.preNode.leftType) {
            this.preThreadedNodes(node.left)
        }

        // 线索化右子树
        if (!this.preNode.rightType) {
            this.preThreadedNodes(node.right)
        }

    }
    
    // 中序线索化二叉树
    public midThreadedNodes(node: Node | null = this.root): void {
        // 如果node 为 null  不能进行线索化 
        if (node === null) {
            return
        }
        // 线索化左子树
        this.midThreadedNodes(node.left)
        // 线索化当前节点
        // 处理前驱节点
        if (node.left === null) {
            //让当前节点的左指针指向前驱节点
            node.left = this.preNode;
            // 修改当前节点左指针的类型改为指向前驱节点，也即是true
            node.leftType = true;
        }
        // 处理后继节点,在下次递归时进行处理，使得保存的前驱节点，指向下次递归时的当前节点，即是处理了本次递归的后继节点
        if (this.preNode !== null && this.preNode.right === null) {
            this.preNode.right = node;
            this.preNode.rightType = true;
        }
        // 更新preNode 同步保存新的前驱节点
        this.preNode = node;
        // 后线索化右子树
        this.midThreadedNodes(node.right)
    }
    // 后序线索化二叉树
    public postThreadedNodes(node: Node | null = this.root): void {
        // 如果node 为 null  不能进行线索化 
        if (node === null) {
            return
        }
        // 线索化左子树
        this.postThreadedNodes(node.left)
        // 线索化右子树
        this.postThreadedNodes(node.right)
        // 线索化当前节点
        // 处理前驱节点
        if (node.left === null) {
            //让当前节点的左指针指向前驱节点
            node.left = this.preNode;
            // 修改当前节点左指针的类型改为指向前驱节点，也即是true
            node.leftType = true;
        }
        // 处理后继节点,在下次递归时进行处理，使得保存的前驱节点，指向下次递归时的当前节点，即是处理了本次递归的后继节点
        if (this.preNode !== null && this.preNode.right === null) {
            this.preNode.right = node;
            this.preNode.rightType = true;
        }
        // 更新preNode 同步保存新的前驱节点
        this.preNode = node;

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

    // 前序查找
    public preSearch(data: any): Boolean {
        if (this.root === null) {
            return false
        }
        // 调用节点的前序查找
        return this.root.preSearch(data) !== null;
    }

    // 中序查找
    public midSearch(data: any): Boolean {
        if (this.root === null) {
            return false
        }
        // 调用节点的中序查找
        return this.root.midSearch(data) !== null;
    }

    // 后序查找
    public postSearch(data: any): Boolean {
        if (this.root === null) {
            return false
        }
        // 调用节点的后序查找
        return this.root.postSearch(data) !== null;
    }

    // 删除节点
    public deleteNode(data: any): boolean {
        // 如果为空树，删除失败
        if (this.root === null) {
            return false
        } else {
            // 如果不为空树，且根节点就是要删除的节点，直接置为空树
            if (this.root.data === data) {
                this.root = null;
                return true
            } else {// 递归删除
                return this.root.deleteNode(data);
            }
        }

    }

}