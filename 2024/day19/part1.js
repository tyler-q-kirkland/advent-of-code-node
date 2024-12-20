import * as utils from "../../utils/utils.js";

function inCache(design, designCache) {
  if (Object.hasOwn(designCache, design)) {
    return true;
  }
}

function testDesign(design, towels) {
  if (inCache(design, designCache)) {
    return 1;
  }
  for (let towel of towels) {
    if (design.startsWith(towel)) {
      const partialDesign = design.slice(towel.length);
      if (partialDesign.length) {
        if (testDesign(partialDesign, towels)) {
          designCache[design] = true;
          return 1;
        }
      } else {
        designCache[design] = true;
        return 1;
      }
    }
  }
}

let sum = 0;
let designCache = {};
const input = utils.getInputUnfiltered();
const inputSplit = input.split(/\r?\n\r?\n/);
const towels = inputSplit[0].split(", ");
const designs = inputSplit[1].split(/\r?\n/);

for (let design of designs) {
  if (testDesign(design, towels)) {
    sum += 1;
  }
}

utils.logOutput(2024, 19, "A", sum);
