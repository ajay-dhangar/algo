---
id: monotonic-stack-queue
title: Monotonic Stack & Queue
sidebar_label: Monotonic Stack & Queue
description: "A comprehensive guide to Monotonic Stack and Monotonic Queue patterns with visual diagrams, step-by-step dry-runs, code templates in Python, Java, and C++, and practice problems."
tags:
  [
    monotonic-stack,
    monotonic-queue,
    algorithms,
    patterns,
    dsa,
    interview-prep,
    stack,
    queue,
  ]
---

# Monotonic Stack & Queue

Monotonic Stack and Monotonic Queue are powerful patterns used to solve problems involving **next/previous greater or smaller elements** and **sliding window extremes** in O(n) time — problems that would otherwise take O(n²) with brute force.

---

## 🧠 What is a Monotonic Stack?

A **Monotonic Stack** is a regular stack with one extra rule:

> Elements inside the stack are always maintained in a **strictly increasing** or **strictly decreasing** order.

When a new element violates this order, we **pop elements** until the order is restored, then push the new element.

```
INCREASING Monotonic Stack (bottom → top goes small → large):

Push 3:   [3]
Push 5:   [3, 5]       5 > 3 ✅ just push
Push 2:   pop 5, pop 3 → [2]   2 < 5 ❌ pop until valid, push 2
Push 4:   [2, 4]       4 > 2 ✅ just push
Push 1:   pop 4, pop 2 → [1]   1 < 4 ❌ pop until valid, push 1
```

---

## 🗂️ Types of Monotonic Stack

| Type           | Order                   | Used For                                                          |
| -------------- | ----------------------- | ----------------------------------------------------------------- |
| **Increasing** | bottom→top: small→large | Next Smaller Element, Previous Smaller Element, Largest Rectangle |
| **Decreasing** | bottom→top: large→small | Next Greater Element, Previous Greater Element, Stock Span        |

---

## 🔍 Classic Problem 1: Next Greater Element

**Problem:** For each element in the array, find the next element to its right that is greater than it. If none exists, return -1.

### Visual Dry-Run

```
Array: [2, 1, 5, 3, 6, 4]
         0  1  2  3  4  5

We use a DECREASING stack (stores indices).
When we find a greater element, it's the answer for everything popped.

i=0: stack=[]     → push 0         stack=[0]        (val=2)
i=1: arr[1]=1 < arr[0]=2 → push 1  stack=[0,1]      (val=2,1)
i=2: arr[2]=5 > arr[1]=1 → pop 1: NGE[1]=5
              5 > arr[0]=2 → pop 0: NGE[0]=5
              stack empty  → push 2 stack=[2]        (val=5)
i=3: arr[3]=3 < arr[2]=5 → push 3  stack=[2,3]      (val=5,3)
i=4: arr[4]=6 > arr[3]=3 → pop 3: NGE[3]=6
              6 > arr[2]=5 → pop 2: NGE[2]=6
              stack empty  → push 4 stack=[4]        (val=6)
i=5: arr[5]=4 < arr[4]=6 → push 5  stack=[4,5]      (val=6,4)

End: remaining in stack → NGE = -1
NGE[4]=-1, NGE[5]=-1

✅ Result: [5, 5, 6, 6, -1, -1]
```

### Code Template

<Tabs>
  <TabItem value="python" label="Python" default>

