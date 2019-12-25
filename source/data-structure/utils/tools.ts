
/**
 * @description 深克隆
 * @author Star Shi
 * @date 2019-12-25
 * @param {*} origin  被克隆的值
 * @param {*} copyArr 克隆后的值
 * @returns  克隆后的值
 */

export function arrayDeepClone(origin: any, copyArr?: any) {
    let toStr = Object.prototype.toString;
    let originType = toStr.call(origin);
    // 判断被克隆值是否为对象或数组，如果是则进入遍历克隆 否则就直接复制
    if (typeof (originType) === 'object' && originType !== null) {
        if (originType == '[object Array]') {
            copyArr = []
        } else if (originType == '[object Object]') {
            copyArr = {}
        }
        for (let key in origin) {
            if (origin.hasOwnProperty(key)) {
                let val = origin[key];
                if (typeof (val) === 'object' && val !== null) {
                    let type = toStr.call(val);
                    if (type == '[object Array]') {//值为数组时
                        copyArr[key] = [];
                    } else if (type == '[object Object]') {//值为对象时
                        copyArr[key] = {};
                    } else { //值为包装类时
                        copyArr[key] = val;
                        continue;
                    }
                    arrayDeepClone(val, copyArr[key]);
                } else { //原始值 和function 时
                    copyArr[key] = val;
                }
            }
        }
    } else {//原始值 和function 时
        copyArr = origin;
    }
    return copyArr;
}