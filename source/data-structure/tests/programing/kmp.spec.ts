import Kmp from "../../src/kmp";
describe("test Kmp", () => {
  let kmp: Kmp = new Kmp();
  let str1: string = "i love you youyouyou";
  let str2: string = "youyo";
  let str3: string = "youyom";
  test("test violenceMatch", () => {
    expect(kmp.violenceMatch(str1, str2)).toBe(11);
    expect(kmp.violenceMatch(str1, str3)).toBe(-1);
  });

  test("test kmpMatch", () => {
    expect(kmp.kmpMatch(str1, str2)).toBe(11);
    expect(kmp.kmpMatch(str1, str3)).toBe(-1);
  });
});
