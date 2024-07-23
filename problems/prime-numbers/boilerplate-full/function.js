
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const start = parseInt(input.shift());
  const end = parseInt(input.shift());
  const result = findPrimes(start, end);
  console.log(result);
      