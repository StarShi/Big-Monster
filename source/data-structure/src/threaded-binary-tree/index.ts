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
            node.left = this.createTree(array, ~~(index * 2 + 1));
            node.right = this.createTree(array, ~~(index * 2 + 2));

            // 保存父节点 供后续遍历使用
            if (node.left != null) {
                node.left.parentNode = node;
            }
            if (node.right != null) {
                node.right.parentNode = node;
            }
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
    // 前序线索化二叉树遍历
    public preVisit(): void {
        let node: Node | any = this.root;
        while (node !== null) {
            // 遍历找到leftType == true 的节点 当leftType === true时，该节点是按照线索化处理后的有效节点，找到前序遍历开始的节点
            while (node.leftType === false) {
                console.log("前序线索化二叉树遍历=>", node.data);
                node = node.left;
            }
            console.log("前序线索化二叉树遍历=>", node.data);
            node = node.right;
        }
    }
    // 中线索化二叉树遍历
    public midVisit(): void {
        let node: Node | any = this.root;
        while (node !== null) {
            // 遍历找到leftType == true 的节点 当leftType === true时，该节点是按照线索化处理后的有效节点，找到中序遍历开始的节点
            while (node.leftType === false) {
                node = node.left;
            }
            // 输出当前节点
            console.log("中序线索化二叉树遍历=>", node.data);
            // 如果当前节点 rightType leftType === true，该节点的后继节点存在，继续遍历
            while (node.rightType === true) {
                node = node.right;
                console.log("中序线索化二叉树遍历=>", node.data);
            }
            node = node.right;
        }
    }

    // 后序索化二叉树遍历
    public postVisit(): void {
        let node: Node | any = this.root;

        // 遍历找到leftType == true 的节点 当leftType === true时，该节点是按照线索化处理后的有效节点，找到后序遍历开始的节点
        while (node !== null && node.leftType === false) {
            node = node.left;
        }

        // 如果当前节点 rightType leftType === true，该节点的后继节点存在，继续遍历
        while (node !== null) {
            if (node.rightType === true) {
                console.log("后序线索化二叉树遍历=>", node.data);
                this.preNode = node;
                node = node.right;
            } else {
                // 如果上一个处理的节点是当前节点右节点，即含有右节点的非叶子节点
                if (node.right === this.preNode) {
                    console.log("后序线索化二叉树遍历=>", node.data);
                    if (node === this.root) {//结束遍历
                        return
                    }
                    this.preNode = node;
                    node = node.parentNode;
                } else {
                    // 循环右子树
                    node = node.right;
                    while (node !== null && node.leftType === false) {
                        node = node.left;
                    }
                }

            }
        }

        console.log("后序线索化二叉树遍历=>", node.data);
        // node = node.right;

    }

}