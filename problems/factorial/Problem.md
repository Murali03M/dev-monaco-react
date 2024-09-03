## Factorial

The factorial of a non-negative integer \( n \) is a mathematical function that multiplies the number \( n \) by every positive integer less than it. Mathematically, the factorial of \( n \) is denoted by \( n! \) and is defined as:

The factorial of 0 is defined as 1 by convention.

### Problem Statement

Write a function that takes a non-negative integer as input and returns its factorial.

#### Input
- A single integer \( n \) where \( 0 \leq n \leq 12 \).

#### Output
- The factorial of the given integer \( n \).


#### Test case 1

Input

```
5
```

Output

```
120
```
#### Test case 2

Input

```
7
```

Output

```
5040
```
### Additional Information

The factorial function grows extremely fast. For example:
- \( 10! = 3,628,800 \)
- \( 12! = 479,001,600 \)

Because of this rapid growth, the problem usually restricts \( n \) to a maximum value, often around 12, to avoid computational overflow and ensure that the factorial can be accurately computed within standard data types in most programming languages.

### Applications of Factorials
Factorials are widely used in various fields such as:
- **Combinatorics:** To calculate combinations and permutations.
- **Probability:** Factorials are used in calculating probabilities, particularly in binomial distributions.
- **Mathematical Series:** Factorials appear in the denominators of terms in series expansions, such as the Taylor series.
- **Algorithms:** Factorials are used in algorithms related to permutations and combinations.

### Complexity
The time complexity of computing the factorial of a number \( n \) is \( O(n) \). Given the constraints, this is efficient and feasible within typical computational limits. The space complexity can be considered \( O(1) \) if computed iteratively, as only a few variables are needed. However, if a recursive approach is used, the space complexity becomes \( O(n) \) due to the call stack.
