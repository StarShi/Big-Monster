import SingleLinkedList from "../../src/single-linked-list"
import Node from "../../src/single-linked-list-node"

describe('test single linked list', () => {
    let arr:any[] = ["节点1","节点2",3]
    let node1:Node = new Node("节点1");
    let node2:Node = new Node("节点2");
    let node3:Node = new Node(3);
    let myLinkedList:SingleLinkedList = new SingleLinkedList();
    test('test add method of single linked list', () => {
        myLinkedList.pushNode(node1);
        myLinkedList.pushNode(node2);
        myLinkedList.pushNode(node3);
    });

    test('test visit method of single linked list', () => {
        myLinkedList.visit();
        myLinkedList.visit((node:Node)=>{
            expect(arr).toContain(node.data);
            if(node.data === arr[2]){
                expect(node.toString()).toBe('3');
            }
        });
    });
});