
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const values = parseInt(input.shift());
  const weights = parseInt(input.shift());
  const capacity = parseInt(input.shift());
  const result = knapsack(values, weights, capacity);
  console.log(result);
      