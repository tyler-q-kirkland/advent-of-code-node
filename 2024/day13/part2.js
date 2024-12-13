import * as utils from "../../utils/utils.js";

function calculateTokens(game) {
  const results = minTokensToWin(
    [+game[1], +game[2]], //ax, ay
    [+game[3], +game[4]], //bx, by
    [+game[5] + extra, +game[6] + extra] //x, y
  );
  if (results) {
    sum += results[0] * 3 + results[1] * 1;
  }
}

//stolen from letelete - I don't know linear algebra
function minTokensToWin([ax, ay], [bx, by], [X, Y]) {
  if ([ax, ay, bx, by].some((v) => v === 0)) return null;
  const tb = Math.floor((ay * X - ax * Y) / (ay * bx - ax * by));
  const ta = Math.floor((X - bx * tb) / ax);
  return ax * ta + bx * tb === X && ay * ta + by * tb === Y ? [ta, tb] : null;
}

let sum = 0;
const re =
  /(?:Button A: X\+([\d]+), Y\+([\d]+)[\s]+Button B: X\+([\d]+), Y\+([\d]+)[\s]+Prize: X=([\d]+), Y=([\d]+))/g;
const extra = 10000000000000;

const input = utils.getInputUnfiltered();
const gameInfo = [...input.matchAll(re)];

gameInfo.forEach(calculateTokens, sum);

utils.logOutput("2024", "13", "B", sum);
