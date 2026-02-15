const fs = require( 'fs');
const FILE = './data/06';

const DATA = fs.readFileSync(FILE, 'utf8');
const DIRECTIONS = [
    { name: 'North', y: -1, x: 0, symbol: '\u{2191}' },
    { name: 'East', y: 0, x: 1, symbol: '\u{2192}' },
    { name: 'South', y: 1, x: 0, symbol: '\u{2193}' },
    { name: 'West', y: 0, x: -1, symbol: '\u{2190}' },
];
let directionIndex = 0;
let markedStones = [];

const parseInput = (data) => {
    return data.split('\r\n').map(x => x.split(''));
}
let maze = parseInput(DATA);

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
let location = getStartLocation(maze)

const getStoneLocations = (maze) => {
    const stones = [];
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === '#') {
                stones.push({y, x});
                maze[y][x] = '\x1b[93m\u{26A0}\x1b[39m';
            }
            if (maze[y][x] === '.') {
                maze[y][x] = ' ';
            }
        }
    }
    return stones; 
}
const STONES = getStoneLocations(maze);

const displayMaze = (maze) => {
    trait = '= Maze: =';
    for (let x = 9; x < 2 * maze.length - 1; x++) {
        trait += '=';
    }
    console.log(trait);
    maze.forEach(row => console.log(row.join(' ')));
    trait = '';
    for (let x = 0; x < 2 * maze.length - 1; x++) {
        trait += '=';
    }
    console.log(trait);
}

const turnRight = (directionIndex) => {
    return ((directionIndex + 1) % 4);
}

const isInside = (maze, y, x) => {
    if (x < 0 || y < 0 || x >= maze.length || y >= maze.length) {
        return false;
    }
    return true;
}

const isStone = (location, markedStones) => {
    if (STONES.findIndex(stone => stone.x === location.x && stone.y === location.y) !== -1) {
        if (markedStones.findIndex(s => s.y === location.y && s.x === location.x) === -1) {
            markedStones.push({y: location.y, x: location.x});
        }
        maze[location.y][location.x] = '\x1b[91m\u{26A0}\x1b[39m';
        return true;
    }
    return false;
}

const walk = (maze, location, directionIndex) => {
    const y = location.y + DIRECTIONS[directionIndex].y;
    const x = location.x + DIRECTIONS[directionIndex].x;
    if (isStone({y, x}, markedStones)) {
        // console.log('you encounter a stone at ', {y, x}, 'going', DIRECTIONS[directionIndex].name, 'turn right');
        return [location, turnRight(directionIndex)];
    }
    if (!isInside(maze, y, x)) {
        console.log('You stepped out of the maze at', location, 'going', DIRECTIONS[directionIndex].name);
        return [false, directionIndex];
    }
    location.y += DIRECTIONS[directionIndex].y;
    location.x += DIRECTIONS[directionIndex].x;

    return [location, directionIndex];
}

const markLocation = (maze, location, directionIndex) => {
    maze[location.y][location.x] = DIRECTIONS[directionIndex].symbol;
}

const addLocation = (locations, location) => {
    if (locations.findIndex(l => l.x === location.x && l.y === location.y) === -1) {
        locations.push(location);
    }
    return locations;
}

const checkLoop = (maze, location, directionIndex) => {
    let stone = undefined;
    /** si je tourne dans quelle direction je vais */
    newDirectionIndex = turnRight(directionIndex);
    nextLocation = {
        y: location.y + DIRECTIONS[directionIndex].y,
        x: location.x + DIRECTIONS[directionIndex].x,
    }
    if (!isInside(maze, nextLocation.y, nextLocation.x)) {
        return false;
    }
    if (isStone(nextLocation, markedStones)) {
        return false;
    }
    /** si je continue dans cette nouvelle direction je cherche une marke stone */
    switch(newDirectionIndex) {
        case 0:
            stone = markedStones.findIndex(s => s.x === location.x && s.y < location.y);
            break;
        case 1:
            stone = markedStones.findIndex(s => s.x > location.x && s.y === location.y);
            break;
        case 2:
            stone = markedStones.findIndex(s => s.x === location.x && s.y > location.y);
            break;
        case 3:
            stone = markedStones.findIndex(s => s.x < location.x && s.y === location.y);
            break;
        default:
            break;
    }
    if (stone !== -1) {
        console.log('hum pas mal', nextLocation);
        return nextLocation;
    }
    return false;
}

let locations = [];
let loopStones = [];
displayMaze(maze);
while(true) {
    /** We mark our spot with an 'X' */
    markLocation(maze, location, directionIndex);

    /** we walk to our next stop */
    [location, directionIndex] = walk(maze, location, directionIndex);
    if (location === false) { /** we're outside the grid this is gameover */
        break;
    }
    // console.log(location, DIRECTIONS[directionIndex].name);
    locations = addLocation(locations, {y: location.y, x: location.x});

    /** now we wanna check if a loop is achievable putting a new stone on the way */
    const stone = checkLoop(maze, location, directionIndex);
    if (stone) {
        if (loopStones.findIndex(s => s.y === stone.y && s.x === stone.x) === -1) {
            loopStones.push(stone);
        }
    }
}
displayMaze(maze);
console.log("Part 1:", locations.length, "squares are marked");
console.log("Part 2:", loopStones.length, "stones can create loops");
