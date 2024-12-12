const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf8").split("\n").filter(Boolean);

let grid = [];
let grid2 = [];

class Node {
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
  }
}

function main() {
  let nodeMap = new Map();

  for (let y = 0; y < lines.length; y++) {
    let gridRow = [];
    for (let x = 0; x < lines[0].length; x++) {
      gridRow.push(lines[y][x]);

      if (lines[y][x] != ".") {
        const node = new Node(x, y, lines[y][x]);

        if (!nodeMap.has(node.name)) {
          nodeMap.set(node.name, []);
        }
        nodeMap.get(node.name).push(node);
      }
    }
    grid.push(gridRow);
    grid2.push(gridRow);
  }

  q1(nodeMap);
  q2(nodeMap);
}

function addIfMapped(x, y, g) {
  if (x < 0 || x >= lines[0].length) {
    return;
  }
  if (y < 0 || y >= lines.length) {
    return;
  }

  g[y][x] = "#";
}

function q1(nodeMap) {
  let total = 0;

  nodeMap.forEach((nodes, name) => {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (i == j) {
          continue;
        }

        diffX = nodes[i].x - nodes[j].x;
        diffY = nodes[i].y - nodes[j].y;

        addIfMapped(nodes[i].x + diffX, nodes[i].y + diffY, grid);
        addIfMapped(nodes[j].x - diffX, nodes[j].y - diffY, grid);
      }
    }
  });

  grid.forEach((row) => {
    let r = "";
    row.forEach((element) => {
      r = r + element;
      if (element == "#") {
        total += 1;
      }
    });
    console.log(r);
  });

  console.log(total);
}

function q2(nodeMap) {
  let total = 0;

  nodeMap.forEach((nodes, name) => {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (i == j) {
          continue;
        }

        diffX = nodes[i].x - nodes[j].x;
        diffY = nodes[i].y - nodes[j].y;

        for (let k = 1; k < 50; k++) {
          addIfMapped(nodes[i].x + diffX * k, nodes[i].y + diffY * k, grid2);
          addIfMapped(nodes[j].x - diffX * k, nodes[j].y - diffY * k, grid2);
        }
      }
    }
  });

  grid2.forEach((row) => {
    let r = "";
    row.forEach((element) => {
      r = r + element;
      if (element != ".") {
        total += 1;
      }
    });
    console.log(r);
  });

  console.log(total);
}

main();
