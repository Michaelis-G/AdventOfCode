const year = 'yyyy';
const day = '01';
const fs = require('fs');

const parseInput = () => {
	if (day === 'dd') {
		console.log('day not set');
		return;
	}
	let filename = `./data/${day}`;
	if (process.argv.length > 2 && process.argv[2] === 'test') {
		filename += '.test';
	cons}
	console.log(filename)
	fs.exists(filename, (exists) => console.log((exists) ? 'Dataset found.' : 'Dataset not found!'));
	// data = fs.readFileSync(filename);
}

parseInput()
