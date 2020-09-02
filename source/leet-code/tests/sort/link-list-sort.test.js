import {
  SingleLinkList,
  insertSingleLinkList,
} from "../../src/sort/link-list-sort";

describe("test single-link-list", () => {
  let singleLinkList = new SingleLinkList();
  test("SingleLinkList ", () => {
    singleLinkList.appendNode(4);
    singleLinkList.appendNode(2);
    singleLinkList.appendNode(1);
    singleLinkList.appendNode(3);
    let temp = singleLinkList.head;
    let index = 0;
    let arr = ["4", "2", "1", "3"];
    // 遍历链表，判断是否与数组中的结果一直
    while (temp.next !== null) {
      temp = temp.next;
      expect(temp.toString()).toBe(arr[index]);
      index++;
    }
  });

  test("insertSingleLinkList ", () => {
    insertSingleLinkList(singleLinkList);
    let temp = singleLinkList.head;
    let index = 0;
    let arr = ["1", "2", "3", "4"];
    // 遍历链表，判断是否与数组中的结果一直
    while (temp.next !== null) {
      temp = temp.next;
      expect(temp.toString()).toBe(arr[index]);
      index++;
    }
  });
});
