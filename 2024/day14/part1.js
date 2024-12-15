import * as utils from "../../utils/utils.js";
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

function calculateDeadzone(dimensions) {
  return [Math.floor(dimensions[0] / 2), Math.floor(dimensions[1] / 2)];
}

function drawDeadzone(map, deadzone) {
  for (let i = 0; i < map.length; i++) {
    if (i === deadzone[1]) {
      for (let j = 0; j < map[i].length; j++) {
        map[i][j] = " ";
      }
    } else {
      map[i][deadzone[0]] = " ";
    }
  }
}

function calcValues(map, deadzone) {
  let zones = { zone1: 0, zone2: 0, zone3: 0, zone4: 0 };

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] > 0) {
        let zone;
        if (j < deadzone[0] && i < deadzone[1]) zone = "zone1";
        else if (j < deadzone[0] && i > deadzone[1]) zone = "zone2";
        else if (j > deadzone[0] && i > deadzone[1]) zone = "zone3";
        else if (j > deadzone[0] && i < deadzone[1]) zone = "zone4";
        zones[zone] += map[i][j];
      }
    }
  }

  return zones["zone1"] * zones["zone2"] * zones["zone3"] * zones["zone4"];
}

const re = /(?:p=(-?[\d]+),(-?[\d]+) v=(-?[\d]+),(-?[\d]+))/g;
const seconds = 100;
const dimensions = [101, 103];
const input = utils.getInputUnfiltered();
const botInfo = [...input.matchAll(re)];
const botArray = [];
botInfo.forEach((bot) =>
  botArray.push(new Bot(+bot[1], +bot[2], +bot[3], +bot[4]))
);

let sum = 0;
let map = [];

for (let i = 0; i < seconds; i++) {
  for (let j = 0; j < botArray.length; j++) {
    botArray[j].move(dimensions);
  }
  map = drawMap(dimensions, botArray);
}

const deadzone = calculateDeadzone(dimensions);
drawDeadzone(map, deadzone);
sum = calcValues(map, deadzone);

console.log(`Map after ${seconds} seconds.`);
map.forEach((map) => console.log(map.join("").replaceAll("0", ".")));

utils.logOutput("2024", "14", "A", sum);
