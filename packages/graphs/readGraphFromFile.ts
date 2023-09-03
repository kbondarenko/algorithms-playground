import * as path from 'path';
import * as fs from 'fs';

interface IGraph {
    nodesCount: number;
    rootNode: number;
    nodes: Array<Array<number>>;
}

function getNodeFromStr(line: string): [number, number] {
    const [node, ancestor] = line.split(':').map(s => parseInt(s.trim()));

    if (node === undefined || ancestor === undefined || isNaN(node) || isNaN(ancestor)) {
        throw new Error(`Failed to parse line: ${line}`);
    }

    return [node, ancestor];
}

export function readGraphFromFile(filePath: string): IGraph | null {
    try {
        const file = fs.readFileSync(filePath, {encoding: 'utf8'});
        const nodes: Array<Array<number>> = [];

        const lines = file.split(/\r?\n/);
        const nodeCountMatches = lines[0].match(/^N = ([0-9]+)$/) || [];
        const nodesCount = parseInt(nodeCountMatches[1]);

        const rootNodeMatches = lines[1].match(/^Root = ([0-9]+)$/) || [];
        const rootNode:number = parseInt(rootNodeMatches[1]);

        if (isNaN(nodesCount) || isNaN(rootNode)) {
            throw new Error('nodesCount or rootNode is NaN');
        }

        for (let i = 0; i < nodesCount; i++) {
            nodes[i] = [];
        }

        for (let i = 2; i < lines.length; i++) {
            const line = lines[i];

            if (!line.trim()) {
                continue;
            }

            const [node, ancestor] = getNodeFromStr(line);

            if (ancestor === -1) {
                continue;
            }

            nodes[node]?.push(ancestor);
            nodes[ancestor]?.push(node);
        }

        return {
            nodesCount,
            rootNode,
            nodes
        }
    } catch (e) {
        console.error(e);
        return null;
    }
}
