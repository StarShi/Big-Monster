"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SparseArr = /** @class */ (function () {
    function SparseArr() {
        this.arr = [[1, 2], [2, 3]];
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
