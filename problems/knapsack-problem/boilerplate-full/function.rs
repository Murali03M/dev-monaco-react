
  use std::io::{self, BufRead};
  
  ##USER_CODE_HERE##
  
  fn main() {
    let stdin = io::stdin();
    let mut input = stdin.lock().lines().map(|l| l.unwrap());
    let values: unknown = input.next().unwrap().parse().unwrap();
  let weights: unknown = input.next().unwrap().parse().unwrap();
  let capacity: i32 = input.next().unwrap().parse().unwrap();
    let result = knapsack(values, weights, capacity);
    println!("{}", result);
  }
      