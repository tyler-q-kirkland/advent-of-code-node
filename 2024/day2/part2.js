import * as utils from "../../utils/utils.js";

const year = 2024;
const day = 2;
const part = "B";
let sum = 0;

const input = utils.getInput();

for (let line of input) {
  const levelArray = line.split(" ");
  let validLevel = true;
  validLevel = validateLevel(levelArray);
  sum += validLevel ? 1 : 0;
}

function validateLevel(levelArray, backupFlag) {
  let validLevel = true;
  let initialDirection;
  for (let i = 0; i < levelArray.length - 1 && validLevel == true; i++) {
    let currentDirection;
    if (i == 0) {
      initialDirection = +levelArray[i] < +levelArray[i + 1] ? "up" : "down";
    } else {
      currentDirection = +levelArray[i] < +levelArray[i + 1] ? "up" : "down";
    }
    let diff = Math.abs(levelArray[i] - levelArray[i + 1]);
    if (
      diff > 3 ||
      diff < 1 ||
      (i !== 0 && currentDirection !== initialDirection)
    ) {
      if (backupFlag !== true) {
        let backupValidity = false;
        for (let n = 0; n < levelArray.length && backupValidity !== true; n++) {
          let backupArray = [...levelArray];
          backupArray.splice(+n, 1);
          backupValidity = validateLevel(backupArray, true);
        }
        validLevel = backupValidity;
      } else {
        validLevel = false;
      }
    }
  }
  return validLevel;
}

utils.logOutput(year, day, part, sum);
