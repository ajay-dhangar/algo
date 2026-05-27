---
[id: longest-increasing-subsequence
title: Longest Increasing Subsequence (LIS) with title: "Longest Increasing Subsequence (LIS)"
sidebar_label: Longest Increasing Subsequence
sidebar_position: 17
description: "A complete guide to the Longest Increasing Subsequence (LIS) problem — covering brute force intuition, the classic O(n²) Dynamic Programming approach, and the optimal O(n log n) Binary Search solution. Includes dry runs, complexity analysis, common mistakes, and multi-language implementations in C++, Java, Python, and JavaScript."
tags: [dsa, dynamic programming, LIS, binary search, subsequence, competitive programming, interview]
---



## Introduction

The **Longest Increasing Subsequence (LIS)** is one of the most classic and important problems in Dynamic Programming. It asks:

> Given an array of integers, find the **length of the longest subsequence** such that all elements are in **strictly increasing** order.

A **subsequence** is a sequence derived from the array by deleting some (or no) elements without changing the relative order of remaining elements.

### Example
```
arr = [10, 9, 2, 5, 3, 7, 101, 18]
```
Some increasing subsequences:
- `[2, 5, 7, 101]` — length 4
- `[2, 3, 7, 101]` — length 4
- `[2, 5, 7, 18]`  — length 4
- `[10, 101]`      — length 2

**Answer:** `4` (multiple subsequences of length 4 exist)

---

## Brute Force Intuition

For every element, we can either **include** it in the subsequence (if it's greater than the last picked element) or **skip** it. This leads to exploring all $2^n$ subsets — **$O(2^n)$** time, which is completely impractical for large inputs.

This motivates us to use Dynamic Programming or a smarter Binary Search approach.

---

## Approach 1: Dynamic Programming — O(n²)

### Core Idea

Define `dp[i]` = length of the LIS **ending at index `i`**.

For every index `i`, look back at all `j < i`:
- If `arr[j] < arr[i]`, element `arr[i]` can extend the subsequence ending at `j`.
- So: `dp[i] = max(dp[i], dp[j] + 1)` for all valid `j`.

**Base case:** Every element alone is a subsequence of length 1, so `dp[i] = 1` initially.

**Answer:** `max(dp[0], dp[1], ..., dp[n-1])`

### Recurrence

$$dp[i] = 1 + \max \{ dp[j] : 0 \le j < i \text{ and } arr[j] < arr[i] \}$$
$$dp[i] = 1 \quad \text{(if no such } j \text{ exists)}$$

---

### Dry Run — O(n²) DP

**Input:** `arr = [3, 10, 2, 1, 20]`

Initialize: `dp = [1, 1, 1, 1, 1]`

| $i$ | `arr[i]` | $j$ checked & valid outcomes ($dp[j] + 1$) | Max $dp[j] + 1$ | Final $dp[i]$ |
| :---: | :---: | :--- | :---: | :---: |
| **0** | `3`  | — | — | **1** |
| **1** | `10` | $j=0$: $3 < 10$ ✓ ($1 + 1 = 2$) | 2 | **2** |
| **2** | `2`  | $j=0$: $3 > 2$ ✗ <br /> $j=1$: $10 > 2$ ✗ | — | **1** |
| **3** | `1`  | $j=0, 1, 2$: all elements $\ge 1$ ✗ | — | **1** |
| **4** | `20` | $j=0$: $3 < 20$ ✓ ($1 + 1 = 2$) <br /> $j=1$: $10 < 20$ ✓ ($2 + 1 = 3$) <br /> $j=2$: $2 < 20$ ✓ ($1 + 1 = 2$) <br /> $j=3$: $1 < 20$ ✓ ($1 + 1 = 2$) | 3 | **3** |


`dp = [1, 2, 1, 1, 3]`

**Answer:** `max(dp) = 3` → subsequence `[3, 10, 20]`

---

### C++ Implementation (O(n²))

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lis_dp(vector<int>& arr) {
    int n = arr.size();
    if (n == 0) return 0;
    vector<int> dp(n, 1); // Every element is an LIS of length 1

    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }

    return *max_element(dp.begin(), dp.end());
}

int main() {
    vector<int> arr = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << "LIS length: " << lis_dp(arr) << endl; // Output: 4
    return 0;
}

```

### Java Implementation (O(n²))

```java
import java.util.Arrays;

public class LIS_DP {

    static int lis(int[] arr) {
        int n = arr.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);

        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (arr[j] < arr[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }

        int max = 0;
        for (int val : dp) max = Math.max(max, val);
        return max;
    }

    public static void main(String[] args) {
        int[] arr = {10, 9, 2, 5, 3, 7, 101, 18};
        System.out.println("LIS length: " + lis(arr)); // Output: 4
    }
}
```

---

### Python Implementation (O(n²))

```python
def lis_dp(arr):
    if not arr:
        return 0
    n = len(arr)
    dp = [1] * n  # Every element is an LIS of length 1

    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)

