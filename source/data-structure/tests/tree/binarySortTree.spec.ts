import BinarySortTree from "../../src/binary-sort-tree"
import Node from "../../src/binary-sort-tree-node"

describe('test binary tree', () => {
    let binaryTree: BinarySortTree = new BinarySortTree([7,3,10,12,9,5,1,2]);

    test('test midVisit method of tree', () => {
        binaryTree.midVisit();
        binaryTree.delNode(2);
        binaryTree.delNode(5);
        binaryTree.delNode(9);
        binaryTree.delNode(12);
        binaryTree.delNode(7);
        binaryTree.delNode(3);
        binaryTree.delNode(10);
        binaryTree.delNode(1);
        binaryTree.midVisit();
    });

})