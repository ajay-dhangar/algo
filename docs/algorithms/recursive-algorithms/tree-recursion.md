---
id: tree-recursion
title: Tree Recursion
sidebar_label: "Tree Recursion"
sidebar_position: 4
description: An overview of Tree Recursion and its applications in programming.
tags: [recursion, algorithms, programming]
---

# Tree Recursion

## Definition
Tree recursion is a type of recursion where a function makes multiple recursive calls, creating a branching structure similar to a tree. Each recursive call can further lead to multiple other calls, resulting in a tree-like structure of calls.

## Why It Is Useful
Tree recursion is useful for solving problems that can be broken down into smaller subproblems, particularly in scenarios where the solution to the problem involves considering all possible combinations or arrangements. Common applications include:
- Generating permutations and combinations
- Solving problems in combinatorial optimization
- Traversing complex data structures like trees and graphs

## Time Complexity Analysis
### Best Case
The best case occurs when the recursive function immediately reaches a base case without making multiple calls. 

**Example:**
For a recursive function that sums numbers until it reaches zero:
```python
def sum_numbers(n):
    if n <= 0:
        return 0
    return n + sum_numbers(n - 1)
```

If \(n = 0\), it will return immediately.

**Time Complexity:**  
\( **O(1)** \)

### Worst Case
The worst case occurs when the recursive function generates a complete tree of calls before reaching a base case.

**Example:** Consider the Fibonacci function defined recursively:
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```
 


For n=5, the function makes multiple calls, leading to a binary tree structure of calls.

Time Complexity:
\( O(2^n) \)
## Example Using Tree Recursion

### Problem: Generate All Permutations of a List

### Dry Run
For the list `[1, 2]`, the recursive process would look like this:

1. Start with the list `[1, 2]`
   - Choose `1` and permute `[2]` → yields `[1, 2]`
   - Choose `2` and permute `[1]` → yields `[2, 1]`
2. The results are `[[1, 2], [2, 1]]`

## Advantages of Tree Recursion

1. **Simplicity**: Tree recursion can lead to simpler and more readable code, especially for problems that inherently require exploring multiple possibilities, such as generating permutations or combinations.

2. **Natural Fit for Certain Problems**: Many problems, particularly those involving combinatorial constructs or tree-like structures, can be solved more naturally using tree recursion.

3. **Flexible Exploration**: It allows for an exhaustive exploration of all possible solutions, making it suitable for problems where all configurations need to be considered.

## Disadvantages of Tree Recursion

1. **High Time Complexity**: Tree recursion can lead to exponential time complexity, especially in problems like the Fibonacci sequence, where the same subproblems are solved multiple times.

2. **Space Complexity**: The recursive calls can consume a significant amount of stack space, potentially leading to stack overflow for large inputs.

3. **Inefficiency**: Due to the overlapping subproblems, many tree recursive algorithms can be inefficient. Memoization or dynamic programming is often preferred in such cases to optimize performance.


## Code Implementation

### C Implementation

```c
#include <stdio.h>

void swap(char *x, char *y) {
    char temp = *x;
    *x = *y;
    *y = temp;
}

void permute(char *a, int l, int r) {
    if (l == r) {
        printf("%s\n", a);
    } else {
        for (int i = l; i <= r; i++) {
            swap((a + l), (a + i));
            permute(a, l + 1, r);
            swap((a + l), (a + i)); // backtrack
        }
    }
}

int main() {
    char str[] = "12";
    int n = strlen(str);
    permute(str, 0, n - 1);
    return 0;
}
```

### Python Implementation:

```python
def permute(s):
    if len(s) == 1:
        return [s]
    result = []
    for i, char in enumerate(s):
        for perm in permute(s[:i] + s[i+1:]):
            result.append(char + perm)
    return result

# Example Usage
print(permute("12"))
```
### Java Implementation:

```java
import java.util.ArrayList;

public class Permutation {
    public static void permute(String str, String current) {
        if (str.length() == 0) {
            System.out.println(current);
        } else {
            for (int i = 0; i < str.length(); i++) {
                permute(str.substring(0, i) + str.substring(i + 1), current + str.charAt(i));
            }
        }
    }

    public static void main(String[] args) {
        String str = "12";
        permute(str, "");
    }
}
```
