---
id: check-palindrome-using-deque
title: "Check Palindrome Using Deque"
sidebar_label: "Palindrome Check with Deque"
sidebar_position: 9
description: "A guide to checking if a string is a palindrome using a deque data structure for efficient operations."
tags: [data structure, deque, palindrome]
---

# Check Palindrome Using Deque

A palindrome is a string that reads the same forwards and backwards. This guide explains how to check if a string is a palindrome using a **deque** (double-ended queue) data structure, which allows for efficient operations at both ends.

## Introduction

Using a deque to check for palindromes leverages its ability to add or remove elements from both ends in constant time. This makes it a suitable choice for the task, as we can compare characters from the front and back of the string until we reach the center.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwWr4bJaQGsjcIJzTxYf_KG-rUl7g8lpQWlw&s)

## Steps to Check Palindrome

1. **Add** each character of the string to the deque.
2. **Remove and compare** characters from both ends of the deque until the middle is reached.
3. If all pairs match, the string is a palindrome; otherwise, it is not.

## Implementation

### Python Code

```cpp

#include <iostream>
#include <deque>
#include <string>
using namespace std;

bool isPalindrome(const string& s) {
    deque<char> d;

    // Load the deque with each character from the string
    for (char ch : s) {
        d.push_back(ch);
    }

    // Compare characters from both ends
    while (d.size() > 1) {
        if (d.front() != d.back()) {
            return false;  // Not a palindrome if characters don't match
        }
        d.pop_front();  // Remove the front character
        d.pop_back();   // Remove the back character
    }

    return true;  // All pairs matched, so it is a palindrome
}

int main() {
    string str1 = "radar";
    cout << str1 << " is a palindrome: " << (isPalindrome(str1) ? "True" : "False") << endl;

    string str2 = "hello";
    cout << str2 << " is a palindrome: " << (isPalindrome(str2) ? "True" : "False") << endl;

    return 0;
}
```
## Complexity
### Time Complexity:
is_palindrome: 
𝑂(𝑛)
O(n), where 𝑛 is the length of the string (since each character is dequeued once from both ends).
### Space Complexity: 𝑂(𝑛)
O(n), where 𝑛 is the number of characters in the deque.

## Explanation of Code

Initialize a deque with the characters of the string.
Use a while loop to repeatedly remove characters from the front and back of the deque.
Return False if any character pair doesn't match; otherwise, return True when the loop completes.

## Applications
The palindrome check has applications in string processing, data validation, and computer science algorithms. Deques provide an efficient way to check for palindromes with minimal memory overhead.