```python
def next_greater_element(arr):
    n = len(arr)
    result = [-1] * n
    stack = []  # stores indices

    for i in range(n):
        # Pop elements smaller than current
        while stack and arr[stack[-1]] < arr[i]:
            idx = stack.pop()
            result[idx] = arr[i]  # current element is the NGE
        stack.append(i)

    # Remaining in stack have no NGE → result stays -1
    return result

# Example
arr = [2, 1, 5, 3, 6, 4]
print(next_greater_element(arr))  # Output: [5, 5, 6, 6, -1, -1]
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.Stack;
import java.util.Arrays;

public class MonotonicStack {
    public static int[] nextGreaterElement(int[] arr) {
        int n = arr.length;
        int[] result = new int[n];
        Arrays.fill(result, -1);
        Stack<Integer> stack = new Stack<>();  // stores indices

        for (int i = 0; i < n; i++) {
            // Pop elements smaller than current
            while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
                int idx = stack.pop();
                result[idx] = arr[i];  // current element is the NGE
            }
            stack.push(i);
        }

        // Remaining in stack have no NGE → result stays -1
        return result;
    }

    public static void main(String[] args) {
        int[] arr = {2, 1, 5, 3, 6, 4};
        System.out.println(Arrays.toString(nextGreaterElement(arr)));
        // Output: [5, 5, 6, 6, -1, -1]
    }
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> nextGreaterElement(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> st;  // stores indices

    for (int i = 0; i < n; i++) {
        // Pop elements smaller than current
        while (!st.empty() && arr[st.top()] < arr[i]) {
            int idx = st.top();
            st.pop();
            result[idx] = arr[i];  // current element is the NGE
        }
        st.push(i);
    }

    // Remaining in stack have no NGE → result stays -1
    return result;
}

int main() {
    vector<int> arr = {2, 1, 5, 3, 6, 4};
    vector<int> res = nextGreaterElement(arr);
    for (int x : res) cout << x << " ";
    // Output: 5 5 6 6 -1 -1
    return 0;
}
```

  </TabItem>
</Tabs>

**Time Complexity:** O(n) — each element is pushed and popped at most once
**Space Complexity:** O(n)

---

## 🔍 Classic Problem 2: Previous Smaller Element

**Problem:** For each element, find the nearest element to its left that is smaller.

### Visual Dry-Run

```
Array: [4, 5, 2, 10, 8]
         0  1  2   3  4

We use an INCREASING stack (stores indices).

i=0: stack=[]    → push 0          stack=[0]     (val=4)
     PSE[0] = -1 (stack was empty before push)

i=1: arr[1]=5 > arr[0]=4 → no pop → push 1      stack=[0,1]
     PSE[1] = arr[0] = 4

i=2: arr[2]=2 < arr[1]=5 → pop 1
              2 < arr[0]=4 → pop 0
              stack empty  → push 2  stack=[2]   (val=2)
     PSE[2] = -1 (stack was empty)

i=3: arr[3]=10 > arr[2]=2 → no pop → push 3     stack=[2,3]
     PSE[3] = arr[2] = 2

i=4: arr[4]=8 < arr[3]=10 → pop 3
              8 > arr[2]=2 → stop → push 4       stack=[2,4]
     PSE[4] = arr[2] = 2

✅ Result: [-1, 4, -1, 2, 2]
```

### Code Template

<Tabs>
  <TabItem value="python" label="Python" default>

```python
def previous_smaller_element(arr):
    n = len(arr)
    result = [-1] * n
    stack = []  # stores indices

    for i in range(n):
        # Pop elements greater than or equal to current
        while stack and arr[stack[-1]] >= arr[i]:
            stack.pop()

        # Top of stack is the previous smaller element
        if stack:
            result[i] = arr[stack[-1]]

        stack.append(i)

    return result

# Example
arr = [4, 5, 2, 10, 8]
print(previous_smaller_element(arr))  # Output: [-1, 4, -1, 2, 2]
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.Stack;
import java.util.Arrays;

public class MonotonicStack {
    public static int[] previousSmallerElement(int[] arr) {
        int n = arr.length;
        int[] result = new int[n];
        Arrays.fill(result, -1);
        Stack<Integer> stack = new Stack<>();  // stores indices

        for (int i = 0; i < n; i++) {
            // Pop elements greater than or equal to current
            while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
                stack.pop();
            }

            // Top of stack is the previous smaller element
            if (!stack.isEmpty()) {
                result[i] = arr[stack.peek()];
            }

            stack.push(i);
        }

        return result;
    }

    public static void main(String[] args) {
        int[] arr = {4, 5, 2, 10, 8};
        System.out.println(Arrays.toString(previousSmallerElement(arr)));
        // Output: [-1, 4, -1, 2, 2]
    }
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> previousSmallerElement(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> st;  // stores indices

    for (int i = 0; i < n; i++) {
        // Pop elements greater than or equal to current
        while (!st.empty() && arr[st.top()] >= arr[i]) {
            st.pop();
        }

        // Top of stack is the previous smaller element
        if (!st.empty()) {
            result[i] = arr[st.top()];
        }

        st.push(i);
    }

    return result;
}

int main() {
    vector<int> arr = {4, 5, 2, 10, 8};
    vector<int> res = previousSmallerElement(arr);
    for (int x : res) cout << x << " ";
    // Output: -1 4 -1 2 2
    return 0;
}
```

  </TabItem>
