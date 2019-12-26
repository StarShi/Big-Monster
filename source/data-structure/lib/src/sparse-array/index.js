"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var two_array_1 = __importDefault(require("../two-array"));
/**
 * @description 稀疏数组
 * @author Star Shi
 * @date 2019-12-26
 * @export
 * @class SparseArr
 */
var SparseArr = /** @class */ (function () {
    function SparseArr(arr) {
        this.maxLength = arr.rowLength * arr.colLength;
        //创建稀疏数组第一行
        var sparseArr = new two_array_1.default(1, 3, 0);
        this.arr = sparseArr.getArray();
    }
    SparseArr.prototype.parseNomal = function () {
        var len1 = this.arr.length;
        for (var i = 0; i < len1; i++) {
            for (var j = 0, len2 = this.arr[i].length; j < len2; j++) {
                console.log(this.arr[i][j]);
            }
        }
    };
    return SparseArr;
}());
exports.default = SparseArr;
// export default function add(a:number,b:number) {
//     return a + b;
// }
