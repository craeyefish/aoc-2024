const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf8").split("\n").filter(Boolean);

function main() {
  q1();
  q2();
}

function fillHardDrive(hd) {
  let counter = 0;

  for (let i = 0; i < lines[0].length; i++) {
    let val = "";
    if (i % 2 == 0) {
      val = counter;
      counter++;
    } else {
      val = ".";
    }
    for (let j = 0; j < lines[0][i]; j++) {
      hd.push(val);
    }
  }
}

function countHardDrive(hd) {
  total = 0;
  for (let i = 0; i < hd.length; i++) {
    if (hd[i] == ".") {
      continue;
    }
    total += i * hd[i];
  }
  return total;
}

function q1() {
  let hd = [];

  fillHardDrive(hd);

  let leftCount = 0;
  for (let i = hd.length - 1; i > 0 / 2; i--) {
    if (hd[i] == ".") {
      continue;
    }

    for (let j = leftCount; j < hd.length; j++) {
      if (j > i) {
        break;
      }

      if (hd[j] == ".") {
        hd[j] = hd[i];
        hd[i] = ".";
        leftCount = j;
        j = hd.length;
      }
    }
  }

  console.log(countHardDrive(hd));
}

function q2() {
  let hd = [];

  fillHardDrive(hd);

  let fileLen = 0;
  let fileNum = hd[hd.length - 1];

  for (let i = hd.length - 1; i > 0 / 2; i--) {
    if (hd[i] == fileNum) {
      fileLen++;
      continue;
    }

    if (fileLen == 0) {
      continue;
    }

    for (let j = 0; j < hd.length - 2; j++) {
      if (j > i) {
        continue;
      }

      let val = hd[j];
      let openLen = 0;
      while (val == "." || j + openLen > hd.length - 1) {
        openLen++;
        val = hd[j + openLen];
      }

      if (openLen >= fileLen) {
        for (let k = 0; k < fileLen; k++) {
          hd[j + k] = hd[i + k + 1];
          hd[i + k + 1] = ".";
        }
        j = hd.length;
      }
    }

    fileLen = 0;
    fileNum--;
    if (hd[i] == fileNum) {
      fileLen++;
    }
  }

  console.log(countHardDrive(hd));
}

main();
