import { deepClone } from '../../utils/tools'

/**
 * @description 二维数组
 * @author Star Shi
 * @date 2019-12-26
 * @export
 * @class TwoDimensionArray
 */
export default class TwoDimensionArray {
    public rowLength: number;
    public colLength: number;
    public defaultVal: number;
    private arr: any[] = [];

    public constructor(oneLen: number = 0, twoLen: number = 0, defaultVal: number = 0) {
        this.rowLength = oneLen;
        this.colLength = twoLen;
        this.defaultVal = defaultVal;
        let insideArr: any[] = []
        this.arr.length = this.rowLength;
        insideArr.length = this.colLength;
        for (let j = 0; j < this.colLength; j++) {
            insideArr[j] = this.defaultVal;
        }
        for (let i = 0; i < this.rowLength; i++) {
            this.arr[i] = [...insideArr];
        }
    }

    // 遍历二维数组
    public forEach(fn: Function = (val: any, i: number, j: number): void => { }) {
        for (let i = 0; i < this.rowLength; i++) {
            for (let j = 0; j < this.colLength; j++) {
                fn && fn(this.arr[i][j], i, j);
            }
        }
    }

    // 循环赋值 
    public forEachValue(fn: Function = (val: any, i: number, j: number): any => val) {
        for (let i = 0; i < this.rowLength; i++) {
            for (let j = 0; j < this.colLength; j++) {
                this.arr[i][j] = (fn && fn(this.arr[i][j], i, j)) || this.arr[i][j];
            }
        }
    }

    // 获取二维数组
    public getArray(): Array<any> {
        return deepClone(this.arr);
    }

    // 获取二维数组值
    public getValue(rowIndex: number, colIndex: number) {
        return this.arr[rowIndex][colIndex];
    }

    // 设置二维数组值
    public setValue(value: any, rowIndex?: number, colIndex?: number): void {
        if (rowIndex === undefined || colIndex === undefined) {// 如果只传value，则循环赋值
            for (let i = 0; i < this.rowLength; i++) {
                for (let j = 0; j < this.colLength; j++) {
                    this.arr[i][j] = value;
                }
            }
        } else if (rowIndex < this.rowLength && colIndex < this.colLength) {// 如果rowIndex 和colIndex没越界 则允许重新设置值 
            this.arr[rowIndex][colIndex] = value;
        }
    }

    // 统计二维数组有效值数量
    getEffectiveCount(): number {
        let count = 0;
        this.forEach((val: any) => {
            if (val !== 0 && val !== undefined && val !== null) {
                count++
            }
        });
        return count;
    }
}