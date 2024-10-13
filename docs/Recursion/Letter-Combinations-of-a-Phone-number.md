---
id: Letter-Combinations-problem-dsa
title: Letter Combinations of a Phone Number
sidebar_label: Letter Combinations
description: "The Letter Combinations of a Phone Number problem involves generating all possible letter combinations that a string of digits (2-9) can represent based on a standard telephone keypad. This problem is often solved using recursion and backtracking."
tags: [letter-combinations, backtracking, recursion, dsa]
---

## Letter Combinations of a Phone Number | Generate All Combinations of Letters Based on Digits

- Problem Statement: Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent, following the mapping of digits to letters as seen on telephone keypads. The number 1 does not map to any letters.

```
- Example 1:
  Input: digits = "23" and Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]

- Example 2:
  Input: digits = "" and Output: []

- Example 3:
  Input: digits = "2" and Output: ["a", "b", "c"]
```

### C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};

        string phone_map[] = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        vector<string> output;
        backtrack("", digits, phone_map, output);
        return output;
    }

private:
    void backtrack(string combination, string next_digits, string phone_map[], vector<string>& output) {
        if (next_digits.empty()) {
            output.push_back(combination);
        } else {
            string letters = phone_map[next_digits[0] - '2'];
            for (char letter : letters) {
                backtrack(combination + letter, next_digits.substr(1), phone_map, output);
            }
        }
    }
};

int main() {
    Solution solution;
    string digits;

    cout << "Enter the digits: ";
    cin >> digits;

    vector<string> result = solution.letterCombinations(digits);

    cout << "All possible letter combinations are:\n";
    for (const string& combination : result) {
        cout << combination << endl;
    }

    return 0;
}
```
