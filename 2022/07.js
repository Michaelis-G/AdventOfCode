/**
 * Share your thoughts
 */

const year = '2022';
const day = '07';
const fs = require('fs');

const parseInput = () => {
  let filename = `./data/${day}`;
  if (process.argv.length > 2) {
    filename += '.test';
  }
  let data = fs.readFileSync(filename, 'utf8');
  return data;
}

const parseLines = (data) => {
  const lines = [];
  for (const line of data.split('\n')) {
    lines.push(line);
  }
  return lines;
}

const walkDirectories = (data) => {
  let summary = {};
  let currentDirectory = [];
  for (const line of data) {
    if (line.startsWith('$ cd')) {
      if (line === '$ cd ..') {
        currentDirectory.pop();
      } else {
        currentDirectory.push(currentDirectory.join('') + line.split(' ')[2]);
      }
    } else
    if (/^\d/.test(line)) {
      const size = parseInt(line.split(' ')[0]);
      for (const dir of currentDirectory) {
        if (dir in summary) {
          summary[dir] += size;
        } else {
          summary[dir] = size;
        }
      }
    }
  }
  return summary;
}

const part1 = (data) => {
  console.time('Time');
  let res = 0;

  const summary = walkDirectories(parseLines(data));
  for (const [key, size] of Object.entries(summary)) {
    if (size <= 100000) {
      res += size;
    }
  }

  console.log('Part 1:', res);
  console.timeEnd('Time');
}

const part2 = (data) => {
  console.time('Time');
  let res = 0;

  const max = 70000000;
  const target = 30000000;
  const summary = walkDirectories(parseLines(data));
  const goal = target - max + summary['/'];
  for (const [key, size] of Object.entries(summary)) {
    if (size > goal) {
      if (res === 0 || res > size) {
        res = size;
      }
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
