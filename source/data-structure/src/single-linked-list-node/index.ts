
/**
 * @description 单链表节点
 * @author Star Shi
 * @date 2019-12-27
 * @export
 * @class Node
 */
export default  class Node {
    public data: any;
    public next: Node | any;
    public constructor(data: any) {
        this.data = data;
        this.next = null;
    }
    public toString(){
        return this.data.toString() 
    }
}