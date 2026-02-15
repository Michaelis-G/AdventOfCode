/**
 * Share your thoughts
 */

/**
 * Update year and day
 */
const year = '2023';
const day = '01';
const fs = require('fs');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const readCalibration = (calibration) => {
	if (calibration.length === 0) return 0;

	let first, second;
	for (let i = 0; i < calibration.length; i++) {
		if (/^\d$/.test(calibration[i])) {
			first = calibration[i];
			break;
		}
	}
	for (let i = calibration.length - 1; i >= 0; i--) {
		if (/^\d$/.test(calibration[i])) {
			second = calibration[i];
			break;
		}
	}
	return parseInt(first+second);
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    for (const calibration of data.split('\n')) {
	    res += readCalibration(calibration);
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

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
