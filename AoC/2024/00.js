const DAY = 'XX';
const fs = require( 'fs');
let filename = `./data/${DAY}`;

const parseInput = () => {
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    console.log('Part 2:', res);
    console.timeEnd('Time');
}

if (process.argv.length > 2) {
    filename += '.test';
}
console.log('Advent Of Code 2024 day',  DAY);
console.log('==========================');
part1(parseInput());
console.log('--------------------------');
part2(parseInput());