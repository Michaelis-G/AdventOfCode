/**
 * Share your thoughts
 */

const year = '2022';
const day = '06';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const checkStart = (slice) => {
  let start = true;
  for (let j = 0; j < slice.length - 1; j++) {
    for (let k = j + 1; k < slice.length; k++) {
      if (slice[j] === slice[k]) {
        start = false;
        break;
      }
    }
  }
  return start;
}

const part1 = (data) => {
  console.time('Time');
  let res = 0;

  for (let i = 0; i < data.length - 4; i++) {
    const slice = data.slice(i, i + 4);
    if (checkStart(slice) === true) {
      res = i + 4;
      break;
    }
  }

  console.log('Part 1:', res);
  console.timeEnd('Time');
}

const part2 = (data) => {
  console.time('Time');
  let res = 0;

  for (let i = 0; i < data.length - 14; i++) {
    const slice = data.slice(i, i + 14);
    if (checkStart(slice) === true) {
      res = i + 14;
      break;
    }
  }

  console.log('Part 2:', res);
  console.timeEnd('Time');
}

/**
 * Main
 */
console.log( `Advent Of Code ${year}-${day}`);
console.log('==========================');
part1(parseInput());
console.log('--------------------------');
part2(parseInput());
