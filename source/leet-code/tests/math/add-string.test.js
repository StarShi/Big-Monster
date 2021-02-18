import {
  addString,
} from "../../src/math/add-string";

describe("test insert-range",()=>{
  let a = "426709752318";
  let b = "95481253129";
  test('addString ', () => {
    expect(addString(a,b)).toBe('522191005447');
  });

})