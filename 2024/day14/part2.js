import * as utils from "../../utils/utils.js";
import * as readline from "readline";

class Bot {
  constructor(startX, startY, moveX, moveY) {
    this.x = startX;
    this.y = startY;
    this.moveX = moveX;
    this.moveY = moveY;
  }

  move(dimensions) {
    this.x += this.moveX;
    this.y += this.moveY;
    if (this.x >= dimensions[0]) {
      this.x = this.x - dimensions[0];
    }
    if (this.y >= dimensions[1]) {
      this.y = this.y - dimensions[1];
    }
    if (0 > this.x) {
      this.x = this.x + dimensions[0];
    }
    if (0 > this.y) {
      this.y = this.y + dimensions[1];
    }
  }
  placeOnMap(map) {
    map[this.y][this.x] += 1;
  }
}

function drawMap(dimensions, botArray) {
  const tiles = new Array(dimensions[1])
    .fill(null)
    .map(() => new Array(dimensions[0]).fill(0));

  for (let i = 0; i < botArray.length; i++) {
    botArray[i].placeOnMap(tiles);
  }
  return tiles;
}

function promptToExit(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

function checkNewRecord(map, maxContinuousValue) {
  let maxIterationValue = 0;
  for (let i = 0; i < map.length; i++) {
    let iterationRecord = 0;
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] > 0) iterationRecord += 1;
      else iterationRecord = 0;
      if (iterationRecord > maxIterationValue)
        maxIterationValue = iterationRecord;
    }
  }
  if (maxIterationValue > maxContinuousValue) return maxIterationValue;
  else return maxContinuousValue;
}

const re = /(?:p=(-?[\d]+),(-?[\d]+) v=(-?[\d]+),(-?[\d]+))/g;
const dimensions = [101, 103];
const input = utils.getInputUnfiltered();
const botInfo = [...input.matchAll(re)];
const botArray = [];
botInfo.forEach((bot) =>
  botArray.push(new Bot(+bot[1], +bot[2], +bot[3], +bot[4]))
);

let seconds = 0;
let map = [];
let i = 0;
let maxContinuousValue = 5;

while (true) {
  i += 1;
  for (let j = 0; j < botArray.length; j++) {
    botArray[j].move(dimensions);
  }
  map = drawMap(dimensions, botArray);
  let newMaxContinuousValue = checkNewRecord(map, maxContinuousValue);
  if (newMaxContinuousValue !== maxContinuousValue) {
    map.forEach((map) => console.log(map.join("").replaceAll("0", ".")));
    console.log(
      `Map after ${i} seconds. New continuous value chain record detected.`
    );
    const ans = await promptToExit(
      "Does this look like a Christmas Tree? Y/N "
    );
    if (ans === "Y") {
      seconds = i;
      break;
    }
    maxContinuousValue = newMaxContinuousValue;
  }
}

utils.logOutput("2024", "14", "B", seconds);
