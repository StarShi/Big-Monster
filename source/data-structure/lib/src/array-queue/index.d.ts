/**
 * @description 数组模拟队列
 * @author Star Shi
 * @date 2019-12-27
 * @export
 * @class ArrayQueue
 */
export default class ArrayQueue {
    private maxSize;
    private item;
    constructor(max: number);
    entryQueue(value: any): boolean;
    outQueue(): (any | boolean);
    isFull(): boolean;
    isEmpty(): boolean;
    getQueueLength(): number;
}
