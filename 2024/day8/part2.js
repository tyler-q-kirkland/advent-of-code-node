import utils from '../../utils/index.js';

function drawMatrix(input, Matrix) {
    for (let line of input) {
        let lineArray = line.split("");
        Matrix.push(lineArray);
    }
}

function getAntenna(matrix, map) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== '.' && map.has(matrix[i][j])) {
                let antennaPositions = map.get(matrix[i][j]);
                antennaPositions.push([i, j]);
                map.set(matrix[i][j], antennaPositions);
            } else if (matrix[i][j] !== '.') {
                map.set(matrix[i][j], [[i, j]]);
            }
        };
    }
}

function validateAntinodes(array, height, width) {
    const foundAntinodes = [];
    for (let i = 0; i < array.length; i++) {
        let otherNodes = structuredClone(array);
        otherNodes.splice(i, 1);
        for (let node of otherNodes) {
            foundAntinodes.push(`${array[i][0]},${array[i][1]}`)
            foundAntinodes.push(`${node[0]},${node[1]}`)
            let heightAway = +array[i][0] - +node[0];
            let widthAway = +array[i][1] - +node[1];


            let firstAntinode = [array[i][0], array[i][1]];
            while (true) {

                firstAntinode = [(firstAntinode[0] + heightAway), firstAntinode[1] + widthAway];
                if (extendNodes(firstAntinode, heightAway, widthAway, height, width)) {
                    foundAntinodes.push(`${firstAntinode[0]},${firstAntinode[1]}`);
                } else {
                    break
                }
            }
            let secondAntinode = [node[0], node[1]];
            while (true) {

                secondAntinode = [(secondAntinode[0] + heightAway), secondAntinode[1] + widthAway];
                if (extendNodes(secondAntinode, -heightAway, -widthAway, height, width)) {
                    foundAntinodes.push(`${secondAntinode[0]},${secondAntinode[1]}`);
                } else {
                    break
                }
            }
        }
    }
    return foundAntinodes;
}

function extendNodes(currentNode, heightMovement, widthMovement, height, width) {
    if (currentNode[0] < height &&
        currentNode[0] >= 0 &&
        currentNode[1] < width &&
        currentNode[1] >= 0) {
        return true;
    }
}

let sum = 0;
let matrix = [];
let antinodes = [];
const input = utils.getInput();
const antennaMap = new Map();
drawMatrix(input, matrix);
const h = matrix.length;
const w = matrix[0].length;
getAntenna(matrix, antennaMap);

antennaMap.forEach((value) => {
    antinodes.push(...validateAntinodes(value, h, w));
})

const uniqeAntinodes = [...new Set(antinodes)];
utils.logOutput(2024, 8, 'B', uniqeAntinodes.length);