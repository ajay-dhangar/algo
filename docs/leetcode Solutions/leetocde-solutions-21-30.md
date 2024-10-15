---
id: leetcode-solutions-21-to-30
sidebar_position: 3
title: LeetCode Solutions 21-30
sidebar_label: LeetCode Solutions 21-30
description: "This document contains solutions to LeetCode DSA problems 21-30 containing multiple algorithms and data structures."
tags: [leetcode, algorithms, problem-solving, DSA, data structure]
---

# LeetCode Solutions 21-30

## Questions
21. [Merge Two Sorted Lists](#21-merge-two-sorted-lists)  
22. [Generate Parentheses](#22-generate-parentheses)  
23. [Merge k Sorted Lists](#23-merge-k-sorted-lists)  
24. [Swap Nodes in Pairs](#24-swap-nodes-in-pairs)  
25. [Reverse Nodes in k-Group](#25-reverse-nodes-in-k-group)  
26. [Remove Duplicates from Sorted Array](#26-remove-duplicates-from-sorted-array)  
27. [Remove Element](#27-remove-element)  
28. [Find the Index of the First Occurrence in a String](#28-find-the-index-of-the-first-occurrence-in-a-string)  
29. [Divide Two Integers](#29-divide-two-integers)  
30. [Substring with Concatenation of All Words](#30-substring-with-concatenation-of-all-words)  
---

---

### 21. Merge Two Sorted Lists

**Description**:  
Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.

**Approach**:  
Use a dummy node to facilitate the merging process. Compare the heads of both lists and attach the smaller node to the merged list.

**C++ Code**:
```cpp
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode* dummy = new ListNode(0);
    ListNode* current = dummy;

    while (l1 != nullptr && l2 != nullptr) {
        if (l1->val < l2->val) {
            current->next = l1;
            l1 = l1->next;
        } else {
            current->next = l2;
            l2 = l2->next;
        }
        current = current->next;
    }
    current->next = (l1 != nullptr) ? l1 : l2;
    return dummy->next;
}

```

**Python Code**:
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    current = dummy

    while l1 and l2:
        if l1.val < l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next

    current.next = l1 if l1 else l2
    return dummy.next

```

- **Time Complexity**: O(n + m)
- **Space Complexity**: O(1)

---

### 22. Generate Parentheses

**Description**:  
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

**Approach**:  
Use backtracking to generate combinations, keeping track of the number of open and close parentheses used.

**C++ Code**:
```cpp
vector<string> generateParenthesis(int n) {
    vector<string> result;
    string current;
    
    function<void(int, int)> backtrack = [&](int open, int close) {
        if (current.size() == 2 * n) {
            result.push_back(current);
            return;
        }
        if (open < n) {
            current += '(';
            backtrack(open + 1, close);
            current.pop_back();
        }
        if (close < open) {
            current += ')';
            backtrack(open, close + 1);
            current.pop_back();
        }
    };
    
    backtrack(0, 0);
    return result;
}

```

**Python Code**:
```python
def generate_parentheses(n):
    result = []

    def backtrack(current, open, close):
        if len(current) == 2 * n:
            result.append(current)
            return
        if open < n:
            backtrack(current + '(', open + 1, close)
        if close < open:
            backtrack(current + ')', open, close + 1)

    backtrack('', 0, 0)
    return result

```

- **Time Complexity**: O(4^n / sqrt(n))
- **Space Complexity**: O(n)

---

### 23. Merge k Sorted Lists

**Description**:  
Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

**Approach**:  
Use a min-heap (priority queue) to keep track of the smallest current node from each list, merging them into a single sorted list.

**C++ Code**:
```cpp
ListNode* mergeKLists(vector<ListNode*>& lists) {
    priority_queue<ListNode*, vector<ListNode*>, greater<ListNode*>> minHeap;

    for (auto& list : lists) {
        if (list) minHeap.push(list);
    }

    ListNode dummy(0);
    ListNode* current = &dummy;

    while (!minHeap.empty()) {
        current->next = minHeap.top();
        minHeap.pop();
        current = current->next;

        if (current->next) {
            minHeap.push(current->next);
        }
    }
    return dummy.next;
}

```

**Python Code**:
```python
import heapq

def merge_k_lists(lists):
    min_heap = []
    for l in lists:
        if l:
            heapq.heappush(min_heap, (l.val, l))

    dummy = ListNode(0)
    current = dummy

    while min_heap:
        val, node = heapq.heappop(min_heap)
        current.next = node
        current = current.next
        if node.next:
            heapq.heappush(min_heap, (node.next.val, node.next))

    return dummy.next

```

- **Time Complexity**: O(n log k), where n is the total number of nodes and k is the number of lists.
- **Space Complexity**: O(k)

---

### 24. Swap Nodes in Pairs

**Description**:  
Given a linked list, swap every two adjacent nodes and return its head.

**Approach**:  
Iterate through the list, swapping pairs of nodes as you go, using a dummy node to simplify edge cases.

**C++ Code**:
```cpp
ListNode* swapPairs(ListNode* head) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* current = &dummy;

    while (current->next && current->next->next) {
        ListNode* first = current->next;
        ListNode* second = current->next->next;

        first->next = second->next;
        current->next = second;
        current->next->next = first;

        current = first;
    }
    return dummy.next;
}

```

**Python Code**:
```python
def swap_pairs(head):
    dummy = ListNode(0)
    dummy.next = head
    current = dummy

    while current.next and current.next.next:
        first = current.next
        second = current.next.next

        first.next = second.next
        current.next = second
        current.next.next = first

        current = first

    return dummy.next

```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

---

### 25. Reverse Nodes in k-Group

**Description**:  
Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

**Approach**:  
Iterate through the list, reversing nodes in groups of k. If there are fewer than k nodes left, keep them as they are.

**C++ Code**:
```cpp
ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* current = &dummy;

    while (true) {
        ListNode* tail = current;
        for (int i = 0; i < k; i++) {
            tail = tail->next;
            if (!tail) return dummy.next;
        }

        ListNode* prev = current->next;
        ListNode* curr = prev->next;
        for (int i = 1; i < k; i++) {
            prev->next = curr->next;
            curr->next = current->next;
            current->next = curr;
            curr = prev->next;
        }
        current = prev;
    }
}

```

**Python Code**:
```python
def reverse_k_group(head, k):
    dummy = ListNode(0)
    dummy.next = head
    current = dummy

    while True:
        tail = current
        for i in range(k):
            tail = tail.next
            if not tail:
                return dummy.next

        prev = current.next
        curr = prev.next
        for i in range(1, k):
            prev.next = curr.next
            curr.next = current.next
            current.next = curr
            curr = prev.next
        
        current = prev

```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

---

### 26. Remove Duplicates from Sorted Array

**Description**:  
Given a sorted array, remove the duplicates in-place such that each element appears only once and return the new length.

**Approach**:  
Use a two-pointer technique to overwrite duplicates in the array.

**C++ Code**:
```cpp
int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;

    int unique_count = 1;
    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] != nums[unique_count - 1]) {
            nums[unique_count] = nums[i];
            unique_count++;
        }
    }
    return unique_count;
}

```

**Python Code**:
```python
def remove_duplicates(nums):
    if not nums:
        return 0

    unique_count = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[unique_count - 1]:
            nums[unique_count] = nums[i]
            unique_count += 1

    return unique_count

```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

---

---

### 27. Remove Element

**Description**:  
Given an array and a value `val`, you need to remove all instances of that value in-place and return the new length of the array.

**Approach**:  
Use a two-pointer approach to overwrite the elements that are equal to `val`.

**C++ Code**:
```cpp
int removeElement(vector<int>& nums, int val) {
    int index = 0;
    for (int num : nums) {
        if (num != val) {
            nums[index++] = num;
        }
    }
    return index;
}

```

**Python Code**:
```python
def remove_element(nums, val):
    index = 0
    for num in nums:
        if num != val:
            nums[index] = num
            index += 1
    return index

```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

---

### 28. Find the Index of the First Occurrence in a String

**Description**:  
Given two strings haystack and needle, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

**Approach**:  
Use the built-in find function in Python or implement a simple loop for C++.

**C++ Code**:
```cpp
int strStr(string haystack, string needle) {
    if (needle.empty()) return 0;
    return haystack.find(needle);
}

```

**Python Code**:
```python
def str_str(haystack, needle):
    return haystack.find(needle)

```

- **Time Complexity**: O(n * m), where n is the length of haystack and m is the length of needle.
- **Space Complexity**: O(1)

---

### 29. Divide Two Integers

**Description**:  
Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.

**Approach**:  
Use bit manipulation to perform the division by shifting bits.

**C++ Code**:
```cpp
int divide(int dividend, int divisor) {
    if (dividend == INT_MIN && divisor == -1) return INT_MAX; // overflow case
    long long a = abs(dividend), b = abs(divisor), result = 0;
    while (a >= b) {
        long long count = 0, temp = b;
        while (a >= temp) {
            a -= temp;
            result += (1 << count);
            count++;
        }
    }
    return (dividend > 0) == (divisor > 0) ? result : -result;
}

```

**Python Code**:
```python
def divide(dividend, divisor):
    if dividend == -2**31 and divisor == -1:
        return 2**31 - 1  # overflow case
    a, b, result = abs(dividend), abs(divisor), 0
    while a >= b:
        count = 0
        temp = b
        while a >= temp:
            a -= temp
            result += (1 << count)
            count += 1
    return result if (dividend > 0) == (divisor > 0) else -result

```

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

---

### 30. Substring with Concatenation of All Words

**Description**:  
You are given a string s and an array of strings words of the same length. Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once and without any intervening characters.

**Approach**:  
Use a sliding window to keep track of the current substring and a hash map to count the occurrences of each word.

**C++ Code**:
```cpp
vector<int> findSubstring(string s, vector<string>& words) {
    vector<int> result;
    if (s.empty() || words.empty()) return result;

    int word_length = words[0].length();
    int word_count = words.size();
    int total_length = word_length * word_count;
    unordered_map<string, int> word_map;

    for (const string& word : words) {
        word_map[word]++;
    }

    for (int i = 0; i <= s.length() - total_length; i++) {
        unordered_map<string, int> seen;
        int j = 0;
        while (j < word_count) {
            string word = s.substr(i + j * word_length, word_length);
            if (word_map.find(word) == word_map.end()) break;
            seen[word]++;
            if (seen[word] > word_map[word]) break;
            j++;
        }
        if (j == word_count) result.push_back(i);
    }
    return result;
}

```

**Python Code**:
```python
def find_substring(s, words):
    if not s or not words:
        return []

    word_length = len(words[0])
    word_count = len(words)
    total_length = word_length * word_count
    word_map = {}
    
    for word in words:
        word_map[word] = word_map.get(word, 0) + 1

    result = []
    for i in range(len(s) - total_length + 1):
        seen = {}
        j = 0
        while j < word_count:
            word = s[i + j * word_length : i + (j + 1) * word_length]
            if word not in word_map:
                break
            seen[word] = seen.get(word, 0) + 1
            if seen[word] > word_map[word]:
                break
            j += 1
        if j == word_count:
            result.append(i)
    return result

```

- **Time Complexity**:O(n * m)
- **Space Complexity**: O(n)


