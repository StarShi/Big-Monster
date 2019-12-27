import TwoDimensionArray from '../../src/two-array'
// let a = new SparseArr()

describe('test  TwoDimensionArray', () => {
    let dimensionArr = new TwoDimensionArray(10, 10, 1);
    test('test create dimensional array', () => {
        expect(dimensionArr.rowLength).toBe(10);
        expect(dimensionArr.colLength).toBe(10);

    });

    test('test loop of dimensional array', () => {
        dimensionArr.forEach((i: any, j: any) => {
            expect(dimensionArr.getValue(i, j)).toBe(1);
        });
    });

    test('test get dimensional array', () => {
        let newArr: any[] = dimensionArr.getArray();
        let rowLength: number = newArr.length;
        expect(rowLength).toBe(10);
        for (let i = 0; i < rowLength; i++) {
            let colLength = newArr[i].length;
            expect(colLength).toBe(10);
            for (let j = 0; j < colLength; j++) {
                expect(newArr[i][j]).toBe(dimensionArr.getValue(i, j));
            }
        }
    });

    test('test loop set value ', () => {
        dimensionArr.setValue(2)
        dimensionArr.forEach((value:any,rowIndex: number, colIndex: number) => {
            expect(dimensionArr.getValue(rowIndex, colIndex)).toBe(2);
            expect(value).toBe(2);
        });
    });

    test('test only set a special value', () => {
        dimensionArr.setValue(0, 2, 2);
        expect(dimensionArr.getValue(2, 2)).toBe(0);
    });


    test('test forEachValue', () => {
        dimensionArr.setValue(2)
        dimensionArr.forEachValue((val: any, rowIndex: number, colIndex: number) => {
            return val * 2;
        });
        dimensionArr.forEach((value: any, rowIndex: number, colIndex: number) => {
            expect(value).toBe(4);
        });
    });

});
