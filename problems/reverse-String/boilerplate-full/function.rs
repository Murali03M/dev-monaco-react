
  use std::io::{self, BufRead};
  
  ##USER_CODE_HERE##
  
  fn main() {
    let stdin = io::stdin();
    let mut input = stdin.lock().lines().map(|l| l.unwrap());
    let input: String = input.next().unwrap().parse().unwrap();
    let result = reverseString(input);
    println!("{}", result);
  }
      