import EightQueue from '../../src/recursion/eightQueue'


describe('test EightQueue', () => {
    let myQueue: EightQueue = new EightQueue();

    test('test putQueue', () => {
        //从第一个皇后开始放
        myQueue.putQueue(0);
        expect(myQueue.count).toBe(92);
    });

});
