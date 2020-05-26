import {
  merge_range_fn_1,
  merge_range_fn_2,
} from "../../src/sort//merge_range";

describe("test merge_range",()=>{
  let wait_range_arr = [[1,3],[8,10],[2,6],[9,12]];
  let result = [];
  test('merge_range_fn_1 ', () => {
    result = merge_range_fn_1([...wait_range_arr]);
    expect(result).toContainEqual([1, 6]);
    expect(result).toContainEqual([8, 12]);
  });

  test('merge_range_fn_2 ', () => {
    result = merge_range_fn_2([...wait_range_arr]);
    expect(result).toContainEqual([1, 6]);
    expect(result).toContainEqual([8, 12]);
  });
})