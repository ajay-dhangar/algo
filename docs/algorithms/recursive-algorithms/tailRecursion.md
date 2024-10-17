---
id: tail_recursion
title: Tail Recursion
sidebar_label: "Tail Recursion"
sidebar_position: 3
description: An overview of Tail Recursion and its applications in programming.
tags: [recursion, algorithms, programming]
---

# Tail Recursion

## Definition
**Tail recursion** is a form of recursion where the recursive call is the last operation in the function. After the recursive call, there are no additional operations left for the function to perform. In tail recursion, the result of the recursive call is immediately returned, allowing some compilers or interpreters to optimize the function call stack, transforming it into an iterative loop.

- **Key Characteristic:** The recursive call occurs at the end of the function, and no computations follow it.

## Why Is It Useful?
- **Stack Optimization:** Tail recursion allows compilers to optimize the call stack, using constant memory space instead of creating new stack frames for each recursive call. This process is called **Tail Call Optimization (TCO)**.
- **Prevents Stack Overflow:** In deeply recursive problems, tail recursion minimizes the risk of stack overflow by avoiding excessive memory consumption.
- **Improved Performance:** By reducing overhead through stack frame reuse, tail recursion can perform similarly to iterative solutions.

# Time Complexity Analysis

## Best Case Scenario:
The best case occurs when the function is called with minimal depth, such as when the recursion can terminate early.

### Example:
A tail-recursive function that calculates the sum of numbers from `1` to `n`:

```python
def sum_tail(n, acc=0):
    if n == 0:
        return acc
    else:
        return sum_tail(n - 1, acc + n)
```
**Time Complexity (Best Case):** **O(1)** — constant time when n = 1 or the recursion depth is minimal.The recursion stops after one step !

## Worst Case Scenario:
The **worst case** happens when the recursion depth is maximum, requiring many recursive calls.

### Example:
For n = 1000, the function will call itself 1000 times, each time reducing n by 1.

**Time Complexity (Worst Case):** **O(n)** — linear time proportional to n, where n is the depth of recursion.

## Example: Tail Recursive Factorial Calculation
Tail Recursion for Factorial
python
```c
def factorial_tail(n, acc=1):
    if n == 0:
        return acc
    else:
        return factorial_tail(n - 1, acc * n)
```
## Dry Run Example for factorial_tail(5)
### For factorial_tail(5):

- `factorial_tail(5, 1)` → Recursive call `factorial_tail(4, 5)`
- `factorial_tail(4, 5)` → Recursive call `factorial_tail(3, 20)`
- `factorial_tail(3, 20)` → Recursive call `factorial_tail(2, 60)`
- `factorial_tail(2, 60)` → Recursive call `factorial_tail(1, 120)`
- `factorial_tail(1, 120)` → Recursive call `factorial_tail(0, 120)`

At this point, `n == 0`, so the function returns `120` (`5!`).




## Advantages of Tail Recursion
- **Memory Efficient:** It uses constant stack space due to tail call optimization, preventing stack overflow.
- **Simple and Readable:** The code remains simple and closely follows the recursive logic of the problem.
- **Performance Boost:** Tail recursion can be optimized to run as efficiently as loops.

## Disadvantages of Tail Recursion
- **Compiler Dependency:** Not all programming languages or compilers support tail call optimization, which may prevent it from running efficiently in those cases.
- **Limited Use Cases:** It is only beneficial for problems that can be naturally solved using recursion.

## Implementation

### C Implementation
```c
#include <stdio.h>

int factorial_tail(int n, int acc) {
    if (n == 0)
        return acc;
    return factorial_tail(n - 1, acc * n);
}

int main() {
    int n = 5;
    printf("Factorial of %d is %d\n", n, factorial_tail(n, 1));
    return 0;
}

```

### Python Implementation:

```c
def factorial_tail(n, acc=1):
    if n == 0:
        return acc
    else:
        return factorial_tail(n - 1, acc * n)
```

### Java Implementation :
```c
public class TailRecursion {
    public static int factorialTail(int n, int acc) {
        if (n == 0) {
            return acc;
        }
        return factorialTail(n - 1, acc * n);
    }

    public static void main(String[] args) {
        int n = 5;
        System.out.println("Factorial of " + n + " is " + factorialTail(n, 1));
    }
}

```

