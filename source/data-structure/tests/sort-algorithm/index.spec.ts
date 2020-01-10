import Sort from '../../src/sort-algorithm'
describe('test Sort', () => {
    let sort: Sort = new Sort();
    let arr: number[] = [4, 1, 3, 0, 5, 2];
    test('test bubble', () => {
        let newArr = sort.bubble(arr);
        expect(newArr.toString()).toBe('0,1,2,3,4,5');
        expect(arr.toString()).toBe('4,1,3,0,5,2');
    });

    test('test select', () => {
        let newArr = sort.select(arr);
        expect(newArr.toString()).toBe('0,1,2,3,4,5');
        expect(arr.toString()).toBe('4,1,3,0,5,2');
    });

    test('test insert', () => {
        let newArr = sort.insert(arr);
        expect(newArr.toString()).toBe('0,1,2,3,4,5');
        expect(arr.toString()).toBe('4,1,3,0,5,2');
    });

    test('test shell', () => {
        let newArr = sort.shell(arr);
        expect(newArr.toString()).toBe('0,1,2,3,4,5');
        expect(arr.toString()).toBe('4,1,3,0,5,2');
    });

    test('test quick', () => {
        let newArr = [7,3,2,8,1,9,5,4,6,10]
        sort.quick(newArr,0,newArr.length-1);
        // expect(newArr.toString()).toBe('0,1,2,3,4,5');
    });
});