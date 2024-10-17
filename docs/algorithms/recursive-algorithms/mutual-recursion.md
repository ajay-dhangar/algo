---
id: mutual-recursion
title: Mutual Recursion
sidebar_label: "Mutual Recursion"
sidebar_position: 1
description: An overview of mutual recursion and its applications in programming.
tags: [recursion, algorithms, programming]
---


# Mutual Recursion

## Definition
Mutual recursion occurs when two or more functions recursively call each other. This means that the execution of one function depends on the execution of another, allowing for a collaborative approach to solving problems.

## Why It Is Useful
Mutual recursion is useful for problems where two or more related tasks need to be handled in tandem. It is particularly applicable in:
- Algorithms that involve alternating behaviours, such as even and odd calculations.
- Solving problems in graph theory, where different conditions can trigger different functions.

## Time Complexity Analysis

### Best Case
The best case occurs when the mutual recursion reaches the base case quickly, requiring minimal calls.

**Example:**
For a simple alternating function that checks even and odd:
```python
def is_even(n):
    if n == 0:
        return True
    return is_odd(n - 1)

def is_odd(n):
    if n == 0:
        return False
    return is_even(n - 1)
```
If $ n = 0 $, the function returns immediately.

**Time Complexity:**  
$ O(1) $

### Worst Case
The worst case occurs when the mutual recursion continues to call each other before reaching a base case.

**Example:** Using the same alternating function: For $ n = 5 $, the function makes multiple calls, alternating between `is_even` and `is_odd`.

**Time Complexity:**  
$ O(n) $

## Example Using Mutual Recursion

### Problem: Check Even or Odd

### Dry Run
For $ n = 3 $, the recursive process would look like this:

1. Start with `is_even(3)`
   - Calls `is_odd(2)`
   - Calls `is_even(1)`
   - Calls `is_odd(0)`
   - Returns `False` (base case)
   - Returns `True` (1 is odd)
   - Returns `False` (2 is even)
   - Returns `True` (3 is odd)

**Final Result:** `is_even(3)` returns `False`, indicating that 3 is odd.

## Advantages of Mutual Recursion

1. **Structured Code**: Mutual recursion can provide a more organized structure for code by separating different behaviours into distinct functions.

2. **Clear Logic**: It can make the logic of certain algorithms clearer, especially when two functions are clearly related to the problem at hand.

3. **Natural Problem Solving**: Some problems naturally fit into a mutual recursion pattern, allowing for straightforward implementation.

## Disadvantages of Mutual Recursion

1. **Complexity**: Understanding and debugging mutual recursion can be more complex than single recursion due to the interaction between functions.

2. **Performance Issues**: Similar to tree recursion, mutual recursion can lead to inefficiencies if not optimized, particularly in terms of time complexity.

3. **Stack Overflow Risk**: Deep mutual recursion can also lead to stack overflow errors, especially in languages without tail call optimization.

## Code Implementation of Mutual Recursion

### C Implementation:
```c
#include <stdio.h>

int is_even(int n);
int is_odd(int n);

int is_even(int n) {
    if (n == 0) {
        return 1; // True (0 is even)
    }
    return is_odd(n - 1);
}

int is_odd(int n) {
    if (n == 0) {
        return 0; // False (0 is not odd)
    }
    return is_even(n - 1);
}

int main() {
    int number = 3;
    if (is_even(number)) {
        printf("%d is even\n", number);
    } else {
        printf("%d is odd\n", number);
    }
    return 0;
}
```
### Python Implementation:

```python
def is_even(n):
    if n == 0:
        return True  # 0 is even
    return is_odd(n - 1)

def is_odd(n):
    if n == 0:
        return False  # 0 is not odd
    return is_even(n - 1)

number = 3
if is_even(number):
    print(f"{number} is even")
else:
    print(f"{number} is odd")
```
### Java Implementation :
```java
public class MutualRecursion {
    public static boolean isEven(int n) {
        if (n == 0) {
            return true; // 0 is even
        }
        return isOdd(n - 1);
    }

    public static boolean isOdd(int n) {
        if (n == 0) {
            return false; // 0 is not odd
        }
        return isEven(n - 1);
    }

    public static void main(String[] args) {
        int number = 3;
        if (isEven(number)) {
            System.out.println(number + " is even");
        } else {
            System.out.println(number + " is odd");
        }
    }
}
```
