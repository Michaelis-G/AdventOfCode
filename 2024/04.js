const fs = require( 'fs');
const FILE = './data/04';
const DATA = fs.readFileSync(FILE, 'utf8');
let res = 0;

const parseInput = (data) => {
    return data.split('\r\n').map(l => l.split(''));
}

const rotate90 = (matrix) => {
    let newMatrix =
        Array.from(Array(matrix[0].length), () => [...Array(matrix.length).fill('_')]);

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            newMatrix[y][x] = matrix[matrix.length - 1 - x][y];
        }
    }
    return newMatrix;
}

const rotate45 = (matrix) => {
    const rotatedMatrix = [];
    const size = matrix.length;

    for (let i = 0; i < 2 * size - 1; i++) {
        let row = [];
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (x + y  != i) {
                    continue;
                }
                row.push(matrix[y][x]);
            }
        }
        rotatedMatrix.push(row);
    }

    return rotatedMatrix;
}

const countHoriz = (matrix) => {
    let res = 0;
    for (let line of matrix) {
        line = line.join('');
        if (line.indexOf('XMAS') !== -1) {
            res += line.match(/XMAS/g).length;
        }
        if (line.indexOf('SAMX') !== -1) {
            res += line.match(/SAMX/g).length;
        }
    }
    return res;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    res += countHoriz(data);
    const data90 = rotate90(data);
    res += countHoriz(data90);
    const data45 = rotate45(data);
    res += countHoriz(data45);
    const data135 = rotate45(data90);
    res += countHoriz(data135);

    console.timeEnd('Time');
    return res;
}

const checkMasX = (matrix, y, x) => {
    if (
        matrix[y-1][x-1] === 'M' && (matrix[y-1][x+1] === 'M' || matrix[y+1][x-1] === 'M') &&
        matrix[y+1][x+1] === 'S' && (matrix[y-1][x+1] === 'S' || matrix[y+1][x-1] === 'S')
    ) {
        return true;
    }
    if (
        matrix[y+1][x+1] === 'M' && (matrix[y-1][x+1] === 'M' || matrix[y+1][x-1] === 'M') &&
        matrix[y-1][x-1] === 'S' && (matrix[y-1][x+1] === 'S' || matrix[y+1][x-1] === 'S')
    ) {
        return true;
    }

    return false;
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    for (let y = 1; y < data.length - 1; y++) {
        for (let x = 1; x < data[y].length - 1; x++) {
            if (data[y][x] === 'A') {
                if (checkMasX(data, y, x)) {
                    res += 1;
                }
            }
        }
    } 

    console.timeEnd('Time');
    return res;
}

console.log('Advent Of Code 2024 day 04');
console.log('==========================');
res = part1(parseInput(DATA));
console.log('Part 1:', res);
console.log('--------------------------');
res = part2(parseInput(DATA));
console.log('Part 2:', res);
