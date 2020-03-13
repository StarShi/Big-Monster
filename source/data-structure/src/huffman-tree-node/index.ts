
/**
 * @description 赫夫曼树的结点
 * @author Star Shi
 * @date 2020-03-12
 * @export
 * @class Node
 */
export default class Node {
    private value: number;
    private left: Node | null;
    private right: Node | null;

    public constructor(data: number) {
        this.value = data;
        this.left = null;
        this.right = null;

    }
    // 获取左孩子
    public getLeft(node: Node): Node | null {
        return this.left;
    }
    // 设置左孩子
    public setLeft(node: Node): void {
        this.left = node;
    }
    // 获取右孩子
    public getRight(node: Node): Node | null {
        return this.right;
    }
    // 设置右孩子
    public setRight(node: Node): void {
        this.right = node;
    }
    // 获取权重
    public getValue(): number {
        return this.value;
    }
    // 设置权重
    public setValue(data:number): void {
        this.value = data;
    }
    // 前序遍历
    public preVisit(){
        console.log("赫夫曼树前序遍历=>",this.value);
        // 遍历左子树
        if(this.left !== null){
            this.left.preVisit();
        }
        // 遍历右子树
        if(this.right !== null){
            this.right.preVisit();
        }
    }
    public toString(): string {
        return this.value.toString()
    }
}