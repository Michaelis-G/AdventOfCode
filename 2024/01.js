const fs = require( 'fs');
const FILE = './data/01';
const DATA = fs.readFileSync(FILE, 'utf8');
let res = 0;

const parseInput = (data) => {
    const col1 = [];
    const col2 = [];
    for (let line of data.split('\r\n')) {
        line = line.split(' ').filter(x => x !== '').map(x => parseInt(x));
        col1.push(line[0]);
        col2.push(line[1]);
    }
    col1.sort();
    col2.sort();
    return [col1, col2];
}

const part1 = (lists) => {

    let res = 0;
    for (let i in lists[0]) {
        res += Math.abs((lists[0][i] - lists[1][i]));
    }

    return res;
}

const part2 = (lists) => {
    let res = 0;
    for (const i of lists[0]) {
        const x = lists[1].reduce((a, c) => (c === i) ? a += 1 : a, 0);
        res += i * x;
    }
    return res;
}

console.log('Advent Of Code 2024 day 01');
res = part1(parseInput(DATA));
console.log('Part 1:', res);
res = part2(parseInput(DATA));
console.log('Part 2:', res);