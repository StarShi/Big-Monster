import Calculator from '../../src/array-stack/calculator'


describe('test calculator', () => {
    let myCalculator: Calculator = new Calculator();

    test('test calc', () => {
        expect(myCalculator.calc("1+2*3-5")).toBe(2);
        // 无法计算加、乘、减号相间的表达式
        // expect(myCalculator.calc("10+20*4-10/2+5*4")).toBe(105);
 
    });

});

