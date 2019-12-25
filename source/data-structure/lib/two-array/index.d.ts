export default class TwoDimensionArray {
    rowLength: number;
    colLength: number;
    defaultVal: number;
    arr: any[];
    constructor(oneLen?: number, twoLen?: number, defaultVal?: number);
    iteration(fn?: Function): void;
}
