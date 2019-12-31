"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 单链表节点
 * @author Star Shi
 * @date 2019-12-27
 * @export
 * @class Node
 */
var Node = /** @class */ (function () {
    function Node(data) {
        this.data = data;
        this.next = null;
    }
    Node.prototype.toString = function () {
        return this.data.toString();
    };
    return Node;
}());
exports.default = Node;
