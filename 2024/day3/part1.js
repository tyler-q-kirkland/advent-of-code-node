import * as utils from "../../utils/utils.js";

const year = 2024;
const day = 3;
const part = "A";
const reg = /mul\([\d]+,[\d]+\)/g;
let sum = 0;

const input = utils.getInputUnfiltered();

let equations = input.match(reg);
equations = equations.map((x) => {
  return x.replace(/mul\(|\)/g, "");
});
for (let line of equations) {
  let factors = line.split(",");
  sum += +factors[0] * +factors[1];
}

utils.logOutput(year, day, part, sum);
