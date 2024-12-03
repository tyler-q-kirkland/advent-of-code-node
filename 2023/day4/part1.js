import utils from '../../utils/index.js';

const year = 2023;
const day = 4;
const part = 'A';
let sum = 0;

const input = utils.getInput();

for (let line of input) {
    line = line.replace(/Card[ \t]+[\d]+\:[ \t]+/, "");
    const sets = line.split(/[ \t]+\|[ \t]+/)
    const winningNumbers = sets[0].split(/[ \t]+/);
    const drawnNumbers = sets[1].split(/[ \t]+/);
    let matches = drawnNumbers.filter(item => winningNumbers.includes(item)).length;
    let value = ( matches < 2) ? matches : 2 ** (matches - 1); 
    sum += value;

}


utils.logOutput(year, day, part, sum);