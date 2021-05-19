import {
  mergeRange_1,
  mergeRange_2,
} from "../../src/sort/merge-range";

describe("test merge-range",()=>{
  let wait_range_arr = [[1,3],[8,10],[2,6],[9,12]];
  let result = [];
  test('mergeRange_1 ', () => {
    result = mergeRange_1([...wait_range_arr]);
    expect(result).toContainEqual([1, 6]);
    expect(result).toContainEqual([8, 12]);
  });

  test('mergeRange_2 ', () => {
    result = mergeRange_2([...wait_range_arr]);
    expect(result).toContainEqual([1, 6]);
    expect(result).toContainEqual([8, 12]);
  });
})