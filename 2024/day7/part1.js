import utils from '../../utils/index.js';

const input = utils.getInput();

function iterateResults(expResult, currentResult, integers, index) {
    let addResult = currentResult + +integers[index];
    let multResult = currentResult * +integers[index];
    if (addResult == expResult || multResult == expResult) {
        return true;
    }

    if (index < integers.length - 1) {
        index += 1;
        if (addResult < expResult && iterateResults(expResult, addResult, integers, index)) {
            return true
        } else if (multResult < expResult && iterateResults(expResult, multResult, integers, index)) {
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

    if (iterateResults(lineSeparated[0], +integers[0], integers, 1)) {
        sum += +lineSeparated[0];
    }
}

utils.logOutput('2024', '7', 'A', sum);
