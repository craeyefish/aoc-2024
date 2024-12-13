const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf8").split("\n").filter(Boolean);

let q1Total = 0;
let q2Total = 0;
let found = new Map();

function main() {
  q1();
  q2();
}

class Pos {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

function walk(pos, first) {
  if (pos.z == 9) {
    found.set(first + " " + pos.x + " " + pos.y, true);
    q2Total++;
    return;
  }

  // left
  if (pos.x > 0 && lines[pos.y][pos.x - 1] == pos.z + 1) {
    walk(new Pos(pos.x - 1, pos.y, pos.z + 1), first);
  }
  // right
  if (pos.x < lines[0].length - 1 && lines[pos.y][pos.x + 1] == pos.z + 1) {
    walk(new Pos(pos.x + 1, pos.y, pos.z + 1), first);
  }
  // up
  if (pos.y > 0 && lines[pos.y - 1][pos.x] == pos.z + 1) {
    walk(new Pos(pos.x, pos.y - 1, pos.z + 1), first);
  }
  // down
  if (pos.y < lines.length - 1 && lines[pos.y + 1][pos.x] == pos.z + 1) {
    walk(new Pos(pos.x, pos.y + 1, pos.z + 1), first);
  }
}

function q1() {
  let count = 0;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] == "0") {
        walk(new Pos(x, y, 0), x.toString() + " " + y.toString() + " ");
      }
    }
  }

  found.forEach((k, v) => {
    q1Total++;
  });

  console.log(q1Total);
}

function q2() {
  console.log(q2Total);
}

main();
