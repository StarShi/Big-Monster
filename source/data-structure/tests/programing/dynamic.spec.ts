import DynamicProgramming from '../../src/dynamic-programing'
describe('test DynamicProgramming', () => {
    let dynamic: DynamicProgramming = new DynamicProgramming();
    let value:number[] = [1500,3000,2000];
    let weight:number[] = [1,4,3];
    let bag:number = 4;
    test('test knapsackProblem', () => {
        let maxValue = dynamic.knapsackProblem(bag,value,weight);
        expect(maxValue).toBe(3500);
    });
});