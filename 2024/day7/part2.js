import utils from '../../utils/index.js';

const input = utils.getInput();

function iterateResults(expecResult, currentResult, integers, index) {
    let additionResult = currentResult + +integers[index];
    let multResult = currentResult * +integers[index];
    let concatResult = +`${currentResult}${integers[index]}`;
        if (additionResult == expecResult || multResult == expecResult || concatResult == expecResult ) {
        return true;
    }

    if (index < integers.length-1) {
        index += 1;
        if (additionResult < expecResult && iterateResults(expecResult, additionResult, integers, index)) {
            return true
        } else if (multResult < expecResult && iterateResults(expecResult, multResult, integers, index)) {
            return true
        } else if (concatResult < expecResult && iterateResults(expecResult, concatResult, integers, index)) {
            return true    
        } else {
            return false
        }
    } else {
        return false;
    }
}

let sum = 0;

for (let line of input) {
    const lineSeparated = line.split(': ');
    const integers = lineSeparated[1].split(' ');

    if (iterateResults(lineSeparated[0], +integers[0], integers, 1)){
        sum += +lineSeparated[0];
    }
}

utils.logOutput('2024', '7', 'B', sum);
