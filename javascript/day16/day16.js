const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf8").split("\n").filter(Boolean);

let start = 0;
let end = 0;
let grid = [];
let grid2 = [];
let gridF = [];
let lowestScore = 0;

class Point {
  constructor(x, y, dir, score) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.score = score;
  }
}

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

function main() {
  for (let y = 0; y < lines.length; y++) {
    let gridLine = [];
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
    }
    grid.push(gridLine);

    if (lines[y].includes("S")) {
      start = [lines[y].indexOf("S"), y];
    }
    if (lines[y].includes("E")) {
      end = [lines[y].indexOf("E"), y];
    }
  }

  gridF = Array(lines.length)
    .fill()
    .map(() => Array(lines[0].length).fill(0));
  for (var i = 0; i < grid.length; i++) grid2[i] = grid[i].slice();

  console.log(start);
  console.log(end);

  q1();
  q2();
}

function flood(points) {
  let smallestPoint = 0;
  let index = 0;

  // for (let i = 0; i < points.length; i++) {
  //   if (smallestPoint == 0 || points[i].score < smallestPoint) {
  //     smallestPoint = points[i].score;
  //     index = i;
  //   }
  // }

  points.sort((a, b) => a.score - b.score);
  index = Math.floor(Math.random() * points.length);
  if (points.length > 20) {
    index = Math.floor(Math.random() * 20);
  }

  let point = points[index];
  points.splice(index, 1);
  let newPoints = [];

  // check up
  if (grid[point.y - 1][point.x] == 0 || grid[point.y - 1][point.x] == -3) {
    if (point.dir == "N") {
      newPoints.push(
        new Point(point.x, point.y - 1, point.dir, point.score + 1)
      );
    }
    if (point.dir == "W" || point.dir == "E") {
      newPoints.push(new Point(point.x, point.y, "N", point.score + 1000));
    }
  }
  // check right
  if (grid[point.y][point.x + 1] == 0 || grid[point.y][point.x + 1] == -3) {
    if (point.dir == "E") {
      newPoints.push(
        new Point(point.x + 1, point.y, point.dir, point.score + 1)
      );
    }
    if (point.dir == "N" || point.dir == "S") {
      newPoints.push(new Point(point.x, point.y, "E", point.score + 1000));
    }
  }
  // check down
  if (grid[point.y + 1][point.x] == 0 || grid[point.y + 1][point.x] == -3) {
    if (point.dir == "S") {
      newPoints.push(
        new Point(point.x, point.y + 1, point.dir, point.score + 1)
      );
    }
    if (point.dir == "W" || point.dir == "E") {
      newPoints.push(new Point(point.x, point.y, "S", point.score + 1000));
    }
  }
  // check left
  if (grid[point.y][point.x - 1] == 0 || grid[point.y][point.x - 1] == -3) {
    if (point.dir == "W") {
      newPoints.push(
        new Point(point.x - 1, point.y, point.dir, point.score + 1)
      );
    }
    if (point.dir == "N" || point.dir == "S") {
      newPoints.push(new Point(point.x, point.y, "W", point.score + 1000));
    }
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
      if (lowestScore == 0 || point.score < lowestScore) {
        lowestScore = point.score;
        console.log(point.score);
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
  let q1Total = 0;
  let points = [new Point(start[0], start[1], "E", 0)];

  while (points.length > 0) {
    flood(points);
  }

  console.log(q1Total); // 91372 too high, 79412 too high, 79404 CORRECT!!! (with a bit of luck)
}

function q2() {
  let q2Total = 0;
  let count = 0;

  while (count++ < 10000) {
    let points = [new Point(start[0], start[1], "E", 0)];

    while (points.length > 0) {
      flood(points);
    }

    for (var i = 0; i < grid.length; i++) grid[i] = grid2[i].slice();
  }

  console.log(q2Total);
}

main();
