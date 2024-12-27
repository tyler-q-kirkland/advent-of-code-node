import * as utils from "../../utils/utils.js";

function resolveGates(gate, wires) {
  if (!checkWires(gate[1], gate[3], wires)) return false;
  switch (gate[2]) {
    case "AND":
      if (wires.get(gate[1]) == 1 && wires.get(gate[3]) == 1)
        wires.set(gate[4], 1);
      else wires.set(gate[4], 0);
      break;
    case "OR":
      if (wires.get(gate[1]) == 1 || wires.get(gate[3]) == 1)
        wires.set(gate[4], 1);
      else wires.set(gate[4], 0);
      break;
    case "XOR":
      if (
        (wires.get(gate[1]) == 1 && wires.get(gate[3]) == 0) ||
        (wires.get(gate[1]) == 0 && wires.get(gate[3]) == 1)
      )
        wires.set(gate[4], 1);
      else wires.set(gate[4], 0);

      break;
  }
  return true;
}

function checkWires(wire1, wire2, wires) {
  if (!wires.has(wire1)) return false;
  if (!wires.has(wire2)) return false;
  else return true;
}

const re = /(\S+) ([a-zA-Z]+) (\S+) -> (\S+)/g;
const input = utils.getInputUnfiltered();
const inputSplit = input.split(/\r?\n\r?\n/);
const wires = new Map();
const startingWires = inputSplit[0].split(/\r?\n/);
const gates = [...inputSplit[1].matchAll(re)];

[...input.matchAll(re)];

for (let line of startingWires) {
  const init = line.split(": ");
  wires.set(init[0], init[1]);
}

for (let i = 0; i < gates.length; i++) {
  if (!resolveGates(gates[i], wires)) {
    gates.push(gates.splice(i, 1)[0]);
    i -= 1;
  }
}

let sortedWires = new Map(
  [...wires.entries()]
    .filter(([k]) => k.startsWith("z"))
    .sort()
    .reverse()
);

let binaryString = "";
sortedWires.forEach((wire) => (binaryString += wire));
var solvedNumber = parseInt(binaryString, 2);

utils.logOutput("2024", "23", "A", solvedNumber);
