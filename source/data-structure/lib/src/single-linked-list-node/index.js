"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
