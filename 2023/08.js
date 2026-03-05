/**
 * Escape the wastelands
 * Follow the trailkind of test
 * part1: kinda trivial
 * part2: //paths
 */

const year = '2023';
const day = '08';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const parsePattern = (data) => {
    /** change L/R to array indexes */
    return data.split('\n')[0].split('').map(d => (d === 'L') ? 0 : 1);
}

const parseMap = (data) => {
    data = data.split('\n');
    data.shift();
    data.shift();
    return data.map(m => {
        m = m.replace('(', '').replace(')', '');
        return {
            node: m.split(' = ')[0],
            dest: m.split(' = ')[1].split(', '),
        }
    });
}

const initNodes = (map) => {
    return map.filter(n => n.node.endsWith('A')).map(n => n.node);
}

const findNextNode = (node, map, direction) => {
    const n = map.find(n => n.node === node);
    const dest = n.dest[direction];
    return dest;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    const pattern = parsePattern(data);
    const map = parseMap(data);

    node = 'AAA';
    let n = 0;
    while(node !== 'ZZZ') {
        node = findNextNode(node, map, pattern[n]);
        n += 1;
        res += 1;
        if (n % (pattern.length) === 0) {
            n = 0;
        }
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 1;

    const pattern = parsePattern(data);
    const map = parseMap(data);
    
    let nodes = initNodes(map);
    let moves = [];
    for (let i = 0; i < nodes.length; i++) {
        let n = 0;
        let k = 0;
        // while (nodes.length > nodes.filter(n => n.endsWith('Z')).length) {
        while (!nodes[i].endsWith('Z')) {
            nodes[i] = findNextNode(nodes[i], map, pattern[n]);
            n += 1;
            k += 1;
            if (n % (pattern.length) === 0) {
                n = 0;
            }    
        }
        moves[i] = k;
        res *= k;
    }
    console.log(moves);

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