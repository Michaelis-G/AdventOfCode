/**
 * Share your thoughts
 */

const year = '2022';
const day = '09';
const fs = require('fs');

const parseInput = () => {
  let filename = `./data/${day}`;
  if (process.argv.length > 2) {
    filename += '.test';
  }
  let data = fs.readFileSync(filename, 'utf8');
  return data;
}

const MOVES = {
  'R': {y: 0, x: 1},
  'L': {y: 0, x: -1},
  'U': {y: -1, x: 0},
  'D': {y: 1, x: 0},
}

const NEIGHTBORS = [
  {x: 1, y: 0}, {x: 1, y:1}, {x: 1, y: -1},
  {x: -1, y: 0}, {x: -1, y:1}, {x: -1, y: -1},
  {x: 0, y: 0}, {x: 0, y:1}, {x: 0, y: -1},
]

const is_neighbor = (a, b) => {
  for (const n of NEIGHTBORS) {
    const c = {x: a.x + n.x, y: a.y + n.y}
    if (c.x === b.x && c.y === b.y) {
      return true;
    }
  }
  return false;
}

const part1 = (data) => {
  console.time('Time');
  let res = 0;

  data = data.split('\n').map(m => ({
    dir: m.split(' ')[0],
    dis: parseInt(m.split(' ')[1]),
  })).filter(m => m.dir !== '');

  const head = {x: 0, y: 0};
  const tail = {x: 0, y: 0};
  const path = [{x: 0, y: 0}];
  for (const move of data) {
    for (let i = 0; i < move.dis; i++) {
      const shadow = {x: head.x, y: head.y};
      head.x += MOVES[move.dir].x;
      head.y += MOVES[move.dir].y;
      if (is_neighbor(head, tail)) {
        continue;
      }
      tail.x = shadow.x;
      tail.y = shadow.y;
      if (path.filter(p => p.x === tail.x && p.y === tail.y).length === 0) {
        path.push({x: tail.x, y: tail.y});
      }
    }
  }
  res = path.length;

  console.log('Part 1:', res);
  console.timeEnd('Time');
}

const part2 = (data) => {
  console.time('Time');
  let res = 0;

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
