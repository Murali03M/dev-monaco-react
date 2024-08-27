
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim();

  // Parse input format "[60, 100, 120], [10, 20, 30], 50"
  const match = input.match(/\[(.*?)\], \[(.*?)\], (\d+)/);
  if (!match) {
      console.error("Invalid input format");
      process.exit(1);
  }
  
  const values = match[1].split(',').map(Number);  // Parse the first array of values
  const weights = match[2].split(',').map(Number); // Parse the second array of weights
  const capacity = parseInt(match[3], 10);         // Parse the capacity as an integer
  
  // Run the knapsack algorithm and output the result
  const result = knapsack(values, weights, capacity);
  console.log(result);
  