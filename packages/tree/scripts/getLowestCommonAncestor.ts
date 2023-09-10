import { IGraph } from "../interfaces/IGraph";

export function getLowestCommonAncestor(tree: IGraph, firstNode: number, secondNode: number): number {
    const { nodes, rootNode, nodesCount } = tree;

    const nodesDepth: number[] = new Array(nodesCount).fill(0);
    const nodesOrder: number[] = [];
    const nodeFirstEntry: Map<number, number> = new Map<number, number>();
    const nodeLastEntry: Map<number, number> = new Map<number, number>();
    function dfs(node: number, depth: number = 0, ancestor: number = -1) {
        nodeFirstEntry.set(node, nodesOrder.length);
        nodesOrder.push(node);
        nodesDepth[node] = depth;

        for (let i = 0; i < nodes[node].length; i++) {
            const a = nodes[node][i];

            if (a === ancestor) {
                continue;
            }

            dfs(a, depth + 1, node);
            nodesOrder.push(node);
        }
        nodeLastEntry.set(node, nodesOrder.length);
        nodesOrder.push(node);
    }

    dfs(rootNode, 0, -1);

    const firstNodeEntry = nodeFirstEntry.get(firstNode);
    const secondNodeEntry = nodeFirstEntry.get(secondNode);
    const left = firstNodeEntry < secondNodeEntry ? firstNodeEntry : secondNodeEntry;
    const right = firstNodeEntry < secondNodeEntry ? secondNodeEntry : firstNodeEntry;

    let nodeWithMinDepth = nodesOrder[left];
    let minNodeDepth = nodesDepth[nodeWithMinDepth];

    for (let i = left; i <= right; i++) {
        if (nodesDepth[nodesOrder[i]] < minNodeDepth) {
            nodeWithMinDepth = nodesOrder[i];
            minNodeDepth = nodesDepth[nodeWithMinDepth];
        }
    }

    return nodeWithMinDepth;
}
