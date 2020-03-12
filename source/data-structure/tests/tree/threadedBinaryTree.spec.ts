import ThreadedBinaryTree from "../../src/threaded-binary-tree"
import Node from "../../src/threaded-binary-tree-node"

describe('test threaded binary tree', () => {
    let binaryTree: ThreadedBinaryTree = new ThreadedBinaryTree();

    test('test preThreadedNodes method of tree', () => {
        binaryTree.setRoot(binaryTree.createTree([1, 2, 3, 4, 5, 6, 7]));
        binaryTree.preThreadedNodes();
        binaryTree.preVisit();
    });

    test('test midThreadedNodes method of tree', () => {
        binaryTree.setRoot(binaryTree.createTree([1, 2, 3, 4, 5, 6, 7]));
        binaryTree.midThreadedNodes();
        binaryTree.midVisit();
    });

    test('test postThreadedNodes method of tree', () => {
        binaryTree.setRoot(binaryTree.createTree([1, 2, 3, 4, 5, 6, 7]));
        binaryTree.postThreadedNodes();
        binaryTree.postVisit();
    });

    // test('test preSearch method of tree', () => {
    //     expect(binaryTree.preSearch(2)).toBeTruthy;
    //     expect(binaryTree.preSearch(6)).toBeFalsy;
    // });
    // test('test midSearch method of tree', () => {
    //     expect(binaryTree.midSearch(2)).toBeTruthy;
    //     expect(binaryTree.preSearch(6)).toBeFalsy;
    // });
    // test('test postSearch method of tree', () => {
    //     expect(binaryTree.preSearch(2)).toBeTruthy;
    //     expect(binaryTree.preSearch(6)).toBeFalsy;
    // });

    // test('test deleteNode method of tree', () => {
    //     binaryTree.deleteNode(3);
    //     binaryTree.preVisit();
    // });
})