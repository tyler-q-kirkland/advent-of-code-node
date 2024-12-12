function logOutput(year, day, part, output1, output2) {
  if (output2 !== undefined)
    console.log(
      `Your outputs for day ${day} of ${year} are ${output1} and ${output2}.`
    );
  else
    console.log(
      `Your output for day ${day} part ${part} of ${year} is ${output1}.`
    );
}

module.exports = logOutput;