</Tabs>

**Time Complexity:** O(n) &nbsp;|&nbsp; **Space Complexity:** O(n)

---

## 🪟 Monotonic Queue (Deque)

A **Monotonic Deque** is used when you need to efficiently track the **maximum or minimum** in a **sliding window**.

### Core Idea

```
Maintain a deque of indices.
- Add new element to BACK (remove smaller elements first for max-deque)
- Remove elements from FRONT if they're outside the window
- Front always holds the index of the MAXIMUM in current window

Window size K=3, Array = [1, 3, -1, -3, 5, 3, 6, 7]

i=0: deque=[0]           window=[1]          max=1
i=1: 3>1 → pop 0, push 1 deque=[1]           window=[1,3]        max=3
i=2: -1<3 → push 2       deque=[1,2]         window=[1,3,-1]     max=3
i=3: -3<-1 → push 3      front=1 in window   window=[3,-1,-3]    max=3
i=4: 5>all → pop 3,2,1   deque=[4]           window=[-1,-3,5]    max=5
i=5: 3<5 → push 5        deque=[4,5]         window=[-3,5,3]     max=5
i=6: 6>3,5 → pop 5,4     deque=[6]           window=[5,3,6]      max=6
i=7: 7>6 → pop 6         deque=[7]           window=[3,6,7]      max=7

✅ Result: [3, 3, 5, 5, 6, 7]
```

### Code Template: Sliding Window Maximum

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from collections import deque

def sliding_window_maximum(arr, k):
    n = len(arr)
    result = []
    dq = deque()  # stores indices, front = index of max

    for i in range(n):
        # Remove indices outside the window from front
        while dq and dq[0] < i - k + 1:
            dq.popleft()

        # Remove indices of smaller elements from back
        while dq and arr[dq[-1]] < arr[i]:
            dq.pop()

        dq.append(i)

        # Window is fully formed
        if i >= k - 1:
            result.append(arr[dq[0]])

    return result

# Example
arr = [1, 3, -1, -3, 5, 3, 6, 7]
print(sliding_window_maximum(arr, 3))  # Output: [3, 3, 5, 5, 6, 7]
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class MonotonicQueue {
    public static int[] slidingWindowMaximum(int[] arr, int k) {
        int n = arr.length;
        if (n < k) return new int[0];
        int[] result = new int[n - k + 1];
        Deque<Integer> dq = new ArrayDeque<>();  // stores indices

        for (int i = 0; i < n; i++) {
            // Remove indices outside the window from front
            while (!dq.isEmpty() && dq.peekFirst() < i - k + 1) {
                dq.pollFirst();
            }

            // Remove indices of smaller elements from back
            while (!dq.isEmpty() && arr[dq.peekLast()] < arr[i]) {
                dq.pollLast();
            }

            dq.offerLast(i);

            // Window is fully formed
            if (i >= k - 1) {
                result[i - k + 1] = arr[dq.peekFirst()];
            }
        }

        return result;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, -1, -3, 5, 3, 6, 7};
        int[] res = slidingWindowMaximum(arr, 3);
        for (int x : res) System.out.print(x + " ");
        // Output: 3 3 5 5 6 7
    }
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> slidingWindowMaximum(vector<int>& arr, int k) {
    int n = arr.size();
    vector<int> result;
    deque<int> dq;  // stores indices

    for (int i = 0; i < n; i++) {
        // Remove indices outside the window from front
        while (!dq.empty() && dq.front() < i - k + 1) {
            dq.pop_front();
        }

        // Remove indices of smaller elements from back
        while (!dq.empty() && arr[dq.back()] < arr[i]) {
            dq.pop_back();
        }

        dq.push_back(i);

        // Window is fully formed
        if (i >= k - 1) {
            result.push_back(arr[dq.front()]);
        }
    }

    return result;
}

