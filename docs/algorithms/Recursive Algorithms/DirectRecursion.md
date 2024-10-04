---
id: direct-recursion-algo
sidebar_position: 1
title: Direct Recursion
sidebar_label: Direct Recursion
---

### Definition:

Direct recursion is when a function calls itself directly. The function keeps calling itself with a modified argument until a base case is met, which stops the recursion. Direct recursion is used to solve problems that can be broken down into smaller, similar subproblems.

### Characteristics:

- **Self-Calling Function:**
  - A function is directly recursive if it calls itself within its own body.

- **Base Case:**
  - A base case is required to stop the recursive calls, preventing infinite recursion.

- **Multiple Calls:**
  - The function may call itself once or multiple times depending on the problem.

### Time Complexity:

- **Time Complexity: O(n)**
  The time complexity of direct recursion depends on the problem. For simple problems like calculating a factorial, it usually takes linear time `O(n)` where `n` is the input size.

### Space Complexity:

- **Space Complexity: O(n)**
  Each recursive call takes up space on the call stack, leading to a space complexity proportional to the depth of the recursion.

### Example Problems:

1. **Factorial Function:**

   The factorial of a number `n` is defined as `n! = n * (n-1) * (n-2) * ... * 1`. We can calculate the factorial using direct recursion.

   ```cpp
   #include <iostream>
   using namespace std;

   int factorial(int n) {
       if (n <= 1) return 1;  // Base case
       return n * factorial(n - 1);  // Recursive call
   }

   int main() {
       int num = 5;
       cout << "Factorial of " << num << " is " << factorial(num) << endl;
       return 0;
   }
   ```

   - In this example, the function `factorial()` calls itself until `n` becomes 1, which is the base case.

2. **Sum of First N Natural Numbers:**

   We can use direct recursion to find the sum of the first `n` natural numbers.

   ```cpp
   #include <iostream>
   using namespace std;

   int sum(int n) {
       if (n == 0) return 0;  // Base case
       return n + sum(n - 1);  // Recursive call
   }

   int main() {
       int n = 10;
       cout << "Sum of first " << n << " natural numbers is " << sum(n) << endl;
       return 0;
   }
   ```

   - In this example, the function `sum()` calls itself, reducing the value of `n` by 1 at each step until it reaches 0, the base case.

3. **Fibonacci Sequence:**

   The Fibonacci sequence is a series where each number is the sum of the two preceding ones, starting with 0 and 1. We can compute the nth Fibonacci number using direct recursion.

   ```cpp
   #include <iostream>
   using namespace std;

   int fibonacci(int n) {
       if (n <= 1) return n;  // Base cases
       return fibonacci(n - 1) + fibonacci(n - 2);  // Recursive calls
   }

   int main() {
       int n = 5;
       cout << "Fibonacci of " << n << " is " << fibonacci(n) << endl;
       return 0;
   }
   ```

   - Here, the function `fibonacci()` calls itself twice to compute the Fibonacci numbers for `n-1` and `n-2`.

### Recursive Tree:

Direct recursion often generates a recursion tree, where each function call spawns new calls, visualizing the branching structure of recursive calls.

### Common Applications:

- Factorial calculation
- Fibonacci sequence
- Tower of Hanoi
- Sum of a series
- Tree traversal

### C++ Implementation:

**Factorial Example (Direct Recursion)**
```cpp
#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;  // Base case
    return n * factorial(n - 1);  // Recursive call
}

int main() {
    int num = 5;
    cout << "Factorial of " << num << " is " << factorial(num) << endl;
    return 0;
}
```

**Sum of First N Natural Numbers (Direct Recursion)**
```cpp
#include <iostream>
using namespace std;

int sum(int n) {
    if (n == 0) return 0;  // Base case
    return n + sum(n - 1);  // Recursive call
}

int main() {
    int n = 10;
    cout << "Sum of first " << n << " natural numbers is " << sum(n) << endl;
    return 0;
}
```

**Fibonacci Example (Direct Recursion)**
```cpp
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;  // Base case
    return fibonacci(n - 1) + fibonacci(n - 2);  // Recursive call
}

int main() {
    int n = 5;
    cout << "Fibonacci of " << n << " is " << fibonacci(n) << endl;
    return 0;
}
```

### Summary:

Direct recursion is a simple yet powerful tool for solving problems that involve repetitive or self-similar subproblems. The key challenge lies in identifying the base case to prevent infinite recursion and understanding the problem well enough to break it down recursively.
