import SparseArray from '../../src/sparse-array'
import TwoDimensionArray from "../../src/two-array"

// let a = new SparseArray()

describe('test sparse array', () => {
    let twoArr:TwoDimensionArray = new TwoDimensionArray(10,10);
    let sparseArr = new SparseArray(twoArr);
    sparseArr.parseNomal();
});

