/**
 * Share your thoughts
 */

const year = '2022';
const day = '04';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const parsePairs = (data) => {
  return data.split('\n')
    .map(r => r.trim().split(',')
      .map(p => p.trim().split('-')
        .map(x => parseInt(x)
        )
      )
    ).filter(r => r.length === 2);
}

const checkOverlap = (p1, p2) => {
  if ((p1[0] <= p2[0] && p1[1] >= p2[1])
    || (p2[0] <= p1[0] && p2[1] >= p1[1])) {
    return true;
  }
  return false;
}

const checkPartialOverlap = (p1, p2) => {
  for (let i = p1[0]; i <= p1[1]; i++) {
    if (i >= p2[0] && i <= p2[1]) {
      return true;
    }
  }
  for (let i = p2[0]; i <= p2[1]; i++) {
    if (i >= p1[0] && i <= p1[1]) {
      return true;
    }
  }
  return false;
}

const part1 = (data) => {
  console.time('Time');
  let res = 0;

  const pairs = parsePairs(data);
  for (const pair of pairs) {
    if (checkOverlap(pair[0], pair[1])) {
      res += 1;
    }
  }

  console.log('Part 1:', res);
  console.timeEnd('Time');
}

const part2 = (data) => {
  console.time('Time');
  let res = 0;

  const pairs = parsePairs(data);
  console.log(pairs);
  for (const pair of pairs) {
    if (checkPartialOverlap(pair[0], pair[1])) {
      console.log('overlap', pair);
      res += 1;
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
