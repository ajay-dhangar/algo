---
id: Josephus-problem-dsa
title: Josephus Problem Recursion
sidebar_label: Josephus Problem
sidebar_position: 7
description: "The Josephus problem is a theoretical problem related to a certain elimination game. It is often solved using recursion, where the goal is to determine the safe position in a group of people standing in a circle, eliminating every k-th person."
tags: [josephus, recursion, dsa]
---

## Josephus Problem | Return the Safe Position

Problem Statement: The Josephus problem is a famous theoretical problem. There are n people standing in a circle, and every k-th person is eliminated until only one person remains. The task is to find the position of the last person standing (safe position). The positions are numbered from 0 to n-1.
Recursive Solution
The idea is to use a recursive approach to find the position of the safe person. We know that when only one person remains, the safe position is 0. Then we build the solution backwards, considering the elimination of every k-th person.

Recursive Solution
The idea is to use a recursive approach to find the position of the safe person. We know that when only one person remains, the safe position is 0. Then we build the solution backwards, considering the elimination of every k-th person.

### C++ implementation
```cpp
#include <bits/stdc++.h>
using namespace std;

class Josephus {
  public:
    // Recursive function to find the safe position
    int josephus(int n, int k) {
      // Base case: only one person is left
      if (n == 1)
        return 0;
      
      // Recursive case: Reduce the problem by eliminating one person
      // The position returned by josephus(n-1, k) is adjusted for the new circle size.
      return (josephus(n - 1, k) + k) % n;
    }
};

int main() {
  int n = 7; // Total number of people in the circle
  int k = 3; // Every k-th person is eliminated
  
  Josephus obj;
  int safe_position = obj.josephus(n, k);
  
  cout << "The safe position is: " << safe_position << endl;
  return 0;
}
```