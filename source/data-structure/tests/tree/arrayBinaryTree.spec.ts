import ArrayBinaryTree from "../../src/array-binary-tree"

describe('test array binary tree',()=>{
    let arrTree:ArrayBinaryTree = new ArrayBinaryTree([1,2,3,4,5,6,7]);
    test('test preVisit method of array binary tree', () => {
        arrTree.preVisit();
    });
    test('test midVisit method of array binary tree', () => {
        arrTree.midVisit();
    });
    test('test postVisit method of array binary tree', () => {
        arrTree.postVisit();
    });
})
