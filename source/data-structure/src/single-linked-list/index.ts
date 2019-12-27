import Node from "../single-linked-list-node"

export default class SingleLinkedList {
    private headNode: Node = new Node(null);

    // 在链表末尾添加节点
    public pushNode(node: Node) {
        let temp: Node = this.headNode;
        while (true) {
            //为空时，直接退出循环
            if (temp.next === null) {
                break;
            }
            //如果节点不为空，则将节点后移
            temp = temp.next;
        }
        //退出循环时，temp 指向了链表末尾节点，将该节点的next指向新添加的节点即可
        temp.next = node;
    }

    // 遍历链表
    public visit(fn: Function = (node: Node): void => { }): void {
        let temp: Node = this.headNode.next;
        while (true) {
            //为空时，直接退出循环
            if (temp === null) {
                break;
            }
            fn && fn(temp);
            //如果节点不为空，则将节点后移
            temp = temp.next;
        }
    }
}