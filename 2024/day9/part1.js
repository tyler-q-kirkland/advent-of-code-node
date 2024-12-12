import utils from "../../utils/index.js";

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

function fragmentDiskMap(expandedDiskMap) {
  for (let i = 0; i < expandedDiskMap.length; i++) {
    while (true) {
      if (expandedDiskMap[expandedDiskMap.length - 1] === freeBlock) {
        expandedDiskMap.pop();
      } else {
        break;
      }
    }
    if (expandedDiskMap[i] === freeBlock) {
      expandedDiskMap[i] = expandedDiskMap.pop();
    }
  }
}

function calculateChecksum(expandedDiskMap) {
  let checksum = 0;
  for (let i = 0; i < expandedDiskMap.length; i++) {
    checksum += expandedDiskMap[i][0] * i;
  }
  return checksum;
}

const freeBlock = ".";
const input = utils.getInputUnfiltered();
let expandedDiskMap = expandDiskMap(input);
fragmentDiskMap(expandedDiskMap);
let checksum = calculateChecksum(expandedDiskMap);
utils.logOutput(2024, 9, "A", checksum);
