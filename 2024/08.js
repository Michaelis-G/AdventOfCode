const fs = require( 'fs');
const FILE = './data/08.test';
const DATA = fs.readFileSync(FILE, 'utf8');

const parseInput = (data) => {
    return data;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    a = 10;
    b = 13;
    console.log(parseInt(`${a}${b}`));

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    console.log('Part 2:', res);
    console.timeEnd('Time');
}

console.log('Advent Of Code 2024 day 08');
console.log('==========================');
part1(parseInput(DATA));
console.log('--------------------------');
part2(parseInput(DATA));