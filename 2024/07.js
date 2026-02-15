const fs = require( 'fs');
const FILE = './data/07';
const DATA = fs.readFileSync(FILE, 'utf8');

const parseInput = (data) => {
    return data.split('\r\n').map(x => {
        return {
            goal: parseInt(x.split(': ')[0]),
            pool: x.split(': ')[1].split(' ').map(x => parseInt(x)),
        };
    });
}

const calc = (goal, value, pool, path = []) => {
    if (value === goal) {
        // console.log(goal, path.join(' '));
        return true;
    }
    if (value > goal) {
        return false;
    }
    if (pool.length === 0) {
        return false;
    }
    const newPool = Array.from(pool)
    let num = newPool.shift()
    return calc(goal, value + num, newPool, [...path, '+', num])
        || calc(goal, value * num, newPool, [...path, '*', num]);
}

const calc2 = (goal, value, pool, path = []) => {
    if (value === goal) {
        // console.log(goal, path.join(' '));
        return true;
    }
    if (value > goal) {
        return false;
    }
    if (pool.length === 0) {
        return false;
    }
    const newPool = Array.from(pool);
    let num = newPool.shift();
    return calc2(goal, value + num, newPool, [...path, '+', num]) 
        || calc2(goal, value * num, newPool, [...path, '*', num])
        || calc2(goal, parseInt(`${value}${num}`), newPool, [...path, '||', num])
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    for (const test of data) {
        let value = test.pool.shift();
        if (calc(test.goal, value, test.pool, [value]) === true) {
            res += test.goal;
        }
    }
    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    for (const test of data) {
        let value = test.pool.shift();
        if (calc2(test.goal, value, test.pool, [value]) === true) {
            res += test.goal;
        }
    }
    console.log('Part 2:', res);
    console.timeEnd('Time');
}

console.log('Advent Of Code 2024 day 07');
console.log('==========================');
part1(parseInput(DATA));
console.log('--------------------------');
part2(parseInput(DATA));