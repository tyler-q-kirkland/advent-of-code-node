import utils from '../../utils/index.js';

const input = utils.getInput();

function iterateResults(expectedResult, currentResult, integers, index) {
    let additionResult = currentResult + +integers[index];
    let multiplicationResult = currentResult * +integers[index];
    if (additionResult == expectedResult || multiplicationResult == expectedResult) {
        return true;
    }

    if (index < integers.length-1) {
        index += 1;
        if (additionResult < expectedResult && iterateResults(expectedResult, additionResult, integers, index)) {
            return true
        } else if (multiplicationResult < expectedResult && iterateResults(expectedResult, multiplicationResult, integers, index)) {
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

utils.logOutput('2024', '6', 'A', sum);
