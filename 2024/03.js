const fs = require( 'fs');
const FILE = './data/03';
const DATA = fs.readFileSync(FILE, 'utf8');
let res = 0;

const parseInput = (data) => {
    return data;
}

const part1 = (data) => {
    let res = 0;
    for (const mul of data.match(/mul\(\d+,\d+\)/g)) {
        res += mul
            .replace('mul(', '')
            .replace(')', '')
            .split(',')
            .map(x => parseInt(x))
            .reduce((a,c) => a * c, 1);
    }
    return res;
}

const part2 = (data) => {
    let res = 0;
    let go = true;
    while(true) {
        let index = 0;
        if (go) {
            const next = data.indexOf('don\'t()');
            let part = data;
            if (next !== -1) {
                part = data.substring(index, next);
            }
            if (part.length === 0) {
                break;
            }
            for (const mul of part.match(/mul\(\d+,\d+\)/g)) {
                res += mul
                    .replace('mul(', '')
                    .replace(')', '')
                    .split(',')
                    .map(x => parseInt(x))
                    .reduce((a,c) => a * c, 1);
            }
            index = next;
            go = false;
        } else {
            index = data.indexOf('do()');
            go = true;
        }
        if (index === -1) {
            break;
        }
        data = data.slice(index);
    }
    return res;
}

console.log('Advent Of Code 2024 day 03');
res = part1(parseInput(DATA));
console.log('Part 1:', res);
res = part2(parseInput(DATA));
console.log('Part 2:', res);