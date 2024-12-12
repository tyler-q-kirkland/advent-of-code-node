import * as utils from "../../utils/utils.js";

function drawMatrix(input, Matrix) {
  for (let line of input) {
    let lineArray = line.split("");
    Matrix.push(lineArray);
  }
}

function getAntenna(matrix, map) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== "." && map.has(matrix[i][j])) {
        let antennaPositions = map.get(matrix[i][j]);
        antennaPositions.push([i, j]);
        map.set(matrix[i][j], antennaPositions);
      } else if (matrix[i][j] !== ".") {
        map.set(matrix[i][j], [[i, j]]);
      }
    }
  }
}

function validateAntinodes(array, height, width) {
  const foundAntinodes = [];
  for (let i = 0; i < array.length; i++) {
    let otherNodes = structuredClone(array);
    otherNodes.splice(i, 1);
    for (let node of otherNodes) {
      let heightAway = +array[i][0] - +node[0];
      let widthAway = +array[i][1] - +node[1];
      if (extendNodes(array[i], heightAway, widthAway, height, width)) {
        foundAntinodes.push(
          `${array[i][0] + heightAway},${array[i][1] + widthAway}`
        );
      }
      if (extendNodes(node, -heightAway, -widthAway, height, width)) {
        foundAntinodes.push(`${node[0] - heightAway},${node[1] - widthAway}`);
      }
    }
  }
  return foundAntinodes;
}

function extendNodes(
  currentNode,
  heightMovement,
  widthMovement,
  height,
  width
) {
  let movedNode = [
    currentNode[0] + heightMovement,
    currentNode[1] + widthMovement,
  ];
  if (
    movedNode[0] < height &&
    movedNode[0] >= 0 &&
    movedNode[1] < width &&
    movedNode[1] >= 0
  ) {
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
});

const uniqeAntinodes = [...new Set(antinodes)];
utils.logOutput(2024, 8, "A", uniqeAntinodes.length);