# Example
arr = [10, 9, 2, 5, 3, 7, 101, 18]
print(f"LIS length: {lis_dp(arr)}")  # Output: 4
```

---

### JavaScript Implementation (O(n²))

```javascript
function lisDp(arr) {
    if (arr.length === 0) return 0;
    const n = arr.length;
    const dp = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        } 
    }

    return Math.max(...dp);
}

// Example
const arr = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(`LIS length: ${lisDp(arr)}`); // Output: 4
```

---

### Complexity — O(n²) DP

| Metric | Value |
|--------|-------|
| Time Complexity | O(n²) |
| Space Complexity | O(n) |

---

## Approach 2: Binary Search Optimized — O(n log n)

### Core Idea

We maintain a **"tails" array** where `tails[i]` stores the **smallest possible tail element** of all increasing subsequences of length `i + 1` seen so far.

For each element `x` in `arr`:
- If `x` is greater than all elements in `tails` → append `x` (LIS extended by 1)
- Otherwise → find the **leftmost element in `tails` ≥ x** using binary search and **replace** it with `x`

The **length of `tails`** at the end is the LIS length.

:::note Key insight
Replacing an element with a smaller one doesn't change the current LIS length, but it gives us more room to extend the sequence in the future.
:::

---

### Step-by-Step Dry Run — O(n log n)

**Input:** `arr = [10, 9, 2, 5, 3, 7, 101, 18]`

`tails = []` (initially empty)

| Step | x   | tails before         | Action                                 | tails after              |
|------|-----|----------------------|----------------------------------------|--------------------------|
| 1    | 10  | `[]`                 | 10 &gt; all → append                      | `[10]`                   |
| 2    | 9   | `[10]`               | 9 &lt; 10 → replace tails[0]=10 with 9   | `[9]`                    |
| 3    | 2   | `[9]`                | 2 &lt; 9 → replace tails[0]=9 with 2     | `[2]`                    |
| 4    | 5   | `[2]`                | 5 &gt; 2 → append                         | `[2, 5]`                 |
| 5    | 3   | `[2, 5]`             | 3 &lt; 5 → replace tails[1]=5 with 3     | `[2, 3]`                 |
| 6    | 7   | `[2, 3]`             | 7 &gt; 3 → append                         | `[2, 3, 7]`              |
| 7    | 101 | `[2, 3, 7]`          | 101 &gt; 7 → append                       | `[2, 3, 7, 101]`         |
| 8    | 18  | `[2, 3, 7, 101]`     | 18 &lt; 101 → replace tails[3]=101 with 18| `[2, 3, 7, 18]`          |

**Length of `tails` = 4** → **LIS = 4** ✓

:::note
`tails = [2, 3, 7, 18]` is **not** necessarily the actual LIS — it's a virtual structure. It gives us only the correct **length**. (The actual LIS is e.g. `[2, 5, 7, 101]` or `[2, 3, 7, 18]`.)
:::

---

### Why Binary Search?

The `tails` array is **always sorted** (invariant maintained by design). So we can use **lower_bound** (first position ≥ x) to find the replacement position in O(log n) per element.

---

### C++ Implementation (O(n log n))

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lis_optimized(vector<int>& arr) {
    vector<int> tails;

    for (int x : arr) {
        // Find first element in tails >= x
        auto it = lower_bound(tails.begin(), tails.end(), x);

        if (it == tails.end()) {
            tails.push_back(x); // x extends the longest subsequence
        } else {
            *it = x; // Replace with smaller tail for future possibilities
        }
    }

    return tails.size();
}

int main() {
    vector<int> arr = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << "LIS length: " << lis_optimized(arr) << endl; // Output: 4

    vector<int> arr2 = {0, 1, 0, 3, 2, 3};
    cout << "LIS length: " << lis_optimized(arr2) << endl; // Output: 4

    return 0;
}
```

