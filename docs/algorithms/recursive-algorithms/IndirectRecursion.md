---
id: indirect-recursion-algo
sidebar_position: 2
title: Indirect Recursion
sidebar_label: Indirect Recursion
---

### Definition:

Indirect recursion occurs when a function calls another function, and eventually, the second function calls the first function back. This process forms a cycle of function calls between two or more functions, instead of a single function calling itself directly.

### Characteristics:

- **Mutual Call:**
  - In indirect recursion, two or more functions call each other in a cyclic manner.
  
- **Base Case:**
  - Each recursive cycle must include a base case to prevent infinite loops and ensure termination.

- **Multiple Functions:**
  - Indirect recursion involves more than one function. A function calls another, which in turn calls the first one back.

### Time Complexity:

- **Time Complexity: O(n)**
  - The time complexity of indirect recursion depends on the number of recursive calls. For simple problems, it is typically linear `O(n)`.

### Space Complexity:

- **Space Complexity: O(n)**
  - Each recursive call uses stack space, leading to a space complexity proportional to the depth of the recursion.

### Example Problems:

1. **Odd and Even Numbers:**

   In this example, we use two functions: one for checking even numbers and another for odd numbers. The function `isEven()` calls `isOdd()`, and `isOdd()` calls `isEven()` until the base case is reached.

   ```cpp
   #include <iostream>
   using namespace std;

   bool isEven(int n);
   bool isOdd(int n);

   bool isEven(int n) {
       if (n == 0) return true;   // Base case
       return isOdd(n - 1);       // Call isOdd
   }

   bool isOdd(int n) {
       if (n == 0) return false;  // Base case
       return isEven(n - 1);      // Call isEven
   }

   int main() {
       int num = 5;
       if (isEven(num)) {
           cout << num << " is even." << endl;
       } else {
           cout << num << " is odd." << endl;
       }
       return 0;
   }
   ```

   - Here, `isEven()` calls `isOdd()`, and `isOdd()` calls `isEven()`. This continues until the base case is met.

2. **Mutually Recursive Functions:**

   Another classic example of indirect recursion is mutually recursive functions, where one function calls another, and the second function calls the first function back in a loop.

   ```cpp
   #include <iostream>
   using namespace std;

   void functionA(int n);
   void functionB(int n);

   void functionA(int n) {
       if (n > 0) {
           cout << "In Function A: " << n << endl;
           functionB(n - 1);  // Call functionB
       }
   }

   void functionB(int n) {
       if (n > 0) {
           cout << "In Function B: " << n << endl;
           functionA(n / 2);  // Call functionA
       }
   }

   int main() {
       int num = 10;
       functionA(num);  // Start the recursion chain
       return 0;
   }
   ```

   - In this example, `functionA()` calls `functionB()`, and `functionB()` calls `functionA()`. The base case for each function ensures termination.

### Recursive Tree:

Just like direct recursion, indirect recursion forms a recursion tree. However, the branches of this tree involve multiple functions that call each other in cycles. Each function call is part of a chain, leading back to earlier calls.

### Applications:

Indirect recursion is often used in:
- State machines
- Parsing algorithms
- Handling mutually exclusive conditions (like odd/even checks)

### Common Challenges:

- **Tracking Function Calls:**
  - Indirect recursion can be more challenging to understand and debug because multiple functions are involved, and keeping track of the flow of execution can be complex.

- **Base Case Design:**
  - Designing appropriate base cases for each function in the recursion cycle is crucial to ensure that the recursion terminates.

### C++ Implementation:

**Odd and Even Checker (Indirect Recursion)**
```cpp
#include <iostream>
using namespace std;

bool isEven(int n);
bool isOdd(int n);

bool isEven(int n) {
    if (n == 0) return true;  // Base case
    return isOdd(n - 1);      // Call isOdd
}

bool isOdd(int n) {
    if (n == 0) return false;  // Base case
    return isEven(n - 1);      // Call isEven
}

int main() {
    int num = 5;
    if (isEven(num)) {
        cout << num << " is even." << endl;
    } else {
        cout << num << " is odd." << endl;
    }
    return 0;
}
```

**Mutually Recursive Functions (Indirect Recursion)**
```cpp
#include <iostream>
using namespace std;

void functionA(int n);
void functionB(int n);

void functionA(int n) {
    if (n > 0) {
        cout << "In Function A: " << n << endl;
        functionB(n - 1);  // Call functionB
    }
}

void functionB(int n) {
    if (n > 0) {
        cout << "In Function B: " << n << endl;
        functionA(n / 2);  // Call functionA
    }
}

int main() {
    int num = 10;
    functionA(num);  // Start the recursion chain
    return 0;
}
```

### Summary:

Indirect recursion occurs when two or more functions call each other in a cycle. It's an important concept in recursive algorithms, but it can be harder to follow due to the involvement of multiple functions. The base cases for each function in the cycle must be carefully designed to ensure the recursion terminates.
