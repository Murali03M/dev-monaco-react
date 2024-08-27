
  ##USER_CODE_HERE##
  
  const input1 = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const input =input1.shift();
  const result = reverseString(input);
  console.log(result);
      