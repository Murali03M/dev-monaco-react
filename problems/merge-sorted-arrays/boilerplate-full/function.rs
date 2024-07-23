
  use std::io::{self, BufRead};
  
  ##USER_CODE_HERE##
  
  fn main() {
    let stdin = io::stdin();
    let mut input = stdin.lock().lines().map(|l| l.unwrap());
    let arr1: unknown = input.next().unwrap().parse().unwrap();
  let arr2: unknown = input.next().unwrap().parse().unwrap();
    let result = mergeSortedArrays(arr1, arr2);
    println!("{}", result);
  }
      