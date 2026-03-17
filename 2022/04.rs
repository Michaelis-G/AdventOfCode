
/**
 * 2022 Day 04: Cleanning
 */

mod common;

use std::env;
use common::args::check_test_mode;
use common::data::parse_file;

fn main() {
    let year = 2022;
    let day = 4;

    let args: Vec<String> = env::args().collect();
    println!("Advent of Code {year} - Day {day:02}");

    let data: Vec<String> = parse_file(
        String::from(format!("./data/{day:02}")),
        check_test_mode(args),
    );

    println!("Part 1: {}", part_1(data.clone()));
    // println!("Part 2: {}", part_2(data.clone()));
}

fn part_1(data: Vec<String>) -> i32 {
    let mut res = 0;

    println!("{:?}", data);
    for pairs in data.iter() {
        let pair: Vec<String> = pairs
            .split(',')
            .map(|p| p.split('-').collect())
            .collect();
        println!("{} {}", pair[0][0], pair[0][1]);
    }

    return res;
}

