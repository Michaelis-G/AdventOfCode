const fs = require( 'fs');
const FILE = './data/05';
const DATA = fs.readFileSync(FILE, 'utf8');

const parseInput = (data) => {
    const orders = [];
    const books = [];
    for (const line of data.split('\r\n')) {
        if (line.includes('|')) {
            orders.push(line.split('|').map(x => parseInt(x)));
        }
        if (line.includes(',')) {
            books.push(line.split(',').map(x => parseInt(x)));
        }
    }

    return [orders, books];
}

const processOrders = (orders) => {
    let processedOrders = {}
    for (const order of orders) {
        if (order[0] in processedOrders === false) {
            processedOrders[order[0]] = [];    
        }
        processedOrders[order[0]].push(order[1])
    }
    return processedOrders;
}

const reOrderBook = (orders, book) => {
    let orderedBook = Array.from(book);

    for (let i = book.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (orders[book[i]] !== undefined && orders[book[i]].includes(book[j])) {
                // console.log('swap', orders[book[i]], orders[book[j]])
                const tmp = book[i];
                book[i] = book[j];
                book[j] = tmp;
            }
        }
    }

    return book;
}

const part1 = (inputs) => {
    console.time('Time');
    let res = 0;
    const orders = processOrders(inputs[0]);
    const books = inputs[1];

    for (const book of books) {
        let ordered = true;
        for (let i = book.length - 1; i > 0; i--) {
            for (let j = i - 1; j >=0; j--) {
                // book[i] must not preceed any book[j]
                if (orders[book[i]] !== undefined && orders[book[i]].includes(book[j])) {
                    ordered = false;
                    break;
                }
            }
            if (!ordered) {
                break;
            }
        }
        if (ordered === true) {
            res += book[(book.length - 1) / 2];
        } else {
            // console.log(' => KO book', book)
        }
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (inputs) => {
    console.time('Time');
    let res = 0;
    const orders = processOrders(inputs[0]);
    const books = inputs[1];

    for (let book of books) {
        let ordered = true;
        for (let i = book.length - 1; i > 0; i--) {
            for (let j = i - 1; j >=0; j--) {
                if (orders[book[i]] !== undefined && orders[book[i]].includes(book[j])) {
                    ordered = false;
                    break;
                }
            }
            if (!ordered) {
                break;
            }
        }
        if (ordered !== true) {
            book = reOrderBook(orders, book);
            res += book[(book.length - 1) / 2];
        } else {
            // console.log(' => Ok book', book)
        }
    }

    console.log('Part 2:', res);
    console.timeEnd('Time');
}

console.log('Advent Of Code 2024 day 05');
console.log('==========================');
part1(parseInput(DATA));
console.log('--------------------------');
part2(parseInput(DATA));
