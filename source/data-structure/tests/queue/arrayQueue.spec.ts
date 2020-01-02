import ArrayStack from '../../src/array-stack'


describe('test array queue', () => {
    let queue: ArrayStack = new ArrayStack(3);
    queue.pushStack('张三');
    queue.pushStack('李四');
    queue.pushStack('王二');
    
    test('test getQueueLength method of queue', () => {
        expect(queue.getSize()).toBe(3);
    });

    test('test isFull method of queue', () => {
        expect(queue.isFull()).toBeTruthy();

    });
    test('test isEmpty method of queue', () => {
        expect(queue.isEmpty()).toBeFalsy();

    });

    test('test pushStack method of queue', () => {
        expect(queue.pushStack('麻子')).toBeFalsy();

    });

    test('test popStack method of queue', () => {
        expect(queue.popStack()).toBe('王二');
        expect(queue.popStack()).toBe('李四');
        expect(queue.popStack()).toBe('张三');
        expect(queue.popStack()).toBeFalsy();

    });

    test('test isEmpty method of queue', () => {
        expect(queue.isEmpty()).toBeTruthy();
    });

});

