import utils from '../../utils/index.js';

const year = 2024;
const day = 5;
const part = 'B';
let sum = 0;

function checkMap(a, b) {
    const followingNumbers = ruleMap.get(a);
    const found = (element) => element === b;
    if (followingNumbers.some(found)) {
        return -1;
    } else {
        return 1;
    }
}

const input = utils.getInputUnfiltered();
const inputSplit = input.split(/\n\n/);
const ruleArray = inputSplit[0].split('\n');
const updateArray = inputSplit[1].split('\n');
const ruleMap = new Map();
const validArray = [];

for (let i = 0; i < ruleArray.length; i++) {
    let rulePair = ruleArray[i].split('|');
    if (ruleMap.has(rulePair[0])) {
        let currentValue = ruleMap.get(rulePair[0]);
        currentValue.push(rulePair[1]);
        ruleMap.set(rulePair[0], currentValue);
    } else {
        ruleMap.set(rulePair[0], [rulePair[1]]);
    }

}


for (let i = 0; i < updateArray.length; i++) {
    let order = updateArray[i].split(',');
    const sortedLine = order.sort(checkMap);
    if (!(sortedLine == order)) {
        console.log('Test')
        validArray.push(sortedLine);
    }
}

console.log(validArray);

for (let i = 0; i < validArray.length; i++) {
    const middleValue = validArray[i][Math.floor(validArray[i].length / 2)]
    sum += +middleValue;
}

utils.logOutput(year, day, part, sum);