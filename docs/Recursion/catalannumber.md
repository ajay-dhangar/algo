---
id: Catalan Number 
title: Catalan Number Using Recursion
sidebar_label: Generate Catalan Number 
description: "The Catalan number sequence is a fundamental concept in combinatorics, appearing in numerous counting problems such as valid parentheses expressions, binary search trees, and polygon triangulations. The nth Catalan number is defined recursively as:
C(n)= i=0∑n−1
       C(i)×C(n−i−1) with 𝐶(0)=1 . This recursive structure allows us to break complex problems into smaller subproblems, making Catalan numbers a versatile tool in algorithm design and mathematical theory. This contribution focuses on implementing the recursive approach for generating Catalan numbers."
tags: [CatalanNumber , recursion, dsa]
---
## Catalan Number  Via Recursion

**Problem Statement:**

Catalan numbers are a sequence of natural numbers that have numerous applications in combinatorics. They are defined based on recursive relationships and have a variety of interpretations in problems involving counting structures like valid sequences of parentheses, binary search trees, paths in grids, and polygon triangulations.

For example:

**Balanced Parentheses** : The nth Catalan number counts how many valid ways there are to arrange `n` pairs of parentheses. For `n = 3`, there are 5 valid sequences: `((())), ()(()), (())(), ()()(), (()())`.

**Binary Search Trees** : It represents the number of distinct binary search trees that can be constructed with `n` distinct elements.

**Recursive Definition:**

The recursive formula for Catalan numbers is:

C(n)= i=0∑n−1
       C(i)×C(n−i−1)

with the base case C(0)=1.

#### Explanation:

* The recursive nature reflects how larger structures can be built from smaller ones. For example, in the case of valid parentheses sequences, placing a pair of parentheses at the outermost positions leaves a smaller valid subsequence inside and another valid subsequence after the outer parentheses.
* This recursive division is mirrored in the summation, where C(i) represents the number of valid structures in the left subsequence, and C(n−i−1) represents the right subsequence.

#### Complexity :

**Dynamic Programming** : A more efficient approach is to use **dynamic programming** to store the results of previous computations in a table and reuse them, reducing the time complexity to O(n^2). This avoids recalculating previously computed values and significantly improves performance.

**Closed-Form Formula** : Another alternative is to use the closed-form formula for Catalan numbers:

C(n)=[1/n+1] (2n )

Using this formula with precomputed binomial coefficients can provide a faster, non-recursive solution with O(n) time complexity.x`

### Limitations and Considerations

1. **Performance** : For larger values of `n`, the recursive approach will take significantly longer to compute. This is because of the exponential time complexity and the repeated computation of subproblems.
2. **Optimization** : If efficiency is a concern, switching to dynamic programming or using the closed-form formula is recommended for values of `n` larger than 20. These methods reduce the computational overhead and are more practical for larger inputs.
3. **Stack Depth** : Recursive approaches are also limited by the system's recursion depth limit, which may cause a stack overflow for very large values of `n` (though this is less of a concern for values up to 20).

**C++ implementation :**

**Output :**

Enter a value for n: 3
Catalan number C_3 is 5

Enter a value for n: 5
Catalan number C_5 is 42 


**Code :**

```cpp
 #include <iostream>

unsigned long long catalan(int n)
{
    if (n == 0)
        return 1;

    unsigned long long result = 0;

    for (int i = 0; i < n; i++)
    {
        result += catalan(i) * catalan(n - 1 - i);
    }

    return result;
}

int main()
{
    int n;

    std::cout << "Enter a value for n: ";
    std::cin >> n;

    if (n < 0)
    {
        std::cout << "n must be a non-negative integer." << std::endl;
        return 1;
    }

    std::cout << "Catalan number C_" << n << " is " << catalan(n) << std::endl;

    return 0;
}


```
