---
id: balanced-parentheses
title: Balanced Parentheses
sidebar_label: Balanced Parentheses
description: "The Balanced Parentheses problem involves determining whether a given string of parentheses is valid, meaning every opening bracket has a corresponding closing bracket in the correct order."
tags: [dsa, algorithms, stack]
---

### Definition:
The Balanced Parentheses problem is a classic problem in computer science that checks if a string containing parentheses is valid. A string is considered valid if every opening parenthesis has a corresponding closing parenthesis and they are properly nested.

### Problem Statement:
Given a string `s` consisting of parentheses (i.e., `(`, `)`, `{`, `}`, `[`, `]`), determine if the input string is valid. An input string is valid if:
- Open brackets are closed by the same type of brackets.
- Open brackets are closed in the correct order.

### Algorithm Steps:

1. **Initialize a Stack:** Use a stack to keep track of opening parentheses.
2. **Iterate through the string:** For each character in the string:
   - If it is an opening bracket, push it onto the stack.
   - If it is a closing bracket, check if the stack is not empty and the top of the stack is the corresponding opening bracket; if so, pop the stack. If not, return false.
3. **Final Check:** After processing all characters, if the stack is empty, return true (all brackets are matched); otherwise, return false.

### Steps Involved:
**1. Stack Structure:**
   - Use a stack data structure to store opening brackets.

**2. Functions:**
   - `isValid(s: str) -> bool:` Checks if the parentheses in the string are balanced.

### Time Complexity:
- The time complexity of the `isValid` function is `O(n)`, where `n` is the length of the string. This is because we scan through the string once, and each push/pop operation on the stack takes constant time.

### Space Complexity:
- The space complexity is `O(n)` in the worst case, where all characters in the string are opening brackets, and they are stored in the stack.

### Sample Input:
"()" "()[]{}" "(]" "([)]" "{[]}"

### Sample Output:
true true false false true

### Explanation of Sample:
- The input strings are evaluated for balanced parentheses.
- `()`, `()[]{}`, and `{[]}` are valid, while `(]` and `([)]` are not, due to mismatched or improperly nested brackets.

### Python Implementation:

```python
def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}

    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)

    return not stack

# Sample Test Cases
test_cases = ["()", "()[]{}", "(]", "([)]", "{[]}"]
for case in test_cases:
    print(f"{case}: {isValid(case)}")

```

### C++ Implementation:
```cpp
#include <iostream>
#include <stack>
#include <unordered_map>
using namespace std;

bool isValid(string s) {
    stack<char> stack;
    unordered_map<char, char> mapping = {{')', '('}, {'}', '{'}, {']', '['}};

    for (char &c : s) {
        if (mapping.count(c)) {
            char top_element = stack.empty() ? '#' : stack.top();
            stack.pop();
            if (mapping[c] != top_element) {
                return false;
            }
        } else {
            stack.push(c);
        }
    }

    return stack.empty();
}

// Sample Test Cases
int main() {
    string test_cases[] = {"()", "()[]{}", "(]", "([)]", "{[]}"};
    for (const string& case : test_cases) {
        cout << case << ": " << (isValid(case) ? "true" : "false") << endl;
    }
    return 0;
}
```
