import HuffmanTree from "../../src/huffman-tree"

describe('test huffman tree', () => {
    let huffmanTree: HuffmanTree;
    test('test createTree method of huffman tree', () => {
        huffmanTree = new HuffmanTree([13, 7, 8, 3, 29, 6, 1]);
    });
    test('test preVisit method of huffman tree', () => {
        huffmanTree.preVisit();
    });
})
