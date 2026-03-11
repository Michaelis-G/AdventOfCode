/**
 * Share your thoughts
 */

const year = '2023';
const day = '12';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const parseSprings = (data) => {
    const springs = [];
    for (const spring of data.split('\n'))  {
        [map, groups] = spring.split(' ');
        springs.push({
            map: map.split(''),
            groups: groups.split(',').map(g => parseInt(g)),
        });
    }
    return springs;
}

const unfoldSprings = (springs) => {
    const unfolded = [];
    for (let k = 0; k < springs.length; k++ ) {
        unfolded[k] = {
            map: springs[k].map,
            groups: springs[k].groups,
        };
        for (let i = 1; i < 5; i++) {
            unfolded[k] = {
                map: unfolded[k].map.concat(['?']).concat(springs[k].map),
                groups: unfolded[k].groups.concat(springs[k].groups),
            }
        }
    }
    return unfolded;
}

const countOccurrences = (arr, char) => {
  return arr.reduce((c, el) => c + (el === char ? 1 : 0), 0);
}

const binArraysWithHash = (n, m) => {
  const out = [];
  function build(idx, onesSoFar, buf) {
    if (idx === m) {
      if (onesSoFar === n) out.push(buf.slice());
      return;
    }
    const remaining = m - idx;
    // prune: if we can’t still reach n ones or would overshoot, bail
    if (onesSoFar + remaining < n) return;
    if (onesSoFar > n) return;

    // try 0
    buf[idx] = '.';
    build(idx + 1, onesSoFar, buf);

    // try 1 (only if we still need ones)
    if (onesSoFar < n) {
      buf[idx] = '#';
      build(idx + 1, onesSoFar + 1, buf);
    }
  }
  build(0, 0, new Array(m));
  return out;
}

const checkPossibility = (possibility, groups) => {
    const possibleGroups = [];
    let current = '.';
    let size = 0;
    for (const element of possibility) {
        if (element === '#' && current === '.') {
            size = 1;
        } else if (element === '#' && current === '#') {
            size += 1;
        } else {
            if (size > 0) {
                possibleGroups.push(size);
            }
            size = 0;
        }
        current = element;
    }
    if (size > 0) {
        possibleGroups.push(size);
    }
    let possible = true;
    for (let i = 0; i < possibleGroups.length; i++) {
        if (possibleGroups[i] !== groups[i]) {
            possible = false;
        }
    }
    return possible;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    for (const spring of parseSprings(data)) {
        const n = countOccurrences(spring.map, '?');
        const p = countOccurrences(spring.map, '#');
        const m = spring.groups.reduce((a, el) => a + el, 0) - p;
        const arr = binArraysWithHash(m, n);
        const possibilities = [];
        for (const a of arr) {
            const possibility = [];
            let idx = 0;
            for (const char of spring.map) {
                if (char === '?') {
                    possibility.push(a[idx]);
                    idx += 1;
                } else {
                    possibility.push(char);
                }
            }
            if (checkPossibility(possibility, spring.groups)) {
                res += 1;
                // console.log('considering', possibility.join(''), '***');
            } else {
                // console.log('discarding', possibility.join(''));
            }
        }
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    let springs = parseSprings(data);
    springs = unfoldSprings(springs);
/**
    for (const spring of springs) {
        const n = countOccurrences(spring.map, '?');
        const p = countOccurrences(spring.map, '#');
        const m = spring.groups.reduce((a, el) => a + el, 0) - p;
        const arr = binArraysWithHash(m, n);
        const possibilities = [];q
        for (const a of arr) {
            const possibility = [];
            let idx = 0;
            for (const char of spring.map) {
                if (char === '?') {
                    possibility.push(a[idx]);
                    idx += 1;
                } else {
                    possibility.push(char);
                }
            }
            if (checkPossibility(possibility, spring.groups)) {
                res += 1;
                // console.log('considering', possibility.join(''), '***');
            } else {
                // console.log('discarding', possibility.join(''));
            }
        }
    }
*/
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