import * as path from 'path';
import * as fs from 'fs';

interface IGraph {
    nodesCount: number;
    nodes: Array<Array<number>>;
}

function getNodeFromStr(line: string): [number, number] {
    const [node, ancestor] = line.split(':').map(s => parseInt(s.trim()));

    if (node === undefined || ancestor === undefined || isNaN(node) || isNaN(ancestor)) {
        throw new Error(`Failed to parse line: ${line}`);
    }

    return [node, ancestor];
}

function readGraphFile(): IGraph | null {
    try {
        const file = fs.readFileSync(path.resolve('./graph'), {encoding: 'utf8'});
        const nodes: Array<Array<number>> = [];

        const lines = file.split(/\r?\n/);
        const matches = lines[0].match(/^N = ([0-9]+)$/) || [];
        const nodesCount = parseInt(matches[1]);

        if (isNaN(nodesCount)) {
            throw new Error('nodesCount is NaN');
        }

        for (let i = 0; i < nodesCount; i++) {
            nodes[i] = [];
        }

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];

            if (!line.trim()) {
                continue;
            }

            const [node, ancestor] = getNodeFromStr(line);
            nodes[node]?.push(ancestor);
        }

        return {
            nodesCount,
            nodes
        }
    } catch (e) {
        console.error(e);
        return null;
    }
}

const nodes = readGraphFile();
console.log('RESULT', nodes);
