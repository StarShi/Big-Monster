import Node from "../double-linked-list-node"

/**
 * @description 带头的双向链表
 * @author Star Shi
 * @date 2019-12-27
 * @export
 * @class DoubleLinkedList
 */
export default class DoubleLinkedList {
    private head: Node = new Node(null);
    private length: number = 0;

    // 在链表末尾添加节点, 返回链表长度
    public append(data: any): number {
        let node: Node = new Node(data);
        let temp: Node = this.head;
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
        node.pre = temp;
        this.length++;
        return this.length;
    }

    // 遍历链表
    public visit(fn: Function = (node: Node): void => { }): void {
        let temp: Node = this.head.next;
        while (temp !== null) {
            fn && fn(temp);
            //如果节点不为空，则将节点后移
            temp = temp.next;
        }
    }
    // 在特定位置添加节点
    public insert(index: number, data: any): boolean {
        if (index < 0 || index > this.length) return false;
        let node: Node = new Node(data);
        let temp: Node;
        if (index === this.length) {//如果在尾部添加
            temp = this.getNode(index - 1);//获取最后一个元素
            temp.next = node;
            node.pre = temp;
        } else {//在头部或中间插入
            temp = this.getNode(index);
            node.next = temp;//新节点的 next 指向当前节点
            node.pre = temp.pre;//新节点的 pre 指向当前节点的前一个节点
            temp.pre.next = node;// 使上一个节点的next(temp.pre.next)指向新的节点
            temp.pre = node;//再使当前节点的pre 指向新的节点 新完成插入
        }
        this.length++;
        return true;

    }
    // 修改某个位置的节点数据
    public update(index: number, data: any): boolean {
        if (index < 0 || index >= this.length) return false;
        let temp: Node = this.getNode(index);//当前位置的节点
        temp.data = data;
        return true;
    }
    // 移除特定位置的节点
    public removeAt(index: number): boolean {
        if (index < 0 || index >= this.length) return false;
        let temp: Node = this.getNode(index);//当前位置的节点
        temp.pre.next = temp.next;//直接将前一个节点的 next 指向当前节点（pre.next）的 next 即可，
        if (temp.next !== null) { temp.next.pre = temp.pre };
        this.length--;
        return true;
    }
    // 获取某个节点
    public getNode(index: number): any {
        if (index < 0 || index >= this.length) return false;
        let pos: number = 0;
        let temp: Node = this.head.next;//头部
        while (pos++ < index) {
            temp = temp.next;
        }
        return temp;
    }
    // 是否为空链表 为空返回 true 否则为false
    public isEmpty(): boolean {
        return this.head === null;
    }
    // 获取链表长度
    public getLength(): number {
        return this.length;
    }
    // 字符串
    public toString(): string {
        let str: string = "";
        this.visit((node: Node) => {
            str += node.data.toString() + ',';
        });
        str = str.replace(/,$/g, "");
        return str;
    }
}