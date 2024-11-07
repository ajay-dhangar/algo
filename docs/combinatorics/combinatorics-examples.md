---
id: combinatorics-example
title: combinatorics in  data structure
sidebar_label: Combinatorics Examples
sidebar_position: 2
description: Combinatorics is a branch of mathematics dealing with combinations, arrangements, and counting of objects.
tags: [Competitive Programming,math,counting]

---

# Combinatorics in C++ with Examples

## Introduction

In this section, we will see how to implement basic combinatorics concepts like permutations, combinations, and some common problems in C++.

## 1. **Permutations**

To generate all possible permutations of a given set of elements, C++ provides the `std::next_permutation` function. Below is an example using this function.

### Example: Generating All Permutations of a String

```cpp
#include <iostream>
#include <algorithm>
#include <string>

int main() {
    std::string s = "ABC";
    std::sort(s.begin(), s.end());
    
    std::cout << "All permutations of the string \"ABC\":\n";
    do {
        std::cout << s << "\n";
    } while (std::next_permutation(s.begin(), s.end()));
    
    return 0;
}
```
```
ABC
ACB
BAC
BCA
CAB
CBA
```

## 2. Combinations
```cpp
#include <iostream>
#include <vector>

void printCombination(const std::vector<int>& arr, std::vector<int>& comb, int start, int r) {
    if (comb.size() == r) {
        for (int i : comb) {
            std::cout << i << " ";
        }
        std::cout << std::endl;
        return;
    }
    
    for (int i = start; i < arr.size(); ++i) {
        comb.push_back(arr[i]);
        printCombination(arr, comb, i + 1, r);
        comb.pop_back();
    }
}

int main() {
    std::vector<int> arr = {1, 2, 3, 4};
    std::vector<int> comb;
    int r = 2;
    
    std::cout << "Combinations of size 2 from the set {1, 2, 3, 4}:\n";
    printCombination(arr, comb, 0, r);
    
    return 0;
}
```
```
1 2
1 3
1 4
2 3
2 4
3 4
```
## 3. Binomial Coefficient

```cpp
#include <iostream>
#include <vector>

int binomialCoeff(int n, int r) {
    std::vector<std::vector<int>> C(n + 1, std::vector<int>(r + 1, 0));
    
    // Calculate binomial coefficient using DP
    for (int i = 0; i <= n; ++i) {
        for (int j = 0; j <= std::min(i, r); ++j) {
            // Base cases
            if (j == 0 || j == i) {
                C[i][j] = 1;
            } else {
                C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
            }
        }
    }
    
    return C[n][r];
}

int main() {
    int n = 5, r = 2;
    std::cout << "C(5, 2) = " << binomialCoeff(n, r) << std::endl;
    
    return 0;
}
```

```
C(5, 2) = 10
```
