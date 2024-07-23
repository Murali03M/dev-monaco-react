
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const str1 = parseInt(input.shift());
  const str2 = parseInt(input.shift());
  const result = longestCommonSubsequence(str1, str2);
  console.log(result);
      