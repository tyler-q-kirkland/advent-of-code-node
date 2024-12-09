import utils from '../../utils/index.js';

const year = 2024;
const day = 5;
const part = 'B';
let sum = 0;

function shufflePages(array, updateArray) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    let arrayString = array.join(',');
    badLines.push(arrayString);
}

const input = utils.getInputUnfiltered();
const inputSplit = input.split(/\n\n/);
const ruleArray = inputSplit[0].split('\n');
let updateArray = inputSplit[1].split('\n');

let badLines = [];
for (let line of ruleArray) {
    let order = line.split('|');
    let re = new RegExp(order[1] + '.*' + order[0]);
    for (let i = 0; i < updateArray.length; i++) {
        if (re.test(updateArray[i])) {
            badLines.push(updateArray[i]);
        }
    }
    updateArray = updateArray.filter(item => !badLines.includes(item));
}


while (true) {

    let unfixedLines = [];
    for (let line of ruleArray) {
        let order = line.split('|');
        let re = new RegExp(order[1] + '.*' + order[0]);
        for (let i = 0; i < badLines.length; i++) {
            if (re.test(badLines[i])) {
                unfixedLines.push(badLines[i]);
            }
        }
        badLines = badLines.filter(item => !unfixedLines.includes(item));
    }


    if (unfixedLines.length > 0) {
        for (let line of unfixedLines) {
            let badArray = line.split(',');
            shufflePages(badArray, badLines);
        }
    } else {
        break
    }

}

for (let i = 0; i < badLines.length; i++) {
    const validSequence = badLines[i].split(',');
    const middleValue = validSequence[Math.floor(validSequence.length / 2)]
    sum += +middleValue;
}

utils.logOutput(year, day, part, sum);