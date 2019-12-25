import { arrayDeepClone } from '../../utils/tools'
export default class TwoDimensionArray {
    public rowLength: number;
    public colLength: number;
    public defaultVal: number;
    private arr: any[] = [];
    public constructor(oneLen: number = 0, twoLen: number = 0, defaultVal: number = 0) {
        this.rowLength = oneLen;
        this.colLength = twoLen;
        this.defaultVal = defaultVal;
        let insideArr: (string | number | boolean)[] = []
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
    public iteration(fn: Function = (i: number, j: number, arr: any = this.arr) => arr[i][j]) {
        for (let i = 0; i < this.rowLength; i++) {
            for (let j = 0; j < this.colLength; j++) {
                this.arr[i][j] = fn && fn(i, j);
            }
        }
    }
    // 获取二维数组
    public getArray() {
        return arrayDeepClone(this.arr);
    }
    // 获取值
    public getValue(rowIndex: number, colIndex: number) {
        return this.arr[rowIndex][colIndex];
    }

    public setValue(rowIndex: number, colIndex: number, value: string | number | boolean): void {
        this.arr[rowIndex][colIndex]
    }
}