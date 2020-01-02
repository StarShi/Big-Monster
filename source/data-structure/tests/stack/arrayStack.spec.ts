import ArrayQueue from '../../src/array-queue'


describe('test array queue', () => {
    let queue: ArrayQueue = new ArrayQueue(3);
    queue.entryQueue('张三');
    queue.entryQueue('李四');
    queue.entryQueue('王二');
    
    test('test getQueueLength method of queue', () => {
        expect(queue.getSize()).toBe(3);
    });

    test('test isFull method of queue', () => {
        expect(queue.isFull()).toBeTruthy();

    });
    test('test isEmpty method of queue', () => {
        expect(queue.isEmpty()).toBeFalsy();

    });

    test('test entryQueue method of queue', () => {
        expect(queue.entryQueue('麻子')).toBeFalsy();

    });

    test('test outQueue method of queue', () => {
        expect(queue.outQueue()).toBe('张三');
        expect(queue.outQueue()).toBe('李四');
        expect(queue.outQueue()).toBe('王二');
        expect(queue.outQueue()).toBeFalsy();

    });

    test('test isEmpty method of queue', () => {
        expect(queue.isEmpty()).toBeTruthy();
    });

});

