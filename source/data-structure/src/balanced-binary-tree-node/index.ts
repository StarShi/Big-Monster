
/**
 * @description 二叉排序树的结点
 * @author Star Shi
 * @date 2020-03-20
 * @export
 * @class Node
 */
export default class Node {
    public value: number;
    public left: Node | null;
    public right: Node | null;

    public constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    // 获取树的高度
    public getTreeHeight(): number {
        return Math.max(this.left === null ? 0 : this.left.getTreeHeight(), this.right === null ? 0 : this.right.getTreeHeight()) + 1;
    }

    // 获取左子树的高度
    public getLeftHeight(): number {
        if (this.left === null) {
            return 0;
        } else {
            return this.left.getTreeHeight();
        }
    }

    // 获取右子树的高度
    public getRightHeight(): number {
        if (this.right === null) {
            return 0;
        } else {
            return this.right.getTreeHeight();
        }
    }

    // 插入结点
    public addNode(node: Node): void {
        // 如果值比当前值要小
        if (node.value < this.value) {
            if (this.left === null) {
                this.left = node;
            } else {
                this.left.addNode(node);
            }
        } else { // 如果等于当前值 或 比当前值大
            if (this.right === null) {
                this.right = node;
            } else {
                this.right.addNode(node);
            }
        }
        // 当添加完结点后，右子树比左子树高，则进行左旋
        if (this.getRightHeight() - this.getLeftHeight() > 1) {
            // 如果当前结点右子树的左子树的高度大于当前结点右子树的右子树的高度
            if (this.right !== null && this.right.getLeftHeight() > this.right.getRightHeight()) {
                // 当前结点的右子结点进行右旋转
                this.right.rightRotate();
                // 再进行左旋转
                this.leftRotate();
            }
            this.leftRotate();
            return
        }
        // 当添加完结点后，左子树比右子树高，则进行右旋
        if (this.getLeftHeight() - this.getRightHeight() > 1) {
            // 如果当前结点的左子树的右子树的高度大于当前结点左子树的左子树高度
            if (this.left !== null && this.left.getRightHeight() > this.left.getLeftHeight()) {
                // 当前结点的左子结点进行左旋转
                this.left.leftRotate();
                // 再进行右旋转
                this.rightRotate();
            } else {
                // 直接进行右旋转
                this.rightRotate();
            }
            return
        }
    }
    // 以当前结点作为树的根结点，进行左旋转
    public leftRotate() {
        // 以当前根结点的值创建一个新的结点；
        let node: Node = new Node(this.value);
        // 新结点的左子树设置成当前结点的左子树
        node.left = this.left;
        if (this.right !== null) {
            // 新结点的右子树设置成当前节点右子树的左子树
            node.right = this.right.left;
            // 把当前结点的值换成其右子结点的值
            this.value = this.right.value;
            // 把当前结点的右子树设置成当前节点右子树的右子树
            this.right = this.right.right;
        }
        // 把当前结点的左子树指向新的节点
        this.left = node;
    }

    // 以当前结点作为树的根结点，进行右旋转
    public rightRotate() {
        // 以当前根结点的值创建一个新的结点；
        let node: Node = new Node(this.value);
        // 新结点的右子树设置成当前结点的右子树
        node.right = this.right;
        if (this.left !== null) {
            // 新结点的左子树设置成当前节点左子树的右子树
            node.left = this.left.right;
            // 把当前结点的值换成其左子结点的值
            this.value = this.left.value;
            // 把当前结点的左子树设置成当前节点左子树的左子树
            this.left = this.left.left;
        }
        // 把当前结点的右子树指向新的节点
        this.right = node;
    }

    // 中序遍历
    public midVisit(): void {
        // 递归遍历左子树
        if (this.left !== null) {
            this.left.midVisit();
        }
        // 输出当前结点数据
        console.log("平衡二叉树中序=>", this.value)
        // 递归遍历右子树
        if (this.right !== null) {
            this.right.midVisit();
        }
    }

    // 查找要删除的结点
    public searchNode(value: number): Node | null {
        // 如果值相等 直接返回
        if (this.value === value) {
            return this;
        } else if (value < this.value) {// 左递归查找
            if (this.left === null) {
                return null;
            }
            return this.left.searchNode(value);
        } else {// 右递归查找
            if (this.right === null) {
                return null;
            }
            return this.right.searchNode(value);
        }
    }

    // 查找要删除的父结点
    public searchParentNode(value: number): Node | null {
        if ((this.left !== null && this.left.value === value) || (this.right !== null && this.right.value === value)) {
            return this;
        } else {
            if (value < this.value && this.left !== null) {  // 如果查找值小于当前值 左递归
                return this.left.searchParentNode(value);
            } else if (value > this.value && this.right !== null) {// 如果查找值大于当前值 右递归
                return this.right.searchParentNode(value);
            } else {
                return null;
            }
        }
    }

    public toString(): string {
        return this.value.toString()
    }
}