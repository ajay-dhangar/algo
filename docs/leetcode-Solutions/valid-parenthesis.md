---
id: valid-parentheses
sidebar_position: 4
title: Valid Parentheses
sidebar_label: Valid Parentheses
description: "This document explains the Valid Parentheses problem, including its description, approach, and implementation in C++."
tags: [leetcode, algorithms, problem-solving]
---

# valid-parentheses

## Description
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['`, and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

### Example:
**Input**: `s = "()[]{}"`  
**Output**: `true`

**Input**: `s = "(]"`  
**Output**: `false`

## Approach
To determine if the input string contains valid parentheses, we can use the following approach:

1. **Stack Data Structure**: Use a stack to track the opening parentheses as we encounter them.
2. **Matching Closing Parentheses**: When encountering a closing parenthesis, check if the stack is not empty and if the top element matches the corresponding opening parenthesis. If it does, pop the top element from the stack.
3. **Valid String**: The string is valid if at the end, the stack is empty (i.e., every opening parenthesis has been closed in the correct order).

### Steps:
- Traverse each character of the string:
  - If it's an opening parenthesis (`'('`, `'{'`, `'['`), push it onto the stack.
  - If it's a closing parenthesis (`')'`, `'}'`, `']'`), check if it matches the top of the stack. If it matches, pop the top; if it doesn't, return false.
- After processing all characters, return true if the stack is empty, indicating all parentheses are properly matched.

## C++ Implementation

```cpp
#include <stack>
#include <unordered_map>

class Solution {
public:
    bool isValid(std::string s) {
        std::stack<char> st;
        std::unordered_map<char, char> mappings = {
            {')', '('},
            {'}', '{'},
            {']', '['}
        };

        for (char c : s) {
            // If the character is a closing bracket
            if (mappings.find(c) != mappings.end()) {
                // Get the top element of the stack, or a dummy value if the stack is empty
                char topElement = st.empty() ? '#' : st.top();

                // If the mapping for the closing bracket doesn't match the stack's top element, return false
                if (topElement == mappings[c]) {
                    st.pop();
                } else {
                    return false;
                }
            } else {
                // If it's an opening bracket, push it onto the stack
                st.push(c);
            }
        }

        // If the stack is empty, then we have a valid string
        return st.empty();
    }
};
```
Time Complexity: O(n)  <br/>
Space Complexity: O(n) 