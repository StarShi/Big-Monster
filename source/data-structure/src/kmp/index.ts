/**
 * @description kMP
 * @author Star Shi
 * @date 2020-04-20
 * @export
 * @class KMP
 */
export default class KMP {
  /**
   * @description 暴力匹配算法
   * @author Star Shi
   * @date 2020-04-20
   * @param {string} originStr 原串
   * @param {string} macthStr 子串
   * @returns
   */
  public violenceMatch(originStr: string, macthStr: string):number {
    let originStrLength: number = originStr.length;
    let macthStrLength: number = macthStr.length;
    let i: number = 0;
    let j: number = 0;
    while (i < originStrLength && j < macthStrLength) {
      if (originStr[i] === macthStr[j]) {
        i++;
        j++;
      } else {
        i = i - j + 1;
        j = 0;
      }
    }
    if (j === macthStrLength) {
      return i - j;
    } else {
      return -1;
    }
  }

  public kmpMatch(originStr: string, macthStr: string):number {
    let next: number[] = this.kmpNext(macthStr);
    let originStrLength: number = originStr.length;
    let macthStrLength: number = macthStr.length;
    let i: number = 0;// 主串下标
    let j: number = 0;// 子串下标
    while (i < originStrLength && j < macthStrLength) {
      // 如果不匹配，且已经有了匹配信息，查找匹配表
      while (j > 0 && originStr[i] !== macthStr[j]) {
        j = next[j - 1];
      }
      // 如果匹配到字符 子串下标后移一位
      if (originStr[i] === macthStr[j]) {
        j++;
      }
      i++;// 无论匹配不匹配，主串下标都后移
    }
    if (j === macthStrLength) {
      return i - j;
    } else {
      return -1;
    }
  }
  // 创建字符串的部分匹配表
  public kmpNext(str: string): number[] {
    let next: number[] = [];
    let len: number = str.length;
    if (len > 0) {
      next[0] = 0; // 字符串第一位的部分匹配值为0
      // i 表示字符下标，j 表示部分匹配值的长度
      for (let i: number = 1, j: number = 0; i < len; i++) {
        // 如果不等时，需要从next[j-1] 获取新的j 这kmp算法的核心
        while (j > 0 && str[i] !== str[j]) {
          j = next[j - 1];
        }
        // 如果相等 部分匹配值加1
        if (str[i] === str[j]) {
          j++;
        }
        next[i] = j;
      }
    }
    return next;
  }
}
