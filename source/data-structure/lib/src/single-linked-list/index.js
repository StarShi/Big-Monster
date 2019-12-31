"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var single_linked_list_node_1 = __importDefault(require("../single-linked-list-node"));
/**
 * @description 带头的单链表
 * @author Star Shi
 * @date 2019-12-27
 * @export
 * @class SingleLinkedList
 */
var SingleLinkedList = /** @class */ (function () {
    function SingleLinkedList() {
        this.head = new single_linked_list_node_1.default(null);
        this.length = 0;
    }
    // 在链表末尾添加节点
    SingleLinkedList.prototype.append = function (data) {
        var node = new single_linked_list_node_1.default(data);
        console.log(data);
        var temp = this.head;
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
        this.length++;
    };
    // 遍历链表
    SingleLinkedList.prototype.visit = function (fn) {
        if (fn === void 0) { fn = function (node) { }; }
        var temp = this.head.next;
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
    // 在特定位置添加节点
    SingleLinkedList.prototype.insert = function (index, data) {
        if (index < 0 || index > this.length)
            return false;
        var node = new single_linked_list_node_1.default(data);
        var temp = this.head;
        var pos = 0;
        // 找到index下标的前一个节点，如果index为0 ，前一个节点temp 就等于head 
        while (pos++ < index) {
            temp = temp.next;
        }
        node.next = temp.next; // 将temp指向的节点 赋值给新的节点 
        temp.next = node; // 再使temp.next指向新的节点 完成插入
        this.length++;
        return true;
    };
    // // 移除链表中的某个节点
    // public remove(node: Node): boolean {
    // }
    // // 移除特定位置的节点
    // public removeAt(index: number): number {
    // }
    // // 获取某个元素的节点
    // public getNode(index: number): Node {
    // }
    // // 返回节点在链表中的索引，如果不存在，返回链表长度
    // public indexOf(node: Node): number {
    // }
    // // 是否为空链表 
    // public isEmpty(): boolean {
    // }
    // 字符串
    SingleLinkedList.prototype.toString = function () {
        var str = "";
        this.visit(function (node) {
            console.log(node.data);
            str += node.data.toString() + ',';
        });
        str = str.replace(/,$/g, "");
        return str;
    };
    return SingleLinkedList;
}());
exports.default = SingleLinkedList;
