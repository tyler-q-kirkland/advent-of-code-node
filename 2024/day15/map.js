import Mover from "./mover.js";

export default class Map {
  constructor(map) {
    this.mapHeight = map.length;
    this.mapWidth = map[0].length;
    this.walls = [];
    this.boxes = [];
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === "#") this.walls.push([i, j]);
        else if (map[i][j] === "O") this.boxes.push(new Mover(i, j));
        else if (map[i][j] === "@") this.bot = new Mover(i, j);
      }
    }
  }

  calcDirection = {
    "^": () => [-1, 0],
    ">": () => [0, 1],
    v: () => [1, 0],
    "<": () => [0, -1],
  };

  moveBot(direction) {
    let foundBoxes = [];
    let validSpaces = [];
    const directionalValues = this.calcDirection[direction]();
    const nextY = this.bot.y + directionalValues[0];
    const nextX = this.bot.x + directionalValues[1];
    this.checkDir(nextY, nextX, validSpaces, foundBoxes, direction);
    if (validSpaces.length > 0)
      this.bot.move(directionalValues[0], directionalValues[1]);
    if (foundBoxes.length > 0)
      foundBoxes.forEach((i) =>
        this.boxes[i].move(directionalValues[0], directionalValues[1])
      );
  }

  checkDir(y, x, validSpaces, foundBoxes, direction) {
    const box = this.boxes.findIndex((obj) => obj.y === y && obj.x === x);
    if (box !== -1) {
      foundBoxes.push(box);
      validSpaces.push([y, x]);
      const directionalValues = this.calcDirection[direction]();
      this.checkDir(
        y + directionalValues[0],
        x + directionalValues[1],
        validSpaces,
        foundBoxes,
        direction
      );
    } else {
      const wall = this.walls.find(
        (element) => element[0] === y && element[1] === x
      );

      if (wall) {
        validSpaces.length = 0;
        foundBoxes.length = 0;
      } else {
        validSpaces.push([y, x]);
      }
    }
  }
  renderMap() {
    const map = new Array(this.mapWidth)
      .fill(null)
      .map(() => new Array(this.mapWidth).fill("."));
    this.walls.forEach((wall) => (map[wall[0]][wall[1]] = "#"));
    this.boxes.forEach((box) => (map[box.y][box.x] = "O"));
    map[this.bot.y][this.bot.x] = "@";

    return map;
  }
  calculateValue() {
    let sum = 0;
    this.boxes.forEach((box) => (sum += box.calculateValue()));

    return sum;
  }
}
