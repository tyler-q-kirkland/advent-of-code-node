import * as utils from "../../utils/utils.js";

const year = 2024;
const day = 5;
const part = "B";
let sum = 0;

function checkMap(a, b) {
  const followingNumbers = ruleMap.get(a);
  if (followingNumbers === undefined) {
    return 0;
  }
  const found = (element) => element === b;
  if (followingNumbers.some(found)) {
    return -1;
  } else if (!followingNumbers.some(found) && a !== b) {
    return 1;
  } else {
    return 0;
  }
}

const input = utils.getInputUnfiltered();
const inputSplit = input.split(/\n\n/);
const ruleArray = inputSplit[0].split("\n");
const updateArray = inputSplit[1].split("\n");
const ruleMap = new Map();
const validatedArray = [];

for (let i = 0; i < ruleArray.length; i++) {
  let rulePair = ruleArray[i].split("|");
  if (ruleMap.has(rulePair[0])) {
    let currentValue = ruleMap.get(rulePair[0]);
    currentValue.push(rulePair[1]);
    ruleMap.set(rulePair[0], currentValue);
  } else {
    ruleMap.set(rulePair[0], [rulePair[1]]);
  }
}

for (let i = 0; i < updateArray.length; i++) {
  const order = updateArray[i].split(",");
  let sortedLine = order.toSorted(checkMap);
  if (JSON.stringify(sortedLine) != JSON.stringify(order)) {
    validatedArray.push(sortedLine);
  }
}

for (let i = 0; i < validatedArray.length; i++) {
  const middleValue =
    validatedArray[i][Math.floor(validatedArray[i].length / 2)];
  sum += +middleValue;
}

utils.logOutput(year, day, part, sum);
