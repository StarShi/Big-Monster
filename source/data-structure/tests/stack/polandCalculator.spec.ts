import PolandCalculator from '../../src/array-stack/polandCalculator'


describe('test PolandCalculator', () => {
    let myCalculator: PolandCalculator = new PolandCalculator();

    test('test calc', () => {
        expect(myCalculator.preExpression("3 4 + 5 * 6 -")).toBe(29);
        expect(myCalculator.preExpression("4 5 * 8 - 60 + 8 2 / +")).toBe(76);
    });

    test('test exchange', () => {
        let express1: string = myCalculator.infixToPre("(3+4)*5-6");
        let express2: string = myCalculator.infixToPre("4*5-8+60+8/2");
        expect(myCalculator.preExpression(express1)).toBe(29);
        expect(myCalculator.preExpression(express2)).toBe(76);
    });
});

