import * as utils from "../../utils/utils.js";

function drawMatrix(input, Matrix) {
  for (let line of input) {
    let lineArray = line.split("");
    Matrix.push(lineArray);
  }
}

function locateEnd(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (input[i][j] === "E") {
        return [i, j];
      }
    }
  }
}

function mapGraph(matrix, start) {
  const h = matrix.length;
  const w = matrix[0].length;
  const mapped = [];
  let currentNode = start;
  let cost = 0;
  adjacencyList[`${currentNode[0]},${currentNode[1]}`] = ["", 0];

  while (true) {
    if (matrix[currentNode[0]][currentNode[1]] === "S") break;
    else
      for (let direction in adjacentDirection) {
        const adjIndex = adjacentDirection[direction](
          [currentNode[0], currentNode[1]],
          1
        );
        if (
          (adjIndex[0] >= 0 &&
            adjIndex[1] >= 0 &&
            adjIndex[0] < h &&
            adjIndex[1] < w &&
            matrix[adjIndex[0]][adjIndex[1]] === ".") ||
          matrix[adjIndex[0]][adjIndex[1]] === "S"
        ) {
          if (
            !mapped.find(
              (ele) => ele[0] === adjIndex[0] && ele[1] === adjIndex[1]
            )
          ) {
            cost += 1;
            adjacencyList[`${adjIndex[0]},${adjIndex[1]}`] = [
              `${currentNode[0]},${currentNode[1]}`,
              cost,
            ];
            mapped.push([adjIndex[0], adjIndex[1]]);
            currentNode = adjIndex;
            break;
          }
        }
      }
  }
}

function evaluateCheats(adjacencyList, cheatDistance) {
  let sum = 0;
  for (let coord in adjacencyList) {
    const coordArray = coord.split(",").map(Number);
    let adjacents = getNeigborCoords(
      coordArray[0],
      coordArray[1],
      cheatDistance
    );
    for (let line of adjacents) {
      if (Object.hasOwn(adjacencyList, `${line[0]},${line[1]}`)) {
        if (
          adjacencyList[coord][1] -
            adjacencyList[`${line[0]},${line[1]}`][1] -
            line[2] >=
          100
        ) {
          sum += 1;
        }
      }
    }
  }
  return sum;
}

function getNeigborCoords(y, x, cheatDistance) {
  const neighborCoords = [];
  for (let i = 0; i < cheatDistance; i++) {
    for (let direction in adjacentDirection) {
      const adjIndex = adjacentDirection[direction]([y, x], i + 1);
      neighborCoords.push([adjIndex[0], adjIndex[1], i + 1]);
      let diagonalIndex = adjIndex;
      for (let j = 0; j < i; j++) {
        diagonalIndex = manhattanDirection[direction]([
          diagonalIndex[0],
          diagonalIndex[1],
        ]);
        neighborCoords.push([diagonalIndex[0], diagonalIndex[1], i + 1]);
      }
    }
  }
  return neighborCoords;
}

const adjacentDirection = {
  up: (coordinates, distance) => [coordinates[0] - distance, coordinates[1]],
  right: (coordinates, distance) => [coordinates[0], coordinates[1] + distance],
  down: (coordinates, distance) => [coordinates[0] + distance, coordinates[1]],
  left: (coordinates, distance) => [coordinates[0], coordinates[1] - distance],
};

const manhattanDirection = {
  up: (coordinates) => [coordinates[0] + 1, coordinates[1] + 1],
  right: (coordinates) => [coordinates[0] + 1, coordinates[1] - 1],
  down: (coordinates) => [coordinates[0] - 1, coordinates[1] - 1],
  left: (coordinates) => [coordinates[0] - 1, coordinates[1] + 1],
};

const input = utils.getInput();
let matrix = [];
const adjacencyList = {};
drawMatrix(input, matrix);
const end = locateEnd(matrix);
mapGraph(matrix, end);
const sumA = evaluateCheats(adjacencyList, 2);
const sumB = evaluateCheats(adjacencyList, 20);

utils.logOutput("2024", "20", null, sumA, sumB);
