/**
 * 2022 Day 02: Rock, Paper, Scissor
 */

mod common;

use std::env;
use common::args::check_test_mode;
use common::data::parse_file;

fn main() {
    let year = 2022;
    let day = 2;

    let args: Vec<String> = env::args().collect();
    println!("Advent of Code {year} - Day {day:02}", year, day);

    let data: Vec<String> = parse_file(
        String::from("./data/{day:02}", day),
        check_test_mode(args),
    );

    println!("Part 1: {}", part_1(data.clone()));
    println!("Part 2: {}", part_2(data.clone()));
}

