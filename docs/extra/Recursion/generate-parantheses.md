---
id: Generate-Parentheses-problem-dsa
title: Generate Parentheses Recursion
sidebar_label: 🟠 Generate Parentheses
description: "The Generate Parentheses problem requires generating all combinations of well-formed parentheses given n pairs. The solution uses recursion and backtracking to ensure that each combination is valid."
tags: [generate-parentheses, backtracking, recursion, dsa]
---

## Generate Parentheses Problem | Return All Combinations of Well-Formed Parentheses

- Problem Statement: Given n pairs of parentheses, the task is to generate all possible combinations of well-formed parentheses. A well-formed parentheses string must have an equal number of opening and closing brackets, with every opening bracket correctly paired with a closing one.

- The solution involves recursively constructing valid strings by adding opening and closing brackets while maintaining balance.

```
- Example:
For n = 3, the output should be: ["((()))", "(()())", "(())()", "()(())", "()()()"]
```

### C++ implementation

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        dfs(0, 0, "", n, res);
        return res;
    }

private:
    void dfs(int openP, int closeP, string s, int n, vector<string>& res) {
        if (openP == closeP && openP + closeP == n * 2) {
            res.push_back(s);
            return;
        }

        if (openP < n) {
            dfs(openP + 1, closeP, s + "(", n, res);
        }

        if (closeP < openP) {
            dfs(openP, closeP + 1, s + ")", n, res);
        }
    }
};

int main() {
    Solution solution;
    int n;
    cout << "Enter the number of pairs of parentheses: ";
    cin >> n;

    vector<string> result = solution.generateParenthesis(n);

    cout << "All combinations of well-formed parentheses are:\n";
    for (const string& str : result) {
        cout << str << endl;
    }

    return 0;
}
```

## Time and Space Complexity

### Time Complexity
- $O(2^{2n})$ or $O(4^n)$ - The number of valid parentheses sequences is the $n$-th Catalan number, which is approximately $\frac{4^n}{n^{1.5}}$. However, generating each string takes time, so the overall complexity is exponential.

### Space Complexity
- $O(n)$ - The recursion stack depth is at most $2n$ (since we add $2n$ characters total), but each level stores a string of length up to $2n$. The output storage for all results is $O(4^n \cdot n)$ in the worst case.

## Explanation
The algorithm uses backtracking to generate valid parentheses combinations. At each step, it tracks the number of opening and closing parentheses used. An opening parenthesis can be added if fewer than $n$ have been used, and a closing parenthesis can be added if fewer closing than opening parentheses have been used. This pruning ensures only valid combinations are generated, though the number of valid combinations still grows exponentially with $n$.
