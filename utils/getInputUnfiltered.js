function getInputUnfiltered() {
    let fs = require('fs');
    let puzzleString = fs.readFileSync('input.txt').toString();
    return puzzleString;
}

module.exports = getInputUnfiltered;