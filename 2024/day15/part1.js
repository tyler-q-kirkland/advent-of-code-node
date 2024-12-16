import * as utils from "../../utils/utils.js";
import Map from "./map.js";

const input = utils.getInputUnfiltered();
const inputSplit = input.split(/\r\n[\s]/);
const map = inputSplit[0].split(/\r?\n/);
const movementSequence = inputSplit[1].replace(/[\n\r\t]/gm, "");

const warehouse = new Map(map);

let foundboxes = [];
for (let i = 0; i < movementSequence.length; i++) {
  warehouse.moveBot(6, 1, foundboxes, movementSequence.charAt(i));
}

utils.logOutput("2024", "15", "A", "nothing yet");
