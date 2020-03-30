import TwoArray from "../two-array";
import Queen from "../array-queue";

/**
 * @description 图
 * @author Star Shi
 * @date 2020-03-30
 * @export
 * @class Graph
 */
export default class Graph {
    private nodeList: string[];// 存储顶点
    private arrayList: TwoArray;// 存储边的关系
    private numOfEdges: number;// 边的数量
    private isVisited: boolean[];//对应的结点是否被访问过

    public constructor(n: number) {
        this.nodeList = [];
        this.isVisited = new Array(n);
        this.arrayList = new TwoArray(n, n);
        this.numOfEdges = 0;
    }

    // 插入顶点
    public addNode(str: string): void {
        this.nodeList.push(str);
    }

    /**
     * @description 绑定边的关系
     * @author Star Shi
     * @date 2020-03-30
     * @param {number} node_1_index 第一个顶点的下标
     * @param {number} node_2_index 第二个顶点的下边
     * @param {number} weight 权值 0 未连接 1 连接
     */
    public bindEdge(node_1_index: number, node_2_index: number, weight: number): void {
        // 因为是无向图，所以得双向绑定
        this.arrayList.setValue(weight, node_1_index, node_2_index);
        this.arrayList.setValue(weight, node_2_index, node_1_index);
        this.numOfEdges++;// 边数量加一
    }

    // 返回节点数量
    public getNodeNumber(): number {
        return this.nodeList.length;
    }

    // 返回边的数量
    public getEdgesNumber(): number {
        return this.numOfEdges;
    }

    // 返回对应下标的值
    public getValueOfIndex(index: number): string {
        return this.nodeList[index];
    }

    // 返回边的权值
    public getWeight(node_1_index: number, node_2_index: number): string {
        return this.arrayList.getValue(node_1_index, node_2_index);
    }

    // 遍历图的关系
    public showGraph(): void {
        console.log("图的遍历=>", this.arrayList);
    }

    // 结点的第一个邻接结点的下标
    public getFirstNode(index: number): number {
        for (let i: number = 0; i < this.nodeList.length; i++) {
            if (this.arrayList.getValue(index, i) > 1) {
                return i;
            }
        }
        return -1;
    }

    // 根据前一个邻接结点的下标来获取下一个邻接结点的下标
    public getNextNode(node_1_index: number, node_2_index: number): number {
        for (let i: number = node_2_index + 1; i < this.nodeList.length; i++) {
            if (this.arrayList.getValue(node_1_index, i) > 0) {
                return i;
            }
        }
        return -1;
    }

    // 结点v的一次深度优先遍历
    public depthTraverse(index: number): void {
        // 首先输出该结点
        console.log(this.nodeList[index]);
        // 设置该结点为已经访问
        this.isVisited[index] = true;
        // 查找结点v的第一个邻接结点
        let firstNodeIndex = this.getFirstNode(index);
        while (firstNodeIndex !== -1) {
            // 未访问
            if (!this.isVisited[firstNodeIndex]) {
                this.depthTraverse(firstNodeIndex);
            }
            // 已经被访问过
            firstNodeIndex = this.getNextNode(index, firstNodeIndex);
        }
    }
    // 深度优先遍历
    public depthFirstSearch(): void {
        this.clearVisited();// 访问清空
        for (let i: number = 0; i < this.nodeList.length; i++) {
            this.depthTraverse(i);
        }
    }

    // 一次广度优先遍历
    public breadthTraverse(index: number) {
        let head: number;// 队列头结点
        let firstNodeIndex: number;// 查找结点v的第一个邻接结点
        let queen: Queen = new Queen(this.getNodeNumber());
        // 首先输出该结点
        console.log(this.nodeList[index]);
        // 设置该结点为已经访问
        this.isVisited[index] = true;
        // 入队列
        queen.entryQueue(index);
        // 队列非空
        while (!queen.isEmpty()) {
            // 出队
            head = queen.outQueue();
            // 查找结点v的第一个邻接结点
            firstNodeIndex = this.getFirstNode(head);
            while (firstNodeIndex !== -1) {
                // 如果没有访问过
                if (!this.isVisited[firstNodeIndex]) {
                    // 打印并入队
                    console.log(this.nodeList[firstNodeIndex]);
                    queen.entryQueue(firstNodeIndex);
                }
                firstNodeIndex = this.getNextNode(head, firstNodeIndex);
            }
        }
    }
    // 广度优先遍历
    public breadthFirstSearch(): void {
        this.clearVisited();// 访问清空
        for (let i: number = 0; i < this.nodeList.length; i++) {
            this.depthTraverse(i);
        }
    }

    public clearVisited(){
        for (let i = 0; i < this.isVisited.length; i++) {
            this.isVisited[i] = false;
        }
    }
}