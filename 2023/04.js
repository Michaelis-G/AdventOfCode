/**
 * Premiere partie :
 * Point d'attention sur le découpage des valeurs, 
 * des espaces doubles generent des NaN qu'il faut supprimer
 * ---
 */

const year = '2023';
const day = '04';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const buildDeck = (data) => {
    const deck = [];
    for (const row of data.split('\n')) {
        let [cards, nums] = row.split(' | ');
        cards = cards.split(': ')[1].split(' ').map(x => parseInt(x)).filter(x => !isNaN(x));
        nums = nums.split(' ').map(x => parseInt(x)).filter(x => !isNaN(x));
        deck.push({cards, nums, copies: 1});
    }
    return deck;
}

const evalCard = (card) => {
    let nb = 0;
    for (const num of card.nums) {
        if (card.cards.includes(num)) {
            nb += 1;
        }
    }
    return nb;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    for (const card of buildDeck(data)) {
        const num = evalCard(card);
        if (num > 0) {
            res += Math.pow(2, num - 1);
        }
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    cards = buildDeck(data);
    for (let i = 0; i < cards.length; i++) {
        const num = evalCard(cards[i]);
        for (let j = 0; j < cards[i].copies; j++) {
            for (let k = 1; k <= num; k++) {
                cards[i+k].copies += 1;
            }
        }
        res += cards[i].copies;
    }

    console.log('Part 2:', res);
    console.timeEnd('Time');
}

/**
 *  There you go
 */
console.log( `Advent Of Code ${year}-${day}`);
console.log('==========================');
part1(parseInput());
console.log('--------------------------');
part2(parseInput());
