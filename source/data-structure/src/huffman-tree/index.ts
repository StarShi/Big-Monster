import Node from "../huffman-tree-node"

/**
 * @description 赫夫曼树
 * @author Star Shi
 * @date 2020-03-13
 * @export
 * @class HuffmanTree
 */
export default class HuffmanTree {
    private root: Node | null;
    public constructor(array: number[]) {
        this.root = this.createTree(array);
    }
    // 根据传入的数组创建赫夫曼树
    public createTree(array: number[]) {
        let list: Node[] = [];
        for (let item of array) {
            list.push(new Node(item));
        }
        while (list.length > 1) {
            this.heap(list);//进行堆排序
            // 取出权值最小的两个结点（把每个节点看成最小的二叉树）
            let left: Node = list[0];
            let right: Node = list[1];
            // 创建一棵新的二叉树
            let parent: Node = new Node(left.getValue() + right.getValue());
            parent.setLeft(left);
            parent.setRight(right);
            // 删除已处理过的两个结点（二叉树）
            list.shift();
            list.shift();
            // 添加新创建的二叉树
            list.push(parent);
        }
        return list[0]
    }

    // 堆排序
    public heap(list: Node[]) {
        let len: number = list.length;
        // 将无序列表转换成大顶堆
        for (let i: number = Math.floor(len / 2 - 1); i >= 0; i--) {
            this.adjustHeap(list, i, len);
        }
        // 将堆顶元素与末尾元素进行交换 
        // 将剩余的元素看成待排序序列
        for (let j: number = len - 1; j > 0; j--) {
            this.swap(list, 0, j);
            this.adjustHeap(list, 0, j)
        }
    }

    // 调整成大顶堆
    public adjustHeap(list: Node[], index: number, length: number) {
        let temp: Node = list[index];
        // 从左往右开始调整
        for (let k = 2 * index + 1; k < length; k = 2 * index + 1) {
            // 如果左子结点小于右子结点
            if (k + 1 < length && list[k].getValue() < list[k + 1].getValue()) {
                k++;// k指向右结点
            }
            // 如果最大的子结点 大于 父节点则交换
            if (list[k].getValue() > temp.getValue()) {
                this.swap(list, k, index);
                index = k;//继续循环右子树
            } else {
                break;
            }
        }
        list[index] = temp; //将 temp 的值放在调整后的位置

    }

    // 交换
    public swap(list: any, left: number, right: number) {
        let temp: any = list[left];
        list[left] = list[right];
        list[right] = temp;
    }
    // 前序遍历
    public preVisit(node: Node | null = this.root) {
        if(node === null){
            return
        }
        node.preVisit();
    }
}