import utils from '../../utils/index.js';
let year = 2024;
let day = 1;
let part = 'A';
let sum = 0;
let sum2 = 0;
const list1 = [];
const list2 = [];

let input = utils.getInput();
for (let line of input) {
    const splitInput = line.split("   ")
    list1.push(splitInput.slice(0, 1));
    list2.push(splitInput.slice(1, 2));
}
list1.sort((a, b) => (a - b))
list2.sort((a, b) => (a - b))
for (let [index, value] of list1.entries()) {
    sum += Math.abs(value - list2[index]);
    sum2 += value * list2.filter((list2) => list2.includes(value[0])).length;

}

utils.logOutput(year, day, part, sum, sum2)