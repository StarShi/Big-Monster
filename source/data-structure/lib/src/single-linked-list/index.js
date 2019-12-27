"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var single_linked_list_node_1 = __importDefault(require("../single-linked-list-node"));
var SingleLinkedList = /** @class */ (function () {
    function SingleLinkedList() {
        this.headNode = new single_linked_list_node_1.default(null);
    }
    // 在链表末尾添加节点
    SingleLinkedList.prototype.pushNode = function (node) {
        var temp = this.headNode;
        while (true) {
            //为空时，直接退出循环
            if (temp.next === null) {
                break;
            }
            //如果节点不为空，则将节点后移
            temp = temp.next;
        }
        //退出循环时，temp 指向了链表末尾节点，将该节点的next指向新添加的节点即可
        temp.next = node;
    };
    // 遍历链表
    SingleLinkedList.prototype.visit = function (fn) {
        if (fn === void 0) { fn = function (node) { }; }
        var temp = this.headNode.next;
        while (true) {
            //为空时，直接退出循环
            if (temp === null) {
                break;
            }
            fn && fn(temp);
            //如果节点不为空，则将节点后移
            temp = temp.next;
        }
    };
    return SingleLinkedList;
}());
exports.default = SingleLinkedList;
