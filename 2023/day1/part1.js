import utils from '../../utils/index.js';
let year = 2023;
let day = 1;
let part = 'A';
var re = /\d/g;

let input = utils.getInput();
let sum = 0;
for(let line of input){
    let firstInt = line.match(re);
    let secondInt = line.match(re).reverse();
    let combinedInts = firstInt[0] + secondInt[0];
    sum += +combinedInts;
}

utils.logOutput(year, day, part, sum )