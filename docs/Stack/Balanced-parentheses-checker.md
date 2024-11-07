---
id: balanced-parentheses-checker
title: Balanced-parentheses-checker 
sidebar_label: Balanced-parentheses-checker 
description: "This algorithm checks if the parentheses in a given expression are balanced using a stack to ensure each opening parentheses has a corresponding closing one."  
tags: [dsa, algorithms, stack]
---

### Problem Definition
The goal of this program is to check if an expression containing parentheses is balanced. The expression may contain three types of parentheses:
- Round brackets `()`
- Curly brackets `{}`
- Square brackets `[]`
                                        
An expression is said to be balanced if every opening parenthesis has a corresponding closing parenthesis in the correct order.

### Approach
This program uses a stack data structure to solve the problem of checking whether the parentheses in an expression are balanced. The stack is ideal for this task as it allows tracking unmatched opening parentheses, which are then compared with the closing parentheses.

### Algorithm Steps
Scan the expression:
1. If an opening parenthesis `((, {, or [)` is encountered, push it onto the stack.
2. If a closing parenthesis `(), }, or ])` is encountered, check if it matches the top of the stack:
3. If the stack is empty or the parentheses don't match, the expression is unbalanced.
4. At the end: If the stack is empty, the expression is balanced; otherwise, it's unbalanced.

### Steps Involved

1. **Initialization**:
   - Create an empty stack to hold opening parentheses.

2. **Iterate Through the Expression**:
   - For each character in the expression:
     - **If the character is an opening parenthesis** (`(`, `{`, `[`):
       - Push the character onto the stack.
     - **If the character is a closing parenthesis** (`)`, `}`, `]`):
       - Check if the stack is empty:
         - If it is empty, return `false` (unmatched closing parenthesis).
       - If the stack is not empty, pop the top character from the stack:
         - Check if the popped character matches the corresponding opening parenthesis for the current closing parenthesis:
         - If it does not match, return `false` (mismatched parentheses).         

### Time Complexity
For each character in the expression, insertion and deletion operations (push and pop) on the stack take constant time `O(1)`. The algorithm scans through the expression once, making the time complexity `O(n)`, where `n` is the length of the expression.

### Space Complexity
The stack can hold at most `n` characters in the worst case (when all characters are opening parentheses), so the space complexity is `O(n)`.

### Sample Input
  - Enter an expression: `a+(b+c)-d+[e*f+{g-h+(x-y)}]`

### Sample Output
  - The parentheses are balanced.


### C++ Implementation

```cpp

#include <iostream>
#include <stack>
#include <string>

bool isBalanced(const std::string& expression);

int main() {
    std::string expression;
    std::cout << "Enter an expression: ";
    std::getline(std::cin, expression);

    if (isBalanced(expression)) {
        std::cout << "The parentheses are balanced.\n";
    } else {
        std::cout << "The parentheses are not balanced.\n";
    }

    return 0;
}

// Function to check if the parentheses in the expression are balanced
bool isBalanced(const std::string& expression) {
    std::stack<char> stack;

    for (char ch : expression) {
        if (ch == '(' || ch == '{' || ch == '[') {
            stack.push(ch);
        } else if (ch == ')' || ch == '}' || ch == ']') {
            if (stack.empty()) {
                return false; // Unmatched closing parenthesis
            }
            char top = stack.top();
            stack.pop();
            if ((ch == ')' && top != '(') || 
                (ch == '}' && top != '{') || 
                (ch == ']' && top != '[')) {
                return false; // Mismatched parentheses
            }
        }
    }
    return stack.empty(); // If stack is empty, parentheses are balanced
}

```
