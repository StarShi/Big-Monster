/**
 * @description 二维数组
 * @author Star Shi
 * @date 2019-12-26
 * @export
 * @class TwoDimensionArray
 */
export default class TwoDimensionArray {
    rowLength: number;
    colLength: number;
    defaultVal: number;
    private arr;
    constructor(oneLen?: number, twoLen?: number, defaultVal?: number);
    forEach(fn?: Function): void;
    forEachValue(fn?: Function): void;
    getArray(): any;
    getValue(rowIndex: number, colIndex: number): any;
    setValue(value: any, rowIndex?: number, colIndex?: number): void;
}
