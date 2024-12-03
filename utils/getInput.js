function getInput() {
    let input = require('./index.js');
    let puzzleString = input.getInputUnfiltered();
    let puzzleInput = puzzleString.split('\n');
    let puzzleInputFiltered = puzzleInput.filter(elm => elm);
    return puzzleInputFiltered;
}


module.exports = getInput;