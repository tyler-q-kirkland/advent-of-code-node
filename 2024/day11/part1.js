import * as utils from "../../utils/utils.js";

let sum = 0;
const input = utils.getInputUnfiltered();
const numArray = input.split(" ");
let nums = new Map();

for (let num in numArray) {
  let numbersToProcess = [+num];
  for (let i = 0; i < numbersToProcess.length; i++) {
    let newNumbers = [];
    if (numbersToProcess[i] === 0) {
      newNumbers.push(1);
      console.log("zero");
    } else if (numbersToProcess[i].toString().length % 2 === 0) {
      console.log("even");
    } else {
      console.log("odd");
    }
  }
}

console.log(numArray);

utils.logOutput("2024", "11", "A", sum);
