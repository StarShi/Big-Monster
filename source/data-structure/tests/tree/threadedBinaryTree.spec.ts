import ThreadedBinaryTree from "../../src/threaded-binary-tree"
import Node from "../../src/threaded-binary-tree-node"

describe('test threaded binary tree', () => {
    let binaryTree: ThreadedBinaryTree = new ThreadedBinaryTree();

    test('test preThreadedNodes method of tree', () => {
        binaryTree.setRoot(binaryTree.createTree([1, 2, 3, 4, 5, 6, 7]));
        binaryTree.preThreadedNodes();
        expect(binaryTree.preNode !=null && binaryTree.preNode.data).toBe(7);

    });

    test('test midThreadedNodes method of tree', () => {
        binaryTree.setRoot(binaryTree.createTree([1, 2, 3, 4, 5, 6, 7]));
        binaryTree.midThreadedNodes();
        expect(binaryTree.preNode !=null &&  binaryTree.preNode.data).toBe(7);
    });


    test('test postThreadedNodes method of tree', () => {
        binaryTree.setRoot(binaryTree.createTree([1, 2, 3, 4, 5, 6, 7]));
        binaryTree.postThreadedNodes();
        expect(binaryTree.preNode !=null &&  binaryTree.preNode.data).toBe(1);
    });

    // test('test preVisit method of tree', () => {
    //     binaryTree.preVisit();
    // });
    // test('test midVisit method of tree', () => {
    //     binaryTree.midVisit();
    // });
    // test('test postVisit method of tree', () => {
    //     binaryTree.postVisit();
    // });

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