import * as utils from "../../utils/utils.js";
import Map from "./map.js";

const input = utils.getInputUnfiltered();
const inputSplit = input.split(/\r\n[\s]/);
const map = inputSplit[0].split(/\r?\n/);
const movementSequence = inputSplit[1];

const warehouse = new Map(map);

let foundboxes = [];
warehouse.checkDir(6, 1, foundboxes);
console.log(foundboxes);

utils.logOutput("2024", "15", "A", "nothing yet");
