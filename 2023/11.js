/**
 * Share your thoughts
 */

const year = '2023';
const day = '11';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const mapTheSky = (data) => {
    return data.split('\n').map(r => r.split(''));
}

const expandTheSky = (sky) => {
    const emptyLines = [];
    const emptycolumns = [];
    for (let y = 0; y < sky.length; y++) {
        const row = sky[y];
        if (row.filter(s => s === '#').length === 0) {
            emptyLines.push(y);
        }
    }
    for (let x = 0; x < sky[0].length; x++) {
        let empty = true;
        for (let y = 0; y < sky.length; y++) {
            if (sky[y][x] === '#') {
                empty = false;
            }
        }
        if (empty) {
            emptycolumns.push(x);
        }
    }
    return [emptyLines, emptycolumns];
}

const getStars = (sky) => {
    const stars = [];
    for (let y = 0; y < sky.length; y++) {
        for (let x = 0; x < sky[y].length; x++) {
            if (sky[y][x] === '#') {
                stars.push({y, x});
            }
        }
    }
    return stars;
}

const getStarsDistance = (s1, s2, emptyLines, emptycolumns, inc = 1) => {
    let x = Math.abs(s2.x - s1.x);
    let y = Math.abs(s2.y - s1.y);
    for (const empty of emptyLines) {
        if ((empty > s1.y && empty < s2.y) || (empty > s2.y && empty < s1.y)) {
            y += inc - 1;
        }
    }
    for (const empty of emptycolumns) {
        if ((empty > s1.x && empty < s2.x) || (empty > s2.x && empty < s1.x)) {
            x += inc - 1;
        }
    }
    return y + x
}

const getStarPairs = (stars) => {
    const pairs = []
    for (let j = stars.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            pairs.push([stars[j], stars[i]]);
        }
    }
    return pairs;
} 

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    const sky = mapTheSky(data);
    const [emptyLines, emptycolumns] = expandTheSky(sky);
    const stars = getStars(sky);
    const pairs = getStarPairs(stars);

    for (const pair of pairs) {
        res += getStarsDistance(
            pair[0], pair[1], emptyLines, emptycolumns
        );
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    const sky = mapTheSky(data);
    const [emptyLines, emptycolumns] = expandTheSky(sky);
    const stars = getStars(sky);
    const pairs = getStarPairs(stars);

    for (const pair of pairs) {
        res += getStarsDistance(
            pair[0], pair[1], emptyLines, emptycolumns, 1000000
        );
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