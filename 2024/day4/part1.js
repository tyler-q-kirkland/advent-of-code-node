import utils from '../../utils/index.js';

function drawMatrix(input) {
    let xmasMatrix = [];
    for (let line of input) {
        let lineArray = line.split("");

        xmasMatrix.push(lineArray);
    }
    return xmasMatrix
}

function searchMatrix(matrix, i, j, direction) {
    let joinedLetters = matrix[i][j];
    for (let k = 0; joinedLetters.length < searchChars.length; k++) {
        i = (direction === 'DOWN' || direction === 'DOWNRIGHT' || direction === 'DOWNLEFT') ? i + 1 : i;
        j = (direction === 'RIGHT' || direction === 'DOWNRIGHT') ? j + 1
            : direction === 'DOWNLEFT' ? j - 1
                : j;
        if (matrix?.[i]?.[j]) {
            joinedLetters = joinedLetters.concat(matrix[i][j])
        } else {
            break;
        }
    }
    return (joinedLetters === searchChars || joinedLetters === searchCharsReversed ? true : false);
}

const year = 2024;
const day = 4;
const part = 'A';
const searchChars = 'XMAS';
const searchCharsReversed = 'SAMX';
const searchDirections = ['RIGHT', 'DOWNRIGHT', 'DOWN', 'DOWNLEFT'];
let sum = 0;

const input = utils.getInput();
let xmasMatrix = drawMatrix(input);

for (let i = 0; i < xmasMatrix.length; i++) {
    for (let j = 0; j < xmasMatrix[i].length; j++) {
        searchDirections.forEach((direction) => {
            if (searchMatrix(xmasMatrix, i, j, direction))
                sum += 1;
        });
    }
}

utils.logOutput(year, day, part, sum);