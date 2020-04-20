import TwoDimensionArray from "../two-array";
/**
 * @description 动态规划
 * @author Star Shi
 * @date 2020-04-20
 * @export
 * @class DynamicProgramming
 */
export default class DynamicProgramming {
  public knapsackProblem(
    bagWeight: number,
    goodsValue: number[],
    goodsWeight: number[]
  ): number {
    let bag: number = bagWeight;
    let weight: number[] = goodsWeight;
    let value: number[] = goodsValue;
    let num: number = value.length;
    // maxValue[i][j] 表示背包在前i个物品中能够装入容量为j的背包中的最大价值
    let maxValue: TwoDimensionArray = new TwoDimensionArray(
      num + 1,
      bag + 1,
      0
    );
    // 根据公式进行处理
    for (let i: number = 1; i < maxValue.rowLength; i++) {
      for (let j: number = 1; j < maxValue.colLength; j++) {
        if (weight[i - 1] > j) {
          // 当准备加入新增的物品时，如果它的容量大于当前背包的容量时，则直接使用上一个单元格的装入策略
          maxValue.setValue(maxValue.getValue(i - 1, j), i, j);
        } else {
          maxValue.setValue(
            Math.max(
              maxValue.getValue(i - 1, j),
              maxValue.getValue(i - 1, j - weight[i - 1]) + value[i - 1]
            ),
            i,
            j
          );
        }
      }
    }
    return maxValue.getValue(num,bag);
  }
}
