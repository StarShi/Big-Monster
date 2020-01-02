
/**
 * @description 数组模拟栈
 * @author Star Shi
 * @date 2019-12-27
 * @export
 * @class ArrayStack
 */
export default class ArrayStack {
    private maxSize: number;
    private item: any[] = [];
    public constructor(max: number) {
        this.maxSize = max;
    }

    // 入栈
    public pushStack(value: any):boolean {
        let flag = this.isFull();
        !flag && this.item.push(value);//栈空入栈，返回true ,栈满则入栈失败，返回false
        return !flag
    }
    // 出栈
    public popStack():(any | boolean) {
        let flag = this.isEmpty();
        //栈非空出栈，返回出栈的值，栈空则出栈失败，返回false
        return !flag ? this.item.pop() : false;
    }

    // 判断栈满
    public isFull(): boolean {
        return this.item.length === this.maxSize;
    }

    // 判断栈空
    public isEmpty(): boolean {
        return this.item.length === 0;
    }
    
    // 获取栈长
    public getSize(){
        return this.item.length;
    }
}