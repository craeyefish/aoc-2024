const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf8").split("\n").filter(Boolean);

class Point {
  constructor(x, y, dir, score, hist = []) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.score = score;
    this.hist = Array.isArray(hist) ? [...hist] : [];
  }
}

let start = 0;
let end = 0;
let grid = [];
let grid2 = [];
let lowest = new Point(0, 0, "E", 0, []);
let complete = [];
let q2Total = 1;

function printGrid() {
  grid.forEach((row) => {
    let r = "";
    row.forEach((element) => {
      switch (element) {
        case -1:
          r = r + "#";
          break;
        case 0:
          r = r + ".";
          break;
        case -2:
          r = r + "S";
          break;
        case -3:
          r = r + "E";
          break;
        default:
          // r = r + " " + String(element).padStart(6, "0");
          r = r + String(element % 10);
      }
    });
    console.log(r);
  });
}

function printGrid2() {
  grid2.forEach((row) => {
    r = "";
    row.forEach((element) => {
      r += element;
      if (element == "0") {
        q2Total++;
      }
    });
    console.log(r);
  });
}

function main() {
  for (let y = 0; y < lines.length; y++) {
    let gridLine = [];
    let gridLine2 = [];
    for (let x = 0; x < lines[0].length; x++) {
      switch (lines[y][x]) {
        case "#":
          gridLine.push(-1);
          break;
        case ".":
          gridLine.push(0);
          break;
        case "S":
          gridLine.push(-2);
          break;
        case "E":
          gridLine.push(-3);
          break;
      }
      gridLine2.push(lines[y][x]);
    }
    grid.push(gridLine);
    grid2.push(gridLine2);

    if (lines[y].includes("S")) {
      start = [lines[y].indexOf("S"), y];
    }
    if (lines[y].includes("E")) {
      end = [lines[y].indexOf("E"), y];
    }
  }

  q1();
  q2();
}

function flood(points) {
  let smallestPoint = 0;
  let index = 0;

  // Move smallest
  for (let i = 0; i < points.length; i++) {
    if (smallestPoint == 0 || points[i].score < smallestPoint) {
      smallestPoint = points[i].score;
      index = i;
    }
  }

  let point = points[index];
  points.splice(index, 1);
  let newPoints = [];
  point.hist.push([point.x, point.y]);

  // check up
  if (grid[point.y - 1][point.x] == 0 || grid[point.y - 1][point.x] == -3) {
    if (point.dir == "N") {
      newPoints.push(
        new Point(point.x, point.y - 1, point.dir, point.score + 1, point.hist)
      );
    }
    if (point.dir == "W" || point.dir == "E") {
      newPoints.push(
        new Point(point.x, point.y, "N", point.score + 1000, point.hist)
      );
    }
  }
  if (point.dir == "N" && grid[point.y - 1][point.x] > 0) {
    let jc = 1;
    // Try to jump.
    while (grid[point.y - 1 - jc][point.x] > 0) {
      jc++;
    }
    newPoints.push(
      new Point(point.x, point.y - jc, point.dir, point.score + jc, point.hist)
    );
  }
  // check right
  if (grid[point.y][point.x + 1] == 0 || grid[point.y][point.x + 1] == -3) {
    if (point.dir == "E") {
      newPoints.push(
        new Point(point.x + 1, point.y, point.dir, point.score + 1, point.hist)
      );
    }
    if (point.dir == "N" || point.dir == "S") {
      newPoints.push(
        new Point(point.x, point.y, "E", point.score + 1000, point.hist)
      );
    }
  }
  if (point.dir == "E" && grid[point.y][point.x + 1] > 0) {
    let jc = 1;
    // Try to jump.
    while (grid[point.y][point.x + 1 + jc] > 0) {
      jc++;
    }
    newPoints.push(
      new Point(point.x + jc, point.y, point.dir, point.score + jc, point.hist)
    );
  }
  // check down
  if (grid[point.y + 1][point.x] == 0 || grid[point.y + 1][point.x] == -3) {
    if (point.dir == "S") {
      newPoints.push(
        new Point(point.x, point.y + 1, point.dir, point.score + 1, point.hist)
      );
    }
    if (point.dir == "W" || point.dir == "E") {
      newPoints.push(
        new Point(point.x, point.y, "S", point.score + 1000, point.hist)
      );
    }
  }
  if (point.dir == "S" && grid[point.y + 1][point.x] > 0) {
    let jc = 1;
    // Try to jump.
    while (grid[point.y + 1 + jc][point.x] > 0) {
      jc++;
    }
    newPoints.push(
      new Point(point.x, point.y + jc, point.dir, point.score + jc, point.hist)
    );
  }
  // check left
  if (grid[point.y][point.x - 1] == 0 || grid[point.y][point.x - 1] == -3) {
    if (point.dir == "W") {
      newPoints.push(
        new Point(point.x - 1, point.y, point.dir, point.score + 1, point.hist)
      );
    }
    if (point.dir == "N" || point.dir == "S") {
      newPoints.push(
        new Point(point.x, point.y, "W", point.score + 1000, point.hist)
      );
    }
  }
  if (point.dir == "W" && grid[point.y][point.x - 1] > 0) {
    let jc = 1;
    // Try to jump.
    while (grid[point.y][point.x - 1 - jc] > 0) {
      jc++;
    }
    newPoints.push(
      new Point(point.x - jc, point.y, point.dir, point.score + jc, point.hist)
    );
    point.x -= jc;
    point.score += jc;
  }

  let uniquePoints = [];

  newPoints.forEach((point) => {
    isUnique = true;
    uniquePoints.forEach((uniquePoint) => {
      if (
        point.x == uniquePoint.x &&
        point.y == uniquePoint.y &&
        point.dir == uniquePoint.dir
      ) {
        isUnique = false;
      }
    });

    if (grid[point.y][point.x] == -3) {
      complete.push(point);
      if (lowest.score == 0 || point.score < lowest.score) {
        lowest = point;
      }

      return;
    }

    if (isUnique == true) {
      uniquePoints.push(point);
    }
  });

  uniquePoints.forEach((uniquePoint) => {
    if (
      grid[uniquePoint.y][uniquePoint.x] == 0 ||
      grid[uniquePoint.y][uniquePoint.x] > uniquePoint.score
    ) {
      grid[uniquePoint.y][uniquePoint.x] = uniquePoint.score;
    }
    points.push(uniquePoint);
  });
}

function q1() {
  let points = [new Point(start[0], start[1], "E", 0)];

  while (points.length > 0) {
    flood(points);
  }

  console.log(lowest.score);
}

function q2() {
  complete.forEach((point) => {
    if (point.score == lowest.score) {
      point.hist.forEach((p) => {
        grid2[p[1]][p[0]] = "0";
      });
    }
  });

  printGrid2();
  console.log(q2Total);
}

main();
