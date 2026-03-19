/**
 * Share your thoughts
 */

const year = '2022';
const day = '01';
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

  let currentElf = 0;
  for (const line of data.split('\n')) {
    if (line.length === 0) {
      if (res < currentElf) {
        res = currentElf;
      }
      currentElf = 0;
      continue;
    }
    currentElf += parseInt(line);
  }

  console.log('Part 1:', res);
  console.timeEnd('Time');
}

const part2 = (data) => {
  console.time('Time');
  let res = 0;

  let currentElf = 0;
  const calories = [];
  data = data.split('\n');
  for (let i = 0; i < data.length; i++) {
    if (data[i].length === 0) {
      calories.push(currentElf);
      currentElf = 0;
      continue;
    }
    currentElf += parseInt(data[i]);
  }
  if (currentElf > 0) {
    calories.push(currentElf);
  }
  calories.sort((a, b) => b - a);
  res = calories[0] + calories[1] + calories[2];

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
