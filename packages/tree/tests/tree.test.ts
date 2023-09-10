import * as path from "path";
import {readTreeFromFile} from "../scripts/readTreeFromFile";
import {describe, expect, it} from 'vitest'
import {calculateDepthUseDfs} from "../scripts/calculateDepthUseDfs";
import {getLowestCommonAncestor} from "../scripts/getLowestCommonAncestor";
import {calculateDepthUseBfs} from "../scripts/calculateDepthUseBfs";

describe('trees', function () {
    it('should read tree from file', () => {
        const nodes = readTreeFromFile(path.join(__dirname, './tree'));
        expect(nodes).toStrictEqual({
                nodesCount: 9,
                rootNode: 0,
                nodes: [[1, 2], [0, 3, 4], [0, 5, 6, 7], [1], [1], [2], [2, 8], [2], [6]]
            }
        );
    });

    it('should calculate depth use dfs', function () {
        const tree = readTreeFromFile(path.join(__dirname, './tree'));
        const depth = calculateDepthUseDfs(tree);
        expect(depth).toStrictEqual([0, 1, 1, 2, 2, 2, 2, 2, 3]);
    })

    it('should calculate depth use bfs', function () {
        const tree = readTreeFromFile(path.join(__dirname, './tree'));
        const depth = calculateDepthUseBfs(tree);
        expect(depth).toStrictEqual([0, 1, 1, 2, 2, 2, 2, 2, 3]);
    })

    it.each([
        [8, 7, 2],
        [5, 7, 2],
        [3, 4, 1],
        [3, 7, 0],
    ])('should calculate lowest common ancestor for nodes %i, %i', function (firstNode, secondNode, expected) {
        const tree = readTreeFromFile(path.join(__dirname, './tree'));
        const lowestCommonAncestor = getLowestCommonAncestor(tree, firstNode, secondNode);
        expect(lowestCommonAncestor).toBe(expected);
    })
})
