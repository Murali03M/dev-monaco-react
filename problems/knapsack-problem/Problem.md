## Knapsack Problem

The 0/1 Knapsack problem is a classic optimization problem where you are given a set of items, each with a weight and a value, and a knapsack with a maximum weight capacity. The goal is to determine the maximum total value of items that can be included in the knapsack without exceeding the weight capacity. Each item can either be included in the knapsack or excluded (hence the name 0/1 knapsack problem).

### Problem Statement

Write a function that takes an array of item values, an array of item weights, and the maximum weight capacity of the knapsack. The function should return the maximum value that can be obtained by selecting a subset of the items such that their total weight does not exceed the knapsack's capacity.

#### Input
- A list of integers representing the values of the items.
- A list of integers representing the weights of the items.
- A single integer representing the maximum weight capacity of the knapsack.

#### Output
- An integer representing the maximum total value that can be achieved within the given weight capacity.


#### Test case 1

Input

```
[60, 100, 120], [10, 20, 30], 50

```

Output

```
220

```

#### Test case 2

Input

```

[10, 40, 30, 50], [5, 4, 6, 3], 10

```

Output

```
90

```
