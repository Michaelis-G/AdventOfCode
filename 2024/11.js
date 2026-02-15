const DAY = '11';
const fs = require( 'fs');
let filename = `./data/${DAY}`;

const parseInput = () => {
    let data = fs.readFileSync(filename, 'utf8');
    return data.split(' ');
}

const blink = (stone) => {
    if (parseInt(stone) === 0) {
        return ['1'];
    } else
    if (stone.length % 2 === 0) {
        stone = stone.split('');
        let left = parseInt(stone.slice(0, stone.length/2).join('')).toString(); 
        let right = parseInt(stone.slice(stone.length/2, stone.length).join('')).toString(); 
        return [
            left,
            right,
        ];
    } else {
        return [(parseInt(stone) * 2024).toString()];
    }
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    let i = 0;
    let stones = [125];
    while(i < 75) {
        let newStones = Array.from([]);
        for (const stone of stones) {
            newStones.push(...blink(stone));
        }
        stones = Array.from(newStones);
        i++;
    }
    console.log(stones)
    console.log('Part 1:', stones.length);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    /**
     * le mode bourrin ne marche pas, il faut calculer pour chaque pierre en cb de pierre
     * elle sera divisée au bout de X passages.
     */

    console.log('Part 2:', res);
    console.timeEnd('Time');
}

if (process.argv.length > 2) {
    filename += '.test';
}
console.log('Advent Of Code 2024 day',  DAY);
console.log('==========================');
part1(parseInput());
console.log('--------------------------');
part2(parseInput());