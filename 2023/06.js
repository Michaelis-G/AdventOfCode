/**
 * Share your thoughts
 */

const year = '2023';
const day = '06';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const getTimesAndDistances = (data) => {
    return [
        data
            .split('\n')[0]
            .split(':')[1]
            .split(/\s+/)
            .filter(x => x.length !== 0)
            .map(x => parseInt(x)),
        data
            .split('\n')[1]
            .split(':')[1]
            .split(/\s+/)
            .filter(x => x.length !== 0)
            .map(x => parseInt(x)),
    ]
}

const calcDistance = (time, distance) => {
    let res1 = 0;
    let res2 = 0;
    let min = undefined;
    let max = undefined;
    for (let t = 1; t < time - t; t++) {
        if (!min) {
            res1 = (time - t) * t;
        }
        if (res1 > distance) {
            min = t;
            res1 = 0;
        }
        if (!max) {
            res2 = (time - (time - t)) * (time - t);
        }
        if (res2 > distance) {
            max = time - t;
            res2 = 0;
        }
    }
    return [min, max]
}

const part1 = (data) => {
    console.time('Time');
    let res = 1;

    const [times, distances] = getTimesAndDistances(data);
    for (let i = 0; i < times.length; i++) {
        [min, max] = calcDistance(times[i], distances[i]);
        res *= (max - min + 1);
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 1;

    let time = '';
    let distance = '';
    const [times, distances] = getTimesAndDistances(data);
    for (const t of times) {
        time += t.toString()
    }
    for (const d of distances) {
        distance += d.toString()
    }

    [min, max] = calcDistance(parseInt(time), parseInt(distance));
    res *= (max - min + 1);

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