/**
 * 2022 Day 01: Calories
 */

mod common;

use std::env;
use common::args::check_test_mode;
use common::data::parse_file;

fn main() {

    let args: Vec<String> = env::args().collect();
    println!("Advent of Code {year} - Day {day:02}", year = 2022, day = 1);

    let data: Vec<String> = parse_file(
        String::from("./data/01"),
        check_test_mode(args),
    );

    println!("Part 1: {}", part_1(data.clone()));
    println!("Part 2: {}", part_2(data.clone()));
}

fn part_1(data: Vec<String>) -> u32 {
    let mut best_total: u32 = 0;
    let mut current_total: u32 = 0;
    for calories in data.iter() {
        if calories.trim().is_empty() {
            if current_total > best_total {
                best_total = current_total;
            }
            current_total = 0;
            continue;
        }
        current_total += calories.to_string().parse::<u32>().unwrap();
    }
    return best_total; 
}

fn part_2(data: Vec<String>) -> u32 {
    let mut res = 0;

    let mut elves_calories: Vec<u32> = [0].to_vec();
    let mut current_total: u32 = 0;
    for calories in data.iter() {
        if calories.trim().is_empty() {
            elves_calories.push(current_total);
            current_total = 0;
            continue;
        }
        current_total += calories.to_string().parse::<u32>().unwrap();
    }
    if current_total > 0 {
        elves_calories.push(current_total);
    }
    elves_calories.sort_by(|a, b| b.cmp(a));
    return elves_calories[ .. 3 ].iter().fold(0, |a, v| a + v);
}

