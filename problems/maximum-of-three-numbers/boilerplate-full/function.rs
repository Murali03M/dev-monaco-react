
  use std::io::{self, BufRead};
  
  ##USER_CODE_HERE##
  
  fn main() {
    let stdin = io::stdin();
    let mut input = stdin.lock().lines().map(|l| l.unwrap());
    let num1: i32 = input.next().unwrap().parse().unwrap();
  let num2: i32 = input.next().unwrap().parse().unwrap();
  let num3: i32 = input.next().unwrap().parse().unwrap();
    let result = max_of_three(num1, num2, num3);
    println!("{}", result);
  }
      