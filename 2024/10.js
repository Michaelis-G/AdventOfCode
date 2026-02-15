const DAY = '10';
const fs = require( 'fs');
let filename = `./data/${DAY}`;

const parseInput = () => {
    let data = fs.readFileSync(filename, 'utf8');
    return data.split('\n').map(row => row.split('').map(x => parseInt(x)));
}

const getTrailHeads = (data) => {
    const trailHeads = [];
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            if (data[y][x] === 0) {
                trailHeads.push({y, x});
            }
        }
    }
    return trailHeads;
}

const getTrails = (data, pos, all = false, height = 0, trail = [], summits = []) => {
    if (height === 9) {
        if (all) {
            summits.push(pos);
        } else {
            if (summits.findIndex(s => s.y === pos.y && s.x === pos.x) === -1) {
                summits.push(pos);
            }
        } 
    } else {
        trail.push(pos);
        // checkNorth
        if (pos.y > 0 && data[pos.y - 1][pos.x] === height + 1) {
            getTrails(data, {y: pos.y-1, x: pos.x}, all, height + 1, Array.from(trail), summits);
        } 
        // checkSouth
        if (pos.y < data.length - 1 && data[pos.y + 1][pos.x] === height + 1) {
            getTrails(data, {y: pos.y+1, x: pos.x}, all, height + 1, Array.from(trail), summits);
        }
        // checkWest
        if (pos.x > 0 && data[pos.y][pos.x - 1] === height + 1) {
            getTrails(data, {y: pos.y, x: pos.x-1}, all, height + 1, Array.from(trail), summits);
        }
        // checkSouth
        if (pos.x < data.length - 1 && data[pos.y][pos.x + 1] === height + 1) {
            getTrails(data, {y: pos.y, x: pos.x+1}, all, height + 1, Array.from(trail), summits);
        }
    }
    return summits;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    const trailHeads = getTrailHeads(data);
    for (const trailHead of trailHeads) {
        res += getTrails(data, trailHead).length;
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    const trailHeads = getTrailHeads(data);
    for (const trailHead of trailHeads) {
        // console.log(getAllTrails(data, trailHead));
        res += getTrails(data, trailHead, true).length;
    }
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