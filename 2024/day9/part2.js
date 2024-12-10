import utils from '../../utils/index.js';

function expandDiskMap(diskMap) {
    const expandedDiskMap = [];
    let idNumber = 0;
    for (let i = 0; i < diskMap.length; i++) {
        if (i % 2 === 0) {
            for (let j = 0; j < diskMap.charAt(i); j++) {
                expandedDiskMap.push([idNumber]);
            }
            idNumber += 1;
        } else {
            for (let j = 0; j < diskMap.charAt(i); j++) {
                expandedDiskMap.push(freeBlock);
            }
        }
    }
    return expandedDiskMap;
}

function fragmentDiskMap(expandedDiskMap, expandedDiskString) {
    let reversedMap = expandedDiskMap.toReversed();
    let count = 0;
    for (let i = 0; i < reversedMap.length; i++) {
        if (reversedMap[i].toString() === freeBlock) {
            continue
        }
        count += 1;
        if (i === reversedMap.length - 1 || reversedMap[i].toString() !== reversedMap[i + 1].toString()) {
            const re = new RegExp(('\\' + freeBlock).repeat(count));
            const match = re.exec(expandedDiskString);
            if ((match) && match.index <= (reversedMap.length - i)) {
                let foundIndex = match.index;
                const foundID = reversedMap[i];
                for (let j = 0; j < count; j++) { // I regret everything
                    expandedDiskMap[foundIndex] = foundID;
                    expandedDiskMap[expandedDiskMap.length - i + j - 1] = freeBlock;
                    expandedDiskString = expandedDiskString.split('');
                    expandedDiskString[foundIndex] = fileBlock;
                    expandedDiskString = expandedDiskString.join('');
                    expandedDiskString = expandedDiskString.split('');
                    expandedDiskString[expandedDiskMap.length - i + j - 1] = freeBlock;
                    expandedDiskString = expandedDiskString.join('');
                    foundIndex += 1;
                    reversedMap = expandedDiskMap.toReversed();
                }
            }
            count = 0;
        }
    }
}

function buildDiskString(diskMap) {
    let expandedDiskString = diskMap.toString();
    expandedDiskString = expandedDiskString.replace(/\d+/g, fileBlock);
    expandedDiskString = expandedDiskString.replace(/,/g, '');
    return expandedDiskString;
}

function calculateChecksum(expandedDiskMap) {
    let checksum = 0;
    for (let i = 0; i < expandedDiskMap.length; i++) {
        if (expandedDiskMap[i] !== freeBlock) {
            checksum += expandedDiskMap[i][0] * i;
        }
    }
    return checksum;
}

const freeBlock = '.';
const fileBlock = '#'
const input = utils.getInputUnfiltered();
let expandedDiskMap = expandDiskMap(input);
let expandedDiskString = buildDiskString(expandedDiskMap);
fragmentDiskMap(expandedDiskMap, expandedDiskString);
let checksum = calculateChecksum(expandedDiskMap);
utils.logOutput(2024, 9, 'B', checksum);