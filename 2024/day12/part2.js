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
    let unlikeAdjacents = 0;
    let potentialInner = false;
    for (let i = 0; i < Object.keys(adjacentDirection).length; i++) {
      const adjIndex = adjacentDirection[Object.keys(adjacentDirection)[i]]([
        coordinates[0],
        coordinates[1],
      ]);
      if (i % 2 == 0) {
        if (
          adjIndex[0] >= 0 &&
          adjIndex[1] >= 0 &&
          adjIndex[0] < h &&
          adjIndex[1] < w &&
          matrix[adjIndex[0]][adjIndex[1]] === plant
        ) {
          if (unlikeAdjacents === 0 && potentialInner === true) {
            totalFences += 1;
          }
          unlikeAdjacents = 0;
          potentialInner = false;
          if (
            !resolvedPlants.has(`${adjIndex[0]}+${adjIndex[1]}`) &&
            !foundPlants.has(`${adjIndex[0]}+${adjIndex[1]}`) &&
            Object.keys(adjacentDirection)[i] !== "extraUp"
          ) {
            resolvedPlants.add(`${adjIndex[0]}+${adjIndex[1]}`);
            queue.push(`${adjIndex[0]}+${adjIndex[1]}`);
          }
        } else {
          unlikeAdjacents += 1;
          if (unlikeAdjacents > 1) {
            totalFences += 1;
          }
        }
      } else if (
        adjIndex[0] >= 0 &&
        adjIndex[1] >= 0 &&
        adjIndex[0] < h &&
        adjIndex[1] < w &&
        matrix[adjIndex[0]][adjIndex[1]] !== plant
      ) {
        potentialInner = true;
      }
    }
  }
  return totalFences * totalPlants;
}

const adjacentDirection = {
  retrieveUp: (coordinates) => [coordinates[0] - 1, coordinates[1]],
  retrieveUpRight: (coordinates) => [coordinates[0] - 1, coordinates[1] + 1],
  retrieveRight: (coordinates) => [coordinates[0], coordinates[1] + 1],
  retrieveDownRight: (coordinates) => [coordinates[0] + 1, coordinates[1] + 1],
  retrieveDown: (coordinates) => [coordinates[0] + 1, coordinates[1]],
  retrieveDownLeft: (coordinates) => [coordinates[0] + 1, coordinates[1] - 1],
  retrieveLeft: (coordinates) => [coordinates[0], coordinates[1] - 1],
  retrieveUpLeft: (coordinates) => [coordinates[0] - 1, coordinates[1] - 1],
  extraUp: (coordinates) => [coordinates[0] - 1, coordinates[1]],
};

let sum = 0;
const input = utils.getInput();
let matrix = [];
const resolvedPlants = new Set();
utils.drawMatrix(input, matrix);
locatePlots(matrix);

utils.logOutput("2024", "12", "B", sum);
