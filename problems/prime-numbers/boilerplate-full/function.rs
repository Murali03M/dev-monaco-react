
  use std::io::{self, BufRead};
  
  ##USER_CODE_HERE##
  
  fn main() {
    let stdin = io::stdin();
    let mut input = stdin.lock().lines().map(|l| l.unwrap());
    let start: i32 = input.next().unwrap().parse().unwrap();
  let end: i32 = input.next().unwrap().parse().unwrap();
    let result = findPrimes(start, end);
    println!("{}", result);
  }
      