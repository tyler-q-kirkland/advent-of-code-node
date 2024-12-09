import utils from '../../utils/index.js';

const year = 2024;
const day = 5;
const part = 'A';
let sum = 0;

const input = utils.getInputUnfiltered();
const inputSplit = input.split(/\n\n/);
const ruleArray = inputSplit[0].split('\n');
let updateArray = inputSplit[1].split('\n');
const ruleOrder = [];

for (let line of ruleArray) {
    let order = line.split('|');
    let re = new RegExp(order[1] + '.*' + order[0]);
    let badLines = [];
    for (let i = 0; i < updateArray.length; i++) {
        if (re.test(updateArray[i])) {
            badLines.push(updateArray[i]);
        }
    }
    updateArray = updateArray.filter(item => !badLines.includes(item));
}

for (let i = 0; i < updateArray.length; i++) {
    const validSequence = updateArray[i].split(',');
    const middleValue = validSequence[Math.floor(validSequence.length/2)] 
    sum += +middleValue;
}

utils.logOutput(year, day, part, sum);