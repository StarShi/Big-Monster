import TwoDimensionArray from "../two-array";
/**
 * @description 稀疏数组
 * @author Star Shi
 * @date 2019-12-26
 * @export
 * @class SparseArr
 */
export default class SparseArray {
    rowLength: number;
    protected colLength: number;
    private arr;
    constructor(myarr: TwoDimensionArray);
    restore(): any[];
    getArray(): any;
}
