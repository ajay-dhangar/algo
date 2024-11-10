id: happy-number
title: "Happy Number Algorithm"
sidebar_label: Happy Number
tags: [Leetcode, Math, DSA, Happy Number]
description: Solve the Happy Number problem using mathematical operations to determine if a number leads to 1 after repeatedly squaring and summing its digits.
Happy Number Algorithm
Description
The Happy Number problem is a math problem that involves determining whether a given integer, when repeatedly replaced by the sum of the squares of its digits, eventually equals 1 (making it a "happy" number).

Problem Definition
Given:

An integer n.
Objective:

Determine if n is a happy number. A number is considered happy if, after replacing it by the sum of the squares of its digits repeatedly, the result eventually reaches 1. If it enters a cycle that doesn't include 1, it is not a happy number.
Algorithm Overview
Sum of Squares Calculation:

Define a helper function to calculate the sum of squares of the digits of n.
Cycle Detection with HashSet:

Use a HashSet to track sums generated at each step. If the sum equals 1, n is a happy number.
If a sum repeats (detected by checking the set), it indicates a cycle, meaning n is not a happy number.
Loop until Result or Cycle:

Continuously calculate the sum of squares for each resulting number until either 1 is reached or a repeated number is detected.
Time Complexity
Time Complexity: O(log n), as the number of steps generally reduces each time by summing squared digits.
Space Complexity: O(log n) for the HashSet storing intermediate sums.

C++ Implementation
```
cpp
Copy code
#include <unordered_set>
using namespace std;

bool isHappy(int n) {
    unordered_set<int> seen;

    while (n != 1 && seen.find(n) == seen.end()) {
        seen.insert(n);
        int sum = 0;

        while (n > 0) {
            int digit = n % 10;
            sum += digit * digit;
            n /= 10;
        }
        
        n = sum;
    }

    return n == 1;
}
```
This algorithm checks whether a number is happy by tracking sums and breaking if a loop is detected, efficiently determining happiness status.