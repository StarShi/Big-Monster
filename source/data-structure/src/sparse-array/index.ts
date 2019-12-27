import TwoDimensionArray from "../two-array";
import { deepClone } from "../../utils/tools";
/**
 * @description 稀疏数组
 * @author Star Shi
 * @date 2019-12-26
 * @export
 * @class SparseArr
 */
export default class SparseArray {
    public rowLength: number = 1;
    protected colLength: number = 3;
    private arr: any[];

    public constructor(myarr: TwoDimensionArray) {
        // 获取原始数组有效值，并创建稀疏数组第一行
        let count: number = myarr.getEffectiveCount();
        this.arr = [[myarr.rowLength, myarr.colLength, count]];
        // 遍历原始二维数组 ,如果存在有效值，则在稀疏数组中存入行下标、列下标和值
        myarr.forEach((val: any, rowIndex: number, colIndex: number) => {
            if (val !== 0 && val !== undefined && val !== null) {
                this.arr.push([rowIndex, colIndex, val]);
            }
        });
        this.rowLength = this.arr.length
    }
    // 稀疏数组转换成正常的二维数组
    public restore() {
        let originRowLength: number = this.arr[0][0];
        let originColLength: number = this.arr[0][1];
        let newArr: TwoDimensionArray = new TwoDimensionArray(originRowLength, originColLength);
        for (let i = 1; i < this.rowLength; i++) {
            newArr.setValue(this.arr[i][2], this.arr[i][0], this.arr[i][1]);
        }
        return newArr.getArray();
    }
    // 获取稀疏数组 
    public getArray() {
        return deepClone(this.arr);
    }
}

// export default function add(a:number,b:number) {
//     return a + b;
// }