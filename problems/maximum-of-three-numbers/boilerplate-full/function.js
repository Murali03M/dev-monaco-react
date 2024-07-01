
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const num1 = parseInt(input.shift());
  const num2 = parseInt(input.shift());
  const num3 = parseInt(input.shift());
  const result = max_of_three(num1, num2, num3);
  console.log(result);
      