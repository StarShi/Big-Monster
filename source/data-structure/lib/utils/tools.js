"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 深克隆
 * @author Star Shi
 * @date 2019-12-25
 * @param {*} origin  被克隆的值
 * @param {*} [copyObj=null] 克隆后的值
 * @returns  克隆后的值
 */
function deepClone(origin, copyObj) {
    if (copyObj === void 0) { copyObj = null; }
    var copy = null;
    var toStr = Object.prototype.toString;
    var originType = toStr.call(origin);
    // 判断被克隆值是否为对象或数组，如果是则进入遍历克隆 否则就直接复制
    if (typeof (origin) === 'object' && origin !== null) {
        if (originType == '[object Array]') {
            copy = copyObj || [];
        }
        else if (originType == '[object Object]') {
            copy = copyObj || {};
        }
        for (var key in origin) {
            if (origin.hasOwnProperty(key)) {
                var val = origin[key];
                if (typeof (val) === 'object' && val !== null) {
                    var type = toStr.call(val);
                    if (type == '[object Array]') { //值为数组时
                        copy[key] = [];
                    }
                    else if (type == '[object Object]') { //值为对象时
                        copy[key] = {};
                    }
                    else { //值为包装类时
                        copy[key] = val;
                        continue;
                    }
                    deepClone(val, copy[key]);
                }
                else { //原始值 和function 时
                    copy[key] = val;
                }
            }
        }
    }
    else { //原始值 和function 时
        copy = origin;
    }
    return copy;
}
exports.deepClone = deepClone;