---

### Java Implementation (O(n log n))

```java
import java.util.ArrayList;
import java.util.Collections;

public class LIS_Optimized {

    // Binary search: find first index in tails where tails[idx] >= x
    static int lowerBound(ArrayList<Integer> tails, int x) {
        int lo = 0, hi = tails.size();
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (tails.get(mid) < x) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    static int lis(int[] arr) {
        ArrayList<Integer> tails = new ArrayList<>();

        for (int x : arr) {
            int pos = lowerBound(tails, x);
            if (pos == tails.size()) {
                tails.add(x);
            } else {
                tails.set(pos, x);
            }
        }

        return tails.size();
    }

    public static void main(String[] args) {
        int[] arr = {10, 9, 2, 5, 3, 7, 101, 18};
        System.out.println("LIS length: " + lis(arr)); // Output: 4
    }
}
```

---

### Python Implementation (O(n log n))

```python
import bisect

def lis_optimized(arr):
    tails = []

    for x in arr:
        pos = bisect.bisect_left(tails, x)  # First index where tails[i] >= x
        if pos == len(tails):
            tails.append(x)  # Extend LIS
        else:
            tails[pos] = x   # Replace with smaller element

    return len(tails)

# Examples
arr = [10, 9, 2, 5, 3, 7, 101, 18]
print(f"LIS length: {lis_optimized(arr)}")  # Output: 4

arr2 = [0, 1, 0, 3, 2, 3]
print(f"LIS length: {lis_optimized(arr2)}")  # Output: 4
```

---

### JavaScript Implementation (O(n log n))

```javascript
function lowerBound(tails, x) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (tails[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

function lisOptimized(arr) {
    const tails = [];

    for (const x of arr) {
        const pos = lowerBound(tails, x);
        if (pos === tails.length) {
            tails.push(x);
        } else {
            tails[pos] = x;
        }
    }

    return tails.length;
}

// Examples
const arr = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(`LIS length: ${lisOptimized(arr)}`); // Output: 4

const arr2 = [0, 1, 0, 3, 2, 3];
console.log(`LIS length: ${lisOptimized(arr2)}`); // Output: 4
```

---

## Approach Comparison

| Approach | Time | Space | Gives Actual Sequence? | Notes |
|---|---|---|---|---|
| Brute Force | O(2ⁿ) | O(n) | Yes | Impractical |
| DP | O(n²) | O(n) | Yes (with backtracking) | Simple, interview-friendly |
| Binary Search | O(n log n) | O(n) | Length only (needs extra work) | Optimal for large inputs |

---

## Reconstructing the Actual LIS (DP Approach)

To retrieve the actual subsequence (not just the length), track a `parent[]` array:

```python
def lis_with_sequence(arr):
    if not arr:
        return 0, []
    n = len(arr)
    dp = [1] * n
    parent = [-1] * n

    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j

    # Find index of max LIS length
    max_len = max(dp)
    idx = dp.index(max_len)

    # Reconstruct by following parent pointers
    sequence = []
    while idx != -1:
        sequence.append(arr[idx])
        idx = parent[idx]

    return max_len, sequence[::-1]

arr = [3, 10, 2, 1, 20]
length, seq = lis_with_sequence(arr)
print(f"LIS length: {length}")    # 3
print(f"LIS sequence: {seq}")     # [3, 10, 20]
```

---

