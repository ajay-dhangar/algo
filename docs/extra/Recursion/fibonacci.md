---
id: fibonacci-recursion
title: Generate Fibonacci Sequence with Recursion
sidebar_label: Fibonacci Recursion
sidebar_position: 2
description: "This post explores generating the Fibonacci sequence using recursion. We'll delve into the recursive approach and provide code implementations in multiple languages, including C++, Java, Python, JavaScript, and Go."
tags: [recursion, fibonacci, algorithms]
---

## Fibonacci Sequence with Recursion

The Fibonacci sequence is a famous series of numbers where each number is the sum of the two preceding numbers. Starting from 0 and 1, the sequence goes like this:

0, 1, 1, 2, 3, 5, 8, 13, 21, ...

This sequence has numerous applications in mathematics, computer science, and even nature. Here, we'll implement a recursive approach to generate the Fibonacci sequence.

### Recursive Approach

Recursion is a programming technique where a function calls itself. In the context of the Fibonacci sequence, we can define a function that takes an integer `n` as input and returns the `n`th Fibonacci number.

The recursive definition can be broken down as follows:

- **Base Case:** If `n` is 0 or 1, the corresponding Fibonacci numbers are 0 and 1, respectively.
- **Recursive Case:** For `n` greater than 1, the `n`th Fibonacci number is the sum of the `(n-1)`th and `(n-2)`th Fibonacci numbers.

This approach leverages the fact that each Fibonacci number depends on the two preceding ones.

### Code Implementation

Here's the code implementation in various languages:

**C++**

```c++
#include <iostream>

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

int main() {
    int n;
    std::cout << "Enter the number of terms: ";
    std::cin >> n;

    std::cout << "Fibonacci sequence: ";
    for (int i = 0; i < n; i++) {
        std::cout << fibonacci(i) << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

**Java**

```java
public class Fibonacci {

    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        } else {
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
    }

    public static void main(String[] args) {
        int n = 10; // Change this to desired number of terms

        System.out.println("Fibonacci sequence: ");
        for (int i = 0; i < n; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();
    }
}
```

**Python**

```python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

# Get the number of terms from the user
n = int(input("Enter the number of terms: "))

# Print the Fibonacci sequence
print("Fibonacci sequence: ")
for i in range(n):
    print(fibonacci(i), end=" ")
print()
```

**JavaScript**

```javascript
function fibonacci(n) {
  if (n <= 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

// Get the number of terms from the user
const n = parseInt(prompt("Enter the number of terms: "));

// Print the Fibonacci sequence
console.log("Fibonacci sequence: ");
for (let i = 0; i < n; i++) {
  console.log(fibonacci(i));
}
```
