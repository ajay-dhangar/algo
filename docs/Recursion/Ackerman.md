---
id: ackerman-function 
title: Ackerman Function Using Recursion
sidebar_label: Generate Ackerman Function value 
description: "The Ackermann function is a recursive function that grows incredibly fast and is often used to demonstrate the power and limitations of recursion. Defined with two arguments,m and n, it exhibits rapid growth even for small inputs, making it a classic example in theoretical computer science. Unlike simpler recursive functions, it is non-primitive recursive, meaning it cannot be expressed using basic loops. This function challenges computational limits, often exceeding recursion stack sizes in practical programming environments. Its main use is in studying recursion, computability, and the limits of algorithms."
tags: [Ackerman , recursion, dsa]
---
## Ackerman Function Via Recursion

**Problem Statement:**

The **Ackermann function** is a mathematical recursive function with two non-negative integer inputs, m and n, which grows rapidly and far exceeds the growth rate of most commonly known functions like exponentiation or factorials. The problem at hand is to  compute the Ackermann function for given values of m and n , based on its recursive definition. This function provides an interesting challenge due to its steep growth, making it both a theoretical tool in studying recursion and a practical test of a system's recursion limits.

**Detailed Problem Breakdown:**

1. **Recursive Definition:**
   The Ackermann function is defined by the following recursive rules:


When **m**=**0**,the function simply returns n+1 .

When m>0and n=0 it recursively calls A(m−1,1).

When m>0 and n>0, it makes two recursive calls, first to A(m,n−1) and then to A(m−1,A(m,n−1)).

**Properties of the Ackermann Function:**

* **Extremely fast growth** : Even for small values of mm**m** and nn**n**, the result grows extremely fast. For instance, A(4,2) leads to a massive number that is impractical to compute manually.
* **Non-primitive recursive** : Unlike factorials or Fibonacci sequences, the Ackermann function cannot be computed using simple loops. It is a classic example of a function that cannot be described by "primitive recursion," which makes it computationally expensive.

**Computational Challenge:**

* **Depth of Recursion** : The function's deep recursion makes it difficult for programming environments that have recursion depth limits (e.g., Python’s default recursion limit is 1000). Handling larger values of m and n often requires increasing this limit.
* **Stack Overflow Risks** : If not managed correctly, the Ackermann function can lead to a stack overflow error due to the high number of nested recursive calls.
* **Objective:**

  * Write a function or program to calculate A(m,n)A(m, n)**A**(**m**,**n**) based on the given recursive rules.
  * Optimize or adjust the program to handle recursion depth and efficiently compute for small values of mm**m** and nn**n**, while recognizing the impracticality of large inputs.

  **Example:**
  For small values of m and n, such as A(2,2)):
* A(2,2)=9

  This can be traced through several recursive steps, showcasing how each call is 			        nested deeply within others.

#### Explanation:

* **Base Case (m = 0):** If m=0, the function simply returns n+1. This acts as the termination point for recursive calls when mm**m** becomes zero.
* **Recursive Case 1 (m > 0 and n = 0):** If m is greater than 0 and n=0, the function makes a recursive call to A(m−1,1). This reduces the value of m by 1 and resets n to 1.
* **Recursive Case 2 (m > 0 and n > 0):** If both mm**m** and nn**n** are greater than 0, the function first computes A(m,n−1) and then recursively calls A(m−1,result of A(m,n−1)).

### **Example Walkthrough:**

Lets compute A(2,2):

1. A(2,2) calls A(1,A(2,1))
2. A(2,1)calls A(1,A(2,0))
3. A(2,0) calls A(1,1) , which calls A(0,2)=3
4. Now, A(2,0)=3, so A(2,1)=A(1,3)
5. A(1,3) calls A(0,4)=5
6. A(2,1)=5, so A(2,2)=A(1,5)
7. A(1,5)=A(0,6)=7

Thus, A(2,2)=7.

#### Complexity :

### Time Complexity

The **time complexity** of the Ackermann function is extremely high and difficult to express in standard notation due to its deeply recursive nature. It is considered  **non-primitive recursive** , growing faster than any primitive recursive function. As mm**m** and nn**n** increase, the number of recursive calls expands exponentially. For small values, the function may seem manageable, but for values like A(4,n), the time required for computation escalates rapidly, leading to an impractical number of operations. While it doesn't fit neatly into Big-O notation, it exemplifies super-exponential growth, illustrating its theoretical limits in computation.

