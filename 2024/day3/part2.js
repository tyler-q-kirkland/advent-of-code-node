import * as utils from "../../utils/utils.js";

const year = 2024;
const day = 3;
const part = "A";
const reg = /mul\([\d]+,[\d]+\)|do\(\)|don\'t\(\)/g;
let sum = 0;

const input = utils.getInputUnfiltered();

let equations = input.match(reg);
equations = equations.map((x) => {
  return x.replace(/mul|\(|\)/g, "");
});
let enabled = true;
for (let line of equations) {
  switch (line) {
    case "do":
      enabled = true;
      break;
    case "don't":
      enabled = false;
      break;
    default:
      if (enabled == true) {
        let factors = line.split(",");
        sum += +factors[0] * +factors[1];
      }
      break;
  }
}

utils.logOutput(year, day, part, sum);
