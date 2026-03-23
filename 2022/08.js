/**
 * Share your thoughts
 */

/**
 * Update year and day
 */
const year = '2022';
const day = '08';
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

const mapForest = (data) => {
    return data.split('\n').map(r => r.trim().split('').map(t => parseInt(t)));
}

const checking = (map, Y, X) => {
    let visible = {
        left: true,
        right: true,
        top: true,
        bottom: true,
    } 
    //check left:
    for (let x = 0; x < X; x++) {
        if (map[Y][x] >= map[Y][X]) {
            visible.left = false;
            break;
        }
    }
    //check right:
    for (let x = X + 1; x < map[0].length; x++) {
        if (map[Y][x] >= map[Y][X]) {
            visible.right = false;
            break;
        }
    }
    //check top:
    for (let y = 0; y < Y; y++) {
        if (map[y][X] >= map[Y][X]) {
            visible.top = false;
            break;
        }
    }
    //check bottom:
    for (let y = Y + 1; y < map[0].length; y++) {
        if (map[y][X] >= map[Y][X]) {
            visible.bottom = false;
            break;
        }
    }

    //check vertical
    return visible.left || visible.right || visible.top || visible.bottom;
}

const scenic = (map, Y, X) => {
    let score = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    };
    for (let x = X - 1; x >= 0; x--) {
        score.left += 1;
        if (map[Y][x] >= map[Y][X]) {
            break;
        }
    }
    //check right:
    for (let x = X + 1; x < map[0].length; x++) {
        score.right += 1;
        if (map[Y][x] >= map[Y][X]) {
            break;
        }
    }
    //check top:
    for (let y = Y - 1; y >= 0; y--) {
        score.top += 1;
        if (map[y][X] >= map[Y][X]) {
            break;
        }
    }
    //check bottom:
    for (let y = Y + 1; y < map[0].length; y++) {
        score.bottom += 1;
        if (map[y][X] >= map[Y][X]) {
            break;
        }
    }
    return score.left * score.right * score.top * score.bottom;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    let forest = mapForest(data);
    res += forest.length * 2 + (forest[0].length - 2) * 2;
    for (let y = 1; y < forest.length - 1; y++) {
        for (let x = 1; x < forest[y].length - 1; x++) {
            if (checking(forest, y, x)) {
                res += 1;
            }
        }
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    let forest = mapForest(data);
    for (let y = 1; y < forest.length - 1; y++) {
        for (let x = 1; x < forest[y].length - 1; x++) {
            const score = scenic(forest, y, x);
            res = (res < score) ? score : res;
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
