import Bot from "./bot.js";

export default class Map {
  constructor(map) {
    this.mapHeight = map.length;
    this.mapWidth = map[0].length;
    this.walls = [];
    this.boxes = [];
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === "#") this.walls.push([i, j]);
        else if (map[i][j] === "O") this.boxes.push([i, j]);
        else if (map[i][j] === "@") this.bot = new Bot(i, j);
      }
    }
  }

  calcDirection = {
    "^": (coordinates) => [coordinates[0] - 1, coordinates[1]],
    ">": (coordinates) => [coordinates[0], coordinates[1] + 1],
    v: (coordinates) => [coordinates[0] + 1, coordinates[1]],
    "<": (coordinates) => [coordinates[0], coordinates[1] - 1],
  };

  moveBot() {}

  checkDir(y, x, foundBoxes, direction) {
    console.log(direction);
    const box = this.boxes.find(
      (element) => element[0] === y && element[1] === x
    );
    if (box) {
      foundBoxes.push(box);
      const coordinates = this.calcDirection[direction]([y, x]);
      this.checkDir(coordinates[0], coordinates[1], foundBoxes, direction);
    } else {
      const wall = this.walls.find(
        (element) => element[0] === y && element[1] === x
      );

      if (wall) foundBoxes.length = 0;
    }
  }
}
