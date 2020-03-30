import Graph from "../../src/graph";

describe("test graph", () => {
    let graph: Graph = new Graph(5);
    let nodes: string[] = ["A", "B", "C", "D", "E"]
    test('test create graph', () => {
        for (const item of nodes) {
            graph.addNode(item)
        }
        graph.bindEdge(0, 1, 1);//A - B
        graph.bindEdge(0, 2, 1);//A - C
        graph.bindEdge(1, 2, 1);//B - C
        graph.bindEdge(1, 3, 1);//B - D
        graph.bindEdge(1, 4, 1);//B - E
        graph.showGraph();
    });

    test('test deepthFirstSearch method of graph', () => {
        graph.depthFirstSearch();
    });


    test('test breadthFirstSearch method of graph', () => {
        graph.breadthFirstSearch();
    });
})