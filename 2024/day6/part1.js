import utils from '../../utils/index.js';

function drawMatrix(input, matrix) {
    for (let line of input) {
        let lineArray = line.split("");
        matrix.push(lineArray);
    }
}

function findGuard(pathMatrix) {
    for (let i = 0; i < pathMatrix.length == true; i++) {
        const guardYPos = pathMatrix[i].indexOf('^');
        if (guardYPos !== -1) {
            return [i, guardYPos];
        }
    }
}

function patrolSpaces() {
    const obstacle = '#';
    let nextSpace = findNextSpace();
    if (nextSpace[0] >= pathMatrix.length || nextSpace[1] > pathMatrix[nextSpace[0]].length){
        return true;
    } else if (pathMatrix[nextSpace[0]][nextSpace[1]] == obstacle) {
        rotateAxis();
        nextSpace = findNextSpace(guardPosition, guardAxis);
    }
    guardPosition = nextSpace.slice();
}

function findNextSpace() {
    let nextPosition = (guardAxis[0] === 'X') ? [guardPosition[0], guardPosition[1] + guardAxis[1]] : [guardPosition[0] + guardAxis[1], guardPosition[1]] ;
    return nextPosition;
}

function rotateAxis() {
    guardAxis = (guardAxis[0] === 'X')? ['Y', guardAxis[1]] : ['X', guardAxis[1] * -1 ];
 }

const year = 2024;
const day = 6;
const part = 'A';
const pathMatrix = [];
const guardInitialAxis = ['Y', -1];
let guardSpaces = [];

const input = utils.getInput();
drawMatrix(input, pathMatrix);
let guardInitialPosition = findGuard(pathMatrix);
guardSpaces.push(guardInitialPosition.toString());
let guardAxis = guardInitialAxis.slice();
let guardPosition = guardInitialPosition.slice();

while (true) {
    let patrolComplete = patrolSpaces()
    if (patrolComplete) {
        break
    } else {
    guardSpaces.push(guardPosition.toString());
    }
}

const uniqeSpaces = [...new Set(guardSpaces)];

utils.logOutput(year, day, part, uniqeSpaces.length);