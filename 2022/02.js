/**
 * Share your thoughts
 */

const year = '2022';
const day = '02';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
  console.time('Time');
  let res = 0;

  const pairs = {
    'A X': 3, 'A Y': 6, 'A Z': 0,
    'B X': 0, 'B Y': 3, 'B Z': 6,
    'C X': 6, 'C Y': 0, 'C Z': 3,
  }
  const val = {
    'X': 1, 'Y':2, 'Z': 3,
  }

  data = data.split('\n');
  console.log(data);
  for (const m of data) {
    if (m.length !== 3) {
      continue;
    }
    console.log(pairs[m]);
    res = res + pairs[m] + val[m[2]];
  }
  // 10310: à reporter dans le developpement en RUST !
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
