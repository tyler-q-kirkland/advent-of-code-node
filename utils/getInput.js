function getInput() {
    let fs = require('fs');
    let puzzleString = fs.readFileSync('input.txt').toString();
    let puzzleInput = puzzleString.split('\n');
    let puzzleInputFiltered = puzzleInput.filter(elm => elm);
    return puzzleInputFiltered
}

module.exports = getInput;