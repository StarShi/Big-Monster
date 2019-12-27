
/**
 * @description 数组模拟队列
 * @author Star Shi
 * @date 2019-12-27
 * @export
 * @class ArrayQueue
 */
export default class ArrayQueue {
    private maxSize: number;
    private item: any[] = [];
    public constructor(max: number) {
        this.maxSize = max;
    }

    // 入队
    public entryQueue(value: any):boolean {
        let flag = this.isFull();
        !flag && this.item.unshift(value);//队空入队，返回true ,队满则入队失败，返回false
        return !flag
    }
    // 出队
    public outQueue():(any | boolean) {
        let flag = this.isEmpty();
        //队非空出队，返回出队的值，队空则出队失败，返回false
        return !flag ? this.item.pop() : false;
    }

    // 判断队满
    public isFull(): boolean {
        return this.item.length === this.maxSize;
    }

    // 判断队空
    public isEmpty(): boolean {
        return this.item.length === 0;
    }
    
    // 获取队长
    public getQueueLength(){
        return this.item.length;
    }
}