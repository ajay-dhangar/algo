# Shortest Palindrome Solution

## Problem Description

The **Shortest Palindrome** problem is about finding the shortest palindrome that can be formed by adding characters in front of a given string. The goal is to return the shortest palindrome by adding the fewest possible characters.

## Approach

The algorithm utilizes a two-pointer approach to match characters from the start and the end of the string. If characters at the respective pointers match, the pointers are moved towards the center of the string. Once the longest palindrome prefix is identified, the remaining characters after the prefix are reversed and added to the start and end of the palindrome, ensuring the resulting string is a valid palindrome.

## Time Complexity 

The time complexity of this algorithm is O(n²). This is due to:
1. The two-pointer approach runs in O(n), iterating through the string.
2. In the worst case, we recursively call the function on a smaller substring, resulting in a quadratic time complexity due to string operations and recursive calls.

## Space Complexity

The space complexity is O(n) because the recursion depth can reach the length of the string n, and string operations like substring and reverse require extra space proportional to the size of the string.

### Steps:
1. Initialize two pointers: `i` starting from the beginning and `j` from the end of the string.
2. Move both pointers towards the center of the string, comparing characters.
3. If a mismatch is found, the substring starting from the first mismatch is reversed and appended to the original string, forming a palindrome.
4. Recursively process the remaining unmatched portion of the string and return the shortest palindrome.

## Code

```cpp
class Solution {
public:
    string shortestPalindrome(string s) {
        int n = s.size();
        int i = 0;
        for (int j = n - 1; j >= 0; j--) {
            while (j >= 0 && s[i] == s[j]) {
                i++, j--;
            }    
        }
        if (i == n) return s;

        string sub = s.substr(i), remain_rev = sub;
        
        reverse(remain_rev.begin(), remain_rev.end());
        return remain_rev + shortestPalindrome(s.substr(0, i)) + sub;
    }
};
