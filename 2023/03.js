/**
 * Share your thoughts
 */

/**
 * Update year and day
 */
const year = '2023';
const day = '03';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const mapSymbols = (engine, star = false) => {
    const symbols = [];
    for (let y = 0; y < engine.length; y++) {
        for (let x = 0; x < engine[y].length; x++) {
            const symbol = engine[y][x];
            if (star) {
                if (!/\*/.test(symbol)) {
                    continue;
                }
            } else
            if (/[\d,\.]/.test(symbol)) {
                continue;
            }
            symbols.push({symbol, y, x});
        }
    }
    return symbols;
}

/**
 * A reprendre pour la prise en compte des chiffres de fin de ligne.
 */
const mapPieces = (engine) => {
    const pieces = [];
    for (let y = 0; y < engine.length; y++) {
        let piece = {value: '0', y: -1, x: []};
        for (let x = 0; x < engine[y].length; x++) {
            const digit = engine[y][x];
            if (/\d/.test(digit)) {
                piece.value += digit;
                piece.y = y;
                piece.x.push(x);
            } else {
                piece.value = parseInt(piece.value);
                if (piece.value > 0) {
                    pieces.push(piece);
                }
                piece = {value: '0', y: -1, x: []};
            }
        }
        if (piece.y !== -1) {
            piece.value = parseInt(piece.value);
            pieces.push(piece);
        }
    }
    return pieces;
}

const isAdjacent = (piece, symbol) => {
    return (piece.y >= symbol.y - 1
        && piece.y <= symbol.y + 1
        && symbol.x >= piece.x[0] - 1 
        && symbol.x <= piece.x[piece.x.length - 1] + 1);
}

const getGear = (symbol, pieces) => {
    let gear = [];
    for (const piece of pieces) {
        if (isAdjacent(piece, symbol)) {
            gear.push(piece);
        }
        if (gear.length === 2) {
            break;
        }
    }
    return gear;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    const symbols = mapSymbols(data.split('\n'));
    const pieces = mapPieces(data.split('\n'));
    for (const piece of pieces) {
        for (const symbol of symbols) {
            if (isAdjacent(piece, symbol)) {
                res += piece.value;
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

    const symbols = mapSymbols(data.split('\n'), true);
    const pieces = mapPieces(data.split('\n'));
    for (const symbol of symbols) {
        const gear = getGear(symbol, pieces);
        if (gear.length === 2) {
            res += (gear[0].value * gear[1].value);
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
