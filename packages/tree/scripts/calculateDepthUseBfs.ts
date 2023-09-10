import {IGraph} from "../interfaces/IGraph";

export function calculateDepthUseBfs(tree: IGraph) {
    const {nodes, rootNode, nodesCount} = tree;
    const nodesDepth: number[] = new Array(nodesCount).fill(0);
    const visitedNodes: boolean[] = new Array(nodesCount).fill(false);

    let currentNodes: number[] = [rootNode];
    let nextNodes: number[] = nodes[rootNode];
    let depth = 0;
    visitedNodes[rootNode] = true;

    while (nextNodes.length > 0) {
        currentNodes = nextNodes;
        nextNodes = [];
        depth++;

        for (let i = 0; i < currentNodes.length; i++) {
            if (visitedNodes[currentNodes[i]]) {
                continue;
            }

            visitedNodes[currentNodes[i]] = true;
            nodesDepth[currentNodes[i]] = depth;
            nextNodes.push(...nodes[currentNodes[i]]);
        }
    }

    return nodesDepth;
}
