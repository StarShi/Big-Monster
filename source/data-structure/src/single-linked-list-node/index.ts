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