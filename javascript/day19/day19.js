const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf8").split("\n").filter(Boolean);
let towels = lines[0].split(", ");

function main() {
  q1();
  q2();
}

function matchNext(line) {
  if (line.length == 0) {
    return true;
  }

  for (let i = 0; i < towels.length; i++) {
    if (line.search(towels[i]) == 0) {
      if (matchNext(line.substring(towels[i].length)) == true) {
        return true;
      }
    }
  }

  return false;
}

function q1() {
  count = 0;
  for (let i = 1; i < lines.length; i++) {
    if (matchNext(lines[i], true, towels) == true) {
      count++;
    }
  }
  console.log(count);
}

let lineCount = 0;

function matchNext2(line, towelsIn, solvedMap) {
  if (line.length == 0) {
    lineCount++;
    return false;
  }

  let found = false;
  solvedMap.forEach((val, solvedLine) => {
    if (line == solvedLine) {
      lineCount += val;
      found = true;
    }
  });
  if (found == true) {
    return false;
  }

  let usedTowels = [...towelsIn];
  for (let j = towelsIn.length - 1; j >= 0; j--) {
    if (line.search(towelsIn[j]) < 0) {
      usedTowels.splice(j, 1);
    }
  }

  for (let i = 0; i < usedTowels.length; i++) {
    if (line.search(usedTowels[i]) == 0) {
      if (
        matchNext2(
          line.substring(usedTowels[i].length),
          usedTowels,
          solvedMap
        ) == true
      ) {
        return true;
      }
    }
  }

  return false;
}

function q2() {
  let total = 0;
  for (let i = 1; i < lines.length; i++) {
    let solvedMap = new Map();

    for (let j = lines[i].length - 1; j >= 0; j--) {
      let str = lines[i].substring(j);
      lineCount = 0;
      matchNext2(str, towels, solvedMap);
      if (lineCount > 0) {
        solvedMap.set(str, lineCount);
      }
    }

    lineCount = 0;
    matchNext2(lines[i], towels, solvedMap);
    total += lineCount;
  }
  console.log(total);
}

main();
