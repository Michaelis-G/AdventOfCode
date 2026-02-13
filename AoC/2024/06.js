const fs = require( 'fs');
const FILE = './data/06.test';
const DATA = fs.readFileSync(FILE, 'utf8');

const parseInput = (data) => {
    return data.split('\r\n').map(x => x.split(''));
}

const getStartLocation = (data) => {
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            if (data[y][x] === '^') {
                return {y, x};
            }
        }
    }
    return undefined;
}

const getStoneLocations = (data) => {
    const stones = [];
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            if (data[y][x] === '#') {
                stones.push({y, x});
            }
        }
    }
    return stones; 
}

const STONE = '#';
const DIRECTIONS = [
    { y: -1, x: 0 }, 
    { y: 0, x: 1 }, 
    { y: 1, x: 0 }, 
    { y: 0, x: -1 }, 
];

const move = (maze, p, d) => {
    maze[p.y][p.x] = 'X';
    
    if (((p.y + DIRECTIONS[d].y) >= maze.length) || ((p.x + DIRECTIONS[d].x) >= maze.length)) {
        return [maze, false, d];
    }

    if ( maze[p.y + DIRECTIONS[d].y][p.x + DIRECTIONS[d].x] === STONE ) {
        d = (d + 1) % 4;
    }
    const nextP = {
        y: p.y + DIRECTIONS[d].y,
        x: p.x + DIRECTIONS[d].x
    }
    return [maze, nextP, d]
}

const checkLoop = (maze, p, d) => {
    /** on avance de 1 */
    let y = p.x + DIRECTIONS[d].y;
    let x = p.y + DIRECTIONS[d].x;
    console.log('Test from:', y, x);
    /** Si on sort du maze, c'est mort */
    if (x > maze.length - 1 || y > maze.length - 1) {
        return false;
    }

    /** on s'oriente à 90° */
    d = (d + 1) % 4;
    /** on avance jusqu'à sortir de la grille ou rencontrer un rocher */
    while(y > 0 && y < (maze.length - 1) && x > 0 && x < (maze.length - 1)) {
        y += DIRECTIONS[d].y;
        x += DIRECTIONS[d].x;
        console.log(y, x);
        if (maze[y][x] === '#') {
            return true;
        }
    }
    return false;
}

const move2 = (maze, p, d) => {
    if (maze[p.y][p.x] !== 'O') {
        maze[p.y][p.x] = 'X';
    }

    if (maze[p.y + DIRECTIONS[(d + 1) % 4].y][p.x + DIRECTIONS[(d + 1) % 4].x] === ((d + 1) % 4).toString()) {
        maze[p.y + DIRECTIONS[d].y][p.x + DIRECTIONS[d].x] = 'O';
    }

    if (((p.y + DIRECTIONS[d].y) >= maze.length) || ((p.x + DIRECTIONS[d].x) >= maze.length)) {
        return [maze, false, d];
    }

    if (checkLoop(maze, p, d)) {
        console.log('Loop!!!', p);
    }

    if ( maze[p.y + DIRECTIONS[d].y][p.x + DIRECTIONS[d].x] === STONE ) {
        d = (d + 1) % 4;
    }

    // switch(d) {
    //     case 0: maze[p.y][p.x] = '0'; break;
    //     case 1: maze[p.y][p.x] = '1'; break;
    //     case 2: maze[p.y][p.x] = '2'; break;
    //     case 3: maze[p.y][p.x] = '3'; break;
    //     default: break;
    // }

    const nextP = {
        y: p.y + DIRECTIONS[d].y,
        x: p.x + DIRECTIONS[d].x
    }
    return [maze, nextP, d]
}

const countLocations = (data) => {
    let locations = 0;
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            if (data[y][x] === 'X') {
                locations += 1;
            }
        }
    }
    return locations;
}

const show = (maze) => {
    console.log(maze.map(x => x.join(' ')));
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;
    let position = getStartLocation(data);
    let direction = 0;
    const stones = getStoneLocations(data);
    while(position) {
        [data, position, direction] = move(data, position, direction);
    }
    res = countLocations(data);

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;
    let position = getStartLocation(data);
    let direction = 0;
    const stones = getStoneLocations(data);
    while(position) {
        [data, position, direction] = move2(data, position, direction);
    }
    show(data);
    console.log('Part 2:', res);
    console.timeEnd('Time');
}

console.log('Advent Of Code 2024 day 06');
console.log('==========================');
part1(parseInput(DATA));
console.log('--------------------------');
part2(parseInput(DATA));