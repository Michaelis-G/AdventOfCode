
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
    println!("Advent of Code {year} - Day {day:02}");

    let data: Vec<String> = parse_file(
        String::from(format!("./data/{day:02}")),
        check_test_mode(args),
    );

    // println!("{:?}", data);
    println!("Part 1: {}", part_1(data.clone()));
    // println!("Part 2: {}", part_2(data.clone()));
}

fn part_1(data: Vec<String>) -> i32 {
    let mut res = 0;
    for moves in data.iter() {
        let gestures: Vec<String> = moves.split(' ').map(String::from).collect();
        let elf = &gestures[0];
        let me = &gestures[1];
        let score = compare_chifumi(
            me.to_string(),
            elf.to_string(),
        );
        res += score;
    }
    return res;
}

fn compare_chifumi(a: String, b: String) -> i32 {
    let val_a = get_chifumi_value(a);
    let val_b = get_chifumi_value(b);
    let cmp: i32 = val_a - val_b;
    let score = match cmp {
        0 => 3,
        -1 | -2 => 0,
        1 | 2 => 6,
        _ => 9,
    };
    return score + val_a;
}

fn get_chifumi_value(a: String) -> i32 {
    let keys = vec!["A", "B", "C", "X", "Y", "Z"];
    let values = vec![1, 2, 3, 1, 2, 3];
    let index = keys.iter().position(|&m| m == a);
    return values[index.unwrap()];
}
