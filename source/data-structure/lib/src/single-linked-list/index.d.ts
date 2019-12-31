/**
 * @description 带头的单链表
 * @author Star Shi
 * @date 2019-12-27
 * @export
 * @class SingleLinkedList
 */
export default class SingleLinkedList {
    private head;
    length: number;
    append(data: any): void;
    visit(fn?: Function): void;
    insert(index: number, data: any): boolean;
    toString(): string;
}
