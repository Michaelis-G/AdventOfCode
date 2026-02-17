/**
 * To complete Part2 i should consider running the search backward
 * From location up to the seed in order to get only the lower value
 * 31min to solve Part2 => unacceptable.
 */

const year = '2023';
const day = '05';
const fs = require('fs');
const { findPackageJSON } = require('module');

const parseInput = () => {
    let filename = `./data/${day}`;
    if (process.argv.length > 2) {
        filename += '.test';
    }
    let data = fs.readFileSync(filename, 'utf8');
    return data;
}

const getSeeds = (data) => {
    for (const row of data.split('\n')) {
        if (/^seeds\:\s/.test(row)) {
            return(row.split(': ')[1].split(' ').map(x => parseInt(x)));
        }
    }
}

const getSeedRanges = (data) => {
    let seeds = [];
    for (const row of data.split('\n')) {
        if (/^seeds\:\s/.test(row)) {
            seeds = row.split(': ')[1].split(' ').map(x => parseInt(x));
            break;
        }
    }
    const ranges = [];
    for (let i = 0; i < seeds.length; i += 2) {
        ranges.push({min: seeds[i], max: seeds[i] + seeds[i+1]});
    }

    return ranges;
}

const getMap = (data, type) => {
    const map = [];
    const re = new RegExp( `^${type}\\smap\\:`);
    data = data.split('\n');
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        if (re.test(row)) {
            while(true) {
                if (row.length <= 1 || i === data.length - 1) {
                    break;
                }
                row = data[i + 1]; 
                [dst, src, range] = row.split(' ').map(x => parseInt(x));
                map.push({
                    src: {min: src, max: src+range-1},
                    dst: {min: dst, max: dst+range-1},
                });
                i += 1;
            }
        }
    }
    return map;
}

const applyMapping = (seed, map) => {
    map = map.find(s => seed >= s.src.min && seed <= s.src.max)
    let offset = 0;
    if (map) {
        offset = map.dst.min - map.src.min;
    }
    seed += offset;
    return seed;
}

const part1 = (data) => {
    console.time('Time');
    let res = 0;

    const seeds = getSeeds(data);
    const seedTosoilMap = getMap(data, 'seed-to-soil');
    const soilToFertilizerMap = getMap(data, 'soil-to-fertilizer');
    const fertilizerToWaterMap = getMap(data, 'fertilizer-to-water');
    const waterToLightMap = getMap(data, 'water-to-light');
    const lightToTemperatureMap = getMap(data, 'light-to-temperature');
    const temperatureToHumidityMap = getMap(data, 'temperature-to-humidity');
    const humidityToLocationMap = getMap(data, 'humidity-to-location');
    for (const seed of seeds) {
        let path = seed

        path = applyMapping(path, seedTosoilMap);
        path = applyMapping(path, soilToFertilizerMap);
        path = applyMapping(path, fertilizerToWaterMap);
        path = applyMapping(path, waterToLightMap);
        path = applyMapping(path, lightToTemperatureMap);
        path = applyMapping(path, temperatureToHumidityMap);
        path = applyMapping(path, humidityToLocationMap);
        res = (path < res || res === 0) ? path : res; 
    }

    console.log('Part 1:', res);
    console.timeEnd('Time');
}

const part2 = (data) => {
    console.time('Time');
    let res = 0;

    const ranges = getSeedRanges(data);
    const seedTosoilMap = getMap(data, 'seed-to-soil');
    const soilToFertilizerMap = getMap(data, 'soil-to-fertilizer');
    const fertilizerToWaterMap = getMap(data, 'fertilizer-to-water');
    const waterToLightMap = getMap(data, 'water-to-light');
    const lightToTemperatureMap = getMap(data, 'light-to-temperature');
    const temperatureToHumidityMap = getMap(data, 'temperature-to-humidity');
    const humidityToLocationMap = getMap(data, 'humidity-to-location');
    for (const range of ranges) {
        for (let seed = range.min; seed < range.max; seed++) {
            let path = seed

            path = applyMapping(path, seedTosoilMap);
            path = applyMapping(path, soilToFertilizerMap);
            path = applyMapping(path, fertilizerToWaterMap);
            path = applyMapping(path, waterToLightMap);
            path = applyMapping(path, lightToTemperatureMap);
            path = applyMapping(path, temperatureToHumidityMap);
            path = applyMapping(path, humidityToLocationMap);
            res = (path < res || res === 0) ? path : res; 
        }
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
