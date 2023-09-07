import * as path from "path";
import {readTreeFromFile} from "./readTreeFromFile";
import {describe, expect, it} from 'vitest'
import {calculateDepthUseDfs} from "./dfsForTrees";

describe('trees', function () {
    it('should read tree from file', () => {
        const nodes = readTreeFromFile(path.resolve('./tree'));
        expect(nodes).toStrictEqual({
                nodesCount: 9,
                rootNode: 0,
                nodes: [[1, 2], [0, 3, 4], [0, 5, 6, 7], [1], [1], [2], [2, 8], [2], [6]]
            }
        );
    });

    it('should calculate depth use dfs', function () {
        const depth = calculateDepthUseDfs(path.resolve('./tree'));
        expect(depth).toStrictEqual([0, 1, 1, 2, 2, 2, 2, 2, 3]);
    })
})
