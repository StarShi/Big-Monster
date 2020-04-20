import DivideAndConquer from '../../src/divide-and-conquer'
describe('test DivideAndConquer', () => {
    let divide: DivideAndConquer = new DivideAndConquer();

    test('test line', () => {
        divide.hanoitower(5,"A","B","C");
    });
});