import BinaryTree from "../../src/binary-tree"
import Node from "../../src/binary-tree-node"

describe('test array binary tree', () => {
    let binaryTree: BinaryTree = new BinaryTree();
    let root: Node = new Node(1);
    let node2: Node = new Node(2);
    let node3: Node = new Node(3);
    let node4: Node = new Node(4);
    let node5: Node = new Node(5);

    root.setLeft(node2);
    root.setRight(node3);
    node2.setLeft(node4);
    node2.setRight(node5);
    binaryTree.setRoot(root);
    test('test preVisit method of tree', () => {
        binaryTree.preVisit();
    });
    test('test midVisit method of tree', () => {
        binaryTree.midVisit();
    });
    test('test postVisit method of tree', () => {
        binaryTree.postVisit();
    });
})