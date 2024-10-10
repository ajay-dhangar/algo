---
id: leetcode-solutions-11-to-20
sidebar_position: 2
title: LeetCode Solutions 11-20
sidebar_label: LeetCode Solutions 11-20
description: "This document contains solutions to 11-20 LeetCode problems, showcasing various algorithms and data structures."
tags: [leetcode, algorithms, problem-solving]
---

# LeetCode Solutions 11-20

## Questions
11. [Container With Most Water](#11-container-with-most-water)
12. [Integer to Roman](#12-integer-to-roman)
13. [Roman to Integer](#13-roman-to-integer)
14. [Longest Common Prefix](#14-longest-common-prefix)
15. [3Sum](#15-3sum)
16. [3Sum Closest](#16-3sum-closest)
17. [Letter Combinations of a Phone Number](#17-letter-combinations-of-a-phone-number)
18. [4Sum](#18-4sum)
19. [Remove Nth Node From End of List](#19-remove-nth-node-from-end-of-list)
20. [Valid Parentheses](#20-valid-parentheses)

---

### 11. Container With Most Water

**Description**:  
Given `n` non-negative integers representing the height of vertical lines, find two lines that together with the x-axis form a container that holds the most water.

**Approach**:  
Use two pointers, one at the beginning and one at the end of the array, to calculate the maximum area. Move the pointer with the shorter height.

**C++ Code**:
```cpp
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int max_area = 0;

    while (left < right) {
        int current_area = (right - left) * min(height[left], height[right]);
        max_area = max(max_area, current_area);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return max_area;
}

```

**Python Code**:
```python
def max_area(height):
    left, right = 0, len(height) - 1
    max_area = 0

    while left < right:
        max_area = max(max_area, (right - left) * min(height[left], height[right]))

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_area
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

---

### 12. Integer to Roman

**Description**:  
Convert an integer to a Roman numeral

**Approach**:  
Use a greedy algorithm by storing the Roman numeral values in descending order and subtract the corresponding values while appending the corresponding Roman numeral symbols.

**C++ Code**:
```cpp
string intToRoman(int num) {
    vector<pair<int, string>> val = {{1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"}, {100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"}, {10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"}};
    string res;

    for (auto& [value, symbol] : val) {
        while (num >= value) {
            res += symbol;
            num -= value;
        }
    }
    return res;
}

```

**Python Code**:
```python
def int_to_roman(num):
    val = [
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"), 
        (100, "C"), (90, "XC"), (50, "L"), (40, "XL"), 
        (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")
    ]
    res = ''
    for value, symbol in val:
        while num >= value:
            res += symbol
            num -= value
    return res

```

- **Time Complexity**: O(1) (since the number is bounded by 3999)
- **Space Complexity**: O(1)

---

### 13. Roman to Integer

**Description**:  
Convert a Roman numeral to an integer.

**Approach**:  
Iterate through the Roman numeral string, subtracting the current numeral if it is smaller than the next numeral, otherwise adding it.

**C++ Code**:
```cpp
int romanToInt(string s) {
    unordered_map<char, int> roman = {{'I', 1}, {'V', 5}, {'X', 10}, {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000}};
    int result = 0;
    
    for (int i = 0; i < s.size(); i++) {
        if (i + 1 < s.size() && roman[s[i]] < roman[s[i + 1]]) {
            result -= roman[s[i]];
        } else {
            result += roman[s[i]];
        }
    }
    return result;
}

```

**Python Code**:
```python
def roman_to_int(s):
    roman = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    result = 0

    for i in range(len(s)):
        if i + 1 < len(s) and roman[s[i]] < roman[s[i + 1]]:
            result -= roman[s[i]]
        else:
            result += roman[s[i]]
    return result

```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

---

### 14. Longest Common Prefix

**Description**:  
Write a function to find the longest common prefix string amongst an array of strings.

**Approach**:  
Compare each character of the strings at the same index position until a mismatch occurs.

**C++ Code**:
```cpp
string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";
    string prefix = strs[0];

    for (int i = 1; i < strs.size(); i++) {
        while (strs[i].find(prefix) != 0) {
            prefix = prefix.substr(0, prefix.size() - 1);
            if (prefix.empty()) return "";
        }
    }
    return prefix;
}

```

**Python Code**:
```python
def longest_common_prefix(strs):
    if not strs:
        return ""
    prefix = strs[0]

    for i in range(1, len(strs)):
        while strs[i].find(prefix) != 0:
            prefix = prefix[:-1]
            if not prefix:
                return ""
    return prefix

```

- **Time Complexity**: O(n * m), where n is the number of strings and m is the length of the shortest
- **Space Complexity**: O(1)

---

### 15. 3Sum

**Description**:  
Given an array of integers, find all unique triplets in the array that sum to zero.

**Approach**:  
Sort the array and use a two-pointer technique for each element to find the other two elements.

**C++ Code**:
```cpp
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;

    for (int i = 0; i < nums.size(); i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = nums.size() - 1;

        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++; right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}

```

**Python Code**:
```python
def three_sum(nums):
    nums.sort()
    result = []

    for i in range(len(nums)):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1

        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1

    return result

```

- **Time Complexity**: O(n^2)
- **Space Complexity**: O(1) (excluding the result space)

---

### 16. 3Sum Closest

**Description**:  
Given an array of integers nums and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers.

**Approach**:  
Sort the array, and for each element, use the two-pointer technique to compute the sum closest to the target.

**C++ Code**:
```cpp
int threeSumClosest(vector<int>& nums, int target) {
    sort(nums.begin(), nums.end());
    int closest = nums[0] + nums[1] + nums[2];

    for (int i = 0; i < nums.size() - 2; i++) {
        int left = i + 1, right = nums.size() - 1;
        
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (abs(sum - target) < abs(closest - target)) {
                closest = sum;
            }
            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    return closest;
}

```

**Python Code**:
```python
def three_sum_closest(nums, target):
    nums.sort()
    closest = nums[0] + nums[1] + nums[2]

    for i in range(len(nums) - 2):
        left, right = i + 1, len(nums) - 1

        while left < right:
            current_sum = nums[i] + nums[left] + nums[right]
            if abs(current_sum - target) < abs(closest - target):
                closest = current_sum
            if current_sum < target:
                left += 1
            else:
                right -= 1

    return closest

```

- **Time Complexity**: O(n^2)
- **Space Complexity**: O(1)

---

### 17. Letter Combinations of a Phone Number

**Description**:  
Given a string containing digits from 2-9, return all possible letter combinations that the number could represent. A mapping of digit to letters (just like on the telephone buttons) is provided.

**Approach**:  
Use backtracking to generate all possible combinations. Start from the first digit, and for each digit, append the corresponding letters recursively.

**C++ Code**:
```cpp
vector<string> letterCombinations(string digits) {
    if (digits.empty()) return {};
    vector<string> mapping = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    vector<string> result;
    string current;

    function<void(int)> backtrack = [&](int index) {
        if (index == digits.size()) {
            result.push_back(current);
            return;
        }
        for (char letter : mapping[digits[index] - '0']) {
            current.push_back(letter);
            backtrack(index + 1);
            current.pop_back();
        }
    };
    
    backtrack(0);
    return result;
}

```

**Python Code**:
```python
def letter_combinations(digits):
    if not digits:
        return []
    
    mapping = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
    result = []
    
    def backtrack(index, current):
        if index == len(digits):
            result.append(current)
            return
        
        for letter in mapping[int(digits[index])]:
            backtrack(index + 1, current + letter)
    
    backtrack(0, "")
    return result

```

- **Time Complexity**: O(3^n * 4^m), where n is the number of digits corresponding to 3 letters, and m is the number of digits corresponding to 4 letters.
- **Space Complexity**: O(3^n * 4^m) (result space)

---

### 18. 4Sum

**Description**:  
Given an array nums of n integers, return all unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that the sum is zero.

**Approach**:  
Sort the array and use a two-pointer technique within two loops to find unique quadruplets.

**C++ Code**:
```cpp
vector<vector<int>> fourSum(vector<int>& nums, int target) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;

    for (int i = 0; i < nums.size() - 3; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        for (int j = i + 1; j < nums.size() - 2; j++) {
            if (j > i + 1 && nums[j] == nums[j - 1]) continue;

            int left = j + 1, right = nums.size() - 1;

            while (left < right) {
                int sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum == target) {
                    result.push_back({nums[i], nums[j], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++; right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    return result;
}

```

**Python Code**:
```python
def four_sum(nums, target):
    nums.sort()
    result = []

    for i in range(len(nums) - 3):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        for j in range(i + 1, len(nums) - 2):
            if j > i + 1 and nums[j] == nums[j - 1]:
                continue

            left, right = j + 1, len(nums) - 1

            while left < right:
                total = nums[i] + nums[j] + nums[left] + nums[right]
                if total == target:
                    result.append([nums[i], nums[j], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif total < target:
                    left += 1
                else:
                    right -= 1

    return result

```

- **Time Complexity**: O(n^3)
- **Space Complexity**: O(n)

---

### 19. Remove Nth Node From End of List

**Description**:  
Given a linked list, remove the nth node from the end of the list and return its head.

**Approach**:  
Use two pointers. Move the first pointer n steps ahead, then move both pointers until the first reaches the end. The second pointer will now be at the node before the one to be removed.

**C++ Code**:
```cpp
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode* dummy = new ListNode(0);
    dummy->next = head;
    ListNode* first = dummy;
    ListNode* second = dummy;

    for (int i = 0; i <= n; i++) {
        first = first->next;
    }

    while (first != nullptr) {
        first = first->next;
        second = second->next;
    }

    second->next = second->next->next;
    return dummy->next;
}

```

**Python Code**:
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def remove_nth_from_end(head, n):
    dummy = ListNode(0)
    dummy.next = head
    first, second = dummy, dummy

    for _ in range(n + 1):
        first = first.next

    while first:
        first = first.next
        second = second.next

    second.next = second.next.next
    return dummy.next
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

---

### 20. Valid Parentheses

**Description**:  
Given a string containing just the characters '(', ')', '{', '}', '[', and ']', determine if the input string is valid. An input string is valid if:

- 1. Open brackets must be closed by the same type of brackets.
- 2. Open brackets must be closed in the correct order.

**Approach**:  
Use a stack to keep track of opening brackets and check if each closing bracket matches the one on top of the stack.

**C++ Code**:
```cpp
bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> map = {{')', '('}, {']', '['}, {'}', '{'}};

    for (char c : s) {
        if (map.find(c) != map.end()) {
            if (!st.empty() && st.top() == map[c]) {
                st.pop();
            } else {
                return false;
            }
        } else {
            st.push(c);
        }
    }
    return st.empty();
}

```

**Python Code**:
```python
def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)

    return not stack

```

- **Time Complexity**: O(n)
- **Space Complexity**: O(n)