---
id: Generate-Parentheses-problem-dsa
title: Generate Parentheses Recursion
sidebar_label: Generate Parentheses
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
