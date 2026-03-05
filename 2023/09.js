/**
 * The hand glider
 */

const year = '2023';
const day = '09';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const parseSeries = (data) => {
    return data.split('\n').map(l => l.split(' ').map(i => parseInt(i)));
}

const getNextRow = (row) => {
    const nextRow = [];
    for (let i = 1; i < row.length; i++) {
        nextRow.push(row[i] - row[i - 1]);
    }
    return nextRow;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    const series = parseSeries(data).map(s => [s]);
    for (const serie of series) {
        while(true) {
            const nextSerie = getNextRow(serie[serie.length - 1]);
            serie.push(nextSerie);
            if (nextSerie.filter(e => e === 0).length === nextSerie.length) {
                break;
            }
        }
        let next = 0;
        for (let i = serie.length - 1; i >=0; i--) {
            next += serie[i][serie[i].length - 1];
        }
        res += next;
    }
    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    const series = parseSeries(data).map(s => [s]);
    for (const serie of series) {
        while(true) {
            const nextSerie = getNextRow(serie[serie.length - 1]);
            serie.push(nextSerie);
            if (nextSerie.filter(e => e === 0).length === nextSerie.length) {
                break;
            }
        }
        let prev = 0;
        for (let i = serie.length - 1; i >=0; i--) {
            prev = serie[i][0] - prev;
        }
        res += prev;
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