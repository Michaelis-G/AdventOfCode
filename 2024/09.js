const DAY = '09';
const fs = require( 'fs');
let filename = `./data/${DAY}`;

const parseInput = () => {
    let data = fs.readFileSync(filename, 'utf8');
    return data.split('').map(n => parseInt(n));
}

const fragmentDisk = (data) => {
    let k = 0;
    let space = false;
    let disk = [];
    for (let n of data) {
        for (let i = 0; i < n; i++) {
            if (space) {
                disk.push('.');
            } else {
                disk.push(k);
            }
        }
        if (space) {
            k++;
        }
        space = !space;
    }
    return disk;
}

const defrag = (disk) => {
    for (let i = disk.length - 1; i > 0; i--) {
        const current = disk[i];
        if (current === '.') {
            continue;
        }
        const nextSpaceIndex = disk.findIndex(c => c === '.');
        if (nextSpaceIndex > i) {
            console.log(
                'current index', i, 
                'next single empty space index', nextSpaceIndex, 
            );
            break;
        }
        disk[nextSpaceIndex] = current;
        disk[i] = '.';
    }
    return disk;
}

const fullDrefrag = (disk) => {
    let currentFile = [];
    let lastMove = 0;
    for (let i = disk.length - 1; i > 0; i--) {
        const current = disk[i];
        const nextSmallSpaceIndex = disk.findIndex(c => c === '.');
        if (nextSmallSpaceIndex > i) {
            console.log(
                'current index', i, 
                'next single empty space index', nextSmallSpaceIndex, 
                'for number', lastMove
            );
            break;
        }
        if (current === '.' || (current !== currentFile[0] && currentFile.length > 0)) {
            const nextSpaceIndex = disk.findIndex((c, i) => {
                let space = true;
                for (let k = 0; k < currentFile.length; k++) {
                    space = (space && disk[i+k] === '.');
                }
                return space;
            });
            if (nextSpaceIndex !== -1 && nextSpaceIndex < i && currentFile[0] !== '.') {
                // if (lastMove > 0 && currentFile[0] > lastMove) {
                //     console.log('Houston', currentFile[0], '>', lastMove);
                // } else {
                //     console.log(currentFile[0], '<', lastMove);
                // }
                for (let j = 0; j < currentFile.length; j++) {
                    disk[nextSpaceIndex + j] = currentFile[j];
                    disk[i + j + 1] = '.';
                }
            } else {
                // if (currentFile[0] !== '.') console.log('cannot move', currentFile[0]);
            }
            if (currentFile[0] !== '.') lastMove = currentFile[0];
            currentFile = [];
        }
        currentFile.push(current);
    }
    return disk;
}

const checksum = (disk) => {
    let res = 0;
    for (let i = 0; i < disk.length; i++) {
        if (disk[i] === '.') {
            continue;
        }
        res += i * disk[i];
    }
    return res;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    let disk = fragmentDisk(data);
    disk = defrag(disk);
    // fs.writeFileSync('part1.txt', disk.join(' '));
    res = checksum(disk);

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {

    console.time('Time');
    let res = 0;

    let disk = fragmentDisk(data);
    disk = fullDrefrag(disk);
    // fs.writeFileSync('part2.txt', disk.join(' '));
    res = checksum(disk);
    console.log('Part 2:', res);
    console.timeEnd('Time');
}

if (process.argv.length > 2) {
    filename += '.test';
}
console.log('Advent Of Code 2024 day', DAY);
console.log('==========================');
part1(parseInput());
// 6395800119709
console.log('--------------------------');
part2(parseInput());
// 6409153172360