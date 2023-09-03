import {readGraphFromFile} from "./readGraphFromFile";
import * as path from "path";
import {calculateDepthUseDfs} from "./dfsForTrees";

const separator: string = '------------------------';

const nodes = readGraphFromFile(path.resolve('./tree'));
console.log('Read from file', nodes);
console.log(separator);

console.log('Depth', calculateDepthUseDfs(path.resolve('./tree')));


