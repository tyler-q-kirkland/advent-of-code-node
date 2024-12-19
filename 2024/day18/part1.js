import * as utils from "../../utils/utils.js";
import Graph from "./graph.js";

function fillMatrix(input, matrix) {
  const max = 1024;
  for (let i = 0; i < max; i++) {
    const coords = input[i].split(",");
    matrix[coords[1]][coords[0]] = "#";
  }
}

function mapGraph(matrix) {
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

const adjacentDirection = {
  up: (coordinates) => [coordinates[0] - 1, coordinates[1]],
  right: (coordinates) => [coordinates[0], coordinates[1] + 1],
  down: (coordinates) => [coordinates[0] + 1, coordinates[1]],
  left: (coordinates) => [coordinates[0], coordinates[1] - 1],
};

const input = utils.getInput();
const bounds = 70;
const start = [0, 0];
const end = [bounds, bounds];

const matrix = new Array(bounds + 1)
  .fill(null)
  .map(() => new Array(bounds + 1).fill("."));

fillMatrix(input, matrix);
let map = new Graph();

mapGraph(matrix);

const sum = map.findPathWithDijkstra(start, end);

utils.logOutput("2024", "18", "A", sum);
