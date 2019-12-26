"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tools_1 = require("../../utils/tools");
/**
 * @description 二维数组
 * @author Star Shi
 * @date 2019-12-26
 * @export
 * @class TwoDimensionArray
 */
var TwoDimensionArray = /** @class */ (function () {
    function TwoDimensionArray(oneLen, twoLen, defaultVal) {
        if (oneLen === void 0) { oneLen = 0; }
        if (twoLen === void 0) { twoLen = 0; }
        if (defaultVal === void 0) { defaultVal = 0; }
        this.arr = [];
        this.rowLength = oneLen;
        this.colLength = twoLen;
        this.defaultVal = defaultVal;
        var insideArr = [];
        this.arr.length = this.rowLength;
        insideArr.length = this.colLength;
        for (var j = 0; j < this.colLength; j++) {
            insideArr[j] = this.defaultVal;
        }
        for (var i = 0; i < this.rowLength; i++) {
            this.arr[i] = __spreadArrays(insideArr);
        }
    }
    // 遍历二维数组
    TwoDimensionArray.prototype.forEach = function (fn) {
        if (fn === void 0) { fn = function (val, i, j) { }; }
        for (var i = 0; i < this.rowLength; i++) {
            for (var j = 0; j < this.colLength; j++) {
                fn && fn(this.arr[i][j], i, j);
            }
        }
    };
    // 循环赋值 
    TwoDimensionArray.prototype.forEachValue = function (fn) {
        if (fn === void 0) { fn = function (val, i, j) { return val; }; }
        for (var i = 0; i < this.rowLength; i++) {
            for (var j = 0; j < this.colLength; j++) {
                this.arr[i][j] = (fn && fn(this.arr[i][j], i, j)) || this.arr[i][j];
            }
        }
    };
    // 获取二维数组
    TwoDimensionArray.prototype.getArray = function () {
        return tools_1.deepClone(this.arr);
    };
    // 获取二维数组值
    TwoDimensionArray.prototype.getValue = function (rowIndex, colIndex) {
        return this.arr[rowIndex][colIndex];
    };
    // 设置二维数组值
    TwoDimensionArray.prototype.setValue = function (value, rowIndex, colIndex) {
        if (rowIndex === undefined || colIndex === undefined) { // 如果只传value，则循环赋值
            for (var i = 0; i < this.rowLength; i++) {
                for (var j = 0; j < this.colLength; j++) {
                    this.arr[i][j] = value;
                }
            }
        }
        else if (rowIndex < this.rowLength && colIndex < this.colLength) { // 如果rowIndex 和colIndex没越界 则允许重新设置值 
            this.arr[rowIndex][colIndex] = value;
        }
    };
    return TwoDimensionArray;
}());
exports.default = TwoDimensionArray;
