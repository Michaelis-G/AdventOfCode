/**
 * Share your thoughts
 */

/**
 * Update year and day
 */
const year = '2022';
const day = '03';
const fs = require('fs');
const { parse } = require('path');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const parseRucksacks = (data) => {
    return data.split('\n').map(r => r.trim().split('')).map(s => ({
        a: s.slice(0, s.length / 2),
        b: s.slice(s.length / 2),
    }));
}

const parseRucksackByThree = (data) => {
    const rucksacks = [];
    data = data.split('\n').map(r => r.trim());
    for (let i = 0; i < data.length; i += 3) {
        rucksacks.push([data[i], data[i+1], data[i+2]]);
    }
    return rucksacks;
}

const itemVal = (item) => {
    return (item.charCodeAt(0) > 65 + 26)
    ? item.charCodeAt(0) - (97-1)
    : item.charCodeAt(0) - (65-27);    
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    data = parseRucksacks(data);
    for (const sack of data) {
        for (const item of sack.a) {
            if (sack.b.includes(item)) {
                res += itemVal(item);
                break;
            }
        }
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    data = parseRucksackByThree(data);
    for (const group of data) {
        for (const item of group[0]) {
            if (group[1].includes(item) && group[2].includes(item)) {
                res += itemVal(item);
                break;
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
