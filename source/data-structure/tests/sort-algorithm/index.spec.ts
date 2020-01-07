import Sort from '../../src/sort-algorithm'

describe('test Sort', () => {
    let sort:Sort = new Sort();
    test('test bubble', () => { 
        let arr:number[] = [4,1,3,0,5,2];
        let newArr = sort.bubble(arr)
        expect(newArr.toString()).toBe('0,1,2,3,4,5');
        expect(arr.toString()).toBe('4,1,3,0,5,2');
    });
});