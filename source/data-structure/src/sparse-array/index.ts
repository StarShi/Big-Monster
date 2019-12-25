export default class SparseArr {
    public arr: any[];
    public constructor() {
        this.arr = [[1, 2], [2, 3]];
    }
    public parseNomal() {
        let len1 = this.arr.length;
        for (let i = 0; i < len1; i++) {
            for (let j = 0, len2 = this.arr[i].length; j < len2; j++) {
                console.log(this.arr[i][j])
            }
        }
    }
}

// export default function add(a:number,b:number) {
//     return a + b;
// }