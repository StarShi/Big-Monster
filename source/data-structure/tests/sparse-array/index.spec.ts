import SparseArray from '../../src/sparse-array'
import TwoDimensionArray from "../../src/two-array"

// let a = new SparseArray()

describe('test sparse array', () => {
    let twoArr: TwoDimensionArray = new TwoDimensionArray(10, 10);
    twoArr.setValue(88, 0, 0);
    twoArr.setValue(88, 1, 1);
    twoArr.setValue(66, 2, 2);
    let sparseArr = new SparseArray(twoArr);
    let mySparseArr = sparseArr.getArray();
    test('test two dimension array change to sparse array', () => {
        let n = twoArr.getEffectiveCount();//有效个数
        let index:number = 0;
        expect(sparseArr.rowLength).toBe(n+1);//稀疏数组长度等于 有效值数 + 1
        expect(mySparseArr[index][0]).toBe(10);//稀疏数组[0][0]的值等于二维数组行数
        expect(mySparseArr[index][1]).toBe(10);//稀疏数组[0][1]的值等于二维数组列数
        expect(mySparseArr[index][2]).toBe(n);//稀疏数组[0][2]的值等于二维数组的有效值数
        twoArr.forEach((val:any,rowIndex:number,colIndex:number)=>{
            if (val !== 0 && val !== undefined && val !== null) {
                index++;
                expect(mySparseArr[index][0]).toBe(rowIndex);
                expect(mySparseArr[index][1]).toBe(colIndex);
                expect(mySparseArr[index][2]).toBe(val);
            }
        })
    });
    
    test('test sparse array change to two dimension array', () => {
        let newTwoArr = sparseArr.restore();
        twoArr.forEach((val:any,rowIndex:number,colIndex:number)=>{
            expect(newTwoArr[rowIndex][colIndex]).toBe(val);
        })
    });
});

