/**
 *
 *
 *
 */

// parsing script arguments 
use std::env;
// reading from file
use std::fs::read_to_string;


fn main() {

    let args: Vec<String> = env::args().collect();
    let data: Vec<String>;

    println!("Advent of Code {year} - {day:02}", year = 2022, day = 1);

    if is_testmode(args) {
        data = parse_file(String::from("./data/01.test"));
    } else {
        data = parse_file(String::from("./data/01"));
    }

    println!("Part 1: {}", part_1(data.clone()));
    println!("Part 2: {}", part_2(data.clone()));
}

fn is_testmode(args: Vec<String>) -> bool {
    if args.len() > 1 && args[1] == "test" {
        return true;
    }
    return false;
}

fn parse_file(filename: String) -> Vec<String> {
    read_to_string(filename)
        .unwrap()
        .lines()
        .map(String::from)
        .collect()
}

fn part_1(data: Vec<String>) -> u32 {
    let mut elves: Vec<u32> = [0].to_vec();
    let mut i = 0;
    for food in data {
        if food.len() == 0 {
            i += 1;
            elves.push(0);
            continue;
        }
        let calories: u32 = food.to_string().parse::<u32>().unwrap();
        elves[i] += calories;
    }
    
    elves.sort();
    return elves[ elves.len() - 1 ];
}

fn part_2(data: Vec<String>) -> u32 {
    let mut res = 0;

    let mut elves: Vec<u32> = [0].to_vec();
    let mut i = 0;
    for food in data {
        if food.len() == 0 {
            i += 1;
            elves.push(0);
            continue;
        }
        let calories: u32 = food.to_string().parse::<u32>().unwrap();
        elves[i] += calories;
    }
    elves.sort();
    let len = elves.len();
    for calories in &mut elves[ len - 3 .. ] {
        res += *calories;
    } 

    return res;
}

