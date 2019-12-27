"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 数组模拟队列
 * @author Star Shi
 * @date 2019-12-27
 * @export
 * @class ArrayQueue
 */
var ArrayQueue = /** @class */ (function () {
    function ArrayQueue(max) {
        this.item = [];
        this.maxSize = max;
    }
    // 入队
    ArrayQueue.prototype.entryQueue = function (value) {
        var flag = this.isFull();
        !flag && this.item.unshift(value); //队空入队，返回true ,队满则入队失败，返回false
        return !flag;
    };
    // 出队
    ArrayQueue.prototype.outQueue = function () {
        var flag = this.isEmpty();
        //队非空出队，返回出队的值，队空则出队失败，返回false
        return !flag ? this.item.pop() : false;
    };
    // 判断队满
    ArrayQueue.prototype.isFull = function () {
        return this.item.length === this.maxSize;
    };
    // 判断队空
    ArrayQueue.prototype.isEmpty = function () {
        return this.item.length === 0;
    };
    // 获取队长
    ArrayQueue.prototype.getQueueLength = function () {
        return this.item.length;
    };
    return ArrayQueue;
}());
exports.default = ArrayQueue;
