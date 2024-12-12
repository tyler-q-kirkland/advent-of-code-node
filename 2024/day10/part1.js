import utils from "../../utils/index.js";

function drawMatrix(input, matrix) {
  for (let line of input) {
    let lineArray = line.toString(10).split("").map(Number);
    matrix.push(lineArray);
  }
}

function locateTrailheads(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        searchTrails(matrix, `${i}+${j}`);
      }
    }
  }
}

function searchTrails(matrix, start) {
  const h = matrix.length;
  const w = matrix[0].length;
  const queue = [start];
  while (queue.length) {
    const mountain = queue.shift();
    const coordinates = mountain.split("+").map(Number);
    const currentHeight = matrix[coordinates[0]][coordinates[1]];
    if (currentHeight === 9) {
      reachedPeaks.add(`${coordinates}+${start}`);
    } else {
      for (let direction in adjacentDirection) {
        const adjIndex = adjacentDirection[direction]([
          coordinates[0],
          coordinates[1],
        ]);
        if (
          adjIndex[0] >= 0 &&
          adjIndex[1] >= 0 &&
          adjIndex[0] < h &&
          adjIndex[1] < w &&
          matrix[adjIndex[0]][adjIndex[1]] === currentHeight + 1
        ) {
          queue.push(`${adjIndex[0]}+${adjIndex[1]}`);
        }
      }
    }
  }
}

const adjacentDirection = {
  retrieveUp: (coordinates) => [coordinates[0] - 1, coordinates[1]],
  retrieveRight: (coordinates) => [coordinates[0], coordinates[1] + 1],
  retrieveDown: (coordinates) => [coordinates[0] + 1, coordinates[1]],
  retrieveLeft: (coordinates) => [coordinates[0], coordinates[1] - 1],
};

let sum = 0;
const input = utils.getInput();
let matrix = [];
let reachedPeaks = new Set();
drawMatrix(input, matrix);
locateTrailheads(matrix);

utils.logOutput("2024", "10", "A", reachedPeaks.size);
