import utils from '../../utils/index.js';

function drawMatrix(input, xmasMatrix) {
    for (let line of input) {
        let lineArray = line.split("");
        xmasMatrix.push(lineArray);
    }
}

function searchMatrix(matrix, i, j, direction) {
    let joinedLetters = matrix[i][j];
    for (let k = 0; joinedLetters.length < searchChars.length; k++) {
        i = i + 1;
        j = (direction === 'DOWNLEFT') ? j - 1 : j + 1;
        if (matrix?.[i]?.[j]) {
            joinedLetters = joinedLetters.concat(matrix[i][j])
        } else {
            break;
        }
    }
    if (joinedLetters === searchChars || joinedLetters === searchCharsReversed) {
        return (direction === 'DOWNLEFT' ? [i - 1, j + 1] : [i - 1, j - 1])
    };
}

function findPairs(count) {
    let sum = 0;
    for (const instances in count) {
        if (count[instances] === 2) {
            sum += 1;
        }
    }
    return sum;
}

const year = 2024;
const day = 4;
const part = 'B';
const searchChars = 'MAS';
const searchCharsReversed = 'SAM';
const searchDirections = ['DOWNLEFT', 'DOWNRIGHT'];
const xmasMatrix = [];
const foundCoords = [];

const input = utils.getInput();
drawMatrix(input, xmasMatrix);

for (let i = 0; i < xmasMatrix.length; i++) {
    for (let j = 0; j < xmasMatrix[i].length; j++) {
        searchDirections.forEach((direction) => {
            let coords = (searchMatrix(xmasMatrix, i, j, direction));
            if (coords !== undefined) {
                foundCoords.push(coords);
            }
        });
    }
}

let count = foundCoords.reduce(function (value, value2) {
    return (
        value[value2] ? ++value[value2] : (value[value2] = 1),
        value
    );
}, {});

let sum = findPairs(count);

utils.logOutput(year, day, part, sum);