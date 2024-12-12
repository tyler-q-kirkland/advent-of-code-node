import * as utils from "../../utils/utils.js";

function stoneLookup(number, blinks) {
  if (
    Object.hasOwn(resultCache, number) &&
    Object.hasOwn(resultCache[number], blinks)
  ) {
    return resultCache[number][blinks];
  }
}

function calculateStones(number, blinks) {
  if (blinks === 0) {
    return 1;
  }

  const cachedResult = stoneLookup(number, blinks);
  if (cachedResult) {
    return cachedResult;
  }

  let result = 0;

  if (number === 0) {
    result = calculateStones(1, blinks - 1);
  } else if (number.toString().length % 2 === 0) {
    result =
      calculateStones(
        +number.toString().slice(0, number.toString().length / 2),
        blinks - 1
      ) +
      calculateStones(
        +number
          .toString()
          .slice(number.toString().length / 2, number.toString().length),
        blinks - 1
      );
  } else {
    result = calculateStones(number * 2024, blinks - 1);
  }
  if (!(number in resultCache)) {
    resultCache[number] = { [blinks]: result };
  }
  resultCache[number][blinks] = result;
  return result;
}

const blinks = 75;
let sum = 0;
const resultCache = {};
const input = utils.getInputUnfiltered();
const stoneArray = input.split(" ");

for (let stone of stoneArray) {
  sum += calculateStones(+stone, blinks);
}

utils.logOutput("2024", "11", "B", sum);
