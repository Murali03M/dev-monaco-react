
  use std::io::{self, BufRead};
  
  ##USER_CODE_HERE##
  
  fn main() {
    let stdin = io::stdin();
    let mut input = stdin.lock().lines().map(|l| l.unwrap());
    let str1: String = input.next().unwrap().parse().unwrap();
  let str2: String = input.next().unwrap().parse().unwrap();
    let result = longestCommonSubsequence(str1, str2);
    println!("{}", result);
  }
      