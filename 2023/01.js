/**
 * Share your thoughts
 */

/**
 * Update year and day
 */
const year = '2023';
const day = '01';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const readCalibration = (calibration, nums) => {
    if (calibration.length === 0) return 0;

    const a = [];
    const b = [];
    for (const num of nums) {
        let i = calibration.indexOf(num.n);
        if (i !== -1) {
            a.push({i, v: num.v});
        }
        i = calibration.lastIndexOf(num.n);
        if (i !== -1) {
            b.push({i, v: num.v});
        }
    }
    a.sort((a, b) => a.i - b.i);
    b.sort((a, b) => b.i - a.i);

    return parseInt(a[0].v + b[0].v);
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    const nums = [
        {n: '1', v: '1'},
        {n: '2', v: '2'},
        {n: '3', v: '3'},
        {n: '4', v: '4'},
        {n: '5', v: '5'},
        {n: '6', v: '6'},
        {n: '7', v: '7'},
        {n: '8', v: '8'},
        {n: '9', v: '9'},
    ];
    for (const calibration of data.split('\n')) {
        res += readCalibration(calibration, nums);
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    const nums = [
        {n: '1', v: '1'},
        {n: '2', v: '2'},
        {n: '3', v: '3'},
        {n: '4', v: '4'},
        {n: '5', v: '5'},
        {n: '6', v: '6'},
        {n: '7', v: '7'},
        {n: '8', v: '8'},
        {n: '9', v: '9'},
        {n: 'one', v: '1'},
        {n: 'two', v: '2'},
        {n: 'three', v: '3'},
        {n: 'four', v: '4'},
        {n: 'five', v: '5'},
        {n: 'six', v: '6'},
        {n: 'seven', v: '7'},
        {n: 'eight', v: '8'},
        {n: 'nine', v: '9'},
    ];
    for (const calibration of data.split('\n')) {
        res += readCalibration(calibration, nums);
    }

    console.log('Part 2:', res);
    console.timeEnd('Time');
}

/**
 * Main
 */
console.log(`Advent Of Code ${year}-${day}`);
console.log('==========================');
part1(parseInput());
console.log('--------------------------');
part2(parseInput());
