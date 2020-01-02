import DoubleLinkedList from "../../src/double-linked-list"
import Node from "../../src/double-linked-list-node"

describe('test double linked list', () => {
    let arr: any[] = ["节点1", "节点2", 3, "插入节点", "修改节点", "移除节点"];
    let myLinkedList: DoubleLinkedList = new DoubleLinkedList();
    test('test append method', () => {
        myLinkedList.append(arr[0]);
        myLinkedList.append(arr[1]);
        myLinkedList.append(arr[2]);
        // console.log(myLinkedList.toString());

    });

    test('test getNode method', () => {
        // 测试获取
        let node: any = myLinkedList.getNode(1);
        expect(node.data).toBe(arr[1]);
        // 测试越界获取
        expect(myLinkedList.getNode(-1)).toBeFalsy();
        expect(myLinkedList.getNode(3)).toBeFalsy();
    });

    test('test updata method', () => {
        // 测试修改
        expect(myLinkedList.update(1, arr[4])).toBeTruthy();
        // 测试越界修改
        expect(myLinkedList.update(-1, arr[4])).toBeFalsy();
        expect(myLinkedList.update(3, arr[4])).toBeFalsy();
    });

    test('test insert method', () => {
        // 测试越界添加
        expect(myLinkedList.insert(4, arr[3])).toBeFalsy();
        // 测试末尾添加
        expect(myLinkedList.insert(3, arr[3])).toBeTruthy();
        expect(myLinkedList.insert(4, arr[3])).toBeTruthy();
        // 测试头部添加
        expect(myLinkedList.insert(0, arr[3])).toBeTruthy();
        // 测试中间添加
        expect(myLinkedList.insert(2, arr[3])).toBeTruthy();


    });

    test('test removeAt method', () => {
        myLinkedList.insert(2, arr[5]);
        myLinkedList.append(arr[5]);
        // 测试移除
        expect(myLinkedList.removeAt(2)).toBeTruthy();
        expect(myLinkedList.removeAt(myLinkedList.getLength() - 1)).toBeTruthy();
        // 测试越界移除
        expect(myLinkedList.removeAt(myLinkedList.getLength())).toBeFalsy();
        expect(myLinkedList.removeAt(-1)).toBeFalsy();

    });

    test('test visit method', () => {
        // 测试默认遍历
        myLinkedList.visit();
        // 测试回调遍历
        myLinkedList.visit((node: Node) => {
            expect(arr).toContain(node.data);
            if (node.data === arr[2]) {
                expect(node.toString()).toBe('3');
            }
        });
    });

    test('test toString method', () => {
        let str: string = myLinkedList.toString();
        console.log(str)
    });

    test('test isEmpty method', () => {
        expect(myLinkedList.isEmpty()).toBeFalsy();
    });
});