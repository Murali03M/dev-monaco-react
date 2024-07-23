
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const num = parseInt(input.shift());
  const result = factorial(num);
  console.log(result);
      