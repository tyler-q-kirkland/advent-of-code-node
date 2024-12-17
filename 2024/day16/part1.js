import * as utils from "../../utils/utils.js";
import Graph from "./graph.js";

function drawMatrix(input, Matrix) {
  for (let line of input) {
    let lineArray = line.split("");
    Matrix.push(lineArray);
  }
}

function locateStart(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (input[i][j] === 'S') {
        return [i, j]
      }
    }
  }
}

function locateEnd(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (input[i][j] === 'E') {
        return [i, j]
      }
    }
  }
}

function mapGraph(matrix, startY, startX, startDirection) {
  const h = matrix.length;
  const w = matrix[0].length;
  const queue = [[startY, startX, startDirection]];
  const mapped = [[startY,startX]];
  map.addNode([startY,startX]);
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
        matrix[adjIndex[0]][adjIndex[1]] !== '#' &&
        (!(mapped.find((ele) => ele[0] === adjIndex[0] && ele[1] === adjIndex[1])))
      ) {
        queue.push([adjIndex[0], adjIndex[1], direction]);
        mapped.push([adjIndex[0], adjIndex[1]]);
        map.addNode([adjIndex[0], adjIndex[1]]);
        map.addEdge([currentNode[0], currentNode[1]], [adjIndex[0], adjIndex[1]], currentNode[2] == direction ? 1 : 1001);
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
let direction = 'right';
let matrix = [];
drawMatrix(input, matrix);
let map = new Graph();

const start = locateStart(matrix);
const end = locateEnd(matrix);
mapGraph(input, start[0], start[1], direction);

const sum = map.findPathWithDijkstra(start, end);


utils.logOutput("2024", "16", "A", sum);
