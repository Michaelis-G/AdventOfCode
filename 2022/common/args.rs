/**
 * explain!
 */
pub fn check_test_mode(args: Vec<String>) -> bool {
    let Some(test) = args.get(1) else {
        return false;
    };
    if test != "test" {
        eprintln!("usage: no args or test and basta!");
        std::process::exit(1);
    }
    return true;
}

