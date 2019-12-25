export default class TwoDimensionArray {
    rowLength: number;
    colLength: number;
    defaultVal: number;
    private arr;
    constructor(oneLen?: number, twoLen?: number, defaultVal?: number);
    iteration(fn?: Function): void;
    getArray(): any[];
    getValue(rowIndex: number, colIndex: number): any;
    setValue(rowIndex: number, colIndex: number, value: string | number): void;
}
