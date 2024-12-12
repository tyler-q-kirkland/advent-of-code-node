import * as utils from "../../utils/utils.js";

function drawMatrix(input, matrix) {
  for (let line of input) {
    let lineArray = line.split("");
    matrix.push(lineArray);
  }
}

function findGuard(pathMatrix) {
  for (let i = 0; i < pathMatrix.length == true; i++) {
    const guardYPos = pathMatrix[i].indexOf("^");
    if (guardYPos !== -1) {
      return [i, guardYPos];
    }
  }
}

function checkInfinite(array) {
  return new Set(array).size !== array.length;
}

function patrolSpaces(matrix) {
  let nextSpace = findNextSpace();
  if (
    nextSpace[0] < 0 ||
    nextSpace[1] < 0 ||
    nextSpace[0] >= matrix.length ||
    nextSpace[1] > matrix[nextSpace[0]].length
  ) {
    return true;
  }
  while (matrix[nextSpace[0]][nextSpace[1]] == obstacle) {
    rotateAxis();
    rotationPoints.push(guardPosition.toString() + guardAxis[0]);
    if (checkInfinite(rotationPoints)) {
      sum += 1;
      return true;
    }
    nextSpace = findNextSpace(guardPosition, guardAxis);
  }
  guardPosition = nextSpace.slice();
}

function buildNextPath(adjustedPathMatrix, pathMatrix, coordinates) {
  adjustedPathMatrix[coordinates[0]][coordinates[1]] = obstacle;
  guardPosition = guardInitialPosition;
  guardAxis = guardInitialAxis;
}

function findNextSpace() {
  let nextPosition =
    guardAxis[0] === "X"
      ? [guardPosition[0], guardPosition[1] + guardAxis[1]]
      : [guardPosition[0] + guardAxis[1], guardPosition[1]];
  return nextPosition;
}

function rotateAxis() {
  guardAxis =
    guardAxis[0] === "X" ? ["Y", guardAxis[1]] : ["X", guardAxis[1] * -1];
}

const obstacle = "#";
const pathMatrix = [];
const guardInitialAxis = ["Y", -1];
const guardSpaces = [];
let rotationPoints = [];
let sum = 0;

const input = utils.getInput();
drawMatrix(input, pathMatrix);
const guardInitialPosition = findGuard(pathMatrix);
let guardAxis = guardInitialAxis.slice();
let guardPosition = guardInitialPosition.slice();

while (true) {
  if (patrolSpaces(pathMatrix)) {
    break;
  } else {
    if (guardPosition.toString() !== guardInitialPosition.toString()) {
      guardSpaces.push(guardPosition.toString());
    }
  }
}

const uniqueSpaces = [...new Set(guardSpaces)];

for (let line of uniqueSpaces) {
  rotationPoints = [];
  const coordinates = line.split(",");
  let adjustedPathMatrix = structuredClone(pathMatrix);
  buildNextPath(adjustedPathMatrix, pathMatrix, coordinates);
  while (true) {
    if (patrolSpaces(adjustedPathMatrix)) {
      break;
    }
  }
}

utils.logOutput("2024", "6", "B", sum);