### Space Complexity

The **space complexity** of the Ackermann function is determined by the maximum depth of the recursion stack, which can be expressed as  **O(m + n)** . Each recursive call adds a new frame to the stack, and as the function makes multiple nested calls, the memory usage increases significantly. This rapid expansion can lead to stack overflow errors, especially when handling larger inputs. As a result, the function demands substantial memory resources, making it impractical for high values without careful control of recursion depth. Overall, both time and space complexities highlight the Ackermann function's role in understanding the limits of recursion in computational theory

### Limitations and Considerations

The Ackermann function, while a fascinating theoretical construct, presents several limitations and considerations when implemented in practical computing environments:

**Recursion Depth** :

* The Ackermann function's deep recursion can quickly exceed the default recursion limits of many programming languages, such as Python, which typically has a recursion depth limit of around 1000. This can lead to  **stack overflow errors** , making it impractical to compute for larger values of m and n without adjusting the recursion depth.

**Computational Intensity** :

* Due to its highly recursive nature, the Ackermann function is computationally intensive. For small inputs, it may be feasible to calculate, but as the values increase, the time required grows  **exponentially** , resulting in significant delays or failures in computation.

**Non-primitive Recursion** :

* The function's classification as non-primitive recursive means that it cannot be expressed using basic looping constructs, making it unsuitable for optimization techniques used in simpler recursive functions. This characteristic complicates its use in practical applications where efficiency is crucial.

**Memory Consumption** :

* The space complexity of the function, which can reach  **O(m + n)** , means that it can consume significant amounts of memory for large inputs. The growth of the recursion stack can strain system resources, especially in environments with limited memory availability.

**Practical Applicability** :

* While the Ackermann function is an excellent theoretical example for studying recursion and computability, it has limited practical applications. Most real-world problems do not require such deeply nested recursion, and simpler recursive or iterative methods are often preferred for efficiency and clarity.

**Understanding Recursion** :

* The function serves as a valuable educational tool for understanding the principles of recursion, but its complexity may pose a barrier to learners. Beginners might find it challenging to grasp the implications of such deep recursion without a solid foundation in recursive algorithms.

**Use Cases** :

* While primarily of theoretical interest, the Ackermann function can be used to demonstrate the limits of computational models and the effectiveness of recursion in various contexts. However, its practical use cases remain limited due to the aforementioned challenges.

**C++ implementation :**

**Output :**

Enter values for m and n: 2 3
Ackermann(2, 3) = 9

Enter values for m and n (non-negative integers): 1 4
Ackermann(1, 4) = 6

Enter values for m and n (non-negative integers): 2 5
Ackermann(2, 5) = 13

**Code :**

```cpp
#include <iostream>
#include <stack>
using namespace std;

int ackermann(int m, int n) {
    stack<pair<int, int>> stk; 
    stk.push(make_pair(m, n));  

    while (!stk.empty()) {
        auto current = stk.top();
        stk.pop();
        m = current.first;
        n = current.second;

        if (m == 0) {
            n += 1; 
        } else if (m == 1) {
            n += 2; 
        } else if (m == 2) {
            n = 2 * n + 3;
        } else {
      
            stk.push(make_pair(m - 1, -1)); 
            n = -1; 
            continue;
        }

        while (n == -1 && !stk.empty()) {
            n++; 
            stk.push(make_pair(m, n)); 
            n = -1;
        }

   
        if (n >= 0 && !stk.empty() && stk.top().first == m) {
            stk.pop(); 
            stk.push(make_pair(m - 1, n)); 
        }
    }

    return n;
}

int main() {
    int m, n;
    cout << "Enter values for m and n (non-negative integers): ";
    cin >> m >> n;

    if (m < 0 || n < 0) {
        cout << "Please enter non-negative integers only." << endl;
        return 1;
    }

    int result = ackermann(m, n);
    cout << "Ackermann(" << m << ", " << n << ") = " << result << endl;

    return 0;
}

```
