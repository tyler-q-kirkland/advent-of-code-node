import * as utils from "../../utils/utils.js";

function inCache(design, designCache) {
  if (Object.hasOwn(designCache, design)) {
    return true;
  }
}

function testDesign(design, towels) {
  let count = 0;

  if (inCache(design, designCache)) {
    count += designCache[design];
  } else {
    for (let towel of towels)
      if (design.startsWith(towel)) {
        const partialDesign = design.slice(towel.length);
        if (partialDesign.length) {
          const foundCount = testDesign(partialDesign, towels);
          if (foundCount) {
            count += foundCount;
            designCache[design] = count;
          }
        } else {
          count += 1;
          designCache[design] = count;
        }
      }
  }
  return count;
}

let sum = 0;
let designCache = {};
const input = utils.getInputUnfiltered();
const inputSplit = input.split(/\r?\n\r?\n/);
const towels = inputSplit[0].split(", ");
const designs = inputSplit[1].split(/\r?\n/);

for (let design of designs) {
  sum += testDesign(design, towels);
}

utils.logOutput(2024, 19, "B", sum);
