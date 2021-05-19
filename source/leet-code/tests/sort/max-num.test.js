import { bubbleSort, maxNum } from "../../src/sort/max-num";

describe("test max-num", () => {
  test("bubbleSort ", () => {
    let arr = [4, 1, 3, 0, 5, 2];
    expect(arr.toString()).toBe("4,1,3,0,5,2");
    bubbleSort(arr);
    expect(arr.toString()).toBe("0,1,2,3,4,5");
  });

  test("maxNum ", () => {
    let arr1 = [3, 30, 34, 5, 9];
    expect(maxNum(arr1)).toBe("9534330");
    let arr2 = [10, 2];
    expect(maxNum(arr2)).toBe("210");
    let arr3 = [10];
    expect(maxNum(arr3)).toBe("10");
  });
});
