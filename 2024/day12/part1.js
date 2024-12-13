import * as utils from "../../utils/utils.js";

function locatePlots(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!resolvedPlants.has(`${i}+${j}`)) {
        sum += mapPlot(matrix, `${i}+${j}`);
      }
    }
  }
}

function mapPlot(matrix, start) {
  const h = matrix.length;
  const w = matrix[0].length;
  let totalFences = 0;
  let totalPlants = 0;
  let foundPlants = new Set();
  const startingCoordinates = start.split("+").map(Number);
  const plant = matrix[startingCoordinates[0]][startingCoordinates[1]];
  const queue = [start];
  while (queue.length) {
    const plot = queue.shift();
    foundPlants.add(plot);
    const coordinates = plot.split("+").map(Number);
    totalPlants += 1;
    let standardFences = 4;
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
        matrix[adjIndex[0]][adjIndex[1]] === plant
      ) {
        standardFences -= 1;
        if (
          !resolvedPlants.has(`${adjIndex[0]}+${adjIndex[1]}`) &&
          !foundPlants.has(`${adjIndex[0]}+${adjIndex[1]}`)
        ) {
          resolvedPlants.add(`${adjIndex[0]}+${adjIndex[1]}`);
          queue.push(`${adjIndex[0]}+${adjIndex[1]}`);
        }
      }
    }
    totalFences += standardFences;
  }
  return totalFences * totalPlants;
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
const resolvedPlants = new Set();
utils.drawMatrix(input, matrix);
locatePlots(matrix);

utils.logOutput("2024", "12", "A", sum);
