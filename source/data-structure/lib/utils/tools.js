"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 数组深克隆
 * @author Star Shi
 * @date 2019-12-25
 * @param {any[]} origin  被克隆的原始数组
 * @param {any[]} copyArr 克隆后的数组
 * @returns 克隆后的数组
 */
function arrayDeepClone(origin, copyArr) {
    if (copyArr === void 0) { copyArr = []; }
    var toStr = Object.prototype.toString;
    for (var key in origin) {
        if (origin.hasOwnProperty(key)) {
            var val = origin[key];
            if (typeof (val) === 'object' && val !== null) {
                var type = toStr.call(val);
                if (type == '[object Array]') { //值为数组时
                    copyArr[key] = [];
                }
                else if (type == '[object Object]') { //值为对象时
                    copyArr[key] = {};
                }
                else { //值为包装类时
                    copyArr[key] = val;
                    continue;
                }
                arrayDeepClone(val, copyArr[key]);
            }
            else { //原始值 和function 时
                copyArr[key] = val;
            }
        }
    }
    return copyArr;
}
exports.arrayDeepClone = arrayDeepClone;