## Common Mistakes & Edge Cases

| Mistake | Explanation | Fix |
|---|---|---|
| Using `<=` instead of `<` | LIS requires **strictly** increasing, not non-decreasing | Use `arr[j] < arr[i]`, not `arr[j] <= arr[i]` |
| Wrong binary search bound | Using `upper_bound` instead of `lower_bound` gives wrong results for equal elements | Use `lower_bound` (first ≥ x) for strictly increasing |
| Returning `dp[n-1]` | The last element's LIS isn't necessarily the global max | Return `max(dp)` |
| Empty array | Accessing `max([])` fails | Add a guard: `if not arr: return 0` |
| All equal elements | Each element forms LIS of length 1 | Ensure strict inequality in the condition |
| Integer overflow | In C++, using `int` for very large sums elsewhere | Not an issue for LIS itself, but mind related problems |

---

## Real-World & Interview Applications

| Application | Connection to LIS |
|---|---|
| **Box Stacking** | Stack boxes where each dimension is strictly smaller (multi-dimensional LIS) |
| **Russian Doll Envelopes** | Sort by width, find LIS of heights (LeetCode #354) |
| **Patience Sorting** | LIS length = minimum number of piles in patience sorting |
| **Chain of Pairs** | Longest chain where `pair[i].second < pair[j].first` |
| **Building Bridges** | Maximize non-crossing bridges (equivalent to LIS) |
| **Stock Price Analysis** | Find the longest trend of price increases |
| **Bioinformatics** | Finding longest increasing gene expression patterns |

---

## Practice Problems

### 🟢 Beginner

| Problem | Platform | Technique |
|---------|----------|-----------|
| Longest Increasing Subsequence | [LeetCode #300](https://leetcode.com/problems/longest-increasing-subsequence/) | DP / Binary Search |
| Length of LIS | [GeeksforGeeks](https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/) | DP |
| Longest Increasing Subsequence | [CSES #1145](https://cses.fi/problemset/task/1145) | O(n log n) |

### 🟡 Intermediate

| Problem | Platform | Technique |
|---------|----------|-----------|
| Number of LIS | [LeetCode #673](https://leetcode.com/problems/number-of-longest-increasing-subsequence/) | DP + count array |
| Increasing Triplet Subsequence | [LeetCode #334](https://leetcode.com/problems/increasing-triplet-subsequence/) | Greedy (2-element tails) |
| Longest Arithmetic Subsequence | [LeetCode #1027](https://leetcode.com/problems/longest-arithmetic-subsequence/) | DP + HashMap |

### 🔴 Advanced

| Problem | Platform | Technique |
|---------|----------|-----------|
| Russian Doll Envelopes | [LeetCode #354](https://leetcode.com/problems/russian-doll-envelopes/) | Sort + LIS (tricky) |
| Maximum Height by Stacking Cuboids | [LeetCode #1691](https://leetcode.com/problems/maximum-height-by-stacking-cuboids/) | Sort + DP LIS variant |
| Longest Chain | [LeetCode #646](https://leetcode.com/problems/maximum-length-of-pair-chain/) | Greedy / LIS |

---

## Summary

- **LIS** finds the longest subsequence in strictly increasing order.
- **O(n²) DP** is simple, intuitive, and sufficient for most interviews. Use `dp[i]` = LIS ending at index `i`.
- **O(n log n) Binary Search** is optimal for competitive programming. Maintain a sorted `tails` array and use `lower_bound`.
- Use **parent array** with DP to reconstruct the actual subsequence, not just the length.
- The key to the binary search approach is that the `tails` array always stays **sorted**, enabling fast lookups.

---

## Related Topics

- 📄 [Longest Common Subsequence](./longest_common_subsequence) — Another classic DP on sequences
- 📄 [Longest Zig-Zag Subsequence](./longest-zig-zag-subsequence) — Variation of LIS
- 📄 [Dynamic Programming Optimizations](./dynamic-programming-optimizations) — Advanced DP techniques
- 📄 [Practice Problems](./practice-problems-different-patterns) — Mixed DP practice set
