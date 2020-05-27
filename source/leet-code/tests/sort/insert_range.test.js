import {
  insert_range_fn_1,
} from "../../src/sort/insert_range";

describe("test insert_range",()=>{
  let wait_range_arr = [[1,2],[3,5],[6,7],[8,10],[12,16]];
  let result = [];
  test('insert_range_fn_1 ', () => {
    result = insert_range_fn_1([...wait_range_arr],[4,8]);
    expect(result).toContainEqual([1,2]);
    expect(result).toContainEqual([3,10]);
    expect(result).toContainEqual([12,16]);
  });

})