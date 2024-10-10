---
id: leetcode-solutions-1-to-10
sidebar_position: 1
title: LeetCode Solutions 1-10
sidebar_label: LeetCode Solutions 1-10
description: "This document contains solutions to 1-10 LeetCode problems, showcasing various algorithms and data structures."
tags: [leetcode, algorithms, problem-solving]
---

## LeetCode Problems

1. [Two Sum](#1-two-sum)
2. [Add Two Numbers](#2-add-two-numbers)
3. [Longest Substring Without Repeating Characters](#3-longest-substring-without-repeating-characters)
4. [Median of Two Sorted Arrays](#4-median-of-two-sorted-arrays)
5. [Longest Palindromic Substring](#5-longest-palindromic-substring)
6. [Zigzag Conversion](#6-zigzag-conversion)
7. [Reverse Integer](#7-reverse-integer)
8. [String to Integer (atoi)](#8-string-to-integer-atoi)
9. [Palindrome Number](#9-palindrome-number)
10. [Regular Expression Matching](#10-regular-expression-matching)

---

### 1. Two Sum

**Description**:  
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

**Approach**:  
Use a hash map to store the difference between the target and each element as we iterate through the array.


<Tabs>
    <TabItem value="cpp" label="C++" default>
        ```cpp
        #include <iostream>
        #include <unordered_map>
        #include <vector>

        using namespace std;

        vector<int> twoSum(vector<int>& nums, int target) {
            unordered_map<int, int> map;
            for (int i = 0; i < nums.size(); i++) {
                int complement = target - nums[i];
                if (map.find(complement) != map.end()) {
                    return { map[complement], i };
                }
                map[nums[i]] = i;
            }
            return {};
        }
        ```
    </TabItem>
    <TabItem value="py" label="Python">
        ```python
        def two_sum(nums, target):
            map = {}
            for i, num in enumerate(nums):
                complement = target - num
                if complement in map:
                    return [map[complement], i]
                map[num] = i
            return []
        ```
    </TabItem>
</Tabs>

- **Time Complexity**: O(n)
- **Space Complexity**: O(n)

---

### 2. Add Two Numbers

**Description**:  
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return it as a linked list.

**Approach**:  
Iterate through both linked lists, adding corresponding digits and handling the carry.

<Tabs>
    <TabItem value="cpp" label="C++" default>
        ```cpp
        struct ListNode {
            int val;
            ListNode *next;
            ListNode(int x) : val(x), next(nullptr) {}
        };

        ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
            ListNode dummy(0);
            ListNode* p = &dummy;
            int carry = 0;

            while (l1 || l2 || carry) {
                int sum = carry;
                if (l1) {
                    sum += l1->val;
                    l1 = l1->next;
                }
                if (l2) {
                    sum += l2->val;
                    l2 = l2->next;
                }
                carry = sum / 10;
                p->next = new ListNode(sum % 10);
                p = p->next;
            }
            return dummy.next;
        }
        ```
    </TabItem>
    <TabItem value="py" label="Python">
        ```python
        class ListNode:
            def __init__(self, val=0, next=None):
                self.val = val
                self.next = next

        def addTwoNumbers(l1, l2):
            dummy = ListNode(0)
            p = dummy
            carry = 0

            while l1 or l2 or carry:
                sum = carry
                if l1:
                    sum += l1.val
                    l1 = l1.next
                if l2:
                    sum += l2.val
                    l2 = l2.next
                carry = sum // 10
                p.next = ListNode(sum % 10)
                p = p.next
            return dummy.next
        ```
    </TabItem>
</Tabs>

- **Time Complexity**: O(max(m, n)), where m and n are the lengths of the two linked lists.
- **Space Complexity**: O(max(m, n)) for the output list.

---

### 3. Longest Substring Without Repeating Characters

**Description**:  
Given a string, find the length of the longest substring without repeating characters.

**Approach**:  
Use a sliding window approach with a hash set to track characters in the current substring.

<Tabs>
    <TabItem value="cpp" label="C++" default>
        ```cpp
        #include <iostream>
        #include <unordered_set>
        #include <string>
        using namespace std;

        int lengthOfLongestSubstring(string s) {
            unordered_set<char> set;
            int left = 0, maxLength = 0;

            for (int right = 0; right < s.size(); right++) {
                while (set.find(s[right]) != set.end()) {
                    set.erase(s[left]);
                    left++;
                }
                set.insert(s[right]);
                maxLength = max(maxLength, right - left + 1);
            }
            return maxLength;
        }
        ```

    </TabItem>
    <TabItem value="py" label="Python">
        ```python
        def length_of_longest_substring(s):
            char_set = set()
            left = 0
            max_length = 0

            for right in range(len(s)):
                while s[right] in char_set:
                    char_set.remove(s[left])
                    left += 1
                char_set.add(s[right])
                max_length = max(max_length, right - left + 1)

            return max_length
        ```
    </TabItem>
</Tabs>

- **Time Complexity**: O(n)
- **Space Complexity**: O(min(n, m)), where n is the length of the input string and m is the size of the charset/alphabet.

---

### 4. Median of Two Sorted Arrays

**Description**:  
Given two sorted arrays, find the median of the two sorted arrays. The overall run time complexity should be O(log(min(n, m))) where n and m are the sizes of the arrays.

**Approach**:  
Use binary search to find the correct position of the median by partitioning the arrays.

<Tabs>
    <TabItem value="cpp" label="C++" default>
        ```cpp
        #include <iostream>
        #include <vector>
        using namespace std;

        double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
            if (nums1.size() > nums2.size()) {
                swap(nums1, nums2);
            }

            int x = nums1.size();
            int y = nums2.size();
            int low = 0, high = x;

            while (low <= high) {
                int partitionX = (low + high) / 2;
                int partitionY = (x + y + 1) / 2 - partitionX;

                int maxX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
                int minX = (partitionX == x) ? INT_MAX : nums1[partitionX];

                int maxY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
                int minY = (partitionY == y) ? INT_MAX : nums2[partitionY];

                if (maxX <= minY && maxY <= minX) {
                    if ((x + y) % 2 == 0) {
                        return (max(maxX, maxY) + min(minX, minY)) / 2.0;
                    } else {
                        return max(maxX, maxY);
                    }
                } else if (maxX > minY) {
                    high = partitionX - 1;
                } else {
                    low = partitionX + 1;
                }
            }
            throw invalid_argument("Input arrays are not sorted");
        }
    ```
    </TabItem>
    <TabItem value="py" label="Python">
        ```python
        def findMedianSortedArrays(nums1, nums2):
            if len(nums1) > len(nums2):
                nums1, nums2 = nums2, nums1

            x, y = len(nums1), len(nums2)
            low, high = 0, x

            while low <= high:
                partitionX = (low + high) // 2
                partitionY = (x + y + 1) // 2 - partitionX

                maxX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
                minX = float('inf') if partitionX == x else nums1[partitionX]

                maxY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
                minY = float('inf') if partitionY == y else nums2[partitionY]

                if maxX <= minY and maxY <= minX:
                    if (x + y) % 2 == 0:
                        return (max(maxX, maxY) + min(minX, minY)) / 2
                    else:
                        return max(maxX, maxY)
                elif maxX > minY:
                    high = partitionX - 1
                else:
                    low = partitionX + 1
            raise ValueError("Input arrays are not sorted")
            ```
    </TabItem>
</Tabs>

- **Time Complexity**: O(log(min(n, m)))
- **Space Complexity**: O(1)

### 5. Longest Palindromic Substring

**Description**:  
Given a string, return the longest palindromic substring.

**Approach**:  
Expand around the center for each character and its adjacent character to find palindromes.

<Tabs>
    <TabItem value="cpp" label="C++" default>
        ```cpp
        #include <iostream>
        #include <string>
        using namespace std;

        string longestPalindrome(string s) {
            int start = 0, maxLength = 1;

            for (int i = 0; i < s.size(); i++) {
                // Odd length palindromes
                int low = i, high = i;
                while (low >= 0 && high < s.size() && s[low] == s[high]) {
                    if (high - low + 1 > maxLength) {
                        start = low;
                        maxLength = high - low + 1;
                    }
                    low--;
                    high++;
                }
                
                // Even length palindromes
                low = i, high = i + 1;
                while (low >= 0 && high < s.size() && s[low] == s[high]) {
                    if (high - low + 1 > maxLength) {
                        start = low;
                        maxLength = high - low + 1;
                    }
                    low--;
                    high++;
                }
            }
            return s.substr(start, maxLength);
        }
        ```
    </TabItem>
    <TabItem value="py" label="Python">
        ```python
        def longest_palindrome(s):
            start = 0
            max_length = 1

            for i in range(len(s)):
                # Odd length palindromes
                low, high = i, i
                while low >= 0 and high < len(s) and s[low] == s[high]:
                    if high - low + 1 > max_length:
                        start = low
                        max_length = high - low + 1
                    low -= 1
                    high += 1
                    
                # Even length palindromes
                low, high = i, i + 1
                while low >= 0 and high < len(s) and s[low] == s[high]:
                    if high - low + 1 > max_length:
                        start = low
                        max_length = high - low + 1
                    low -= 1
                    high += 1
                    
            return s[start:start + max_length]
        ```
    </TabItem>
</Tabs>

- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)

---

### 6. Zigzag Conversion

**Description**:  
Convert a string to a zigzag pattern on a given number of rows and then read line by line.

**Approach**:  
Simulate the zigzag conversion by placing characters in the correct row, then concatenate the rows.

<Tabs>
    <TabItem value="cpp" label="C++" default>
        ```cpp
        #include <iostream>
        #include <vector>
        using namespace std;

        string convert(string s, int numRows) {
            if (numRows == 1 || numRows >= s.size()) return s;
            
            vector<string> rows(min(numRows, (int)s.size()));
            int currRow = 0;
            bool goingDown = false;

            for (char c : s) {
                rows[currRow] += c;
                if (currRow == 0) goingDown = true;
                else if (currRow == numRows - 1) goingDown = false;

                currRow += goingDown ? 1 : -1;
            }

            string zigzag;
            for (string row : rows) {
                zigzag += row;
            }
            return zigzag;
        }
        ```
    </TabItem>
    <TabItem value="py" label="Python">
        ```python
        def convert(s, numRows):
            if numRows == 1 or numRows >= len(s):
                return s

            rows = [''] * min(numRows, len(s))
            curr_row = 0
            going_down = False

            for c in s:
                rows[curr_row] += c
                if curr_row == 0:
                    going_down = True
                elif curr_row == numRows - 1:
                    going_down = False

                curr_row += 1 if going_down else -1

            return ''.join(rows)
        ```
    </TabItem>
</Tabs>

- **Time Complexity**: O(n)
- **Space Complexity**: O(n)

---

### 7. Reverse Integer

**Description**:  
Given a 32-bit signed integer, reverse the digits of the integer.

**Approach**:  
Use a while loop to extract digits and construct the reversed integer while handling overflow.

<Tabs>
    <TabItem value="cpp" label="C++" default>
        ```cpp
        #include <iostream>
        using namespace std;

        int reverse(int x) {
            int result = 0;
            while (x != 0) {
                int digit = x % 10;
                x /= 10;

                // Check for overflow
                if (result > INT_MAX / 10 || (result == INT_MAX / 10 && digit > 7)) return 0;
                if (result < INT_MIN / 10 || (result == INT_MIN / 10 && digit < -8)) return 0;

                result = result * 10 + digit;
            }
            return result;
        }
        ```
    </TabItem>
    <TabItem value="py" label="Python">
        ```python
        def reverse(x):
            sign = -1 if x < 0 else 1
            x *= sign
            reversed_x = 0

            while x:
                digit = x % 10
                x //= 10

                # Check for overflow
                if reversed_x > (2**31 - 1) // 10 or (reversed_x == (2**31 - 1) // 10 and digit > 7):
                    return 0

                reversed_x = reversed_x * 10 + digit

            return sign * reversed_x
        ```
    </TabItem>
</Tabs>

- **Time Complexity**: O(log(x)) where x is the input number.
- **Space Complexity**: O(1)

---

### 8. String to Integer (atoi)

**Description**:  
Implement the atoi function which converts a string to an integer.

**Approach**:  
Ignore leading whitespaces, handle optional sign, and convert characters to an integer.

<Tabs>
    <TabItem value="cpp" label="C++" default>
        ```cpp
        #include <iostream>
        #include <string>
        using namespace std;

        int myAtoi(string s) {
            int i = 0, n = s.size(), sign = 1;
            long long result = 0;

            // Skip leading whitespaces
            while (i < n && s[i] == ' ') i++;

            // Handle sign
            if (i < n && (s[i] == '-' || s[i] == '+')) {
                sign = (s[i] == '-') ? -1 : 1;
                i++;
            }

            // Convert digits
            while (i < n && isdigit(s[i])) {
                result = result * 10 + (s[i] - '0');
                if (result * sign >= INT_MAX) return INT_MAX;
                if (result * sign <= INT_MIN) return INT_MIN;
                i++;
            }
            return result * sign;
        }

        ```
    </TabItem>
    <TabItem value="py" label="Python">
        ```python
        def my_atoi(s):
            i, n, sign, result = 0, len(s), 1, 0

            # Skip leading whitespaces
            while i < n and s[i] == ' ':
                i += 1

            # Handle sign
            if i < n and (s[i] == '-' or s[i] == '+'):
                sign = -1 if s[i] == '-' else 1
                i += 1

            # Convert digits
            while i < n and s[i].isdigit():
                digit = int(s[i])
                result = result * 10 + digit
                if result * sign >= 2**31 - 1:
                    return 2**31 - 1
                if result * sign <= -2**31:
                    return -2**31
                i += 1
            return result * sign
        ```
    </TabItem>
</Tabs>

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

---

### 9. Palindrome Number

**Description**:  
Determine whether an integer is a palindrome.

**Approach**:  
Reverse the second half of the integer and compare it with the first half.

<Tabs>
    <TabItem value="cpp" label="C++" default>
        ```cpp
        #include <iostream>
        using namespace std;

        bool isPalindrome(int x) {
            if (x < 0 || (x % 10 == 0 && x != 0)) return false;
            int reversed = 0;
            while (x > reversed) {
                reversed = reversed * 10 + x % 10;
                x /= 10;
            }
            return x == reversed || x == reversed / 10;
        }

        ```
    </TabItem>
    <TabItem value="py" label="Python">
        ```python
        def is_palindrome(x):
            if x < 0 or (x % 10 == 0 and x != 0):
                return False
            reversed_x = 0
            while x > reversed_x:
                reversed_x = reversed_x * 10 + x % 10
                x //= 10
            return x == reversed_x or x == reversed_x // 10
        ```
    </TabItem>
</Tabs>

- **Time Complexity**: O(log(n)) where n is the input number.
- **Space Complexity**: O(1)

---

### 10. Regular Expression Matching

**Description**:  
Implement regular expression matching with support for . and *.

**Approach**:  
Use dynamic programming to fill a 2D table where dp[i][j] indicates whether the first i characters of s match the first j characters of p.

<Tabs>
    <TabItem value="cpp" label="C++" default>
        ```cpp
        #include <iostream>
        #include <vector>
        using namespace std;

        bool isMatch(string s, string p) {
            int s_len = s.size(), p_len = p.size();
            vector<vector<bool>> dp(s_len + 1, vector<bool>(p_len + 1, false));
            dp[0][0] = true;

            for (int j = 1; j <= p_len; j++) {
                if (p[j - 1] == '*') {
                    dp[0][j] = dp[0][j - 2];
                }
            }

            for (int i = 1; i <= s_len; i++) {
                for (int j = 1; j <= p_len; j++) {
                    if (p[j - 1] == '.' || p[j - 1] == s[i - 1]) {
                        dp[i][j] = dp[i - 1][j - 1];
                    } else if (p[j - 1] == '*') {
                        dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (p[j - 2] == s[i - 1] || p[j - 2] == '.'));
                    }
                }
            }
            return dp[s_len][p_len];
        }

        ```
    </TabItem>
    <TabItem value="py" label="Python">
        ```python
        def is_match(s, p):
            s_len, p_len = len(s), len(p)
            dp = [[False] * (p_len + 1) for _ in range(s_len + 1)]
            dp[0][0] = True

            for j in range(1, p_len + 1):
                if p[j - 1] == '*':
                    dp[0][j] = dp[0][j - 2]

            for i in range(1, s_len + 1):
                for j in range(1, p_len + 1):
                    if p[j - 1] == '.' or p[j - 1] == s[i - 1]:
                        dp[i][j] = dp[i - 1][j - 1]
                    elif p[j - 1] == '*':
                        dp[i][j] = dp[i][j - 2] or (dp[i - 1][j] and (p[j - 2] == s[i - 1] or p[j - 2] == '.'))

            return dp[s_len][p_len]
        ```
    </TabItem>
</Tabs>

- **Time Complexity**: O(m * n), where m is the length of s and n is the length of p.
- **Space Complexity**: O(m * n)