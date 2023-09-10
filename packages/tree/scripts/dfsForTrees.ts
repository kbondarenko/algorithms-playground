import { IGraph } from "../interfaces/IGraph";

// depth-first-search example for trees
export function calculateDepthUseDfs(tree: IGraph): number[] {
    const { nodes, rootNode, nodesCount } = tree;
    const nodesDepth: number[] = new Array(nodesCount).fill(0);

    function dfs(node: number, depth: number = 0, ancestor: number = -1) {
        nodesDepth[node] = depth;
        for (let i = 0; i < nodes[node].length; i++) {
            const a = nodes[node][i];

            if (a === ancestor) {
                continue;
            }

            dfs(a, depth + 1, node);
        }
    }

    dfs(rootNode, 0, -1);

    return nodesDepth;
}
