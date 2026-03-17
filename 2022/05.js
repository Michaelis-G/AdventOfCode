/**
 * Share your thoughts
 */

const year = '2022';
const day = '05';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const parseCrates = (data) => {
  const crates = {};
  for (const row of data.split('\n')) {
    if (row[1] === '1') {
      break;
    }
    for (let i = 1; i < row.length; i += 4) {
      const col = ((i - 1) / 4) + 1;
      if (row[i] !== ' ') {
        if (col in crates) {
          crates[col].push(row[i]);
        } else {
          crates[col] = [row[i]];
        }
      }
    }
  }
  return crates;
}

const parseMoves = (data) => {
  const moves = [];
  for (const move of data.split('\n')) {
    if (move.startsWith('move')) {
      moves.push(move);
    }
  }
  return moves;
}

const moveCrate9000 = (crates, move) => {
  move = move.split(' ');
  [nb, from, to] = [parseInt(move[1]), move[3], move[5]];

  if (nb > crates[from].length) {
    console.error('not enough crates to move');
    return false;
  }

  for (let c = 0; c < nb; c++) {
    const crate = crates[from].shift();
    crates[to].unshift(crate);
  }
  return crates;
}

const moveCrate9001 = (crates, move) => {
  move = move.split(' ');
  [nb, from, to] = [parseInt(move[1]), move[3], move[5]];

  if (nb > crates[from].length) {
    console.error('not enough crates to move');
    return false;
  }

  const crates_to_move = crates[from].slice(0, nb);
  for (let c = 0; c < nb; c++) {
    const crate = crates[from].shift();
  }
  crates[to] = [...crates_to_move, ...crates[to]];
  return crates;
}

const part1 = (data) => {
  console.time('Time');
  let res = '';

  let crates = parseCrates(data);
  const moves = parseMoves(data);
  for (const move of moves) {
    crates = moveCrate9000(crates, move);
    if (crates === false) {
      break;
    }
  }
  for (const pile of Object.values(crates)) {
    res += pile.shift();
  }

  console.log('Part 1:', res);
  console.timeEnd('Time');
}

const part2 = (data) => {
  console.time('Time');
  let res = '';

  let crates = parseCrates(data);
  const moves = parseMoves(data);
  for (const move of moves) {
    crates = moveCrate9001(crates, move);
    if (crates === false) {
      break;
    }
  }
  for (const pile of Object.values(crates)) {
    res += pile.shift();
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
