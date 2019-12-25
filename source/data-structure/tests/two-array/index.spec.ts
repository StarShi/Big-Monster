import TwoDimensionArray from '../../src/two-array/index'
// let a = new SparseArr()

test('TwoDimensionArray', () => {
    let arr = new TwoDimensionArray(10,10,0);
    arr.iteration((i:any,j:any)=>{
        return 2;
    })
    let newArr = arr.getArray();
});

// test('SparseArr: 1 + 1 = 2',()=>{
//     expect(SparseArr(1,1)).toBe(2);
//  });