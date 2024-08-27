#include <iostream>
#include <vector>
#include <string>
#include <sstream>


  ##USER_CODE_HERE##


std::vector<int> parseInput(const std::string& input) {
    std::vector<int> result;
    std::stringstream ss(input);
    std::string temp;
    while (getline(ss, temp, ',')) {
        result.push_back(std::stoi(temp));
    }
    return result;
}


  
int main() {
    std::string valuesStr, weightsStr;
    int capacity;

    // Reading input
    std::getline(std::cin, valuesStr);
    std::getline(std::cin, weightsStr);
    std::cin >> capacity;

    // Parsing input strings into vectors
    std::vector<int> values = parseInput(valuesStr);
    std::vector<int> weights = parseInput(weightsStr);

    // Calculating the result
    int result = knapsack(values, weights, capacity);

    // Outputting the result
    std::cout << result << std::endl;

    return 0;
}
