/**
 * Share your thoughts
 */

const year = '2023';
const day = '07';
const { reverse } = require('dns');
const fs = require('fs');
const { IncomingMessage } = require('http');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const CARDS = {
    'A': '13', 'K': '12', 'Q': '11', 'J': '10', 'T': '09', '9': '08', '8': '07', '7': '06', '6': '05', '5': '04', '4': '03', '3': '02', '2': '01', 
}

const CARDS_JOKERS = {
    'A': '13', 'K': '12', 'Q': '11', 'J': '00', 'T': '09', '9': '08', '8': '07', '7': '06', '6': '05', '5': '04', '4': '03', '3': '02', '2': '01', 
}

const parseHands = (data, cardValues) => {
    const hands = [];
    for (const hand of data.split('\n')){
        const [cards, bet] = hand.split(' ');
        hands.push({
            cards: cards.split('')
                .map(c => cardValues[Object.keys(CARDS).find(k => k === c)]),
            bet: parseInt(bet)
        });
    }
    return hands;
}

const getHandValue = (hand) => {
    const cards = new Set(hand.cards);
    const combinaisons = {};
    for (const card of cards) {
        const n = hand.cards.filter(c => c === card).length;
        if (n in combinaisons) {
            combinaisons[n].push(card);
        } else {
            combinaisons[n] = [card];
        }
        combinaisons[n].sort((a, b) => b - a);
    }
    let value = '00';
    if ('5' in combinaisons) {
        value = '50';
    } else
    if ('4' in combinaisons) {
        value = '40';
    } else
    if ('3' in combinaisons) {
        if ('2' in combinaisons) {
            value = '35';
        } else {
            value = '30';
        }
    } else
    if ('2' in combinaisons) {
        if (combinaisons['2'].length === 2) {
            value = '25';
        } else {
            value = '20';
        }
    } else {
        value = '10';
    }

    return value + hand.cards[0] + hand.cards[1] + hand.cards[2] + hand.cards[3] + hand.cards[4] ;
}

const getHandValueWithJokers = (hand) => {
    const cards = new Set(hand.cards);
    const combinaisons = {};
    const j = hand.cards.filter(c => c === '00').length;
    let value = hand.cards.join('');
    for (const card of cards) {
        const n = hand.cards.filter(c => c === card).length;
        if (n in combinaisons) {
            combinaisons[n].push(card);
        } else {
            combinaisons[n] = [card];
        }
        combinaisons[n].sort((a, b) => b - a);
    }
    if (j === 5 || j === 4) {
        value = '50' + value;   
    } else
    if (j ===3) {
        if ('2' in combinaisons) {
            value = '50' + value;
        } else {
            value = '40' + value;
        }
    } else
    if (j === 2) {
        if ('3' in combinaisons) {
            value = '50' + value;
        } else
        if (combinaisons['2'].length > 1) {
            value = '40' + value;
        } else {
            value = '30' + value;
        }
    } else
    if ('5' in combinaisons) {
        value = '50' + value;
    } else
    if ('4' in combinaisons) {
        if (j === 1) {
            value = '50' + value;
        } else {
            value = '40' + value;
        }
    } else
    if ('3' in combinaisons) {
        if (j === 1){
            value = '40' + value;
        } else
        if ('2' in combinaisons) {
            value = '35' + value;
        } else {
            value = '30' + value;
        }
    } else
    if ('2' in combinaisons) {
        if (combinaisons['2'].length === 2) {
            if (j === 1) {
                value = '35' + value;
            } else {
                value = '25' + value;
            }
        } else {
            if (j === 1) {
                value = '30'+ value;
            } else {
                value = '20'+ value;
            } 
        }
    } else {
        if (j === 1) {
            value = '20' + value;
        } else {
            value = '10' + value;
        }
    }
    return value;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    const hands = parseHands(data,CARDS);
    for (let hand of hands) {
        hand['value'] = getHandValue(hand);
    }
    hands.sort((a, b) => a.value - b.value);
    for (let i = 0; i < hands.length; i++) {
        res += (i + 1)*hands[i].bet;
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    const hands = parseHands(data,CARDS_JOKERS);
    for (let hand of hands) {
        hand['value'] = getHandValueWithJokers(hand);
    }
    hands.sort((a, b) => a.value - b.value);
    for (let i = 0; i < hands.length; i++) {
        console.log(hands[i].cards, hands[i].value);
        res += (i + 1)*hands[i].bet;
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