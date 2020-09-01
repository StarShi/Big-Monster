import {
  sortColors_1,
  sortColors_2,
} from "../../src/sort/sort-colors";

describe("test sort-colors",()=>{
  let wait_range_arr = [2,0,2,1,1,0];
  let result = [];
  test('sortColors_1 ', () => {
    result = sortColors_1([...wait_range_arr]);
    expect(result.toString()).toBe("0,0,1,1,2,2");
  });

  test('sortColors_2 ', () => {
    result = sortColors_2([...wait_range_arr]);
    expect(result.toString()).toBe("0,0,1,1,2,2");
  });
})