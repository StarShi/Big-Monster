import { deepClone } from '../../utils/tools'

describe('test deepClone', () => {
    let num: number = 1;
    let str: string = 'test';
    let bool: boolean = true;
    let fn: Function = () => { return 'test' }
    let arr: any[] = [1, 2, 3];
    let obj: object = { a: 1, b: { c: 2 }, d: () => 'test', e: [1, 2, 3] };
    let twoDiemAarr = [[1, 2], [3, 4]];

    test('clone type of number', () => {
        let newNum: number = deepClone(num);
        expect(newNum).toBe(1);
        newNum = 2;
        expect(newNum).toBe(2);
        expect(num).toBe(1);
    });

    test('clone type of string', () => {
        let newStr: string = deepClone(str);
        expect(newStr).toBe('test');
        newStr = 'test-test';
        expect(newStr).toBe('test-test');
        expect(str).toBe('test');
    });

    test('clone type of string', () => {
        let newBool: boolean = deepClone(bool);
        expect(newBool).toBe(true);
        newBool = false;
        expect(newBool).toBe(false);
        expect(bool).toBe(true);
    });

    test('clone type of array', () => {
        let newArr: any[] = deepClone(arr);
        for (let val of arr) {
            expect(newArr).toContain(val);
        }
        expect(newArr === arr).toBeFalsy();
    });

    test('clone type of object', () => {
        let newObj: object = deepClone(obj);
        expect(newObj === obj).toBeFalsy();
        expect(newObj).toEqual(obj)
    });


    test('clone type of two_dimension_array', () => {
        let newArr = deepClone(twoDiemAarr);
        expect(newArr === twoDiemAarr).toBeFalsy();//测试克隆数组是否与原始数组全等，不全等则通过测试
        for (let rowIndex in twoDiemAarr) {
            for (let colIndex in twoDiemAarr[rowIndex]) {
                expect(newArr[rowIndex][colIndex]).toBe(twoDiemAarr[rowIndex][colIndex]);//测试克隆数组是否完整复制了原始数组的值
            }
            expect(newArr[rowIndex] === twoDiemAarr[rowIndex]).toBeFalsy();//测试克隆一维数组中的值是否全等，不全等则通过测试
        }
    });


})

