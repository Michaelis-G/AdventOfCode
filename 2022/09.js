/**
 * very funny puzzle, one that can be done using classes.
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

const parseMoves = (data) => {
  return data.split('\n').map(m => ({
    d: m.split(' ')[0],
    l: parseInt(m.split(' ')[1]),
  })).filter(m => m.dir !== '');
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

class Pos {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  move(direction) {
    if (direction in MOVES) {
      this.x += MOVES[direction].x;
      this.y += MOVES[direction].y;
    }
  }

  adjacent(pos) {
    for (const n of NEIGHTBORS) {
      const p = {
        x: this.x + n.x,
        y: this.y + n.y,        
      }
      if (p.x === pos.x && p.y === pos.y ) {
        return true;
      }
    }
    return false;
  }

  clone() {
    return {
      x: this.x,
      y: this.y,
    }
  }

  set_from(pos) {
    this.x = pos.x;
    this.y = pos.y;
  }

  overlap(pos) {
    return (this.x === pos.x && this.y === pos.y);
  }
}

class Rope {
  constructor(length) {
    this.knots = [];
    for (let i = 0; i < length; i++) {
      this.knots.push(new Pos());
    }
  }

  move(direction) {
    /** knots[0] is the head */
    for (let i = 1; i < this.knots.length; i++) {
      const clone = this.knots[i - 1].clone();
      this.knots[i - 1].move(direction);
      const next = this.knots[i];
      if (this.knots[i - 1].adjacent(next)) {
        continue;
      }
      next.set_from(clone);
    }
  }


}

const part1 = (data) => {
  console.time('Time');
  let res = 0;

  const moves = parseMoves(data);
  const [head, tail, path] = [new Pos(), new Pos(), [new Pos()]];
  for (const move of moves) {
    for (let i = 0; i < move.l; i++) {
      const clone = head.clone();
      head.move(move.d);
      if (head.adjacent(tail)) {
        continue;
      }
      tail.set_from(clone);
      if (path.filter(p => p.x === tail.x && p.y === tail.y).length === 0) {
        path.push(tail.clone());
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

  const moves = parseMoves(data);
  const [rope, path] = [new Rope(3), [new Pos()]];

  for (const move of moves) {
    for (let i = 0; i < move.l; i++) {
      rope.move(move.d);
      console.log(rope.knots.map(k => `(${k.x},${k.y})`).join(' '));
    }
  }
  res = path.length;

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
