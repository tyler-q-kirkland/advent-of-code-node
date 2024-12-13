import * as fs from "fs";

function getInput() {
  let puzzleString = getInputUnfiltered();
  let puzzleInput = puzzleString.split(/\r?\n/);
  let puzzleInputFiltered = puzzleInput.filter((elm) => elm);
  return puzzleInputFiltered;
}

function getInputUnfiltered() {
  let puzzleString = fs.readFileSync("input.txt").toString();
  return puzzleString;
}

function logOutput(year, day, part, output1, output2) {
  if (output2 !== undefined)
    console.log(
      `Your outputs for day ${day} of ${year} are ${output1} and ${output2}.`
    );
  else
    console.log(
      `Your output for day ${day} part ${part} of ${year} is ${output1}.`
    );
}

function drawMatrix(input, Matrix) {
  for (let line of input) {
    let lineArray = line.split("");
    Matrix.push(lineArray);
  }
}

export { getInput, getInputUnfiltered, logOutput, drawMatrix };
