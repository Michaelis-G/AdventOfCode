/**
 * Share your thoughts
 */

/**
 * Update year and day
 */
const year = '2023';
const day = '02';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const getGames = (data) => {
    const games = [];
    for (let row of data.split('\n')) {
        row = row.replaceAll(';', ',');
        games.push({
            id: parseInt(row.split(': ')[0].split(' ')[1]),
            draws: row.split(': ')[1].split(', ').map(d => ({
                n: parseInt(d.split(' ')[0]),
                c: d.split(' ')[1],
            })),
        });
    }
    return games;
}

const checkDraws = (draws) => {
    for (const draw of draws) {
        if (draw.c === 'red' && draw.n > 12) return false;
        if (draw.c === 'green' && draw.n > 13) return false;
        if (draw.c === 'blue' && draw.n > 14) return false;
    }
    return true;
}

const evalDraws = (draws) => {
    let red = 0;
    let green = 0;
    let blue = 0;
    for (const draw of draws) {
        if (draw.c === 'red' && draw.n > red) red = draw.n;
        if (draw.c === 'green' && draw.n > green) green = draw.n;
        if (draw.c === 'blue' && draw.n > blue) blue = draw.n;
    }
    return red*green*blue;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    for (const game of getGames(data)) {
        if (checkDraws(game.draws)) {
            res += game.id;
        }
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    for (const game of getGames(data)) {
        res += evalDraws(game.draws);
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