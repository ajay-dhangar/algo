---
id: reverse-string-recursion
title: Reverse String Using Recursion
sidebar_label: Reverse String
description: "The Reverse String problem involves reversing a given string using a recursive function. The solution efficiently utilizes recursion to achieve the desired result without using any iterative constructs."
tags: [reverse-string, recursion, dsa]
---

## Reverse String Using Recursion

- Problem Statement: Given a string str, the task is to reverse the string using a recursive function. The function should return the reversed string as the output.


- Expected Time Complexity: 𝑂(𝑛)

- Expected Auxiliary Space: 𝑂(𝑛)

### C++ Implementation

```cpp
#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    string reverseString(string str) {
        // Base case: If the string is empty or has only one character
        if (str.length() <= 1) {
            return str;
        }
        // Recursive case: Reverse the substring and append the first character at the end
        return reverseString(str.substr(1)) + str[0];
    }
};

int main() {
    Solution solution;
    string str = "hello";
    cout << "Reversed string: " << solution.reverseString(str) << endl;
    return 0;
}
``` 

### Python Implementation

```python
class Solution:
    def reverse_string(self, s: str) -> str:
        # Base case: If the string is empty or has only one character
        if len(s) <= 1:
            return s
        # Recursive case: Reverse the substring and append the first character at the end
        return self.reverse_string(s[1:]) + s[0]

# Example usage
solution = Solution()
s = "hello"
print("Reversed string:", solution.reverse_string(s))

```
### Java Implementation

```java

public class Solution {
    public String reverseString(String str) {
        // Base case: If the string is empty or has only one character
        if (str.length() <= 1) {
            return str;
        }
        // Recursive case: Reverse the substring and append the first character at the end
        return reverseString(str.substring(1)) + str.charAt(0);
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String str = "hello";
        System.out.println("Reversed string: " + solution.reverseString(str));
    }
}
```