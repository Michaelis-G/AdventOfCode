const fs = require( 'fs');
const FILE = './data/02';
const DATA = fs.readFileSync(FILE, 'utf8');
let res = 0;

const parseInput = (data) => {
    const matrix = [];
    for (let line of data.split('\r\n')) {
        line = line.split(' ').filter(x => x !== '').map(x => parseInt(x));
        matrix.push(line);
    }
    return matrix;
}

const isSafe = (nums) => {
    let croissante = true;
    if (nums[1] - nums[0] === 0) {
        return false;
    } else if (nums[1] - nums[0] < 0) {
        croissante = false;
    }
    for (let i = 0; i < nums.length - 1; i++) {
        if (
            (Math.abs(nums[i] - nums[i+1]) === 0) ||
            (Math.abs(nums[i] - nums[i+1]) > 3) ||
            ((nums[i+1] - nums[i] > 0) !== croissante)
        ) {
            return false;
        }
    }
    return true;
}

const part1 = (data) => {
    let res = 0;
    for (let nums of data) {
        if (isSafe(nums)) {
            res += 1;
        }
    }
    return res;
}

const alternativeData = (nums) => {
    const alternatives = [];
    for (const i in nums) {
        alternatives.push(nums.filter((_, j) => i != j));
    }
    return alternatives;
}

const part2 = (data) => {
    let res = 0;    
    for (let nums of data) {
        if (isSafe(nums)) {
            res += 1;
            continue;
        }
        for (const moreNums of alternativeData(nums)) {
            if (isSafe(moreNums)) {
                res += 1;
                break;
            }
        }
    }
    return res;
}

console.log('Advent Of Code 2024 day 022');
res = part1(parseInput(DATA));
console.log('Part 1:', res);
res = part2(parseInput(DATA));
console.log('Part 2:', res);