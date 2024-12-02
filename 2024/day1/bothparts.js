const utils = require('../../utils/index.js');

let year = 2024;
let day = 1;
let sum = 0;
let sum2 = 0;
const list1 = [];
const list2 = [];

const input = utils.getInput();

for (let line of input) {
    const splitInput = line.split("   ");

    list1.push(splitInput[0]);
    list2.push(splitInput[1]);
}

list1.sort((a, b) => (a - b));
list2.sort((a, b) => (a - b));

for (let i = 0; i < list1.length; i++) {
    const value = list1[i];

    sum += Math.abs(value - list2[i]);
    sum2 += value * list2.filter((num) => num === value).length;
}

utils.logOutput(year, day, undefined, sum, sum2);