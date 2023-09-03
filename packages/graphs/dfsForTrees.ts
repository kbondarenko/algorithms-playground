// depth-first-search example for trees

import {readGraphFromFile} from "./readGraphFromFile";
import * as path from "path";

class DepthCalculator {
    private readonly nodesDepth: number[];

    constructor(private vertices: Array<Array<number>>, private rootNode: number, private nodesCount: number) {
        this.nodesDepth = (new Array(nodesCount)).fill(0);
    }

    getNodesDepth(): number[] {
        this.dfs(this.rootNode, 0, -1);
        return this.nodesDepth;
    }

    private dfs(node: number, depth: number = 0, ancestor: number = -1) {
        this.nodesDepth[node] = depth;

        for (let i = 0; i < this.vertices[node].length; i++) {
            const a = this.vertices[node][i];

            if (a === ancestor) {
                continue;
            }

            this.dfs(a, depth + 1, node)
        }
    }
}

export function calculateDepthUseDfs(filePath: string): number[] {
    const tree = readGraphFromFile(filePath);
    const depthCalculator = new DepthCalculator(tree.nodes, tree.rootNode, tree.nodesCount);

    return depthCalculator.getNodesDepth();
}

