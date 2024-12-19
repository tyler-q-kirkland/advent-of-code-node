import * as utils from "../../utils/utils.js";
import Graph from "./graph.js";

function fillMatrix(input, matrix, max) {
  for (let i = 0; i < max; i++) {
    const coords = input[i].split(",");
    matrix[coords[1]][coords[0]] = "#";
  }
}

function mapGraph(matrix, map) {
  const h = matrix.length;
  const w = matrix[0].length;
  const queue = [[0, 0]];
  const mapped = [[0, 0]];
  map.addNode([0, 0]);
  while (queue.length) {
    const currentNode = queue.shift();

    for (let direction in adjacentDirection) {
      const adjIndex = adjacentDirection[direction]([
        currentNode[0],
        currentNode[1],
      ]);
      if (
        adjIndex[0] >= 0 &&
        adjIndex[1] >= 0 &&
        adjIndex[0] < h &&
        adjIndex[1] < w &&
        matrix[adjIndex[0]][adjIndex[1]] !== "#"
      ) {
        if (
          !mapped.find(
            (ele) => ele[0] === adjIndex[0] && ele[1] === adjIndex[1]
          )
        ) {
          queue.push([adjIndex[0], adjIndex[1]]);
          mapped.push([adjIndex[0], adjIndex[1]]);
          map.addNode([adjIndex[0], adjIndex[1]]);
        }
        if (
          !map.hasEdge(currentNode[0], currentNode[1], adjIndex[0], adjIndex[1])
        ) {
          map.addEdge(
            [currentNode[0], currentNode[1]],
            [adjIndex[0], adjIndex[1]],
            1
          );
        }
      }
    }
  }
}

function binarySearch(input) {
  const bounds = 70;
  const startCoords = [0, 0];
  const endCoords = [bounds, bounds];
  let min = 1024;
  let max = input.length;

  while (true) {
    if (min === max) {
      return input[min];
    }
    const target = Math.floor((min + max) / 2);
    let solved = true;
    const matrix = new Array(bounds + 1)
      .fill(null)
      .map(() => new Array(bounds + 1).fill("."));

    fillMatrix(input, matrix, target);
    let map = new Graph();
    mapGraph(matrix, map);
    try {
      map.findPathWithDijkstra(startCoords, endCoords);
    } catch {
      solved = false;
    }
    if (solved === true) min = target + 1;
    else max = target - 1;
  }
}

const adjacentDirection = {
  up: (coordinates) => [coordinates[0] - 1, coordinates[1]],
  right: (coordinates) => [coordinates[0], coordinates[1] + 1],
  down: (coordinates) => [coordinates[0] + 1, coordinates[1]],
  left: (coordinates) => [coordinates[0], coordinates[1] - 1],
};

const input = utils.getInput();
const sum = binarySearch(input);

utils.logOutput("2024", "19", "B", sum);
