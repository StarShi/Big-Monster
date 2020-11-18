// 单链表结点
class Node {
  constructor(data) {
    this.data = data || null;
    this.next = null;
  }
  // 重写toString方法
  toString() {
    return JSON.stringify(this.data);
  }
}

// 单链表
class SingleLinkList {
  constructor() {
    this.head = new Node(null); // 用空结点作为头结点
    this.length = 0;
  }
  // 添加节点
  appendNode(val) {
    let data = new Node(val);
    let temp = this.head;
    // 遍历链表，找到末尾结点
    while (temp.next) {
      temp = temp.next;
    }
    temp.next = data;
    this.length++;
    return this.length;
  }
}

/**
 * @description 链表的插入排序
 * @author Star Shi
 * @date 2020-09-02
 * @param {*} list
 */
function insertSingleLinkList(list) {
  // 如果链表为空或者只有一个结点，则无需排序
  if (list.length <= 1) {
    return;
  }
  // 默认有序第一个结点有序，从第二个节点开始
  let cur = list.head.next.next;
  // 将有序链表的尾结点置空，避免循环引用
  list.head.next.next = null;
  // 遍历无序的链表结点
  while (cur !== null) {
    // 进行插入有序区的操作时会改变cur.next的值所以需要先缓存一下
    let temp = cur.next;
    // 如果结点不为空则取出结点，与有序链表中的结点比较，进行插值
    let preNode = list.head;
    // 遍历有序链表，寻找比第一个当前结点的值大的结点，preNode 就是该结点的前一个结点
    while (preNode.next !== null && preNode.next.data < cur.data) {
      preNode = preNode.next;
    }
    // 插入，当前结点连接 preNode 的后继结点
    cur.next = preNode.next;
    // preNode 的后继结点改为当前结点
    preNode.next = cur;
    cur = temp;
  }
}

/**
 * @description 链表的归并排序 时间复杂度 n log n
 * @author Star Shi
 * @date 2020-11-09
 * @param {*} list
 */
function mergeSingleLinkList(list) {
  if (!list.head || !list.head.next || !list.head.next.next) {
    return list.head.next;
  }
  // 定义慢指针为第一结点，快指针为第二结点
  let slow = list.head.next;
  let quick = list.head.next.next;
  // 从头结点开始，慢指针每次向后移动一个结点，快指针每次向后移动两个接点，直到慢指针移动至尾结点
  while (quick && quick.next) {
    slow = slow.next;
    quick = quick.next.next;
  }
  // 当快指针移动到为结点时，慢指针正好位于链表中间，将链表拆分成两个链表
  let middle = new SingleLinkList();
  middle.head.next = slow.next;
  slow.next = null;
  slow = mergeSingleLinkList(list);
  quick = mergeSingleLinkList(middle);
  return mergeSingleLinkNode(slow, quick);
}

// 合并单链表节点
function mergeSingleLinkNode(left, right) {
  let list = new SingleLinkList();
  let res = list.head;

  while (left && right) {
    if (left.data < right.data) {
      list.head.next = left;
      left = left.next;
    } else {
      list.head.next = right;
      right = right.next;
    }
    // 将两个值中最小值的至于链表尾部
    list.head = list.head.next;
    // 将较大的值放在较小的值之后
    list.head.next = left || right;
  }
  return res.next;
}

export { SingleLinkList, insertSingleLinkList, mergeSingleLinkList };
