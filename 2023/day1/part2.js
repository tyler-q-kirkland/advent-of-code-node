import utils from '../../utils/index.js';
let year = 2023;
let day = 1;
let part = 'B';
var re = /\d/g;

let input = utils.getInput();
let sum = 0;
for(let line of input){

    line = line.replaceAll("one", "o1e");
    line = line.replaceAll("two", "t2o");
    line = line.replaceAll("three", "th3ee");
    line = line.replaceAll("four", "fo4r");
    line = line.replaceAll("five", "f5ve");
    line = line.replaceAll("six", "s6x");
    line = line.replaceAll("seven", "se7en");
    line = line.replaceAll("eight", "ei8ght");
    line = line.replaceAll("nine", "n9ne");

    let firstInt = line.match(re);
    let secondInt = line.match(re).reverse();
    let combinedInts = firstInt[0] + secondInt[0];

    console.log(combinedInts)

    sum += +combinedInts;
}

utils.logOutput(year, day, part, sum )

