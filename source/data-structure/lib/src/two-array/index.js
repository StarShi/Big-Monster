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
    TwoDimensionArray.prototype.iteration = function (fn) {
        var _this = this;
        if (fn === void 0) { fn = function (i, j, arr) {
            if (arr === void 0) { arr = _this.arr; }
            return arr[i][j];
        }; }
        for (var i = 0; i < this.rowLength; i++) {
            for (var j = 0; j < this.colLength; j++) {
                this.arr[i][j] = fn && fn(i, j);
            }
        }
    };
    // 获取二维数组
    TwoDimensionArray.prototype.getArray = function () {
        return tools_1.arrayDeepClone(this.arr);
    };
    // 获取值
    TwoDimensionArray.prototype.getValue = function (rowIndex, colIndex) {
        return this.arr[rowIndex][colIndex];
    };
    TwoDimensionArray.prototype.setValue = function (rowIndex, colIndex, value) {
        this.arr[rowIndex][colIndex];
    };
    return TwoDimensionArray;
}());
exports.default = TwoDimensionArray;
