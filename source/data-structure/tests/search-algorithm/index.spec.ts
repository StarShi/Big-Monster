import Search from '../../src/search-algorithm'
describe('test Search', () => {
    let search: Search = new Search();
    let arr: number[] = [4, 1, 3, 0, 5, 2];
    let arr1: number[] = [0, 1, 2, 3, 4, 5];
    test('test line', () => {
        expect(search.line(arr, 3)).toBe(2);
        expect(search.line(arr, 10)).toBe(-1);
    });

    test('test binary', () => {
        expect(search.binary(arr1, 3)).toBe(3);
        expect(search.binary(arr1, 10)).toBe(-1);
    });
    
    test('test binary_no_recursion', () => {
        expect(search.binary(arr1, 3)).toBe(3);
        expect(search.binary(arr1, 10)).toBe(-1);
    });

    test('test insert', () => {
        expect(search.insert(arr1, 3)).toBe(3);
        expect(search.insert(arr1, 10)).toBe(-1);
    });

    
    test('test fibonacci', () => {
        expect(search.insert(arr1, 3)).toBe(3);
        expect(search.insert(arr1, 10)).toBe(-1);
    });
});