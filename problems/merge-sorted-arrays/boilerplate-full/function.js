
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const arr1 = parseInt(input.shift());
  const arr2 = parseInt(input.shift());
  const result = mergeSortedArrays(arr1, arr2);
  console.log(result);
      