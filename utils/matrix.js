const fs = require('fs');
const FILE = './data/matrix';
const DATA = fs.readFileSync(FILE, 'utf-8');

const parseInput = (data) => {
    const matrix = [];
    for (const line of DATA.split('\n')) {
        matrix.push(line.split('').map(x => parseInt(x)));
    }
    return matrix;
}
const sep = () => {
    console.log('-------');
}

const display = (matrix) => {
    for (let y = 0; y < matrix.length; y++) {
        console.log(matrix[y].join(' '));
    }
}

const rotate90 = (matrix) => {
    let rotatedMatrix = Array.from(matrix);

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            rotatedMatrix[y][x] = matrix[x][matrix.length - y - 1];
        }
    }
    return rotatedMatrix;
}

display(parseInput(DATA));
sep();
display(rotate90(parseInput(DATA)));