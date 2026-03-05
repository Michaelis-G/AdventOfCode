/**
 * Pipe Maze!
 */

const year = '2023';
const day = '10';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const MOVES = {
    'S': [{y: 1, x: 0}, {y: -1, x: 0}, {y: 0, x: 1}, {y: 0, x: -1}],
    // 'S': [{y: -1, x: 0}, {y: 0, x: -1}],
    '-': [{y: 0, x: 1}, {y: 0, x: -1}],
    '|': [{y: 1, x: 0}, {y: -1, x: 0}],
    'F': [{y: 1, x: 0}, {y: 0, x: 1}],
    'J': [{y: -1, x: 0}, {y: 0, x: -1}],
    'L': [{y: -1, x: 0}, {y: 0, x: 1}],
    '7': [{y: 1, x: 0}, {y: 0, x: -1}],
    '.': [],
};

const getNeighbors = (pos, maze) => {
    const neighbors = [];
    for (const move of MOVES[maze[pos.y][pos.x]]) {
        if ((pos.y + move.y) >= 0 && (pos.x + move.x) >= 0 && (pos.y + move.y) < maze.length && (pos.x + move.x) < maze[pos.y].length) {
            neighbors.push({
                y: pos.y + move.y,
                x: pos.x + move.x,
            });
        }
    }
    return neighbors;
}

const parseMaze = (data) => {
    let maze = data.split('\n').map(r => r.split(''));
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            maze[y][x] = {
                value: maze[y][x],
                dest: getNeighbors({y, x}, maze),
            }
        }
    }
    return maze;
}

const getStart = (maze) => {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x].value === 'S') {
                maze[y][x].value = '#';
                return [{y, x}];
            }
        }
    }
    return [{y: -1, x: -1}];
}

const walkTheMaze = (positions, maze) => {
    const next = [];
    for (const pos of positions) {
        for (const neighbor of maze[pos.y][pos.x].dest) {
            const cell = maze[neighbor.y][neighbor.x];
            if (maze[neighbor.y][neighbor.x].dest.length !== 0) {
                if ('#' !== maze[neighbor.y][neighbor.x].value) {
                    next.push(neighbor);
                    maze[neighbor.y][neighbor.x].value = "#";
                }
            }
        }
    }
    return next;
}

const displayMaze = (maze) => {
    for (const row of maze) {
        const r = []
        for (const cell of row) {
            r.push(cell.value);
        }
        console.log(r.join(' '))
    }
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    const maze = parseMaze(data);
    let positions = getStart(maze);
    positions = walkTheMaze(positions, maze);
    while (positions.length > 0) {
        positions = walkTheMaze(positions, maze);
        res += 1;
    }
    displayMaze(maze);

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    const maze = parseMaze(data);
    let positions = getStart(maze);
    positions = walkTheMaze(positions, maze);
    while (positions.length > 0) {
        positions = walkTheMaze(positions, maze);
    }
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x].value !== '#') {
                console.log('considering', y, x);
            }
        }
    }        
    displayMaze(maze);

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