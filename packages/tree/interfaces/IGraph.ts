type GraphNeighboringVertices = Array<number>;

export interface IGraph {
    nodesCount: number;
    rootNode: number;
    nodes: Array<GraphNeighboringVertices>;
}
