export default class Mover {
  constructor(y, x) {
    this.x = x;
    this.y = y;
  }
  move(y, x) {
    this.y += y;
    this.x += x;
  }
  calculateValue() {
    return this.y * 100 + this.x;
  }
}
