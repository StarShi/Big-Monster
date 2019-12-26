"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var two_array_1 = __importDefault(require("../two-array"));
var tools_1 = require("../../utils/tools");
/**
 * @description 稀疏数组
 * @author Star Shi
 * @date 2019-12-26
 * @export
 * @class SparseArr
 */
var SparseArray = /** @class */ (function () {
    function SparseArray(myarr) {
        var _this = this;
        this.rowLength = 1;
        this.colLength = 3;
        // 获取原始数组有效值，并创建稀疏数组第一行
        var count = myarr.getEffectiveCount();
        this.arr = [myarr.rowLength, myarr.colLength, count];
        // 遍历原始二维数组 ,如果存在有效值，则在稀疏数组中存入行下标、列下标和值
        myarr.forEach(function (val, rowIndex, colIndex) {
            if (val !== 0) {
                _this.arr.push([rowIndex, colIndex, val]);
            }
        });
        this.rowLength = this.arr.length;
    }
    // 稀疏数组转换成正常的二维数组
    SparseArray.prototype.restore = function () {
        var originRowLength = this.arr[0][0];
        var originColLength = this.arr[0][1];
        var newArr = new two_array_1.default(originRowLength, originColLength);
        for (var i = 1; i < this.rowLength; i++) {
            newArr.setValue(this.arr[i][2], this.arr[i][0], this.arr[i][1]);
        }
        return newArr.getArray();
    };
    // 获取稀疏数组 
    SparseArray.prototype.getArray = function () {
        return tools_1.deepClone(this.arr);
    };
    return SparseArray;
}());
exports.default = SparseArray;
// export default function add(a:number,b:number) {
//     return a + b;
// }
