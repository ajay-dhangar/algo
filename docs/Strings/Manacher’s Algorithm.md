---
id: manacher-algorithm
title: Manacher’s Algorithm
sidebar_label: Introduction to Manacher's Algorithm
description: 'Manacher’s Algorithm finds the longest palindromic substring in linear time.'
tags: [dsa, string-algorithms, palindromes]
---

### Overview:

Manacher’s Algorithm efficiently computes the longest palindromic substring in a given string in O(n) time complexity, where n is the length of the string. This is achieved by utilizing a clever approach of expanding palindromes around their center and leveraging previously computed results to minimize redundant calculations.

### Solutions:


## C++ 

```c++
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Manacher {
public:
    string preprocess(const string& s) {
        string t = "^#"; // Starting characters to avoid bounds checking
        for (char c : s) {
            t += c;
            t += '#'; // Insert '#' between characters
        }
        t += '$'; // Ending character
        return t;
    }

    // Function to find the longest palindromic substring
    string longestPalindromicSubstring(const string& s) {
        string t = preprocess(s);
        int n = t.size();
        vector<int> p(n, 0); // Array to store lengths of palindromes
        int center = 0, right = 0;

        for (int i = 1; i < n - 1; i++) {
            if (i < right) {
                p[i] = min(right - i, p[2 * center - i]); // Use the mirrored index
            }

            // Expand around center i
            while (t[i + p[i] + 1] == t[i - p[i] - 1]) {
                p[i]++;
            }

            // Update center and right boundary
            if (i + p[i] > right) {
                center = i;
                right = i + p[i];
            }
        }

        // Find the maximum palindrome length
        int maxLen = 0, centerIndex = 0;
        for (int i = 1; i < n - 1; i++) {
            if (p[i] > maxLen) {
                maxLen = p[i];
                centerIndex = i;
            }
        }

        // Extract the longest palindromic substring
        int start = (centerIndex - maxLen) / 2; // Calculate the start index in the original string
        return s.substr(start, maxLen); // Return the longest palindromic substring
    }
};

int main() {
    Manacher manacher;
    string input;
    cout << "Enter a string: ";
    getline(cin, input); // Take input string from user
    string result = manacher.longestPalindromicSubstring(input);
    cout << "Longest Palindromic Substring: " << result << endl;
    return 0;
}

```

## Java

```java
import java.util.Scanner;

public class Manacher {
    public String preprocess(String s) {
        StringBuilder t = new StringBuilder("^#");
        for (char c : s.toCharArray()) {
            t.append(c).append('#'); // Insert '#' between characters
        }
        t.append('$'); // Ending character
        return t.toString();
    }

    public String longestPalindromicSubstring(String s) {
        String t = preprocess(s);
        int n = t.length();
        int[] p = new int[n]; // Array to store lengths of palindromes
        int center = 0, right = 0;

        for (int i = 1; i < n - 1; i++) {
            if (i < right) {
                p[i] = Math.min(right - i, p[2 * center - i]); // Use the mirrored index
            }

            // Expand around center i
            while (t.charAt(i + p[i] + 1) == t.charAt(i - p[i] - 1)) {
                p[i]++;
            }

            // Update center and right boundary
            if (i + p[i] > right) {
                center = i;
                right = i + p[i];
            }
        }

        // Find the maximum palindrome length
        int maxLen = 0, centerIndex = 0;
        for (int i = 1; i < n - 1; i++) {
            if (p[i] > maxLen) {
                maxLen = p[i];
                centerIndex = i;
            }
        }

        // Extract the longest palindromic substring
        int start = (centerIndex - maxLen) / 2; // Calculate the start index in the original string
        return s.substring(start, start + maxLen); // Return the longest palindromic substring
    }

    // Example Usage
    public static void main(String[] args) {
        Manacher manacher = new Manacher();
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String input = scanner.nextLine(); // Take input string from user
        String result = manacher.longestPalindromicSubstring(input);
        System.out.println("Longest Palindromic Substring: " + result); // Output: "bab" or "aba"
        
        scanner.close();
    }
}

```

## Python

```python
class Manacher:
    def preprocess(self, s):
        t = "^#" + "#".join(s) + "#$"  # Insert '#' between characters
        return t

    def longest_palindromic_substring(self, s):
        t = self.preprocess(s)
        n = len(t)
        p = [0] * n  # Array to store lengths of palindromes
        center = right = 0

        for i in range(1, n - 1):
            if i < right:
                p[i] = min(right - i, p[2 * center - i])  # Use the mirrored index

            # Expand around center i
            while t[i + p[i] + 1] == t[i - p[i] - 1]:
                p[i] += 1

            # Update center and right boundary
            if i + p[i] > right:
                center = i
                right = i + p[i]

        # Find the maximum palindrome length
        max_len = 0
        center_index = 0
        for i in range(1, n - 1):
            if p[i] > max_len:
                max_len = p[i]
                center_index = i

        # Extract the longest palindromic substring
        start = (center_index - max_len) // 2  # Calculate the start index in the original string
        return s[start:start + max_len]  # Return the longest palindromic substring


# Example Usage
if __name__ == "__main__":
    manacher = Manacher()
    input_str = input("Enter a string: ")  # Take input string from user
    result = manacher.longest_palindromic_substring(input_str)
    print("Longest Palindromic Substring:", result)  
```

## Key Concepts:

➢ **Center and Radius:** For each character in the string, the algorithm keeps track of the center and radius of the longest palindrome found so far.
➢ **Mirrored Index:** When a palindrome is found, its properties can be mirrored about the center to reduce the number of expansions needed.
