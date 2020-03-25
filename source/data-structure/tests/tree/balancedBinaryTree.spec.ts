import BalancedBinaryTree from "../../src/balanced-binary-tree"
import Node from "../../src/balanced-binary-tree-node"

describe('test binary tree', () => {
    let leftRotateTree: BalancedBinaryTree = new BalancedBinaryTree([4, 3, 6, 5, 7, 8]);
    let rightRotateTree: BalancedBinaryTree = new BalancedBinaryTree([10, 12, 8, 9, 7, 6]);
    let doubleRotateTree: BalancedBinaryTree = new BalancedBinaryTree([10, 11, 7, 6, 8, 9]);

    test('test midVisit method of tree', () => {
        leftRotateTree.midVisit();
        expect(leftRotateTree.root && leftRotateTree.root.value).toBe(6)
        expect(leftRotateTree.root && leftRotateTree.root.getTreeHeight()).toBe(3)
        expect((leftRotateTree.root && leftRotateTree.root.left) && leftRotateTree.root.left.getTreeHeight()).toBe(2)
        expect((leftRotateTree.root && leftRotateTree.root.right) && leftRotateTree.root.right.getTreeHeight()).toBe(2)
        expect(rightRotateTree.root && rightRotateTree.root.value).toBe(8)
        expect(rightRotateTree.root && rightRotateTree.root.getTreeHeight()).toBe(3)
        expect((rightRotateTree.root && rightRotateTree.root.left) && rightRotateTree.root.left.getTreeHeight()).toBe(2)
        expect((rightRotateTree.root && rightRotateTree.root.right) && rightRotateTree.root.right.getTreeHeight()).toBe(2)
        
        expect(doubleRotateTree.root && doubleRotateTree.root.value).toBe(8)
        expect(doubleRotateTree.root && doubleRotateTree.root.getTreeHeight()).toBe(3)
        expect((doubleRotateTree.root && doubleRotateTree.root.left) && doubleRotateTree.root.left.getTreeHeight()).toBe(2)
        expect((doubleRotateTree.root && doubleRotateTree.root.right) && doubleRotateTree.root.right.getTreeHeight()).toBe(2)
    });

})