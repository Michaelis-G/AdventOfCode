use std::fs::read_to_string;

/**
 * explein!
 */
pub fn parse_file(mut filename: String, test: bool) -> Vec<String> {
    if test {
        filename.push_str(&String::from(".test"));
    }
    println!("read from filename: '{}'", filename);
    read_to_string(filename)
        .unwrap()
        .lines()
        .map(String::from)
        .collect()
}

