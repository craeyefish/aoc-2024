const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf8").split("\n").filter(Boolean);

function main() {
  q1();
  q2();
}

function q1() {
  let xmases = 0;
  for (let x = 0; x < lines[0].length; x++) {
    for (let y = 0; y < lines.length; y++) {
      xmases += findXmas(x, y);
    }
  }

  console.log(xmases);
}

function q2() {
  let xmases = 0;
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      xmases += findMasMas(x, y);
    }
  }

  console.log(xmases);
}

function findXmas(posx, posy) {
  const resultMap = new Map();
  resultMap.set("N", 0);
  resultMap.set("NE", 0);
  resultMap.set("E", 0);
  resultMap.set("SE", 0);
  resultMap.set("S", 0);
  resultMap.set("SW", 0);
  resultMap.set("W", 0);
  resultMap.set("NW", 0);

  for (let d = 0; d <= 3; d++) {
    let l = "XMAS"[d];
    let matches = 0;

    if (lines.length > posy + d && lines[posy + d][posx] == l) {
      matches++;
      resultMap.set("S", resultMap.get("S") + 1);
    }
    if (
      lines.length > posy + d &&
      lines[posy].length > posx + d &&
      lines[posy + d][posx + d] == l
    ) {
      matches++;
      resultMap.set("SE", resultMap.get("SE") + 1);
    }
    if (lines[posy].length > posx + d && lines[posy][posx + d] == l) {
      matches++;
      resultMap.set("E", resultMap.get("E") + 1);
    }
    if (
      posy - d >= 0 &&
      lines[posy].length > posx + d &&
      lines[posy - d][posx + d] == l
    ) {
      matches++;
      resultMap.set("NE", resultMap.get("NE") + 1);
    }
    if (posy - d >= 0 && lines[posy - d][posx] == l) {
      matches++;
      resultMap.set("N", resultMap.get("N") + 1);
    }
    if (posy - d >= 0 && posx - d >= 0 && lines[posy - d][posx - d] == l) {
      matches++;
      resultMap.set("NW", resultMap.get("NW") + 1);
    }
    if (posx - d >= 0 && lines[posy][posx - d] == l) {
      matches++;
      resultMap.set("W", resultMap.get("W") + 1);
    }
    if (
      lines.length > posy + d &&
      posx - d >= 0 &&
      lines[posy + d][posx - d] == l
    ) {
      matches++;
      resultMap.set("SW", resultMap.get("SW") + 1);
    }

    if (matches == 0) {
      return 0;
    }
  }

  let matches = 0;
  for (let [key, value] of resultMap) {
    if (value == 4) {
      matches++;
    }
  }

  return matches;
}

function findMasMas(posx, posy) {
  let found = "";

  if (lines[posy][posx] != "A") {
    return 0;
  }

  if (
    lines.length > posy + 1 &&
    lines[posy].length > posx + 1 &&
    (lines[posy + 1][posx + 1] == "M" || lines[posy + 1][posx + 1] == "S")
  ) {
    found += lines[posy + 1][posx + 1];
  }
  if (
    posy - 1 >= 0 &&
    lines[posy].length > posx + 1 &&
    (lines[posy - 1][posx + 1] == "M" || lines[posy - 1][posx + 1] == "S")
  ) {
    found += lines[posy - 1][posx + 1];
  }
  if (
    posy - 1 >= 0 &&
    posx - 1 >= 0 &&
    (lines[posy - 1][posx - 1] == "M" || lines[posy - 1][posx - 1] == "S")
  ) {
    found += lines[posy - 1][posx - 1];
  }
  if (
    lines.length > posy + 1 &&
    posx - 1 >= 0 &&
    (lines[posy + 1][posx - 1] == "M" || lines[posy + 1][posx - 1] == "S")
  ) {
    found += lines[posy + 1][posx - 1];
  }

  let acceptable = ["MSSM", "SSMM", "SMMS", "MMSS"];
  for (let str of acceptable) {
    if (found == str) {
      return 1;
    }
  }

  return 0;
}

main();
