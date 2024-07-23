
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const input = parseInt(input.shift());
  const result = isPalindrome(input);
  console.log(result);
      