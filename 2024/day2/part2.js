import utils from '../../utils/index.js';

let year = 2024;
let day = 2;
let part = 'B';
let sum = 0;

const input = utils.getInput();

for (let line of input) {
    var levelArray = line.split(" ");
    var validLevel = validateLevel(levelArray);
    sum += validLevel ? 1 : 0;
}

function validateLevel(levelArray, backupFlag) {
    var validLevel = true;
    for (let i = 0; i < levelArray.length - 1 && validLevel == true; i++) {
        if (i == 0) {
            var initialDirection = (+levelArray[i] < +levelArray[i + 1]) ? 'up' : 'down';
        } else {
            var currentDirection = (+levelArray[i] < +levelArray[i + 1]) ? 'up' : 'down';
        }
        let diff = Math.abs(levelArray[(i)] - levelArray[i + 1])
        if (diff > 3 || diff < 1 || (i !== 0 && currentDirection !== initialDirection)) {
            if (backupFlag !== true) {
                var backupValidity = false;
                for (let n = 0; n < levelArray.length && backupValidity !== true; n++) {
                    let backupArray = [...levelArray];
                    backupArray.splice(+n, 1);
                    var backupValidity = validateLevel(backupArray, true);
                }
                var validLevel = backupValidity;
            } else { validLevel = false }
        }
    }
    return validLevel;
}

utils.logOutput(year, day, part, sum);