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
        let newArr = [7, 3, 2, 8, 1, 9, 5, 4, 6, 10, 6]
        sort.quick(newArr);
        expect(newArr.toString()).toBe('1,2,3,4,5,6,6,7,8,9,10');
    });

    test('test mergeSort', () => {
        let newArr = [4, 1, 3, 0];
        let temp: any[] = [];
        sort.mergeSort(newArr);
        expect(newArr.toString()).toBe('0,1,3,4');
    });


    test('test radix', () => {
        let arr = [53, 3, 542, 748, 14, 214, 6];
        // 542 53 3 14 214 748
        // 3 14 214 542 748 53
        let newArr = sort.radix(arr);
        expect(newArr.toString()).toBe('3,6,14,53,214,542,748');
    });

    test('test heap', () => {
        let newArr = sort.heap(arr);
        expect(newArr.toString()).toBe('0,1,2,3,4,5');
    });
});