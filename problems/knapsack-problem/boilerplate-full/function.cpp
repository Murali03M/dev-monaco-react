
  #include <iostream>
  #include <vector>
  #include <string>
  
  ##USER_CODE_HERE##
  
  int main() {
    std::cin >> values;
  std::cin >> weights;
  std::cin >> capacity;
    int result = knapsack(values, weights, capacity);
    std::cout << result << std::endl;
    return 0;
  }
      