int main() {
    vector<int> arr = {1, 3, -1, -3, 5, 3, 6, 7};
    vector<int> res = slidingWindowMaximum(arr, 3);
    for (int x : res) cout << x << " ";
    // Output: 3 3 5 5 6 7
    return 0;
}
```

  </TabItem>
</Tabs>

**Time Complexity:** O(n) — each element enters and exits deque at most once
**Space Complexity:** O(k)

---

## ⚡ Brute Force vs Monotonic Stack

```
Problem: Next Greater Element for [2, 1, 5, 3, 6, 4]

❌ BRUTE FORCE — O(n²)
For each element, scan all elements to its right:
  index 0 (val=2): scan 1,5,3,6,4 → find 5    (5 comparisons)
  index 1 (val=1): scan 5,3,6,4   → find 5    (4 comparisons)
  index 2 (val=5): scan 3,6,4     → find 6    (3 comparisons)
  index 3 (val=3): scan 6,4       → find 6    (2 comparisons)
  index 4 (val=6): scan 4         → none      (1 comparison)
  Total: 15 comparisons

✅ MONOTONIC STACK — O(n)
Each element is pushed once and popped once → max 12 operations
```

---

## 📊 Complexity Summary

| Problem                        | Time | Space |
| ------------------------------ | ---- | ----- |
| Next Greater Element           | O(n) | O(n)  |
| Previous Smaller Element       | O(n) | O(n)  |
| Sliding Window Maximum (Deque) | O(n) | O(k)  |
| Stock Span Problem             | O(n) | O(n)  |
| Largest Rectangle in Histogram | O(n) | O(n)  |

---

## ❌ Common Mistakes

1. **Using values instead of indices** — Always store indices in the stack/deque so you can calculate spans and access original values.
2. **Wrong pop condition** — For Next Greater, pop when `arr[stack.top()] < current`. Flipping this gives Next Smaller.
3. **Forgetting remaining stack elements** — Elements left in stack after the loop have no NGE → answer is -1.
4. **Not removing out-of-window indices** — In monotonic deque, always check `dq.front() < i - k + 1`.
5. **Using Stack for sliding window** — Sliding window max needs a **Deque** (not a stack) because you remove from both ends.

---

## 🏋️ Practice Problems

| #   | Problem                            | Pattern         | Difficulty |
| --- | ---------------------------------- | --------------- | ---------- |
| 1   | Next Greater Element I             | Monotonic Stack | 🟢 Easy    |
| 2   | Next Greater Element II (circular) | Monotonic Stack | 🟡 Medium  |
| 3   | Daily Temperatures                 | Monotonic Stack | 🟡 Medium  |
| 4   | Previous Smaller Element           | Monotonic Stack | 🟡 Medium  |
| 5   | Stock Span Problem                 | Monotonic Stack | 🟡 Medium  |
| 6   | Largest Rectangle in Histogram     | Monotonic Stack | 🔴 Hard    |
| 7   | Sliding Window Maximum             | Monotonic Deque | 🔴 Hard    |
| 8   | Shortest Subarray with Sum ≥ K     | Monotonic Deque | 🔴 Hard    |

---

## 🔗 References

- [Monotonic Stack - GeeksforGeeks](https://www.geeksforgeeks.org/introduction-to-monotonic-stack-2/)
- [LeetCode Monotonic Stack Problems](https://leetcode.com/tag/monotonic-stack/)
- [Next Greater Element - LeetCode 496](https://leetcode.com/problems/next-greater-element-i/)
- [Sliding Window Maximum - LeetCode 239](https://leetcode.com/problems/sliding-window-maximum/)
