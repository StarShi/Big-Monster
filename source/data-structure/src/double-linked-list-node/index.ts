
/**
 * @description  双向链表节点
 * @author Star Shi
 * @date 2020-01-02
 * @export
 * @class Node
 */
export default class Node {
    public data: any;
    public next: Node | any;
    public pre: Node | any;
    public constructor(data: any) {
        this.data = data;
        this.next = null;
        this.pre = null;
    }
    public toString() {
        return this.data.toString()
    }
}