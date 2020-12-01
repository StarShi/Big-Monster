import {
  radixSort,
  maximunmInterval
} from "../../src/sort/maximum-interval";

describe("test maximum-interval",()=>{

  test('radixSort ', () => {
    let arr = [10, 222 ,1232 , 412 , 135 ,888];
    radixSort(arr);
    expect(arr.toString()).toBe("10,135,222,412,888,1232");
  });

  test('maximunmInterval ', () => {
    let arr = [3, 9 ,1 , 5];
    let arr1 = [ 10 ]
    expect(maximunmInterval(arr)).toBe(4);
    expect(maximunmInterval(arr1)).toBe(0);
  });
})